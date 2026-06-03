export interface WorldcupCountry {
  code: string;
  name: string;
  flag: string; // emoji flag
  rarity: "common" | "rare" | "epic" | "legendary";
}

// The 32 FIFA World Cup 2026 contenders (illustrative — fictional bracket)
export const COUNTRIES: WorldcupCountry[] = [
  { code: "ARG", name: "Argentina", flag: "🇦🇷", rarity: "legendary" },
  { code: "FRA", name: "France", flag: "🇫🇷", rarity: "legendary" },
  { code: "BRA", name: "Brazil", flag: "🇧🇷", rarity: "legendary" },
  { code: "ENG", name: "England", flag: "🇬🇧", rarity: "epic" },
  { code: "ESP", name: "Spain", flag: "🇪🇸", rarity: "epic" },
  { code: "GER", name: "Germany", flag: "🇩🇪", rarity: "epic" },
  { code: "POR", name: "Portugal", flag: "🇵🇹", rarity: "epic" },
  { code: "NED", name: "Netherlands", flag: "🇳🇱", rarity: "epic" },
  { code: "BEL", name: "Belgium", flag: "🇧🇪", rarity: "rare" },
  { code: "CRO", name: "Croatia", flag: "🇭🇷", rarity: "rare" },
  { code: "URU", name: "Uruguay", flag: "🇺🇾", rarity: "rare" },
  { code: "COL", name: "Colombia", flag: "🇨🇴", rarity: "rare" },
  { code: "MEX", name: "Mexico", flag: "🇲🇽", rarity: "rare" },
  { code: "USA", name: "United States", flag: "🇺🇸", rarity: "rare" },
  { code: "CAN", name: "Canada", flag: "🇨🇦", rarity: "rare" },
  { code: "JPN", name: "Japan", flag: "🇯🇵", rarity: "rare" },
  { code: "KOR", name: "South Korea", flag: "🇰🇷", rarity: "common" },
  { code: "AUS", name: "Australia", flag: "🇦🇺", rarity: "common" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳", rarity: "common" },
  { code: "MAR", name: "Morocco", flag: "🇲🇦", rarity: "rare" },
  { code: "NGA", name: "Nigeria", flag: "🇳🇬", rarity: "epic" },
  { code: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮", rarity: "common" },
  { code: "EGY", name: "Egypt", flag: "🇪🇬", rarity: "common" },
  { code: "GHA", name: "Ghana", flag: "🇬🇭", rarity: "common" },
  { code: "SUI", name: "Switzerland", flag: "🇨🇭", rarity: "common" },
  { code: "DEN", name: "Denmark", flag: "🇩🇰", rarity: "common" },
  { code: "POL", name: "Poland", flag: "🇵🇱", rarity: "common" },
  { code: "SRB", name: "Serbia", flag: "🇷🇸", rarity: "common" },
  { code: "ECU", name: "Ecuador", flag: "🇪🇨", rarity: "common" },
  { code: "CRC", name: "Costa Rica", flag: "🇨🇷", rarity: "common" },
  { code: "QAT", name: "Qatar", flag: "🇶🇦", rarity: "common" },
  { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦", rarity: "common" },
];

export interface Milestone {
  threshold: number;
  rewardNgn: number;
  label: string;
  badge?: string;
  drawEntry?: string;
}

export const MILESTONES: Milestone[] = [
  { threshold: 4, rewardNgn: 5000, label: "First Four", badge: "First Four" },
  { threshold: 16, rewardNgn: 15000, label: "Halfway", badge: "Halfway" },
  { threshold: 24, rewardNgn: 40000, label: "Final Stretch", drawEntry: "₦200k draw" },
  { threshold: 32, rewardNgn: 0, label: "Champion Collector", badge: "Champion Collector", drawEntry: "₦1.5M grand prize draw" },
];

export type BonusReason =
  | "daily"
  | "bill"
  | "giftcard"
  | "crypto"
  | "topup"
  | "streak"
  | "referral";

export const BONUS_CARDS: Record<BonusReason, number> = {
  daily: 1,
  bill: 1,
  giftcard: 2,
  crypto: 3,
  topup: 1,
  streak: 3,
  referral: 3,
};

export const BONUS_LABELS: Record<BonusReason, string> = {
  daily: "Daily drop",
  bill: "Bill payment bonus",
  giftcard: "Gift card bonus",
  crypto: "Crypto trade bonus",
  topup: "Wallet top-up bonus",
  streak: "7-day streak bonus",
  referral: "Referral bonus",
};