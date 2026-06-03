import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Gift, Trophy, Share2, Sparkles, Users, X } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { COUNTRIES, MILESTONES, type WorldcupCountry } from "@/data/worldcupData";
import { worldcup, BONUS_LABELS } from "@/lib/worldcup";
import { formatNgn } from "@/lib/crypto";
import { cn } from "@/lib/utils";

const rarityClass: Record<WorldcupCountry["rarity"], string> = {
  common: "from-slate-500 to-slate-700",
  rare: "from-blue-500 to-indigo-700",
  epic: "from-purple-500 to-fuchsia-700",
  legendary: "from-amber-400 to-orange-600",
};

const rarityRing: Record<WorldcupCountry["rarity"], string> = {
  common: "ring-slate-400/40",
  rare: "ring-blue-400/60",
  epic: "ring-purple-400/70",
  legendary: "ring-amber-400/80",
};

function CountryTile({ country, collected }: { country: WorldcupCountry; collected: boolean }) {
  if (!collected) {
    return (
      <div className="aspect-[3/4] rounded-xl bg-secondary/60 border border-dashed border-border/60 flex items-center justify-center">
        <span className="text-2xl text-muted-foreground/50">?</span>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "aspect-[3/4] rounded-xl bg-gradient-to-br p-2 flex flex-col items-center justify-center text-white shadow-lg ring-2",
        rarityClass[country.rarity],
        rarityRing[country.rarity],
      )}
    >
      <span className="text-3xl">{country.flag}</span>
      <span className="text-[10px] font-bold mt-1 text-center leading-tight">{country.name}</span>
    </div>
  );
}

