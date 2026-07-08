import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BottomNav from "./BottomNav";

export default function SellaLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/a/signin" replace />;

  return (
    <div className="flex min-h-screen bg-background flex-col">
      <main className="mx-auto w-full flex-1 max-w-[430px] px-4 pt-2 pb-28">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
