import { useState } from "react";
import { Button } from "@/components/ui/button";
import { COINS, getCoin, ngnToUsd, usdToCoin, usdToNgn, formatUsd, formatNgn, formatCoin, store, genId, type CoinId } from "@/lib/crypto";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import TransactionTimeline from "@/components/TransactionTimeline";
import CoinIcon from "@/components/CoinIcon";
import { useNavigate } from "react-router-dom";

type Step = "amount" | "select-coin" | "review" | "success";

export default function BuyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("amount");
  const [coinId, setCoinId] = useState<CoinId>("USDT");
  const [amount, setAmount] = useState("0");

  const coin = getCoin(coinId);
  const usdVal = parseFloat(amount) || 0;
  const ngnVal = usdToNgn(usdVal);
  const qty = usdToCoin(coinId, usdVal);

  const handleDigit = (d: string) => {
    setAmount((prev) => {
      if (d === "." && prev.includes(".")) return prev;
      if (prev === "0" && d !== ".") return d;
      return prev + d;
    });
  };
  const handleDelete = () => setAmount((prev) => prev.length <= 1 ? "0" : prev.slice(0, -1));

  const confirm = () => {
    store.updateWalletCoin(coinId, qty);
    store.addTransaction({ id: genId(), type: "buy", coin: coinId, quantity: qty, usdValue: usdVal, ngnValue: ngnVal, date: new Date().toISOString(), status: "completed" });
    setStep("success");
  };

  if (step === "select-coin") {
    return (
      <div className="min-h-screen bg-background pt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Select Coin</h2>
          <button onClick={() => setStep("amount")} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-1">
          {COINS.map((c) => (
            <button key={c.id} onClick={() => { setCoinId(c.id); setAmount("0"); setStep("amount"); }}
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
  }

  if (step === "review") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between pt-4 mb-4">
          <span className="text-base font-semibold">Buy Crypto</span>
          <button onClick={() => setStep("amount")} className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
          <CoinIcon coinId={coinId} />
          <p className="text-5xl font-bold mt-4">{formatCoin(qty)}</p>
          <p className="text-muted-foreground">{formatNgn(ngnVal)}</p>
        </div>

        <div className="bg-card rounded-t-3xl p-6 space-y-4 border-t border-border/30">
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span className="font-medium">₦1,410/$</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Coin</span>
            <span className="font-medium">{coin.name} ({coinId})</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee:</span>
            <span className="font-medium">$0.01</span>
          </div>
          <Button className="w-full h-14 rounded-2xl text-base font-semibold gap-2" onClick={confirm} disabled={usdVal <= 0}>
            Confirm <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    );
  }

  if (step === "success") {
    const now = new Date();
    const ts = now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    return (
      <div className="min-h-screen bg-background flex flex-col items-center pt-20 px-4">
        <CoinIcon coinId={coinId} />
        <h2 className="text-xl font-bold mt-6 text-center">
          Order Placed! —<br />Your {formatUsd(usdVal)} {coinId} trade has received.
        </h2>

        <TransactionTimeline
          steps={[
            { label: "Order Received", sublabel: ts },
            { label: "Order Accepted", sublabel: ts },
            { label: "Payment Processed", sublabel: ts },
          ]}
          durationMs={4000}
        />

        <div className="w-full mt-10 space-y-4">
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Set Rate</span>
            <span className="font-medium">₦1,410/$</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Coin</span>
            <span className="font-medium">{coin.name}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Estimated Value</span>
            <span className="font-medium">{formatCoin(qty)} {coinId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee:</span>
            <span className="font-medium">$0.01</span>
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

      <h1 className="text-xl font-bold text-muted-foreground">Buy Crypto</h1>
      <p className="text-sm text-muted-foreground mt-1">Rate ₦1,410/$</p>

      <div className="mt-6 mb-2">
        <p className="text-xs text-muted-foreground mb-1">Enter Amount (USD)</p>
        <div className="flex items-center justify-between">
          <p className="text-5xl font-bold tracking-tight">{amount}</p>
          <button onClick={() => setStep("select-coin")} className="flex items-center gap-2 bg-secondary rounded-full px-3 py-2">
            <CoinIcon coinId={coinId} />
            <span className="text-sm font-medium">{coinId}</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          ₦ {ngnVal.toLocaleString("en-NG", { minimumFractionDigits: 2 })} <span className="bg-secondary text-[10px] px-2 py-0.5 rounded ml-1">NGN</span>
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2 pb-6">
        <Button className="w-full h-14 rounded-2xl text-base font-semibold" disabled={usdVal <= 0} onClick={() => setStep("review")}>
          Next
        </Button>
        <div className="grid grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((key) => (
          <button
            key={key}
            onClick={() => key === "⌫" ? handleDelete() : handleDigit(key)}
            className="h-16 rounded-xl bg-secondary text-xl font-semibold flex items-center justify-center active:bg-secondary/70 transition-colors"
          >
            {key}
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}
