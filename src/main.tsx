import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppSella from "./AppSella.tsx";
import "./index.css";

const RootApp = import.meta.env.VITE_APP_VARIANT === "sella" ? AppSella : App;

createRoot(document.getElementById("root")!).render(<RootApp />);
