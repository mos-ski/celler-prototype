import { useState, useMemo } from "react";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TransactionPinDialog from "@/components/TransactionPinDialog";
import {
  BILL_CATEGORIES,
  PROVIDERS,
  DATA_PLANS,
  TV_PACKAGES,
  type BillCategory,
} from "@/data/billsData";
import { store, formatNgn, genId, ngnToUsd } from "@/lib/crypto";

export default function SellaBillPay() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { category } = useParams<{ category: BillCategory }>();
  const isAndroid = location.pathname.startsWith("/a/");
  const cat = BILL_CATEGORIES.find((c) => c.id === category);
  const providers = category ? PROVIDERS[category] : [];

  const prefillProvider = searchParams.get("provider");
  const prefillIdentifier = searchParams.get("identifier");
  const prefillAmount = searchParams.get("amount");
  const prefillPlan = searchParams.get("plan");

  const [providerId, setProviderId] = useState<string>(
    prefillProvider && providers.find((p) => p.id === prefillProvider)
      ? prefillProvider
      : providers[0]?.id ?? ""
  );
  const [identifier, setIdentifier] = useState(prefillIdentifier ?? "");
  const [amount, setAmount] = useState(prefillAmount ?? "");
  const [planId, setPlanId] = useState(prefillPlan ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const wallet = store.getWallet();
  const ngnBalance = wallet.NGN || 0;

  const provider = providers.find((p) => p.id === providerId);

  const plans = useMemo(() => {
    if (category === "data") return DATA_PLANS[providerId] ?? [];
    if (category === "tv") return TV_PACKAGES[providerId] ?? [];
    return [];
  }, [category, providerId]);

  const selectedPlan = plans.find((p) => p.id === planId);
  const usesPlans = category === "data" || category === "tv";
  const payAmount = usesPlans ? selectedPlan?.amountNgn ?? 0 : Number(amount) || 0;

  const identifierLabel =
    category === "electricity" ? "Meter Number" :
    category === "tv" ? "Smartcard / IUC Number" :
    "Phone Number";

  const identifierPlaceholder =
    category === "electricity" ? "e.g. 04211234567" :
    category === "tv" ? "e.g. 1234567890" :
    "e.g. 0801 234 5678";

  if (!cat) {
    return (
      <PageTransition>
        <div className="pt-6">
          <p className="text-sm text-muted-foreground">Unknown bill category.</p>
          <Button className="mt-4" onClick={() => navigate(isAndroid ? "/a/bills" : "/bills")}>Back to Bills</Button>
        </div>
      </PageTransition>
    );
  }

  const canPay =
    !!providerId &&
    identifier.trim().length >= 4 &&
    payAmount > 0 &&
    payAmount <= ngnBalance &&
    !submitting;

  const handlePay = () => {
    if (!canPay) return;
    setShowPin(true);
  };

  const completePayment = () => {
    if (!canPay || !provider) return;
    setSubmitting(true);
    setTimeout(() => {
      store.updateWalletCoin("NGN", -payAmount);
      const description =
        category === "airtime" ? `${provider.name} Airtime - ${identifier}` :
        category === "data" ? `${provider.name} Data (${selectedPlan?.name}) - ${identifier}` :
        category === "electricity" ? `${provider.name} - Meter ${identifier}` :
        `${provider.name} (${selectedPlan?.name}) - ${identifier}`;

      store.addTransaction({
        id: genId(),
        type: "bill",
        coin: "NGN",
        quantity: payAmount,
        usdValue: ngnToUsd(payAmount),
        ngnValue: payAmount,
        date: new Date().toISOString(),
        status: "completed",
        network: `Bill • ${cat.label}`,
        description,
      });
      toast.success("Payment successful", { description });
      setSubmitting(false);
      navigate(isAndroid ? "/a/history" : "/history");
    }, 900);
  };

  return (
    <PageTransition>
      <div className="space-y-5 pt-2 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold">{cat.label}</h1>
        </div>

        <div className="rounded-2xl bg-secondary p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Naira Balance</p>
            <p className="text-lg font-bold">{formatNgn(ngnBalance)}</p>
          </div>
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${cat.accent}`}>
            <cat.icon size={22} />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {category === "electricity" ? "Disco" : category === "tv" ? "Provider" : "Network"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {providers.map((p) => (
              <button
                key={p.id}
                onClick={() => { setProviderId(p.id); setPlanId(""); }}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-colors ${
                  providerId === p.id
                    ? "border-primary bg-primary/5"
                    : "border-border/40 bg-card hover:bg-secondary/50"
                }`}
              >
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 ${p.color}`}>
                  {p.initials}
                </div>
                <span className="text-sm font-medium truncate">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{identifierLabel}</label>
          <Input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={identifierPlaceholder}
            inputMode={category === "airtime" || category === "data" ? "tel" : "numeric"}
            className="bg-secondary border-0 rounded-xl h-12"
          />
        </div>

        {usesPlans ? (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {category === "data" ? "Data Plan" : "Package"}
            </p>
            <div className="space-y-2">
              {plans.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlanId(p.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors text-left ${
                    planId === p.id
                      ? "border-primary bg-primary/5"
                      : "border-border/40 bg-card hover:bg-secondary/50"
                  }`}
                >
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="text-sm font-semibold">{formatNgn(p.amountNgn)}</span>
                </button>
              ))}
              {plans.length === 0 && (
                <p className="text-xs text-muted-foreground">No plans available for this provider.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount (NGN)</label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="0.00"
              inputMode="decimal"
              className="bg-secondary border-0 rounded-xl h-12 text-lg font-semibold"
            />
            {category === "airtime" && (
              <div className="flex flex-wrap gap-2 pt-1">
                {[100, 200, 500, 1000, 2000, 5000].map((q) => (
                  <button
                    key={q}
                    onClick={() => setAmount(String(q))}
                    className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium"
                  >
                    {formatNgn(q)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="rounded-2xl border border-border/40 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">You pay</span>
            <span className="font-semibold">{formatNgn(payAmount)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Source</span>
            <span>Naira Wallet</span>
          </div>
          {payAmount > ngnBalance && (
            <p className="text-xs text-destructive">Insufficient Naira balance.</p>
          )}
        </div>

        <Button
          onClick={handlePay}
          disabled={!canPay}
          className="w-full h-12 rounded-xl text-base font-semibold"
        >
          {submitting ? "Processing..." : `Pay ${payAmount > 0 ? formatNgn(payAmount) : ""}`}
        </Button>
      </div>

      <TransactionPinDialog
        open={showPin}
        onOpenChange={setShowPin}
        onVerified={completePayment}
        title="Authorize Payment"
        description="Enter your transaction PIN to pay this bill."
      />
    </PageTransition>
  );
}
