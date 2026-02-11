import { useState } from "react";
import { store, formatUsd, formatNgn, formatCoin, type Transaction, type TxType } from "@/lib/crypto";
import { CoinIcon } from "./Dashboard";

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
    <div className="pt-4">
      <h1 className="text-2xl font-bold mb-4">History</h1>

      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f.value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">No transactions found.</p>
      ) : (
        <div className="space-y-1">
          {filtered.map((tx) => (
            <TxRow key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </div>
  );
}

function TxRow({ tx }: { tx: Transaction }) {
  const isSwap = tx.type === "swap";
  const coinId = isSwap ? tx.fromCoin! : tx.coin!;
  const label = isSwap ? `${tx.fromCoin} → ${tx.toCoin}` : `${tx.type === "buy" ? "Bought" : "Sold"} ${tx.coin}`;
  const color = tx.type === "buy" ? "text-success" : tx.type === "sell" ? "text-destructive" : "text-primary";

  return (
    <div className="flex items-center justify-between py-4 border-b border-border/20 last:border-0">
      <div className="flex items-center gap-3">
        <CoinIcon coinId={coinId} />
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${color}`}>{formatUsd(tx.usdValue)}</p>
        <p className="text-xs text-muted-foreground">
          {isSwap ? `${formatCoin(tx.quantity)} → ${formatCoin(tx.toQuantity || 0)}` : formatCoin(tx.quantity)}
        </p>
      </div>
    </div>
  );
}
