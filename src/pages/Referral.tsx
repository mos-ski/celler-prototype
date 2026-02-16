import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Copy, HelpCircle, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import { formatNgn } from "@/lib/crypto";
import {
  referralStore,
  statusLabel,
  statusColor,
  withdrawalStatusColor,
  type WithdrawalRequest,
} from "@/lib/referral";

export default function ReferralPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const config = referralStore.getConfig();
  const referrals = referralStore.getReferrals();
  const withdrawals = referralStore.getWithdrawals();

  const totalEarned = referralStore.getTotalEarned();
  const availableBalance = referralStore.getAvailableBalance();
  const withdrawnThisWeek = referralStore.getWithdrawnThisWeek();
  const weeklyRemaining = referralStore.getWeeklyRemaining();

  const referralCode = (user?.username || user?.fullName?.split(" ")[0]?.toUpperCase() || "USER") + "2024";
  const referralLink = `https://cryptoapp.com/ref/${referralCode}`;

  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [showWithdrawals, setShowWithdrawals] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Join me on CryptoApp!", text: `Sign up with my code ${referralCode} and we both earn!`, url: referralLink });
    } else {
      copy(referralLink);
    }
  };

  const maxWithdraw = Math.min(availableBalance, weeklyRemaining);

  const submitWithdrawal = () => {
    const amt = parseFloat(withdrawAmt);
    if (!amt || amt <= 0) return toast({ title: "Enter a valid amount", variant: "destructive" });
    if (amt > maxWithdraw) return toast({ title: `Maximum you can withdraw is ${formatNgn(maxWithdraw)}`, variant: "destructive" });
    referralStore.addWithdrawal(amt);
    setWithdrawAmt("");
    toast({ title: "Withdrawal request submitted!", description: "Awaiting admin approval." });
    // Force re-render by navigating to same page
    navigate(0);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background px-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between pt-4 mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-bold">Refer & Earn</h1>
          </div>
          <button className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <HelpCircle size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Banner */}
        <div className="rounded-2xl bg-primary p-6 mb-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
          <div className="relative z-10">
            <p className="text-2xl font-bold text-primary-foreground mb-2">
              Earn {formatNgn(config.rewardAmountNgn)} per Referral
            </p>
            <p className="text-sm text-primary-foreground/80">
              Your friend signs up, verifies KYC, and makes their first trade — you earn {formatNgn(config.rewardAmountNgn)}!
            </p>
          </div>
          <span className="absolute left-4 bottom-2 text-4xl">🏆</span>
          <span className="absolute right-4 bottom-2 text-4xl">🏆</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-card rounded-2xl p-4 border border-border/20 text-center">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase mb-1">Total Earned</p>
            <p className="text-xl font-bold text-primary">{formatNgn(totalEarned)}</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border/20 text-center">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase mb-1">Available</p>
            <p className="text-xl font-bold text-green-500">{formatNgn(availableBalance)}</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border/20 text-center mb-6">
          <p className="text-[10px] tracking-widest text-muted-foreground uppercase mb-1">Weekly Withdrawal</p>
          <p className="text-lg font-bold">
            <span className="text-foreground">{formatNgn(withdrawnThisWeek)}</span>
            <span className="text-muted-foreground"> / {formatNgn(config.weeklyWithdrawLimitNgn)}</span>
          </p>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${Math.min(100, (withdrawnThisWeek / config.weeklyWithdrawLimitNgn) * 100)}%` }}
            />
          </div>
        </div>

        {/* Referral Code */}
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
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium truncate">{referralLink}</p>
              <button onClick={() => copy(referralLink)}>
                <Copy size={14} className="text-primary shrink-0" />
              </button>
            </div>
          </div>
          <Button className="w-full mt-4 gap-2 rounded-xl" onClick={share}>
            <Share2 size={16} /> Share Referral Link
          </Button>
        </div>

        {/* Referral List */}
        <p className="text-xs tracking-widest text-muted-foreground uppercase mb-3">Your Referrals ({referrals.length})</p>
        <div className="space-y-2 mb-6">
          {referrals.map((r) => (
            <div key={r.id} className="bg-card rounded-2xl p-4 border border-border/20 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{r.referredName}</p>
                <p className="text-xs text-muted-foreground">{r.referredEmail}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {new Date(r.dateJoined).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <Badge className={`${statusColor(r.status)} border-0 text-[10px]`}>
                  {statusLabel(r.status)}
                </Badge>
                <p className={`text-sm font-bold ${r.rewardUnlocked ? "text-green-500" : "text-muted-foreground"}`}>
                  {r.rewardUnlocked ? "+" : ""}{formatNgn(r.rewardAmountNgn)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Withdraw Earnings */}
        <p className="text-xs tracking-widest text-muted-foreground uppercase mb-3">Withdraw Earnings</p>
        <div className="bg-card rounded-2xl p-5 border border-border/20 mb-6">
          <p className="text-xs text-muted-foreground mb-2">
            Max: {formatNgn(maxWithdraw)} (weekly limit: {formatNgn(weeklyRemaining)} remaining)
          </p>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount (NGN)"
              value={withdrawAmt}
              onChange={(e) => setWithdrawAmt(e.target.value)}
              className="rounded-xl"
            />
            <Button className="rounded-xl shrink-0" onClick={submitWithdrawal}>
              Request
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">Withdrawal requires admin approval before funds are sent to your Naira wallet.</p>
        </div>

        {/* Withdrawal History */}
        <button
          className="flex items-center justify-between w-full mb-3"
          onClick={() => setShowWithdrawals(!showWithdrawals)}
        >
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Withdrawal History ({withdrawals.length})</p>
          {showWithdrawals ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </button>
        {showWithdrawals && (
          <div className="space-y-2 mb-6">
            {withdrawals.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No withdrawal requests yet</p>
            )}
            {withdrawals.map((w: WithdrawalRequest) => (
              <div key={w.id} className="bg-card rounded-2xl p-4 border border-border/20 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{formatNgn(w.amountNgn)}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(w.dateRequested).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <Badge className={`${withdrawalStatusColor(w.status)} border-0 text-[10px] capitalize`}>
                  {w.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
