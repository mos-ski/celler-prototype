import { useState } from "react";
import { Copy, ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { customers, customerTabs } from "@/data/adminMockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const Customers = () => {
  const [activeTab, setActiveTab] = useState("All Customers");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 overflow-x-auto border-b border-border no-scrollbar">
        {customerTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center gap-2 pb-2 text-sm font-medium whitespace-nowrap ${activeTab === tab.label ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            {tab.label} <span className="text-xs text-muted-foreground">{tab.count.toLocaleString()}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">All Customers</h2>
        <button onClick={() => toast.info("Exporting...")} className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
          Export
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden lg:table-cell">Phone</TableHead>
              <TableHead>KYC</TableHead>
              <TableHead className="hidden lg:table-cell">Trades</TableHead>
              <TableHead className="hidden lg:table-cell">Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/admin/customers/${c.id}`)}>
                <TableCell className="text-foreground">{c.sn}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">{c.initial}</span>
                    <span className="text-foreground">{c.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground">{c.email}</span>
                    <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(c.email); toast.success("Copied!"); }}>
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-foreground">{c.phone}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    c.kycStatus === "Verified" ? "bg-success/15 text-success" :
                    c.kycStatus === "Pending" ? "bg-yellow-500/15 text-yellow-500" :
                    "bg-destructive/15 text-destructive"
                  }`}>
                    {c.kycLevel === "None" ? "None" : c.kycLevel}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-foreground">{c.totalTrades}</TableCell>
                <TableCell className="hidden lg:table-cell text-foreground">{c.lastLogin}</TableCell>
                <TableCell>
                  <span className={`text-xs font-medium ${c.status === "Active" ? "text-success" : c.status === "Suspended" ? "text-destructive" : "text-muted-foreground"}`}>
                    {c.status}
                  </span>
                </TableCell>
                <TableCell><ChevronRight className="h-4 w-4 text-muted-foreground" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {customers.map((c) => (
          <div key={c.id} className="rounded-xl border border-border bg-card">
            <button
              onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
              className="flex w-full items-center justify-between p-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">{c.initial}</span>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                      c.kycStatus === "Verified" ? "bg-success/15 text-success" :
                      c.kycStatus === "Pending" ? "bg-yellow-500/15 text-yellow-500" :
                      "bg-destructive/15 text-destructive"
                    }`}>
                      {c.kycLevel === "None" ? "None" : c.kycLevel}
                    </span>
                    <span className={`text-[10px] font-medium ${c.status === "Active" ? "text-success" : "text-destructive"}`}>{c.status}</span>
                  </div>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedId === c.id ? "rotate-180" : ""}`} />
            </button>
            {expandedId === c.id && (
              <div className="border-t border-border px-3 pb-3 pt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground text-xs">{c.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="text-foreground">{c.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trades</span>
                  <span className="text-foreground">{c.totalTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Login</span>
                  <span className="text-foreground">{c.lastLogin}</span>
                </div>
                <button
                  onClick={() => navigate(`/admin/customers/${c.id}`)}
                  className="mt-1 w-full rounded-lg bg-accent py-2 text-xs font-medium text-foreground"
                >
                  View Details →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end">
        <div className="flex items-center gap-1">
          <button className="rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent">‹</button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} className={`rounded px-2 py-1 text-sm ${n === 1 ? "bg-foreground text-background" : "text-muted-foreground hover:bg-accent"}`}>{n}</button>
          ))}
          <span className="px-1 text-muted-foreground">...</span>
          <button className="rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent">234</button>
          <button className="rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent">›</button>
        </div>
      </div>
    </div>
  );
};

export default Customers;
