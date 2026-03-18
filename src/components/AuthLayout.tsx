import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Headphones } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Desktop top bar */}
      <header className="hidden md:flex items-center justify-between h-16 px-8 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          <span className="text-foreground font-bold text-xl tracking-tight">celler</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/support")}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Headphones size={18} />
          </button>
          <button
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Blue accent line */}
      <div className="hidden md:block h-0.5 bg-primary" />

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="hidden md:flex items-center h-12 px-8">
        <span className="text-xs text-muted-foreground">Celler 2026</span>
      </footer>
    </div>
  );
}
