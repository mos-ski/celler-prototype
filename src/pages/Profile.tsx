import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronRight, User, CreditCard, Shield, HelpCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/signin"); };

  const items = [
    { icon: User, label: "Account Info", sub: user?.email || "" },
    { icon: CreditCard, label: "Bank Account", sub: "First Bank · ****6789" },
    { icon: Shield, label: "Security", sub: "Password, 2FA" },
    { icon: HelpCircle, label: "Help & Support", sub: "FAQ, Contact us" },
  ];

  return (
    <div className="pt-4">
      {/* Avatar & name */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold mb-3">
          {user?.fullName?.[0]?.toUpperCase() ?? "T"}
        </div>
        <p className="text-lg font-semibold">{user?.fullName || "Trader"}</p>
        <p className="text-sm text-muted-foreground">{user?.email || ""}</p>
      </div>

      {/* Menu items */}
      <div className="space-y-1">
        {items.map((item) => (
          <button key={item.label} className="w-full flex items-center justify-between py-4 px-2 border-b border-border/20 last:border-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                <item.icon size={18} className="text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      <Button variant="destructive" className="w-full mt-8 h-12 rounded-2xl" onClick={handleLogout}>
        <LogOut size={16} className="mr-2" /> Logout
      </Button>
    </div>
  );
}
