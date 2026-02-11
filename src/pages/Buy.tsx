import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { COINS, getCoin, ngnToUsd, usdToCoin, usdToNgn, formatUsd, formatNgn, formatCoin, store, genId, type CoinId } from "@/lib/crypto";
import { ArrowLeft, Check } from "lucide-react";

type Step = "select" | "amount" | "review" | "success";

export default function BuyPage() {
  const [step, setStep] = useState<Step>("select");
  const [coinId, setCoinId] = useState<CoinId>("BTC");
  const [ngnInput, setNgnInput] = useState("");
  const [usdInput, setUsdInput] = useState("");

  const coin = getCoin(coinId);
  const ngnVal = parseFloat(ngnInput) || 0;
  const usdVal = parseFloat(usdInput) || 0;
  const activeUsd = usdInput ? usdVal : ngnToUsd(ngnVal);
  const activeNgn = ngnInput ? ngnVal : usdToNgn(usdVal);
  const qty = usdToCoin(coinId, activeUsd);

  const handleNgnChange = (v: string) => { setNgnInput(v); setUsdInput(""); };
  const handleUsdChange = (v: string) => { setUsdInput(v); setNgnInput(""); };

  const confirm = () => {
    store.updateWalletCoin(coinId, qty);
    store.addTransaction({ id: genId(), type: "buy", coin: coinId, quantity: qty, usdValue: activeUsd, ngnValue: activeNgn, date: new Date().toISOString(), status: "completed" });
    setStep("success");
  };

  if (step === "select") {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Buy Crypto</h1>
        <p className="text-sm text-muted-foreground">Select a coin to buy</p>
        <div className="grid gap-2">
          {COINS.map((c) => (
            <Card key={c.id} className="cursor-pointer border-border/40 hover:border-primary/50 transition-colors" onClick={() => { setCoinId(c.id); setStep("amount"); }}>
              <CardContent className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.id}</p></div>
                </div>
                <p className="text-sm font-medium">{formatUsd(c.marketPriceUsd)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (step === "amount") {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("select")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Back</button>
        <h1 className="text-2xl font-bold">Buy {coin.name}</h1>
        <p className="text-xs text-muted-foreground">Market price: {formatUsd(coin.marketPriceUsd)}</p>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Amount in NGN</Label>
            <Input type="number" placeholder="0.00" value={ngnInput} onChange={(e) => handleNgnChange(e.target.value)} />
          </div>
          <p className="text-center text-xs text-muted-foreground">— OR —</p>
          <div className="space-y-2">
            <Label>Amount in USD</Label>
            <Input type="number" placeholder="0.00" value={usdInput} onChange={(e) => handleUsdChange(e.target.value)} />
          </div>
        </div>

        {activeUsd > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-3 text-sm space-y-1">
              <p>You pay: <strong>{formatNgn(activeNgn)}</strong> ({formatUsd(activeUsd)})</p>
              <p>You receive: <strong>{formatCoin(qty)} {coinId}</strong></p>
              <p className="text-xs text-muted-foreground">Rate: ₦1,410/$1 · {coinId} = {formatUsd(coin.marketPriceUsd)}</p>
            </CardContent>
          </Card>
        )}

        <Button className="w-full" disabled={activeUsd <= 0} onClick={() => setStep("review")}>Continue</Button>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("amount")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Back</button>
        <h1 className="text-2xl font-bold">Confirm Purchase</h1>
        <Card className="border-primary/20">
          <CardContent className="py-4 space-y-2 text-sm">
            <Row label="Coin" value={`${coin.name} (${coinId})`} />
            <Row label="Market Price" value={formatUsd(coin.marketPriceUsd)} />
            <Row label="USD Amount" value={formatUsd(activeUsd)} />
            <Row label="NGN Cost" value={formatNgn(activeNgn)} />
            <Row label="Exchange Rate" value="₦1,410/$1" />
            <div className="border-t pt-2 mt-2"><Row label="You Receive" value={`${formatCoin(qty)} ${coinId}`} highlight /></div>
          </CardContent>
        </Card>
        <Button className="w-full" onClick={confirm}>Confirm Buy</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20"><Check size={32} className="text-success" /></div>
      <h1 className="text-2xl font-bold">Purchase Successful!</h1>
      <Card className="w-full border-border/40">
        <CardContent className="py-4 space-y-1 text-sm">
          <Row label="Bought" value={`${formatCoin(qty)} ${coinId}`} />
          <Row label="Cost" value={`${formatNgn(activeNgn)} (${formatUsd(activeUsd)})`} />
          <Row label="Date" value={new Date().toLocaleString()} />
        </CardContent>
      </Card>
      <div className="flex gap-3 w-full">
        <Button variant="outline" className="flex-1" onClick={() => { setStep("select"); setNgnInput(""); setUsdInput(""); }}>Buy More</Button>
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
