# PRD — Crypto Swap

## 1. Overview
The Swap module enables users to exchange one cryptocurrency for another with transparent rate calculation, fee display, and confirmation flow.

## 2. Goals & Objectives
- Enable seamless crypto-to-crypto exchange
- Display transparent pricing with fees and slippage
- Provide confirmation before execution

## 3. User Personas
| Persona | Description |
|---------|-------------|
| **Portfolio Rebalancer** | Adjusts asset allocation through swaps |
| **Arbitrage User** | Exploits rate differences between assets |

## 4. User Stories
- US-3.1: Swap Cryptocurrency
- US-3.2: View Swap Rate and Fees
- US-3.3: Swap Coin Selection

## 5. User Flows
```
Dashboard → Swap → Select "from" coin → Enter amount
       → Select "to" coin → View rate & fee → Review → Confirm
       → Success animation → Wallet updated → History updated
```

## 6. Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | Select from/to coins from searchable list | High |
| FR-3.2 | Calculate exchange rate in real-time | High |
| FR-3.3 | Display fee (0.2% hardcoded) | High |
| FR-3.4 | Display slippage tolerance (0.5%) | Medium |
| FR-3.5 | Review screen before confirmation | High |
| FR-3.6 | Success animation with transaction timeline | Medium |
| FR-3.7 | Update wallet balances post-swap | High |
| FR-3.8 | Record transaction in history | High |

## 7. Non-Functional Requirements
- Rate calculation completes in < 100ms
- UI remains responsive during calculation
- Balances update atomically (no partial updates)

## 8. Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| Insufficient balance | Disable confirm, show error |
| Same coin selected for both sides | Prevent selection |
| Amount exceeds balance | Show "Insufficient balance" error |
| Zero or negative amount | Disable confirm button |

## 9. API / Data Requirements
| Item | Status | Details |
|------|--------|---------|
| Coin Prices | **Mocked** | Hardcoded in `lib/crypto.ts` |
| Swap Execution | **Mocked** | Client-side localStorage update |
| Fee Calculation | **Partial** | 0.2% hardcoded (config says 0.8%) |
| Rate Source | **Mocked** | Static ratio of hardcoded prices |

## 10. UI/UX Notes
- Large input field for amount
- Coin selector with search
- Swap button between from/to selectors
- Review modal with full breakdown
- Animated success with timeline steps

## 11. Metrics
| Metric | Target |
|--------|--------|
| Swap completion rate | > 80% |
| Average swap time | < 30 seconds |
| Error rate (insufficient balance) | < 15% |

---

## INTENDED vs CURRENT

| Aspect | Intended | Current |
|--------|----------|---------|
| Rate Source | Live market rates | Hardcoded static prices |
| Fee | Configurable (0.8%) | Hardcoded 0.2% |
| Execution | Real blockchain/DEX | localStorage update |
| Slippage | Real enforcement | Display only |
