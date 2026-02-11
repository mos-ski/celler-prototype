import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { store, formatUsd, formatNgn, formatCoin, type Transaction, type TxType } from "@/lib/crypto";

const FILTERS: { label: string; value: TxType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Buy", value: "buy" },
  { label: "Sell", value: "sell" },
  { label: "Swap", value: "swap" },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<TxType | "all">("all");
  const transactions = store.getTransactions();
  const filtered = filter === "all" ? transactions : transactions.filter((tx) => tx.type === filter);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Transaction History</h1>

      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <Button key={f.value} variant={filter === f.value ? "default" : "outline"} size="sm" onClick={() => setFilter(f.value)}>
            {f.label}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No transactions found.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((tx) => (
            <TxCard key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </div>
  );
}

function TxCard({ tx }: { tx: Transaction }) {
  const isBuy = tx.type === "buy";
  const isSell = tx.type === "sell";
  const isSwap = tx.type === "swap";
  const color = isBuy ? "text-success" : isSell ? "text-destructive" : "text-primary";
  const label = isSwap ? `${tx.fromCoin} → ${tx.toCoin}` : `${tx.coin}`;

  return (
    <Card className="border-border/40">
      <CardContent className="py-3 px-4">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs font-semibold uppercase ${color}`}>{tx.type}</span>
          <span className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">
              {isSwap
                ? `${formatCoin(tx.quantity)} ${tx.fromCoin} → ${formatCoin(tx.toQuantity || 0)} ${tx.toCoin}`
                : `${formatCoin(tx.quantity)} ${tx.coin}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{formatUsd(tx.usdValue)}</p>
            <p className="text-xs text-muted-foreground">{formatNgn(tx.ngnValue)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
