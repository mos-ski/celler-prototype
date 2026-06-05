# PRD — Gift Card Trading

## 1. Overview
Gift card marketplace allowing users to sell gift cards (Amazon, iTunes, Steam, etc.) for NGN payout with tiered rates and admin approval workflow.

## 2. Goals & Objectives
- Enable gift card to cash conversion
- Transparent tiered rate structure
- Admin-controlled approval for fraud prevention

## 3. User Personas
| Persona | Description |
|---------|-------------|
| **Gift Card Seller** | Has unused gift cards, wants cash |
| **Repeat Seller** | Regularly sells gift cards |

## 4. User Stories
- US-7.1: Browse Gift Card Brands
- US-7.2: Sell a Gift Card
- US-7.3: View Gift Card Orders

## 5. User Flows
```
Dashboard → Giftcards → Browse brands → Select brand
  → Enter amount → Select tier → Upload card image
  → Review order → Submit → Pending status
  → Admin approves → NGN credited to wallet
```

## 6. Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-7.1 | Display gift card brands in categorized grid | High |
| FR-7.2 | Amount entry with tier selection | High |
| FR-7.3 | NGN payout calculation (amount × rate × NGN_RATE) | High |
| FR-7.4 | Card image upload | High |
| FR-7.5 | Order review before submission | High |
| FR-7.6 | Order history with status tracking | High |
| FR-7.7 | Admin approval/rejection workflow | High |
| FR-7.8 | NGN payout on approval | High |

## 7. Non-Functional Requirements
- Image upload supports JPG/PNG up to 5MB
- Rate calculation is accurate to 2 decimal places
- Order status updates in real-time (intended)

## 8. Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| Invalid gift card code | Admin rejects order |
| Duplicate card submission | Admin detects and rejects |
| Image upload fails | Show error, allow retry |
| Amount below minimum | Show minimum amount error |

## 9. API / Data Requirements
| Item | Status | Details |
|------|--------|---------|
| Brand Catalog | **Mocked** | 8 hardcoded brands |
| Rate Tiers | **Mocked** | 55-75% of face value |
| Image Upload | **Mocked** | No real upload |
| Order Processing | **Mocked** | localStorage store |
| NGN Payout | **Mocked** | Credited to localStorage wallet |
| Fraud Detection | **Missing** | No duplicate detection |

## 10. UI/UX Notes
- Brand grid with logos from worldvectorlogo.com
- Clear rate display per tier
- Multi-step sell flow with progress indicator
- Status badges on order history

## 11. Metrics
| Metric | Target |
|--------|--------|
| Gift card sell completion rate | > 60% |
| Admin approval time | < 24 hours |
| Fraud rejection rate | < 5% |