export default function Worldcup() {
  const navigate = useNavigate();
  const [state, setState] = useState(worldcup.get());
  const [reveal, setReveal] = useState<{ codes: string[]; reason: string; index: number; flipped: boolean[] } | null>(null);
  const [milestoneOverlay, setMilestoneOverlay] = useState<(typeof MILESTONES)[number] | null>(null);

  useEffect(() => {
    const onChange = () => setState(worldcup.get());
    window.addEventListener("worldcup-changed", onChange);
    return () => window.removeEventListener("worldcup-changed", onChange);
  }, []);

  const collectedSet = useMemo(() => new Set(state.collected), [state.collected]);
  const progress = state.collected.length;
  const dailyAvailable = worldcup.isDailyAvailable();
  const nextPending = state.pending[0];

  const nextMilestone = MILESTONES.find((m) => progress < m.threshold);

  const handleEnvelope = () => {
    let pullId = nextPending?.id;
    if (!pullId && dailyAvailable) {
      const p = worldcup.queueDaily();
      pullId = p?.id;
    }
    if (!pullId) return;
    const result = worldcup.openPull(pullId);
    if (!result) return;
    if (result.revealed.length === 0) {
      toast("All available cards already collected.", { description: "Refer a friend to unlock the final card." });
      return;
    }
    setReveal({
      codes: result.revealed,
      reason: BONUS_LABELS[result.pull.reason],
      index: 0,
      flipped: result.revealed.map(() => false),
    });
  };

  const closeReveal = () => {
    setReveal(null);
    // After reveal, check milestones
    const pending = worldcup.pendingMilestones();
    if (pending.length > 0) {
      const m = pending[0];
      worldcup.claimMilestone(m.threshold);
      setMilestoneOverlay(m);
    }
  };

  const handleFlip = (i: number) => {
    if (!reveal) return;
    const next = [...reveal.flipped];
    next[i] = true;
    setReveal({ ...reveal, flipped: next });
  };

  const handleReferral = () => {
    if (worldcup.simulateReferral()) {
      toast.success("Friend referred & verified!", { description: "Final card unlocked. Tap your envelope to reveal." });
    } else if (state.collected.length < 31) {
      toast("Get to 31/32 first", { description: "The referral unlock activates at 31 cards." });
    } else {
      toast("Already unlocked");
    }
  };

  return (
    <PageTransition>
      <div className="space-y-5 pt-2 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-lg font-bold">Worldcup Drop</h1>
              <p className="text-[11px] text-muted-foreground">Collect all 32 country cards</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-500">
            <Flame size={14} />
            <span className="text-xs font-bold">{state.streak}</span>
          </div>
        </div>

        {/* Envelope hero */}
        <div className="rounded-3xl bg-gradient-to-br from-primary/15 via-purple-500/10 to-amber-500/10 p-6 text-center">
          <button
            onClick={handleEnvelope}
            disabled={!nextPending && !dailyAvailable}
            className={cn(
              "mx-auto block transition-transform",
              (nextPending || dailyAvailable) ? "active:scale-95 hover:scale-105 animate-pulse" : "opacity-50",
            )}
            aria-label="Open envelope"
          >
            <svg viewBox="0 0 120 90" className="w-32 h-24 mx-auto drop-shadow-xl">
              <rect x="5" y="15" width="110" height="70" rx="6" fill="hsl(var(--primary))" />
              <polygon points="5,15 60,55 115,15" fill="hsl(var(--primary) / 0.7)" stroke="hsl(var(--background))" strokeWidth="1.5" />
              <polygon points="5,85 45,50 75,50 115,85" fill="hsl(var(--primary) / 0.85)" />
              <circle cx="60" cy="50" r="10" fill="hsl(var(--background))" />
              <text x="60" y="55" textAnchor="middle" fontSize="13" fontWeight="bold" fill="hsl(var(--primary))">★</text>
            </svg>
          </button>
          <p className="mt-3 text-sm font-semibold">
            {nextPending
              ? BONUS_LABELS[nextPending.reason] + " ready"
              : dailyAvailable
                ? "Today's drop is waiting"
                : "Come back tomorrow at 8 a.m."}
          </p>
          {state.pending.length > 1 && (
            <p className="text-xs text-muted-foreground mt-0.5">+{state.pending.length - 1} more envelope{state.pending.length > 2 ? "s" : ""} queued</p>
          )}
        </div>

        {/* Progress + next milestone */}
        <div className="rounded-2xl border border-border/40 p-4 space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-muted-foreground">The Wall</p>
              <p className="text-2xl font-bold">{progress}<span className="text-muted-foreground text-base">/32</span></p>
            </div>
            {nextMilestone && (
              <div className="text-right">
                <p className="text-[11px] text-muted-foreground">Next milestone</p>
                <p className="text-xs font-semibold">{nextMilestone.threshold} cards · {nextMilestone.rewardNgn > 0 ? formatNgn(nextMilestone.rewardNgn) : nextMilestone.drawEntry}</p>
              </div>
            )}
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-amber-500 transition-all"
              style={{ width: `${(progress / 32) * 100}%` }}
            />
          </div>
          <div className="flex justify-between">
            {MILESTONES.map((m) => (
              <div key={m.threshold} className="flex flex-col items-center gap-0.5">
                <div className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                  progress >= m.threshold
                    ? "bg-gradient-to-br from-amber-400 to-orange-600 text-white"
                    : "bg-secondary text-muted-foreground",
                )}>
                  {progress >= m.threshold ? "✓" : m.threshold}
                </div>
                <span className="text-[9px] text-muted-foreground">{m.label.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Wall — 32 grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold">The Wall</h2>
            <button
              onClick={() => toast.success("Wall shared")}
              className="flex items-center gap-1 text-xs text-muted-foreground"
            >
              <Share2 size={12} /> Share
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {COUNTRIES.map((c) => (
              <CountryTile key={c.code} country={c} collected={collectedSet.has(c.code)} />
            ))}
          </div>
        </div>

        {/* Bonus ways */}
        <div className="rounded-2xl bg-secondary/50 p-4 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-amber-500" />
            <p className="text-sm font-semibold">Earn bonus cards</p>
          </div>
          {[
            { label: "Pay a bill", cards: 1, to: "/bills" },
            { label: "Sell a gift card", cards: 2, to: "/giftcards" },
            { label: "Buy / sell crypto", cards: 3, to: "/swap" },
            { label: "Top up wallet ₦20,000+", cards: 1, to: "/dashboard" },
          ].map((b) => (
            <button
              key={b.label}
              onClick={() => navigate(b.to)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <span className="text-sm">{b.label}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">+{b.cards}</span>
            </button>
          ))}
        </div>

        {/* Referral unlock card (visible from 28+) */}
        {progress >= 28 && progress < 32 && (
          <div className="rounded-2xl bg-gradient-to-br from-rose-500/10 to-amber-500/10 border border-amber-500/30 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-amber-500" />
              <p className="text-sm font-semibold">Referral unlock</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {progress >= 31
                ? "You're one card away. Refer a friend who completes KYC and a transaction to unlock the final card and the ₦1.5M grand prize draw entry."
                : `Get to 31 of 32 cards to activate the referral unlock for the final card.`}
            </p>
            <Button
              onClick={handleReferral}
              disabled={progress < 31}
              className="w-full h-10 rounded-xl"
            >
              {progress >= 31 ? "Simulate referral completion" : `${31 - progress} card${31 - progress === 1 ? "" : "s"} to go`}
            </Button>
          </div>
        )}

        {progress === 32 && (
          <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white p-5 text-center space-y-1">
            <Trophy className="mx-auto" />
            <p className="font-bold">Champion Collector</p>
            <p className="text-xs opacity-90">You're entered into the ₦1.5M grand prize draw. Champion cards reveal after the final.</p>
          </div>
        )}

        {/* Dev: reset for testing */}
        <button
          onClick={() => { worldcup.reset(); toast("Drop reset"); }}
          className="w-full text-[10px] text-muted-foreground/60 underline pt-4"
        >
          Reset drop (dev)
        </button>
      </div>

      {/* Reveal dialog */}
      <Dialog open={!!reveal} onOpenChange={(o) => { if (!o) closeReveal(); }}>
        <DialogContent className="max-w-sm bg-background border-0 p-0 overflow-hidden [&>button]:hidden">
          {reveal && (() => {
            const code = reveal.codes[reveal.index];
            const country = COUNTRIES.find((c) => c.code === code)!;
            const flipped = reveal.flipped[reveal.index];
            const isLast = reveal.index === reveal.codes.length - 1;
            return (
              <div className="bg-gradient-to-br from-primary/20 via-background to-amber-500/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{reveal.reason}</p>
                    <p className="text-xs">Card {reveal.index + 1} of {reveal.codes.length}</p>
                  </div>
                  <button onClick={closeReveal} className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <X size={14} />
                  </button>
                </div>

                <div
                  className="mx-auto cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onClick={() => !flipped && handleFlip(reveal.index)}
                >
                  <div
                    className="relative w-48 h-64 mx-auto transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* back of card */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center shadow-2xl"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="text-center text-white">
                        <Gift size={32} className="mx-auto mb-2" />
                        <p className="text-xs font-bold tracking-widest">TAP TO REVEAL</p>
                      </div>
                    </div>
                    {/* face of card */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl bg-gradient-to-br p-4 flex flex-col items-center justify-center text-white shadow-2xl ring-4",
                        rarityClass[country.rarity],
                        rarityRing[country.rarity],
                      )}
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <span className="text-6xl">{country.flag}</span>
                      <span className="text-base font-bold mt-3 text-center">{country.name}</span>
                      <span className="text-[10px] uppercase tracking-widest mt-1 opacity-80">{country.rarity}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 h-11 rounded-xl"
                  disabled={!flipped}
                  onClick={() => {
                    if (isLast) closeReveal();
                    else setReveal({ ...reveal, index: reveal.index + 1 });
                  }}
                >
                  {!flipped ? "Tap the card to reveal" : isLast ? "Add to The Wall" : "Next card"}
                </Button>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Milestone overlay */}
      <Dialog open={!!milestoneOverlay} onOpenChange={(o) => { if (!o) setMilestoneOverlay(null); }}>
        <DialogContent className="max-w-sm border-0 p-0 overflow-hidden [&>button]:hidden">
          {milestoneOverlay && (
            <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 text-white p-8 text-center">
              <Trophy size={56} className="mx-auto drop-shadow-lg" />
              <p className="text-xs uppercase tracking-widest mt-3 opacity-90">Milestone unlocked</p>
              <p className="text-2xl font-bold mt-1">{milestoneOverlay.label}</p>
              {milestoneOverlay.badge && (
                <p className="text-xs mt-1 opacity-90">+ "{milestoneOverlay.badge}" badge</p>
              )}
              {milestoneOverlay.rewardNgn > 0 && (
                <div className="mt-5 rounded-2xl bg-white/15 backdrop-blur p-3">
                  <p className="text-[11px] uppercase tracking-wider opacity-80">Wallet credited</p>
                  <p className="text-xl font-bold">{formatNgn(milestoneOverlay.rewardNgn)}</p>
                </div>
              )}
              {milestoneOverlay.drawEntry && (
                <div className="mt-3 rounded-2xl bg-white/15 backdrop-blur p-3">
                  <p className="text-[11px] uppercase tracking-wider opacity-80">Draw entry</p>
                  <p className="text-sm font-bold">{milestoneOverlay.drawEntry}</p>
                </div>
              )}
              <Button
                onClick={() => setMilestoneOverlay(null)}
                className="w-full mt-6 h-11 rounded-xl bg-white text-orange-600 hover:bg-white/90"
              >
                Continue
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}