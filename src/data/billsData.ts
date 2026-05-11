import { Smartphone, Wifi, Zap, Tv, Trophy, type LucideIcon } from "lucide-react";

export type BillCategory = "airtime" | "data" | "electricity" | "tv" | "betting";

export interface BillProvider {
  id: string;
  name: string;
  logoUrl?: string;
  initials: string;
  color: string; // tailwind bg color class (fallback)
}

export interface DataPlan {
  id: string;
  name: string;
  amountNgn: number;
}

export interface TvPackage {
  id: string;
  name: string;
  amountNgn: number;
}

export const BILL_CATEGORIES: {
  id: BillCategory;
  label: string;
  icon: LucideIcon;
  description: string;
  accent: string; // tailwind bg/text classes for the icon tile
}[] = [
  { id: "airtime", label: "Airtime", icon: Smartphone, description: "Top up any phone number", accent: "bg-blue-500/10 text-blue-500" },
  { id: "data", label: "Data", icon: Wifi, description: "Buy mobile data bundles", accent: "bg-emerald-500/10 text-emerald-500" },
  { id: "electricity", label: "Electricity", icon: Zap, description: "Pay your electricity bill", accent: "bg-amber-500/10 text-amber-500" },
  { id: "tv", label: "TV", icon: Tv, description: "Renew your cable subscription", accent: "bg-purple-500/10 text-purple-500" },
  { id: "betting", label: "Betting", icon: Trophy, description: "Fund your betting wallet", accent: "bg-rose-500/10 text-rose-500" },
];

export const PROVIDERS: Record<BillCategory, BillProvider[]> = {
  airtime: [
    { id: "mtn", name: "MTN", logoUrl: "https://cdn.worldvectorlogo.com/logos/mtn-new-logo.svg", initials: "MTN", color: "bg-yellow-500" },
    { id: "glo", name: "Glo", logoUrl: "https://cdn.worldvectorlogo.com/logos/glo-1.svg", initials: "Glo", color: "bg-green-600" },
    { id: "airtel", name: "Airtel", logoUrl: "https://cdn.worldvectorlogo.com/logos/airtel-3.svg", initials: "Airtel", color: "bg-red-600" },
    { id: "9mobile", name: "9mobile", logoUrl: "https://cdn.worldvectorlogo.com/logos/9mobile.svg", initials: "9", color: "bg-emerald-700" },
  ],
  data: [
    { id: "mtn", name: "MTN", logoUrl: "https://cdn.worldvectorlogo.com/logos/mtn-new-logo.svg", initials: "MTN", color: "bg-yellow-500" },
    { id: "glo", name: "Glo", logoUrl: "https://cdn.worldvectorlogo.com/logos/glo-1.svg", initials: "Glo", color: "bg-green-600" },
    { id: "airtel", name: "Airtel", logoUrl: "https://cdn.worldvectorlogo.com/logos/airtel-3.svg", initials: "Airtel", color: "bg-red-600" },
    { id: "9mobile", name: "9mobile", logoUrl: "https://cdn.worldvectorlogo.com/logos/9mobile.svg", initials: "9", color: "bg-emerald-700" },
  ],
  electricity: [
    { id: "ekedc", name: "Eko Electric (EKEDC)", initials: "EK", color: "bg-blue-600" },
    { id: "ikedc", name: "Ikeja Electric (IKEDC)", initials: "IK", color: "bg-orange-600" },
    { id: "aedc", name: "Abuja Electric (AEDC)", initials: "AB", color: "bg-indigo-600" },
    { id: "phed", name: "Port Harcourt Electric", initials: "PH", color: "bg-cyan-600" },
    { id: "ibedc", name: "Ibadan Electric (IBEDC)", initials: "IB", color: "bg-amber-600" },
    { id: "kedco", name: "Kano Electric (KEDCO)", initials: "KN", color: "bg-rose-600" },
  ],
  tv: [
    { id: "dstv", name: "DStv", logoUrl: "https://cdn.worldvectorlogo.com/logos/dstv-1.svg", initials: "DStv", color: "bg-blue-700" },
    { id: "gotv", name: "GOtv", logoUrl: "https://cdn.worldvectorlogo.com/logos/gotv.svg", initials: "GO", color: "bg-green-700" },
    { id: "startimes", name: "Startimes", logoUrl: "https://cdn.worldvectorlogo.com/logos/startimes.svg", initials: "ST", color: "bg-orange-700" },
    { id: "showmax", name: "Showmax", logoUrl: "https://cdn.worldvectorlogo.com/logos/showmax.svg", initials: "SM", color: "bg-purple-700" },
  ],
  betting: [
    { id: "bet9ja", name: "Bet9ja", logoUrl: "https://cdn.worldvectorlogo.com/logos/bet9ja.svg", initials: "B9", color: "bg-green-600" },
    { id: "sportybet", name: "SportyBet", logoUrl: "https://cdn.worldvectorlogo.com/logos/sportybet.svg", initials: "SB", color: "bg-red-600" },
    { id: "1xbet", name: "1xBet", logoUrl: "https://cdn.worldvectorlogo.com/logos/1xbet-2.svg", initials: "1X", color: "bg-blue-700" },
    { id: "betking", name: "BetKing", logoUrl: "https://cdn.worldvectorlogo.com/logos/betking.svg", initials: "BK", color: "bg-yellow-600" },
    { id: "nairabet", name: "NairaBet", initials: "NB", color: "bg-emerald-700" },
    { id: "merrybet", name: "MerryBet", initials: "MB", color: "bg-orange-600" },
  ],
};

