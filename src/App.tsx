import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppLayout from "@/components/AppLayout";
import Splash from "./pages/Splash";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Swap from "./pages/Swap";
import History from "./pages/History";
import Profile from "./pages/Profile";
import CoinDetail from "./pages/CoinDetail";
import Notifications from "./pages/Notifications";
import Withdraw from "./pages/Withdraw";
import Receive from "./pages/Receive";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/swap" element={<Swap />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/coin/:coinId" element={<CoinDetail />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/withdraw/:coinId" element={<Withdraw />} />
                <Route path="/receive/:coinId" element={<Receive />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
