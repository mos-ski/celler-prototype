import { ArrowLeft, MessageCircle, Mail, Phone, ExternalLink, ChevronRight, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

const FAQ = [
  { q: "How do I verify my account?", a: "Go to Profile > KYC Verification and complete the required levels." },
  { q: "How long do transactions take?", a: "Most transactions are completed within 1-5 minutes." },
  { q: "What are the transaction fees?", a: "Fees vary by transaction type. Buy/Sell: 1%, Swap: 0.5%, Send: network fee." },
  { q: "How do I reset my PIN?", a: "Go to Profile > Security > Update PIN and follow the steps." },
];

export default function SellaSupport() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">Help & Support</h1>
        </div>

        {/* Contact options */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: MessageCircle, label: "Live Chat", color: "bg-primary/10 text-primary" },
            { icon: Mail, label: "Email Us", color: "bg-success/10 text-success" },
            { icon: Phone, label: "Call Us", color: "bg-destructive/10 text-destructive" },
          ].map((c) => (
            <button key={c.label} className="flex flex-col items-center gap-2 bg-card rounded-2xl border border-border/20 p-4">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${c.color}`}>
                <c.icon size={20} />
              </div>
              <span className="text-xs font-medium">{c.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ */}
        <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-3 px-1">Frequently Asked Questions</p>
        <div className="bg-card rounded-2xl border border-border/20">
          {FAQ.map((f, i) => (
            <details key={i} className={`group ${i < FAQ.length - 1 ? "border-b border-border/10" : ""}`}>
              <summary className="flex items-center justify-between py-4 px-4 cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} className="text-muted-foreground" />
                  <span className="text-sm">{f.q}</span>
                </div>
                <ChevronRight size={14} className="text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <p className="text-sm text-muted-foreground px-4 pb-4 pl-11">{f.a}</p>
            </details>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 space-y-3">
          {["Terms of Service", "Privacy Policy"].map((t) => (
            <button key={t} className="w-full flex items-center justify-between py-3 px-4 bg-card rounded-2xl border border-border/20">
              <span className="text-sm">{t}</span>
              <ExternalLink size={14} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
