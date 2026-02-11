import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCoin, coinToUsd, usdToNgn, formatCoin, formatNgn, store, genId, type CoinId } from "@/lib/crypto";
import { X, ChevronDown, ArrowRight, ScanFace } from "lucide-react";
import { CoinIcon } from "./Dashboard";
import TransactionTimeline from "@/components/TransactionTimeline";

type Step = "amount" | "address" | "confirm" | "faceid" | "success";

export default function WithdrawPage() {
  const { coinId: paramCoin } = useParams();
  const navigate = useNavigate();
  const [coinId] = useState<CoinId>((paramCoin?.toUpperCase() || "USDT") as CoinId);
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("0");
  const [address, setAddress] = useState("");
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(true);

  const wallet = store.getWallet();
  const balance = wallet[coinId] || 0;
  const qty = parseFloat(amount) || 0;
  const usdVal = coinToUsd(coinId, qty);
  const ngnVal = usdToNgn(usdVal);

  const handleDigit = (d: string) => {
    setAmount((prev) => {
      if (d === "." && prev.includes(".")) return prev;
      if (prev === "0" && d !== ".") return d;
      return prev + d;
    });
  };
  const handleDelete = () => setAmount((prev) => prev.length <= 1 ? "0" : prev.slice(0, -1));
  const useMax = () => setAmount(String(balance));

  const doWithdraw = () => {
    store.updateWalletCoin(coinId, -qty);
    store.addTransaction({ id: genId(), type: "sell", coin: coinId, quantity: qty, usdValue: usdVal, ngnValue: ngnVal, date: new Date().toISOString(), status: "completed" });
    setStep("success");
  };

  if (step === "address") {
    return (
      <div className="min-h-screen bg-background flex flex-col px-4">
        <div className="bg-card rounded-t-3xl mt-auto p-6 flex flex-col min-h-[70vh]">
          <div className="flex items-center justify-between mb-6">
            <span className="text-base font-semibold flex-1 text-center">Recipient</span>
            <button onClick={() => setStep("amount")} className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <X size={16} />
            </button>
          </div>

          <div className="flex gap-4 mb-6 border-b border-primary pb-2">
            <span className="text-sm font-semibold">New</span>
            <span className="text-sm text-muted-foreground">Beneficiaries</span>
          </div>

          <p className="text-sm font-medium mb-2">Paste address or username</p>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Wallet Address"
            className="w-full bg-transparent border-b border-border/30 py-3 text-sm text-muted-foreground placeholder:text-muted-foreground/50 outline-none mb-4"
          />
          <p className="text-xs text-amber-500/80 mb-4 leading-relaxed">
            Ensure you are sending to the right address and network to avoid loss of funds.
          </p>

          <label className="flex items-center gap-3 mb-auto">
            <div
              onClick={() => setSaveAsBeneficiary(!saveAsBeneficiary)}
              className={`h-6 w-6 rounded-full flex items-center justify-center cursor-pointer ${saveAsBeneficiary ? "bg-success" : "bg-secondary"}`}
            >
              {saveAsBeneficiary && <span className="text-success-foreground text-xs">✓</span>}
            </div>
            <span className="text-sm">Save as beneficiary</span>
          </label>

          <Button className="w-full h-14 rounded-2xl text-base font-semibold mt-6" disabled={!address} onClick={() => setStep("confirm")}>
            Next
          </Button>
        </div>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-background flex flex-col px-4">
        <div className="pt-4 mb-4">
          <button onClick={() => setStep("amount")} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <X size={18} />
          </button>
        </div>
        <h1 className="text-xl font-bold text-muted-foreground">Withdraw Crypto</h1>
        <p className="text-sm text-muted-foreground mt-1">Rate ₦1,410/$</p>

        <div className="mt-6">
          <p className="text-xs text-primary mb-1">Enter Amount</p>
          <p className="text-5xl font-bold tracking-tight text-muted-foreground">{amount}</p>
          <p className="text-sm text-muted-foreground mt-2">₦ {ngnVal.toLocaleString("en-NG", { minimumFractionDigits: 2 })} <span className="bg-secondary text-[10px] px-2 py-0.5 rounded ml-1">NGN</span></p>
        </div>

        <div className="bg-card rounded-t-3xl p-6 mt-auto space-y-4 border-t border-border/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-semibold">Withdraw Crypto</span>
            <button onClick={() => setStep("amount")} className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-col items-center py-4">
            <CoinIcon coinId={coinId} />
            <p className="text-4xl font-bold mt-3">{amount}</p>
            <p className="text-sm text-muted-foreground">{formatNgn(ngnVal)}</p>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Fee</span>
            <span className="font-medium">0.5 {coinId}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Estimated Value:</span>
            <span className="font-medium">{formatCoin(qty)} {coinId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee:</span>
            <span className="font-medium">$0.01</span>
          </div>
          <Button className="w-full h-14 rounded-2xl text-base font-semibold gap-2" onClick={() => setStep("faceid")}>
            Confirm <ScanFace size={18} />
          </Button>
        </div>
      </div>
    );
  }

  if (step === "faceid") {
    return <FaceIdScreen onDone={doWithdraw} />;
  }

  if (step === "success") {
    const ts = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    return (
      <div className="min-h-screen bg-background flex flex-col items-center pt-20 px-4">
        <div className="relative">
          <CoinIcon coinId={coinId} />
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs">✓</span>
          </div>
        </div>
        <h2 className="text-xl font-bold mt-6 text-center">
          Successful! —<br />${formatCoin(qty)} {coinId} has been sent from your wallet.
        </h2>

        <TransactionTimeline
          steps={[
            { label: "Order Received", sublabel: ts },
            { label: "Request Confirmed", sublabel: ts },
            { label: "Transfer Completed", sublabel: ts },
          ]}
          durationMs={4000}
        />

        <div className="w-full mt-10 space-y-4">
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">To:</span>
            <span className="font-medium">NGN wallet</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Estimated Value</span>
            <span className="font-medium">{formatCoin(qty)} {coinId}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Fee:</span>
            <span className="font-medium">$0.01</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Send to</span>
            <span className="font-medium text-primary">{address.slice(0, 4)}...{address.slice(-4)}</span>
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
    <div className="min-h-screen bg-background flex flex-col pt-4 px-4">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
          <X size={18} />
        </button>
      </div>

      <h1 className="text-xl font-bold text-muted-foreground">Withdraw Crypto</h1>
      <p className="text-sm text-muted-foreground mt-1">Rate ₦1,410/$</p>

      <div className="mt-6 mb-2">
        <p className="text-xs text-primary mb-1">Enter Amount</p>
        <div className="flex items-center justify-between">
          <p className="text-5xl font-bold tracking-tight">{amount}</p>
          <div className="flex items-center gap-2 bg-secondary rounded-full px-3 py-2">
            <CoinIcon coinId={coinId} />
            <span className="text-sm font-medium">{coinId}</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-secondary/50 rounded-xl px-4 py-3 mt-2">
        <span className="text-sm text-muted-foreground">Bal: <span className="text-foreground font-medium">{formatCoin(balance)}</span></span>
        <button onClick={useMax} className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg">Use Max</button>
      </div>

      <div className="mt-auto flex flex-col gap-2 pb-6">
        <Button className="w-full h-14 rounded-2xl text-base font-semibold" disabled={qty <= 0 || qty > balance} onClick={() => setStep("address")}>
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

function FaceIdScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="animate-pulse mb-8">
        <div className="h-28 w-28 rounded-3xl border-4 border-success flex items-center justify-center bg-success/10">
          <ScanFace size={56} className="text-success" />
        </div>
      </div>
      <p className="text-lg font-semibold mb-2">Verifying Identity...</p>
      <p className="text-sm text-muted-foreground mb-8">Look at your device to confirm</p>
    </div>
  );
}
