import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const slides = [
  { title: "Buy and Sell Crypto\nwith Ease", coins: ["₿", "Ξ", "₮"] },
  { title: "Start Your Journey with Fast\nand Easy Trading", coins: ["◆", "₮", "Ξ"] },
  { title: "Secure and Reliable\nCrypto Exchange", coins: ["◎", "₿", "◆"] },
];

export default function Welcome() {
  const { isLoggedIn } = useAuth();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(iv);
  }, []);

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  const slide = slides[active];
  const coinColors = ["bg-orange-500", "bg-slate-500", "bg-emerald-600", "bg-yellow-500", "bg-purple-500"];

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pb-8 pt-12">
      {/* Illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Dashed orbit circle */}
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20" />
          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
              <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm-2 36l-2-2 8-8-8-8 2-2 10 10-10 10z" fill="currentColor" className="text-foreground" opacity="0.9"/>
              <circle cx="26" cy="28" r="4" fill="currentColor" className="text-foreground"/>
            </svg>
          </div>
          {/* Orbiting coins */}
          {slide.coins.map((icon, i) => {
            const angle = (i * 120 - 90) * (Math.PI / 180);
            const r = 120;
            const x = 128 + r * Math.cos(angle) - 20;
            const y = 128 + r * Math.sin(angle) - 20;
            return (
              <div
                key={i}
                className={`absolute h-10 w-10 rounded-full ${coinColors[i % coinColors.length]} flex items-center justify-center text-white font-bold text-sm transition-all duration-700`}
                style={{ left: x, top: y }}
              >
                {icon}
              </div>
            );
          })}
          {/* Small diamond decorations */}
          {[30, 100, 200, 60, 220, 150].map((pos, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 bg-primary/40 rotate-45"
              style={{ left: pos % 250, top: (pos * 1.3) % 250 }}
            />
          ))}
        </div>

        {/* Tagline */}
        <h2 className="text-2xl font-bold text-center mt-8 whitespace-pre-line leading-tight">
          {slide.title}
        </h2>

        {/* Dots */}
        <div className="flex gap-2 mt-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="flex gap-3 mt-8">
        <Link
          to="/signin"
          className="flex-1 h-14 rounded-2xl border border-primary/40 flex items-center justify-center text-base font-semibold text-foreground"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="flex-1 h-14 rounded-2xl bg-primary flex items-center justify-center text-base font-semibold text-primary-foreground"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
