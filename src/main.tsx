import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppAndroid from "./AppAndroid.tsx";
import "./index.css";

const RootApp = import.meta.env.VITE_APP_VARIANT === "android" ? AppAndroid : App;

createRoot(document.getElementById("root")!).render(<RootApp />);
