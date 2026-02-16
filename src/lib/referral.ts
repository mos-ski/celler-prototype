import { genId, formatNgn } from "./crypto";

// ─── Types ───────────────────────────────────────────────────────────
export type ReferralStatus = "signed_up" | "verified" | "traded";
export type WithdrawalStatus = "pending" | "approved" | "rejected";

export interface ReferralConfig {
  rewardAmountNgn: number;
  weeklyWithdrawLimitNgn: number;
}

export interface Referral {
  id: string;
  referredName: string;
  referredEmail: string;
  dateJoined: string;
  status: ReferralStatus;
  rewardUnlocked: boolean;
  rewardAmountNgn: number;
}

export interface WithdrawalRequest {
  id: string;
  amountNgn: number;
  dateRequested: string;
  status: WithdrawalStatus;
  dateResolved?: string;
}

// ─── Keys ────────────────────────────────────────────────────────────
const KEYS = {
  config: "cex_referral_config",
  referrals: "cex_referrals",
  withdrawals: "cex_referral_withdrawals",
};

// ─── Defaults ────────────────────────────────────────────────────────
const DEFAULT_CONFIG: ReferralConfig = {
  rewardAmountNgn: 5000,
  weeklyWithdrawLimitNgn: 10000,
};

const MOCK_REFERRALS: Referral[] = [
  { id: "ref_1", referredName: "Adebayo Olamide", referredEmail: "ade***@gmail.com", dateJoined: "2025-01-15T10:00:00Z", status: "traded", rewardUnlocked: true, rewardAmountNgn: 5000 },
  { id: "ref_2", referredName: "Chioma Eze", referredEmail: "chi***@gmail.com", dateJoined: "2025-01-22T14:30:00Z", status: "traded", rewardUnlocked: true, rewardAmountNgn: 5000 },
  { id: "ref_3", referredName: "Fatima Bello", referredEmail: "fat***@yahoo.com", dateJoined: "2025-02-01T09:15:00Z", status: "verified", rewardUnlocked: false, rewardAmountNgn: 5000 },
  { id: "ref_4", referredName: "Emeka Nwosu", referredEmail: "eme***@gmail.com", dateJoined: "2025-02-05T16:45:00Z", status: "traded", rewardUnlocked: true, rewardAmountNgn: 5000 },
  { id: "ref_5", referredName: "Blessing Udo", referredEmail: "ble***@hotmail.com", dateJoined: "2025-02-08T11:20:00Z", status: "signed_up", rewardUnlocked: false, rewardAmountNgn: 5000 },
  { id: "ref_6", referredName: "Tunde Ajayi", referredEmail: "tun***@gmail.com", dateJoined: "2025-02-10T08:00:00Z", status: "verified", rewardUnlocked: false, rewardAmountNgn: 5000 },
];

const MOCK_WITHDRAWALS: WithdrawalRequest[] = [
  { id: "wd_1", amountNgn: 5000, dateRequested: "2025-01-28T12:00:00Z", status: "approved", dateResolved: "2025-01-29T10:00:00Z" },
  { id: "wd_2", amountNgn: 5000, dateRequested: "2025-02-06T15:00:00Z", status: "pending" },
];

// ─── Helpers ─────────────────────────────────────────────────────────
function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// ─── Store ───────────────────────────────────────────────────────────
export const referralStore = {
  getConfig: (): ReferralConfig => readJson(KEYS.config, DEFAULT_CONFIG),
  setConfig: (c: ReferralConfig) => localStorage.setItem(KEYS.config, JSON.stringify(c)),

  getReferrals: (): Referral[] => readJson(KEYS.referrals, MOCK_REFERRALS),
  setReferrals: (r: Referral[]) => localStorage.setItem(KEYS.referrals, JSON.stringify(r)),

  getWithdrawals: (): WithdrawalRequest[] => readJson(KEYS.withdrawals, MOCK_WITHDRAWALS),
  setWithdrawals: (w: WithdrawalRequest[]) => localStorage.setItem(KEYS.withdrawals, JSON.stringify(w)),

  addWithdrawal: (amountNgn: number) => {
    const list = referralStore.getWithdrawals();
    list.unshift({
      id: "wd_" + genId(),
      amountNgn,
      dateRequested: new Date().toISOString(),
      status: "pending",
    });
    referralStore.setWithdrawals(list);
  },

  // Computed helpers
  getTotalEarned: (): number => {
    return referralStore.getReferrals()
      .filter(r => r.rewardUnlocked)
      .reduce((sum, r) => sum + r.rewardAmountNgn, 0);
  },

  getTotalWithdrawnApproved: (): number => {
    return referralStore.getWithdrawals()
      .filter(w => w.status === "approved")
      .reduce((sum, w) => sum + w.amountNgn, 0);
  },

  getTotalPending: (): number => {
    return referralStore.getWithdrawals()
      .filter(w => w.status === "pending")
      .reduce((sum, w) => sum + w.amountNgn, 0);
  },

  getAvailableBalance: (): number => {
    const earned = referralStore.getTotalEarned();
    const withdrawn = referralStore.getTotalWithdrawnApproved();
    const pending = referralStore.getTotalPending();
    return Math.max(0, earned - withdrawn - pending);
  },

  getWithdrawnThisWeek: (): number => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);

    return referralStore.getWithdrawals()
      .filter(w => (w.status === "approved" || w.status === "pending") && new Date(w.dateRequested) >= weekStart)
      .reduce((sum, w) => sum + w.amountNgn, 0);
  },

  getWeeklyRemaining: (): number => {
    const config = referralStore.getConfig();
    return Math.max(0, config.weeklyWithdrawLimitNgn - referralStore.getWithdrawnThisWeek());
  },
};

export const statusLabel = (s: ReferralStatus): string => {
  switch (s) {
    case "signed_up": return "Signed Up";
    case "verified": return "Verified";
    case "traded": return "Traded";
  }
};

export const statusColor = (s: ReferralStatus): string => {
  switch (s) {
    case "signed_up": return "bg-muted text-muted-foreground";
    case "verified": return "bg-blue-500/10 text-blue-500";
    case "traded": return "bg-green-500/10 text-green-500";
  }
};

export const withdrawalStatusColor = (s: WithdrawalStatus): string => {
  switch (s) {
    case "pending": return "bg-yellow-500/10 text-yellow-500";
    case "approved": return "bg-green-500/10 text-green-500";
    case "rejected": return "bg-red-500/10 text-red-500";
  }
};
