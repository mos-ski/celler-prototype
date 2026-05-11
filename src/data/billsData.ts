export type BillCategory = "airtime" | "data" | "electricity" | "tv";

export interface BillProvider {
  id: string;
  name: string;
  logo: string; // emoji or short label
  color: string; // tailwind bg color class
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

export const BILL_CATEGORIES: { id: BillCategory; label: string; emoji: string; description: string }[] = [
  { id: "airtime", label: "Airtime", emoji: "📱", description: "Top up any phone number" },
  { id: "data", label: "Data", emoji: "🌐", description: "Buy mobile data bundles" },
  { id: "electricity", label: "Electricity", emoji: "💡", description: "Pay your electricity bill" },
  { id: "tv", label: "TV", emoji: "📺", description: "Renew your cable subscription" },
];

export const PROVIDERS: Record<BillCategory, BillProvider[]> = {
  airtime: [
    { id: "mtn", name: "MTN", logo: "MTN", color: "bg-yellow-500" },
    { id: "glo", name: "Glo", logo: "Glo", color: "bg-green-600" },
    { id: "airtel", name: "Airtel", logo: "Airtel", color: "bg-red-600" },
    { id: "9mobile", name: "9mobile", logo: "9", color: "bg-emerald-700" },
  ],
  data: [
    { id: "mtn", name: "MTN", logo: "MTN", color: "bg-yellow-500" },
    { id: "glo", name: "Glo", logo: "Glo", color: "bg-green-600" },
    { id: "airtel", name: "Airtel", logo: "Airtel", color: "bg-red-600" },
    { id: "9mobile", name: "9mobile", logo: "9", color: "bg-emerald-700" },
  ],
  electricity: [
    { id: "ekedc", name: "Eko Electric (EKEDC)", logo: "EK", color: "bg-blue-600" },
    { id: "ikedc", name: "Ikeja Electric (IKEDC)", logo: "IK", color: "bg-orange-600" },
    { id: "aedc", name: "Abuja Electric (AEDC)", logo: "AB", color: "bg-indigo-600" },
    { id: "phed", name: "Port Harcourt Electric", logo: "PH", color: "bg-cyan-600" },
    { id: "ibedc", name: "Ibadan Electric (IBEDC)", logo: "IB", color: "bg-amber-600" },
    { id: "kedco", name: "Kano Electric (KEDCO)", logo: "KN", color: "bg-rose-600" },
  ],
  tv: [
    { id: "dstv", name: "DStv", logo: "DStv", color: "bg-blue-700" },
    { id: "gotv", name: "GOtv", logo: "GO", color: "bg-green-700" },
    { id: "startimes", name: "Startimes", logo: "ST", color: "bg-orange-700" },
    { id: "showmax", name: "Showmax", logo: "SM", color: "bg-purple-700" },
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