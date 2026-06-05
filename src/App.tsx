import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppLayout from "@/components/AppLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import AndroidLayout from "@/components/android/AndroidLayout";
import AndroidSplash from "./pages/android/Splash";
import AndroidHome from "./pages/android/Home";
import AndroidHistory from "./pages/android/History";
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
import Giftcards from "./pages/Giftcards";
import GiftcardBuy from "./pages/GiftcardBuy";
import GiftcardSell from "./pages/GiftcardSell";
import GiftcardOrders from "./pages/GiftcardOrders";
import Bills from "./pages/Bills";
import BillPay from "./pages/BillPay";
import Worldcup from "./pages/Worldcup";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCustomers from "./pages/admin/Customers";
import AdminCustomerDetail from "./pages/admin/CustomerDetail";
import AdminTransactions from "./pages/admin/Orders";
import AdminGiftcardOrders from "./pages/admin/GiftcardOrders";
import AdminReferrals from "./pages/admin/Referrals";
import AdminSettings from "./pages/admin/Settings";
import AdminKYC from "./pages/admin/KYC";
import AdminPushNotifications from "./pages/admin/PushNotifications";

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
                <Route path="/giftcards" element={<Giftcards />} />
                <Route path="/giftcard/buy/:brandId" element={<GiftcardBuy />} />
                <Route path="/giftcard/sell/:brandId" element={<GiftcardSell />} />
                <Route path="/giftcard-orders" element={<GiftcardOrders />} />
                <Route path="/bills" element={<Bills />} />
                <Route path="/bills/:category" element={<BillPay />} />
                <Route path="/worldcup" element={<Worldcup />} />
              </Route>
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="customers/:customerId" element={<AdminCustomerDetail />} />
                <Route path="orders" element={<AdminTransactions />} />
                <Route path="transactions" element={<AdminTransactions />} />
                <Route path="giftcard-orders" element={<AdminGiftcardOrders />} />
                <Route path="referrals" element={<AdminReferrals />} />
                <Route path="kyc" element={<AdminKYC />} />
                <Route path="notifications" element={<AdminPushNotifications />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              {/* Android / Zella bill payment version — all routes prefixed /a/* */}
              <Route path="/a" element={<AndroidSplash />} />
              <Route path="/a/welcome" element={<Welcome />} />
              <Route path="/a/signin" element={<SignIn />} />
              <Route path="/a/signup" element={<SignUp />} />
              <Route path="/a/two-factor" element={<TwoFactor />} />
              <Route element={<AndroidLayout />}>
                <Route path="/a/home" element={<AndroidHome />} />
                <Route path="/a/bills" element={<Bills />} />
                <Route path="/a/bills/:category" element={<BillPay />} />
                <Route path="/a/history" element={<AndroidHistory />} />
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
                <Route path="/a/appearance" element={<Appearance />} />
                <Route path="/a/support" element={<Support />} />
                <Route path="/a/edit-profile" element={<EditProfile />} />
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
