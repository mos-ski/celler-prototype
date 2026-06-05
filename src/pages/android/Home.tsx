import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { store, formatNgn } from "@/lib/crypto";
import { DEALS } from "@/data/dealsData";
import {
  Bell, Eye, EyeOff, Copy, Phone, Wifi, Zap, Tv,
  Dices, ArrowUp, ArrowDown, Clock, Check,
} from "lucide-react";
import { useState } from "react";

const ACCOUNT_NUMBER = "0765 6736 7282";

const TILES = [
  { label: "Airtime",     icon: Phone,     to: "/a/bills/airtime",     color: "#6366f1" },
  { label: "Data",        icon: Wifi,      to: "/a/bills/data",        color: "#8b5cf6" },
  { label: "Electricity", icon: Zap,       to: "/a/bills/electricity", color: "#f59e0b" },
  { label: "TV",          icon: Tv,        to: "/a/bills/tv",          color: "#10b981" },
  { label: "Betting",     icon: Dices,     to: "/a/bills/betting",     color: "#ef4444" },
  { label: "Withdraw",    icon: ArrowUp,   to: "/a/withdraw/NGN",      color: "#6366f1" },
  { label: "Deposit",     icon: ArrowDown, to: "/a/receive/NGN",       color: "#8b5cf6" },
  { label: "History",     icon: Clock,     to: "/a/history",           color: "#64748b" },
];

export default function AndroidHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const wallet = store.getWallet();
  const ngnBalance = wallet["NGN"] || 0;
  const transactions = store.getTransactions().slice(0, 4);
  const firstName = user?.fullName?.split(" ")[0] ?? "there";

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pt-4 pb-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-base">
            {user?.fullName?.[0]?.toUpperCase() ?? "Z"}
          </div>
          <span className="text-base font-semibold">Hello, {firstName}</span>
        </div>
        <button
          onClick={() => navigate("/notifications")}
          className="relative h-10 w-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </div>

      {/* Wallet Card */}
      <div
        className="rounded-3xl overflow-hidden shadow-lg"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%)" }}
      >
        <div className="px-6 pt-6 pb-4">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Total Wallet</p>
          <div className="flex items-center gap-3 mb-1">
            <p className="text-white text-4xl font-bold tracking-tight">
              {hidden ? "₦ ••••••" : formatNgn(ngnBalance)}
            </p>
            <button onClick={() => setHidden((h) => !h)}>
              {hidden
                ? <Eye size={20} className="text-white/50" />
                : <EyeOff size={20} className="text-white/50" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-3" style={{ background: "rgba(255,255,255,0.08)" }}>
          <p className="text-white/70 text-xs tracking-wide font-medium">
            YOUR ACCT NO: {ACCOUNT_NUMBER}
          </p>
          <button onClick={handleCopy} className="text-white/60 hover:text-white transition-colors ml-2">
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Action Tiles */}
      <div className="grid grid-cols-4 gap-3">
        {TILES.map((tile) => (
          <button
            key={tile.label}
            onClick={() => navigate(tile.to)}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ background: `${tile.color}18` }}
            >
              <tile.icon size={22} style={{ color: tile.color }} />
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">{tile.label}</span>
          </button>
        ))}
      </div>

      {/* Deals of the Day */}
      <div>
        <p className="text-sm font-semibold mb-3">Deals of the Day</p>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className="flex-shrink-0 w-36 rounded-2xl border border-border/50 overflow-hidden bg-secondary/40"
            >
              <div className="px-4 pt-4 pb-2">
                <p className="text-base font-bold">{deal.value}</p>
                <p className="text-xs text-muted-foreground capitalize">{deal.category}</p>
              </div>
              <div className="border-t border-border/30 px-4 py-2">
                <p className="text-xs text-muted-foreground line-through">
                  ₦{deal.originalPrice.toLocaleString()}
                </p>
                <p className="text-xs font-semibold">PAY ₦{deal.dealPrice.toLocaleString()}</p>
              </div>
              <div className="px-3 pb-3 pt-1">
                <button
                  onClick={() => navigate(`/a/bills/${deal.category}`)}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  Grab Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {transactions.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-3">Recent</p>
          <div className="space-y-1">
            {transactions.map((tx) => {
              const isCredit = tx.type === "deposit" || tx.type === "receive";
              const emoji =
                tx.type === "bill" ? "📱"
                : tx.type === "deposit" ? "⬇️"
                : tx.type === "withdraw" ? "⬆️"
                : "💳";
              return (
                <button
                  key={tx.id}
                  onClick={() => navigate(`/transaction/${tx.id}`)}
                  className="w-full flex items-center justify-between py-3 border-b border-border/30 last:border-0 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-base">
                      {emoji}
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">
                        {tx.description ?? tx.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${isCredit ? "text-green-500" : ""}`}>
                    {isCredit ? "+" : "-"}{formatNgn(tx.ngnValue)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
