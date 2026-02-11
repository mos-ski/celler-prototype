// ─── Types ───────────────────────────────────────────────────────────
export type CoinId = "BTC" | "ETH" | "USDT" | "BNB" | "SOL";

export interface Coin {
  id: CoinId;
  name: string;
  icon: string;
  marketPriceUsd: number;
}

export type TxType = "buy" | "sell" | "swap";

export interface Transaction {
  id: string;
  type: TxType;
  fromCoin?: CoinId;
  toCoin?: CoinId;
  coin?: CoinId;
  quantity: number;
  toQuantity?: number;
  usdValue: number;
  ngnValue: number;
  date: string;
  status: "completed";
}

export interface UserData {
  fullName: string;
  email: string;
  password: string;
}

export interface WalletState {
  [key: string]: number;
}

// ─── Constants ───────────────────────────────────────────────────────
export const NGN_RATE = 1410;

export const COINS: Coin[] = [
  { id: "BTC", name: "Bitcoin", icon: "₿", marketPriceUsd: 67500 },
  { id: "ETH", name: "Ethereum", icon: "Ξ", marketPriceUsd: 3400 },
  { id: "USDT", name: "Tether", icon: "₮", marketPriceUsd: 1 },
  { id: "BNB", name: "BNB", icon: "◆", marketPriceUsd: 580 },
  { id: "SOL", name: "Solana", icon: "◎", marketPriceUsd: 145 },
];

export const getCoin = (id: CoinId) => COINS.find((c) => c.id === id)!;

// ─── Conversion helpers ─────────────────────────────────────────────
export const coinToUsd = (coinId: CoinId, qty: number) =>
  qty * getCoin(coinId).marketPriceUsd;

export const usdToNgn = (usd: number) => usd * NGN_RATE;
export const ngnToUsd = (ngn: number) => ngn / NGN_RATE;
export const usdToCoin = (coinId: CoinId, usd: number) =>
  usd / getCoin(coinId).marketPriceUsd;

export const formatUsd = (v: number) =>
  "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatNgn = (v: number) =>
  "₦" + v.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatCoin = (v: number, decimals = 8) =>
  v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: decimals });

// ─── localStorage store ──────────────────────────────────────────────
const KEYS = {
  user: "cex_user",
  wallet: "cex_wallet",
  transactions: "cex_transactions",
  loggedIn: "cex_logged_in",
};

const DEFAULT_WALLET: WalletState = {
  BTC: 0.005,
  ETH: 0.15,
  USDT: 250,
  BNB: 1.2,
  SOL: 5,
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export const store = {
  getUser: (): UserData | null => readJson(KEYS.user, null),
  setUser: (u: UserData) => localStorage.setItem(KEYS.user, JSON.stringify(u)),

  isLoggedIn: () => localStorage.getItem(KEYS.loggedIn) === "true",
  login: () => localStorage.setItem(KEYS.loggedIn, "true"),
  logout: () => localStorage.removeItem(KEYS.loggedIn),

  getWallet: (): WalletState => readJson(KEYS.wallet, DEFAULT_WALLET),
  setWallet: (w: WalletState) => localStorage.setItem(KEYS.wallet, JSON.stringify(w)),

  getTransactions: (): Transaction[] => readJson(KEYS.transactions, []),
  addTransaction: (tx: Transaction) => {
    const list = store.getTransactions();
    list.unshift(tx);
    localStorage.setItem(KEYS.transactions, JSON.stringify(list));
  },

  updateWalletCoin: (coinId: CoinId, delta: number) => {
    const w = store.getWallet();
    w[coinId] = Math.max(0, (w[coinId] || 0) + delta);
    store.setWallet(w);
  },
};

export const genId = () => Math.random().toString(36).slice(2, 10);
