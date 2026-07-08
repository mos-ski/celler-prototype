import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SellaUpdatePassword() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const valid = current.length >= 6 && newPw.length >= 6 && newPw === confirm;

  const handleSubmit = () => {
    if (!valid) return;
    setSuccess(true);
    setTimeout(() => navigate(-1), 2000);
  };

  if (success) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-success" />
          </div>
          <p className="text-xl font-bold mb-2">Password Updated!</p>
          <p className="text-sm text-muted-foreground">Your password has been changed successfully</p>
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
          <h1 className="text-lg font-semibold">Update Password</h1>
        </div>

        <div className="space-y-4">
          {[
            { label: "Current Password", val: current, set: setCurrent, show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
            { label: "New Password", val: newPw, set: setNewPw, show: showNew, toggle: () => setShowNew(!showNew) },
            { label: "Confirm New Password", val: confirm, set: setConfirm, show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-sm text-muted-foreground mb-2 block">{f.label}</label>
              <div className="relative">
                <Input
                  type={f.show ? "text" : "password"}
                  value={f.val}
                  onChange={(e) => f.set(e.target.value)}
                  placeholder={f.label}
                  className="h-14 rounded-2xl bg-secondary border-0 pr-12"
                />
                <button onClick={f.toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {f.show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          ))}

          {newPw && confirm && newPw !== confirm && (
            <p className="text-xs text-destructive">Passwords do not match</p>
          )}

          <Button onClick={handleSubmit} disabled={!valid} className="w-full h-14 rounded-2xl text-base font-semibold mt-4">
            Update Password
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