export const DATA_PLANS: Record<string, DataPlan[]> = {
  mtn: [
    { id: "mtn-1gb", name: "1GB - 1 Day", amountNgn: 350 },
    { id: "mtn-2gb", name: "2GB - 30 Days", amountNgn: 1500 },
    { id: "mtn-5gb", name: "5GB - 30 Days", amountNgn: 3000 },
    { id: "mtn-15gb", name: "15GB - 30 Days", amountNgn: 6500 },
    { id: "mtn-40gb", name: "40GB - 30 Days", amountNgn: 11000 },
  ],
  glo: [
    { id: "glo-1gb", name: "1.35GB - 14 Days", amountNgn: 500 },
    { id: "glo-3gb", name: "3.9GB - 30 Days", amountNgn: 1500 },
    { id: "glo-7gb", name: "7.5GB - 30 Days", amountNgn: 2500 },
    { id: "glo-13gb", name: "13.25GB - 30 Days", amountNgn: 4000 },
  ],
  airtel: [
    { id: "air-1gb", name: "1GB - 1 Day", amountNgn: 300 },
    { id: "air-2gb", name: "2GB - 30 Days", amountNgn: 1500 },
    { id: "air-6gb", name: "6GB - 30 Days", amountNgn: 2500 },
    { id: "air-15gb", name: "15GB - 30 Days", amountNgn: 6000 },
  ],
  "9mobile": [
    { id: "9-1gb", name: "1.5GB - 30 Days", amountNgn: 1000 },
    { id: "9-4gb", name: "4.5GB - 30 Days", amountNgn: 2000 },
    { id: "9-11gb", name: "11GB - 30 Days", amountNgn: 4000 },
  ],
};

export const TV_PACKAGES: Record<string, TvPackage[]> = {
  dstv: [
    { id: "dstv-padi", name: "DStv Padi", amountNgn: 4400 },
    { id: "dstv-yanga", name: "DStv Yanga", amountNgn: 6000 },
    { id: "dstv-confam", name: "DStv Confam", amountNgn: 11000 },
    { id: "dstv-compact", name: "DStv Compact", amountNgn: 19000 },
    { id: "dstv-premium", name: "DStv Premium", amountNgn: 44500 },
  ],
  gotv: [
    { id: "gotv-smallie", name: "GOtv Smallie", amountNgn: 1900 },
    { id: "gotv-jinja", name: "GOtv Jinja", amountNgn: 3300 },
    { id: "gotv-jolli", name: "GOtv Jolli", amountNgn: 4850 },
    { id: "gotv-max", name: "GOtv Max", amountNgn: 7200 },
    { id: "gotv-supa", name: "GOtv Supa", amountNgn: 9600 },
  ],
  startimes: [
    { id: "st-nova", name: "Nova", amountNgn: 1300 },
    { id: "st-basic", name: "Basic", amountNgn: 2600 },
    { id: "st-smart", name: "Smart", amountNgn: 3500 },
    { id: "st-classic", name: "Classic", amountNgn: 4500 },
  ],
  showmax: [
    { id: "sm-mobile", name: "Mobile", amountNgn: 1600 },
    { id: "sm-standard", name: "Standard", amountNgn: 3200 },
    { id: "sm-pro", name: "Pro", amountNgn: 6300 },
  ],
};