import { useState } from "react";
import { Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react";
import { dashboardStats, adminOrders, revenueChartData, sparklineData } from "@/data/adminMockData";
import CoinIcon from "@/components/CoinIcon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { formatNgn } from "@/lib/crypto";

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

  const statCards = [
    { label: "Registered Users", value: dashboardStats.totalRegisteredUsers.toLocaleString(), change: +12, sparkline: sparklineData.registeredUsers },
    { label: "Verified Users", value: dashboardStats.totalVerifiedUsers.toLocaleString(), change: +5, sparkline: null },
    { label: "Active Users", value: dashboardStats.totalActiveUsers.toLocaleString(), change: -3, sparkline: sparklineData.activeUsers },
    { label: "Active / Month", value: dashboardStats.activeUsersMonth.toString(), change: +8, sparkline: null },
  ];

  return (
    <div className="space-y-6">
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
              <p className="text-xs text-muted-foreground">Volume (USD)</p>
              <p className="text-lg font-bold text-foreground">${dashboardStats.totalVolume.toLocaleString()}</p>
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
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-base font-semibold text-foreground">30-Day Revenue</h2>
        <div className="h-56">
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
        <div className="rounded-xl border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminOrders.slice(0, 5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm">
                        {coinIcons[order.coin] || order.coin}
                      </span>
                      <span className="font-medium text-foreground">{order.coin}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{order.type}</TableCell>
                  <TableCell className="text-foreground">{order.amount}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
                        {order.userInitial}
                      </span>
                      <span className="text-foreground">{order.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm ${order.status === "Completed" ? "text-success" : order.status === "Pending" ? "text-yellow-500" : "text-destructive"}`}>
                      {order.status === "Completed" ? "✓" : order.status === "Pending" ? "⏳" : "✗"} {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-foreground">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
