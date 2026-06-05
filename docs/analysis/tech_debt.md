# Celler — Technical Debt Analysis

**Date:** April 3, 2026

---

## 1. Structural Issues

| ID | Issue | Location | Severity | Description | Recommended Fix |
|----|-------|----------|----------|-------------|-----------------|
| TD-1 | No API layer | Entire app | Critical | All data operations are localStorage-based with no abstraction for future API migration | Create service layer with API client interface; localStorage as fallback |
| TD-2 | No route guards for admin | `App.tsx` | Critical | Admin routes accessible to anyone | Add admin auth guard with role check |
| TD-3 | Monolithic store | `lib/crypto.ts` | High | Single file handles wallets, transactions, banks, beneficiaries, coins | Split into separate stores/modules |
| TD-4 | No error boundaries | `App.tsx` | High | No React error boundary | Add ErrorBoundary wrapper |
| TD-5 | Dead file | `pages/Index.tsx` | Low | Exists but not imported | Remove file |

---

## 2. Hardcoded Values

| ID | Value | Location | Severity | Description | Fix |
|----|-------|----------|----------|-------------|-----|
| TD-6 | Transaction PIN `1234` | `pages/Withdraw.tsx` | Critical | Hardcoded PIN used for auth | Hash and store user-set PIN |
| TD-7 | NGN_RATE `1410` | `lib/crypto.ts` | High | Fixed exchange rate | Fetch from API or admin-configurable |
| TD-8 | Coin prices | `lib/crypto.ts` | High | Static prices | Real-time price feed |
| TD-9 | Swap fee `0.2%` | `pages/Swap.tsx` | Medium | Differs from config (0.8%) | Use feeConfig consistently |
| TD-10 | Slippage `0.5%` | `pages/Swap.tsx` | Low | Hardcoded tolerance | Make configurable |
| TD-11 | 2FA secret `JBSWY3DPEHPK3PXP` | `pages/TwoFactor.tsx` | High | Static secret | Per-user TOTP secret |
| TD-12 | Crypto addresses | `pages/Receive.tsx` | High | Static deposit addresses | Per-user address generation |
| TD-13 | NGN deposit bank | `pages/Receive.tsx` | Medium | Hardcoded Wema Bank details | Configurable admin setting |
| TD-14 | Mock user data | `contexts/AuthContext.tsx` | Medium | `MOCK_USER` hardcoded | Remove in production |
| TD-15 | Admin user | Admin pages | Medium | Hardcoded "Jonathan Tumise" | Real admin auth |
| TD-16 | Withdrawal fees | `pages/Withdraw.tsx` | Medium | NGN=100, Crypto=$0.50 hardcoded | Use feeConfig |
| TD-17 | Referral reward `5000` | `lib/referral.ts` | Low | Hardcoded reward amount | Already in config, but also hardcoded in logic |
| TD-18 | Promo banners | `pages/Dashboard.tsx` | Low | 3 hardcoded banners | CMS-driven or admin-configurable |

---

## 3. Repeated Logic

| ID | Pattern | Locations | Description | Fix |
|----|---------|-----------|-------------|-----|
| TD-19 | NGN conversion | Multiple pages | `usd * 1410` repeated across components | Create `useCurrency()` hook |
| TD-20 | Number formatting | Multiple pages | `Intl.NumberFormat` repeated | Create `formatCurrency()` utility |
| TD-21 | localStorage key prefixes | All stores | `cex_` prefix repeated manually | Create `createStore()` factory |
| TD-22 | Coin icon URLs | `CoinIcon.tsx`, `Receive.tsx` | External URL construction duplicated | Centralize in coin config |

---

## 4. State Management Problems

