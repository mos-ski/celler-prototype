import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Copy, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TransactionPinDialog from "@/components/TransactionPinDialog";
import {
  GIFT_CARD_BRANDS,
  calcGiftCardBuyPrice,
  generateGiftCardCode,
  getBuyFeePercent,
} from "@/data/giftcardData";
import { NGN_RATE, formatNgn, formatUsd, genId, ngnToUsd, store } from "@/lib/crypto";
import PageTransition from "@/components/PageTransition";
import { worldcup } from "@/lib/worldcup";
import { BONUS_CARDS } from "@/data/worldcupData";

type Step = "amount" | "review" | "success";

export default function GiftcardBuy() {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();

  const brand = GIFT_CARD_BRANDS.find((b) => b.id === brandId);
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deliveredCode, setDeliveredCode] = useState("");
  const [giftCardPin, setGiftCardPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  if (!brand) {
    return (
      <PageTransition>
        <div className="pt-6">
          <p className="text-sm text-muted-foreground">Gift card not found.</p>
          <Button className="mt-4" onClick={() => navigate("/giftcards")}>Back to Gift Cards</Button>
        </div>
      </PageTransition>
    );
  }

  const wallet = store.getWallet();
  const ngnBalance = wallet.NGN || 0;
  const effectiveAmount = amount || Number(customAmount) || 0;
  const feePercent = effectiveAmount > 0 ? getBuyFeePercent(brand, effectiveAmount) : 0;
  const price = effectiveAmount > 0 ? calcGiftCardBuyPrice(brand, effectiveAmount, NGN_RATE) : 0;
  const canContinue = effectiveAmount > 0;
  const canBuy = canContinue && price <= ngnBalance && !submitting;

  const handleBuy = () => {
    if (!canBuy) return;
    setShowPin(true);
  };

  const completePurchase = () => {
    if (!canBuy) return;
    setSubmitting(true);
    setTimeout(() => {
      const code = generateGiftCardCode(brand);
      const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();
      store.updateWalletCoin("NGN", -price);
      store.addTransaction({
        id: genId(),
        type: "giftcard",
        coin: "NGN",
        quantity: price,
        usdValue: ngnToUsd(price),
        ngnValue: price,
        date: new Date().toISOString(),
        status: "completed",
        network: "Gift Card Delivery",
        description: `Bought ${brand.name} ${brand.currency} ${effectiveAmount} gift card`,
      });
      setDeliveredCode(code);
      setGiftCardPin(generatedPin);
      setSubmitting(false);
      setStep("success");
      toast.success("Gift card delivered", {
        description: `${brand.name} ${brand.currency} ${effectiveAmount} is ready.`,
      });
      worldcup.awardBonus("giftcard");
      toast("🏆 +" + BONUS_CARDS.giftcard + " Worldcup cards", {
        description: "Gift card bonus",
        action: { label: "Open", onClick: () => navigate("/worldcup") },
      });
    }, 900);
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied`);
  };

  return (
    <PageTransition>
      <div className="space-y-5 pt-2 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (step === "review") setStep("amount");
              else if (step === "success") navigate("/giftcards");
              else navigate(-1);
            }}
            className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold">Buy {brand.name}</h1>
        </div>

        {step !== "success" && (
          <div className="grid grid-cols-2 gap-2">
            {["amount", "review"].map((s, i) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-colors ${
                  ["amount", "review"].indexOf(step) >= i ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
        )}

        {step === "amount" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-2xl bg-secondary p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center p-2">
                  <img src={brand.logo} alt={brand.name} className="h-8 w-8 object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{brand.name}</p>
                  <p className="text-xs text-muted-foreground">{brand.currency} digital gift card</p>
                </div>
              </div>
              <CreditCard size={20} className="text-muted-foreground" />
            </div>

            <div className="rounded-2xl bg-card border border-border/40 p-4">
              <p className="text-xs text-muted-foreground">Naira Wallet Balance</p>
              <p className="text-xl font-bold mt-1">{formatNgn(ngnBalance)}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Choose amount ({brand.currency})</p>
              <div className="grid grid-cols-3 gap-2">
                {brand.denominations.map((d) => (
                  <button
                    key={d}
                    onClick={() => { setAmount(d); setCustomAmount(""); }}
                    className={`rounded-xl py-3 text-sm font-medium transition-colors ${
                      amount === d ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}
                  >
                    {brand.currency === "USD" ? "$" : ""}{d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Or enter custom amount</p>
              <Input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                className="bg-secondary border-0 rounded-xl h-12"
              />
            </div>

            {effectiveAmount > 0 && (
              <div className="rounded-2xl border border-border/40 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Card value</span>
                  <span className="font-medium">{formatUsd(effectiveAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service fee</span>
                  <span className="font-medium">{feePercent}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You pay</span>
                  <span className="font-bold">{formatNgn(price)}</span>
                </div>
                {price > ngnBalance && (
                  <p className="text-xs text-destructive">Insufficient Naira balance.</p>
                )}
              </div>
            )}

            <Button
              onClick={() => setStep("review")}
              disabled={!canContinue}
              className="w-full h-12 rounded-xl text-sm font-semibold"
            >
              Continue
            </Button>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-5">
            <div className="bg-secondary rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center p-1.5">
                  <img src={brand.logo} alt={brand.name} className="h-7 w-7 object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{brand.name}</p>
                  <p className="text-xs text-muted-foreground">Digital gift card</p>
                </div>
              </div>
              <div className="border-t border-border/50 pt-3 space-y-2">
                <SummaryRow label="Card value" value={`${brand.currency} ${effectiveAmount}`} />
                <SummaryRow label="Exchange rate" value="₦1,410/$" />
                <SummaryRow label="Service fee" value={`${feePercent}%`} />
                <SummaryRow label="Source" value="Naira Wallet" />
                <SummaryRow label="You pay" value={formatNgn(price)} strong />
              </div>
            </div>

            {price > ngnBalance && (
              <p className="text-sm text-destructive text-center">Your Naira balance is too low for this purchase.</p>
            )}

            <Button
              onClick={handleBuy}
              disabled={!canBuy}
              className="w-full h-12 rounded-xl text-sm font-semibold"
            >
              {submitting ? "Processing..." : `Buy for ${formatNgn(price)}`}
            </Button>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-5">
            <div className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center">
              <Check size={36} className="text-success" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Gift Card Delivered</h2>
              <p className="text-sm text-muted-foreground max-w-[280px]">
                Your {brand.name} {brand.currency} {effectiveAmount} gift card is ready.
              </p>
            </div>

            <div className="w-full rounded-2xl border border-border/40 bg-card p-4 space-y-3">
              <CodeRow label="Card Code" value={deliveredCode} onCopy={() => handleCopy(deliveredCode, "Card code")} />
              <CodeRow label="Gift Card PIN" value={giftCardPin} onCopy={() => handleCopy(giftCardPin, "Gift card PIN")} />
            </div>

            <div className="flex gap-3 w-full">
              <Button
                variant="secondary"
                onClick={() => navigate("/history")}
                className="flex-1 h-12 rounded-xl text-sm"
              >
                View History
              </Button>
              <Button
                onClick={() => navigate("/giftcards")}
                className="flex-1 h-12 rounded-xl text-sm"
              >
                Buy More
              </Button>
            </div>
          </div>
        )}

        <TransactionPinDialog
          open={showPin}
          onOpenChange={setShowPin}
          onVerified={completePurchase}
          title="Authorize Purchase"
          description="Enter your transaction PIN to buy this gift card."
        />
      </div>
    </PageTransition>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={strong ? "font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}

function CodeRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-mono text-sm font-semibold break-all">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center shrink-0"
      >
        <Copy size={15} />
      </button>
    </div>
  );
}
