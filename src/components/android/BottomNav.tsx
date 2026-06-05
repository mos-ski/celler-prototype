import { Link, useLocation } from "react-router-dom";
import { Home, Receipt, Clock, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/a/home", label: "Home", icon: Home },
  { to: "/a/bills", label: "Bills", icon: Receipt },
  { to: "/a/history", label: "History", icon: Clock },
  { to: "/a/referral", label: "Referral", icon: Users },
  { to: "/a/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur-md safe-area-pb">
      <div className="mx-auto flex max-w-[430px] items-center justify-around px-2 pt-2 pb-3">
        {NAV_ITEMS.map((item) => {
          const active =
            location.pathname === item.to ||
            (item.to === "/a/bills" && location.pathname.startsWith("/a/bills"));
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
