# PRD — Authentication & Onboarding

## 1. Overview

The Authentication & Onboarding module handles user registration, login, session management, and the initial app experience. It is the entry point for all users.

## 2. Goals & Objectives

| Goal | Metric |
|------|--------|
| Minimize friction to first login | < 30 seconds from splash to dashboard |
| Secure user accounts | Password validation, 2FA support |
| Clear onboarding | Users understand value proposition within 3 slides |

## 3. User Personas

| Persona | Description |
|---------|-------------|
| **New Visitor** | First-time user, needs onboarding and account creation |
| **Returning User** | Existing user, needs quick access to dashboard |
| **Demo User** | Auto-created mock user for prototype exploration |

## 4. User Stories

- US-1.1: View Splash Screen
- US-1.2: View Welcome Carousel
- US-1.3: Sign In to Existing Account
- US-1.4: Create New Account
- US-1.5: Stay Logged In Across Sessions
- US-1.6: Log Out

## 5. User Flows

### Sign-In Flow
```
Splash (2.5s) → Check isLoggedIn → If yes: Dashboard
                                 → If no: Welcome → Sign In → Dashboard
```

### Sign-Up Flow
```
Welcome → Sign Up → Step 1: Email → Step 2: OTP (any 6-digit)
         → Step 3: Password (8+ chars, uppercase, special char)
         → Step 4: Success → Sign In or Dashboard
```

### Logout Flow
```
Profile → Log Out → Clear localStorage → Redirect to Sign In
```

## 6. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | Splash screen displays for 2.5s then auto-redirects | High |
| FR-1.2 | Welcome carousel has 3 navigable slides with CTAs | High |
| FR-1.3 | Sign In validates email and password against stored user | High |
| FR-1.4 | Sign Up is a 4-step flow with validation at each step | High |
| FR-1.5 | OTP step accepts any 6-digit code (mock) | Medium |
| FR-1.6 | Password requires 8+ chars, uppercase, special character | High |
| FR-1.7 | Session persists via localStorage (`cex_logged_in`) | High |
| FR-1.8 | Auto-login creates mock user on first visit | Medium |
| FR-1.9 | Logout clears session and redirects to sign-in | High |
| FR-1.10 | Authenticated routes redirect to sign-in if not logged in | High |

## 7. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-1.1 | Splash screen loads within 1 second |
| NFR-1.2 | Form inputs are accessible (labels, ARIA) |
| NFR-1.3 | Password field masks input |
| NFR-1.4 | Session data is stored securely (localStorage, not cookies in prototype) |

## 8. Edge Cases / Unhappy Paths

| Scenario | Expected Behavior |
|----------|-------------------|
| Wrong email on sign-in | Show "Invalid credentials" error |
| Wrong password on sign-in | Show "Invalid credentials" error |
| Empty fields on sign-in | Show validation error |
| Password mismatch on sign-up | Show "Passwords do not match" error |
| Weak password on sign-up | Show password requirements not met |
| OTP with fewer than 6 digits | Disable "Continue" button |
| Refresh during sign-up flow | Lose progress (no draft save) |

## 9. Acceptance Criteria

```gherkin
Given I open the app for the first time
When the splash screen displays
Then I see the Celler branding
And I am redirected to the welcome page after 2.5 seconds

Given I am on the sign-in page
When I enter valid credentials
Then I am redirected to the dashboard
And my session is persisted

Given I am logged in
When I close and reopen the app
Then I am automatically on the dashboard
```

## 10. API / Data Requirements

| Item | Status | Details |
|------|--------|---------|
| User Registration | **Missing Backend** | Currently localStorage only |
| User Authentication | **Missing Backend** | Currently localStorage only |
| Session Management | **Missing Backend** | No token, no expiry |
| Email OTP | **Mocked** | Any 6-digit code accepted |
| Password Reset | **Missing** | Not implemented |
| Auto-login | **Mocked** | Creates `MOCK_USER` on first load |

### Data Model (Intended)
```typescript
interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  username: string;
  phone: string;
  createdAt: Date;
  lastLoginAt: Date;
  status: 'active' | 'suspended' | 'deleted';
}

interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  deviceInfo: string;
}
```

## 11. UI/UX Notes

- Splash: Full-screen gradient with centered logo
- Welcome: Carousel with pagination dots, skip option implied
- Sign In: Clean form, "Forgot Password?" link (non-functional)
- Sign Up: Step indicator at top, progress visible
- Error states: Red text below input fields
- Loading states: Button shows spinner during submission

## 12. Metrics / Success Criteria

| Metric | Target |
|--------|--------|
| Sign-up completion rate | > 70% |
| Sign-in success rate (first attempt) | > 90% |
| Time from splash to dashboard | < 30s (new user) |
| Session persistence reliability | 100% |

---

## INTENDED BEHAVIOR vs CURRENT IMPLEMENTATION

| Aspect | Intended | Current |
|--------|----------|---------|
| Auth Backend | Real API with JWT tokens | localStorage mock |
| Email Verification | Real OTP via email/SMS | Any 6-digit code accepted |
| Password Storage | Hashed (bcrypt) | Plaintext in localStorage |
| Session Security | JWT with expiry, refresh tokens | Boolean flag in localStorage |
| Forgot Password | Email-based reset flow | Not implemented |
| Auto-login | Remember device option | Always auto-logs in with mock user |
| Rate Limiting | Brute-force protection | None |
