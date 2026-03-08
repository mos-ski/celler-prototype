import { type CoinId, type Transaction, COINS, formatNgn, formatUsd, NGN_RATE } from "@/lib/crypto";

// ─── Admin User ──────────────────────────────────────────────────────
export const adminUser = {
  firstName: "Jonathan",
  lastName: "Tumise",
  email: "admin@celler.app",
  role: "Super Admin",
};

// ─── Dashboard Stats ─────────────────────────────────────────────────
export const dashboardStats = {
  totalPayoutNgn: 45_230_000,
  totalPayoutUsd: 32_078,
  totalRegisteredUsers: 2_341,
  totalVerifiedUsers: 876,
  totalActiveUsers: 312,
  activeUsersMonth: 89,
  totalTransactions: 5_186,
  totalVolume: 128_500,
};

export const sparklineData = {
  registeredUsers: [12, 15, 8, 22, 18, 30, 25, 14, 20, 28, 16, 24],
  activeUsers: [5, 8, 12, 6, 15, 10, 18, 9, 14, 11, 7, 12],
};

// ─── Revenue Chart (30 days) ─────────────────────────────────────────
export const revenueChartData = [
  { day: "Feb 7", revenue: 120 }, { day: "Feb 8", revenue: 85 }, { day: "Feb 9", revenue: 200 },
  { day: "Feb 10", revenue: 150 }, { day: "Feb 11", revenue: 310 }, { day: "Feb 12", revenue: 180 },
  { day: "Feb 13", revenue: 95 }, { day: "Feb 14", revenue: 220 }, { day: "Feb 15", revenue: 175 },
  { day: "Feb 16", revenue: 290 }, { day: "Feb 17", revenue: 140 }, { day: "Feb 18", revenue: 350 },
  { day: "Feb 19", revenue: 260 }, { day: "Feb 20", revenue: 190 }, { day: "Feb 21", revenue: 410 },
  { day: "Feb 22", revenue: 320 }, { day: "Feb 23", revenue: 180 }, { day: "Feb 24", revenue: 275 },
  { day: "Feb 25", revenue: 390 }, { day: "Feb 26", revenue: 450 }, { day: "Feb 27", revenue: 310 },
  { day: "Feb 28", revenue: 280 }, { day: "Mar 1", revenue: 360 }, { day: "Mar 2", revenue: 420 },
  { day: "Mar 3", revenue: 290 }, { day: "Mar 4", revenue: 380 }, { day: "Mar 5", revenue: 340 },
  { day: "Mar 6", revenue: 510 }, { day: "Mar 7", revenue: 245 }, { day: "Mar 8", revenue: 0 },
];

// ─── Admin Orders ────────────────────────────────────────────────────
export type AdminOrder = {
  id: string;
  coin: CoinId;
  type: "Buy" | "Sell" | "Swap" | "Deposit" | "Withdraw";
  amount: string;
  amountUsd: number;
  amountNgn: number;
  userName: string;
  userInitial: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
};

export const adminOrders: AdminOrder[] = [
  { id: "o1", coin: "BTC", type: "Buy", amount: "0.005210 BTC", amountUsd: 499.68, amountNgn: 704548, userName: "Adebayo Olamide", userInitial: "A", status: "Completed", date: "8 Mar 2026, 7:04 PM" },
  { id: "o2", coin: "USDT", type: "Sell", amount: "350.00 USDT", amountUsd: 350, amountNgn: 493500, userName: "Chioma Eze", userInitial: "C", status: "Completed", date: "8 Mar 2026, 6:56 PM" },
  { id: "o3", coin: "ETH", type: "Buy", amount: "0.150000 ETH", amountUsd: 393.08, amountNgn: 554234, userName: "Fatima Bello", userInitial: "F", status: "Completed", date: "8 Mar 2026, 6:43 PM" },
  { id: "o4", coin: "BNB", type: "Sell", amount: "1.200000 BNB", amountUsd: 768.17, amountNgn: 1083112, userName: "Emeka Nwosu", userInitial: "E", status: "Pending", date: "8 Mar 2026, 5:58 PM" },
  { id: "o5", coin: "SOL", type: "Buy", amount: "2.500000 SOL", amountUsd: 480, amountNgn: 676800, userName: "Blessing Udo", userInitial: "B", status: "Completed", date: "8 Mar 2026, 5:44 PM" },
  { id: "o6", coin: "BTC", type: "Swap", amount: "0.002500 BTC", amountUsd: 239.75, amountNgn: 338048, userName: "Tunde Ajayi", userInitial: "T", status: "Completed", date: "8 Mar 2026, 5:37 PM" },
  { id: "o7", coin: "USDT", type: "Deposit", amount: "500.00 USDT", amountUsd: 500, amountNgn: 705000, userName: "Kemi Adeyemi", userInitial: "K", status: "Completed", date: "8 Mar 2026, 4:20 PM" },
  { id: "o8", coin: "TRX", type: "Sell", amount: "5000.00 TRX", amountUsd: 1500, amountNgn: 2115000, userName: "Oluwaseun Bakare", userInitial: "O", status: "Completed", date: "8 Mar 2026, 3:15 PM" },
  { id: "o9", coin: "ETH", type: "Withdraw", amount: "0.080000 ETH", amountUsd: 209.64, amountNgn: 295592, userName: "Fatima Bello", userInitial: "F", status: "Failed", date: "8 Mar 2026, 2:10 PM" },
  { id: "o10", coin: "USDC", type: "Buy", amount: "200.00 USDC", amountUsd: 200, amountNgn: 282000, userName: "Chidinma Obi", userInitial: "C", status: "Completed", date: "8 Mar 2026, 1:05 PM" },
];

