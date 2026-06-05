# Celler — QA & QC Test Cases

**Date:** April 3, 2026
**Version:** 0.1.0 (Prototype)
**Test Environment:** Browser (Chrome, Safari, Firefox)
**Note:** All tests are against the frontend prototype with mocked data. Backend-dependent tests are marked as Pending.

---

## 1. Authentication Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| AUTH-01 | Splash screen displays and redirects | High | App not yet opened | 1. Open app URL | Splash screen with Celler logo displays for 2.5s, then redirects | | Pending |
| AUTH-02 | First-time auto-login creates mock user | High | No localStorage data | 1. Clear localStorage<br>2. Open app<br>3. Wait for redirect | Auto-creates mock user, redirects to dashboard | | Pending |
| AUTH-03 | Sign in with valid credentials | High | Mock user exists | 1. Navigate to /signin<br>2. Enter demo@celler.app<br>3. Enter demo123<br>4. Click Sign In | Redirects to /dashboard | | Pending |
| AUTH-04 | Sign in with wrong password | High | Mock user exists | 1. Navigate to /signin<br>2. Enter demo@celler.app<br>3. Enter wrongpass<br>4. Click Sign In | Shows error message | | Pending |
| AUTH-05 | Sign in with empty fields | Medium | On /signin | 1. Leave fields empty<br>2. Click Sign In | Shows validation errors | | Pending |
| AUTH-06 | Sign up — email step | High | On /signup | 1. Enter valid email<br>2. Click Continue | Proceeds to OTP step | | Pending |
| AUTH-07 | Sign up — OTP step | High | On OTP step | 1. Enter any 6-digit code<br>2. Click Continue | Proceeds to password step | | Pending |
| AUTH-08 | Sign up — OTP with < 6 digits | Medium | On OTP step | 1. Enter 5-digit code | Continue button disabled or shows error | | Pending |
| AUTH-09 | Sign up — weak password | High | On password step | 1. Enter "password" (no uppercase, no special char)<br>2. Click Continue | Shows password requirements not met | | Pending |
| AUTH-10 | Sign up — password mismatch | High | On password step | 1. Enter valid password<br>2. Enter different confirm password | Shows "Passwords do not match" | | Pending |
| AUTH-11 | Sign up — valid flow | High | On /signup | 1. Complete all 4 steps with valid data | Account created, success shown, redirected | | Pending |
| AUTH-12 | Session persistence | High | Logged in | 1. Log in<br>2. Close tab<br>3. Reopen app | Automatically on dashboard | | Pending |
| AUTH-13 | Logout | High | Logged in | 1. Go to Profile<br>2. Click Log Out | Session cleared, redirected to /signin | | Pending |
| AUTH-14 | Auth guard redirects unauthenticated | High | Not logged in | 1. Clear localStorage<br>2. Navigate to /dashboard | Redirects to /signin | | Pending |

---

## 2. Wallet & Dashboard Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| WAL-01 | Dashboard loads with balance | High | Logged in | 1. Navigate to /dashboard | Total balance in USD and NGN displayed | | Pending |
| WAL-02 | Asset list displays correctly | High | Logged in | 1. Navigate to /dashboard | All coins with balances, icons, values shown | | Pending |
| WAL-03 | Quick action buttons navigate | High | On dashboard | 1. Tap each quick action button | Each navigates to correct page | | Pending |
| WAL-04 | Quick action — Buy button | High | On dashboard | 1. Tap "Buy" button | Should navigate to buy page (currently 404) | | **Expected Fail** |
| WAL-05 | Quick action — Sell button | High | On dashboard | 1. Tap "Sell" button | Should navigate to sell page (currently 404) | | **Expected Fail** |
| WAL-06 | Manage assets — toggle coin | Medium | On dashboard | 1. Tap "Manage Assets"<br>2. Toggle a coin off<br>3. Return to dashboard | Toggled coin no longer visible | | Pending |
| WAL-07 | Manage assets — persistence | Medium | On dashboard | 1. Toggle coins<br>2. Refresh page | Preferences persist | | Pending |
| WAL-08 | Coin detail navigation | High | On dashboard | 1. Tap on BTC coin | Navigates to /coin/BTC with details | | Pending |
| WAL-09 | Coin detail — buy/sell links | Medium | On /coin/BTC | 1. Tap Buy or Sell button | Currently 404 | | **Expected Fail** |
| WAL-10 | Promo banner carousel | Low | On dashboard | 1. View promo banners | 3 banners rotate or are swipeable | | Pending |
| WAL-11 | Mobile bottom navigation | High | Mobile viewport | 1. Resize to < 768px | Bottom tab nav visible with Home, Swap, History, Profile | | Pending |
| WAL-12 | Desktop sidebar navigation | High | Desktop viewport | 1. Resize to > 768px | Left sidebar visible with nav links | | Pending |

