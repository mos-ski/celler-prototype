import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, Shield, Ban, CheckCircle, Copy, RotateCcw } from "lucide-react";
import { customers, type Customer, adminOrders } from "@/data/adminMockData";
import { COINS, formatNgn, formatCoin, NGN_RATE, type CoinId } from "@/lib/crypto";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CoinIcon from "@/components/CoinIcon";
import { toast } from "sonner";
import { useState } from "react";

function mockWalletForCustomer(c: Customer) {
  const seed = parseInt(c.id.replace("c", ""), 10);
  return COINS.filter(coin => coin.id !== "NGN").map(coin => ({
    coinId: coin.id as CoinId,
    name: coin.name,
    balance: +(seed * 0.001 * (coin.marketPriceUsd > 100 ? 0.01 : coin.marketPriceUsd > 1 ? 1 : 100)).toFixed(6),
  }));
}

const CustomerDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const customer = customers.find(c => c.id === customerId);
  const [status, setStatus] = useState(customer?.status || "Active");

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Customer not found</p>
        <Button variant="ghost" onClick={() => navigate("/admin/customers")} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Customers
        </Button>
      </div>
    );
  }

  const wallet = mockWalletForCustomer(customer);
  const totalUsd = wallet.reduce((sum, w) => {
    const coin = COINS.find(c => c.id === w.coinId);
    return sum + (coin ? w.balance * coin.marketPriceUsd : 0);
  }, 0);

  const customerOrders = adminOrders.filter(o => o.userName === customer.name);

  const handleToggleStatus = () => {
    const newStatus = status === "Active" ? "Suspended" : "Active";
    setStatus(newStatus);
    toast.success(`Customer ${newStatus === "Suspended" ? "suspended" : "activated"}`);
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/admin/customers")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Customers
      </button>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl font-bold text-foreground">
            {customer.initial}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{customer.name}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {customer.email}</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {customer.phone}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                status === "Active" ? "bg-success/15 text-success" : status === "Suspended" ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"
              }`}>
                {status}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                customer.kycStatus === "Verified" ? "bg-success/15 text-success" :
                customer.kycStatus === "Pending" ? "bg-yellow-500/15 text-yellow-500" :
                "bg-destructive/15 text-destructive"
              }`}>
                KYC: {customer.kycLevel === "None" ? "None" : customer.kycLevel}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleToggleStatus}>
            {status === "Active" ? <Ban className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
            {status === "Active" ? "Suspend" : "Activate"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("Password reset email sent (mock)")}>
            <RotateCcw className="h-4 w-4 mr-1" /> Reset Password
          </Button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Total Trades</p>
          <p className="text-2xl font-bold text-foreground mt-1">{customer.totalTrades}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Volume (NGN)</p>
          <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">{formatNgn(customer.totalVolumeNgn)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Portfolio (USD)</p>
          <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">${totalUsd.toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Joined</p>
          <p className="text-lg font-bold text-foreground mt-1">{new Date(customer.dateJoined).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</p>
        </div>
      </div>

      {/* KYC Details */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4" /> KYC Verification
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Tier 1", "Tier 2", "Tier 3"].map((tier) => {
            const isActive = customer.kycLevel === tier || 
              (tier === "Tier 1" && (customer.kycLevel === "Tier 2" || customer.kycLevel === "Tier 3")) ||
              (tier === "Tier 2" && customer.kycLevel === "Tier 3");
            return (
              <div key={tier} className={`rounded-xl border p-4 ${isActive ? "border-success/30 bg-success/5" : "border-border"}`}>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{tier}</p>
                  {isActive ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <span className="text-xs text-muted-foreground">Not completed</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {tier === "Tier 1" && "BVN + Liveness · $1k trade / $100 withdraw"}
                  {tier === "Tier 2" && "ID + Address · $5k trade / $500 withdraw"}
                  {tier === "Tier 3" && "Employment + Risk · $20k trade / $10k withdraw"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wallet Balances */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <h2 className="text-base font-semibold text-foreground mb-4">Wallet Balances</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {wallet.map(w => {
            const coin = COINS.find(c => c.id === w.coinId)!;
            return (
              <div key={w.coinId} className="rounded-xl border border-border p-3">
                <div className="flex items-center gap-2">
                  <CoinIcon coinId={w.coinId} size={24} />
                  <span className="text-sm font-medium text-foreground">{w.coinId}</span>
                </div>
                <p className="text-lg font-bold text-foreground mt-1">{formatCoin(w.balance, 6)}</p>
                <p className="text-xs text-muted-foreground">≈ ${(w.balance * coin.marketPriceUsd).toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trade History */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-4">Trade History</h2>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>NGN Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No trades found for this customer</TableCell>
                </TableRow>
              ) : (
                customerOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CoinIcon coinId={order.coin} size={24} />
                        <span className="font-medium text-foreground">{order.coin}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        order.type === "Buy" ? "bg-success/15 text-success" :
                        order.type === "Sell" ? "bg-primary/15 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>{order.type}</span>
                    </TableCell>
                    <TableCell className="text-foreground">{order.amount}</TableCell>
                    <TableCell className="text-foreground">{formatNgn(order.amountNgn)}</TableCell>
                    <TableCell>
                      <span className={`text-sm ${order.status === "Completed" ? "text-success" : order.status === "Pending" ? "text-yellow-500" : "text-destructive"}`}>{order.status}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2">
          {customerOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">No trades found for this customer</div>
          ) : (
            customerOrders.map(order => (
              <div key={order.id} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CoinIcon coinId={order.coin} size={24} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.amount}</p>
                      <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                        order.type === "Buy" ? "bg-success/15 text-success" :
                        order.type === "Sell" ? "bg-primary/15 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>{order.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{formatNgn(order.amountNgn)}</p>
                    <span className={`text-xs ${order.status === "Completed" ? "text-success" : order.status === "Pending" ? "text-yellow-500" : "text-destructive"}`}>{order.status}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
