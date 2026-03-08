import { useState } from "react";
import { giftcardStore, GiftCardOrder, GIFT_CARD_BRANDS } from "@/data/giftcardData";
import { store, formatNgn } from "@/lib/crypto";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, Image } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const statusTabs = ["All", "Pending", "Approved", "Rejected"];

const AdminGiftcardOrders = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState(giftcardStore.getOrders());
  const [selectedOrder, setSelectedOrder] = useState<GiftCardOrder | null>(null);

  const filteredOrders = activeTab === "All"
    ? orders
    : orders.filter((o) => o.status === activeTab.toLowerCase());

  const handleApprove = (order: GiftCardOrder) => {
    giftcardStore.updateOrderStatus(order.id, "approved");
    // Credit user NGN wallet
    store.updateWalletCoin("NGN", order.ngnPayout);
    setOrders(giftcardStore.getOrders());
    toast.success(`Approved! ${formatNgn(order.ngnPayout)} credited to user wallet.`);
  };

  const handleReject = (order: GiftCardOrder) => {
    giftcardStore.updateOrderStatus(order.id, "rejected");
    setOrders(giftcardStore.getOrders());
    toast.error("Order rejected.");
  };

  const getBrandLogo = (brandId: string) => {
    return GIFT_CARD_BRANDS.find(b => b.id === brandId)?.logo || "";
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-500";
      case "approved": return "bg-green-500/10 text-green-500";
      case "rejected": return "bg-red-500/10 text-red-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const pendingCount = orders.filter(o => o.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border">
        {statusTabs.map((tab) => {
          const count = tab === "All" ? orders.length : orders.filter(o => o.status === tab.toLowerCase()).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 pb-2 text-sm font-medium ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            >
              {tab}
              {tab === "Pending" && pendingCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-white">
                  {pendingCount}
                </span>
              )}
              {tab !== "Pending" && <span className="text-xs text-muted-foreground">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>NGN Payout</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img src={getBrandLogo(order.brandId)} alt={order.brandName} className="h-8 w-8 object-contain" />
                      <span className="font-medium text-foreground">{order.brandName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground font-medium">
                    ${order.amount} {order.currency}
                  </TableCell>
                  <TableCell className="text-foreground font-bold text-green-500">
                    {formatNgn(order.ngnPayout)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.rate}%</TableCell>
                  <TableCell>
                    <Badge className={`${statusColor(order.status)} border-0 capitalize`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {order.cardImage && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      {order.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-500/10"
                            onClick={() => handleApprove(order)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            onClick={() => handleReject(order)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Card Image - {selectedOrder?.brandName}</DialogTitle>
          </DialogHeader>
          {selectedOrder?.cardImage ? (
            <img src={selectedOrder.cardImage} alt="Gift card" className="w-full rounded-lg" />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Image className="h-12 w-12 mb-2" />
              <p>No image uploaded</p>
            </div>
          )}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">${selectedOrder?.amount} {selectedOrder?.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payout:</span>
              <span className="font-bold text-green-500">{selectedOrder && formatNgn(selectedOrder.ngnPayout)}</span>
            </div>
            {selectedOrder?.cardCode && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Code:</span>
                <span className="font-mono">{selectedOrder.cardCode}</span>
              </div>
            )}
          </div>
          {selectedOrder?.status === "pending" && (
            <div className="flex gap-2 mt-4">
              <Button className="flex-1" onClick={() => { handleApprove(selectedOrder); setSelectedOrder(null); }}>
                <Check className="h-4 w-4 mr-2" /> Approve
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => { handleReject(selectedOrder); setSelectedOrder(null); }}>
                <X className="h-4 w-4 mr-2" /> Reject
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGiftcardOrders;
