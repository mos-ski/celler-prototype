import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { COINS, getCoin, coinToUsd, usdToNgn, usdToCoin, ngnToUsd, formatUsd, formatNgn, formatCoin, store, genId, type CoinId } from "@/lib/crypto";
import { ArrowLeft, Check } from "lucide-react";

type Step = "select" | "amount" | "review" | "success";

export default function SellPage() {
  const [step, setStep] = useState<Step>("select");
  const [coinId, setCoinId] = useState<CoinId>("BTC");
  const [qtyInput, setQtyInput] = useState("");
  const [ngnInput, setNgnInput] = useState("");
  const wallet = store.getWallet();

  const coin = getCoin(coinId);
  const balance = wallet[coinId] || 0;

  const qtyVal = parseFloat(qtyInput) || 0;
  const ngnVal = parseFloat(ngnInput) || 0;

  const activeQty = qtyInput ? Math.min(qtyVal, balance) : usdToCoin(coinId, ngnToUsd(ngnVal));
  const activeUsd = coinToUsd(coinId, activeQty);
  const activeNgn = qtyInput ? usdToNgn(activeUsd) : ngnVal;

  const handleQtyChange = (v: string) => { setQtyInput(v); setNgnInput(""); };
  const handleNgnChange = (v: string) => { setNgnInput(v); setQtyInput(""); };

  const confirm = () => {
    store.updateWalletCoin(coinId, -activeQty);
    store.addTransaction({ id: genId(), type: "sell", coin: coinId, quantity: activeQty, usdValue: activeUsd, ngnValue: usdToNgn(activeUsd), date: new Date().toISOString(), status: "completed" });
    setStep("success");
  };

  if (step === "select") {
    const available = COINS.filter((c) => (wallet[c.id] || 0) > 0);
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Sell Crypto</h1>
        <p className="text-sm text-muted-foreground">Select coin to sell</p>
        {available.length === 0 ? <p className="text-sm text-muted-foreground">No coins in wallet.</p> : (
          <div className="grid gap-2">
            {available.map((c) => (
              <Card key={c.id} className="cursor-pointer border-border/40 hover:border-primary/50 transition-colors" onClick={() => { setCoinId(c.id); setStep("amount"); }}>
                <CardContent className="flex items-center justify-between py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.icon}</span>
                    <div><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">Balance: {formatCoin(wallet[c.id] || 0)} {c.id}</p></div>
                  </div>
                  <p className="text-sm font-medium">{formatUsd(c.marketPriceUsd)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (step === "amount") {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("select")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Back</button>
        <h1 className="text-2xl font-bold">Sell {coin.name}</h1>
        <p className="text-xs text-muted-foreground">Balance: {formatCoin(balance)} {coinId} · Price: {formatUsd(coin.marketPriceUsd)}</p>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Quantity ({coinId})</Label>
            <Input type="number" placeholder="0.00" value={qtyInput} onChange={(e) => handleQtyChange(e.target.value)} />
            <button className="text-xs text-primary hover:underline" onClick={() => handleQtyChange(String(balance))}>Max: {formatCoin(balance)}</button>
          </div>
          <p className="text-center text-xs text-muted-foreground">— OR —</p>
          <div className="space-y-2">
            <Label>Target NGN amount</Label>
            <Input type="number" placeholder="0.00" value={ngnInput} onChange={(e) => handleNgnChange(e.target.value)} />
          </div>
        </div>

        {activeQty > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-3 text-sm space-y-1">
              <p>You sell: <strong>{formatCoin(activeQty)} {coinId}</strong></p>
              <p>USD value: <strong>{formatUsd(activeUsd)}</strong></p>
              <p>You receive: <strong>{formatNgn(usdToNgn(activeUsd))}</strong></p>
            </CardContent>
          </Card>
        )}

        <Button className="w-full" disabled={activeQty <= 0 || activeQty > balance} onClick={() => setStep("review")}>Continue</Button>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("amount")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Back</button>
        <h1 className="text-2xl font-bold">Confirm Sale</h1>
        <Card className="border-primary/20">
          <CardContent className="py-4 space-y-2 text-sm">
            <Row label="Selling" value={`${formatCoin(activeQty)} ${coinId}`} />
            <Row label="Market Price" value={formatUsd(coin.marketPriceUsd)} />
            <Row label="USD Value" value={formatUsd(activeUsd)} />
            <Row label="Exchange Rate" value="₦1,410/$1" />
            <div className="border-t pt-2 mt-2"><Row label="NGN Payout" value={formatNgn(usdToNgn(activeUsd))} highlight /></div>
          </CardContent>
        </Card>
        <Button className="w-full" onClick={confirm}>Confirm Sale</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20"><Check size={32} className="text-success" /></div>
      <h1 className="text-2xl font-bold">Sale Successful!</h1>
      <Card className="w-full border-border/40">
        <CardContent className="py-4 space-y-1 text-sm">
          <Row label="Sold" value={`${formatCoin(activeQty)} ${coinId}`} />
          <Row label="Received" value={formatNgn(usdToNgn(activeUsd))} />
          <Row label="Date" value={new Date().toLocaleString()} />
        </CardContent>
      </Card>
      <div className="flex gap-3 w-full">
        <Button variant="outline" className="flex-1" onClick={() => { setStep("select"); setQtyInput(""); setNgnInput(""); }}>Sell More</Button>
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