---

## 3. Swap Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| SWAP-01 | Swap page loads | High | Logged in | 1. Navigate to /swap | Swap UI with from/to selectors displayed | | Pending |
| SWAP-02 | Coin selection | High | On /swap | 1. Tap from coin selector<br>2. Search and select ETH | ETH shown as from coin | | Pending |
| SWAP-03 | Rate calculation | High | On /swap | 1. Select BTC→ETH<br>2. Enter 0.001 BTC | Calculated ETH amount displayed | | Pending |
| SWAP-04 | Fee display | Medium | On /swap | 1. Enter amount | Fee amount and percentage shown | | Pending |
| SWAP-05 | Insufficient balance | High | On /swap | 1. Enter amount exceeding balance | Error shown, confirm disabled | | Pending |
| SWAP-06 | Same coin selection | Medium | On /swap | 1. Select BTC for both from and to | Prevented or shows error | | Pending |
| SWAP-07 | Swap confirmation | High | On /swap | 1. Enter valid swap<br>2. Review<br>3. Confirm | Success animation, wallet updated | | Pending |
| SWAP-08 | Wallet update after swap | High | After swap | 1. Check dashboard | From coin decreased, to coin increased | | Pending |
| SWAP-09 | Transaction recorded | High | After swap | 1. Check history | New swap transaction appears | | Pending |
| SWAP-10 | Zero amount | Low | On /swap | 1. Enter 0 amount | Confirm disabled | | Pending |

---

## 4. Withdrawal Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| WDR-01 | Withdrawal page loads | High | Logged in | 1. Navigate to /withdraw/BTC | Withdrawal UI with amount input | | Pending |
| WDR-02 | Amount entry with numpad | High | On withdrawal | 1. Enter amount using custom numpad | Amount displayed correctly | | Pending |
| WDR-03 | Crypto address input | High | On withdrawal | 1. Enter crypto address<br>2. Proceed | Address accepted, review shown | | Pending |
| WDR-04 | Bank selection for NGN | High | On /withdraw/NGN | 1. Select linked bank account | Bank details shown in review | | Pending |
| WDR-05 | Fee display | Medium | On withdrawal | 1. Enter amount | Fee shown (NGN: 100, Crypto: $0.50) | | Pending |
| WDR-06 | Review summary | High | On withdrawal | 1. Complete amount + recipient | Full summary with amount, fee, total shown | | Pending |
| WDR-07 | FaceID authentication | Medium | On auth step | 1. Select FaceID | 2-second scan animation, then success | | Pending |
| WDR-08 | PIN authentication — correct | High | On auth step | 1. Select PIN<br>2. Enter 1234 | Withdrawal proceeds | | Pending |
| WDR-09 | PIN authentication — wrong | High | On auth step | 1. Select PIN<br>2. Enter wrong PIN | Error shown, retry allowed | | Pending |
| WDR-10 | Insufficient balance | High | On withdrawal | 1. Enter amount > balance | Error shown, cannot proceed | | Pending |
| WDR-11 | Success animation | Medium | After auth | 1. Complete withdrawal | Animated timeline with success state | | Pending |
| WDR-12 | Wallet balance updated | High | After withdrawal | 1. Check dashboard | Balance reduced by amount + fee | | Pending |

---

## 5. Receive & Deposit Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| RCV-01 | Crypto receive page | High | Logged in | 1. Navigate to /receive/BTC | QR code and address displayed | | Pending |
| RCV-02 | Copy address | Medium | On /receive/BTC | 1. Tap copy button | Address copied to clipboard | | Pending |
| RCV-03 | NGN receive page | High | Logged in | 1. Navigate to /receive/NGN | Bank details displayed | | Pending |
| RCV-04 | Copy account number | Medium | On /receive/NGN | 1. Tap copy on account number | Number copied to clipboard | | Pending |
| RCV-05 | Network selection | Low | On /receive/ETH | 1. View network options | Network info displayed | | Pending |

---

