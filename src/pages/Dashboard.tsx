import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { store, COINS, coinToUsd, usdToNgn, formatUsd, formatNgn, formatCoin, type CoinId } from "@/lib/crypto";
import CoinIcon from "@/components/CoinIcon";
import { Plus, Minus, ArrowDown, ArrowUp, Gift, Bell, X, Search } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { DashboardSkeleton } from "@/components/LoadingSkeleton";
import PageTransition from "@/components/PageTransition";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const BANNERS = [
  { title: "Introducing bill payment with crypto.", sub: "Join the waitlist now", emoji: "🪙" },
  { title: "Refer a friend, earn $10 in BTC.", sub: "Share your code today", emoji: "🎁" },
  { title: "Trade with zero fees this week.", sub: "Limited time offer", emoji: "🔥" },
];

function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    if (from === to) return;
    const duration = 600;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    prev.current = to;
  }, [value]);

  return <>{prefix}{display.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [wallet, setWallet] = useState(store.getWallet());
  const visibleCoins = store.getVisibleCoins();
  const [refreshing, setRefreshing] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerAction, setPickerAction] = useState<"deposit" | "withdraw">("deposit");
  const [pickerSearch, setPickerSearch] = useState("");
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setWallet(store.getWallet());
      setRefreshing(false);
    }, 1200);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (dy > 80 && !refreshing && containerRef.current?.scrollTop === 0) {
      handleRefresh();
    }
  };

  const openPicker = (action: "deposit" | "withdraw") => {
    setPickerAction(action);
    setPickerSearch("");
    setPickerOpen(true);
  };

  const handlePickerSelect = (coinId: CoinId) => {
    setPickerOpen(false);
    if (pickerAction === "deposit") navigate(`/receive/${coinId}`);
    else navigate(`/withdraw/${coinId}`);
  };

  const pickerCoins = COINS.filter(c =>
    c.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
    c.id.toLowerCase().includes(pickerSearch.toLowerCase())
  );

  if (loading) return <DashboardSkeleton />;

  let totalUsd = 0;
  COINS.forEach((c) => { totalUsd += coinToUsd(c.id, wallet[c.id] || 0); });

  const ngnCoin = COINS.find(c => c.id === "NGN")!;
  const otherCoins = COINS.filter(c => c.id !== "NGN" && visibleCoins.includes(c.id));
  const displayCoins = [ngnCoin, ...otherCoins];

  const banner = BANNERS[bannerIdx];

  return (
    <PageTransition>
      <div
        ref={containerRef}
        className="space-y-6 pt-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull to refresh indicator */}
        {refreshing && (
          <div className="flex justify-center -mt-2 mb-2">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}

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
          <p className="text-4xl font-bold tracking-tight">
            <AnimatedNumber value={totalUsd} prefix="$" />
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            NGN <AnimatedNumber value={usdToNgn(totalUsd)} />
            <span className="text-success ml-2">↑ +0.98%</span>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4">
          {[
            { icon: Plus, label: "Buy", to: "/buy" },
            { icon: Minus, label: "Sell", to: "/sell" },
            { icon: ArrowDown, label: "Deposit", action: "deposit" as const },
            { icon: ArrowUp, label: "Withdraw", action: "withdraw" as const },
            { icon: Gift, label: "Earn", to: "/referral", accent: true },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => {
                if (a.action) openPicker(a.action);
                else if (a.to) navigate(a.to);
              }}
              className="flex flex-col items-center gap-2"
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${a.accent ? "bg-destructive/80" : "bg-secondary"}`}>
                <a.icon size={22} className={a.accent ? "text-destructive-foreground" : "text-foreground"} />
              </div>
              <span className="text-[11px] text-muted-foreground">{a.label}</span>
            </button>
          ))}
        </div>

        {/* Promo Banner Slider */}
        <div className="relative overflow-hidden rounded-2xl bg-secondary p-4">
          <div className="flex items-center justify-between transition-all duration-500">
            <div>
              <p className="text-sm font-medium">{banner.title}</p>
              <p className="text-xs text-muted-foreground">{banner.sub}</p>
            </div>
            <span className="text-3xl">{banner.emoji}</span>
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {BANNERS.map((_, i) => (
              <button key={i} onClick={() => setBannerIdx(i)} className={`h-1.5 rounded-full transition-all ${i === bannerIdx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`} />
            ))}
          </div>
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
                      <span className="text-xs text-muted-foreground">{c.id === "NGN" ? "₦1.00" : formatUsd(c.marketPriceUsd)}</span>
                      <span className={`text-xs ${c.id === "BTC" ? "text-destructive" : "text-success"}`}>
                        {c.id === "NGN" ? "" : c.id === "BTC" ? "-1.33%" : "+3.09%"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{c.id === "NGN" ? formatNgn(qty) : formatCoin(qty, 7)}</p>
                  <p className="text-xs text-muted-foreground">{c.id === "NGN" ? "" : formatUsd(usd)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asset Picker for Deposit/Withdraw */}
      <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-8 pt-6 max-h-[85vh] overflow-y-auto [&>button]:hidden">
          <SheetHeader className="flex flex-row items-center justify-between mb-4">
            <SheetTitle className="text-xl font-bold">
              {pickerAction === "deposit" ? "Deposit to" : "Withdraw from"}
            </SheetTitle>
            <button onClick={() => setPickerOpen(false)} className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
              <X size={16} />
            </button>
          </SheetHeader>

          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search...."
              value={pickerSearch}
              onChange={(e) => setPickerSearch(e.target.value)}
              className="pl-10 bg-secondary border-0 rounded-xl h-12"
            />
          </div>

          <div className="space-y-1">
            {pickerCoins.map((c) => {
              const qty = wallet[c.id] || 0;
              const usd = coinToUsd(c.id, qty);
              return (
                <button
                  key={c.id}
                  onClick={() => handlePickerSelect(c.id)}
                  className="w-full flex items-center justify-between py-4 px-2 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CoinIcon coinId={c.id} />
                    <div className="text-left">
                      <span className="font-semibold text-sm">{c.id}</span>
                      <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded ml-2">{c.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{c.id === "NGN" ? formatNgn(qty) : formatCoin(qty, 7)}</p>
                    <p className="text-xs text-muted-foreground">{c.id === "NGN" ? "" : formatUsd(usd)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </PageTransition>
  );
}
