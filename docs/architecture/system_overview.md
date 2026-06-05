# Celler — System Architecture Overview

## 1. Project Classification

**Type:** Frontend Prototype (Single Page Application)
**Intended:** Full-stack Crypto Exchange Platform
**Current Reality:** 100% client-side, zero backend

---

## 2. Current Architecture

```
┌────────────────────────────────────────────────────────────┐
│                      Browser (Client)                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React SPA (Vite 5)                       │  │
│  │                                                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │  Pages (28) │  │ Components   │  │  Contexts   │ │  │
│  │  │             │  │  (35+)       │  │  (2)        │ │  │
│  │  └──────┬──────┘  └──────┬───────┘  └──────┬──────┘ │  │
│  │         └────────────────┼─────────────────┘        │  │
│  │                          │                          │  │
│  │  ┌───────────────────────┴───────────────────────┐  │  │
│  │  │         localStorage Stores                    │  │  │
│  │  │  ┌─────────┐ ┌──────────┐ ┌────────────────┐ │  │  │
│  │  │  │ crypto  │ │referral  │ │ giftcard/fee/  │ │  │  │
│  │  │  │ store   │ │ store    │ │ kyc stores     │ │  │  │
│  │  │  └─────────┘ └──────────┘ └────────────────┘ │  │  │
│  │  └───────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology |
|-------|------------|
| Build Tool | Vite 5.4.19 |
| Framework | React 18.3.1 |
| Language | TypeScript 5.8.3 |
| Styling | Tailwind CSS 3.4.17 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Routing | React Router 6.30.1 |
| State | React Context + localStorage |
| Forms | React Hook Form + Zod |
| Charts | Recharts 2.15.4 |
| Icons | Lucide React 0.462.0 |
| Testing | Vitest 3.2.4 + Testing Library |
| Package Manager | Bun (bun.lock) / npm |

---

## 3. Intended Production Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                          │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  React SPA + TanStack Query (real API data fetching)       │  │
│  │  + WebSocket (real-time price/balance updates)             │  │
│  └────────────────────────┬───────────────────────────────────┘  │
└───────────────────────────┼──────────────────────────────────────┘
                            │ HTTPS / REST API + WebSocket
                            ▼
┌───────────────────────────────────────────────────────────────────┐
│                          API Gateway                               │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Rate Limiting | Auth Validation | Request Routing          │  │
│  └────────────────────────┬────────────────────────────────────┘  │
└───────────────────────────┼───────────────────────────────────────┘
                            │
┌───────────────────────────┼───────────────────────────────────────┐
│                       Microservices                                │
│  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌─────────────────────┐ │
│  │   Auth   │ │  Wallet  │ │  Trading  │ │  Notification       │ │
│  │ Service  │ │ Service  │ │  Engine   │ │  Service            │ │
│  └────┬─────┘ └────┬─────┘ └─────┬─────┘ └──────────┬──────────┘ │
│       │             │             │                   │            │
│  ┌────┴─────┐ ┌────┴─────┐ ┌────┴─────┐ ┌──────────┴──────────┐ │
│  │   Admin  │ │   KYC    │ │  Gift   │ │   Referral          │ │
│  │ Service  │ │ Service  │ │  Card   │ │   Service           │ │
│  └──────────┘ └──────────┘ └─────────┘ └─────────────────────┘ │
└───────────────────────────┬───────────────────────────────────────┘
                            │
┌───────────────────────────┼───────────────────────────────────────┐
│                        Data Layer                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │  PostgreSQL  │  │  Redis       │  │  Blockchain Node/Provider│ │
│  │  (Users,     │  │  (Sessions,  │  │  (BTC, ETH, SOL, etc.)   │ │
│  │   Tx, KYC)   │  │   Cache)     │  │                          │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │  Payment     │  │  Email/SMS   │  │  Cloud Storage           │ │
│  │  Gateway     │  │  Provider    │  │  (KYC docs, GC images)   │ │
│  │  (NGN)       │  │  (OTP, Notif)│  │  (S3/GCS)                │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

---

## 4. Route Architecture

### Public Routes (No Auth)
| Route | Component | Auth Required |
|-------|-----------|---------------|
| `/` | Splash | No |
| `/welcome` | Welcome | No |
| `/signin` | SignIn | No |
| `/signup` | SignUp | No |

### Authenticated User Routes
| Route | Component | Auth Required |
|-------|-----------|---------------|
| `/dashboard` | Dashboard | Yes |
| `/swap` | Swap | Yes |
| `/history` | History | Yes |
| `/profile` | Profile | Yes |
| `/coin/:coinId` | CoinDetail | Yes |
| `/notifications` | Notifications | Yes |
| `/withdraw/:coinId` | Withdraw | Yes |
| `/receive/:coinId` | Receive | Yes |
| `/manage-assets` | ManageAssets | Yes |
| `/transaction/:txId` | TransactionDetail | Yes |
| `/receipt/:txId` | Receipt | Yes |
| `/referral` | Referral | Yes |
| `/bank-details` | BankDetails | Yes |
| `/kyc` | KYC | Yes |
| `/update-password` | UpdatePassword | Yes |
| `/update-pin` | UpdatePin | Yes |
| `/two-factor` | TwoFactor | Yes |
| `/appearance` | Appearance | Yes |
| `/support` | Support | Yes |
| `/edit-profile` | EditProfile | Yes |
| `/giftcards` | Giftcards | Yes |
| `/giftcard/sell/:brandId` | GiftcardSell | Yes |
| `/giftcard-orders` | GiftcardOrders | Yes |

### Admin Routes
| Route | Component | Auth Required |
|-------|-----------|---------------|
| `/admin` | AdminDashboard | No (should be Yes) |
| `/admin/customers` | AdminCustomers | No (should be Yes) |
| `/admin/customers/:customerId` | AdminCustomerDetail | No (should be Yes) |
| `/admin/orders` | AdminTransactions | No (should be Yes) |
| `/admin/transactions` | AdminTransactions | No (should be Yes) |
| `/admin/giftcard-orders` | AdminGiftcardOrders | No (should be Yes) |
| `/admin/referrals` | AdminReferrals | No (should be Yes) |
| `/admin/kyc` | AdminKYC | No (should be Yes) |
| `/admin/notifications` | AdminPushNotifications | No (should be Yes) |
| `/admin/settings` | AdminSettings | No (should be Yes) |

### 404
| Route | Component |
|-------|-----------|
| `*` | NotFound |

---

## 5. Data Flow

### Current (Mock)
```
User Action → Component → localStorage Store → State Update → Re-render
```

### Intended (Production)
```
User Action → Component → TanStack Query mutation → API → Service → Database
                                                              ↓
