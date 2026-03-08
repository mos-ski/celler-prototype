import { useState } from "react";
import { adminOrders, orderTabs } from "@/data/adminMockData";
import CoinIcon from "@/components/CoinIcon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNgn } from "@/lib/crypto";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  const filteredOrders = activeTab === "All Orders"
    ? adminOrders
    : adminOrders.filter((o) => o.type === activeTab.replace("Withdraw", "Withdraw"));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 overflow-x-auto border-b border-border no-scrollbar">
        {orderTabs.map((tab) => (
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
              <TableHead>Coin</TableHead>
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
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm">
                      {coinIcons[order.coin] || order.coin}
                    </span>
                    <span className="font-medium text-foreground">{order.coin}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    order.type === "Buy" ? "bg-success/15 text-success" :
                    order.type === "Sell" ? "bg-primary/15 text-primary" :
                    order.type === "Swap" ? "bg-yellow-500/15 text-yellow-500" :
                    "bg-muted text-muted-foreground"
                  }`}>
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

export default Orders;
