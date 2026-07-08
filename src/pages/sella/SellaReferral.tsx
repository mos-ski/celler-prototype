import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Copy, HelpCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function SellaReferral() {
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
  const referralLink = `https://sella.app/ref/${referralCode}`;

  const [withdrawAmt, setWithdrawAmt] = useState("");

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Join me on Sella!", text: `Sign up with my code ${referralCode} and we both earn!`, url: referralLink });
    } else {
      copy(referralLink);
    }
  };

  const maxWithdraw = Math.min(availableBalance, weeklyRemaining);

  const submitWithdrawal = () => {
    const amt = parseFloat(withdrawAmt);
    if (!amt || amt <= 0) return toast({ title: "Enter a valid amount", variant: "destructive" });
    if (amt > maxWithdraw) return toast({ title: `Maximum: ${formatNgn(maxWithdraw)}`, variant: "destructive" });
    referralStore.addWithdrawal(amt);
    setWithdrawAmt("");
    toast({ title: "Withdrawal request submitted!", description: "Awaiting admin approval." });
    navigate(0);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background px-4 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between pt-4 mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-bold">Refer & Earn</h1>
          </div>
          <button className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            <HelpCircle size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Banner - compact */}
        <div className="rounded-2xl bg-primary p-4 mb-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
          <div className="relative z-10">
            <p className="text-lg font-bold text-primary-foreground">Earn {formatNgn(config.rewardAmountNgn)} per Referral 🏆</p>
            <p className="text-xs text-primary-foreground/80 mt-1">Friend signs up → verifies KYC → makes first trade</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-card rounded-xl p-3 border border-border/20 text-center">
            <p className="text-[9px] tracking-widest text-muted-foreground uppercase">Earned</p>
            <p className="text-sm font-bold text-primary">{formatNgn(totalEarned)}</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border/20 text-center">
            <p className="text-[9px] tracking-widest text-muted-foreground uppercase">Available</p>
            <p className="text-sm font-bold text-green-500">{formatNgn(availableBalance)}</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border/20 text-center">
            <p className="text-[9px] tracking-widest text-muted-foreground uppercase">This Week</p>
            <p className="text-sm font-bold">{formatNgn(withdrawnThisWeek)}</p>
            <div className="mt-1 h-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (withdrawnThisWeek / config.weeklyWithdrawLimitNgn) * 100)}%` }} />
            </div>
          </div>
        </div>

        {/* Code + Share */}
        <div className="bg-card rounded-xl p-4 border border-border/20 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[9px] tracking-widest text-muted-foreground uppercase">Your Code</p>
              <p className="text-lg font-bold text-primary">{referralCode}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="h-8 gap-1 text-xs" onClick={() => copy(referralCode)}>
                <Copy size={12} /> Copy
              </Button>
              <Button size="sm" className="h-8 gap-1 text-xs" onClick={share}>
                <Share2 size={12} /> Share
              </Button>
            </div>
          </div>
          <div className="border-t border-border/20 pt-2 flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground truncate">{referralLink}</p>
            <button onClick={() => copy(referralLink)}><Copy size={12} className="text-primary shrink-0" /></button>
          </div>
        </div>

        {/* Withdraw inline */}
        <div className="bg-card rounded-xl p-4 border border-border/20 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold">Withdraw Earnings</p>
            <p className="text-[10px] text-muted-foreground">Max: {formatNgn(maxWithdraw)}</p>
          </div>
          <div className="flex gap-2">
            <Input type="number" placeholder="Amount (NGN)" value={withdrawAmt} onChange={(e) => setWithdrawAmt(e.target.value)} className="rounded-xl h-9 text-sm" />
            <Button className="rounded-xl h-9 shrink-0 text-sm" onClick={submitWithdrawal}>Request</Button>
          </div>
          <p className="text-[9px] text-muted-foreground mt-1">Requires admin approval • credited to Naira wallet</p>
        </div>

        {/* Tabs: Referrals / Withdrawals */}
        <Tabs defaultValue="referrals" className="w-full">
          <TabsList className="w-full mb-3">
            <TabsTrigger value="referrals" className="flex-1 text-xs">Referrals ({referrals.length})</TabsTrigger>
            <TabsTrigger value="withdrawals" className="flex-1 text-xs">Withdrawals ({withdrawals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="referrals" className="space-y-2 mt-0">
            {referrals.map((r) => (
              <div key={r.id} className="bg-card rounded-xl p-3 border border-border/20 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{r.referredName}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {r.referredEmail} · {new Date(r.dateJoined).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <Badge className={`${statusColor(r.status)} border-0 text-[9px] px-2 py-0`}>{statusLabel(r.status)}</Badge>
                  <p className={`text-xs font-bold ${r.rewardUnlocked ? "text-green-500" : "text-muted-foreground"}`}>
                    {r.rewardUnlocked ? "+" : ""}{formatNgn(r.rewardAmountNgn)}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-2 mt-0">
            {withdrawals.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No requests yet</p>}
            {withdrawals.map((w: WithdrawalRequest) => (
              <div key={w.id} className="bg-card rounded-xl p-3 border border-border/20 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{formatNgn(w.amountNgn)}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(w.dateRequested).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <Badge className={`${withdrawalStatusColor(w.status)} border-0 text-[9px] capitalize px-2 py-0`}>{w.status}</Badge>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}
