import { useState } from "react";
import { KeyRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TRANSACTION_PIN = "1234";

interface TransactionPinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: () => void;
  title?: string;
  description?: string;
}

export default function TransactionPinDialog({
  open,
  onOpenChange,
  onVerified,
  title = "Enter Transaction PIN",
  description = "Enter your 4-digit PIN to authorize this transaction.",
}: TransactionPinDialogProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setPin("");
    setError("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) reset();
    onOpenChange(nextOpen);
  };

  const handleDigit = (digit: string) => {
    if (pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);
    setError("");

    if (next.length === 4) {
      if (next === TRANSACTION_PIN) {
        setTimeout(() => {
          reset();
          onOpenChange(false);
          onVerified();
        }, 250);
      } else {
        setTimeout(() => {
          setPin("");
          setError("Incorrect PIN. Try again.");
        }, 250);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[340px] rounded-3xl p-6 [&>button]:hidden">
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <KeyRound size={26} />
          </div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-4 pt-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-4 w-4 rounded-full transition-colors ${i < pin.length ? "bg-primary" : "bg-secondary"}`}
            />
          ))}
        </div>

        <p className="h-4 text-center text-xs text-destructive">{error}</p>

        <div className="mx-auto grid w-64 grid-cols-3 gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((key) => (
            <button
              key={key || "blank"}
              disabled={!key}
              onClick={() => key === "⌫" ? setPin((value) => value.slice(0, -1)) : handleDigit(key)}
              className="flex h-14 items-center justify-center rounded-xl bg-secondary text-lg font-semibold transition-colors active:bg-secondary/70 disabled:opacity-0"
            >
              {key}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
