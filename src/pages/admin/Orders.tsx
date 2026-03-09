import { useState } from "react";
import { adminOrders, orderTabs } from "@/data/adminMockData";
import CoinIcon from "@/components/CoinIcon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNgn } from "@/lib/crypto";

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

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("All Transactions");

  const filteredOrders = activeTab === "All Transactions"
    ? allTransactions
    : allTransactions.filter((o) => o.type === activeTab);

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

      <div className="rounded-xl border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">NGN Value</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
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
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColor(order.type)}`}>
                    {order.type}
                  </span>
                </TableCell>
                <TableCell className="text-foreground">{order.amount}</TableCell>
                <TableCell className="hidden md:table-cell text-foreground">{formatNgn(order.amountNgn)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
                      {order.userInitial}
                    </span>
                    <span className="text-foreground hidden md:inline">{order.userName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-sm ${order.status === "Completed" ? "text-success" : order.status === "Pending" ? "text-yellow-500" : "text-destructive"}`}>
                    {order.status === "Completed" ? "✓" : order.status === "Pending" ? "⏳" : "✗"} {order.status}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell text-foreground">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
