import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GIFT_CARD_BRANDS,
  getRate,
  calcNgnPayout,
  giftcardStore,
  type GiftCardOrder,
} from "@/data/giftcardData";
import { NGN_RATE, formatNgn, genId } from "@/lib/crypto";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import { worldcup } from "@/lib/worldcup";
import { BONUS_CARDS } from "@/data/worldcupData";
import { toast as sonnerToast } from "sonner";

type Step = "amount" | "upload" | "review" | "success";

export default function GiftcardSell() {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const brand = GIFT_CARD_BRANDS.find((b) => b.id === brandId);

  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState("");
  const [cardImage, setCardImage] = useState<string | null>(null);
  const [cardCode, setCardCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Gift card not found.</p>
      </div>
    );
  }

  const effectiveAmount = amount || Number(customAmount) || 0;
  const rate = getRate(brand, effectiveAmount);
  const payout = calcNgnPayout(brand, effectiveAmount, NGN_RATE);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setCardImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!cardImage) {
      toast({ title: "Please upload a card image", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const order: GiftCardOrder = {
        id: `gc_${genId()}`,
        brandId: brand.id,
        brandName: brand.name,
        amount: effectiveAmount,
        currency: brand.currency,
        ngnPayout: payout,
        rate,
        status: "pending",
        cardImage,
        cardCode: cardCode || undefined,
        createdAt: new Date().toISOString(),
      };
      giftcardStore.addOrder(order);
      setSubmitting(false);
      setStep("success");
      worldcup.awardBonus("giftcard");
      sonnerToast("🏆 +" + BONUS_CARDS.giftcard + " Worldcup cards", {
        description: "Gift card bonus",
        action: { label: "Open", onClick: () => navigate("/worldcup") },
      });
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="space-y-5 pt-2 pb-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (step === "amount") navigate(-1);
              else if (step === "upload") setStep("amount");
              else if (step === "review") setStep("upload");
              else navigate("/giftcards");
            }}
            className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold">Sell {brand.name}</h1>
        </div>

        {/* Progress */}
        {step !== "success" && (
          <div className="flex gap-2">
            {["amount", "upload", "review"].map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  ["amount", "upload", "review"].indexOf(step) >= i
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step: Amount */}
        {step === "amount" && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 bg-secondary rounded-2xl">
              <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center p-2">
                <img src={brand.logo} alt={brand.name} className="h-8 w-8 object-contain" />
              </div>
              <div>
                <p className="font-semibold text-sm">{brand.name}</p>
                <p className="text-xs text-muted-foreground">{brand.currency} Gift Card</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Select amount ({brand.currency})</p>
              <div className="grid grid-cols-3 gap-2">
                {brand.denominations.map((d) => (
                  <button
                    key={d}
                    onClick={() => { setAmount(d); setCustomAmount(""); }}
                    className={`rounded-xl py-3 text-sm font-medium transition-colors ${
                      amount === d
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    ${d}
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
              <div className="bg-secondary rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">{rate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You get</span>
                  <span className="font-bold text-success">{formatNgn(payout)}</span>
                </div>
              </div>
            )}

            <Button
              onClick={() => setStep("upload")}
              disabled={effectiveAmount <= 0}
              className="w-full h-12 rounded-xl text-sm font-semibold"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step: Upload */}
        {step === "upload" && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium mb-2">Upload card image</p>
              <p className="text-xs text-muted-foreground mb-4">
                Take a clear photo of the front and back of your gift card.
              </p>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageUpload}
              />

              {cardImage ? (
                <div className="relative">
                  <img
                    src={cardImage}
                    alt="Card"
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-medium"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-48 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary/50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                    <Camera size={20} />
                  </div>
                  <span className="text-sm">Tap to upload image</span>
                </button>
              )}
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Card code / PIN (optional)</p>
              <Input
                placeholder="Enter card code or PIN"
                value={cardCode}
                onChange={(e) => setCardCode(e.target.value)}
                className="bg-secondary border-0 rounded-xl h-12"
              />
            </div>

            <Button
              onClick={() => setStep("review")}
              disabled={!cardImage}
              className="w-full h-12 rounded-xl text-sm font-semibold"
            >
              Review Order
            </Button>
          </div>
        )}

        {/* Step: Review */}
        {step === "review" && (
          <div className="space-y-5">
            <div className="bg-secondary rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center p-1.5">
                  <img src={brand.logo} alt={brand.name} className="h-7 w-7 object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{brand.name}</p>
                  <p className="text-xs text-muted-foreground">Sell Gift Card</p>
                </div>
              </div>

              <div className="border-t border-border/50 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">${effectiveAmount} {brand.currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">{rate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Card code</span>
                  <span className="font-medium">{cardCode || "Not provided"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You receive</span>
                  <span className="font-bold text-success">{formatNgn(payout)}</span>
                </div>
              </div>
            </div>

            {cardImage && (
              <img src={cardImage} alt="Card" className="w-full h-32 object-cover rounded-2xl" />
            )}

            <p className="text-xs text-muted-foreground text-center">
              Your order will be reviewed. Payout is usually within 5-15 minutes.
            </p>

            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full h-12 rounded-xl text-sm font-semibold"
            >
              {submitting ? (
                <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                "Submit Order"
              )}
            </Button>
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-10 space-y-5">
            <div className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center">
              <Check size={36} className="text-success" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Order Submitted!</h2>
              <p className="text-sm text-muted-foreground max-w-[260px]">
                Your {brand.name} gift card is being reviewed. You'll receive{" "}
                <span className="font-semibold text-success">{formatNgn(payout)}</span> once approved.
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <Button
                variant="secondary"
                onClick={() => navigate("/giftcard-orders")}
                className="flex-1 h-12 rounded-xl text-sm"
              >
                View Orders
              </Button>
              <Button
                onClick={() => navigate("/giftcards")}
                className="flex-1 h-12 rounded-xl text-sm"
              >
                Sell More
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
