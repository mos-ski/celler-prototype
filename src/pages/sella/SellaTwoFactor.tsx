import { useState } from "react";
import { ArrowLeft, Shield, CheckCircle2, Copy, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "intro" | "setup" | "verify" | "success";

const MOCK_SECRET = "JBSWY3DPEHPK3PXP";

export default function SellaTwoFactor() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [code, setCode] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_SECRET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    if (code.length === 6) {
      setStep("success");
      setEnabled(true);
      setTimeout(() => navigate(-1), 2000);
    }
  };

  if (step === "success") {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-success" />
          </div>
          <p className="text-xl font-bold mb-2">2FA Enabled!</p>
          <p className="text-sm text-muted-foreground text-center">Two-factor authentication is now active on your account</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pb-8">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">Two-Factor Authentication</h1>
        </div>

        {step === "intro" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center py-8">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield size={36} className="text-primary" />
              </div>
              <p className="text-lg font-semibold mb-2">Secure Your Account</p>
              <p className="text-sm text-muted-foreground text-center max-w-xs">Add an extra layer of security by enabling two-factor authentication using an authenticator app</p>
            </div>
            <div className="space-y-3">
              {["Download Google Authenticator or Authy", "Scan QR code or enter secret key", "Enter 6-digit verification code"].map((t, i) => (
                <div key={i} className="flex items-center gap-3 bg-secondary rounded-2xl p-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</div>
                  <p className="text-sm">{t}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => setStep("setup")} className="w-full h-14 rounded-2xl text-base font-semibold">
              Enable 2FA
            </Button>
          </div>
        )}

        {step === "setup" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center py-4">
              <div className="h-40 w-40 rounded-2xl bg-white flex items-center justify-center mb-4">
                <Smartphone size={48} className="text-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center">Scan this QR code with your authenticator app</p>
            </div>

            <div className="bg-secondary rounded-2xl p-4">
              <p className="text-xs text-muted-foreground mb-2">Or enter this secret key manually:</p>
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono font-semibold tracking-wider">{MOCK_SECRET}</code>
                <button onClick={handleCopy} className="text-primary">
                  <Copy size={16} />
                </button>
              </div>
              {copied && <p className="text-xs text-success mt-1">Copied!</p>}
            </div>

            <Button onClick={() => setStep("verify")} className="w-full h-14 rounded-2xl text-base font-semibold">
              Continue
            </Button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              className="h-14 rounded-2xl bg-secondary border-0 text-center text-2xl tracking-[0.5em] font-mono"
              maxLength={6}
            />
            <Button onClick={handleVerify} disabled={code.length !== 6} className="w-full h-14 rounded-2xl text-base font-semibold">
              Verify & Enable
            </Button>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
