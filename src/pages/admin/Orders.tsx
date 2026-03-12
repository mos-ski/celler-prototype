import { useState } from "react";
import { adminOrders, orderTabs } from "@/data/adminMockData";
import CoinIcon from "@/components/CoinIcon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNgn } from "@/lib/crypto";
import { ChevronDown } from "lucide-react";

const transactionTabs = [
  { label: "All Transactions", count: 5186 },
  { label: "Buy", count: 1842 },
  { label: "Sell", count: 2103 },
  { label: "Swap", count: 431 },
  { label: "Deposit", count: 612 },
  { label: "Withdraw", count: 198 },
  { label: "Giftcard", count: 85 },
];

const giftcardTxns = [
  { id: "gc-t1", coin: "NGN" as const, type: "Giftcard" as const, amount: "₦45,000", amountUsd: 31.91, amountNgn: 45000, userName: "Adebayo Olamide", userInitial: "A", status: "Completed" as const, date: "8 Mar 2026, 2:15 PM" },
  { id: "gc-t2", coin: "NGN" as const, type: "Giftcard" as const, amount: "₦120,000", amountUsd: 85.11, amountNgn: 120000, userName: "Chioma Eze", userInitial: "C", status: "Pending" as const, date: "8 Mar 2026, 1:30 PM" },
  { id: "gc-t3", coin: "NGN" as const, type: "Giftcard" as const, amount: "₦25,000", amountUsd: 17.73, amountNgn: 25000, userName: "Kemi Adeyemi", userInitial: "K", status: "Completed" as const, date: "7 Mar 2026, 5:00 PM" },
];

const allTransactions = [...adminOrders, ...giftcardTxns];

const typeColor = (type: string) => {
  switch (type) {
    case "Buy": return "bg-success/15 text-success";
    case "Sell": return "bg-primary/15 text-primary";
    case "Swap": return "bg-yellow-500/15 text-yellow-500";
    case "Deposit": return "bg-blue-500/15 text-blue-500";
    case "Withdraw": return "bg-orange-500/15 text-orange-500";
    case "Giftcard": return "bg-purple-500/15 text-purple-500";
    default: return "bg-muted text-muted-foreground";
  }
};

const statusIcon = (status: string) => {
  if (status === "Completed") return "✓";
  if (status === "Pending") return "⏳";
  return "✗";
};

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("All Transactions");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredOrders = activeTab === "All Transactions"
    ? allTransactions
    : allTransactions.filter((o) => o.type === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 overflow-x-auto border-b border-border no-scrollbar">
        {transactionTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center gap-2 pb-2 text-sm font-medium whitespace-nowrap ${activeTab === tab.label ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            {tab.label} <span className="text-xs text-muted-foreground">{tab.count.toLocaleString()}</span>
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>NGN Value</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {order.coin === "NGN" ? (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15 text-success font-bold text-sm">₦</span>
                    ) : (
                      <CoinIcon coinId={order.coin} size={32} />
                    )}
                    <span className="font-medium text-foreground">{order.coin}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColor(order.type)}`}>{order.type}</span>
                </TableCell>
                <TableCell className="text-foreground">{order.amount}</TableCell>
                <TableCell className="text-foreground">{formatNgn(order.amountNgn)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">{order.userInitial}</span>
                    <span className="text-foreground">{order.userName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-sm ${order.status === "Completed" ? "text-success" : order.status === "Pending" ? "text-yellow-500" : "text-destructive"}`}>
                    {statusIcon(order.status)} {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-foreground">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {filteredOrders.map((order) => (
          <div key={order.id} className="rounded-xl border border-border bg-card">
            <button
              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              className="flex w-full items-center justify-between p-3"
            >
              <div className="flex items-center gap-3">
                {order.coin === "NGN" ? (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15 text-success font-bold text-sm">₦</span>
                ) : (
                  <CoinIcon coinId={order.coin} size={32} />
                )}
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{order.amount}</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${typeColor(order.type)}`}>{order.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.userName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${order.status === "Completed" ? "text-success" : order.status === "Pending" ? "text-yellow-500" : "text-destructive"}`}>
                  {statusIcon(order.status)}
                </span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedId === order.id ? "rotate-180" : ""}`} />
              </div>
            </button>
            {expandedId === order.id && (
              <div className="border-t border-border px-3 pb-3 pt-2 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NGN Value</span>
                  <span className="text-foreground font-medium">{formatNgn(order.amountNgn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`font-medium ${order.status === "Completed" ? "text-success" : order.status === "Pending" ? "text-yellow-500" : "text-destructive"}`}>{order.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground">{order.date}</span>
                </div>
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
          <button className="rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent">519</button>
          <button className="rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent">›</button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
