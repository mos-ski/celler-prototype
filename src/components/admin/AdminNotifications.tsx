import { useState, useRef, useEffect } from "react";
import { Bell, CreditCard, Wallet, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { giftcardStore } from "@/data/giftcardData";
import { referralStore } from "@/lib/referral";

interface NotificationItem {
  id: string;
  icon: typeof Bell;
  label: string;
  count: number;
  route: string;
  color: string;
}

export function AdminNotifications() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const pendingGiftcards = giftcardStore.getOrders().filter(o => o.status === "pending").length;
  const pendingWithdrawals = referralStore.getWithdrawals().filter(w => w.status === "pending").length;

  const notifications: NotificationItem[] = [
    { id: "gc", icon: CreditCard, label: "Pending Giftcard Orders", count: pendingGiftcards, route: "/admin/giftcard-orders", color: "text-yellow-500" },
    { id: "rw", icon: Wallet, label: "Pending Ref. Withdrawals", count: pendingWithdrawals, route: "/admin/referrals", color: "text-primary" },
  ].filter(n => n.count > 0);

  const totalCount = notifications.reduce((sum, n) => sum + n.count, 0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <Bell className="h-4 w-4" />
        {totalCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
            {totalCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-72 rounded-xl border border-border bg-card shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">Notifications</p>
          </div>
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              All caught up! 🎉
            </div>
          ) : (
            <div>
              {notifications.map(n => (
                <button
                  key={n.id}
                  onClick={() => { navigate(n.route); setOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-accent transition-colors"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted ${n.color}`}>
                    <n.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.count} pending</p>
                  </div>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                    {n.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
