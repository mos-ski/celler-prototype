import { useState } from "react";
import { Check, X, Gift } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatNgn, store } from "@/lib/crypto";
import {
  referralStore,
  statusLabel,
  statusColor,
  withdrawalStatusColor,
  type WithdrawalRequest,
  type Referral,
} from "@/lib/referral";

const AdminReferrals = () => {
  const [config, setConfig] = useState(referralStore.getConfig());
  const [referrals] = useState<Referral[]>(referralStore.getReferrals());
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(referralStore.getWithdrawals());
  const [activeTab, setActiveTab] = useState<"withdrawals" | "referrals" | "config">("withdrawals");

  const [rewardInput, setRewardInput] = useState(config.rewardAmountNgn.toString());
  const [limitInput, setLimitInput] = useState(config.weeklyWithdrawLimitNgn.toString());

  const totalEarned = referralStore.getTotalEarned();
  const totalPending = referralStore.getTotalPending();
  const totalApproved = referralStore.getTotalWithdrawnApproved();

  const handleApprove = (id: string) => {
    const updated = withdrawals.map((w) => {
      if (w.id === id) {
        store.updateWalletCoin("NGN", w.amountNgn);
        return { ...w, status: "approved" as const, dateResolved: new Date().toISOString() };
      }
      return w;
    });
    setWithdrawals(updated);
    referralStore.setWithdrawals(updated);
    toast.success("Withdrawal approved and credited to NGN wallet");
  };

  const handleReject = (id: string) => {
    const updated = withdrawals.map((w) =>
      w.id === id ? { ...w, status: "rejected" as const, dateResolved: new Date().toISOString() } : w
    );
    setWithdrawals(updated);
    referralStore.setWithdrawals(updated);
    toast.success("Withdrawal rejected");
  };

  const saveConfig = () => {
    const reward = parseFloat(rewardInput);
    const limit = parseFloat(limitInput);
    if (!reward || !limit || reward <= 0 || limit <= 0) {
      toast.error("Enter valid amounts");
      return;
    }
    const newConfig = { rewardAmountNgn: reward, weeklyWithdrawLimitNgn: limit };
    referralStore.setConfig(newConfig);
    setConfig(newConfig);
    toast.success("Referral config updated!");
  };

  const tabs = [
    { key: "withdrawals" as const, label: "Withdrawal Requests", count: withdrawals.filter((w) => w.status === "pending").length },
    { key: "referrals" as const, label: "All Referrals", count: referrals.length },
    { key: "config" as const, label: "Settings", count: null },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Gift className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Referrals</p>
              <p className="text-xl font-bold text-foreground">{referrals.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Total Earned</p>
          <p className="mt-1 text-xl font-bold text-foreground">{formatNgn(totalEarned)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Pending Payouts</p>
          <p className="mt-1 text-xl font-bold text-yellow-500">{formatNgn(totalPending)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Total Paid Out</p>
          <p className="mt-1 text-xl font-bold text-success">{formatNgn(totalApproved)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 overflow-x-auto border-b border-border no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 pb-2 text-sm font-medium whitespace-nowrap ${activeTab === tab.key ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${tab.count > 0 && tab.key === "withdrawals" ? "bg-yellow-500/15 text-yellow-500" : "bg-muted text-muted-foreground"}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Withdrawal Requests */}
      {activeTab === "withdrawals" && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date Requested</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Resolved</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No withdrawal requests</TableCell></TableRow>
                )}
                {withdrawals.map((w) => (
                  <TableRow key={w.id}>
                    <TableCell className="font-semibold text-foreground">{formatNgn(w.amountNgn)}</TableCell>
                    <TableCell className="text-foreground">{new Date(w.dateRequested).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                    <TableCell>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${withdrawalStatusColor(w.status)}`}>{w.status}</span>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {w.dateResolved ? new Date(w.dateResolved).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                    </TableCell>
                    <TableCell>
                      {w.status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleApprove(w.id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/15 text-success hover:bg-success/25 transition-colors"><Check className="h-4 w-4" /></button>
                          <button onClick={() => handleReject(w.id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/15 text-destructive hover:bg-destructive/25 transition-colors"><X className="h-4 w-4" /></button>
                        </div>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-2">
            {withdrawals.length === 0 && (
              <div className="text-center text-muted-foreground py-8 text-sm">No withdrawal requests</div>
            )}
            {withdrawals.map((w) => (
              <div key={w.id} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{formatNgn(w.amountNgn)}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${withdrawalStatusColor(w.status)}`}>{w.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Requested: {new Date(w.dateRequested).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                {w.status === "pending" && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleApprove(w.id)} className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-success/15 text-success py-1.5 text-xs font-medium hover:bg-success/25"><Check className="h-3 w-3" /> Approve</button>
                    <button onClick={() => handleReject(w.id)} className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-destructive/15 text-destructive py-1.5 text-xs font-medium hover:bg-destructive/25"><X className="h-3 w-3" /> Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* All Referrals */}
      {activeTab === "referrals" && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-foreground font-medium">{r.referredName}</TableCell>
                    <TableCell className="text-foreground">{r.referredEmail}</TableCell>
                    <TableCell className="text-foreground">{new Date(r.dateJoined).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                    <TableCell>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(r.status)}`}>{statusLabel(r.status)}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-semibold ${r.rewardUnlocked ? "text-success" : "text-muted-foreground"}`}>
                        {r.rewardUnlocked ? "+" : ""}{formatNgn(r.rewardAmountNgn)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-2">
            {referrals.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-sm">{r.referredName}</span>
                  <span className={`text-sm font-semibold ${r.rewardUnlocked ? "text-success" : "text-muted-foreground"}`}>
                    {r.rewardUnlocked ? "+" : ""}{formatNgn(r.rewardAmountNgn)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{r.referredEmail}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor(r.status)}`}>{statusLabel(r.status)}</span>
                  <span className="text-[11px] text-muted-foreground">{new Date(r.dateJoined).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Config */}
      {activeTab === "config" && (
        <div className="max-w-lg space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Referral Configuration</h3>
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">Reward Per Referral (NGN)</label>
              <Input value={rewardInput} onChange={(e) => setRewardInput(e.target.value)} type="number" />
              <p className="mt-1 text-xs text-muted-foreground">Amount earned when referred user completes all 3 steps</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">Weekly Withdrawal Limit (NGN)</label>
              <Input value={limitInput} onChange={(e) => setLimitInput(e.target.value)} type="number" />
              <p className="mt-1 text-xs text-muted-foreground">Maximum a user can withdraw per week from referral earnings</p>
            </div>
            <Button onClick={saveConfig}>Save Configuration</Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold text-foreground mb-2">Current Values</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reward per referral</span>
                <span className="font-medium text-foreground">{formatNgn(config.rewardAmountNgn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weekly limit</span>
                <span className="font-medium text-foreground">{formatNgn(config.weeklyWithdrawLimitNgn)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReferrals;
