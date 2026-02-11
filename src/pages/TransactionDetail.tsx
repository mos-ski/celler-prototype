import { useParams, useNavigate } from "react-router-dom";
import { store, getCoin, getTxLabel, formatCoin, formatUsd, formatNgn, type Transaction } from "@/lib/crypto";
import CoinIcon from "@/components/CoinIcon";
import { ArrowLeft, CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";

export default function TransactionDetailPage() {
  const { txId } = useParams<{ txId: string }>();
  const navigate = useNavigate();

  const tx = store.getTransactions().find(t => t.id === txId);
  if (!tx) { navigate("/history"); return null; }

  const coinId = tx.coin || tx.fromCoin || "BTC";
  const coin = getCoin(coinId);
  const d = new Date(tx.date);
  const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timeStr = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const copyHash = () => {
    if (tx.hash) {
      navigator.clipboard.writeText(tx.hash);
      toast({ title: "Hash copied!" });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background px-4 pb-8">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold">Transaction Details</h1>
        </div>

        {/* Status card */}
        <div className="bg-card rounded-2xl p-6 border border-border/20 mb-6">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 bg-success/20 text-success text-sm font-medium px-4 py-1.5 rounded-full">
              <CheckCircle2 size={16} />
              {tx.status === "completed" ? "Completed" : tx.status === "failed" ? "Failed" : "Pending"}
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground mb-2 capitalize">{getTxLabel(tx)}</p>

          <div className="flex items-center justify-center gap-2 mb-1">
            <CoinIcon coinId={coinId} size={28} />
            <p className="text-2xl font-bold">{formatCoin(tx.quantity, 4)} {coinId}</p>
          </div>

          <p className="text-center text-sm text-muted-foreground">≈ {formatUsd(tx.usdValue)}</p>
        </div>

        {/* Calculation breakdown */}
        <div className="bg-card rounded-2xl p-5 border border-border/20 space-y-4 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Calculation Breakdown</h3>
          
          {tx.type === "buy" && (
            <>
              <DetailRow label="Amount Paid (USD)" value={formatUsd(tx.usdValue)} />
              <DetailRow label="Exchange Rate" value="₦1,410/$" />
              <DetailRow label="Amount Paid (NGN)" value={formatNgn(tx.ngnValue)} />
              <DetailRow label="Coin Price" value={formatUsd(coin.marketPriceUsd)} />
              <DetailRow label="Coins Received" value={`${formatCoin(tx.quantity)} ${coinId}`} />
              <DetailRow label="Trading Fee" value="Free" highlight />
            </>
          )}

          {tx.type === "sell" && (
            <>
              <DetailRow label="Sold" value={`${formatCoin(tx.quantity)} ${coinId}`} />
              <DetailRow label="Coin Price" value={formatUsd(coin.marketPriceUsd)} />
              <DetailRow label="USD Value" value={formatUsd(tx.usdValue)} />
              <DetailRow label="Exchange Rate" value="₦1,410/$" />
              <DetailRow label="Credited (NGN)" value={formatNgn(tx.ngnValue)} />
              <DetailRow label="Trading Fee" value="Free" highlight />
            </>
          )}

          {tx.type === "swap" && (
            <>
              <DetailRow label="From" value={`${formatCoin(tx.quantity)} ${tx.fromCoin}`} />
              <DetailRow label="To" value={`${formatCoin(tx.toQuantity || 0)} ${tx.toCoin}`} />
              <DetailRow label="USD Value" value={formatUsd(tx.usdValue)} />
              <DetailRow label="Swap Fee (0.2%)" value={`${(tx.quantity * 0.002).toFixed(6)} ${tx.fromCoin}`} />
            </>
          )}

          {(tx.type === "withdraw" || tx.type === "send") && (
            <>
              <DetailRow label="Amount" value={`${formatCoin(tx.quantity)} ${coinId}`} />
              <DetailRow label="USD Value" value={formatUsd(tx.usdValue)} />
              <DetailRow label="NGN Value" value={formatNgn(tx.ngnValue)} />
              <DetailRow label="Withdrawal Fee" value={coinId === "NGN" ? "₦100" : "$0.50"} destructive />
              {tx.address && <DetailRow label="Sent To" value={`${tx.address.slice(0, 6)}...${tx.address.slice(-4)}`} />}
            </>
          )}

          {(tx.type === "deposit" || tx.type === "receive") && (
            <>
              <DetailRow label="Amount" value={`${formatCoin(tx.quantity)} ${coinId}`} />
              <DetailRow label="USD Value" value={formatUsd(tx.usdValue)} />
              <DetailRow label="NGN Value" value={formatNgn(tx.ngnValue)} />
              <DetailRow label="Fee" value="Free" highlight />
            </>
          )}
        </div>

        {/* Details */}
        <div className="bg-card rounded-2xl p-5 border border-border/20 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">Details</h3>
          <DetailRow label="Transaction ID" value={tx.id} />
          <DetailRow label="Date" value={dateStr} />
          <DetailRow label="Time" value={timeStr} />
          {tx.hash && (
            <div className="flex items-center justify-between py-2 border-b border-border/10">
              <span className="text-sm text-muted-foreground">Transaction Hash</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{tx.hash.slice(0, 14)}...</span>
                <button onClick={copyHash}><Copy size={14} className="text-primary" /></button>
              </div>
            </div>
          )}
          <DetailRow label="Network" value={tx.network || "Ethereum Network"} />
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="secondary" className="flex-1 h-14 rounded-2xl text-base font-semibold">
            Share
          </Button>
          <Button className="flex-1 h-14 rounded-2xl text-base font-semibold" onClick={() => navigate(`/receipt/${tx.id}`)}>
            View Receipt
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}

function DetailRow({ label, value, highlight, destructive }: { label: string; value: string; highlight?: boolean; destructive?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-success" : destructive ? "text-destructive" : ""}`}>{value}</span>
    </div>
  );
}
