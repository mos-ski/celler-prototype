import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { COINS, getCoin, coinToUsd, usdToCoin, formatUsd, formatCoin, store, genId, usdToNgn, type CoinId } from "@/lib/crypto";
import { ArrowLeft, Check, ArrowDownUp } from "lucide-react";

type Step = "form" | "review" | "success";

export default function SwapPage() {
  const [step, setStep] = useState<Step>("form");
  const [fromCoin, setFromCoin] = useState<CoinId>("BTC");
  const [toCoin, setToCoin] = useState<CoinId>("ETH");
  const [qtyInput, setQtyInput] = useState("");
  const wallet = store.getWallet();

  const fromBalance = wallet[fromCoin] || 0;
  const qty = parseFloat(qtyInput) || 0;
  const usdValue = coinToUsd(fromCoin, qty);
  const toQty = usdToCoin(toCoin, usdValue);

  const swapCoins = () => { const tmp = fromCoin; setFromCoin(toCoin); setToCoin(tmp); setQtyInput(""); };

  const confirm = () => {
    store.updateWalletCoin(fromCoin, -qty);
    store.updateWalletCoin(toCoin, toQty);
    store.addTransaction({ id: genId(), type: "swap", fromCoin, toCoin, quantity: qty, toQuantity: toQty, usdValue, ngnValue: usdToNgn(usdValue), date: new Date().toISOString(), status: "completed" });
    setStep("success");
  };

  if (step === "form") {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Swap Crypto</h1>

        <div className="space-y-2">
          <Label>From</Label>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={fromCoin} onChange={(e) => setFromCoin(e.target.value as CoinId)}>
            {COINS.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.id}) — Bal: {formatCoin(wallet[c.id] || 0)}</option>)}
          </select>
        </div>

        <div className="flex justify-center">
          <button onClick={swapCoins} className="rounded-full border border-primary/30 p-2 text-primary hover:bg-primary/10 transition-colors"><ArrowDownUp size={20} /></button>
        </div>

        <div className="space-y-2">
          <Label>To</Label>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={toCoin} onChange={(e) => setToCoin(e.target.value as CoinId)}>
            {COINS.filter((c) => c.id !== fromCoin).map((c) => <option key={c.id} value={c.id}>{c.name} ({c.id})</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Quantity ({fromCoin})</Label>
          <Input type="number" placeholder="0.00" value={qtyInput} onChange={(e) => setQtyInput(e.target.value)} />
          <button className="text-xs text-primary hover:underline" onClick={() => setQtyInput(String(fromBalance))}>Max: {formatCoin(fromBalance)}</button>
        </div>

        {qty > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-3 text-sm space-y-1">
              <p>{formatCoin(qty)} {fromCoin} = {formatUsd(usdValue)}</p>
              <p>You receive: <strong>{formatCoin(toQty)} {toCoin}</strong></p>
              <p className="text-xs text-muted-foreground">{fromCoin}: {formatUsd(getCoin(fromCoin).marketPriceUsd)} · {toCoin}: {formatUsd(getCoin(toCoin).marketPriceUsd)}</p>
            </CardContent>
          </Card>
        )}

        <Button className="w-full" disabled={qty <= 0 || qty > fromBalance || fromCoin === toCoin} onClick={() => setStep("review")}>Continue</Button>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("form")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Back</button>
        <h1 className="text-2xl font-bold">Confirm Swap</h1>
        <Card className="border-primary/20">
          <CardContent className="py-4 space-y-2 text-sm">
            <Row label="From" value={`${formatCoin(qty)} ${fromCoin}`} />
            <Row label={`${fromCoin} Price`} value={formatUsd(getCoin(fromCoin).marketPriceUsd)} />
            <Row label="USD Value" value={formatUsd(usdValue)} />
            <Row label={`${toCoin} Price`} value={formatUsd(getCoin(toCoin).marketPriceUsd)} />
            <div className="border-t pt-2 mt-2"><Row label="You Receive" value={`${formatCoin(toQty)} ${toCoin}`} highlight /></div>
          </CardContent>
        </Card>
        <Button className="w-full" onClick={confirm}>Confirm Swap</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20"><Check size={32} className="text-success" /></div>
      <h1 className="text-2xl font-bold">Swap Successful!</h1>
      <Card className="w-full border-border/40">
        <CardContent className="py-4 space-y-1 text-sm">
          <Row label="Swapped" value={`${formatCoin(qty)} ${fromCoin}`} />
          <Row label="Received" value={`${formatCoin(toQty)} ${toCoin}`} />
          <Row label="Date" value={new Date().toLocaleString()} />
        </CardContent>
      </Card>
      <div className="flex gap-3 w-full">
        <Button variant="outline" className="flex-1" onClick={() => { setStep("form"); setQtyInput(""); }}>Swap More</Button>
        <Button className="flex-1" asChild><a href="/dashboard">Dashboard</a></Button>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "font-bold text-primary" : "font-medium"}>{value}</span>
    </div>
  );
}