export const orderTabs = [
  { label: "All Orders", count: 5186 },
  { label: "Buy", count: 1842 },
  { label: "Sell", count: 2103 },
  { label: "Swap", count: 431 },
  { label: "Deposit", count: 612 },
  { label: "Withdraw", count: 198 },
];

// ─── Customers ───────────────────────────────────────────────────────
export type Customer = {
  id: string;
  sn: number;
  name: string;
  initial: string;
  email: string;
  phone: string;
  kycLevel: "None" | "Tier 1" | "Tier 2" | "Tier 3";
  kycStatus: "Pending" | "Verified" | "Rejected";
  status: "Active" | "Suspended" | "Inactive";
  dateJoined: string;
  lastLogin: string;
  totalTrades: number;
  totalVolumeNgn: number;
};

export const customers: Customer[] = [
  { id: "c1", sn: 1, name: "Adebayo Olamide", initial: "A", email: "ade***@gmail.com", phone: "0801***4567", kycLevel: "Tier 2", kycStatus: "Verified", status: "Active", dateJoined: "2025-01-15", lastLogin: "8 Mar 2026, 7:04 PM", totalTrades: 47, totalVolumeNgn: 2_345_000 },
  { id: "c2", sn: 2, name: "Chioma Eze", initial: "C", email: "chi***@gmail.com", phone: "0803***8901", kycLevel: "Tier 3", kycStatus: "Verified", status: "Active", dateJoined: "2025-01-22", lastLogin: "8 Mar 2026, 6:56 PM", totalTrades: 89, totalVolumeNgn: 8_900_000 },
  { id: "c3", sn: 3, name: "Fatima Bello", initial: "F", email: "fat***@yahoo.com", phone: "0805***2345", kycLevel: "Tier 1", kycStatus: "Verified", status: "Active", dateJoined: "2025-02-01", lastLogin: "8 Mar 2026, 5:30 PM", totalTrades: 12, totalVolumeNgn: 450_000 },
  { id: "c4", sn: 4, name: "Emeka Nwosu", initial: "E", email: "eme***@gmail.com", phone: "0806***6789", kycLevel: "Tier 2", kycStatus: "Verified", status: "Active", dateJoined: "2025-02-05", lastLogin: "8 Mar 2026, 4:20 PM", totalTrades: 34, totalVolumeNgn: 1_800_000 },
  { id: "c5", sn: 5, name: "Blessing Udo", initial: "B", email: "ble***@hotmail.com", phone: "0807***0123", kycLevel: "None", kycStatus: "Pending", status: "Active", dateJoined: "2025-02-08", lastLogin: "7 Mar 2026, 9:15 AM", totalTrades: 0, totalVolumeNgn: 0 },
  { id: "c6", sn: 6, name: "Tunde Ajayi", initial: "T", email: "tun***@gmail.com", phone: "0808***4567", kycLevel: "Tier 1", kycStatus: "Verified", status: "Active", dateJoined: "2025-02-10", lastLogin: "7 Mar 2026, 3:45 PM", totalTrades: 8, totalVolumeNgn: 320_000 },
  { id: "c7", sn: 7, name: "Kemi Adeyemi", initial: "K", email: "kem***@gmail.com", phone: "0809***8901", kycLevel: "Tier 2", kycStatus: "Verified", status: "Active", dateJoined: "2025-02-15", lastLogin: "8 Mar 2026, 1:30 PM", totalTrades: 23, totalVolumeNgn: 1_200_000 },
  { id: "c8", sn: 8, name: "Oluwaseun Bakare", initial: "O", email: "olu***@gmail.com", phone: "0810***2345", kycLevel: "Tier 3", kycStatus: "Verified", status: "Active", dateJoined: "2025-02-20", lastLogin: "8 Mar 2026, 12:00 PM", totalTrades: 156, totalVolumeNgn: 15_600_000 },
  { id: "c9", sn: 9, name: "Chidinma Obi", initial: "C", email: "chi***@outlook.com", phone: "0811***6789", kycLevel: "Tier 1", kycStatus: "Pending", status: "Active", dateJoined: "2025-03-01", lastLogin: "6 Mar 2026, 8:00 AM", totalTrades: 3, totalVolumeNgn: 95_000 },
  { id: "c10", sn: 10, name: "Ibrahim Musa", initial: "I", email: "ibr***@gmail.com", phone: "---", kycLevel: "None", kycStatus: "Pending", status: "Suspended", dateJoined: "2025-03-05", lastLogin: "5 Mar 2026, 11:00 AM", totalTrades: 0, totalVolumeNgn: 0 },
];

export const customerTabs = [
  { label: "All Customers", count: 2341 },
  { label: "Active", count: 876 },
  { label: "Inactive", count: 1442 },
  { label: "Suspended", count: 23 },
];

// ─── Coin Icons Map ──────────────────────────────────────────────────
export const coinIcons: Record<string, string> = {
  BTC: "₿", ETH: "Ξ", USDT: "₮", BNB: "◆", SOL: "◎", TRX: "⬡", USDC: "$", NGN: "₦",
};