## 6. Transaction History Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| TXN-01 | History page loads | High | Logged in | 1. Navigate to /history | Transaction list displayed | | Pending |
| TXN-02 | Filter by type | High | On /history | 1. Select "swap" filter | Only swap transactions shown | | Pending |
| TXN-03 | Filter by status | Medium | On /history | 1. Select "completed" filter | Only completed transactions shown | | Pending |
| TXN-04 | Search transactions | Medium | On /history | 1. Enter search term | Matching transactions filtered | | Pending |
| TXN-05 | Transaction detail | High | On /history | 1. Tap a transaction | Detail page with full info shown | | Pending |
| TXN-06 | Receipt view | Medium | On transaction detail | 1. Tap "View Receipt" | Receipt with zigzag design shown | | Pending |
| TXN-07 | Empty state | Low | No transactions | 1. Clear all transactions | Empty state with CTA shown | | Pending |

---

## 7. Gift Card Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| GC-01 | Gift card marketplace loads | High | Logged in | 1. Navigate to /giftcards | Brand grid displayed by category | | Pending |
| GC-02 | Select brand | High | On /giftcards | 1. Tap Amazon brand | Navigates to sell page for Amazon | | Pending |
| GC-03 | Amount and tier selection | High | On sell page | 1. Enter amount<br>2. Select tier | NGN payout calculated correctly | | Pending |
| GC-04 | Payout calculation | High | On sell page | 1. Enter $100 Amazon card at 70% rate | NGN = 100 × 0.70 × 1410 = 98,700 | | Pending |
| GC-05 | Order submission | High | On sell page | 1. Complete all steps<br>2. Submit | Order created with "pending" status | | Pending |
| GC-06 | Order history | High | After order | 1. Navigate to /giftcard-orders | Order appears in list | | Pending |
| GC-07 | Admin approval flow | High | Admin access | 1. Go to /admin/giftcard-orders<br>2. Approve pending order | Order status changes to "approved" | | Pending |
| GC-08 | NGN payout on approval | High | After admin approval | 1. Check user NGN balance | NGN increased by payout amount | | Pending |

---

## 8. Referral Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| REF-01 | Referral page loads | High | Logged in | 1. Navigate to /referral | Referral code, link, earnings displayed | | Pending |
| REF-02 | Copy referral code | Medium | On /referral | 1. Tap copy on code | Code copied to clipboard | | Pending |
| REF-03 | Copy referral link | Medium | On /referral | 1. Tap copy on link | Link copied to clipboard | | Pending |
| REF-04 | Withdrawal request | High | On /referral | 1. Request withdrawal within limit | Request submitted with "pending" status | | Pending |
| REF-05 | Weekly limit enforcement | High | On /referral | 1. Request withdrawal exceeding 10,000 NGN | Error shown, request blocked | | Pending |

---

## 9. KYC Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| KYC-01 | KYC page loads | High | Logged in | 1. Navigate to /kyc | 3 tiers displayed with limits | | Pending |
| KYC-02 | Tier limits display | Medium | On /kyc | 1. View each tier | Correct limits shown per tier config | | Pending |
| KYC-03 | KYC submission | Medium | On /kyc | 1. Select tier<br>2. Submit documents | Submission recorded (mock) | | Pending |

---

## 10. Profile & Security Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| PROF-01 | Profile page loads | High | Logged in | 1. Navigate to /profile | Profile card and settings links shown | | Pending |
| PROF-02 | Edit profile | Medium | On /edit-profile | 1. Update name/username/phone<br>2. Save | Changes saved and reflected | | Pending |
| PROF-03 | Update password | Medium | On /update-password | 1. Enter current + new password<br>2. Save | Password updated | | Pending |
| PROF-04 | Update PIN | High | On /update-pin | 1. Enter current PIN (1234)<br>2. Enter new PIN<br>3. Confirm new PIN | PIN updated | | Pending |
| PROF-05 | Update PIN — mismatch | Medium | On /update-pin | 1. Enter different confirm PIN | Error shown | | Pending |
| PROF-06 | 2FA setup | Medium | On /two-factor | 1. View QR code and secret | QR code and secret displayed | | Pending |
| PROF-07 | Theme switching | High | On /appearance | 1. Select dark/light/system | Theme changes immediately | | Pending |
| PROF-08 | Theme persistence | Medium | After theme change | 1. Change theme<br>2. Refresh | Theme persists | | Pending |
| PROF-09 | Bank account management | Medium | On /bank-details | 1. Add new bank account | Account added to list | | Pending |

---

