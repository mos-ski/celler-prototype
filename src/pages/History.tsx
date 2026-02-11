import { useState } from "react";
import { store, formatUsd, formatCoin, getTxLabel, type Transaction, type TxType } from "@/lib/crypto";
import CoinIcon from "@/components/CoinIcon";
import TxIcon from "@/components/TxIcon";
import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

const FILTERS: { label: string; value: TxType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Buy", value: "buy" },
  { label: "Sell", value: "sell" },
  { label: "Swap", value: "swap" },
  { label: "Send", value: "send" },
  { label: "Receive", value: "receive" },
];

function groupByDate(txs: Transaction[]): Record<string, Transaction[]> {
  const groups: Record<string, Transaction[]> = {};
  txs.forEach(tx => {
    const d = new Date(tx.date);
    const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });
  return groups;
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<TxType | "all">("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const transactions = store.getTransactions();

  let filtered = filter === "all" ? transactions : transactions.filter((tx) => tx.type === filter);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(tx => getTxLabel(tx).toLowerCase().includes(q) || tx.coin?.toLowerCase().includes(q));
  }

  const grouped = groupByDate(filtered);

  return (
    <PageTransition>
      <div className="pt-4 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Transactions History</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <SlidersHorizontal size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search...."
            className="w-full bg-secondary rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Filter chips */}
        {showFilters && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === f.value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-12 text-center">No transactions found.</p>
        ) : (
          <div>
            {Object.entries(grouped).map(([date, txs]) => (
              <div key={date}>
                <p className="text-xs text-success font-medium mb-3 mt-4">{date}</p>
                <div className="space-y-0">
                  {txs.map((tx) => (
                    <button
                      key={tx.id}
                      onClick={() => navigate(`/transaction/${tx.id}`)}
                      className="w-full flex items-center justify-between py-4 border-b border-border/20 last:border-0 text-left hover:bg-secondary/30 transition-colors rounded-lg px-1"
                    >
                      <div className="flex items-center gap-3">
                        <TxIcon tx={tx} />
                        <div>
                          <p className="text-sm font-medium">{getTxLabel(tx)}</p>
                          <p className="text-xs text-success">Completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatCoin(tx.quantity, 6)}</p>
                        <p className="text-xs text-muted-foreground">{formatUsd(tx.usdValue)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
