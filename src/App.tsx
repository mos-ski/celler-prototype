import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppLayout from "@/components/AppLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Splash from "./pages/Splash";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Swap from "./pages/Swap";
import History from "./pages/History";
import Profile from "./pages/Profile";
import CoinDetail from "./pages/CoinDetail";
import Notifications from "./pages/Notifications";
import Withdraw from "./pages/Withdraw";
import Receive from "./pages/Receive";
import ManageAssets from "./pages/ManageAssets";
import TransactionDetail from "./pages/TransactionDetail";
import Receipt from "./pages/Receipt";
import Referral from "./pages/Referral";
import BankDetails from "./pages/BankDetails";
import KYC from "./pages/KYC";
import UpdatePassword from "./pages/UpdatePassword";
import UpdatePin from "./pages/UpdatePin";
import TwoFactor from "./pages/TwoFactor";
import Appearance from "./pages/Appearance";
import Support from "./pages/Support";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCustomers from "./pages/admin/Customers";
import AdminOrders from "./pages/admin/Orders";
import AdminReferrals from "./pages/admin/Referrals";
import AdminSettings from "./pages/admin/Settings";

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
                <Route path="/swap" element={<Swap />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/coin/:coinId" element={<CoinDetail />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/withdraw/:coinId" element={<Withdraw />} />
                <Route path="/receive/:coinId" element={<Receive />} />
                <Route path="/manage-assets" element={<ManageAssets />} />
                <Route path="/transaction/:txId" element={<TransactionDetail />} />
                <Route path="/receipt/:txId" element={<Receipt />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/bank-details" element={<BankDetails />} />
                <Route path="/kyc" element={<KYC />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/update-pin" element={<UpdatePin />} />
                <Route path="/two-factor" element={<TwoFactor />} />
                <Route path="/appearance" element={<Appearance />} />
                <Route path="/support" element={<Support />} />
                <Route path="/edit-profile" element={<EditProfile />} />
              </Route>
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="referrals" element={<AdminReferrals />} />
                <Route path="settings" element={<AdminSettings />} />
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
