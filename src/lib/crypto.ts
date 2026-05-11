// ─── Types ───────────────────────────────────────────────────────────
export type CoinId = "BTC" | "ETH" | "USDT" | "BNB" | "SOL" | "TRX" | "USDC" | "NGN";

export interface Coin {
  id: CoinId;
  name: string;
  icon: string;
  color: string;
  marketPriceUsd: number;
}

export type TxType = "buy" | "sell" | "swap" | "deposit" | "withdraw" | "receive" | "send" | "bill" | "giftcard";

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
  status: "completed" | "pending" | "failed";
  address?: string;
  network?: string;
  hash?: string;
  fee?: number;
  description?: string;
}

export interface UserData {
  fullName: string;
  email: string;
  password: string;
  username?: string;
}

export interface WalletState {
  [key: string]: number;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isDefault: boolean;
}

export interface WalletBeneficiary {
  id: string;
  name: string;
  address: string;
  coinId: CoinId;
  network: string;
}

// ─── Constants ───────────────────────────────────────────────────────
export const NGN_RATE = 1410;

export const COINS: Coin[] = [
  { id: "BTC", name: "Bitcoin", icon: "₿", color: "#F7931A", marketPriceUsd: 95900.13 },
  { id: "ETH", name: "Ethereum", icon: "Ξ", color: "#627EEA", marketPriceUsd: 2620.51 },
  { id: "USDT", name: "Tether", icon: "₮", color: "#26A17B", marketPriceUsd: 1 },
  { id: "BNB", name: "BNB Smartchain", icon: "◆", color: "#F3BA2F", marketPriceUsd: 640.14 },
  { id: "SOL", name: "Solana", icon: "◎", color: "#00FFA3", marketPriceUsd: 192.00 },
  { id: "TRX", name: "Tron", icon: "⬡", color: "#FF0013", marketPriceUsd: 0.30 },
  { id: "USDC", name: "USD Coin", icon: "$", color: "#2775CA", marketPriceUsd: 1 },
  { id: "NGN", name: "Nigerian Naira", icon: "₦", color: "#008751", marketPriceUsd: 0.00066 },
];

export const getCoin = (id: CoinId) => {
  const coin = COINS.find((c) => c.id === id);
  if (!coin) throw new Error(`Coin ${id} not found`);
  return coin;
};

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
  visibleCoins: "cex_visible_coins",
  banks: "cex_banks",
  beneficiaries: "cex_beneficiaries",
};

const DEFAULT_WALLET: WalletState = {
  BTC: 0.005,
  ETH: 0.15,
  USDT: 250,
  BNB: 1.2,
  SOL: 5,
  TRX: 1000,
  USDC: 100,
  NGN: 50000,
};

const DEFAULT_VISIBLE_COINS: CoinId[] = ["BTC", "ETH", "USDT", "BNB", "SOL"];