## 11. Admin Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| ADM-01 | Admin dashboard loads | High | Navigate to /admin | 1. Open /admin | Stats, chart, recent orders displayed | | Pending |
| ADM-02 | Customer list | High | On /admin | 1. Navigate to /admin/customers | Customer list with tabs displayed | | Pending |
| ADM-03 | Customer detail | High | On customers | 1. Tap a customer | Detail page with profile, KYC, wallet shown | | Pending |
| ADM-04 | Transaction monitoring | High | On /admin | 1. Navigate to /admin/orders | All orders with type tabs displayed | | Pending |
| ADM-05 | Gift card order approval | High | On /admin/giftcard-orders | 1. View pending orders<br>2. Approve one | Status changes, NGN credited | | Pending |
| ADM-06 | Referral management | Medium | On /admin/referrals | 1. View withdrawal requests<br>2. Approve one | Status changes to approved | | Pending |
| ADM-07 | KYC approvals | High | On /admin/kyc | 1. View pending KYC<br>2. Approve one | KYC status updated | | Pending |
| ADM-08 | Push notification composer | Medium | On /admin/notifications | 1. Compose notification<br>2. Send | Recorded in history | | Pending |
| ADM-09 | System settings — fees | High | On /admin/settings | 1. Update fee percentages<br>2. Save | Changes saved to localStorage | | Pending |
| ADM-10 | System settings — KYC limits | Medium | On /admin/settings | 1. Update KYC tier limits<br>2. Save | Changes reflected in user KYC page | | Pending |
| ADM-11 | System settings — referral config | Medium | On /admin/settings | 1. Update reward amount<br>2. Save | Changes reflected in referral page | | Pending |
| ADM-12 | Admin access without auth | Critical | Not logged in | 1. Navigate to /admin | Currently accessible (security gap) | | **Expected Pass (as bug)** |

---

## 12. Notifications Module

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| NOT-01 | Notifications page loads | Medium | Logged in | 1. Navigate to /notifications | 4 notifications displayed | | Pending |
| NOT-02 | Notification content | Low | On /notifications | 1. View each notification | Title, description, timestamp shown | | Pending |

---

## 13. Edge Cases & Error Handling

| TC-ID | Title | Priority | Preconditions | Test Steps | Expected Result | Actual | Status |
|-------|-------|----------|---------------|------------|-----------------|--------|--------|
| EDGE-01 | 404 page | High | Logged in | 1. Navigate to /nonexistent | 404 page displayed | | Pending |
| EDGE-02 | External image failure | Medium | Any page | 1. Block cryptologos.cc domain | Fallback placeholder shown | | Pending |
| EDGE-03 | localStorage cleared | High | Logged in | 1. Clear localStorage<br>2. Refresh | Treated as new user, auto-login | | Pending |
| EDGE-04 | Rapid navigation | Low | Logged in | 1. Rapidly click nav links | No crashes or race conditions | | Pending |
| EDGE-05 | Mobile viewport | High | Any page | 1. Resize to 375px width | Responsive layout, no overflow | | Pending |
| EDGE-06 | Desktop viewport | High | Any page | 1. Resize to 1440px width | Sidebar layout, no overflow | | Pending |

---

## 14. Smoke Test Suite

Run these tests on every build to verify core functionality:

| # | Test | Expected |
|---|------|----------|
| 1 | App loads at / | Splash → redirect works |
| 2 | Sign in with demo@celler.app / demo123 | Dashboard loads |
| 3 | Dashboard shows balance | Balance > 0 |
| 4 | Navigate to /swap | Swap page loads |
| 5 | Navigate to /history | Transaction list loads |
| 6 | Navigate to /profile | Profile page loads |
| 7 | Navigate to /giftcards | Gift card grid loads |
| 8 | Navigate to /referral | Referral page loads |
| 9 | Navigate to /kyc | KYC page loads |
| 10 | Navigate to /admin | Admin dashboard loads |
| 11 | Logout | Redirects to /signin |
| 12 | 404 page | /nonexistent shows 404 |

---

## 15. Regression Test Scenarios

| # | Scenario | Priority | Description |
|---|----------|----------|-------------|
| REG-01 | Swap fee consistency | High | Verify swap fee matches config after admin settings change |
| REG-02 | Balance accuracy | High | Verify all wallet operations maintain accurate balances |
| REG-03 | Theme persistence | Medium | Verify theme persists across page refreshes |
| REG-04 | Session persistence | High | Verify login persists across browser sessions |
| REG-05 | Gift card rate calculation | High | Verify payout calculation is correct for all tiers |
| REG-06 | Referral weekly limit | High | Verify weekly limit enforcement after week boundary |
| REG-07 | Admin settings propagation | Medium | Verify admin fee changes reflect in user app |
