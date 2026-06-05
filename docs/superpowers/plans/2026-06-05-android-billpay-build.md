# Android Bill Payment App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Zella/Android bill payment version of Celler as a parallel web app in the same codebase — new splash, new home screen, new bottom nav — reusing all existing bill payment, history, referral, and profile pages untouched.

**Architecture:** A Vite build flag (`VITE_APP_VARIANT=android`) tells `main.tsx` to mount `AppAndroid` instead of `App`. `AppAndroid` uses the same URL routes as the existing app so all internal navigation in reused pages works without modification. Only the layout, splash screen, and home screen are new. Everything else (Bills, BillPay, History, Referral, Profile, and all settings pages) is reused as-is.

**Tech Stack:** React 18, TypeScript, React Router DOM v6, Tailwind CSS, shadcn/ui, Lucide icons, Vite

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `.env.android` | Sets `VITE_APP_VARIANT=android` for the Android build |
| Modify | `package.json` | Add `build:android` script |
| Modify | `src/main.tsx` | Read env flag, mount `AppAndroid` or `App` |
| Create | `src/AppAndroid.tsx` | Router for the Android version — same routes, Android layout and screens |
| Create | `src/components/android/AndroidLayout.tsx` | Layout wrapper: auth guard + page container + bottom nav |
| Create | `src/components/android/BottomNav.tsx` | 5-tab bottom nav: Home, Bills, History, Referral, Profile |
| Create | `src/data/dealsData.ts` | Static Deals of the Day content |
| Create | `src/pages/android/Splash.tsx` | Android-specific splash screen (distinct from existing Splash) |
| Create | `src/pages/android/Home.tsx` | Android home: greeting, wallet card, 8 tiles, deals, recent activity |

---

## Task 1: Environment Setup and Build Config

**Files:**
- Create: `.env.android`
- Modify: `package.json`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create the Android env file**

Create `.env.android` at the project root with this content:
```
VITE_APP_VARIANT=android
```

- [ ] **Step 2: Add the Android build script to package.json**

In `package.json`, inside `"scripts"`, add after the existing `"build"` line:
```json
"build:android": "vite build --mode android",
"dev:android": "vite --mode android",
```

- [ ] **Step 3: Update main.tsx to branch on the flag**

Replace the entire contents of `src/main.tsx` with:
```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const variant = import.meta.env.VITE_APP_VARIANT;

let RootApp = App;
if (variant === "android") {
  const { default: AppAndroid } = await import("./AppAndroid.tsx");
  RootApp = AppAndroid;
}

createRoot(document.getElementById("root")!).render(<RootApp />);
```

Note: dynamic import with top-level await requires Vite — this is supported out of the box. If you see a build error, use this alternative instead:

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppAndroid from "./AppAndroid.tsx";
import "./index.css";

const RootApp = import.meta.env.VITE_APP_VARIANT === "android" ? AppAndroid : App;

createRoot(document.getElementById("root")!).render(<RootApp />);
```

- [ ] **Step 4: Verify existing app still works**

Run: `npm run dev`

Open browser at `http://localhost:8080` (or whatever port Vite uses). Confirm the existing Celler crypto app loads exactly as before. Nothing should have changed.

