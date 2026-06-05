import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AndroidLayout from "@/components/android/AndroidLayout";

import AndroidSplash from "./pages/android/Splash";
import AndroidHome from "./pages/android/Home";

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

const AppAndroid = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Android splash and auth */}
              <Route path="/" element={<AndroidSplash />} />
              <Route path="/a" element={<AndroidSplash />} />
              <Route path="/a/welcome" element={<Welcome />} />
              <Route path="/a/signin" element={<SignIn />} />
              <Route path="/a/signup" element={<SignUp />} />
              <Route path="/a/two-factor" element={<TwoFactor />} />

              {/* Protected screens with Android layout */}
              <Route element={<AndroidLayout />}>
                <Route path="/a/home" element={<AndroidHome />} />
                <Route path="/bills" element={<Bills />} />
                <Route path="/bills/:category" element={<BillPay />} />
                <Route path="/history" element={<History />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/withdraw/:coinId" element={<Withdraw />} />
                <Route path="/receive/:coinId" element={<Receive />} />
                <Route path="/transaction/:txId" element={<TransactionDetail />} />
                <Route path="/receipt/:txId" element={<Receipt />} />
                <Route path="/bank-details" element={<BankDetails />} />
                <Route path="/kyc" element={<KYC />} />
                <Route path="/update-pin" element={<UpdatePin />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/two-factor" element={<TwoFactor />} />
                <Route path="/appearance" element={<Appearance />} />
                <Route path="/support" element={<Support />} />
                <Route path="/edit-profile" element={<EditProfile />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppAndroid;
