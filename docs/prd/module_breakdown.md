# Celler — Module Breakdown (Epics)

---

## EPIC 1: Authentication & Onboarding

**Description:** User registration, login, onboarding flow, and session management.

**Key Features:**
- Splash screen with auto-redirect
- Welcome carousel (3 slides)
- Sign In (email + password)
- Sign Up (4-step: email → OTP → password → success)
- Session persistence via localStorage

**Dependencies:** None (self-contained)

**Status: Mocked**

| Aspect | Detail |
|--------|--------|
| Auth Backend | None — localStorage only |
| Password Reset | Not implemented |
| Email Verification | Mock — any 6-digit OTP accepted |
| Session Security | None — no token expiry, no refresh |
| Auto-login | Yes — first visit creates mock user |

---

## EPIC 2: Wallet & Dashboard

**Description:** Main user-facing screen showing portfolio balance, quick actions, and asset list.

**Key Features:**
- Total portfolio balance (USD + NGN)
- Quick action buttons (Buy, Sell, Send, Receive, Swap, More)
- Asset list with balances and 24h change
- Promo banner carousel
- Manage visible assets
- Individual coin detail pages

**Dependencies:**
- `lib/crypto.ts` (wallet store, coin data)
- AuthContext (user identity)

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Price Feeds | Static/hardcoded |
| Buy Flow | Missing — route not defined |
| Sell Flow | Missing — route not defined |
| Real-time Updates | None |
| Portfolio Chart | None |

---

## EPIC 3: Crypto Swap

**Description:** Exchange one cryptocurrency for another with rate calculation and fee display.

**Key Features:**
- Coin pair selection (from/to)
- Real-time rate calculation
- Fee display (0.2% hardcoded)
- Slippage tolerance display (0.5%)
- Review screen before confirmation
- Success animation with transaction timeline

**Dependencies:**
- `lib/crypto.ts` (coin prices, wallet balances)
- AuthContext

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Swap Engine | Client-side calculation only |
| Rate Source | Hardcoded prices |
| Execution | Mock — updates localStorage |
| Slippage Handling | Display only, no real enforcement |

---

## EPIC 4: Withdrawal

**Description:** Multi-step withdrawal flow for crypto and NGN with authentication.

**Key Features:**
- Amount entry with custom numpad
- Recipient selection (crypto address or bank account)
- Review summary with fee breakdown
- Authentication step (FaceID mock or PIN)
- Success animation with timeline
- Beneficiary management

**Dependencies:**
- `lib/crypto.ts` (wallet, banks, beneficiaries)
- AuthContext

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Blockchain Integration | None |
| Bank Transfer Integration | None |
| PIN Security | Hardcoded `1234` |
| FaceID | Mock — 2-second timer |
| Address Validation | None |
| Withdrawal Limits | Not enforced |

---

## EPIC 5: Receive & Deposit

**Description:** Display deposit addresses (QR codes) for crypto and bank details for NGN.

**Key Features:**
- QR code display for crypto addresses
- Copy-to-clipboard for addresses
- NGN bank details display
- Network selection for multi-network coins

**Dependencies:**
- `lib/crypto.ts` (mock addresses)

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Address Generation | Static/hardcoded |
| Deposit Detection | None |
| QR Code Generation | Static images |
| Network Support | Display only |

---

## EPIC 6: Transaction History

**Description:** View, filter, and search all user transactions.

**Key Features:**
- Transaction list with type icons
- Filter by type (buy, sell, swap, deposit, withdraw, receive, send)
- Filter by status (completed, pending, failed)
- Search functionality
- Transaction detail view
- Receipt generation (printable/shareable)

**Dependencies:**
- `lib/crypto.ts` (transaction store)

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Data Source | 8 pre-seeded mock transactions |
| Pagination | None |
| Export | Receipt view only |
| Real-time Updates | None |

---

## EPIC 7: Gift Card Trading

**Description:** Sell gift cards for NGN payout with brand selection and rate tiers.

**Key Features:**
- Gift card marketplace (8 brands across categories)
- Sell flow: amount → upload card image → review → success
- Tiered rate structure (55-75% of face value)
- Order history
- Admin approval workflow

