import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { store, COINS, coinToUsd, usdToNgn, formatUsd, formatNgn, formatCoin, type Transaction } from "@/lib/crypto";
import { Plus, Minus, ArrowDown, ArrowUp, Gift, Bell } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const wallet = store.getWallet();
  const transactions = store.getTransactions().slice(0, 5);

  let totalUsd = 0;
  COINS.forEach((c) => { totalUsd += coinToUsd(c.id, wallet[c.id] || 0); });

  return (
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
          <button className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
            <Bell size={18} />
          </button>
          <Link to="/buy" className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <Plus size={18} className="text-primary-foreground" />
          </Link>
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
          { icon: ArrowDown, label: "Deposit", to: "/buy" },
          { icon: ArrowUp, label: "Withdraw", to: "/sell" },
          { icon: Gift, label: "Earn", to: "/dashboard", accent: true },
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
        {COINS.map((c) => {
          const qty = wallet[c.id] || 0;
          const usd = coinToUsd(c.id, qty);
          return (
            <div key={c.id} className="flex items-center justify-between py-4 border-b border-border/30 last:border-0">
              <div className="flex items-center gap-3">
                <CoinIcon coinId={c.id} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{c.id}</span>
                    <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{formatUsd(c.marketPriceUsd)}</span>
                    <span className="text-xs text-success">+3.09%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatCoin(qty, 7)}</p>
                <p className="text-xs text-muted-foreground">{formatUsd(usd)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CoinIcon({ coinId }: { coinId: string }) {
  const colors: Record<string, string> = {
    BTC: "bg-orange-500",
    ETH: "bg-slate-500",
    USDT: "bg-emerald-600",
    BNB: "bg-yellow-500",
    SOL: "bg-purple-500",
  };
  const icons: Record<string, string> = { BTC: "₿", ETH: "Ξ", USDT: "₮", BNB: "◆", SOL: "◎" };
  return (
    <div className={`h-10 w-10 rounded-full ${colors[coinId] || "bg-secondary"} flex items-center justify-center text-white font-bold text-sm`}>
      {icons[coinId] || "?"}
    </div>
  );
}

export { CoinIcon };
