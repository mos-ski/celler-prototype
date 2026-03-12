import { useState, useMemo } from "react";
import { Eye, EyeOff, TrendingUp, TrendingDown, Gift, Users } from "lucide-react";
import { dashboardStats, adminOrders, revenueChartData, sparklineData } from "@/data/adminMockData";
import { giftcardStore } from "@/data/giftcardData";
import { referralStore } from "@/lib/referral";
import CoinIcon from "@/components/CoinIcon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { formatNgn } from "@/lib/crypto";
import { Badge } from "@/components/ui/badge";

const MiniSparkline = ({ data }: { data: number[] }) => {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-8 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const AdminDashboard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const navigate = useNavigate();

  const giftcardOrders = useMemo(() => giftcardStore.getOrders(), []);
  const referrals = useMemo(() => referralStore.getReferrals(), []);
  const referralWithdrawals = useMemo(() => referralStore.getWithdrawals(), []);

  const pendingGiftcards = giftcardOrders.filter(o => o.status === "pending").length;
  const pendingReferralWithdrawals = referralWithdrawals.filter(w => w.status === "pending").length;
  const totalGiftcardVolume = giftcardOrders.filter(o => o.status === "approved").reduce((sum, o) => sum + o.ngnPayout, 0);

  const statCards = [
    { label: "Registered Users", value: dashboardStats.totalRegisteredUsers.toLocaleString(), change: +12, sparkline: sparklineData.registeredUsers },
    { label: "Verified Users", value: dashboardStats.totalVerifiedUsers.toLocaleString(), change: +5, sparkline: null },
    { label: "Active Users", value: dashboardStats.totalActiveUsers.toLocaleString(), change: -3, sparkline: sparklineData.activeUsers },
    { label: "Active / Month", value: dashboardStats.activeUsersMonth.toString(), change: +8, sparkline: null },
  ];

  return (
    <div className="space-y-6">
      {/* Pending Actions Alert */}
      {(pendingGiftcards > 0 || pendingReferralWithdrawals > 0) && (
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Gift className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="font-medium text-foreground">Pending Actions Required</p>
              <p className="text-sm text-muted-foreground">
                {pendingGiftcards > 0 && `${pendingGiftcards} giftcard order${pendingGiftcards > 1 ? "s" : ""}`}
                {pendingGiftcards > 0 && pendingReferralWithdrawals > 0 && " • "}
                {pendingReferralWithdrawals > 0 && `${pendingReferralWithdrawals} referral withdrawal${pendingReferralWithdrawals > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {pendingGiftcards > 0 && (
              <button onClick={() => navigate("/admin/giftcard-orders")} className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600">
                Review Giftcards
              </button>
            )}
            {pendingReferralWithdrawals > 0 && (
              <button onClick={() => navigate("/admin/referrals")} className="px-3 py-1.5 rounded-lg border border-yellow-500 text-yellow-500 text-sm font-medium hover:bg-yellow-500/10">
                Review Withdrawals
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top: Payout + Stats */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Payout</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-3xl font-bold text-foreground">
              {showBalance ? formatNgn(dashboardStats.totalPayoutNgn) : "₦*******"}
            </p>
            <button onClick={() => setShowBalance(!showBalance)} className="text-muted-foreground">
              {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {showBalance ? `≈ $${dashboardStats.totalPayoutUsd.toLocaleString()}` : "≈ $*******"}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-muted p-2">
              <p className="text-xs text-muted-foreground">Transactions</p>
              <p className="text-lg font-bold text-foreground">{dashboardStats.totalTransactions.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-muted p-2">
              <p className="text-xs text-muted-foreground">GC Volume</p>
              <p className="text-lg font-bold text-foreground">{formatNgn(totalGiftcardVolume)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                {stat.sparkline && <MiniSparkline data={stat.sparkline} />}
              </div>
              <div className="mt-1 flex items-center gap-1">
                {stat.change > 0 ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={`text-xs font-medium ${stat.change > 0 ? "text-success" : "text-destructive"}`}>
                  {stat.change > 0 ? "+" : ""}{stat.change}%
                </span>
                <span className="text-xs text-muted-foreground">vs last week</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <h2 className="mb-4 text-base font-semibold text-foreground">30-Day Revenue</h2>
        <div className="h-48 sm:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} interval={4} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }}
                labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                formatter={(v: number) => [`$${v}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#revenueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
          <button onClick={() => navigate("/admin/orders")} className="text-sm font-medium text-primary hover:underline">
            View all →
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminOrders.slice(0, 5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CoinIcon coinId={order.coin} size={32} />
                      <span className="font-medium text-foreground">{order.coin}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{order.type}</TableCell>
                  <TableCell className="text-foreground">{order.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">{order.userInitial}</span>
                      <span className="text-foreground">{order.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm ${order.status === "Completed" ? "text-success" : order.status === "Pending" ? "text-yellow-500" : "text-destructive"}`}>
                      {order.status === "Completed" ? "✓" : order.status === "Pending" ? "⏳" : "✗"} {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2">
          {adminOrders.slice(0, 5).map((order) => (
            <div key={order.id} className="rounded-xl border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CoinIcon coinId={order.coin} size={28} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.amount}</p>
                    <p className="text-xs text-muted-foreground">{order.userName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium ${order.status === "Completed" ? "text-success" : order.status === "Pending" ? "text-yellow-500" : "text-destructive"}`}>
                    {order.status}
                  </span>
                  <p className="text-[10px] text-muted-foreground">{order.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
