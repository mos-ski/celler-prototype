import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SellaLayout from "@/components/sella/SellaLayout";

import SellaLanding from "./pages/sella/Landing";
import SellaSplash from "./pages/sella/SellaSplash";
import SellaWelcome from "./pages/sella/SellaWelcome";
import SellaSignIn from "./pages/sella/SellaSignIn";
import SellaSignUp from "./pages/sella/SellaSignUp";
import SellaTwoFactor from "./pages/sella/SellaTwoFactor";
import SellaHome from "./pages/sella/SellaHome";
import SellaBills from "./pages/Bills";
import SellaBillPay from "./pages/sella/SellaBillPay";
import SellaHistory from "./pages/sella/SellaHistory";
import SellaReferral from "./pages/sella/SellaReferral";
import SellaProfile from "./pages/sella/SellaProfile";
import SellaNotifications from "./pages/sella/SellaNotifications";
import SellaWithdraw from "./pages/sella/SellaWithdraw";
import SellaReceive from "./pages/sella/SellaReceive";
import SellaTransactionDetail from "./pages/sella/SellaTransactionDetail";
import SellaReceipt from "./pages/sella/SellaReceipt";
import SellaBankDetails from "./pages/sella/SellaBankDetails";
import SellaKYC from "./pages/sella/SellaKYC";
import SellaUpdatePin from "./pages/sella/SellaUpdatePin";
import SellaUpdatePassword from "./pages/sella/SellaUpdatePassword";
import SellaAppearance from "./pages/sella/SellaAppearance";
import SellaSupport from "./pages/sella/SellaSupport";
import SellaEditProfile from "./pages/sella/SellaEditProfile";

const queryClient = new QueryClient();

const AppSella = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<SellaLanding />} />
              <Route path="/a" element={<SellaSplash />} />
              <Route path="/a/welcome" element={<SellaWelcome />} />
              <Route path="/a/signin" element={<SellaSignIn />} />
              <Route path="/a/signup" element={<SellaSignUp />} />
              <Route path="/a/two-factor" element={<SellaTwoFactor />} />

              <Route element={<SellaLayout />}>
                <Route path="/a/home" element={<SellaHome />} />
                <Route path="/a/bills" element={<SellaBills />} />
                <Route path="/a/bills/:category" element={<SellaBillPay />} />
                <Route path="/a/history" element={<SellaHistory />} />
                <Route path="/a/referral" element={<SellaReferral />} />
                <Route path="/a/profile" element={<SellaProfile />} />
                <Route path="/a/notifications" element={<SellaNotifications />} />
                <Route path="/a/withdraw/:coinId" element={<SellaWithdraw />} />
                <Route path="/a/receive/:coinId" element={<SellaReceive />} />
                <Route path="/a/transaction/:txId" element={<SellaTransactionDetail />} />
                <Route path="/a/receipt/:txId" element={<SellaReceipt />} />
                <Route path="/a/bank-details" element={<SellaBankDetails />} />
                <Route path="/a/kyc" element={<SellaKYC />} />
                <Route path="/a/update-pin" element={<SellaUpdatePin />} />
                <Route path="/a/update-password" element={<SellaUpdatePassword />} />
                <Route path="/a/appearance" element={<SellaAppearance />} />
                <Route path="/a/support" element={<SellaSupport />} />
                <Route path="/a/edit-profile" element={<SellaEditProfile />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppSella;
