export interface Deal {
  id: string;
  category: "airtime" | "data";
  provider: string;
  description: string;
  originalPrice: number;
  dealPrice: number;
  value: string;
  prefillAmount?: number;  // for airtime deals — prefills the amount field
  prefillPlanId?: string;  // for data deals — pre-selects a plan
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
    prefillAmount: 800,
  },
  {
    id: "deal-2",
    category: "data",
    provider: "mtn",
    description: "MTN Data",
    originalPrice: 1500,
    dealPrice: 800,
    value: "2GB",
    prefillPlanId: "mtn-2gb",
  },
  {
    id: "deal-3",
    category: "airtime",
    provider: "airtel",
    description: "Airtel Airtime",
    originalPrice: 500,
    dealPrice: 400,
    value: "₦500",
    prefillAmount: 400,
  },
  {
    id: "deal-4",
    category: "data",
    provider: "glo",
    description: "Glo Data",
    originalPrice: 500,
    dealPrice: 350,
    value: "1GB",
    prefillPlanId: "glo-1gb",
  },
];
