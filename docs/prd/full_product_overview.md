# Celler — Full Product Overview

**Version:** 0.1.0 (Prototype)
**Date:** April 3, 2026
**Status:** Frontend Prototype — No Backend
**Project Type:** Crypto Exchange (CEX) — Nigerian Market Focus

---

## 1. Product Summary

Celler is a **cryptocurrency exchange platform** targeting the Nigerian market. It enables users to buy, sell, swap, deposit, and withdraw cryptocurrencies and Nigerian Naira (NGN). The platform also includes a gift card trading feature, a referral rewards program, and KYC verification tiers.

An **admin dashboard** provides oversight of users, transactions, gift card orders, KYC approvals, referral management, and system-wide settings.

---

## 2. Classification

| Attribute | Value |
|-----------|-------|
| **Type** | Frontend Prototype |
| **Backend** | None (all data in localStorage) |
| **Auth** | Mock (localStorage-backed, no real auth server) |
| **APIs** | None (zero real API calls) |
| **Database** | None (localStorage as pseudo-database) |
| **Framework** | Vite 5 + React 18 + TypeScript + Tailwind CSS 3 + shadcn/ui |
| **Routing** | React Router 6 (client-side) |
| **State** | React Context + localStorage stores |

---

## 3. Core Use Cases

| # | Use Case | Description |
|---|----------|-------------|
| 1 | **Wallet Management** | View crypto and NGN balances, toggle visible assets |
| 2 | **Crypto Swap** | Exchange one cryptocurrency for another |
| 3 | **Withdrawal** | Send crypto to external addresses or withdraw NGN to bank |
| 4 | **Receive** | Display QR codes for crypto deposits or NGN bank details |
| 5 | **Transaction History** | View, filter, and search all transactions |
| 6 | **Gift Card Trading** | Sell gift cards (Amazon, iTunes, etc.) for NGN payout |
| 7 | **Referral Program** | Earn NGN rewards for referring new users |
| 8 | **KYC Verification** | 3-tier identity verification with increasing limits |
| 9 | **Profile & Security** | Manage profile, password, PIN, 2FA, appearance |
| 10 | **Admin Oversight** | Monitor users, transactions, KYC, referrals, and settings |

---

## 4. User Types

| Role | Description | Access Level |
|------|-------------|--------------|
| **Guest** | Unauthenticated visitor | Splash screen, Welcome page, Sign In, Sign Up |
| **Regular User** | Verified or unverified account holder | Full user app (dashboard, swap, withdraw, gift cards, etc.) |
| **Admin (Super Admin)** | Platform operator | Full admin dashboard (users, orders, KYC, settings) |

---

## 5. System Architecture

### Actual Architecture (Current)

```
┌─────────────────────────────────────────────────┐
│                  Browser (Client)                │
│  ┌───────────────────────────────────────────┐  │
│  │           React SPA (Vite)                │  │
│  │  ┌─────────┐ ┌──────────┐ ┌────────────┐ │  │
│  │  │  Pages  │ │Components│ │  Contexts  │ │  │
│  │  └────┬────┘ └────┬─────┘ └─────┬──────┘ │  │
│  │       └───────────┴─────────────┘        │  │
│  │                    │                      │  │
│  │       ┌────────────┴─────────────┐       │  │
│  │       │   localStorage Stores    │       │  │
│  │       │  (crypto, referral, gc)  │       │  │
│  │       └──────────────────────────┘       │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Intended Architecture (Production)

```
┌──────────────────────────────────────────────────────────────────┐
│                          Client (Browser)                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  React SPA + TanStack Query (for real API data fetching)   │  │
│  └────────────────────────┬───────────────────────────────────┘  │
└───────────────────────────┼──────────────────────────────────────┘
                            │ HTTPS / REST or GraphQL
                            ▼
