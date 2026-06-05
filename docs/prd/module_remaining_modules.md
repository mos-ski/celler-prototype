# PRD — Referral Program

## 1. Overview
Users earn NGN rewards for referring new users. Includes referral tracking, earnings dashboard, and withdrawal management with weekly limits.

## 2. Goals & Objectives
- Drive user acquisition through referrals
- Transparent earnings tracking
- Controlled payout via admin approval

## 3. User Stories
- US-8.1: View Referral Code and Link
- US-8.2: Track Referral Earnings
- US-8.3: Withdraw Referral Earnings

## 4. Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-8.1 | Display unique referral code | High |
| FR-8.2 | Display shareable referral link | High |
| FR-8.3 | Copy code/link to clipboard | High |
| FR-8.4 | Show total earned, withdrawn, available | High |
| FR-8.5 | Show referral list with status | High |
| FR-8.6 | Withdrawal request with weekly limit (10,000 NGN) | High |
| FR-8.7 | Admin approval for withdrawals | High |

## 5. API / Data Requirements
| Item | Status | Details |
|------|--------|---------|
| Referral Tracking | **Mocked** | localStorage store |
| Earnings Calculation | **Mocked** | 5,000 NGN per referral |
| Withdrawal Requests | **Mocked** | localStorage with admin approval |
| Weekly Limit Enforcement | **Implemented** | Client-side check |
| Real Referral Attribution | **Missing Backend** | No tracking system |

## 6. Metrics
| Metric | Target |
|--------|--------|
| Referral conversion rate | > 20% |
| Weekly withdrawal utilization | < 80% of limit |

---

# PRD — KYC Verification

## 1. Overview
3-tier identity verification system with increasing transaction limits. Supports BVN, government ID, and employment verification.

## 2. User Stories
- US-9.1: View KYC Tiers and Limits
- US-9.2: Complete KYC Verification

## 3. Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-9.1 | Display 3 KYC tiers with requirements and limits | High |
| FR-9.2 | Show current verification status | High |
| FR-9.3 | Document submission flow | High |
| FR-9.4 | Admin approval workflow | High |

## 4. API / Data Requirements
| Item | Status | Details |
|------|--------|---------|
| Tier Configuration | **Mocked** | `data/kycConfig.ts` |
| Document Upload | **Missing** | UI only |
| BVN Verification | **Missing Backend** | No integration |
| Liveness Check | **Missing** | Not implemented |
| Admin Approval | **Mocked** | Status updates only |

---

# PRD — Profile & Security

## 1. Overview
User profile management, security settings (password, PIN, 2FA), bank account management, and app preferences.

## 2. User Stories
- US-10.1: Edit Profile
- US-10.2: Change Password
- US-10.3: Update Transaction PIN
- US-10.4: Set Up Two-Factor Authentication
- US-10.5: Change App Theme

## 3. Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-10.1 | Edit name, username, phone | High |
| FR-10.2 | Change password with validation | High |
| FR-10.3 | Update transaction PIN (3-step) | High |
| FR-10.4 | 2FA setup with QR code | Medium |
| FR-10.5 | Theme switching (light/dark/system) | High |
| FR-10.6 | Bank account management | Medium |

## 4. API / Data Requirements
| Item | Status | Details |
|------|--------|---------|
| Profile Update | **Mocked** | localStorage |
| Password Change | **Mocked** | No backend validation |
| PIN Update | **Mocked** | Hardcoded `1234` |
| 2FA Setup | **Mocked** | Static QR code |
| Theme | **Implemented** | Working with localStorage |
| Bank Management | **Mocked** | localStorage |

---

# PRD — Notifications

## 1. Overview
In-app notification system for users and admin push notification composer.

## 2. User Stories
- US-11.1: View Notifications

## 3. Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-11.1 | Display notification list | High |
| FR-11.2 | Admin compose and send notifications | High |
| FR-11.3 | Notification history (admin) | Medium |

## 4. API / Data Requirements
| Item | Status | Details |
|------|--------|---------|
| User Notifications | **Mocked** | 4 hardcoded notifications |
| Push Delivery | **Missing Backend** | No delivery system |
| Admin Composer | **Mocked** | Records to localStorage |
| Read/Unread Tracking | **Missing** | Not implemented |

---

# PRD — Admin Dashboard

## 1. Overview
Platform management interface for monitoring users, transactions, KYC, referrals, gift card orders, and system settings.

## 2. Goals & Objectives
- Full visibility into platform operations
- Efficient user and transaction management
- Configurable system parameters

## 3. User Personas
| Persona | Description |
|---------|-------------|
| **Super Admin** | Full platform control and oversight |
| **Support Agent** | (Intended) Limited access for customer support |

## 4. User Stories
- US-12.1: View Admin Overview
- US-12.2: Manage Customers
- US-12.3: Monitor Transactions
- US-12.4: Approve/Reject Gift Card Orders
- US-12.5: Manage Referrals
- US-12.6: Process KYC Approvals
- US-12.7: Send Push Notifications
- US-12.8: Configure System Settings

## 5. Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-12.1 | Dashboard with stats and revenue chart | High |
| FR-12.2 | Customer list with filtering | High |
| FR-12.3 | Customer detail view | High |
| FR-12.4 | Transaction monitoring with type tabs | High |
| FR-12.5 | Gift card order approval/rejection | High |
| FR-12.6 | Referral withdrawal processing | High |
| FR-12.7 | KYC approval queue | High |
| FR-12.8 | Push notification composer | Medium |
| FR-12.9 | System settings (fees, limits, config) | High |

## 6. Non-Functional Requirements
- Dashboard loads within 2 seconds
- Charts render smoothly with 30+ data points
- Actions (approve/reject) are atomic and auditable (intended)

## 7. Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| No data available | Show empty states with guidance |
| Concurrent admin actions | Prevent double-processing |
| Invalid configuration values | Show validation errors |

## 8. API / Data Requirements
| Item | Status | Details |
|------|--------|---------|
| Dashboard Stats | **Mocked** | `data/adminMockData.ts` |
| Customer Data | **Mocked** | 10 mock customers |
| Transaction Data | **Mocked** | 10 mock orders |
| Revenue Chart | **Mocked** | 30 days of mock data |
| Gift Card Orders | **Mocked** | localStorage store |
| KYC Queue | **Mocked** | Static list |
| Settings Storage | **Mocked** | localStorage |
| Admin Auth | **Missing** | No guards, anyone can access |
| Audit Trail | **Missing** | No action logging |
| Role Management | **Missing** | Single hardcoded admin |

## 9. UI/UX Notes
- Sidebar navigation with sections
- Stats cards with sparkline charts
- Recharts area chart for revenue
- Expandable customer cards
- Tab-based filtering throughout

## 10. Metrics
| Metric | Target |
|--------|--------|
| Admin action completion time | < 5 seconds |
| Data accuracy | 100% |
| Dashboard load time | < 2s |

---

## INTENDED vs CURRENT (Admin)

| Aspect | Intended | Current |
|--------|----------|---------|
| Admin Auth | Role-based, separate login | No auth, anyone can access |
| Real-time Data | Live from database | Static mock data |
| Action Execution | Real effects on users/data | Mock status changes |
| Audit Trail | Full action logging | None |
| Multi-role Support | Super Admin, Support, Analyst | Single hardcoded role |
| Fraud Detection | Automated flagging | None |
| Export/Reports | CSV/PDF generation | None |
