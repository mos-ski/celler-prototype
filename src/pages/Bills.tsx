import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { BILL_CATEGORIES } from "@/data/billsData";
import { store, formatNgn } from "@/lib/crypto";

function networkBg(network: string) {
  const n = network.toLowerCase();
  if (n === "mtn")    return "bg-yellow-500";
  if (n === "glo")    return "bg-green-600";
  if (n === "airtel") return "bg-red-600";
  if (n === "9mobile")return "bg-emerald-700";
  return "bg-primary";
}

export default function Bills() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAndroid = location.pathname.startsWith("/a/");
  const prefix = isAndroid ? "/a" : "";

  const wallet = store.getWallet();

  // Recent beneficiaries parsed from airtime/data bill history
  const beneficiaries = useMemo(() => {
    const txs = store.getTransactions().filter(
      (tx) =>
        tx.type === "bill" &&
        (tx.description?.includes("Airtime") || tx.description?.includes("Data")) &&
        tx.description?.includes(" - ")
    );
    const seen = new Set<string>();
    const result: Array<{
      label: string;
      providerId: string;
      identifier: string;
      category: "airtime" | "data";
    }> = [];
    for (const tx of txs) {
      const desc = tx.description ?? "";
      const dashIdx = desc.lastIndexOf(" - ");
      if (dashIdx === -1) continue;
      const identifier = desc.slice(dashIdx + 3).trim();
      if (!identifier || identifier.length < 7 || seen.has(identifier)) continue;
      seen.add(identifier);
      const firstWord = desc.split(" ")[0];
      const category = desc.includes("Airtime") ? ("airtime" as const) : ("data" as const);
      result.push({ label: firstWord, providerId: firstWord.toLowerCase(), identifier, category });
      if (result.length >= 5) break;
    }
    return result;
  }, []);

  return (
    <PageTransition>
      <div className="space-y-5 pt-2 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold">Pay Bills</h1>
        </div>

        <div className="rounded-2xl bg-secondary p-4">
          <p className="text-xs text-muted-foreground">Naira Wallet Balance</p>
          <p className="text-2xl font-bold mt-1">{formatNgn(wallet.NGN || 0)}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Bills are paid from your Naira wallet.</p>
        </div>

        {/* Recent Beneficiaries */}
        {beneficiaries.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Recent Beneficiaries
            </p>
            <div
              className="flex gap-5 overflow-x-auto pb-1 -mx-4 px-4"
              style={{ scrollbarWidth: "none" }}
            >
              {beneficiaries.map((b) => (
                <button
                  key={b.identifier}
                  onClick={() =>
                    navigate(
                      `${prefix}/bills/${b.category}?provider=${b.providerId}&identifier=${b.identifier}`
                    )
                  }
                  className="flex flex-col items-center gap-1.5 shrink-0"
                >
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${networkBg(b.label)}`}
                  >
                    {b.label.slice(0, 3)}
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">{b.label}</span>
                  <span className="text-[10px] text-muted-foreground">{b.identifier.slice(0, 8)}...</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Categories</p>
          {BILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`${prefix}/bills/${cat.id}`)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${cat.accent}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{cat.label}</p>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
