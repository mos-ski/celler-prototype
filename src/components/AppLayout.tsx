import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Clock, ArrowLeftRight, Gift, User, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { store, COINS, coinToUsd, formatUsd, formatNgn, formatCoin, type CoinId } from "@/lib/crypto";
import CoinIcon from "@/components/CoinIcon";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/history", label: "History", icon: Clock },
  { to: "/swap", label: "Swap", icon: ArrowLeftRight, fab: true },
  { to: "/giftcards", label: "Giftcard", icon: Gift },
  { to: "/profile", label: "Profile", icon: User },
];

const SHOW_NAV_PAGES = ["/dashboard", "/history", "/profile"];

export default function AppLayout() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [walletOpen, setWalletOpen] = useState(false);
  const [search, setSearch] = useState("");

  if (!isLoggedIn) return <Navigate to="/signin" replace />;

  const showNav = SHOW_NAV_PAGES.includes(location.pathname);

  const wallet = store.getWallet();
  const allCoins = COINS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCoin = (coinId: CoinId) => {
    setWalletOpen(false);
    setSearch("");
    navigate(`/coin/${coinId}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className={cn("mx-auto w-full max-w-lg flex-1 px-4 pt-2", showNav ? "pb-24" : "pb-4")}>
        <Outlet />
      </main>

      {showNav && (
        <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-md safe-area-pb">
          <div className="mx-auto flex max-w-lg items-end justify-around px-2 pt-2 pb-2">
            {NAV_ITEMS.map((n) => {
              const isWallet = n.id === "wallet";
              const active = !isWallet && location.pathname === n.to;

              if (n.fab) {
                return (
                  <Link key={n.to} to={n.to!} className="relative -mt-6 flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors bg-primary">
                      <n.icon size={24} className="text-primary-foreground" />
                    </div>
                    <span className={cn("mt-1 text-[10px]", active ? "text-primary" : "text-muted-foreground")}>{n.label}</span>
                  </Link>
                );
              }

              if (isWallet) {
                return (
                  <button key="wallet" onClick={() => setWalletOpen(true)}
                    className={cn("flex flex-col items-center gap-1 py-1 px-3 text-[10px] transition-colors", "text-muted-foreground")}>
                    <n.icon size={22} strokeWidth={1.5} />
                    {n.label}
                  </button>
                );
              }

              return (
                <Link key={n.to} to={n.to!}
                  className={cn("flex flex-col items-center gap-1 py-1 px-3 text-[10px] transition-colors", active ? "text-primary" : "text-muted-foreground")}>
                  <n.icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                  {n.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Wallet Asset Picker Sheet */}
      <Sheet open={walletOpen} onOpenChange={setWalletOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-8 pt-6 max-h-[85vh] overflow-y-auto [&>button]:hidden">
          <SheetHeader className="flex flex-row items-center justify-between mb-4">
            <SheetTitle className="text-xl font-bold">Select Coin</SheetTitle>
            <button onClick={() => setWalletOpen(false)} className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
              <X size={16} />
            </button>
          </SheetHeader>

          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary border-0 rounded-xl h-12"
            />
          </div>

          <div className="space-y-1">
            {allCoins.map((c) => {
              const qty = wallet[c.id] || 0;
              const usd = coinToUsd(c.id, qty);
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCoin(c.id)}
                  className="w-full flex items-center justify-between py-4 px-2 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CoinIcon coinId={c.id} />
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{c.id}</span>
                        <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{c.id === "NGN" ? "₦1.00" : formatUsd(c.marketPriceUsd)}</span>
                        <span className={`text-xs ${c.id === "BTC" ? "text-destructive" : "text-success"}`}>
                          {c.id === "NGN" ? "" : c.id === "BTC" ? "-1.33%" : "+3.09%"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{c.id === "NGN" ? formatNgn(qty) : formatCoin(qty, 7)}</p>
                    <p className="text-xs text-muted-foreground">{c.id === "NGN" ? "" : formatUsd(usd)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
