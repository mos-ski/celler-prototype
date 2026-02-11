import { useParams, useNavigate, Link } from "react-router-dom";
import { getCoin, coinToUsd, usdToNgn, formatUsd, formatNgn, formatCoin, store, getTxLabel, type CoinId } from "@/lib/crypto";
import CoinIcon from "@/components/CoinIcon";
import TxIcon from "@/components/TxIcon";
import { ArrowLeft, Plus, Minus, ArrowDown, ArrowUp, Inbox, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";

export default function CoinDetailPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const id = (coinId?.toUpperCase() || "BTC") as CoinId;

  let coin;
  try { coin = getCoin(id); } catch { navigate("/dashboard"); return null; }

  const wallet = store.getWallet();
  const qty = wallet[id] || 0;
  const usd = coinToUsd(id, qty);
  const ngn = usdToNgn(usd);
  const txs = store.getTransactions().filter((tx) =>
    tx.coin === id || tx.fromCoin === id || tx.toCoin === id
  );

  const actions = [
    { icon: Plus, label: "Buy", to: "/buy" },
    { icon: Minus, label: "Sell", to: "/sell" },
    { icon: ArrowDown, label: "Deposit", to: `/receive/${id}` },
    { icon: ArrowUp, label: "Withdraw", to: `/withdraw/${id}` },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24">
        <div className="flex items-center gap-3 pt-4 px-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center px-4">
          <CoinIcon coinId={id} size={64} />
          <p className="text-3xl font-bold mt-4">{formatCoin(qty, 6)} {id}</p>
          <p className="text-sm text-muted-foreground mt-1">{formatNgn(ngn)}</p>
        </div>

        <div className="flex justify-center gap-6 mt-8 px-4">
          {actions.map((a) => (
            <Link key={a.label} to={a.to} className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
                <a.icon size={22} className="text-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">{a.label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Transactions History</h3>
            <button className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <SlidersHorizontal size={14} className="text-muted-foreground" />
            </button>
          </div>

          {txs.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-muted-foreground">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Inbox size={28} className="text-muted-foreground" />
              </div>
              <p className="text-sm">Your Recent Transactions</p>
              <p className="text-sm">will appear here</p>
            </div>
          ) : (
            <div className="space-y-0">
              {txs.slice(0, 10).map((tx) => (
                <button
                  key={tx.id}
                  onClick={() => navigate(`/transaction/${tx.id}`)}
                  className="w-full flex items-center justify-between py-3 border-b border-border/20 last:border-0 text-left hover:bg-secondary/30 transition-colors rounded-lg px-1"
                >
                  <div className="flex items-center gap-3">
                    <TxIcon tx={tx} />
                    <div>
                      <p className="text-sm font-medium">{getTxLabel(tx)}</p>
                      <p className="text-xs text-success">Completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCoin(tx.quantity, 6)}</p>
                    <p className="text-xs text-muted-foreground">{formatUsd(tx.usdValue)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <Button className="w-full h-14 rounded-2xl text-base font-semibold mt-6" asChild>
            <Link to="/buy">Buy {id}</Link>
          </Button>
        </div>

        <div className="px-4 mt-6 pt-4 border-t border-border/20">
          <p className="text-xs text-muted-foreground">Current {id} Price</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{formatUsd(coin.marketPriceUsd)}</p>
            <span className="text-xs text-destructive">-1.33%</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
