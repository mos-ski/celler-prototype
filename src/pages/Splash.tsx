import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Splash() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000);
    const t2 = setTimeout(() => {
      navigate(isLoggedIn ? "/dashboard" : "/welcome", { replace: true });
    }, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isLoggedIn, navigate]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
      style={{
        background: "linear-gradient(160deg, #2dd4bf 0%, #3b82f6 40%, #1e3a5f 70%, #a37c2e 100%)",
      }}
    >
      {/* Logo icon */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-4">
        <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm-2 36l-2-2 8-8-8-8 2-2 10 10-10 10z" fill="white" opacity="0.9"/>
        <circle cx="26" cy="28" r="4" fill="white"/>
      </svg>
      <h1 className="text-4xl font-bold text-white tracking-tight">celler</h1>
    </div>
  );
}
