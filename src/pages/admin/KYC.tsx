import { useState } from "react";
import { customers } from "@/data/adminMockData";
import { kycTierConfig } from "@/data/kycConfig";
import { formatNgn } from "@/lib/crypto";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Eye, Shield } from "lucide-react";
import { toast } from "sonner";

const kycLogs = [
  { id: "kl1", user: "Adebayo Olamide", tier: "Tier 1", action: "Auto-approved", method: "BVN + Liveness", date: "15 Jan 2025, 2:30 PM", status: "approved" as const },
  { id: "kl2", user: "Adebayo Olamide", tier: "Tier 2", action: "Auto-approved", method: "ID + Address Proof", date: "20 Jan 2025, 10:15 AM", status: "approved" as const },
  { id: "kl3", user: "Chioma Eze", tier: "Tier 1", action: "Auto-approved", method: "BVN + Liveness", date: "22 Jan 2025, 3:45 PM", status: "approved" as const },
  { id: "kl4", user: "Chioma Eze", tier: "Tier 2", action: "Auto-approved", method: "ID + Address Proof", date: "25 Jan 2025, 9:00 AM", status: "approved" as const },
  { id: "kl5", user: "Chioma Eze", tier: "Tier 3", action: "Manual approval", method: "Employment + Risk Assessment", date: "1 Feb 2025, 11:30 AM", status: "approved" as const },
  { id: "kl6", user: "Fatima Bello", tier: "Tier 1", action: "Auto-approved", method: "BVN + Liveness", date: "1 Feb 2025, 4:20 PM", status: "approved" as const },
  { id: "kl7", user: "Emeka Nwosu", tier: "Tier 1", action: "Auto-approved", method: "BVN + Liveness", date: "5 Feb 2025, 1:00 PM", status: "approved" as const },
  { id: "kl8", user: "Emeka Nwosu", tier: "Tier 2", action: "Auto-approved", method: "ID + Address Proof", date: "8 Feb 2025, 8:45 AM", status: "approved" as const },
  { id: "kl9", user: "Oluwaseun Bakare", tier: "Tier 3", action: "Manual approval", method: "Employment + Risk Assessment", date: "25 Feb 2025, 3:00 PM", status: "approved" as const },
  { id: "kl10", user: "Chidinma Obi", tier: "Tier 1", action: "Pending review", method: "BVN + Liveness", date: "1 Mar 2025, 10:00 AM", status: "pending" as const },
  { id: "kl11", user: "Ibrahim Musa", tier: "Tier 1", action: "Rejected", method: "BVN mismatch", date: "5 Mar 2025, 2:15 PM", status: "rejected" as const },
];

// Tier 3 pending approvals
const tier3Pending = [
  { id: "t3p1", user: "Kemi Adeyemi", userId: "c7", submitted: "5 Mar 2026", documents: ["Employment Letter", "Tax Certificate", "Risk Questionnaire"], currentTier: "Tier 2" as const },
  { id: "t3p2", user: "Tunde Ajayi", userId: "c6", submitted: "7 Mar 2026", documents: ["Employment Letter", "Bank Statement", "Risk Questionnaire"], currentTier: "Tier 1" as const },
];

const tabs = ["Pending Approval", "Verification Log", "Overview"];

const AdminKYC = () => {
  const [activeTab, setActiveTab] = useState("Pending Approval");
  const [pendingList, setPendingList] = useState(tier3Pending);

  const handleApprove = (id: string, name: string) => {
    setPendingList(prev => prev.filter(p => p.id !== id));
    toast.success(`${name} approved for Tier 3`);
  };

  const handleReject = (id: string, name: string) => {
    setPendingList(prev => prev.filter(p => p.id !== id));
    toast.error(`${name}'s Tier 3 application rejected`);
  };

  const tierCounts = {
    none: customers.filter(c => c.kycLevel === "None").length,
    tier1: customers.filter(c => c.kycLevel === "Tier 1").length,
    tier2: customers.filter(c => c.kycLevel === "Tier 2").length,
    tier3: customers.filter(c => c.kycLevel === "Tier 3").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium whitespace-nowrap ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            {tab}
            {tab === "Pending Approval" && pendingList.length > 0 && (
              <span className="ml-1.5 rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">{pendingList.length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "Pending Approval" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Tier 3 requires manual review. Tiers 1 & 2 are auto-approved.</p>
          {pendingList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
              <CheckCircle className="h-10 w-10 text-success mb-3" />
              <p className="text-lg font-medium text-foreground">All caught up!</p>
              <p className="text-sm text-muted-foreground">No pending Tier 3 approvals</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingList.map(item => (
                <div key={item.id} className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
                          {item.user[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.user}</p>
                          <p className="text-xs text-muted-foreground">Currently {item.currentTier} → Requesting Tier 3</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Submitted: {item.submitted}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.documents.map(doc => (
                          <span key={doc} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => handleReject(item.id, item.user)} className="text-destructive border-destructive/30 hover:bg-destructive/10 flex-1 sm:flex-none">
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(item.id, item.user)} className="flex-1 sm:flex-none">
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "Verification Log" && (
        <div className="rounded-xl border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kycLogs.map(log => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-foreground">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{log.tier}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{log.method}</TableCell>
                  <TableCell className="text-sm text-foreground">{log.action}</TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-1 text-sm ${
                      log.status === "approved" ? "text-success" : log.status === "pending" ? "text-yellow-500" : "text-destructive"
                    }`}>
                      {log.status === "approved" ? <CheckCircle className="h-3.5 w-3.5" /> : log.status === "pending" ? <Clock className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{log.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {activeTab === "Overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "No KYC", count: tierCounts.none, color: "text-muted-foreground" },
              { label: "Tier 1", count: tierCounts.tier1, color: "text-yellow-500" },
              { label: "Tier 2", count: tierCounts.tier2, color: "text-primary" },
              { label: "Tier 3", count: tierCounts.tier3, color: "text-success" },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Shield className="h-4 w-4" /> Tier Limits</h3>
            <div className="space-y-3">
              {Object.entries(kycTierConfig.getConfig()).map(([tier, config]) => (
                <div key={tier} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{tier.replace("tier", "Tier ")}</p>
                    <p className="text-xs text-muted-foreground">{config.method}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-foreground">Trade: {formatNgn(config.tradeLimitNgn)}</p>
                    <p className="text-muted-foreground">Withdraw: {formatNgn(config.withdrawLimitNgn)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKYC;
