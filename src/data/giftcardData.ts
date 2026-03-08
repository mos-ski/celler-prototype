export interface GiftCardBrand {
  id: string;
  name: string;
  logo: string;
  category: string;
  denominations: number[];
  rates: { min: number; max: number; rate: number }[]; // tiered: % of face value
  currency: "USD" | "GBP" | "EUR" | "CAD";
}

export interface GiftCardOrder {
  id: string;
  brandId: string;
  brandName: string;
  amount: number;
  currency: string;
  ngnPayout: number;
  rate: number;
  status: "pending" | "approved" | "rejected";
  cardImage?: string;
  cardCode?: string;
  createdAt: string;
}

export const GIFT_CARD_BRANDS: GiftCardBrand[] = [
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
    category: "Shopping",
    denominations: [25, 50, 100, 200, 500],
    rates: [
      { min: 25, max: 100, rate: 70 },
      { min: 101, max: 200, rate: 73 },
      { min: 201, max: 500, rate: 75 },
    ],
    currency: "USD",
  },
  {
    id: "itunes",
    name: "iTunes/Apple",
    logo: "https://cdn.worldvectorlogo.com/logos/apple-14.svg",
    category: "Entertainment",
    denominations: [25, 50, 100, 200],
    rates: [
      { min: 25, max: 100, rate: 65 },
      { min: 101, max: 200, rate: 68 },
    ],
    currency: "USD",
  },
  {
    id: "google-play",
    name: "Google Play",
    logo: "https://cdn.worldvectorlogo.com/logos/google-play-5.svg",
    category: "Entertainment",
    denominations: [25, 50, 100, 200],
    rates: [
      { min: 25, max: 100, rate: 60 },
      { min: 101, max: 200, rate: 63 },
    ],
    currency: "USD",
  },
  {
    id: "steam",
    name: "Steam",
    logo: "https://cdn.worldvectorlogo.com/logos/steam-icon-logo.svg",
    category: "Gaming",
    denominations: [20, 50, 100],
    rates: [
      { min: 20, max: 50, rate: 60 },
      { min: 51, max: 100, rate: 63 },
    ],
    currency: "USD",
  },
  {
    id: "razer-gold",
    name: "Razer Gold",
    logo: "https://cdn.worldvectorlogo.com/logos/razer-2.svg",
    category: "Gaming",
    denominations: [25, 50, 100],
    rates: [
      { min: 25, max: 50, rate: 55 },
      { min: 51, max: 100, rate: 58 },
    ],
    currency: "USD",
  },
  {
    id: "playstation",
    name: "PlayStation",
    logo: "https://cdn.worldvectorlogo.com/logos/playstation-2.svg",
    category: "Gaming",
    denominations: [25, 50, 100],
    rates: [
      { min: 25, max: 50, rate: 58 },
      { min: 51, max: 100, rate: 62 },
    ],
    currency: "USD",
  },
  {
    id: "xbox",
    name: "Xbox",
    logo: "https://cdn.worldvectorlogo.com/logos/xbox-3.svg",
    category: "Gaming",
    denominations: [25, 50, 100],
    rates: [
      { min: 25, max: 50, rate: 58 },
      { min: 51, max: 100, rate: 62 },
    ],
    currency: "USD",
  },
  {
    id: "visa",
    name: "Visa Prepaid",
    logo: "https://cdn.worldvectorlogo.com/logos/visa-2.svg",
    category: "Prepaid",
    denominations: [50, 100, 200, 500],
    rates: [
      { min: 50, max: 200, rate: 72 },
      { min: 201, max: 500, rate: 75 },
    ],
    currency: "USD",
  },
];

export const GIFT_CARD_CATEGORIES = ["All", "Shopping", "Entertainment", "Gaming", "Prepaid"];

export function getRate(brand: GiftCardBrand, amount: number): number {
  for (const tier of brand.rates) {
    if (amount >= tier.min && amount <= tier.max) return tier.rate;
  }
  // fallback to last tier
  return brand.rates[brand.rates.length - 1]?.rate ?? 50;
}

export function calcNgnPayout(brand: GiftCardBrand, amount: number, ngnRate: number): number {
  const rate = getRate(brand, amount);
  return amount * (rate / 100) * ngnRate;
}

// localStorage store for gift card orders
const GC_ORDERS_KEY = "cex_giftcard_orders";

const MOCK_ORDERS: GiftCardOrder[] = [
  {
    id: "gc_001",
    brandId: "amazon",
    brandName: "Amazon",
    amount: 100,
    currency: "USD",
    ngnPayout: 98700,
    rate: 70,
    status: "approved",
    createdAt: "2024-08-01T10:00:00Z",
  },
  {
    id: "gc_002",
    brandId: "itunes",
    brandName: "iTunes/Apple",
    amount: 50,
    currency: "USD",
    ngnPayout: 45825,
    rate: 65,
    status: "pending",
    createdAt: "2024-08-03T14:00:00Z",
  },
];

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export const giftcardStore = {
  getOrders: (): GiftCardOrder[] => readJson(GC_ORDERS_KEY, MOCK_ORDERS),
  addOrder: (order: GiftCardOrder) => {
    const list = giftcardStore.getOrders();
    list.unshift(order);
    localStorage.setItem(GC_ORDERS_KEY, JSON.stringify(list));
  },
  updateOrderStatus: (id: string, status: GiftCardOrder["status"]) => {
    const list = giftcardStore.getOrders();
    const order = list.find((o) => o.id === id);
    if (order) order.status = status;
    localStorage.setItem(GC_ORDERS_KEY, JSON.stringify(list));
  },
};
