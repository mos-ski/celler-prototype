# PRD — Transaction History

## 1. Overview
Complete transaction history with filtering, searching, detail views, and receipt generation.

## 2. Goals & Objectives
- Provide full transparency of all user transactions
- Enable easy filtering and searching
- Generate shareable receipts

## 3. User Personas
| Persona | Description |
|---------|-------------|
| **Audit-Conscious User** | Regularly reviews transaction history |
| **Dispute Resolver** | Needs receipts for support tickets |

## 4. User Stories
- US-6.1: View Transaction History
- US-6.2: Filter Transactions
- US-6.3: Search Transactions
- US-6.4: View Transaction Details
- US-6.5: View and Share Receipt

## 5. User Flows
```
Dashboard → History → View list → Filter/Search → Tap transaction
         → Detail view → View receipt → Share/Print
```

## 6. Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-6.1 | Chronological transaction list | High |
| FR-6.2 | Filter by type (buy, sell, swap, deposit, withdraw, receive, send) | High |
| FR-6.3 | Filter by status (completed, pending, failed) | Medium |
| FR-6.4 | Search by keyword | Medium |
| FR-6.5 | Transaction detail view with full breakdown | High |
| FR-6.6 | Receipt generation with zigzag card design | Medium |
| FR-6.7 | Share/print receipt | Low |

## 7. Non-Functional Requirements
- List renders smoothly with 100+ transactions
- Filter/search responds in < 200ms
- Receipt is printable and shareable

## 8. Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| No transactions | Show empty state with CTA |
| Search yields no results | Show "No matching transactions" |
| Transaction has missing data | Graceful fallback display |
| Very long addresses | Truncate with copy option |

## 9. API / Data Requirements
| Item | Status | Details |
|------|--------|---------|
| Transaction List | **Mocked** | 8 pre-seeded transactions |
| Transaction Detail | **Mocked** | Derived from mock store |
| Receipt Generation | **Implemented** | Client-side rendering |
| Pagination | **Missing** | No pagination implemented |
| Export (CSV/PDF) | **Missing** | Not implemented |

## 10. UI/UX Notes
- Transaction type icons with color coding
- Status badges (completed = green, pending = yellow, failed = red)
- Zigzag receipt card design
- Mobile-optimized list with pull-to-refresh (intended)

## 11. Metrics
| Metric | Target |
|--------|--------|
| History page load time | < 1s |
| Filter/search accuracy | 100% |
| Receipt generation success | 100% |
