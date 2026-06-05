# Celler — One-Year Roadmap

**Date:** April 3, 2026
**Current State:** Frontend Prototype (v0.1.0)

---

## Q1 — Stabilization & Core Foundation (Months 1-3)

### Goals
- Build production-ready backend infrastructure
- Replace all mocked functionality with real services
- Establish security foundation

### Features
| Feature | Priority | Description |
|---------|----------|-------------|
| Backend API | P0 | Node.js/Express or Python/FastAPI REST API |
| Database | P0 | PostgreSQL with proper schema design |
| Real Authentication | P0 | JWT-based auth with Supabase/Auth0 |
| Admin Auth & RBAC | P0 | Separate admin login with role-based access |
| Password Security | P0 | bcrypt hashing, forgot password flow |
| Session Management | P0 | JWT with refresh tokens, device tracking |
| Buy Flow | P1 | Payment gateway integration (Paystack/Flutterwave) |
| Sell Flow | P1 | Off-ramp integration for crypto-to-fiat |
| Real Price Feeds | P1 | CoinGecko or CoinMarketCap API integration |
| Email/SMS Service | P1 | OTP delivery, transaction notifications |

### Technical Priorities
- Set up CI/CD pipeline (GitHub Actions)
- Implement comprehensive test suite (unit + integration)
- Add error boundaries and monitoring (Sentry)
- Establish API documentation (OpenAPI/Swagger)
- Set up staging and production environments
- Implement rate limiting and CORS policies

### Success Criteria
- All critical gaps (G-1, G-2, G-3) resolved
- 80%+ test coverage
- Zero critical security vulnerabilities
- Successful end-to-end auth flow

---

## Q2 — Core Feature Expansion (Months 4-6)

### Goals
- Complete all core trading features
- Implement real blockchain integration
- Launch KYC verification system

### Features
| Feature | Priority | Description |
|---------|----------|-------------|
| Blockchain Integration | P0 | Wallet address generation, real transactions |
| NGN Payment Processing | P0 | Real bank transfers via payment gateway |
| KYC Verification | P0 | BVN check, ID verification, liveness detection |
| Address Validation | P1 | Crypto address format and checksum validation |
| Withdrawal Limits | P1 | KYC-tier-based limit enforcement |
| Transaction Pagination | P1 | Virtualized list or pagination for history |
| Portfolio Chart | P2 | Historical balance visualization |
| Audit Trail | P1 | Admin action logging |
| Multi-role Admin | P1 | Super Admin, Support Agent, Analyst roles |
| File Storage | P1 | S3/GCS for KYC documents and gift card images |

### Technical Priorities
- Implement WebSocket for real-time price updates
- Add service worker for offline caching
- Set up monitoring and alerting (Datadog)
- Implement database backups and disaster recovery
- Performance optimization (lazy loading, code splitting)
- API versioning strategy

### Success Criteria
- All high-priority gaps resolved
- Real blockchain transactions working
- KYC processing live
- Admin dashboard fully functional with real data
- < 2s page load times across all pages

---

## Q3 — Growth & Monetization (Months 7-9)

### Goals
- Launch referral program with real tracking
- Implement fee collection and revenue tracking
- Expand gift card offerings

### Features
| Feature | Priority | Description |
|---------|----------|-------------|
| Real Referral Tracking | P0 | Attribution system with deep links |
| Fee Collection | P0 | Real fee deduction and revenue tracking |
| Gift Card Fraud Detection | P1 | Duplicate detection, image analysis |
| Push Notifications | P1 | Real push notification delivery (FCM/APNs) |
| Bill Payments | P2 | Airtime, data, electricity bill payments |
| Transaction Export | P2 | CSV/PDF export for users and admin |
| Admin Reports | P1 | Revenue, volume, and user growth reports |
| Live Chat Support | P2 | Integrated support chat (Intercom/Zendesk) |
| Multi-currency Support | P2 | Additional fiat currencies beyond NGN |
| Staking/Earn | P3 | Crypto staking features |

### Technical Priorities
- Implement analytics pipeline (Mixpanel/Amplitude)
- A/B testing infrastructure
- Load testing and auto-scaling setup
- API rate limiting per user tier
- Database optimization and indexing
- Implement feature flags (LaunchDarkly)

### Success Criteria
- Referral program driving 20%+ of new signups
- Revenue tracking accurate to the penny
- Gift card fraud rate < 2%
- Push notification delivery > 95%
- 10,000+ active users

---

## Q4 — Scale & Optimization (Months 10-12)

### Goals
- Optimize for scale and performance
- Advanced features and integrations
- Prepare for regional expansion

### Features
| Feature | Priority | Description |
|---------|----------|-------------|
| Advanced Analytics | P1 | User behavior analytics, funnel analysis |
| API for Partners | P2 | Public API for third-party integrations |
| Mobile App (React Native) | P2 | Native iOS/Android app |
| Advanced Trading | P3 | Limit orders, stop-loss, DCA |
| Loyalty Program | P2 | Tiered rewards based on trading volume |
| Tax Reporting | P3 | Transaction history for tax purposes |
| Multi-language Support | P2 | Localization for West African markets |
| Compliance Reporting | P1 | AML/KYC reporting for regulators |
| White-label Solution | P3 | Platform licensing for other businesses |

### Technical Priorities
- Microservices migration (if monolith becomes bottleneck)
- CDN implementation for global performance
- Database read replicas for scaling
- Implement circuit breakers and graceful degradation
- Security audit and penetration testing
- SOC 2 / ISO 27001 compliance preparation
- Disaster recovery testing

### Success Criteria
- 100,000+ registered users
- 99.9% uptime
- < 1s page load times globally
- Zero security incidents
- Ready for Series A fundraising

---

## Roadmap Summary

| Quarter | Theme | Key Deliverables | Risk Level |
|---------|-------|-----------------|------------|
| **Q1** | Foundation | Backend, Auth, Buy/Sell, Price Feeds | High |
| **Q2** | Core Features | Blockchain, KYC, Payments, Admin | High |
| **Q3** | Growth | Referrals, Monetization, Notifications | Medium |
| **Q4** | Scale | Analytics, Mobile, Compliance, Expansion | Medium |

## Dependency Chain

```
Q1 (Backend + Auth)
  └── Q2 (Blockchain + KYC + Payments)
        └── Q3 (Referrals + Monetization + Analytics)
              └── Q4 (Scale + Mobile + Compliance)
```

## Resource Requirements

| Quarter | Engineering | Design | QA | DevOps |
|---------|-------------|--------|----|-----|
| Q1 | 4-6 engineers | 1 designer | 1 QA | 1 DevOps |
| Q2 | 5-7 engineers | 1 designer | 2 QA | 1 DevOps |
| Q3 | 4-5 engineers | 1 designer | 1 QA | 1 DevOps |
| Q4 | 5-6 engineers | 2 designers | 2 QA | 2 DevOps |