| ID | Issue | Severity | Description | Fix |
|----|-------|----------|-------------|-----|
| TD-23 | No optimistic updates | Medium | All state changes are synchronous localStorage writes | Implement optimistic UI with rollback |
| TD-24 | No state synchronization | Medium | Multiple tabs would have stale data | Use `storage` event listener or BroadcastChannel |
| TD-25 | No state validation | Medium | localStorage data can be tampered with | Add schema validation on load |
| TD-26 | TanStack Query unused | Low | QueryClient created but no hooks consume it | Either use it or remove it |

---

## 5. Scalability Risks

| ID | Risk | Severity | Description | Mitigation |
|----|------|----------|-------------|------------|
| TD-27 | localStorage size limit | High | localStorage capped at ~5-10MB; will break with real transaction history | Migrate to indexedDB or server-side storage |
| TD-28 | No pagination | High | Transaction list renders all items at once | Implement virtualization or pagination |
| TD-29 | No lazy loading | Medium | All routes loaded upfront | Implement React.lazy() for route splitting |
| TD-30 | External image dependencies | Medium | cryptologos.cc and worldvectorlogo.com could go down | Self-host or cache images |
| TD-31 | No service worker | Low | No offline caching or PWA support | Add service worker for caching |

---

## 6. Security Risks

| ID | Risk | Severity | Description | Mitigation |
|----|------|----------|-------------|------------|
| TD-32 | Plaintext passwords in localStorage | Critical | Passwords stored as plain text | Hash passwords, never store in client |
| TD-33 | No CSRF protection | Critical | No token-based auth | Implement JWT with CSRF tokens |
| TD-34 | No input sanitization | High | User inputs not sanitized against XSS | Sanitize all user inputs |
| TD-35 | No rate limiting | High | No brute-force protection on login | Implement rate limiting on auth endpoints |
| TD-36 | Hardcoded PIN | Critical | `1234` is visible in source code | Remove and implement proper PIN system |
| TD-37 | No HTTPS enforcement | Medium | No mechanism to enforce secure connections | Enforce HTTPS in production |
| TD-38 | No Content Security Policy | Medium | No CSP headers | Add CSP headers |
| TD-39 | Admin route exposure | Critical | Anyone can access `/admin/*` | Add role-based route guards |

---

## 7. Code Quality Issues

| ID | Issue | Location | Severity | Description | Fix |
|----|-------|----------|----------|-------------|-----|
| TD-40 | Inconsistent error handling | Throughout | Medium | Some pages have error states, others don't | Standardize error handling pattern |
| TD-41 | Missing loading states | Most pages | Medium | Only Dashboard and History have skeleton loaders | Add loading states to all data-fetching pages |
| TD-42 | No TypeScript strict mode | `tsconfig.json` | Low | `strict` may not be fully enabled | Enable full strict mode |
| TD-43 | Dead dependencies | `package.json` | Low | `next-themes`, `cmdk`, `vaul`, `react-day-picker` unused | Remove unused dependencies |
| TD-44 | No CI/CD pipeline | N/A | Medium | No automated testing or deployment | Set up GitHub Actions or similar |
| TD-45 | Minimal test coverage | `src/test/` | Medium | Only `expect(true).toBe(true)` | Add meaningful unit and integration tests |

---

## 8. Actionable Fix Priority

| Priority | Items | Effort | Impact |
|----------|-------|--------|--------|
| **P0 — Immediate** | TD-6, TD-32, TD-36, TD-39 | 1-2 days | Eliminates critical security risks |
| **P1 — Sprint 1** | TD-1, TD-2, TD-4, TD-7, TD-8, TD-33, TD-35 | 1-2 weeks | Foundation for production readiness |
| **P2 — Sprint 2** | TD-3, TD-19, TD-20, TD-21, TD-27, TD-28, TD-34 | 1-2 weeks | Code quality and scalability |
| **P3 — Sprint 3** | TD-23, TD-24, TD-25, TD-29, TD-30, TD-40, TD-41 | 1 week | UX and performance improvements |
| **P4 — Ongoing** | TD-31, TD-37, TD-38, TD-42, TD-43, TD-44, TD-45 | Ongoing | Long-term quality and security |
