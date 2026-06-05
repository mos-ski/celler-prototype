# PRD — Withdrawal

## 1. Overview
Multi-step withdrawal flow for cryptocurrency and NGN with authentication (FaceID/PIN), fee calculation, and beneficiary management.

## 2. Goals & Objectives
- Secure withdrawals with multi-step authentication
- Transparent fee breakdown
- Support both crypto and fiat withdrawals

## 3. User Personas
| Persona | Description |
|---------|-------------|
| **Crypto Sender** | Sends crypto to external wallets |
| **Fiat Withdrawer** | Withdraws NGN to bank account |

## 4. User Stories
- US-4.1: Withdraw Cryptocurrency
- US-4.2: Withdraw NGN to Bank
- US-4.3: Add Bank Account
- US-4.4: Authenticate Withdrawal

## 5. User Flows
```
CoinDetail/Withdraw → Step 1: Enter amount (custom numpad)
  → Step 2: Enter recipient (address or bank)
  → Step 3: Review summary + fees
  → Step 4: Authenticate (FaceID 2s mock or PIN)
  → Step 5: Success animation + timeline
  → Wallet updated + History updated
```

## 6. Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | Custom numpad for amount entry | High |
| FR-4.2 | Crypto address input with validation | High |
| FR-4.3 | Bank account selection for NGN | High |
| FR-4.4 | Fee display (NGN: 100 flat, Crypto: $0.50 flat) | High |
| FR-4.5 | Review summary before confirmation | High |
| FR-4.6 | FaceID authentication (mock 2s timer) | Medium |
| FR-4.7 | PIN authentication (4-digit) | High |
| FR-4.8 | Success animation with timeline | Medium |
| FR-4.9 | Add/remove bank accounts | Medium |
| FR-4.10 | Beneficiary management | Low |

## 7. Non-Functional Requirements
- Withdrawal processing completes in < 3s (mock)
- PIN input masks digits
- Address validation for crypto formats
- Atomic balance updates

## 8. Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| Insufficient balance | Block withdrawal, show error |
| Invalid crypto address | Show format validation error |
| Wrong PIN | Show error, allow retry |
| Network failure during auth | Retry or cancel gracefully |
| Withdrawal amount = 0 | Disable continue |

## 9. API / Data Requirements
| Item | Status | Details |
|------|--------|---------|
| Wallet Balance Check | **Mocked** | localStorage |
| Crypto Transfer | **Missing Backend** | No blockchain integration |
| Bank Transfer | **Missing Backend** | No payment processor |
| Address Validation | **Missing** | No format checking |
| Transaction PIN | **Hardcoded** | `1234` in code |
| FaceID | **Mocked** | 2-second timer |

## 10. UI/UX Notes
- Custom numpad instead of keyboard for amount
- Clear fee breakdown on review
- Authentication step with two options
- Animated success with step-by-step timeline

## 11. Metrics
| Metric | Target |
|--------|--------|
| Withdrawal success rate | > 95% |
| Authentication failure rate | < 5% |
| Average withdrawal time | < 60 seconds |

---

## INTENDED vs CURRENT

| Aspect | Intended | Current |
|--------|----------|---------|
| Crypto Transfer | Real blockchain transaction | localStorage balance update |
| Bank Transfer | Real payment gateway | Mock deduction |
| Address Validation | Format + checksum validation | None |
| PIN Security | Hashed, user-set | Hardcoded `1234` |
| FaceID | Real biometric API | 2-second timer |
| Withdrawal Limits | Enforced by KYC tier | Not enforced |
