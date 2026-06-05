import { useState } from "react";
import { store, formatNgn, getTxLabel, type Transaction, type TxType } from "@/lib/crypto";
import { Search, Phone, Wifi, Zap, Tv, Dices, ArrowUp, ArrowDown, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ANDROID_TX_TYPES: TxType[] = ["bill", "deposit", "withdraw"];

const TYPE_FILTERS: { label: string; value: TxType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Bills", value: "bill" },
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
];

const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

function groupByDate(txs: Transaction[]): Record<string, Transaction[]> {
  const groups: Record<string, Transaction[]> = {};
  txs.forEach((tx) => {
    const key = new Date(tx.date).toLocaleDateString("en-NG", {
      month: "short", day: "numeric", year: "numeric",
    });
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });
  return groups;
}

function TxEmoji({ tx }: { tx: Transaction }) {
  const desc = (tx.description ?? "").toLowerCase();
  if (tx.type === "deposit") return <ArrowDown size={18} className="text-green-500" />;
  if (tx.type === "withdraw") return <ArrowUp size={18} className="text-muted-foreground" />;
  if (desc.includes("airtime")) return <Phone size={18} className="text-indigo-400" />;
  if (desc.includes("data")) return <Wifi size={18} className="text-violet-400" />;
  if (desc.includes("electricity") || desc.includes("power")) return <Zap size={18} className="text-amber-400" />;
  if (desc.includes("tv") || desc.includes("dstv") || desc.includes("gotv")) return <Tv size={18} className="text-emerald-400" />;
  if (desc.includes("bet") || desc.includes("sport")) return <Dices size={18} className="text-red-400" />;
  return <Clock size={18} className="text-muted-foreground" />;
}

export default function AndroidHistory() {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState<TxType | "all">("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const all = store.getTransactions().filter((tx) => ANDROID_TX_TYPES.includes(tx.type as TxType));

  let filtered = typeFilter === "all" ? all : all.filter((tx) => tx.type === typeFilter);
  if (statusFilter !== "all") filtered = filtered.filter((tx) => tx.status === statusFilter);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((tx) =>
      getTxLabel(tx).toLowerCase().includes(q) ||
      (tx.description ?? "").toLowerCase().includes(q)
    );
  }

  const grouped = groupByDate(filtered);

  return (
    <div className="pt-4 pb-4">
      <h1 className="text-2xl font-bold mb-4">History</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="w-full bg-secondary rounded-xl pl-10 pr-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Type filter chips */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setTypeFilter(f.value)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              typeFilter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Status filter chips */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              statusFilter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">No transactions found.</p>
      ) : (
        Object.entries(grouped).map(([date, txs]) => (
          <div key={date}>
            <p className="text-xs text-muted-foreground font-medium mb-3 mt-4">{date}</p>
            <div>
              {txs.map((tx) => {
                const isCredit = tx.type === "deposit";
                return (
                  <button
                    key={tx.id}
                    onClick={() => navigate(`/a/transaction/${tx.id}`)}
                    className="w-full flex items-center justify-between py-4 border-b border-border/20 last:border-0 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                        <TxEmoji tx={tx} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.description ?? getTxLabel(tx)}</p>
                        <p className={`text-xs ${
                          tx.status === "completed" ? "text-green-500"
                          : tx.status === "failed" ? "text-destructive"
                          : "text-primary"
                        }`}>
                          {tx.status === "completed" ? "Completed" : tx.status === "failed" ? "Failed" : "Pending"}
                        </p>
                      </div>
                    </div>
                    <p className={`text-sm font-semibold ${isCredit ? "text-green-500" : ""}`}>
                      {isCredit ? "+" : "-"}{formatNgn(tx.ngnValue)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
