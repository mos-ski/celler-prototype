import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function SellaSignIn() {
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  if (isLoggedIn) return <Navigate to="/a/home" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, password);
    if (err) setError(err);
  };

  return (
    <div className="flex min-h-screen flex-col px-6 pt-14 pb-8 bg-background">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div
          className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-base"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
        >
          S
        </div>
        <span className="text-xl font-bold">Sella</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
        <p className="text-muted-foreground text-sm mb-8">Sign in to your account</p>

        {error && <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-2 mb-4">{error}</p>}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="eg: johndoe@example.com"
              className="mt-2 h-12 bg-transparent border-0 border-b border-border rounded-none px-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
                className="mt-2 h-12 bg-transparent border-0 border-b border-border rounded-none px-0 pr-10 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-14 rounded-2xl text-base font-semibold mt-10 bg-primary text-primary-foreground">
          Sign In
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-auto pt-8">
          Don't have an account?{" "}
          <Link to="/a/signup" className="text-primary font-medium">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
