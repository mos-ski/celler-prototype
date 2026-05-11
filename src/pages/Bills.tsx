import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { BILL_CATEGORIES } from "@/data/billsData";
import { store, formatNgn } from "@/lib/crypto";

export default function Bills() {
  const navigate = useNavigate();
  const wallet = store.getWallet();

  return (
    <PageTransition>
      <div className="space-y-5 pt-2 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold">Pay Bills</h1>
        </div>

        <div className="rounded-2xl bg-secondary p-4">
          <p className="text-xs text-muted-foreground">Naira Wallet Balance</p>
          <p className="text-2xl font-bold mt-1">{formatNgn(wallet.NGN || 0)}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Bills are paid from your Naira wallet.</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Categories</p>
          {BILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/bills/${cat.id}`)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40 hover:bg-secondary/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                  {cat.emoji}
                </div>
                <div>
                  <p className="font-semibold text-sm">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}