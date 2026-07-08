import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store, type BankAccount, genId } from "@/lib/crypto";
import { ArrowLeft, Landmark, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";

export default function SellaBankDetails() {
  const navigate = useNavigate();
  const [banks, setBanks] = useState(store.getBanks());
  const [showAdd, setShowAdd] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const remove = (id: string) => {
    store.removeBank(id);
    setBanks(store.getBanks());
  };

  const addBank = () => {
    if (!bankName || !accountNumber || !accountName) return;
    const bank: BankAccount = {
      id: genId(),
      bankName,
      accountNumber: "****" + accountNumber.slice(-4),
      accountName,
      isDefault: banks.length === 0,
    };
    store.addBank(bank);
    setBanks(store.getBanks());
    setShowAdd(false);
    setBankName(""); setAccountNumber(""); setAccountName("");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background px-4 pb-8">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold">Bank Details</h1>
        </div>

        <p className="text-xs tracking-widest text-muted-foreground uppercase mb-4">Linked Accounts</p>

        <div className="space-y-4 mb-6">
          {banks.map((bank) => (
            <div key={bank.id} className="bg-card rounded-2xl p-4 border border-border/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <Landmark size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{bank.bankName}</p>
                    <p className="text-xs text-muted-foreground">{bank.accountNumber}</p>
                  </div>
                </div>
                <button onClick={() => remove(bank.id)}>
                  <Trash2 size={18} className="text-destructive" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{bank.accountName}</span>
                {bank.isDefault && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Default</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {showAdd ? (
          <div className="bg-card rounded-2xl p-4 border border-border/20 space-y-4 mb-4">
            <input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank Name"
              className="w-full bg-transparent border-b border-border/30 py-3 text-sm outline-none placeholder:text-muted-foreground/50"
            />
            <input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Account Number"
              className="w-full bg-transparent border-b border-border/30 py-3 text-sm outline-none placeholder:text-muted-foreground/50"
            />
            <input
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Account Name"
              className="w-full bg-transparent border-b border-border/30 py-3 text-sm outline-none placeholder:text-muted-foreground/50"
            />
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button className="flex-1" onClick={addBank}>Add Bank</Button>
            </div>
          </div>
        ) : (
          <Button className="w-full h-14 rounded-2xl text-base font-semibold gap-2" onClick={() => setShowAdd(true)}>
            <Plus size={18} /> Add new Bank
          </Button>
        )}
      </div>
    </PageTransition>
  );
}
