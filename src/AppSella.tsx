import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SellaLayout from "@/components/sella/SellaLayout";

import SellaSplash from "./pages/sella/SellaSplash";
import SellaHome from "./pages/sella/SellaHome";
import SellaHistory from "./pages/sella/SellaHistory";
import SellaLanding from "./pages/sella/Landing";

import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TwoFactor from "./pages/TwoFactor";
import Bills from "./pages/Bills";
import BillPay from "./pages/BillPay";
import History from "./pages/History";
import Referral from "./pages/Referral";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Withdraw from "./pages/Withdraw";
import Receive from "./pages/Receive";
import TransactionDetail from "./pages/TransactionDetail";
import Receipt from "./pages/Receipt";
import BankDetails from "./pages/BankDetails";
import KYC from "./pages/KYC";
import UpdatePin from "./pages/UpdatePin";
import UpdatePassword from "./pages/UpdatePassword";
import Appearance from "./pages/Appearance";
import Support from "./pages/Support";
import EditProfile from "./pages/EditProfile";

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
              {/* Sella splash and auth */}
              <Route path="/" element={<SellaLanding />} />
              <Route path="/a" element={<SellaSplash />} />
              <Route path="/a/welcome" element={<Welcome />} />
              <Route path="/a/signin" element={<SignIn />} />
              <Route path="/a/signup" element={<SignUp />} />
              <Route path="/a/two-factor" element={<TwoFactor />} />

              {/* Protected screens with Sella layout */}
              <Route element={<SellaLayout />}>
                <Route path="/a/home" element={<SellaHome />} />
                <Route path="/a/bills" element={<Bills />} />
                <Route path="/a/bills/:category" element={<BillPay />} />
                <Route path="/a/history" element={<SellaHistory />} />
                <Route path="/a/referral" element={<Referral />} />
                <Route path="/a/profile" element={<Profile />} />
                <Route path="/a/notifications" element={<Notifications />} />
                <Route path="/a/withdraw/:coinId" element={<Withdraw />} />
                <Route path="/a/receive/:coinId" element={<Receive />} />
                <Route path="/a/transaction/:txId" element={<TransactionDetail />} />
                <Route path="/a/receipt/:txId" element={<Receipt />} />
                <Route path="/a/bank-details" element={<BankDetails />} />
                <Route path="/a/kyc" element={<KYC />} />
                <Route path="/a/update-pin" element={<UpdatePin />} />
                <Route path="/a/update-password" element={<UpdatePassword />} />
                <Route path="/two-factor" element={<TwoFactor />} />
                <Route path="/a/appearance" element={<Appearance />} />
                <Route path="/a/support" element={<Support />} />
                <Route path="/a/edit-profile" element={<EditProfile />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppSella;
