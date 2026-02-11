import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, ShoppingCart, Banknote, ArrowLeftRight, ClockIcon, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/buy", label: "Buy", icon: ShoppingCart },
  { to: "/sell", label: "Sell", icon: Banknote },
  { to: "/swap", label: "Swap", icon: ArrowLeftRight },
  { to: "/history", label: "History", icon: ClockIcon },
  { to: "/profile", label: "Profile", icon: User },
];

export default function AppLayout() {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) return <Navigate to="/signin" replace />;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/dashboard" className="text-lg font-bold tracking-tight text-primary">
            CryptoExchange
          </Link>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      {/* Bottom nav (mobile-friendly) */}
      <nav className="sticky bottom-0 border-t bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-around py-2">
          {NAV.map((n) => {
            const active = location.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 text-[10px] sm:text-xs transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <n.icon size={20} />
                {n.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