- [ ] **Step 5: Verify Android mode boots (even if AppAndroid doesn't exist yet, it should give a clear import error, not a silent failure)**

Run: `npm run dev:android`

Expected: error about missing `./AppAndroid.tsx` — this confirms the flag is working. Good. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add .env.android package.json src/main.tsx
git commit -m "feat(android): add build flag and dev:android script"
```

---

## Task 2: Bottom Navigation Component

**Files:**
- Create: `src/components/android/BottomNav.tsx`

- [ ] **Step 1: Create the BottomNav component**

Create `src/components/android/BottomNav.tsx`:
```tsx
import { Link, useLocation } from "react-router-dom";
import { Home, Receipt, Clock, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/a/home", label: "Home", icon: Home },
  { to: "/bills", label: "Bills", icon: Receipt },
  { to: "/history", label: "History", icon: Clock },
  { to: "/referral", label: "Referral", icon: Users },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur-md safe-area-pb">
      <div className="mx-auto flex max-w-[430px] items-center justify-around px-2 pt-2 pb-3">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.to ||
            (item.to === "/bills" && location.pathname.startsWith("/bills"));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon size={22} strokeWidth={active ? 2.5 : 1.5} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/android/BottomNav.tsx
git commit -m "feat(android): add 5-tab bottom navigation"
```

---

## Task 3: Android Layout Wrapper

**Files:**
- Create: `src/components/android/AndroidLayout.tsx`

- [ ] **Step 1: Create the layout component**

Create `src/components/android/AndroidLayout.tsx`:
```tsx
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BottomNav from "./BottomNav";

const SHOW_NAV = ["/a/home", "/bills", "/history", "/referral", "/profile"];

export default function AndroidLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/a/signin" replace />;

  return (
    <div className="flex min-h-screen bg-background flex-col">
      <main className="mx-auto w-full flex-1 max-w-[430px] px-4 pt-2 pb-28">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/android/AndroidLayout.tsx
git commit -m "feat(android): add Android layout wrapper with bottom nav"
```

---

## Task 4: Deals of the Day Data

**Files:**
- Create: `src/data/dealsData.ts`

- [ ] **Step 1: Create deals data file**

Create `src/data/dealsData.ts`:
```ts
export interface Deal {
  id: string;
  category: "airtime" | "data";
  provider: string;
  description: string;
  originalPrice: number;
  dealPrice: number;
  value: string;
  prefillAmount?: number;
  prefillPhone?: string;
}

export const DEALS: Deal[] = [
  {
    id: "deal-1",
    category: "airtime",
    provider: "mtn",
    description: "₦1,000 Airtime",
    originalPrice: 1000,
    dealPrice: 800,
    value: "₦1,000",
  },
  {
    id: "deal-2",
    category: "data",
    provider: "mtn",
    description: "2GB Data",
    originalPrice: 1000,
    dealPrice: 800,
    value: "2GB",
  },
  {
    id: "deal-3",
    category: "airtime",
    provider: "airtel",
    description: "₦500 Airtime",
    originalPrice: 500,
    dealPrice: 400,
    value: "₦500",
  },
  {
    id: "deal-4",
    category: "data",
    provider: "glo",
    description: "1GB Data",
    originalPrice: 500,
    dealPrice: 350,
    value: "1GB",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/dealsData.ts
git commit -m "feat(android): add static Deals of the Day data"
```

---

## Task 5: Android Splash Screen

**Files:**
- Create: `src/pages/android/Splash.tsx`

- [ ] **Step 1: Create Android splash**

Create `src/pages/android/Splash.tsx`:
```tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AndroidSplash() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 1800);
    const t2 = setTimeout(() => {
      navigate(isLoggedIn ? "/a/home" : "/a/welcome", { replace: true });
    }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isLoggedIn, navigate]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "#0F0F23" }}
    >
      {/* Wordmark — distinct from the existing Celler splash */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-20 w-20 rounded-3xl flex items-center justify-center text-4xl font-black shadow-2xl"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
        >
          Z
        </div>
        <p className="text-white text-3xl font-bold tracking-tight">Zella</p>
        <p className="text-white/50 text-sm">Pay smarter, every day</p>
      </div>
    </div>
  );
}
```

Note: Replace "Zella" and the letter "Z" with the confirmed final app name once stakeholders approve it. The gradient colours can also be updated once the final brand is locked.

- [ ] **Step 2: Commit**

```bash
git add src/pages/android/Splash.tsx
git commit -m "feat(android): add Android splash screen"
```

---

## Task 6: Android Home Screen

**Files:**
- Create: `src/pages/android/Home.tsx`

This is the main new screen. It has five sections: header, wallet card, 8 action tiles, Deals of the Day, and recent activity.

- [ ] **Step 1: Create the Home screen**

Create `src/pages/android/Home.tsx`:
```tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { store, formatNgn } from "@/lib/crypto";
import { DEALS } from "@/data/dealsData";
import {
  Bell, Eye, EyeOff, Copy, Phone, Wifi, Zap, Tv,
  Dices, ArrowUp, ArrowDown, Clock, Check
} from "lucide-react";
import { useState } from "react";

const ACCOUNT_NUMBER = "0765 6736 7282";

const TILES = [
  { label: "Airtime", icon: Phone, to: "/bills/airtime", color: "#6366f1" },
  { label: "Data", icon: Wifi, to: "/bills/data", color: "#8b5cf6" },
  { label: "Electricity", icon: Zap, to: "/bills/electricity", color: "#f59e0b" },
  { label: "TV", icon: Tv, to: "/bills/tv", color: "#10b981" },
  { label: "Betting", icon: Dices, to: "/bills/betting", color: "#ef4444" },
  { label: "Withdraw", icon: ArrowUp, to: "/withdraw/NGN", color: "#6366f1" },
  { label: "Deposit", icon: ArrowDown, to: "/receive/NGN", color: "#8b5cf6" },
  { label: "History", icon: Clock, to: "/history", color: "#64748b" },
];

export default function AndroidHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const wallet = store.getWallet();
  const ngnBalance = wallet["NGN"] || 0;
  const transactions = store.getTransactions().slice(0, 4);

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const firstName = user?.fullName?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-6 pt-4 pb-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-base">
            {user?.fullName?.[0]?.toUpperCase() ?? "Z"}
          </div>
          <span className="text-base font-semibold">Hello, {firstName}</span>
        </div>
        <button
          onClick={() => navigate("/notifications")}
          className="relative h-10 w-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </div>

      {/* Wallet Card */}
      <div className="rounded-3xl overflow-hidden shadow-lg" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%)" }}>
        <div className="px-6 pt-6 pb-4">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Total Wallet</p>
          <div className="flex items-center gap-3 mb-1">
            <p className="text-white text-4xl font-bold tracking-tight">
              {hidden ? "₦ ••••••" : formatNgn(ngnBalance)}
            </p>
            <button onClick={() => setHidden((h) => !h)}>
              {hidden
                ? <Eye size={20} className="text-white/50" />
                : <EyeOff size={20} className="text-white/50" />
              }
            </button>
          </div>
        </div>
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-white/70 text-xs tracking-wide">
            YOUR ACCT NO: {ACCOUNT_NUMBER}
          </p>
          <button onClick={handleCopy} className="text-white/60 hover:text-white transition-colors">
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Action Tiles */}
      <div className="grid grid-cols-4 gap-3">
        {TILES.map((tile) => (
          <button
            key={tile.label}
            onClick={() => navigate(tile.to)}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ background: `${tile.color}18` }}
            >
              <tile.icon size={22} style={{ color: tile.color }} />
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">{tile.label}</span>
          </button>
        ))}
      </div>

      {/* Deals of the Day */}
      <div>
        <p className="text-sm font-semibold mb-3">Deals of the Day</p>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className="flex-shrink-0 w-36 rounded-2xl border border-border/50 overflow-hidden bg-secondary/40"
            >
              <div className="px-4 pt-4 pb-2">
                <p className="text-base font-bold">{deal.value}</p>
                <p className="text-xs text-muted-foreground capitalize">{deal.category}</p>
              </div>
              <div className="border-t border-border/30 px-4 py-2">
                <p className="text-xs text-muted-foreground line-through">₦{deal.originalPrice.toLocaleString()}</p>
                <p className="text-xs font-semibold">PAY ₦{deal.dealPrice.toLocaleString()}</p>
              </div>
              <div className="px-3 pb-3">
                <button
                  onClick={() => navigate(`/bills/${deal.category}`)}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  Grab Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {transactions.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-3">Recent</p>
          <div className="space-y-1">
            {transactions.map((tx) => (
              <button
                key={tx.id}
                onClick={() => navigate(`/transaction/${tx.id}`)}
                className="w-full flex items-center justify-between py-3 border-b border-border/30 last:border-0 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-base">
                    {tx.type === "bill" ? "📱" : tx.type === "deposit" ? "⬇️" : tx.type === "withdraw" ? "⬆️" : "💳"}
                  </div>
                  <div>
                    <p className="text-sm font-medium capitalize">{tx.description ?? tx.type}</p>
                    <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${tx.type === "deposit" ? "text-green-500" : "text-foreground"}`}>
                  {tx.type === "deposit" ? "+" : "-"}{formatNgn(tx.ngnValue)}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/android/Home.tsx
git commit -m "feat(android): add Android home screen with wallet card, tiles, deals, and recent activity"
```

---

## Task 7: Wire Up AppAndroid Router

**Files:**
- Create: `src/AppAndroid.tsx`

- [ ] **Step 1: Create AppAndroid.tsx**

Create `src/AppAndroid.tsx`:
```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AndroidLayout from "@/components/android/AndroidLayout";

import AndroidSplash from "./pages/android/Splash";
import AndroidHome from "./pages/android/Home";

import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TwoFactor from "./pages/TwoFactor";

import Bills from "./pages/Bills";
import BillPay from "./pages/BillPay";
import History from "./pages/History";
import Referral from "./pages/Referral";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Withdraw from "./pages/Withdraw";
import Receive from "./pages/Receive";
import TransactionDetail from "./pages/TransactionDetail";
import Receipt from "./pages/Receipt";
import BankDetails from "./pages/BankDetails";
import KYC from "./pages/KYC";
import UpdatePin from "./pages/UpdatePin";
import UpdatePassword from "./pages/UpdatePassword";
import Appearance from "./pages/Appearance";
import Support from "./pages/Support";
import EditProfile from "./pages/EditProfile";

const queryClient = new QueryClient();

const AppAndroid = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Android entry points */}
              <Route path="/a" element={<AndroidSplash />} />
              <Route path="/a/welcome" element={<Welcome />} />
              <Route path="/a/signin" element={<SignIn />} />
              <Route path="/a/signup" element={<SignUp />} />
              <Route path="/a/two-factor" element={<TwoFactor />} />

              {/* Redirect root to android splash */}
              <Route path="/" element={<AndroidSplash />} />

              {/* Protected screens with Android layout */}
              <Route element={<AndroidLayout />}>
                <Route path="/a/home" element={<AndroidHome />} />
                <Route path="/bills" element={<Bills />} />
                <Route path="/bills/:category" element={<BillPay />} />
                <Route path="/history" element={<History />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/withdraw/:coinId" element={<Withdraw />} />
                <Route path="/receive/:coinId" element={<Receive />} />
                <Route path="/transaction/:txId" element={<TransactionDetail />} />
                <Route path="/receipt/:txId" element={<Receipt />} />
                <Route path="/bank-details" element={<BankDetails />} />
                <Route path="/kyc" element={<KYC />} />
                <Route path="/update-pin" element={<UpdatePin />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/two-factor" element={<TwoFactor />} />
                <Route path="/appearance" element={<Appearance />} />
                <Route path="/support" element={<Support />} />
                <Route path="/edit-profile" element={<EditProfile />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppAndroid;
```

- [ ] **Step 2: Commit**

```bash
git add src/AppAndroid.tsx
git commit -m "feat(android): wire up AppAndroid router with all screens"
```

---

## Task 8: End-to-End Verification

Run `npm run dev:android` and walk through every acceptance criteria item manually in the browser.

- [ ] **Splash screen** — loads at `/`, shows Android splash (not the existing Celler splash), auto-navigates to `/a/home`

- [ ] **Home screen** — wallet card shows NGN balance, eye toggle hides/shows balance, account number shows and copies, all 8 tiles are visible and tappable

- [ ] **Airtime flow** — tap Airtime tile → provider list → enter number and amount → confirm → PIN → receipt

- [ ] **Data flow** — tap Data tile → provider → plan selection → confirm → PIN → receipt

- [ ] **Electricity flow** — tap Electricity tile → distributor → meter number → amount → confirm → PIN → receipt

- [ ] **TV flow** — tap TV tile → provider → decoder number → package → confirm → PIN → receipt

- [ ] **Betting flow** — tap Betting tile → platform → user ID → amount → confirm → PIN → receipt

- [ ] **Withdraw tile** — tapping Withdraw navigates to the NGN withdrawal screen

- [ ] **Deposit tile** — tapping Deposit navigates to the NGN receive/account screen

- [ ] **History tab** — shows transaction list, tapping a transaction shows detail

- [ ] **Referral tab** — referral page loads, link is copyable

- [ ] **Profile tab** — loads, all sub-links (KYC, PIN, bank details, password, support, appearance, edit profile) navigate correctly and return to profile

- [ ] **Deals of the Day** — all four deals show, Grab Offer navigates to the correct bill category

- [ ] **Bottom nav** — all five tabs navigate to the correct screen, active tab is highlighted

- [ ] **Existing app untouched** — stop the android server, run `npm run dev` (no android flag), confirm the original Celler app loads and works normally at `http://localhost:8080`

- [ ] **Final commit**

```bash
git add .
git commit -m "feat(android): complete Android bill payment version — all screens verified"
```

---

## Notes for the Developer

- **App name:** The splash screen currently says "Zella" as a placeholder. Replace it with the confirmed name once stakeholders approve. The letter and gradient are easy to update.
- **Account number:** The account number on the wallet card (`0765 6736 7282`) is hardcoded as a placeholder. Wire it to the real user account data when the backend is connected.
- **Deals of the Day:** The deals in `src/data/dealsData.ts` are static. When a backend is available, replace the import with an API call.
- **Brand colours:** The purple gradient (`#6366f1` → `#8b5cf6`) is the working colour scheme. Update in `AndroidLayout`, `Home.tsx`, and `Splash.tsx` together once the final brand palette is confirmed.
- **NGN balance:** Pulled from `store.getWallet()["NGN"]` — the same localStorage store the existing app uses. In production, this connects to the real wallet API.
