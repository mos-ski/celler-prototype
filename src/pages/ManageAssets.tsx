import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store, COINS, formatUsd, type CoinId } from "@/lib/crypto";
import CoinIcon from "@/components/CoinIcon";
import { ArrowLeft, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";

export default function ManageAssetsPage() {
  const navigate = useNavigate();
  const [visibleCoins, setVisibleCoins] = useState<CoinId[]>(store.getVisibleCoins());

  const toggle = (coinId: CoinId) => {
    let updated: CoinId[];
    if (visibleCoins.includes(coinId)) {
      updated = visibleCoins.filter(c => c !== coinId);
    } else {
      updated = [...visibleCoins, coinId];
      toast({ title: "Asset Successfully Added" });
    }
    setVisibleCoins(updated);
    store.setVisibleCoins(updated);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-8">
        <div className="flex items-center gap-3 pt-4 mb-6 px-4">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
        </div>
        <h1 className="text-2xl font-bold px-4 mb-6">Assets</h1>

        <div className="px-4 space-y-1">
          {COINS.map((c) => (
            <div key={c.id} className="flex items-center justify-between py-4 border-b border-border/20 last:border-0">
              <div className="flex items-center gap-3">
                <CoinIcon coinId={c.id} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{c.id}</span>
                    <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{formatUsd(c.marketPriceUsd)}</span>
                    <span className="text-xs text-success">+3.09%</span>
                  </div>
                </div>
              </div>
              <Switch
                checked={visibleCoins.includes(c.id)}
                onCheckedChange={() => toggle(c.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
