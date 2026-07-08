import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Phone, Wifi, Zap, Tv } from "lucide-react";

const slides = [
  { title: "Pay All Your Bills\nin One Place", icons: [Phone, Wifi, Zap] },
  { title: "Buy Airtime & Data\nat the Best Rates", icons: [Phone, Wifi, Tv] },
  { title: "Electricity, TV & More\nFast and Reliable", icons: [Zap, Tv, Phone] },
];

export default function SellaWelcome() {
  const { isLoggedIn } = useAuth();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(iv);
  }, []);

  if (isLoggedIn) return <Navigate to="/a/home" replace />;

  const slide = slides[active];

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pb-8 pt-12">
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-20 w-20 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
            >
              S
            </div>
          </div>
          {slide.icons.map((Icon, i) => {
            const angle = (i * 120 - 90) * (Math.PI / 180);
            const r = 120;
            const x = 128 + r * Math.cos(angle) - 20;
            const y = 128 + r * Math.sin(angle) - 20;
            const colors = ["bg-indigo-500", "bg-violet-500", "bg-amber-500"];
            return (
              <div
                key={i}
                className={`absolute h-10 w-10 rounded-full ${colors[i]} flex items-center justify-center text-white transition-all duration-700`}
                style={{ left: x, top: y }}
              >
                <Icon size={18} />
              </div>
            );
          })}
        </div>

        <h2 className="text-2xl font-bold text-center mt-8 whitespace-pre-line leading-tight">
          {slide.title}
        </h2>

        <div className="flex gap-2 mt-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <Link
          to="/a/signin"
          className="flex-1 h-14 rounded-2xl border border-primary/40 flex items-center justify-center text-base font-semibold text-foreground"
        >
          Login
        </Link>
        <Link
          to="/a/signup"
          className="flex-1 h-14 rounded-2xl bg-primary flex items-center justify-center text-base font-semibold text-primary-foreground"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
