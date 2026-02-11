import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, password);
    if (err) setError(err);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground mt-1">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-2">{error}</p>}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="h-12 rounded-xl bg-secondary border-0" />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="h-12 rounded-xl bg-secondary border-0" />
        </div>
        <Button type="submit" className="w-full h-14 rounded-2xl text-base font-semibold">Sign In</Button>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-medium">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
