import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, CheckCircle2, Circle, Apple, Phone } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/AuthLayout";

type Step = "email" | "otp" | "password" | "success";

function SignUpForm() {
  const { isLoggedIn, signup } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    if (step !== "otp" || countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [step, countdown]);

  if (isLoggedIn && step !== "success") return <Navigate to="/dashboard" replace />;

  const has8 = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const pwValid = has8 && hasUpper && hasSpecial;

  const handleEmailContinue = () => {
    if (!email.includes("@")) { setError("Enter a valid email"); return; }
    setError("");
    setCountdown(50);
    setStep("otp");
  };

  const handleVerify = () => {
    if (otp.length < 6) { setError("Enter 6-digit code"); return; }
    setError("");
    setStep("password");
  };

  const handleCreate = () => {
    if (!username.trim()) { setError("Username is required"); return; }
    if (!pwValid) { setError("Password doesn't meet requirements"); return; }
    if (password !== confirmPassword) { setError("Passwords don't match"); return; }
    setError("");
    const err = signup({ fullName: username, email, password });
    if (err) { setError(err); return; }
    setStep("success");
  };

  const back = () => {
    if (step === "otp") setStep("email");
    else if (step === "password") setStep("otp");
  };

  if (step === "email") {
    return (
      <div className="flex flex-col flex-1">
        <h1 className="text-2xl font-bold mb-8">Create Account</h1>
        {error && <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-2 mb-4">{error}</p>}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="eg: johndoe@example.com"
              className="mt-2 h-12 bg-transparent border-0 border-b border-border rounded-none px-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Referral Code (Optional)</label>
            <Input value={referral} onChange={(e) => setReferral(e.target.value)} placeholder="Enter Referral code"
              className="mt-2 h-12 bg-transparent border-0 border-b border-border rounded-none px-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary" />
          </div>
        </div>
        <Button onClick={handleEmailContinue} className="w-full h-14 rounded-2xl text-base font-semibold mt-10 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Continue</Button>
        <div className="flex justify-center gap-8 mt-8">
          {[
            { icon: <span className="text-xl font-bold" style={{ fontFamily: "sans-serif" }}>G</span>, label: "Google" },
            { icon: <Apple size={22} />, label: "Apple" },
            { icon: <Phone size={22} />, label: "Phone Number" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground">{s.icon}</div>
              <span className="text-[11px] text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-auto pt-8">
          Already a user? <Link to="/signin" className="text-primary font-medium">Sign in</Link>
        </p>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <div className="flex flex-col flex-1">
        <button onClick={back} className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-6">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold">Verify Email</h1>
        <p className="text-sm text-muted-foreground mt-2">
          We've sent you an OTP Code via Email. Please enter 6-digit code sent to <span className="text-primary">{email}</span>
        </p>
        {error && <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-2 mt-4">{error}</p>}
        <p className="text-sm font-medium mt-8 mb-3">Enter Code</p>
        <InputOTP value={otp} onChange={setOtp} maxLength={6}>
          <InputOTPGroup className="gap-2 w-full justify-between">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} className="h-12 w-full border-0 border-b-2 border-muted rounded-none text-lg" />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-muted-foreground mt-4">
          Resend code{" "}
          {countdown > 0 ? <span className="text-foreground">in {countdown} secs</span> : <button className="text-primary font-medium" onClick={() => setCountdown(50)}>Resend</button>}
        </p>
        <Button onClick={handleVerify} className="w-full h-14 rounded-2xl text-base font-semibold mt-10 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Verify</Button>
      </div>
    );
  }

  if (step === "password") {
    return (
      <div className="flex flex-col flex-1">
        <button onClick={back} className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-6">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold mb-8">Create Password</h1>
        {error && <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-2 mb-4">{error}</p>}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="eg: johndoe"
              className="mt-2 h-12 bg-transparent border-0 border-b border-border rounded-none px-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"
                className="mt-2 h-12 bg-transparent border-0 border-b border-border rounded-none px-0 pr-10 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Input type={showConfirmPw ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter Password"
                className="mt-2 h-12 bg-transparent border-0 border-b border-border rounded-none px-0 pr-10 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary" />
              <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground">
                {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Password must contain at least</p>
          {[
            { check: has8, label: "8 characters" },
            { check: hasUpper, label: "One Uppercase Letter" },
            { check: hasSpecial, label: "One Special Character e.g !^@*#(" },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-2">
              {r.check ? <CheckCircle2 size={16} className="text-success" /> : <Circle size={16} className="text-muted-foreground/40" />}
              <span className={`text-sm ${r.check ? "text-foreground" : "text-muted-foreground"}`}>{r.label}</span>
            </div>
          ))}
        </div>
        <Button onClick={handleCreate} className="w-full h-14 rounded-2xl text-base font-semibold mt-auto bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Create Account</Button>
      </div>
    );
  }

  // Success
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-bold">Account Created.</h1>
      <p className="text-muted-foreground text-center mt-2 max-w-xs">
        Your account has been upgraded and you will receive an email notification shortly
      </p>
      <Button onClick={() => navigate("/dashboard", { replace: true })} className="w-full h-14 rounded-2xl text-base font-semibold mt-10 bg-primary text-primary-foreground">
        Continue
      </Button>
    </div>
  );
}

export default function SignUp() {
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden flex min-h-screen flex-col px-6 pt-14 pb-8 bg-background">
        <SignUpForm />
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <AuthLayout>
          <SignUpForm />
        </AuthLayout>
      </div>
    </>
  );
}
