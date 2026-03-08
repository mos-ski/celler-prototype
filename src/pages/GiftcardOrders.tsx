import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Check, X } from "lucide-react";
import { giftcardStore, GIFT_CARD_BRANDS, type GiftCardOrder } from "@/data/giftcardData";
import { formatNgn } from "@/lib/crypto";
import PageTransition from "@/components/PageTransition";

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: Clock, className: "text-yellow-500 bg-yellow-500/10" },
  approved: { label: "Approved", icon: Check, className: "text-success bg-success/10" },
  rejected: { label: "Rejected", icon: X, className: "text-destructive bg-destructive/10" },
};

export default function GiftcardOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<GiftCardOrder[]>([]);

  useEffect(() => {
    setOrders(giftcardStore.getOrders());
  }, []);

  return (
    <PageTransition>
      <div className="space-y-5 pt-2 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold">Gift Card Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No gift card orders yet.
          </div>
        ) : (
          <div className="space-y-2">
            {orders.map((order) => {
              const brand = GIFT_CARD_BRANDS.find((b) => b.id === order.brandId);
              const status = STATUS_CONFIG[order.status];
              const StatusIcon = status.icon;
              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center p-1.5">
                      {brand ? (
                        <>
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="h-7 w-7 object-contain"
                            onError={(e) => {
                              const el = e.target as HTMLImageElement;
                              el.style.display = "none";
                              const fb = el.parentElement?.querySelector(".gc-fb");
                              if (fb) (fb as HTMLElement).style.display = "flex";
                            }}
                          />
                          <span className="gc-fb hidden h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                            {brand.name[0]}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs font-bold text-muted-foreground">?</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{order.brandName}</p>
                      <p className="text-xs text-muted-foreground">
                        ${order.amount} {order.currency} · {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-semibold">{formatNgn(order.ngnPayout)}</p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${status.className}`}>
                      <StatusIcon size={10} />
                      {status.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
