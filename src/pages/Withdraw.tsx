import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCoin, coinToUsd, usdToNgn, formatCoin, formatNgn, formatUsd, store, genId, type CoinId } from "@/lib/crypto";
import { X, ChevronDown, ArrowRight, ScanFace, KeyRound } from "lucide-react";
import CoinIcon from "@/components/CoinIcon";
import TransactionTimeline from "@/components/TransactionTimeline";

type Step = "amount" | "address" | "confirm" | "auth" | "success";
type AuthMode = "faceid" | "pin";

// Withdrawal fees set by admin
const WITHDRAWAL_FEE_NGN = 100; // ₦100 for NGN withdrawals
const WITHDRAWAL_FEE_USD = 0.5; // $0.5 for crypto withdrawals

export default function WithdrawPage() {
  const { coinId: paramCoin } = useParams();
  const navigate = useNavigate();
  const [coinId] = useState<CoinId>((paramCoin?.toUpperCase() || "USDT") as CoinId);
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("0");
  const [address, setAddress] = useState("");
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(true);

  const isNgn = coinId === "NGN";
  const wallet = store.getWallet();
  const balance = wallet[coinId] || 0;
  const qty = parseFloat(amount) || 0;
  const usdVal = coinToUsd(coinId, qty);
  const ngnVal = usdToNgn(usdVal);
  const feeDisplay = isNgn ? `₦${WITHDRAWAL_FEE_NGN}` : `$${WITHDRAWAL_FEE_USD}`;

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
    store.addTransaction({
      id: genId(), type: "withdraw", coin: coinId, quantity: qty, usdValue: usdVal, ngnValue: ngnVal, date: new Date().toISOString(), status: "completed",
      fee: isNgn ? WITHDRAWAL_FEE_NGN : WITHDRAWAL_FEE_USD,
      address,
    });
    setStep("success");
  };

  if (step === "address") {
    return <AddressStep coinId={coinId} address={address} setAddress={setAddress} saveAsBeneficiary={saveAsBeneficiary} setSaveAsBeneficiary={setSaveAsBeneficiary} isNgn={isNgn} onBack={() => setStep("amount")} onNext={() => setStep("confirm")} />;
  }

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-background flex flex-col px-4">
        <div className="pt-4 mb-4">
          <button onClick={() => setStep("amount")} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <X size={18} />
          </button>
        </div>
        <h1 className="text-xl font-bold text-muted-foreground">Withdraw {isNgn ? "NGN" : "Crypto"}</h1>

        <div className="bg-card rounded-t-3xl p-6 mt-auto space-y-4 border-t border-border/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-semibold">Confirm Withdrawal</span>
            <button onClick={() => setStep("amount")} className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-col items-center py-4">
            <CoinIcon coinId={coinId} />
            <p className="text-4xl font-bold mt-3">{isNgn ? formatNgn(qty) : `${formatCoin(qty)} ${coinId}`}</p>
            {!isNgn && <p className="text-sm text-muted-foreground">{formatNgn(ngnVal)}</p>}
          </div>

          <h3 className="text-sm font-semibold text-muted-foreground">Withdrawal Summary</h3>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-medium">{isNgn ? formatNgn(qty) : `${formatCoin(qty)} ${coinId}`}</span>
          </div>
          {!isNgn && (
            <>
              <div className="flex justify-between text-sm border-b border-border/20 pb-3">
                <span className="text-muted-foreground">USD Value</span>
                <span className="font-medium">{formatUsd(usdVal)}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-border/20 pb-3">
                <span className="text-muted-foreground">NGN Value</span>
                <span className="font-medium">{formatNgn(ngnVal)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Send To</span>
            <span className="font-medium text-primary">{address.slice(0, 6)}...{address.slice(-4)}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Withdrawal Fee</span>
            <span className="font-medium text-destructive">{feeDisplay}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-semibold">Total Deducted</span>
            <span className="font-bold">
              {isNgn ? formatNgn(qty + WITHDRAWAL_FEE_NGN) : `${formatCoin(qty)} ${coinId} + $${WITHDRAWAL_FEE_USD}`}
            </span>
          </div>

          <Button className="w-full h-14 rounded-2xl text-base font-semibold gap-2" onClick={() => setStep("auth")}>
            Confirm <ScanFace size={18} />
          </Button>
        </div>
      </div>
    );
  }

  if (step === "auth") {
    return <AuthScreen onDone={doWithdraw} />;
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
          Successful! —<br />{isNgn ? formatNgn(qty) : `${formatCoin(qty)} ${coinId}`} has been sent.
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
            <span className="text-muted-foreground">Amount Sent</span>
            <span className="font-medium">{isNgn ? formatNgn(qty) : `${formatCoin(qty)} ${coinId}`}</span>
          </div>
          {!isNgn && (
            <div className="flex justify-between text-sm border-b border-border/20 pb-3">
              <span className="text-muted-foreground">USD Value</span>
              <span className="font-medium">{formatUsd(usdVal)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm border-b border-border/20 pb-3">
            <span className="text-muted-foreground">Withdrawal Fee</span>
            <span className="font-medium text-destructive">{feeDisplay}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Send to</span>
            <span className="font-medium text-primary">{address.slice(0, 6)}...{address.slice(-4)}</span>
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

      <h1 className="text-xl font-bold text-muted-foreground">Withdraw {isNgn ? "NGN" : "Crypto"}</h1>
      <p className="text-sm text-muted-foreground mt-1">{isNgn ? `Fee: ₦${WITHDRAWAL_FEE_NGN}` : `Fee: $${WITHDRAWAL_FEE_USD} · Rate ₦1,410/$`}</p>

      <div className="mt-6 mb-2">
        <p className="text-xs text-primary mb-1">Enter Amount</p>
        <div className="flex items-center justify-between">
          <p className="text-5xl font-bold tracking-tight">{amount}</p>
          {!isNgn && (
            <div className="flex items-center gap-2 bg-secondary rounded-full px-3 py-2">
              <CoinIcon coinId={coinId} />
              <span className="text-sm font-medium">{coinId}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
          )}
        </div>
        {!isNgn && (
          <p className="text-sm text-muted-foreground mt-2">
            ≈ {formatUsd(usdVal)} · {formatNgn(ngnVal)}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between bg-secondary/50 rounded-xl px-4 py-3 mt-2">
        <span className="text-sm text-muted-foreground">Bal: <span className="text-foreground font-medium">{isNgn ? formatNgn(balance) : formatCoin(balance)}</span></span>
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

/* ─── Address Step ─── */
function AddressStep({ coinId, address, setAddress, saveAsBeneficiary, setSaveAsBeneficiary, isNgn, onBack, onNext }: {
  coinId: CoinId; address: string; setAddress: (v: string) => void; saveAsBeneficiary: boolean; setSaveAsBeneficiary: (v: boolean) => void; isNgn: boolean; onBack: () => void; onNext: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col px-4">
      <div className="bg-card rounded-t-3xl mt-auto p-6 flex flex-col min-h-[70vh]">
        <div className="flex items-center justify-between mb-6">
          <span className="text-base font-semibold flex-1 text-center">Recipient</span>
          <button onClick={onBack} className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        <p className="text-sm font-medium mb-2">{isNgn ? "Enter bank account or username" : "Paste address or username"}</p>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={isNgn ? "Enter Account Number" : "Enter Wallet Address"}
          className="w-full bg-transparent border-b border-border/30 py-3 text-sm text-muted-foreground placeholder:text-muted-foreground/50 outline-none mb-4"
        />
        <p className="text-xs text-amber-500/80 mb-4 leading-relaxed">
          {isNgn ? "Ensure you are sending to the correct account to avoid loss of funds." : "Ensure you are sending to the right address and network to avoid loss of funds."}
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

        <Button className="w-full h-14 rounded-2xl text-base font-semibold mt-6" disabled={!address} onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

/* ─── Auth Screen: FaceID with PIN fallback ─── */
function AuthScreen({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<AuthMode>("faceid");
  const [pin, setPin] = useState("");
  const CORRECT_PIN = "1234"; // dummy PIN

  useEffect(() => {
    if (mode === "faceid") {
      const timer = setTimeout(onDone, 2000);
      return () => clearTimeout(timer);
    }
  }, [mode, onDone]);

  const handlePinDigit = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      if (next === CORRECT_PIN) {
        setTimeout(onDone, 300);
      } else {
        setTimeout(() => setPin(""), 500);
      }
    }
  };

  if (mode === "faceid") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="animate-pulse mb-8">
          <div className="h-28 w-28 rounded-3xl border-4 border-success flex items-center justify-center bg-success/10">
            <ScanFace size={56} className="text-success" />
          </div>
        </div>
        <p className="text-lg font-semibold mb-2">Verifying Identity...</p>
        <p className="text-sm text-muted-foreground mb-8">Look at your device to confirm</p>
        <button onClick={() => setMode("pin")} className="flex items-center gap-2 text-sm text-primary">
          <KeyRound size={16} /> Use Transaction PIN instead
        </button>
      </div>
    );
  }

  // PIN fallback
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <KeyRound size={48} className="text-primary mb-6" />
      <p className="text-lg font-semibold mb-2">Enter Transaction PIN</p>
      <p className="text-sm text-muted-foreground mb-8">Enter your 4-digit PIN to authorize</p>

      <div className="flex gap-4 mb-10">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-4 w-4 rounded-full ${i < pin.length ? "bg-primary" : "bg-secondary"}`} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 w-64">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((key) => (
          <button
            key={key}
            disabled={!key}
            onClick={() => key === "⌫" ? setPin(p => p.slice(0, -1)) : handlePinDigit(key)}
            className="h-14 rounded-xl bg-secondary text-lg font-semibold flex items-center justify-center active:bg-secondary/70 transition-colors disabled:opacity-0"
          >
            {key}
          </button>
        ))}
      </div>

      <button onClick={() => setMode("faceid")} className="flex items-center gap-2 text-sm text-primary mt-8">
        <ScanFace size={16} /> Use Face ID instead
      </button>
    </div>
  );
}
