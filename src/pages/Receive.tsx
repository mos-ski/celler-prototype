import { useParams, useNavigate } from "react-router-dom";
import { getCoin, type CoinId } from "@/lib/crypto";
import CoinIcon from "@/components/CoinIcon";
import { ArrowLeft, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MOCK_ADDRESSES: Record<string, string> = {
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ETH: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  USDT: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  BNB: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
  SOL: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
};

export default function ReceivePage() {
  const { coinId: paramCoin } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const id = (paramCoin?.toUpperCase() || "BTC") as CoinId;

  let coin;
  try { coin = getCoin(id); } catch { navigate("/dashboard"); return null; }

  const address = MOCK_ADDRESSES[id] || "0x0000...0000";

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({ title: "Address copied!", description: address });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 pb-8">
      <div className="flex items-center gap-3 pt-4 mb-8">
        <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-bold">Receive {id}</h1>
      </div>

      <div className="flex flex-col items-center flex-1">
        <CoinIcon coinId={id} />
        <p className="text-lg font-semibold mt-4">Your {coin.name} Address</p>
        <p className="text-xs text-muted-foreground mt-1 mb-8">Send only {id} to this address</p>

        {/* QR placeholder */}
        <div className="h-48 w-48 rounded-2xl bg-white flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="grid grid-cols-5 gap-1 p-4">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`h-3 w-3 rounded-sm ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full bg-card rounded-2xl p-4 border border-border/20">
          <p className="text-xs text-muted-foreground mb-2">Wallet Address</p>
          <p className="text-sm font-mono break-all leading-relaxed">{address}</p>
        </div>

        <div className="flex gap-3 w-full mt-6">
          <Button variant="secondary" className="flex-1 h-14 rounded-2xl gap-2" onClick={copyAddress}>
            <Copy size={16} /> Copy
          </Button>
          <Button className="flex-1 h-14 rounded-2xl gap-2" onClick={copyAddress}>
            <Share2 size={16} /> Share
          </Button>
        </div>

        <p className="text-xs text-amber-500/80 mt-6 text-center leading-relaxed">
          Only send {coin.name} ({id}) to this address. Sending any other coin may result in permanent loss.
        </p>
      </div>
    </div>
  );
}
