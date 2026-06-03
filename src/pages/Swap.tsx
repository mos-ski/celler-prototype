import { useState } from "react";
import { Button } from "@/components/ui/button";
import { COINS, getCoin, coinToUsd, usdToCoin, usdToNgn, formatUsd, formatCoin, store, genId, type CoinId } from "@/lib/crypto";
import { X, ChevronDown, ArrowDownUp, Info, ArrowRight } from "lucide-react";
import TransactionTimeline from "@/components/TransactionTimeline";
import CoinIcon from "@/components/CoinIcon";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { worldcup } from "@/lib/worldcup";
import { BONUS_CARDS } from "@/data/worldcupData";
import { toast } from "sonner";

type Step = "amount" | "select-from" | "select-to" | "review" | "success";

export default function SwapPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("amount");
  const [fromCoin, setFromCoin] = useState<CoinId>("USDT");
  const [toCoin, setToCoin] = useState<CoinId>("USDC");
  const [amount, setAmount] = useState("");
  const wallet = store.getWallet();

  const fromBalance = wallet[fromCoin] || 0;
  const qty = parseFloat(amount) || 0;
  const usdValue = coinToUsd(fromCoin, qty);
  const toQty = usdToCoin(toCoin, usdValue);
  const rate = getCoin(toCoin).marketPriceUsd / getCoin(fromCoin).marketPriceUsd;
  const fee = qty * 0.002;

  const setPercent = (pct: number) => setAmount(String((fromBalance * pct).toFixed(6)));
  const swapCoins = () => { const tmp = fromCoin; setFromCoin(toCoin); setToCoin(tmp); setAmount(""); };

  const confirm = () => {
    store.updateWalletCoin(fromCoin, -qty);
    store.updateWalletCoin(toCoin, toQty);
    store.addTransaction({ id: genId(), type: "swap", fromCoin, toCoin, quantity: qty, toQuantity: toQty, usdValue, ngnValue: usdToNgn(usdValue), date: new Date().toISOString(), status: "completed" });
    worldcup.awardBonus("crypto");
    toast("🏆 +" + BONUS_CARDS.crypto + " Worldcup cards", {
      description: "Crypto trade bonus",
      action: { label: "Open", onClick: () => navigate("/worldcup") },
    });
    setStep("success");
  };

  const renderCoinSelect = (selecting: "from" | "to") => {
    const excluded = selecting === "from" ? toCoin : fromCoin;
    return (
      <PageTransition>
        <div className="min-h-screen bg-background pt-4 px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Select {selecting === "from" ? "From" : "To"} Coin</h2>
            <button onClick={() => setStep("amount")} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-1">
            {COINS.filter((c) => c.id !== excluded && c.id !== "NGN").map((c) => (
              <button key={c.id} onClick={() => { selecting === "from" ? setFromCoin(c.id) : setToCoin(c.id); setAmount(""); setStep("amount"); }}
                className="w-full flex items-center justify-between py-4 px-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <CoinIcon coinId={c.id} />
                  <div className="text-left">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.id} · {formatUsd(c.marketPriceUsd)}</p>
                  </div>
                </div>
                <ChevronDown size={18} className="text-muted-foreground rotate-[-90deg]" />
              </button>
            ))}
          </div>
        </div>
      </PageTransition>
    );
  };

  if (step === "select-from") return renderCoinSelect("from");
  if (step === "select-to") return renderCoinSelect("to");

  if (step === "review") {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex flex-col">
          {/* Dimmed background */}
          <div className="flex-1 opacity-30 pointer-events-none px-4 pt-4">
            <div className="flex items-center justify-between mb-2">
              <button className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center"><X size={18} /></button>
            </div>
            <h1 className="text-xl font-bold">Swap crypto</h1>
          </div>

          {/* Bottom sheet */}
          <div className="bg-card rounded-t-3xl p-6 space-y-4 border-t border-border/30 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Confirm Swap</h2>
              <button onClick={() => setStep("amount")} className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 py-4">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                <CoinIcon coinId={fromCoin} size={40} />
              </div>
              <ArrowDownUp size={20} className="text-muted-foreground" />
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                <CoinIcon coinId={toCoin} size={40} />
              </div>
            </div>

            <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Exchange Rate</span>
                <span className="font-medium">1 {fromCoin} = {rate.toFixed(6)} {toCoin}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee (0.2%)</span>
                <span className="font-medium">{fee.toFixed(6)} {fromCoin}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Slippage Tolerance</span>
                <span className="font-medium">0.5%</span>
              </div>
              <div className="border-t border-border/20 pt-3 flex justify-between text-sm">
                <span className="text-muted-foreground">Minimum Received</span>
                <div className="flex items-center gap-1">
                  <Info size={12} className="text-muted-foreground" />
                  <span className="font-medium">{(toQty * 0.995).toFixed(6)} {toCoin}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-xl p-3 flex items-start gap-2">
              <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-500">Please review all details carefully. This transaction cannot be reversed once confirmed.</p>
            </div>

            <Button className="w-full h-14 rounded-2xl text-base font-semibold" onClick={confirm} disabled={qty <= 0 || qty > fromBalance}>
              Confirm Swap
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (step === "success") {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex flex-col items-center pt-20 px-4">
          <div className="flex items-center gap-3">
            <CoinIcon coinId={fromCoin} size={48} />
            <ArrowRight size={20} className="text-muted-foreground" />
            <CoinIcon coinId={toCoin} size={48} />
          </div>
          <h2 className="text-xl font-bold mt-6 text-center">Swap Successful!</h2>
          <p className="text-muted-foreground mt-1">{formatCoin(qty)} {fromCoin} → {formatCoin(toQty)} {toCoin}</p>

          <TransactionTimeline
            steps={[
              { label: "Order Received" },
              { label: "Order Accepted" },
              { label: "Swap Completed" },
            ]}
            durationMs={4000}
          />

          <div className="w-full mt-10 space-y-4">
            <div className="flex justify-between text-sm border-b border-border/20 pb-3">
              <span className="text-muted-foreground">From</span>
              <span className="font-medium">{formatCoin(qty)} {fromCoin}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-border/20 pb-3">
              <span className="text-muted-foreground">To</span>
              <span className="font-medium">{formatCoin(toQty)} {toCoin}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">USD Value</span>
              <span className="font-medium">{formatUsd(usdValue)}</span>
            </div>
          </div>

          <div className="mt-auto w-full pb-8 pt-8">
            <Button className="w-full h-14 rounded-2xl text-base font-semibold gap-2" onClick={() => navigate("/dashboard")}>
              Go Home <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Card-based amount entry (matching reference design)
  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col pt-4 px-4">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        <h1 className="text-xl font-bold mb-4">Swap crypto</h1>

        {/* Percentage buttons */}
        <div className="flex justify-end gap-2 mb-3">
          {[0.25, 0.5, 0.75, 1].map(pct => (
            <button key={pct} onClick={() => setPercent(pct)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              {pct === 1 ? "Max" : `${pct * 100}%`}
            </button>
          ))}
        </div>

        {/* From card */}
        <div className="bg-card rounded-2xl p-4 border border-border/20 mb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">From</span>
            <span className="text-xs text-muted-foreground">📋 {formatCoin(fromBalance, 6)}</span>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => setStep("select-from")} className="flex items-center gap-2 bg-secondary rounded-full px-3 py-2">
              <CoinIcon coinId={fromCoin} size={24} />
              <span className="text-sm font-medium">{fromCoin}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
            <div className="text-right">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="0"
                className="text-2xl font-bold bg-transparent outline-none text-right w-32"
              />
              <p className="text-xs text-muted-foreground">≈ {formatUsd(usdValue)}</p>
            </div>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center -my-3 z-10">
          <button onClick={swapCoins} className="h-10 w-10 rounded-full bg-secondary border border-border/30 flex items-center justify-center hover:bg-secondary/80 transition-colors">
            <ArrowDownUp size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* To card */}
        <div className="bg-card rounded-2xl p-4 border border-border/20 mt-2 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">To</span>
            <span className="text-xs text-muted-foreground">📋 {formatCoin(wallet[toCoin] || 0, 6)}</span>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => setStep("select-to")} className="flex items-center gap-2 bg-secondary rounded-full px-3 py-2">
              <CoinIcon coinId={toCoin} size={24} />
              <span className="text-sm font-medium">{toCoin}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
            <div className="text-right">
              <p className="text-2xl font-bold">{qty > 0 ? formatCoin(toQty, 4) : "0"}</p>
              <p className="text-xs text-muted-foreground">≈ {formatUsd(usdValue)}</p>
            </div>
          </div>
        </div>

        {/* Rate info */}
        <div className="bg-card rounded-2xl p-4 border border-border/20 space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Rate</span>
            <span className="font-medium">1 {fromCoin} ≈ {rate.toFixed(6)} {toCoin}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee (0.2%)</span>
            <span className="font-medium">{fee.toFixed(6)} {fromCoin}</span>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Slippage</span>
              <Info size={12} className="text-muted-foreground" />
            </div>
            <span className="font-medium">0.5%</span>
          </div>
        </div>

        <div className="mt-auto pb-6">
          <Button className="w-full h-14 rounded-2xl text-base font-semibold" disabled={qty <= 0 || qty > fromBalance} onClick={() => setStep("review")}>
            Swap
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
