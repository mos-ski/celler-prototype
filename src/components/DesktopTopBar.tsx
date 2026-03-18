import { useNavigate, useLocation } from "react-router-dom";
import { Settings, ArrowLeft, Headphones } from "lucide-react";

const MAIN_PAGES = ["/dashboard", "/history", "/profile", "/manage-assets", "/giftcards", "/swap"];

export default function DesktopTopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = MAIN_PAGES.includes(location.pathname);

  return (
    <header className="hidden md:flex items-center justify-between h-16 px-6 border-b border-border bg-background shrink-0">
      <div className="flex items-center gap-3">
        {!isMainPage && (
          <button
            onClick={() => navigate(-1)}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/support")}
          className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Headphones size={18} />
        </button>
        <button
          onClick={() => navigate("/appearance")}
          className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
