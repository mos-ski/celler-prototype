import { ArrowUpRight, ArrowDownLeft, ArrowLeft, ArrowDown } from "lucide-react";
import CoinIcon from "./CoinIcon";
import { type Transaction } from "@/lib/crypto";

const iconMap = {
  "arrow-up-right": ArrowUpRight,
  "arrow-down-left": ArrowDownLeft,
  "arrow-left": ArrowLeft,
  "arrow-down": ArrowDown,
};

export default function TxIcon({ tx }: { tx: Transaction }) {
  const coinId = tx.coin || tx.fromCoin || "BTC";
  
  let iconType: keyof typeof iconMap = "arrow-up-right";
  switch (tx.type) {
    case "buy": iconType = "arrow-up-right"; break;
    case "sell": iconType = "arrow-left"; break;
    case "send": case "withdraw": iconType = "arrow-up-right"; break;
    case "receive": case "deposit": iconType = "arrow-down-left"; break;
    case "swap": iconType = "arrow-up-right"; break;
  }
  
  const Icon = iconMap[iconType];
  
  return (
    <div className="relative">
      <div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center">
        <Icon size={18} className="text-muted-foreground" />
      </div>
      <div className="absolute -bottom-1 -right-1">
        <CoinIcon coinId={coinId} size={20} />
      </div>
    </div>
  );
}
