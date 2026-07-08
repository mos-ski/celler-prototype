import { ArrowLeft, Sun, Moon, Monitor, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import PageTransition from "@/components/PageTransition";

const MODES = [
  { value: "light" as const, label: "Light", icon: Sun, desc: "Always use light theme" },
  { value: "dark" as const, label: "Dark", icon: Moon, desc: "Always use dark theme" },
  { value: "system" as const, label: "System", icon: Monitor, desc: "Follow system preferences" },
];

export default function SellaAppearance() {
  const navigate = useNavigate();
  const { theme, setThemeMode } = useTheme();

  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">Appearance</h1>
        </div>

        <div className="space-y-3">
          {MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setThemeMode(m.value)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-colors ${
                theme === m.value ? "border-primary bg-primary/5" : "border-border/20 bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${theme === m.value ? "bg-primary/10" : "bg-secondary"}`}>
                  <m.icon size={18} className={theme === m.value ? "text-primary" : "text-muted-foreground"} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </div>
              {theme === m.value && <Check size={18} className="text-primary" />}
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
