import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Clock, ArrowLeftRight, Gift, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/history", label: "History", icon: Clock },
  { to: "/swap", label: "Swap", icon: ArrowLeftRight, fab: true },
  { to: "/giftcards", label: "Giftcard", icon: Gift },
  { to: "/profile", label: "Profile", icon: User },
];

const SHOW_NAV_PAGES = ["/dashboard", "/history", "/profile", "/giftcards"];

export default function AppLayout() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) return <Navigate to="/signin" replace />;

  const showNav = SHOW_NAV_PAGES.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className={cn("mx-auto w-full max-w-[430px] flex-1 px-4 pt-2", showNav ? "pb-24" : "pb-4")}>
        <Outlet />
      </main>

      {showNav && (
        <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-md safe-area-pb">
          <div className="mx-auto flex max-w-[430px] items-end justify-around px-2 pt-2 pb-2">
            {NAV_ITEMS.map((n) => {
              const active = location.pathname === n.to;

              if (n.fab) {
                return (
                  <Link key={n.to} to={n.to} className="relative -mt-6 flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors bg-primary">
                      <n.icon size={24} className="text-primary-foreground" />
                    </div>
                    <span className={cn("mt-1 text-[10px]", active ? "text-primary" : "text-muted-foreground")}>{n.label}</span>
                  </Link>
                );
              }

              return (
                <Link key={n.to} to={n.to}
                  className={cn("flex flex-col items-center gap-1 py-1 px-3 text-[10px] transition-colors", active ? "text-primary" : "text-muted-foreground")}>
                  <n.icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                  {n.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
