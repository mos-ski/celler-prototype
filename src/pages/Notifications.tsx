import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Megaphone, TrendingUp, Sparkles, Bell } from "lucide-react";

const MOCK_NOTIFICATIONS = [
  { icon: Megaphone, title: "New Sell Rate Updated", body: "Sell Rates have been updated. New Rate: USDT: 1,455, BTC:1,445, SOL: 1,440.00 ETH: 1,445.00", date: "15 JAN 2026 | 10:20 AM", unread: true },
  { icon: Bell, title: "New Buy Rate Updated", body: "Buy Rates have been updated. New Rate: USDT: 1,455, BTC:1,445, SOL: 1,440.00 ETH: 1,445.00", date: "15 JAN 2026 | 10:20 AM", unread: true },
  { icon: Sparkles, title: "New Feature Available", body: "Try our new staking rewards program and earn up to 12% APY.", date: "15 JAN 2026 | 10:20 AM", unread: true },
  { icon: TrendingUp, title: "Price Alert", body: "Bitcoin has reached your target price of $45,000.", date: "15 JAN 2026 | 10:20 AM", unread: true },
];

export default function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-4 pb-24">
      <div className="flex items-center justify-between pt-4 mb-6">
        <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-bold">Notifications</h1>
        <button className="h-10 w-10 rounded-full flex items-center justify-center">
          <MoreVertical size={18} className="text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((n, i) => (
          <div key={i} className="bg-card rounded-2xl p-4 space-y-2 border border-border/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
                  <n.icon size={16} className="text-primary" />
                </div>
                <span className="text-sm font-semibold">{n.title}</span>
              </div>
              {n.unread && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{n.body}</p>
            <div className="border-t border-border/20 pt-2">
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">{n.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
