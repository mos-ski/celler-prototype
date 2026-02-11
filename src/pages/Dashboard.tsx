import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { store, COINS, coinToUsd, usdToNgn, formatUsd, formatNgn, formatCoin, type CoinId } from "@/lib/crypto";
import CoinIcon from "@/components/CoinIcon";
import { Plus, Minus, ArrowDown, ArrowUp, Gift, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { DashboardSkeleton } from "@/components/LoadingSkeleton";
import PageTransition from "@/components/PageTransition";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const wallet = store.getWallet();
  const visibleCoins = store.getVisibleCoins();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <DashboardSkeleton />;

  let totalUsd = 0;
  COINS.forEach((c) => { totalUsd += coinToUsd(c.id, wallet[c.id] || 0); });
  const displayCoins = COINS.filter(c => visibleCoins.includes(c.id));

  return (
    <PageTransition>
      <div className="space-y-6 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-lg">
              {user?.fullName?.[0]?.toUpperCase() ?? "T"}
            </div>
            <span className="text-base font-medium">Hello, {user?.fullName?.split(" ")[0] ?? "Trader"}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/notifications")} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground relative">
              <Bell size={18} />
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <button onClick={() => navigate("/manage-assets")} className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Plus size={18} className="text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="text-center py-6">
          <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">Total Wallet</p>
          <p className="text-4xl font-bold tracking-tight">{formatUsd(totalUsd)}</p>
          <p className="text-sm text-muted-foreground mt-1">
            NGN {usdToNgn(totalUsd).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
            <span className="text-success ml-2">↑ +0.98%</span>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4">
          {[
            { icon: Plus, label: "Buy", to: "/buy" },
            { icon: Minus, label: "Sell", to: "/sell" },
            { icon: ArrowDown, label: "Deposit", to: "/receive/USDT" },
            { icon: ArrowUp, label: "Withdraw", to: "/withdraw/USDT" },
            { icon: Gift, label: "Earn", to: "/referral", accent: true },
          ].map((a) => (
            <Link key={a.label} to={a.to} className="flex flex-col items-center gap-2">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${a.accent ? "bg-destructive/80" : "bg-secondary"}`}>
                <a.icon size={22} className={a.accent ? "text-destructive-foreground" : "text-foreground"} />
              </div>
              <span className="text-[11px] text-muted-foreground">{a.label}</span>
            </Link>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="rounded-2xl bg-secondary p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Introducing bill payment with crypto.</p>
            <p className="text-xs text-muted-foreground">Join the waitlist now</p>
          </div>
          <span className="text-3xl">🪙</span>
        </div>

        {/* Coin List */}
        <div className="space-y-1">
          {displayCoins.map((c) => {
            const qty = wallet[c.id] || 0;
            const usd = coinToUsd(c.id, qty);
            return (
              <button
                key={c.id}
                onClick={() => navigate(`/coin/${c.id}`)}
                className="w-full flex items-center justify-between py-4 border-b border-border/30 last:border-0 text-left hover:bg-secondary/30 rounded-xl px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CoinIcon coinId={c.id} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{c.id}</span>
                      <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{formatUsd(c.marketPriceUsd)}</span>
                      <span className={`text-xs ${c.id === "BTC" ? "text-destructive" : "text-success"}`}>
                        {c.id === "BTC" ? "-1.33%" : "+3.09%"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCoin(qty, 7)}</p>
                  <p className="text-xs text-muted-foreground">{formatUsd(usd)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
