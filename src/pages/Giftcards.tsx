import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GIFT_CARD_BRANDS, GIFT_CARD_CATEGORIES } from "@/data/giftcardData";
import PageTransition from "@/components/PageTransition";

export default function Giftcards() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [mode, setMode] = useState<"buy" | "sell">("buy");

  const filtered = GIFT_CARD_BRANDS.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || b.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <PageTransition>
      <div className="space-y-5 pt-2 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-bold">Gift Cards</h1>
          </div>
          <button onClick={() => navigate("/giftcard-orders")} className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            <Clock size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-secondary p-1">
          {[
            { id: "buy", label: "Buy" },
            { id: "sell", label: "Sell" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id as "buy" | "sell")}
              className={`h-10 rounded-xl text-sm font-semibold transition-colors ${
                mode === item.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {mode === "buy"
            ? "Buy digital gift cards instantly with your Naira wallet."
            : "Sell your gift cards instantly for Naira."}
        </p>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search gift cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary border-0 rounded-xl h-11"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {GIFT_CARD_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-3 gap-3">
          {filtered.map((brand) => (
            <button
              key={brand.id}
              onClick={() => navigate(`/giftcard/${mode}/${brand.id}`)}
              className="flex flex-col items-center gap-2 rounded-2xl bg-secondary p-4 hover:bg-secondary/70 transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center p-2">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    const fallback = el.parentElement?.querySelector(".gc-fallback");
                    if (fallback) (fallback as HTMLElement).style.display = "flex";
                  }}
                />
                <span className="gc-fallback hidden h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                  {brand.name[0]}
                </span>
              </div>
              <span className="text-[11px] font-medium text-center leading-tight">{brand.name}</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No gift cards found.
          </div>
        )}
      </div>
    </PageTransition>
  );
}