User Action ← Component ← TanStack Query cache ← API ← Service
```

---

## 6. State Management Architecture

| Store | Location | Data | Persistence |
|-------|----------|------|-------------|
| AuthContext | `src/contexts/AuthContext.tsx` | User, isLoggedIn | localStorage (`cex_user`, `cex_logged_in`) |
| ThemeContext | `src/contexts/ThemeContext.tsx` | Theme mode | localStorage (`cex_theme`) |
| Crypto Store | `src/lib/crypto.ts` | Wallet, transactions, coins, banks, beneficiaries | localStorage (`cex_wallet`, `cex_transactions`, `cex_visible_coins`, `cex_banks`, `cex_beneficiaries`) |
| Referral Store | `src/lib/referral.ts` | Referrals, withdrawals, config | localStorage (`cex_referrals`, `cex_referral_withdrawals`, `cex_referral_config`) |
| Giftcard Store | `src/data/giftcardData.ts` | Orders | localStorage (`cex_giftcard_orders`) |
| Fee Store | `src/data/feeConfig.ts` | Fee percentages | localStorage (`cex_fee_config`) |
| KYC Config | `src/data/kycConfig.ts` | Tier limits | localStorage (`cex_kyc_config`) |

---

## 7. Third-Party Dependencies

### Active Dependencies
| Package | Purpose |
|---------|---------|
| `react-router-dom` | Client-side routing |
| `lucide-react` | Icon library |
| `@radix-ui/*` | Headless UI primitives |
| `react-hook-form` + `zod` | Form validation |
| `recharts` | Charts (admin dashboard) |
| `sonner` | Toast notifications |
| `input-otp` | OTP input |
| `class-variance-authority` | Component variants |
| `clsx` + `tailwind-merge` | CSS class merging |

### Dead/Unused Dependencies
| Package | Status | Notes |
|---------|--------|-------|
| `@tanstack/react-query` | Unused | QueryClient created, no hooks used |
| `next-themes` | Unused | Custom ThemeContext used instead |
| `embla-carousel-react` | Unused | shadcn/ui carousel not actively used |
| `cmdk` | Unused | Command palette not implemented |
| `react-day-picker` | Unused | Calendar not used in any page |
| `vaul` | Unused | Drawer not used |
| `date-fns` | Minimal | Imported but rarely used |

---

## 8. Security Architecture (Current vs Intended)

| Aspect | Current | Intended |
|--------|---------|----------|
| Authentication | localStorage mock | JWT + refresh tokens |
| Authorization | None | Role-based access control |
| Password Storage | Plaintext in localStorage | bcrypt/argon2 hash |
| Session Management | Boolean flag | JWT with expiry |
| PIN Storage | Hardcoded `1234` | Hashed, user-set |
| API Security | N/A (no API) | HTTPS, rate limiting, CORS |
| Data Encryption | None | TLS in transit, encryption at rest |
| Admin Access | No guards | Separate admin auth + RBAC |
