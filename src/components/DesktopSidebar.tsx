import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Clock, ArrowLeftRight, Wallet, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/history", label: "History", icon: Clock },
  { to: "/swap", label: "Swap", icon: ArrowLeftRight },
  { to: "/manage-assets", label: "Wallet", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
];

export default function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <aside className="hidden md:flex w-[260px] flex-col bg-sidebar border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 pt-7 pb-10">
        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">C</span>
        </div>
        <span className="text-sidebar-foreground font-bold text-xl tracking-tight">celler</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.to || 
            (item.to === "/manage-assets" && location.pathname.startsWith("/coin/"));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary border-l-[3px] border-primary"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon size={20} strokeWidth={active ? 2.2 : 1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut size={20} strokeWidth={1.5} />
          Logout
        </button>
      </div>
    </aside>
  );
}
