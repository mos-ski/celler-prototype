import { COUNTRIES, MILESTONES, BONUS_CARDS, BONUS_LABELS, type BonusReason } from "@/data/worldcupData";
export type { BonusReason };
import { store, genId } from "@/lib/crypto";

const KEY = "cex_worldcup_v1";

export interface PendingPull {
  id: string;
  reason: BonusReason;
  cards: number; // how many cards this pull contains
  createdAt: string;
}

export interface WorldcupState {
  collected: string[]; // country codes (unique, in collection order)
  streak: number;
  lastDailyDate: string | null; // YYYY-MM-DD
  milestonesClaimed: number[]; // thresholds
  pending: PendingPull[]; // queue of unopened envelopes
  referralFinalUnlocked: boolean;
  streakBonusClaimed: number; // last streak count we awarded a bonus for
}

const DEFAULT: WorldcupState = {
  collected: [],
  streak: 0,
  lastDailyDate: null,
  milestonesClaimed: [],
  pending: [],
  referralFinalUnlocked: false,
  streakBonusClaimed: 0,
};

function read(): WorldcupState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT, ...parsed };
  } catch {
    return { ...DEFAULT };
  }
}

function write(s: WorldcupState) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("worldcup-changed"));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export const worldcup = {
  get: read,

  /** Returns true if a daily envelope is still available to claim today. */
  isDailyAvailable(): boolean {
    return read().lastDailyDate !== today();
  },

  /** Queue today's free daily pull. Idempotent per day. */
  queueDaily(): PendingPull | null {
    const s = read();
    if (s.lastDailyDate === today()) return null;
    // streak logic
    if (s.lastDailyDate === yesterday()) s.streak += 1;
    else s.streak = 1;
    s.lastDailyDate = today();
    const pull: PendingPull = {
      id: genId(),
      reason: "daily",
      cards: BONUS_CARDS.daily,
      createdAt: new Date().toISOString(),
    };
    s.pending.unshift(pull);
    // 7-day streak bonus
    if (s.streak > 0 && s.streak % 7 === 0 && s.streakBonusClaimed !== s.streak) {
      s.pending.unshift({
        id: genId(),
        reason: "streak",
        cards: BONUS_CARDS.streak,
        createdAt: new Date().toISOString(),
      });
      s.streakBonusClaimed = s.streak;
    }
    write(s);
    return pull;
  },

  /** Queue a bonus pull from a transaction. */
  awardBonus(reason: BonusReason): PendingPull {
    const s = read();
    const pull: PendingPull = {
      id: genId(),
      reason,
      cards: BONUS_CARDS[reason],
      createdAt: new Date().toISOString(),
    };
    s.pending.unshift(pull);
    write(s);
    return pull;
  },

  /** Open the given pull: draws `cards` random uncollected countries, removes pull from queue. */
  openPull(pullId: string): { pull: PendingPull; revealed: string[] } | null {
    const s = read();
    const idx = s.pending.findIndex((p) => p.id === pullId);
    if (idx === -1) return null;
    const pull = s.pending[idx];

    const remaining = COUNTRIES.filter((c) => !s.collected.includes(c.code));
    const revealed: string[] = [];

    // Block the final 32nd until referral unlocked
    const maxDrawable = s.referralFinalUnlocked ? 32 : 31;
    const collectedCount = s.collected.length;

    for (let i = 0; i < pull.cards; i++) {
      if (collectedCount + revealed.length >= maxDrawable) break;
      const pool = remaining.filter((c) => !revealed.includes(c.code));
      if (pool.length === 0) break;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      revealed.push(pick.code);
    }

    s.collected.push(...revealed);
    s.pending.splice(idx, 1);
    write(s);
    return { pull, revealed };
  },

  /** Returns milestones newly reached that haven't been claimed. */
  pendingMilestones() {
    const s = read();
    return MILESTONES.filter(
      (m) => s.collected.length >= m.threshold && !s.milestonesClaimed.includes(m.threshold)
    );
  },

  /** Claim a milestone reward: credits NGN wallet, records claim. */
  claimMilestone(threshold: number) {
    const s = read();
    const m = MILESTONES.find((x) => x.threshold === threshold);
    if (!m || s.milestonesClaimed.includes(threshold)) return null;
    s.milestonesClaimed.push(threshold);
    write(s);
    if (m.rewardNgn > 0) {
      store.updateWalletCoin("NGN", m.rewardNgn);
      store.addTransaction({
        id: genId(),
        type: "deposit",
        coin: "NGN",
        quantity: m.rewardNgn,
        usdValue: m.rewardNgn / 1410,
        ngnValue: m.rewardNgn,
        date: new Date().toISOString(),
        status: "completed",
        network: "Worldcup Drop",
        description: `Worldcup milestone — ${m.label}`,
      });
    }
    return m;
  },

  /** Simulate referral completion at 31/32. Unlocks the final card slot and grants a pull. */
  simulateReferral() {
    const s = read();
    if (s.collected.length < 31) return false;
    if (s.referralFinalUnlocked) return false;
    s.referralFinalUnlocked = true;
    s.pending.unshift({
      id: genId(),
      reason: "referral",
      cards: 1,
      createdAt: new Date().toISOString(),
    });
    write(s);
    return true;
  },

  reset() {
    write({ ...DEFAULT });
  },
};

export { BONUS_LABELS };