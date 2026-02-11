import { useState } from "react";
import { Button } from "@/components/ui/button";
import { COINS, getCoin, coinToUsd, usdToCoin, usdToNgn, formatUsd, formatCoin, store, genId, type CoinId } from "@/lib/crypto";
import { X, ChevronDown, ArrowRight, ArrowDownUp, CheckCircle, Circle } from "lucide-react";
import { CoinIcon } from "./Dashboard";
import { useNavigate } from "react-router-dom";

type Step = "amount" | "select-from" | "select-to" | "review" | "success";

export default function SwapPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("amount");
  const [fromCoin, setFromCoin] = useState<CoinId>("ETH");
  const [toCoin, setToCoin] = useState<CoinId>("BTC");
  const [amount, setAmount] = useState("0");
  const wallet = store.getWallet();

  const fromBalance = wallet[fromCoin] || 0;
  const qty = parseFloat(amount) || 0;
  const usdValue = coinToUsd(fromCoin, qty);
  const toQty = usdToCoin(toCoin, usdValue);

  const handleDigit = (d: string) => {
    setAmount((prev) => {
      if (d === "." && prev.includes(".")) return prev;
      if (prev === "0" && d !== ".") return d;
      return prev + d;
    });
  };
  const handleDelete = () => setAmount((prev) => prev.length <= 1 ? "0" : prev.slice(0, -1));
  const useMax = () => setAmount(String(fromBalance));

  const swapCoins = () => { const tmp = fromCoin; setFromCoin(toCoin); setToCoin(tmp); setAmount("0"); };

  const confirm = () => {
    store.updateWalletCoin(fromCoin, -qty);
    store.updateWalletCoin(toCoin, toQty);
    store.addTransaction({ id: genId(), type: "swap", fromCoin, toCoin, quantity: qty, toQuantity: toQty, usdValue, ngnValue: usdToNgn(usdValue), date: new Date().toISOString(), status: "completed" });
    setStep("success");
  };

  const renderCoinSelect = (selecting: "from" | "to") => {
    const excluded = selecting === "from" ? toCoin : fromCoin;
    return (
      <div className="min-h-screen bg-background pt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Select {selecting === "from" ? "From" : "To"} Coin</h2>
          <button onClick={() => setStep("amount")} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-1">
          {COINS.filter((c) => c.id !== excluded).map((c) => (
            <button key={c.id} onClick={() => { selecting === "from" ? setFromCoin(c.id) : setToCoin(c.id); setAmount("0"); setStep("amount"); }}
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
    );
  };

  if (step === "select-from") return renderCoinSelect("from");
  if (step === "select-to") return renderCoinSelect("to");

  if (step === "review") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between pt-4 mb-4">
          <span className="text-base font-semibold">Swap Crypto</span>
          <button onClick={() => setStep("amount")} className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
          <div className="flex items-center gap-3">
            <CoinIcon coinId={fromCoin} />
            <ArrowRight size={20} className="text-muted-foreground" />
            <CoinIcon coinId={toCoin} />
          </div>
          <p className="text-4xl font-bold mt-4">{formatCoin(qty)} {fromCoin}</p>
          <p className="text-muted-foreground">→ {formatCoin(toQty)} {toCoin}</p>
        </div>

        <div className="bg-card rounded-t-3xl p-6 space-y-4 border-t border-border/30">
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">{fromCoin} Price</span>
            <span className="font-medium">{formatUsd(getCoin(fromCoin).marketPriceUsd)}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">{toCoin} Price</span>
            <span className="font-medium">{formatUsd(getCoin(toCoin).marketPriceUsd)}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">USD Value</span>
            <span className="font-medium">{formatUsd(usdValue)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee:</span>
            <span className="font-medium">$0.01</span>
          </div>
          <Button className="w-full h-14 rounded-2xl text-base font-semibold gap-2" onClick={confirm} disabled={qty <= 0 || qty > fromBalance}>
            Confirm Swap <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center pt-20 px-4">
        <div className="flex items-center gap-3">
          <CoinIcon coinId={fromCoin} />
          <ArrowRight size={20} className="text-muted-foreground" />
          <CoinIcon coinId={toCoin} />
        </div>
        <h2 className="text-xl font-bold mt-6 text-center">Swap Successful!</h2>
        <p className="text-muted-foreground mt-1">{formatCoin(qty)} {fromCoin} → {formatCoin(toQty)} {toCoin}</p>

        <div className="flex items-center gap-0 mt-8 w-full max-w-xs">
          {["Order Received", "Order Accepted", "Swap Completed"].map((label, i) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <CheckCircle size={24} className="text-success" />
              <p className="text-[10px] text-muted-foreground mt-1 text-center leading-tight">{label}</p>
            </div>
          ))}
        </div>

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
    );
  }

  // Amount entry
  return (
    <div className="min-h-screen bg-background flex flex-col pt-4">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
          <X size={18} />
        </button>
      </div>

      <h1 className="text-xl font-bold text-muted-foreground">Swap Crypto</h1>

      <div className="mt-6 mb-2">
        <p className="text-xs text-muted-foreground mb-1">From ({fromCoin})</p>
        <div className="flex items-center justify-between">
          <p className="text-5xl font-bold tracking-tight">{amount}</p>
          <button onClick={() => setStep("select-from")} className="flex items-center gap-2 bg-secondary rounded-full px-3 py-2">
            <CoinIcon coinId={fromCoin} />
            <span className="text-sm font-medium">{fromCoin}</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 h-px bg-border/30" />
        <button onClick={swapCoins} className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowDownUp size={18} />
        </button>
        <div className="flex-1 h-px bg-border/30" />
      </div>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-1">To ({toCoin})</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-muted-foreground">{qty > 0 ? formatCoin(toQty) : "0"}</p>
          <button onClick={() => setStep("select-to")} className="flex items-center gap-2 bg-secondary rounded-full px-3 py-2">
            <CoinIcon coinId={toCoin} />
            <span className="text-sm font-medium">{toCoin}</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-secondary/50 rounded-xl px-4 py-3">
        <span className="text-sm text-muted-foreground">Bal: <span className="text-foreground font-medium">{formatCoin(fromBalance)}</span></span>
        <button onClick={useMax} className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg">Use Max</button>
      </div>

      <div className="mt-auto flex flex-col gap-2 pb-6">
        <Button className="w-full h-14 rounded-2xl text-base font-semibold" disabled={qty <= 0 || qty > fromBalance} onClick={() => setStep("review")}>
          Next
        </Button>
        <div className="grid grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((key) => (
          <button
            key={key}
            onClick={() => key === "⌫" ? handleDelete() : handleDigit(key)}
            className="h-14 rounded-xl bg-secondary text-lg font-semibold flex items-center justify-center active:bg-secondary/70 transition-colors"
          >
            {key}
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}
