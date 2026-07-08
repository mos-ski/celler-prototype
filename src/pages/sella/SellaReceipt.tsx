import { useParams, useNavigate } from "react-router-dom";
import { store, formatCoin, formatUsd, formatNgn } from "@/lib/crypto";
import CoinIcon from "@/components/CoinIcon";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import { useRef } from "react";

export default function SellaReceipt() {
  const { txId } = useParams<{ txId: string }>();
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);

  const tx = store.getTransactions().find(t => t.id === txId);
  if (!tx) { navigate("/a/history"); return null; }

  const coinId = tx.coin || tx.fromCoin || "BTC";
  const d = new Date(tx.date);
  const dateStr = d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + (d.getHours() >= 12 ? "PM" : "AM");

  const handleDownload = () => {
    const printContent = receiptRef.current;
    if (!printContent) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <html><head><title>Receipt - ${tx.id}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Space Grotesk', sans-serif; }
        body { padding: 24px; background: #fff; color: #111; }
        .receipt { max-width: 400px; margin: 0 auto; }
        .logo { text-align: center; font-size: 24px; font-weight: bold; color: #6366f1; margin-bottom: 16px; }
        .type { text-align: center; color: #888; text-transform: capitalize; margin-bottom: 8px; }
        .amount { text-align: center; font-size: 28px; font-weight: bold; margin-bottom: 4px; }
        .usd { text-align: center; color: #888; margin-bottom: 24px; }
        .divider { border-top: 1px dashed #ddd; margin: 16px 0; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
        .row .label { color: #888; }
        .row .value { font-weight: 500; }
        .status-completed { color: #22c55e; }
        .status-failed { color: #ef4444; }
        .status-pending { color: #6366f1; }
      </style></head><body>
      <div class="receipt">
        <div class="logo">sella</div>
        <div class="type">${tx.type}</div>
        <div class="amount">${formatCoin(tx.quantity, 4)} ${coinId}</div>
        <div class="usd">≈ ${formatUsd(tx.usdValue)}</div>
        <div class="divider"></div>
        <div class="row"><span class="label">You Receive:</span><span class="value">${formatNgn(tx.ngnValue)}</span></div>
        <div class="row"><span class="label">Rate:</span><span class="value">₦1,410/$</span></div>
        <div class="row"><span class="label">Network:</span><span class="value">${tx.network || "BEP20"}</span></div>
        <div class="row"><span class="label">Transaction ID:</span><span class="value">${tx.id}</span></div>
        <div class="row"><span class="label">Status:</span><span class="value status-${tx.status}">${tx.status === "completed" ? "Completed" : tx.status === "failed" ? "Failed" : "Pending"}</span></div>
        <div class="row"><span class="label">Time:</span><span class="value">${dateStr}, ${timeStr}</span></div>
      </div>
      </body></html>
    `);
    w.document.close();
    setTimeout(() => { w.print(); }, 500);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Sella Receipt - ${tx.id}`,
      text: `Transaction: ${tx.type.toUpperCase()}\nAmount: ${formatCoin(tx.quantity, 4)} ${coinId}\nValue: ${formatUsd(tx.usdValue)}\nNGN: ${formatNgn(tx.ngnValue)}\nStatus: ${tx.status}\nDate: ${dateStr}, ${timeStr}\nID: ${tx.id}`,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      navigator.clipboard.writeText(shareData.text);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background px-4 pb-8">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold">View Receipt</h1>
        </div>

        <div ref={receiptRef} className="relative bg-card rounded-3xl border border-border/20 overflow-hidden">
          <div className="h-4 bg-card relative">
            <svg className="absolute bottom-0 w-full" height="8" viewBox="0 0 400 8" preserveAspectRatio="none">
              <path d="M0,8 L10,0 L20,8 L30,0 L40,8 L50,0 L60,8 L70,0 L80,8 L90,0 L100,8 L110,0 L120,8 L130,0 L140,8 L150,0 L160,8 L170,0 L180,8 L190,0 L200,8 L210,0 L220,8 L230,0 L240,8 L250,0 L260,8 L270,0 L280,8 L290,0 L300,8 L310,0 L320,8 L330,0 L340,8 L350,0 L360,8 L370,0 L380,8 L390,0 L400,8" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>

          <div className="p-6 pt-4">
            <div className="text-center mb-4">
              <p className="text-xl font-bold text-primary">sella</p>
            </div>

            <p className="text-center text-sm text-muted-foreground capitalize mb-2">{tx.type}</p>

            <div className="flex items-center justify-center gap-2 mb-1">
              <CoinIcon coinId={coinId} size={28} />
              <p className="text-2xl font-bold">{formatCoin(tx.quantity, 4)} {coinId}</p>
            </div>
            <p className="text-center text-sm text-muted-foreground mb-4">≈ {formatUsd(tx.usdValue)}</p>

            <div className="border-t border-dashed border-border/40 my-4" />

            <div className="space-y-3">
              <ReceiptRow label="You Receive:" value={formatNgn(tx.ngnValue)} />
              <ReceiptRow label="Rate:" value="₦1,410/$" />
              <ReceiptRow label="Network:" value={tx.network || "BEP20"} />
              <ReceiptRow label="Transaction ID:" value={tx.id} />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transaction Status:</span>
                <span className={`text-sm font-medium ${tx.status === "completed" ? "text-success" : tx.status === "failed" ? "text-destructive" : "text-primary"}`}>
                  {tx.status === "completed" ? "Completed" : tx.status === "failed" ? "Failed" : "Pending"}
                </span>
              </div>
              <ReceiptRow label="Time Stamp:" value={`${dateStr}, ${timeStr}`} />
            </div>
          </div>

          <div className="h-4 relative">
            <svg className="absolute top-0 w-full" height="8" viewBox="0 0 400 8" preserveAspectRatio="none">
              <path d="M0,0 L10,8 L20,0 L30,8 L40,0 L50,8 L60,0 L70,8 L80,0 L90,8 L100,0 L110,8 L120,0 L130,8 L140,0 L150,8 L160,0 L170,8 L180,0 L190,8 L200,0 L210,8 L220,0 L230,8 L240,0 L250,8 L260,0 L270,8 L280,0 L290,8 L300,0 L310,8 L320,0 L330,8 L340,0 L350,8 L360,0 L370,8 L380,0 L390,8 L400,0" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="secondary" className="flex-1 h-14 rounded-2xl text-base font-semibold gap-2" onClick={handleShare}>
            <Share2 size={16} /> Share Receipt
          </Button>
          <Button className="flex-1 h-14 rounded-2xl text-base font-semibold gap-2" onClick={handleDownload}>
            <Download size={16} /> Download PDF
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
