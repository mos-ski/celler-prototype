import { useState, useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";

interface TimelineStep {
  label: string;
  sublabel?: string;
}

export default function TransactionTimeline({ steps, durationMs = 4000 }: { steps: TimelineStep[]; durationMs?: number }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const interval = durationMs / steps.length;

  useEffect(() => {
    if (activeIndex >= steps.length) return;
    const timer = setTimeout(() => setActiveIndex((i) => i + 1), interval);
    return () => clearTimeout(timer);
  }, [activeIndex, steps.length, interval]);

  return (
    <div className="flex items-start w-full max-w-xs mx-auto mt-8">
      {steps.map((step, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            {/* connector line */}
            {i > 0 && (
              <div className="absolute top-3 right-1/2 w-full h-0.5 -translate-y-1/2 z-0">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    backgroundColor: done ? "hsl(var(--success))" : "hsl(var(--muted))",
                    width: "100%",
                  }}
                />
              </div>
            )}
            <div className="relative z-10 transition-transform duration-300" style={{ transform: done || active ? "scale(1)" : "scale(0.8)" }}>
              {done ? (
                <CheckCircle size={26} className="text-success animate-scale-in" />
              ) : active ? (
                <div className="h-[26px] w-[26px] rounded-full border-2 border-primary flex items-center justify-center animate-pulse">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
              ) : (
                <Circle size={26} className="text-muted-foreground" />
              )}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 text-center leading-tight font-medium">{step.label}</p>
            {step.sublabel && <p className="text-[9px] text-muted-foreground">{step.sublabel}</p>}
          </div>
        );
      })}
    </div>
  );
}
