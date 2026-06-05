# PRD — Wallet & Dashboard

## 1. Overview

The Wallet & Dashboard module is the primary user-facing screen. It displays the user's portfolio balance, asset holdings, quick action shortcuts, and promotional content.

## 2. Goals & Objectives

| Goal | Metric |
|------|--------|
| Provide instant portfolio overview | Balance visible within 1s of page load |
| Enable quick access to core features | All key actions reachable in 1 tap |
| Display accurate asset values | Real-time price feeds (intended) |

## 3. User Personas

| Persona | Description |
|---------|-------------|
| **Active Trader** | Frequently checks balances, executes swaps and withdrawals |
| **Casual User** | Occasionally checks portfolio, uses basic features |
| **New User** | Exploring the dashboard, learning the interface |

## 4. User Stories

- US-2.1: View Portfolio Balance
- US-2.2: View Asset List
- US-2.3: Access Quick Actions
- US-2.4: Manage Visible Assets
- US-2.5: View Coin Details

## 5. User Flows

### Dashboard Load Flow
```
AppLayout (auth guard) → Dashboard → Fetch wallet → Calculate total → Render
```

### Quick Action Flow
```
Dashboard → Tap action button → Navigate to feature page
```

### Manage Assets Flow
```
Dashboard → Tap "Manage Assets" → Toggle coins → Save → Return to Dashboard
```

### Coin Detail Flow
```
Dashboard → Tap coin → CoinDetail → View balance, actions, history
```

## 6. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | Display total portfolio balance in USD and NGN | High |
| FR-2.2 | Display individual coin balances with icons and values | High |
| FR-2.3 | Show 24h price change percentage per coin | Medium |
| FR-2.4 | Quick action buttons: Buy, Sell, Send, Receive, Swap, More | High |
| FR-2.5 | Promo banner carousel with auto-rotation | Low |
| FR-2.6 | Toggle coin visibility on dashboard | Medium |
| FR-2.7 | Navigate to coin detail page | High |
| FR-2.8 | Mobile bottom navigation + desktop sidebar | High |

## 7. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-2.1 | Dashboard loads within 1 second |
| NFR-2.2 | Balance calculations are accurate to 8 decimal places |
| NFR-2.3 | UI is responsive across mobile (375px+) and desktop |
| NFR-2.4 | Coin icons load from external CDN with fallback |

## 8. Edge Cases / Unhappy Paths

| Scenario | Expected Behavior |
|----------|-------------------|
| Coin icon fails to load | Show fallback placeholder |
| User has zero balance for a coin | Show 0.00 with appropriate formatting |
| External price feed unavailable | Show last known price with "stale" indicator |
| User hides all coins | Show empty state with "Add assets" prompt |
| Network disconnect | Show cached data with offline indicator |

## 9. Acceptance Criteria

```gherkin
Given I am logged in
When I navigate to the dashboard
Then I see my total balance in USD and NGN
And I see a list of my coins with balances
And I see quick action buttons
And tapping a coin navigates to its detail page
```

## 10. API / Data Requirements

| Item | Status | Details |
|------|--------|---------|
| Wallet Balances | **Mocked** | localStorage store |
| Coin Prices | **Mocked** | Hardcoded in `lib/crypto.ts` |
| 24h Price Change | **Mocked** | Hardcoded percentages |
| Portfolio Total | **Computed** | Client-side calculation |
| Visible Coins | **Mocked** | localStorage store |
| Promo Banners | **Hardcoded** | 3 static banners |

### Data Model (Intended)
```typescript
interface Wallet {
  userId: string;
  balances: { [coinId: string]: number };
  totalUsd: number;
  totalNgn: number;
  lastUpdated: Date;
}

interface CoinPrice {
  coinId: string;
  priceUsd: number;
  change24h: number;
  lastUpdated: Date;
  source: string;
}
```

## 11. UI/UX Notes

- Balance: Large, prominent display at top
- Quick actions: Icon grid with labels
- Asset list: Scrollable, each row shows icon, name, balance, value, change
- Promo banners: Horizontal carousel with auto-advance
- Mobile: Bottom tab nav (Home, Swap, History, Profile)
- Desktop: Left sidebar + top bar

## 12. Metrics / Success Criteria

| Metric | Target |
|--------|--------|
| Dashboard load time | < 1s |
| Balance accuracy | 100% |
| Quick action tap-through rate | > 40% |
| User engagement (daily active) | > 60% of registered users |

---

## INTENDED BEHAVIOR vs CURRENT IMPLEMENTATION

| Aspect | Intended | Current |
|--------|----------|---------|
| Price Feeds | Real-time from CoinGecko/CoinMarketCap | Hardcoded static prices |
| Balance Updates | Real-time from blockchain/wallet service | localStorage only |
| Buy Flow | Integrated payment gateway | Missing — route not defined |
| Sell Flow | Integrated off-ramp | Missing — route not defined |
| Portfolio Chart | Historical balance chart | Not implemented |
| Bill Payments | Feature in development | Waitlist banner only |
