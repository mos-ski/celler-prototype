# Celler — Gap Analysis

**Date:** April 3, 2026
**Version:** 0.1.0 (Prototype)

---

## 1. Missing Features

| ID | Feature | Severity | Description | Impact |
|----|---------|----------|-------------|--------|
| G-1 | **Backend API** | Critical | Zero server-side logic, database, or API endpoints | Product cannot function in production |
| G-2 | **Real Authentication** | Critical | No real auth server, JWT, or session management | No security, no user isolation |
| G-3 | **Admin Authentication** | Critical | Admin routes have no guards — anyone can access | Complete security breach |
| G-4 | **Buy Flow** | High | Routes `/buy` and `/sell` not defined; CoinDetail links to them | Broken user journey |
| G-5 | **Sell Flow** | High | Same as G-4 | Broken user journey |
| G-6 | **Real Price Feeds** | High | All crypto prices are hardcoded static values | No real market data |
| G-7 | **Blockchain Integration** | High | No wallet addresses, no real transactions, no blockchain interaction | Core feature non-functional |
| G-8 | **Payment Gateway** | High | No NGN deposit/withdrawal processing | Fiat operations non-functional |
| G-9 | **Email/SMS Service** | High | No real OTP delivery, no email notifications | Auth and notifications non-functional |
| G-10 | **Document Upload** | High | KYC document upload is UI only | KYC non-functional |
| G-11 | **Image Upload** | High | Gift card image upload is UI only | Gift card selling non-functional |
| G-12 | **Forgot Password** | Medium | Link exists but page not implemented | Users cannot recover accounts |
| G-13 | **Address Validation** | Medium | No crypto address format checking | Invalid addresses accepted |
| G-14 | **Withdrawal Limits** | Medium | KYC tier limits not enforced on withdrawals | Users can exceed limits |
| G-15 | **Pagination** | Medium | Transaction history has no pagination | Performance issues at scale |
| G-16 | **Export/Reports** | Medium | No CSV/PDF export for transactions or admin data | Limited auditability |
| G-17 | **Audit Trail** | Medium | No admin action logging | No accountability |
| G-18 | **Multi-role Admin** | Medium | Single hardcoded admin role | No separation of duties |
| G-19 | **Fraud Detection** | Medium | No duplicate card detection, no suspicious activity monitoring | Fraud risk |
| G-20 | **Portfolio Chart** | Low | No historical balance visualization | Reduced user experience |
| G-21 | **Bill Payments** | Low | Banner shows "coming soon" — not implemented | Missing feature |
| G-22 | **Live Chat Support** | Low | Support page has static links only | No real support channel |
| G-23 | **Push Notifications** | Low | No real push notification delivery | Notifications are static |
| G-24 | **Read/Unread Tracking** | Low | Notifications don't track read status | Poor UX |
| G-25 | **Offline Support** | Low | No caching or offline mode | App unusable without internet |

---

## 2. Broken Flows

| ID | Flow | Issue | Severity |
|----|------|-------|----------|
| B-1 | Buy crypto from dashboard | Route `/buy` not defined → 404 | High |
| B-2 | Sell crypto from dashboard | Route `/sell` not defined → 404 | High |
| B-3 | Buy crypto from CoinDetail | Route `/buy` not defined → 404 | High |
| B-4 | Sell crypto from CoinDetail | Route `/sell` not defined → 404 | High |
| B-5 | Forgot password from sign-in | No page exists | Medium |
| B-6 | Index.tsx page | File exists but not imported → dead code | Low |

---

## 3. Mocked/Placeholder Logic

| ID | Component | What's Mocked | Real Implementation Needed |
|----|-----------|---------------|---------------------------|
| M-1 | AuthContext | All auth operations | Real auth service with JWT |
| M-2 | All coin prices | Hardcoded static values | Real-time price API (CoinGecko, etc.) |
| M-3 | Swap execution | localStorage balance update | Real DEX/order book execution |
| M-4 | Withdrawal processing | localStorage balance deduction | Blockchain transaction + payment gateway |
| M-5 | Receive addresses | Static hardcoded addresses | Real address generation per user |
| M-6 | Transaction history | 8 pre-seeded mock transactions | Real transaction database |
| M-7 | Gift card processing | localStorage order store | Real order processing + fraud detection |
| M-8 | Referral tracking | Mock data in localStorage | Real attribution system |
| M-9 | KYC verification | UI only, no real verification | BVN check, ID verification, liveness |
| M-10 | Notifications | 4 hardcoded notifications | Real notification delivery system |
| M-11 | Admin data | All mock data in `adminMockData.ts` | Real database queries |
| M-12 | FaceID auth | 2-second timer | Real biometric API |
| M-13 | 2FA setup | Static QR code and secret | Real TOTP generation and verification |
| M-14 | OTP verification | Any 6-digit code accepted | Real OTP generation and validation |

---

## 4. Backend Gaps

| Gap | Description | Priority |
|-----|-------------|----------|
| No API Server | No Express, Fastify, or any backend framework | Critical |
| No Database | No PostgreSQL, MongoDB, or any database | Critical |
| No Auth Service | No Supabase, Firebase, Auth0, or custom auth | Critical |
| No Blockchain Integration | No Web3.js, ethers.js, or node connections | Critical |
| No Payment Processor | No Paystack, Flutterwave, or bank API | Critical |
| No File Storage | No S3, GCS, or file upload service | High |
| No Email Service | No SendGrid, Resend, or SMTP | High |
| No SMS Service | No Twilio, Termii, or SMS gateway | High |
| No WebSocket | No real-time communication layer | Medium |
| No Job Queue | No Redis, Bull, or background processing | Medium |
| No Monitoring | No Sentry, Datadog, or error tracking | Medium |
| No CDN | No CloudFront or image optimization | Low |

---

## 5. UX Inconsistencies

| ID | Issue | Location | Description |
|----|-------|----------|-------------|
| UX-1 | Swap fee discrepancy | `Swap.tsx` vs `feeConfig.ts` | Swap.tsx uses 0.2%, config says 0.8% |
| UX-2 | Title placeholder | `index.html` | Still says "Lovable App" |
| UX-3 | OpenGraph tags | `index.html` | Generic placeholder content |
| UX-4 | Dead dependency | `package.json` | `next-themes` installed but not used |
| UX-5 | Unused QueryClient | `main.tsx` | TanStack Query set up but never used |
| UX-6 | External image dependencies | `CoinIcon.tsx`, gift cards | Relies on cryptologos.cc and worldvectorlogo.com — potential broken images |
| UX-7 | No loading states | Most pages | No skeleton screens for data loading (except Dashboard/History) |
| UX-8 | No error boundaries | App.tsx | No React error boundary for graceful failure |

---

## 6. Classification Summary

| Severity | Count | Examples |
|----------|-------|----------|
| **Critical** | 3 | No backend, no real auth, no admin auth |
| **High** | 12 | Buy/sell missing, no price feeds, no blockchain, no payments |
| **Medium** | 8 | No address validation, no pagination, no audit trail |
| **Low** | 8 | No portfolio chart, no offline support, no read tracking |

**Total Gaps Identified: 31**