┌───────────────────────────────────────────────────────────────────┐
│                         Backend API                                │
│  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌─────────────────────┐ │
│  │   Auth   │ │  Wallet  │ │  Trading  │ │  Admin Management   │ │
│  │ Service  │ │ Service  │ │  Engine   │ │     Service         │ │
│  └──────────┘ └──────────┘ └───────────┘ └─────────────────────┘ │
└───────────────────────────┬───────────────────────────────────────┘
                            │
┌───────────────────────────┼───────────────────────────────────────┐
│                      Data Layer                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ PostgreSQL   │  │ Redis (Cache)│  │ Blockchain Node/Provider │ │
│  │ (Users, Tx)  │  │  (Sessions)  │  │  (BTC, ETH, SOL, etc.)   │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

---

## 6. Supported Assets

| Asset | Type | Default Balance | Price (USD) |
|-------|------|----------------|-------------|
| BTC | Crypto | 0.005 | $95,900.13 |
| ETH | Crypto | 0.15 | $2,620.51 |
| USDT | Stablecoin | 250 | $1.00 |
| BNB | Crypto | 1.2 | $640.14 |
| SOL | Crypto | 5 | $192.00 |
| TRX | Crypto | 1,000 | $0.30 |
| USDC | Stablecoin | 100 | $1.00 |
| NGN | Fiat | 50,000 | $0.00066 |

---

## 7. Key Constants & Configuration

| Parameter | Value | Location |
|-----------|-------|----------|
| NGN/USD Rate | 1,410 | `lib/crypto.ts` |
| Default Trade Fee | 1.5% | `data/feeConfig.ts` |
| Default Swap Fee | 0.8% (config) / 0.2% (hardcoded in Swap.tsx) | `data/feeConfig.ts` + `pages/Swap.tsx` |
| Default Withdrawal Fee | 0.5% | `data/feeConfig.ts` |
| NGN Withdrawal Fee | 100 NGN (flat) | `pages/Withdraw.tsx` |
| Crypto Withdrawal Fee | $0.50 (flat) | `pages/Withdraw.tsx` |
| Referral Reward | 5,000 NGN | `lib/referral.ts` |
| Weekly Referral Withdrawal Limit | 10,000 NGN | `lib/referral.ts` |
| Transaction PIN | `1234` (hardcoded) | `pages/Withdraw.tsx` |
| 2FA Mock Secret | `JBSWY3DPEHPK3PXP` | `pages/TwoFactor.tsx` |

---

## 8. Module Status Summary

| Module | Status | Notes |
|--------|--------|-------|
| Authentication | Mock | localStorage-backed, auto-login |
| Wallet/Dashboard | Partial | UI complete, no real price feeds |
| Swap | Partial | UI + logic complete, no real execution |
| Withdrawal | Partial | Multi-step flow complete, no real transfers |
| Receive | Partial | Static QR codes, no real deposit detection |
| Transaction History | Partial | Mock data only |
| Gift Card Trading | Partial | Full UI flow, no real processing |
| Referral Program | Partial | UI + mock store, no real tracking |
| KYC Verification | Partial | UI complete, no real verification |
| Profile & Security | Partial | UI complete, no real backend |
| Admin Dashboard | Partial | Mock data only, no real controls |
| Notifications | Mock | Hardcoded notifications |
| Support | Partial | Static page, no real chat |

---

## 9. Critical Gaps

| Gap | Severity | Description |
|-----|----------|-------------|
| No Backend | Critical | Zero server-side logic, API, or database |
| No Real Auth | Critical | Anyone can access any route |
| No Admin Auth | Critical | Admin routes have no guards |
| Buy/Sell Missing | High | Routes not defined, links break |
| Hardcoded PIN | High | `1234` is hardcoded in code |
| No Real Price Feeds | High | All prices are static |
| No Real Blockchain | High | No wallet addresses, no transactions |
| Unused Dependencies | Medium | TanStack Query, next-themes are dead |
| TODO in HTML | Low | Title still says "Lovable App" |