**Dependencies:**
- `data/giftcardData.ts` (brands, rates, order store)
- `lib/crypto.ts` (NGN wallet for payout)

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Image Upload | Mock — no actual upload |
| Rate Engine | Client-side calculation |
| Payout | Mock — credited to localStorage wallet |
| Fraud Detection | None |
| Admin Processing | Mock status updates |

---

## EPIC 8: Referral Program

**Description:** Earn NGN rewards for referring new users with withdrawal management.

**Key Features:**
- Referral code and shareable link
- Referral tracking (signed up, verified, traded)
- Earnings dashboard
- Withdrawal requests with weekly limit
- Referral history

**Dependencies:**
- `lib/referral.ts` (referral store, config)

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Referral Tracking | Mock data only |
| Link Generation | Static URL |
| Withdrawal Processing | Admin approval required (mock) |
| Weekly Limit | Enforced in client-side store |

---

## EPIC 9: KYC Verification

**Description:** 3-tier identity verification system with increasing transaction limits.

**Key Features:**
- Tier 1: BVN + Liveness Check (auto-approval)
- Tier 2: Government ID + Address Proof (auto-approval)
- Tier 3: Employment + Risk Assessment (manual approval)
- Tier limits display
- Verification status tracking

**Dependencies:**
- `data/kycConfig.ts` (tier limits)

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Document Upload | UI only, no real upload |
| Liveness Check | Not implemented |
| BVN Verification | Not implemented |
| Admin Review | Mock workflow |
| Limit Enforcement | Display only |

---

## EPIC 10: Profile & Security

**Description:** User profile management, security settings, and app preferences.

**Key Features:**
- Profile editing (name, username, phone)
- Password change
- Transaction PIN update
- 2FA setup
- Bank account management
- Appearance/theme settings
- Support & help

**Dependencies:**
- AuthContext
- `lib/crypto.ts` (user data, banks)

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Password Change | Form only, no validation against backend |
| PIN Update | 3-step flow, mock validation |
| 2FA Setup | Mock QR code and secret |
| Bank Management | localStorage only |
| Theme | Working (dark/light/system) |

---

## EPIC 11: Notifications

**Description:** In-app notification system for users and admin push notification composer.

**Key Features:**
- User notification list (4 hardcoded)
- Admin push notification composer
- Notification history (admin view)

**Dependencies:** None (fully mocked)

**Status: Mocked**

| Aspect | Detail |
|--------|--------|
| Delivery System | None |
| Real-time | None |
| Push Integration | None |
| Read/Unread | Not tracked |

---

## EPIC 12: Admin Dashboard

**Description:** Platform management interface for monitoring users, transactions, and system settings.

**Key Features:**
- Overview dashboard with stats and revenue chart
- Customer management (list, detail, KYC status)
- Transaction/order monitoring
- Gift card order approval/rejection
- Referral management and configuration
- KYC approval queue
- Push notification composer
- System settings (fees, KYC limits, referral config)

**Dependencies:**
- `data/adminMockData.ts` (all mock data)
- All data stores (read access)

**Status: Partial**

| Aspect | Detail |
|--------|--------|
| Admin Auth | None — no guards |
| Real-time Data | None |
| Action Execution | Mock — no real effects |
| Audit Trail | None |
| Role Management | Single hardcoded admin |
| Fraud Detection | None |

---

## Module Dependency Map

```
AuthContext ──┬── Dashboard
              ├── Swap
              ├── Withdraw
              ├── Profile
              ├── All User Pages
              └── AppLayout (route guard)

crypto.ts ────┬── Dashboard
              ├── Swap
              ├── Withdraw
              ├── Receive
              ├── History
              ├── CoinDetail
              ├── TransactionDetail
              ├── Receipt
              ├── BankDetails
              └── GiftcardSell (NGN payout)

referral.ts ──┬── Referral (user)
              └── AdminReferrals

giftcardData ─┬── Giftcards
              ├── GiftcardSell
              ├── GiftcardOrders (user)
              └── AdminGiftcardOrders

kycConfig ────┬── KYC (user)
              └── AdminKYC

feeConfig ────┬── Swap
              ├── Withdraw
              └── AdminSettings

adminMockData ─── All Admin Pages
```
