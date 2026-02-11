

# 🪙 Crypto Exchange App — PRD & Implementation Plan

## Design Theme (Inspired by Celler.app)
- **Dark navy/black background** with subtle gradient effects
- **Gold/amber accent colors** for CTAs and highlights
- **Clean, modern typography** with high contrast text
- **Card-based UI** with rounded corners and subtle borders

---

## Supported Coins
BTC, ETH, USDT, BNB, SOL — with mock market prices in USD

## Core Rate Logic
- **Hardcoded NGN/$ rate**: ₦1,410/$1
- **Mock USD market prices** for each coin (e.g., BTC = $67,500, ETH = $3,400, USDT = $1, BNB = $580, SOL = $145)
- **All conversions flow through USD**: Coin → USD value (qty × market price) → NGN value (USD × 1410)

---

## Pages & Features

### 1. 🔐 Auth Pages (Mock — no real backend)
- **Sign Up** — email, password, full name
- **Sign In** — email, password
- Stores "logged in" state in memory/localStorage
- Redirects to Dashboard after auth

### 2. 🏠 Dashboard
- Welcome greeting with user name
- **Total Wallet Balance** displayed in both USD and NGN
- Quick-glance portfolio: list of held coins with quantities, USD value, and NGN equivalent
- Quick action buttons: Buy, Sell, Swap
- Recent transaction history (last 5)

### 3. 💰 Buy Crypto (Naira → Crypto)
- **Step 1**: Select coin (BTC, ETH, USDT, BNB, SOL)
- **Step 2**: Enter amount in NGN **or** USD — auto-calculates the other
- **Calculation displayed**: Shows breakdown → NGN entered ÷ 1410 = USD → USD ÷ coin market price = quantity of coin
- **Step 3**: Review & Confirm screen showing full breakdown
- **Step 4**: Success screen with transaction receipt
- Transaction saved to history

### 4. 💸 Sell Crypto (Crypto → Naira)
- **Step 1**: Select coin to sell from wallet
- **Step 2**: Enter quantity of coin **or** target NGN amount
- **Calculation displayed**: Coin qty × market price = USD value → USD × 1410 = NGN payout
- **Step 3**: Review & Confirm
- **Step 4**: Success with receipt
- Updates wallet balance, saves to history

### 5. 🔄 Swap (Crypto → Crypto)
- **Step 1**: Select "From" coin and "To" coin
- **Step 2**: Enter quantity of "From" coin
- **Calculation**: From coin qty × From market price = USD value → USD ÷ To market price = To coin quantity
- **Step 3**: Review showing both sides of the swap
- **Step 4**: Success with receipt
- Updates wallet, saves to history

### 6. 📜 Transaction History
- Full list of all transactions (buy, sell, swap)
- Each entry shows: type, coin(s), amounts, NGN/USD values, date/time, status
- Filter by type (Buy/Sell/Swap)

### 7. 👤 Profile Page
- User info display
- Mock "Bank Account" for NGN deposits (display only)
- Logout button

---

## Conversion Examples (shown in UI)

**Buy Example:**
> Buying $10 of USDT
> USDT market price: $1.00
> USD amount: $10.00
> NGN cost: $10 × ₦1,410 = **₦14,100**
> You receive: **10 USDT**

**Sell Example:**
> Selling 0.001 BTC
> BTC market price: $67,500
> USD value: 0.001 × $67,500 = $67.50
> NGN payout: $67.50 × ₦1,410 = **₦95,175**

**Swap Example:**
> Swapping 0.1 ETH → SOL
> ETH price: $3,400 → 0.1 ETH = $340
> SOL price: $145 → $340 ÷ $145 = **2.3448 SOL**

---

## Data Storage
- All data stored in **localStorage** (mock prototype)
- Pre-seeded wallet with some starting balances so the app feels alive
- All buttons functional, all flows complete end-to-end

