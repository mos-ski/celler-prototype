import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { store, COINS, coinToUsd, usdToNgn, formatUsd, formatNgn, formatCoin, type Transaction } from "@/lib/crypto";
import { ShoppingCart, Banknote, ArrowLeftRight } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const wallet = store.getWallet();
  const transactions = store.getTransactions().slice(0, 5);

  let totalUsd = 0;
  COINS.forEach((c) => { totalUsd += coinToUsd(c.id, wallet[c.id] || 0); });

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.fullName?.split(" ")[0] ?? "Trader"} 👋</h1>
        <p className="text-muted-foreground text-sm">Your portfolio at a glance</p>
      </div>

      {/* Total balance */}
      <Card className="bg-gradient-to-br from-primary/20 to-card border-primary/20">
        <CardContent className="py-6">
          <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
          <p className="text-3xl font-bold">{formatUsd(totalUsd)}</p>
          <p className="text-lg text-primary font-semibold">{formatNgn(usdToNgn(totalUsd))}</p>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link to="/buy"><Button variant="outline" className="w-full flex flex-col h-auto py-3 gap-1 border-primary/30 hover:bg-primary/10"><ShoppingCart size={20} className="text-primary" /><span className="text-xs">Buy</span></Button></Link>
        <Link to="/sell"><Button variant="outline" className="w-full flex flex-col h-auto py-3 gap-1 border-primary/30 hover:bg-primary/10"><Banknote size={20} className="text-primary" /><span className="text-xs">Sell</span></Button></Link>
        <Link to="/swap"><Button variant="outline" className="w-full flex flex-col h-auto py-3 gap-1 border-primary/30 hover:bg-primary/10"><ArrowLeftRight size={20} className="text-primary" /><span className="text-xs">Swap</span></Button></Link>
      </div>

      {/* Portfolio */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Portfolio</h2>
        <div className="space-y-2">
          {COINS.map((c) => {
            const qty = wallet[c.id] || 0;
            const usd = coinToUsd(c.id, qty);
            return (
              <Card key={c.id} className="border-border/40">
                <CardContent className="flex items-center justify-between py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCoin(qty)} {c.id}</p>
                    <p className="text-xs text-muted-foreground">{formatUsd(usd)}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Link to="/history" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No transactions yet.</p>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx) => <TxRow key={tx.id} tx={tx} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function TxRow({ tx }: { tx: Transaction }) {
  const label = tx.type === "buy" ? `Bought ${tx.coin}` : tx.type === "sell" ? `Sold ${tx.coin}` : `${tx.fromCoin} → ${tx.toCoin}`;
  const color = tx.type === "buy" ? "text-success" : tx.type === "sell" ? "text-destructive" : "text-primary";
  return (
    <Card className="border-border/40">
      <CardContent className="flex items-center justify-between py-3 px-4">
        <div>
          <p className={`text-sm font-medium ${color}`}>{tx.type.toUpperCase()}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{formatUsd(tx.usdValue)}</p>
          <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
