import { useState } from "react";
import { referralStore, WithdrawalRequest, withdrawalStatusColor } from "@/lib/referral";
import { store, formatNgn } from "@/lib/crypto";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

const statusTabs = ["All", "Pending", "Approved", "Rejected"];

const AdminReferralWithdrawals = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [withdrawals, setWithdrawals] = useState(referralStore.getWithdrawals());

  const filteredWithdrawals = activeTab === "All"
    ? withdrawals
    : withdrawals.filter((w) => w.status === activeTab.toLowerCase());

  const handleApprove = (withdrawal: WithdrawalRequest) => {
    const list = referralStore.getWithdrawals();
    const item = list.find(w => w.id === withdrawal.id);
    if (item) {
      item.status = "approved";
      item.dateResolved = new Date().toISOString();
      referralStore.setWithdrawals(list);
      // Credit user NGN wallet
      store.updateWalletCoin("NGN", withdrawal.amountNgn);
      setWithdrawals([...list]);
      toast.success(`Approved! ${formatNgn(withdrawal.amountNgn)} credited to user wallet.`);
    }
  };

  const handleReject = (withdrawal: WithdrawalRequest) => {
    const list = referralStore.getWithdrawals();
    const item = list.find(w => w.id === withdrawal.id);
    if (item) {
      item.status = "rejected";
      item.dateResolved = new Date().toISOString();
      referralStore.setWithdrawals(list);
      setWithdrawals([...list]);
      toast.error("Withdrawal rejected.");
    }
  };

  const pendingCount = withdrawals.filter(w => w.status === "pending").length;
  const totalPending = withdrawals.filter(w => w.status === "pending").reduce((sum, w) => sum + w.amountNgn, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Requests</p>
          <p className="text-2xl font-bold text-foreground mt-1">{withdrawals.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-bold text-yellow-500 mt-1">{pendingCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending Value</p>
          <p className="text-2xl font-bold text-foreground mt-1">{formatNgn(totalPending)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Approved</p>
          <p className="text-2xl font-bold text-green-500 mt-1">
            {withdrawals.filter(w => w.status === "approved").length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border">
        {statusTabs.map((tab) => {
          const count = tab === "All" ? withdrawals.length : withdrawals.filter(w => w.status === tab.toLowerCase()).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 pb-2 text-sm font-medium ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            >
              {tab}
              {tab === "Pending" && pendingCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-white">
                  {pendingCount}
                </span>
              )}
              {tab !== "Pending" && <span className="text-xs text-muted-foreground">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date Resolved</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWithdrawals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No withdrawal requests found
                </TableCell>
              </TableRow>
            ) : (
              filteredWithdrawals.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {withdrawal.id}
                  </TableCell>
                  <TableCell className="font-bold text-foreground">
                    {formatNgn(withdrawal.amountNgn)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(withdrawal.dateRequested).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${withdrawalStatusColor(withdrawal.status)} border-0 capitalize`}>
                      {withdrawal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {withdrawal.dateResolved 
                      ? new Date(withdrawal.dateResolved).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
                      : "—"
                    }
                  </TableCell>
                  <TableCell>
                    {withdrawal.status === "pending" && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-500/10"
                          onClick={() => handleApprove(withdrawal)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          onClick={() => handleReject(withdrawal)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminReferralWithdrawals;
