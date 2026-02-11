import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Copy, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";

export default function ReferralPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const referralCode = (user?.username || user?.fullName?.split(" ")[0]?.toUpperCase() || "USER") + "2024";
  const referralLink = `https://cryptoapp.com/ref/${referralCode}`;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background px-4 pb-8">
        <div className="flex items-center justify-between pt-4 mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-bold">Refer and Earn</h1>
          </div>
          <button className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <HelpCircle size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Banner */}
        <div className="rounded-2xl bg-primary p-6 mb-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
          <div className="relative z-10">
            <p className="text-2xl font-bold text-primary-foreground mb-2">Earn $5 per Referral</p>
            <p className="text-sm text-primary-foreground/80">
              Share your referral link and earn $5 for each friend who signs up and completes verification.
            </p>
          </div>
          <span className="absolute left-4 bottom-2 text-4xl">🏆</span>
          <span className="absolute right-4 bottom-2 text-4xl">🏆</span>
        </div>

        {/* Total earned */}
        <div className="bg-card rounded-2xl p-5 border border-border/20 text-center mb-6">
          <p className="text-xs tracking-widest text-muted-foreground uppercase mb-1">Total Earned</p>
          <p className="text-2xl font-bold text-primary">₦0</p>
        </div>

        {/* Referral code */}
        <p className="text-xs tracking-widest text-muted-foreground uppercase mb-3">Your Referral Code</p>
        <div className="bg-card rounded-2xl p-5 border border-border/20 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-primary">{referralCode}</span>
            <Button variant="secondary" size="sm" className="gap-2" onClick={() => copy(referralCode)}>
              <Copy size={14} /> Copy
            </Button>
          </div>
          <div className="border-t border-border/20 pt-3">
            <p className="text-xs text-muted-foreground mb-1">Referral Link:</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium truncate mr-2">{referralLink}</p>
              <button onClick={() => copy(referralLink)}>
                <Copy size={14} className="text-primary shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Active referrals */}
        <div className="bg-card rounded-2xl p-5 border border-border/20 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase mb-1">Active Referrals</p>
            <p className="text-2xl font-bold text-primary">10</p>
          </div>
          <Button className="rounded-xl">Referral History</Button>
        </div>
      </div>
    </PageTransition>
  );
}