const DEFAULT_BANKS: BankAccount[] = [
  { id: "1", bankName: "Access Bank", accountNumber: "****6789", accountName: "Jonathan Tumise", isDefault: true },
  { id: "2", bankName: "Access Bank", accountNumber: "****6789", accountName: "Jonathan Tumise", isDefault: false },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "txn_001", type: "buy", coin: "BTC", quantity: 1.9754, usdValue: 2765.89, ngnValue: 3899508, date: "2024-08-03T10:15:00Z", status: "completed", network: "Bitcoin Network", hash: "0x9s8r7q6p5o4n3m", fee: 0.5 },
  { id: "txn_002", type: "sell", coin: "USDT", quantity: 1.9754, usdValue: 2765.89, ngnValue: 3899508, date: "2024-08-03T11:30:00Z", status: "completed", network: "Ethereum Network", hash: "0x9s8r7q6p5o4n3m", fee: 0.5 },
  { id: "txn_003", type: "deposit", coin: "NGN", quantity: 1.9754, usdValue: 2765.89, ngnValue: 3899508, date: "2024-08-03T12:18:42Z", status: "completed", network: "Bank Transfer", hash: "0x9s8r7q6p5o4n3m", fee: 0 },
  { id: "txn_004", type: "receive", coin: "BTC", quantity: 1.9754, usdValue: 2765.89, ngnValue: 3899508, date: "2024-08-03T14:00:00Z", status: "completed", network: "Bitcoin Network", hash: "0x9s8r7q6p5o4n3m", fee: 0 },
  { id: "txn_005", type: "send", coin: "BTC", quantity: 1.9754, usdValue: 2765.89, ngnValue: 3899508, date: "2024-08-03T15:00:00Z", status: "completed", network: "Bitcoin Network", hash: "0x9s8r7q6p5o4n3m", fee: 0.5 },
  { id: "txn_006", type: "buy", coin: "BTC", quantity: 1.9754, usdValue: 2765.89, ngnValue: 3899508, date: "2024-08-03T16:00:00Z", status: "completed", network: "Bitcoin Network", hash: "0x9s8r7q6p5o4n3m", fee: 0.5 },
  { id: "txn_007", type: "receive", coin: "USDT", quantity: 1.9754, usdValue: 2765.89, ngnValue: 3899508, date: "2024-08-03T17:00:00Z", status: "completed", network: "Ethereum Network", hash: "0x9s8r7q6p5o4n3m", fee: 0 },
  { id: "txn_008", type: "receive", coin: "USDT", quantity: 1.9754, usdValue: 2765.89, ngnValue: 3899508, date: "2024-08-03T18:00:00Z", status: "completed", network: "Ethereum Network", hash: "0x9s8r7q6p5o4n3m", fee: 0 },
];

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

  getTransactions: (): Transaction[] => readJson(KEYS.transactions, MOCK_TRANSACTIONS),
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

  getVisibleCoins: (): CoinId[] => readJson(KEYS.visibleCoins, DEFAULT_VISIBLE_COINS),
  setVisibleCoins: (coins: CoinId[]) => localStorage.setItem(KEYS.visibleCoins, JSON.stringify(coins)),

  getBanks: (): BankAccount[] => readJson(KEYS.banks, DEFAULT_BANKS),
  setBanks: (banks: BankAccount[]) => localStorage.setItem(KEYS.banks, JSON.stringify(banks)),
  addBank: (bank: BankAccount) => {
    const list = store.getBanks();
    list.push(bank);
    store.setBanks(list);
  },
  removeBank: (id: string) => {
    store.setBanks(store.getBanks().filter(b => b.id !== id));
  },

  getBeneficiaries: (): WalletBeneficiary[] => readJson(KEYS.beneficiaries, []),
  addBeneficiary: (b: WalletBeneficiary) => {
    const list = store.getBeneficiaries();
    list.push(b);
    localStorage.setItem(KEYS.beneficiaries, JSON.stringify(list));
  },
};

export const genId = () => Math.random().toString(36).slice(2, 10);

export const getTxLabel = (tx: Transaction): string => {
  switch (tx.type) {
    case "buy": return `Buy ${tx.coin} to Naira`;
    case "sell": return `Sell ${tx.coin} to Naira`;
    case "swap": return `${tx.fromCoin} → ${tx.toCoin}`;
    case "deposit": return `Deposit Naira from Bank`;
    case "withdraw": return `Withdraw ${tx.coin}`;
    case "receive": return `Receive ${tx.coin} to Wallet`;
    case "send": return `Send ${tx.coin} to Wallet`;
    case "bill": return tx.description || "Bill Payment";
    case "giftcard": return tx.description || "Gift Card Purchase";
    default: return tx.type;
  }
};

export const getTxIcon = (tx: Transaction): "arrow-up-right" | "arrow-down-left" | "arrow-left" | "arrow-down" => {
  switch (tx.type) {
    case "buy": return "arrow-up-right";
    case "sell": return "arrow-left";
    case "send": return "arrow-up-right";
    case "withdraw": return "arrow-up-right";
    case "receive": return "arrow-down-left";
    case "deposit": return "arrow-down";
    case "swap": return "arrow-up-right";
    case "bill": return "arrow-up-right";
    case "giftcard": return "arrow-up-right";
    default: return "arrow-up-right";
  }
};
