export interface Deal {
  id: string;
  category: "airtime" | "data";
  provider: string;
  description: string;
  originalPrice: number;
  dealPrice: number;
  value: string;
}

export const DEALS: Deal[] = [
  {
    id: "deal-1",
    category: "airtime",
    provider: "mtn",
    description: "MTN Airtime",
    originalPrice: 1000,
    dealPrice: 800,
    value: "₦1,000",
  },
  {
    id: "deal-2",
    category: "data",
    provider: "mtn",
    description: "MTN Data",
    originalPrice: 1000,
    dealPrice: 800,
    value: "2GB",
  },
  {
    id: "deal-3",
    category: "airtime",
    provider: "airtel",
    description: "Airtel Airtime",
    originalPrice: 500,
    dealPrice: 400,
    value: "₦500",
  },
  {
    id: "deal-4",
    category: "data",
    provider: "glo",
    description: "Glo Data",
    originalPrice: 500,
    dealPrice: 350,
    value: "1GB",
  },
];
