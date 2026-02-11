import { type CoinId } from "@/lib/crypto";

const COIN_ICONS: Record<string, string> = {
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
  USDT: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
  BNB: "https://cryptologos.cc/logos/bnb-bnb-logo.svg",
  SOL: "https://cryptologos.cc/logos/solana-sol-logo.svg",
  TRX: "https://cryptologos.cc/logos/tron-trx-logo.svg",
  USDC: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg",
};

const COIN_COLORS: Record<string, string> = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  USDT: "#26A17B",
  BNB: "#F3BA2F",
  SOL: "#9945FF",
  TRX: "#FF0013",
  USDC: "#2775CA",
  NGN: "#008751",
};

const COIN_FALLBACK: Record<string, string> = {
  BTC: "₿", ETH: "Ξ", USDT: "₮", BNB: "◆", SOL: "◎", TRX: "⬡", USDC: "$", NGN: "₦",
};

export default function CoinIcon({ coinId, size = 40 }: { coinId: string; size?: number }) {
  const iconUrl = COIN_ICONS[coinId];
  const bgColor = COIN_COLORS[coinId] || "#666";
  const fallback = COIN_FALLBACK[coinId] || "?";

  if (coinId === "NGN") {
    return (
      <div
        className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
        style={{ width: size, height: size, backgroundColor: bgColor, fontSize: size * 0.4 }}
      >
        {fallback}
      </div>
    );
  }

  if (iconUrl) {
    return (
      <div
        className="rounded-full flex items-center justify-center shrink-0 overflow-hidden"
        style={{ width: size, height: size, backgroundColor: bgColor }}
      >
        <img
          src={iconUrl}
          alt={coinId}
          className="object-contain"
          style={{ width: size * 0.6, height: size * 0.6 }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.innerHTML = `<span style="color:white;font-weight:bold;font-size:${size * 0.4}px">${fallback}</span>`;
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
      style={{ width: size, height: size, backgroundColor: bgColor, fontSize: size * 0.4 }}
    >
      {fallback}
    </div>
  );
}

export { CoinIcon };
