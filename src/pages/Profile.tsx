import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronRight, User, Landmark, Bell, FileText, Lock, Grid3X3, Shield, Sun, Moon, Gift, HelpCircle, Copy, Pen } from "lucide-react";
import PageTransition from "@/components/PageTransition";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => { logout(); navigate("/signin"); };

  const themeLabel = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System";

  const accountItems = [
    { icon: User, label: "KYC Verification", onClick: () => navigate("/kyc"), right: <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded">Verified</span> },
    { icon: Landmark, label: "Bank Details", onClick: () => navigate("/bank-details") },
    { icon: Bell, label: "Notifications", onClick: () => navigate("/notifications") },
    { icon: FileText, label: "Account Statement", right: <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Coming Soon</span> },
  ];

  const securityItems = [
    { icon: Lock, label: "Update Password", onClick: () => navigate("/update-password") },
    { icon: Grid3X3, label: "Update Pin", onClick: () => navigate("/update-pin") },
    { icon: Shield, label: "Two Factor Authentication", onClick: () => navigate("/two-factor") },
  ];

  const otherItems = [
    { icon: theme === "dark" ? Moon : Sun, label: "Appearance", onClick: () => navigate("/appearance"), right: <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded capitalize">{themeLabel}</span> },
    { icon: Gift, label: "Refer and Earn", onClick: () => navigate("/referral") },
    { icon: HelpCircle, label: "Support", onClick: () => navigate("/support") },
  ];

  return (
    <PageTransition>
      <div className="pt-4 pb-24">
        {/* Profile card */}
        <div className="bg-card rounded-2xl p-4 flex items-center gap-4 mb-6 border border-border/20">
          <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
            {user?.fullName?.[0]?.toUpperCase() ?? "T"}
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold">{user?.fullName || "Trader"}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-muted-foreground">User ID: {user?.email?.split("@")[0] || "user"}</span>
              <Copy size={12} className="text-primary cursor-pointer" />
            </div>
          </div>
          <button onClick={() => navigate("/edit-profile")} className="text-xs text-primary border border-primary/30 px-3 py-1.5 rounded-lg flex items-center gap-1">
            <Pen size={10} /> Edit
          </button>
        </div>

        {/* Account section */}
        <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-2 px-1">Account</p>
        <div className="bg-card rounded-2xl border border-border/20 mb-6">
          {accountItems.map((item, i) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center justify-between py-4 px-4 ${i < accountItems.length - 1 ? "border-b border-border/10" : ""}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.right || <ChevronRight size={16} className="text-muted-foreground" />}
            </button>
          ))}
        </div>

        {/* Security section */}
        <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-2 px-1">Security</p>
        <div className="bg-card rounded-2xl border border-border/20 mb-6">
          {securityItems.map((item, i) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center justify-between py-4 px-4 ${i < securityItems.length - 1 ? "border-b border-border/10" : ""}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Others section */}
        <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-2 px-1">Others</p>
        <div className="bg-card rounded-2xl border border-border/20 mb-6">
          {otherItems.map((item, i) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center justify-between py-4 px-4 ${i < otherItems.length - 1 ? "border-b border-border/10" : ""}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.right || <ChevronRight size={16} className="text-muted-foreground" />}
            </button>
          ))}
          <button onClick={() => setShowLogout(true)} className="w-full flex items-center justify-between py-4 px-4 border-t border-border/10">
            <div className="flex items-center gap-3">
              <LogOut size={18} className="text-destructive" />
              <span className="text-sm text-destructive">Logout</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Logout Modal */}
        {showLogout && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowLogout(false)}>
            <div className="w-full max-w-lg bg-card rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom" onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-6" />
              <div className="flex flex-col items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <LogOut size={28} className="text-destructive" />
                </div>
                <p className="text-lg font-bold">Log Out?</p>
                <p className="text-sm text-muted-foreground mt-1 text-center">Are you sure you want to log out of your account?</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-14 rounded-2xl text-base" onClick={() => setShowLogout(false)}>Cancel</Button>
                <Button variant="destructive" className="flex-1 h-14 rounded-2xl text-base" onClick={handleLogout}>Log Out</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
