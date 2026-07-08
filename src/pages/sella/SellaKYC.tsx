import { useState } from "react";
import { ArrowLeft, CheckCircle2, Circle, ChevronRight, Shield, CreditCard, Briefcase, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type KYCLevel = 1 | 2 | 3;

const LEVELS = [
  {
    level: 1 as KYCLevel,
    title: "Level 1 – Basic",
    icon: Shield,
    items: ["BVN Verification", "Liveness Check"],
    tradingLimit: "$1,000",
    withdrawLimit: "$100",
  },
  {
    level: 2 as KYCLevel,
    title: "Level 2 – Intermediate",
    icon: CreditCard,
    items: ["Valid ID Card", "Home Address Verification", "Utility Bill / Bank Statement"],
    tradingLimit: "$5,000",
    withdrawLimit: "$500",
  },
  {
    level: 3 as KYCLevel,
    title: "Level 3 – Advanced",
    icon: Briefcase,
    items: ["Employment Details", "Risk Assessment Questionnaire"],
    tradingLimit: "$20,000",
    withdrawLimit: "$10,000",
  },
];

export default function SellaKYC() {
  const navigate = useNavigate();
  const [completedLevel, setCompletedLevel] = useState<number>(0);
  const [activeLevel, setActiveLevel] = useState<KYCLevel | null>(null);
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [bvn, setBvn] = useState("");

  const handleVerify = (level: KYCLevel) => {
    setActiveLevel(level);
    setStep(1);
  };

  const handleSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompletedLevel(activeLevel!);
      setActiveLevel(null);
      setStep(0);
    }, 2000);
  };

  if (activeLevel && step > 0) {
    const lvl = LEVELS[activeLevel - 1];
    return (
      <PageTransition>
        <div className="min-h-screen pb-8">
          <div className="flex items-center gap-3 pt-4 mb-6">
            <button onClick={() => { setActiveLevel(null); setStep(0); }} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-semibold">{lvl.title}</h1>
          </div>

          {processing ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                <Lock size={36} className="text-primary" />
              </div>
              <p className="text-lg font-semibold mb-2">Verifying...</p>
              <p className="text-sm text-muted-foreground">Please wait while we verify your details</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeLevel === 1 && (
                <>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Bank Verification Number (BVN)</label>
                    <Input value={bvn} onChange={(e) => setBvn(e.target.value)} placeholder="Enter your 11-digit BVN" maxLength={11} className="h-14 rounded-2xl bg-secondary border-0" />
                  </div>
                  <div className="bg-secondary rounded-2xl p-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Liveness Check</p>
                      <p className="text-xs text-muted-foreground">Take a selfie to verify identity</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">Start</Button>
                  </div>
                </>
              )}
              {activeLevel === 2 && (
                <>
                  <div className="bg-secondary rounded-2xl p-4">
                    <p className="text-sm font-medium mb-1">Upload ID Card</p>
                    <p className="text-xs text-muted-foreground mb-3">NIN, Voter's Card, Driver's License, or International Passport</p>
                    <Button variant="outline" className="w-full rounded-xl">Choose File</Button>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Home Address</label>
                    <Input placeholder="Enter your home address" className="h-14 rounded-2xl bg-secondary border-0" />
                  </div>
                  <div className="bg-secondary rounded-2xl p-4">
                    <p className="text-sm font-medium mb-1">Upload Utility Bill / Bank Statement</p>
                    <p className="text-xs text-muted-foreground mb-3">Must be issued within the last 3 months</p>
                    <Button variant="outline" className="w-full rounded-xl">Choose File</Button>
                  </div>
                </>
              )}
              {activeLevel === 3 && (
                <>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Employer Name</label>
                    <Input placeholder="Enter employer name" className="h-14 rounded-2xl bg-secondary border-0" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Job Title</label>
                    <Input placeholder="Enter your job title" className="h-14 rounded-2xl bg-secondary border-0" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Annual Income Range</label>
                    <Input placeholder="e.g. $10,000 - $50,000" className="h-14 rounded-2xl bg-secondary border-0" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Source of Funds</label>
                    <Input placeholder="e.g. Salary, Business" className="h-14 rounded-2xl bg-secondary border-0" />
                  </div>
                </>
              )}

              <Button onClick={handleSubmit} className="w-full h-14 rounded-2xl text-base font-semibold mt-4">
                Submit Verification
              </Button>
            </div>
          )}
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">KYC Verification</h1>
        </div>

        <div className="space-y-4">
          {LEVELS.map((lvl) => {
            const completed = completedLevel >= lvl.level;
            const canStart = completedLevel >= lvl.level - 1;
            return (
              <div key={lvl.level} className={`bg-card rounded-2xl border p-4 ${completed ? "border-success/30" : "border-border/20"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${completed ? "bg-success/10" : "bg-secondary"}`}>
                      <lvl.icon size={18} className={completed ? "text-success" : "text-muted-foreground"} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{lvl.title}</p>
                      {completed && <span className="text-xs text-success">✓ Verified</span>}
                    </div>
                  </div>
                  {!completed && canStart && (
                    <Button size="sm" onClick={() => handleVerify(lvl.level)} className="rounded-xl">Verify</Button>
                  )}
                  {!completed && !canStart && (
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">Locked</span>
                  )}
                </div>
                <div className="space-y-1.5 ml-13">
                  {lvl.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      {completed ? <CheckCircle2 size={14} className="text-success" /> : <Circle size={14} className="text-muted-foreground" />}
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-3 pt-3 border-t border-border/10">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Trading Limit</p>
                    <p className="text-xs font-semibold">{lvl.tradingLimit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Withdraw Limit</p>
                    <p className="text-xs font-semibold">{lvl.withdrawLimit}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
