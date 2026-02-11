import { useState, useRef } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

type PinStep = "current" | "new" | "confirm" | "success";

export default function UpdatePinPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<PinStep>("current");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const activePin = step === "current" ? currentPin : step === "new" ? newPin : confirmPin;
  const setActivePin = step === "current" ? setCurrentPin : step === "new" ? setNewPin : setConfirmPin;

  const handleDigit = (d: string) => {
    if (activePin.length >= 4) return;
    const next = activePin + d;
    setActivePin(next);
    setError("");

    if (next.length === 4) {
      setTimeout(() => {
        if (step === "current") {
          setStep("new");
        } else if (step === "new") {
          setStep("confirm");
        } else {
          if (next !== newPin) {
            setError("PINs do not match");
            setConfirmPin("");
          } else {
            setStep("success");
            setTimeout(() => navigate(-1), 2000);
          }
        }
      }, 300);
    }
  };

  const handleDelete = () => {
    setActivePin(activePin.slice(0, -1));
    setError("");
  };

  if (step === "success") {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-success" />
          </div>
          <p className="text-xl font-bold mb-2">PIN Updated!</p>
          <p className="text-sm text-muted-foreground">Your transaction PIN has been changed</p>
        </div>
      </PageTransition>
    );
  }

  const titles: Record<string, string> = { current: "Enter Current PIN", new: "Enter New PIN", confirm: "Confirm New PIN" };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <div className="flex items-center gap-3 pt-4 px-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">Update PIN</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <p className="text-lg font-semibold mb-8">{titles[step]}</p>

          <div className="flex gap-4 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-4 w-4 rounded-full transition-colors ${i < activePin.length ? "bg-primary" : "bg-secondary"}`} />
            ))}
          </div>

          {error && <p className="text-xs text-destructive mb-4">{error}</p>}

          <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-[280px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((d, i) => (
              <button
                key={i}
                onClick={() => d === "del" ? handleDelete() : d !== null && handleDigit(String(d))}
                className={`h-16 rounded-2xl text-xl font-semibold flex items-center justify-center transition-colors ${
                  d === null ? "" : d === "del" ? "text-muted-foreground" : "bg-secondary hover:bg-secondary/70 active:bg-primary/20"
                }`}
              >
                {d === "del" ? "⌫" : d === null ? "" : d}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
