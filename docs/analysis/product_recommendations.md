# Celler — Product Recommendations

**Date:** April 3, 2026

---

## 1. UX Improvements

| ID | Recommendation | Impact | Effort | Description |
|----|---------------|--------|--------|-------------|
| UX-R1 | Add loading skeleton screens to all pages | High | Low | Only Dashboard and History have skeletons. Add to Swap, Withdraw, Profile, etc. |
| UX-R2 | Fix swap fee discrepancy | High | Low | Swap.tsx shows 0.2% but config says 0.8%. Use config consistently. |
| UX-R3 | Implement error boundaries | High | Medium | Wrap app in React ErrorBoundary to prevent white screens on crashes |
| UX-R4 | Add pull-to-refresh on lists | Medium | Medium | Dashboard, History, Gift Card Orders should support pull-to-refresh |
| UX-R5 | Improve empty states | Medium | Low | Add helpful CTAs when no transactions, no referrals, no notifications |
| UX-R6 | Add confirmation dialogs for destructive actions | High | Low | Logout, bank account removal, referral withdrawal should confirm |
| UX-R7 | Implement toast notifications for all actions | Medium | Medium | Currently only admin pages use sonner. Extend to user actions |
| UX-R8 | Add haptic feedback indicators | Low | Low | Visual feedback for button presses on mobile |

---

## 2. Feature Enhancements

| ID | Recommendation | Impact | Effort | Description |
|----|---------------|--------|--------|-------------|
| FE-R1 | Portfolio performance chart | High | Medium | Show balance history over 7d/30d/90d/1y |
| FE-R2 | Price alerts | Medium | Medium | Let users set alerts for coin price thresholds |
| FE-R3 | Recurring buys (DCA) | High | High | Dollar-cost averaging for automated purchases |
| FE-R4 | Watchlist | Medium | Low | Let users track coins without holding them |
| FE-R5 | Transaction categories/tags | Low | Medium | Let users categorize transactions for tracking |
| FE-R6 | Biometric login | Medium | Medium | FaceID/TouchID for quick app access |
| FE-R7 | Dark mode auto-schedule | Low | Low | Auto-switch theme based on time of day |
| FE-R8 | Multi-language support | Medium | High | Yoruba, Hausa, Igbo alongside English |

---

## 3. Monetization Opportunities

| ID | Recommendation | Revenue Potential | Effort | Description |
|----|---------------|-------------------|--------|-------------|
| MON-R1 | Tiered fee structure | High | Medium | Lower fees for higher-volume traders to incentivize activity |
| MON-R2 | Premium subscription | High | High | Monthly fee for zero-fee trades, priority support, higher limits |
| MON-R3 | Gift card margin optimization | Medium | Low | Dynamic rates based on demand and supply |
| MON-R4 | Referral bonus for admin | Medium | Low | Admin-configurable referral rewards to optimize CAC |
| MON-R5 | API access for businesses | High | High | B2B API for merchants to accept crypto payments |
| MON-R6 | Staking yield spread | Medium | High | Offer staking with a small platform fee on yields |
| MON-R7 | Cross-sell insurance | Low | High | Partner with crypto insurance providers |

---

## 4. Performance Improvements

| ID | Recommendation | Impact | Effort | Description |
|----|---------------|--------|--------|-------------|
| PER-R1 | Route-level code splitting | High | Low | React.lazy() for all route components |
| PER-R2 | Image optimization | Medium | Medium | Self-host coin logos, use WebP format, implement lazy loading |
| PER-R3 | Virtualized transaction list | High | Medium | react-window for transaction history with 1000+ items |
| PER-R4 | Service worker caching | Medium | High | Cache static assets and API responses for offline |
| PER-R5 | Debounce search inputs | Low | Low | Prevent excessive re-renders on search typing |
| PER-R6 | Memoize expensive computations | Medium | Low | React.memo for coin list items, useMemo for balance calculations |

---

## 5. Trust & Safety Improvements

| ID | Recommendation | Impact | Effort | Description |
|----|---------------|--------|--------|-------------|
| TS-R1 | Remove hardcoded PIN immediately | Critical | Low | This is the #1 security risk in the current codebase |
| TS-R2 | Implement proper admin authentication | Critical | High | Separate admin login with role-based access |
| TS-R3 | Add transaction confirmation summaries | High | Low | Show exact amounts, fees, and recipient before any transaction |
| TS-R4 | Implement withdrawal cooldown | Medium | Medium | 24-hour delay for new beneficiaries |
| TS-R5 | Add login notifications | Medium | Medium | Email/SMS alert on new device login |
| TS-R6 | Session management page | Medium | Medium | Show active sessions, allow remote logout |
| TS-R7 | Transaction velocity limits | High | Medium | Flag unusually frequent transactions |
| TS-R8 | Gift card duplicate detection | High | Medium | Prevent same card code from being submitted twice |
| TS-R9 | KYC document encryption | High | High | Encrypt uploaded documents at rest |
| TS-R10 | Audit log for all admin actions | High | Medium | Track who did what and when in admin panel |

---

## 6. Quick Wins (High Impact, Low Effort)

| # | Recommendation | Time |
|---|---------------|------|
| 1 | Fix swap fee discrepancy (TD-9) | 30 min |
| 2 | Remove hardcoded PIN (TD-6) | 1 hour |
| 3 | Update index.html title and meta tags (UX-2) | 15 min |
| 4 | Remove dead dependencies (TD-43) | 30 min |
| 5 | Add error boundaries (TD-4) | 2 hours |
| 6 | Add loading skeletons to all pages (UX-R1) | 4 hours |
| 7 | Create useCurrency() hook (TD-19) | 1 hour |
| 8 | Add confirmation dialogs (UX-R6) | 2 hours |
| 9 | Fix 404 on Buy/Sell routes (B-1 to B-4) | 1 hour |
| 10 | Add admin route guards (TD-2) | 2 hours |
