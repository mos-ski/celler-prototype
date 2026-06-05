# Celler — Scope Control

**Date:** April 3, 2026

---

## In Scope (Current Prototype)

| Module | Features Included |
|--------|-------------------|
| **Authentication** | Splash screen, welcome carousel, sign in, sign up (4-step), session persistence, logout |
| **Wallet & Dashboard** | Portfolio balance (USD/NGN), asset list, quick actions, promo banners, manage assets, coin detail |
| **Crypto Swap** | Coin selection, rate calculation, fee display, review, confirmation, success animation |
| **Withdrawal** | Amount entry (custom numpad), recipient selection (crypto/bank), review, FaceID/PIN auth, success |
| **Receive** | QR code display, address copy, NGN bank details |
| **Transaction History** | Transaction list, type/status filters, search, detail view, receipt generation |
| **Gift Card Trading** | Brand marketplace, sell flow (amount → upload → review → submit), order history |
| **Referral Program** | Referral code/link, earnings dashboard, withdrawal requests, weekly limit |
| **KYC Verification** | 3-tier display, limits, submission UI |
| **Profile & Security** | Edit profile, password change, PIN update, 2FA setup, theme switching, bank management |
| **Notifications** | User notification list, admin push composer |
| **Admin Dashboard** | Overview stats, customer management, transaction monitoring, gift card approval, KYC approval, referral management, settings |

---

## Out of Scope (Current Prototype)

| Category | Items |
|----------|-------|
| **Backend** | API server, database, microservices, job queues |
| **Real Auth** | JWT, OAuth, email verification, password reset, session management |
| **Blockchain** | Wallet address generation, real transactions, blockchain nodes, Web3 integration |
| **Payments** | Payment gateway (Paystack/Flutterwave), bank API integration, real NGN processing |
| **Communications** | Email service, SMS gateway, push notification delivery, live chat |
| **File Storage** | Document upload, image storage, CDN |
| **Security** | Rate limiting, CSRF protection, input sanitization, encryption, audit trails |
| **Advanced Trading** | Limit orders, stop-loss, DCA, staking, margin trading |
| **Mobile App** | Native iOS/Android app (React Native) |
| **Analytics** | User behavior tracking, funnel analysis, A/B testing |
| **Compliance** | AML reporting, regulatory compliance, tax reporting |
| **Internationalization** | Multi-language support, multi-currency beyond NGN |
| **Business Features** | White-label solution, B2B API, partner integrations |

---

## Scope Boundary Rules

| Rule | Description |
|------|-------------|
| **Frontend Only** | This prototype is frontend-only. No backend work is in scope. |
| **Mock Data Only** | All data operations use localStorage. No external API calls. |
| **Nigerian Market Only** | NGN is the only fiat currency. No international expansion in scope. |
| **Prototype Purpose** | This is a design/UX validation tool, not a production-ready system. |
| **No Real Money** | No real cryptocurrency or fiat transactions occur. |
| **Single Admin Role** | Only one admin role exists. No RBAC in prototype. |

---

## Scope Change Process

Any feature request that falls into "Out of Scope" must:
1. Be documented with business justification
2. Be assessed for effort and impact
3. Be approved by product owner
4. Be added to the roadmap (not the current sprint)
5. Have clear acceptance criteria defined
