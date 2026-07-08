import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function SellaSplash() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 1800);
    const t2 = setTimeout(() => {
      navigate(isLoggedIn ? "/a/home" : "/a/welcome", { replace: true });
    }, 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isLoggedIn, navigate]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "#0F0F23" }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-20 w-20 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-2xl"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
        >
          S
        </div>
        <p className="text-white text-3xl font-bold tracking-tight">Sella</p>
        <p className="text-white/50 text-sm">Pay smarter, every day</p>
      </div>
    </div>
  );
}
