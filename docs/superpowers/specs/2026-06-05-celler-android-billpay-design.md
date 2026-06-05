# Android Bill Payment App — Product Plan
### Stakeholder Handoff Document | June 2026

---

## The Situation

Celler's Google Play developer account was terminated. The most likely reason is that combining a crypto wallet with bill payment features triggered Google Play's strict financial services policies — something that has happened to many similar apps globally.

We are not starting over from scratch. The product, the codebase, the backend, and the team all remain intact. What we are doing is creating a clean, focused version of the product that can re-enter the Android market without the same risk — and use that as a foundation to grow back to full feature parity over time.

The iOS version of Celler is live and unaffected. It continues operating normally throughout this entire process.

---

## The Strategy in Plain Terms

Launch a bill payment app on Android under a new name. Get accepted. Build trust with the platform. Then gradually bring back the features we had — gift cards first, then crypto — one update at a time.

Meanwhile, update the iOS app to match the new name and look once the Android version is live, so both platforms are unified under the same brand going forward.

---

## Platform Snapshot

| Platform | Status | App Name | Features |
|----------|--------|----------|----------|
| iOS | Live | Celler | Full — crypto wallet + bill payment |
| Android | Terminated | Celler | N/A |
| Web | Live | Celler | Full — crypto wallet + bill payment |
| Android (new) | To be built | New name (see Naming section) | Bill payment only, to start |

---

## Phased Rollout Plan

### Phase 1 — Android Launch (This Document)
Build and submit the Android bill payment prototype. Features in scope:
- Naira wallet (check balance, fund via bank transfer, withdraw to bank)
- Bill payment: Airtime, Data, Electricity, TV/Cable, Betting
- Deals of the Day (discounted offers on the home screen)
- Referral & Earn
- Standard account features: sign up, KYC, transaction PIN, bank details, history, profile, support

### Phase 2 — First Update After Going Live
- Gift cards (buy and sell)

### Phase 3 and Beyond — Gradual Reintroduction
- Crypto wallet features brought back carefully, one update at a time
- These are not new features — they already exist in the Celler web app and will be reintroduced as the Android app earns platform trust
- No fixed timeline for this phase; it is paced by what the platform allows

### iOS Rebrand (Runs Alongside Phase 1)
- Once the new Android app is accepted and live, submit an iOS update with the new name and logo
- This is a routine app update — existing iOS users keep the app, their data, and their accounts untouched
- Apple has no issue with name and icon changes submitted as regular updates
- After this update, both iOS and Android carry the same brand

---

## Naming Strategy

### Why We Are Not Keeping "Celler" for Android

Google Play's review systems look beyond just the app itself. They examine the developer account details, business documents, app name, screenshots, and associated metadata. Submitting a new app called "Celler" — with similar screenshots and the same product concept — under a new developer account raises the risk of Google connecting it to the terminated account and acting again before we even go live.

A new name creates genuine distance. It signals a new product, not a resubmission.

### Recommendation: Zella

After reviewing options against the premium and modern brand direction we want, **Zella** is the top recommendation.

- Sounds nothing like "Celler" — Google's systems will not flag a name similarity
- Feels premium and modern — fits the fintech space alongside brands like Kuda and Carbon
- Short, easy to spell, easy to search on any app store
- No major Nigerian fintech currently owns this name
- Works well as a standalone brand that can grow beyond bill payment

**Runner-up options if Zella is unavailable or rejected:**

| Name | Why it works |
|------|-------------|
| Vella | Warm and premium — slightly friendlier tone than Zella |
| Ora | Very clean and minimal — works if the design leans extremely simple |
| Kash | Universal fintech energy — shorter, punchier |

### What Happens to "Celler"

The Celler name stays on the web platform and iOS during the transition. Once the Android version is live and the iOS rebrand update is submitted and approved, Celler is retired as the public-facing product name. Internally, "Celler" can continue to refer to the platform and codebase — it just won't be the name users see on their phones.

---

## Logo & Visual Identity

The logo must change alongside the name. A new app name with the same logo is still a risk — Google's review team and their systems can pattern-match on visual assets as well.

The new logo does not need to feel completely unrelated to Celler. Think of it as an evolution — the same quality, a different mark. The colour language can shift, the icon can be new, but the premium feel stays consistent.

**Logo work is a separate design task and is not blocking the prototype.** The prototype will use a placeholder or working mark. The final logo is locked once the name decision is confirmed by stakeholders.

---

## Legal & Business Entity

### Why This Matters

Google Play requires a developer account registered under a business entity. Google already has Tampay on record — associated with the terminated account. **We cannot open a new Play Store developer account under the Tampay name.** Google will connect it to the terminated account and terminate again.

### What We Need

A separate, legitimately registered business entity to open the new Play Store developer account under. This does not have to be the same as the app name — the legal entity and the product name are separate things. For example, the entity could be "NextCo Ltd" while the app is called "Zella."

**Options:**
- Register a new business name with CAC (a subsidiary or a sibling company)
- Use an existing entity in the group that has never been associated with a Google Play account

**This is a legal/admin task, not a product or tech task.** It runs in parallel with the prototype build and must be completed before the Play Store submission. A lawyer or accountant familiar with CAC registration should handle it.

### What Tampay's Role Is

Tampay remains the parent company. The new entity is a child or sibling under the Tampay group. Internally, everyone knows it is the same business. Externally — specifically for Google Play — it is a clean, unconnected entity with its own registration documents.

---

## The App Itself

### What It Does

This is a Naira bill payment app for everyday Nigerian users. It lets you:

- Hold a Naira balance in a personal wallet
- Pay for everyday services: airtime, data, electricity, cable TV, and betting top-ups
- Fund your wallet via bank transfer
- Withdraw your balance to any registered Nigerian bank account
- Earn Naira rewards by referring friends
- Grab discounted deals on airtime and data

---

### The Home Screen

The home screen is the first thing a user sees after logging in. It is designed to make the most common actions immediately reachable.

**Header:**
A greeting with the user's name and profile avatar on the left, and a notification bell on the top right.

**Wallet Card:**
The user's Naira balance displayed prominently. A hide/show toggle for privacy. The user's dedicated account number with a one-tap copy button — this is how they fund their wallet via bank transfer.

**Quick Action Tiles (8 tiles, two rows):**

| Airtime | Data | Electricity | TV |
|---------|------|-------------|-----|
| Betting | Withdraw | Deposit | History |

**Deals of the Day:**
A horizontally scrollable row of cards with discounted airtime and data offers. Each card shows the offer, the discounted price, and a "Grab Offer" button that drops the user directly into the payment flow with details pre-filled.

**Recent Activity:**
A short list of the user's last few transactions — quick reference without navigating to History.

---

### Navigation

Five tabs, always visible at the bottom of the screen:

| Tab | Purpose |
|-----|---------|
| Home | Wallet card, action tiles, deals, recent activity |
| Bills | Browse all bill payment categories |
| History | Complete transaction history |
| Referral | Referral link, earnings, how it works |
| Profile | Settings, KYC, bank accounts, PIN, support |

---

### Bill Payment Flow

Every bill category follows the same steps:

1. Choose a provider (e.g. MTN, EKEDC, DStv)
2. Enter the details (phone number, meter number, decoder number, or user ID depending on the category)
3. Select a plan or enter an amount
4. Review a summary of what you are about to pay
5. Enter your 4-digit PIN to confirm
6. Receive a receipt with full transaction details

---

### Bill Categories

**Airtime** — Top up any Nigerian number on any network (MTN, Glo, Airtel, 9mobile). Works for self or others.

**Data** — Choose a network and select a data bundle from a list (1GB, 2GB, 5GB, etc.) at fixed prices.

**Electricity** — Choose a distribution company (EKEDC, IKEDC, AEDC, PHED, IBEDC, KEDCO), enter the meter number, and pay. A token is generated for the user.

**TV / Cable** — Choose a provider (DStv, GOtv, Startimes, Showmax), enter the smartcard or decoder number, select a subscription package, and renew.

**Betting** — Choose a platform (Bet9ja, SportyBet, 1xBet, BetKing, NairaBet, MerryBet), enter the user ID, and fund the account.

---

### Deals of the Day

Time-limited or discounted offers that live on the home screen. Examples:

- "Get ₦1,000 airtime for ₦800"
- "Get 2GB data for ₦800"

Tapping "Grab Offer" takes the user straight into a pre-filled payment flow. This section makes the home screen feel alive and rewarding to open every day.

---

### Referral & Earn

Users receive a unique referral link to share with friends. When a referred friend signs up and completes their first transaction, the referrer earns a Naira reward in their wallet.

The Referral screen shows the link (easy to copy and share), the number of people referred, total earnings, and a clear explanation of the reward terms.

---

### Profile & Account Management

Everything a user needs to manage their account:

- **KYC** — identity verification to unlock higher transaction limits
- **Transaction PIN** — set and update the 4-digit PIN used to authorise payments
- **Bank Details** — add and manage bank accounts for withdrawals
- **Password** — update login credentials
- **Profile Info** — name, email, phone, profile photo
- **Notifications** — alerts and messages from the platform
- **Support** — contact and help options
- **Appearance** — light or dark mode

---

## Design Direction

### Two Products, One Company

The relationship between the existing Celler web/iOS app and this new Android app is the same as WhatsApp iOS vs WhatsApp Android in their earlier years — or Truecaller on different platforms. Same company, same backend, same core product. But designed as if by two different UI teams, with two distinct visual personalities.

They are not the same app reskinned. A user who has used both would recognise they come from the same company but would not confuse one for the other.

### What Is Different

- The splash screen is its own design — not copied from the web app
- The onboarding flow may differ in sequence or tone
- Individual UI components (buttons, cards, inputs) may be styled differently even where they serve the same function
- The overall colour palette and typography operate within the same brand family but take a different direction

### What Is Consistent

- The brand name (once confirmed) and its values
- The same underlying accounts, balances, and transaction history (same backend API)
- The same core product logic — how payments work, how referrals work

### Design Reference

The structural layout follows the "Hello Jonathan" Figma design the team has been working on: wallet card at top, action tile grid, deals section, recent activity. The Android app follows this structure but is styled distinctly as its own product — not a copy of the reference.

---

## What This App Intentionally Does NOT Have at Launch

- Any cryptocurrency (no Bitcoin, Ethereum, USDT, or any other coin)
- Crypto trading or swapping
- Gift card buying or selling
- Cross-currency exchange of any kind

These features are preserved in the Celler web and iOS apps. They are excluded from the Android launch to ensure a clean, policy-compliant first submission. They come back in Phase 2 and Phase 3 on a controlled timeline.

---

## Scope of Work

The developer is responsible for the full journey from build to going live on Google Play. This covers two distinct phases:

**Phase 1 — Build**
The Android app is built using the same web technology as the existing Celler platform. The new screens and navigation live in the same codebase alongside the existing app without touching or affecting anything that currently works. The existing Celler web and iOS experience must remain completely intact throughout.

**Phase 2 — Packaging and Go-Live**
The developer packages the web build into an Android application (APK/AAB format), handles the Play Store submission end to end — including all required documentation, screenshots, metadata, and compliance — and sees the app through to being live and downloadable by real users on Google Play.

Payment for the engagement is tied to go-live, not to build completion alone.

---

## Developer Acceptance Criteria

This section defines the conditions that must be fully met for the developer's work to be considered complete and for final payment to be released. All criteria below are required — partial completion does not satisfy the contract.

---

### A. Core Screens and Navigation

- [ ] The app opens with a distinct splash screen — not a copy of the existing Celler web app's splash
- [ ] New user onboarding (sign up, email verification, PIN setup) completes successfully
- [ ] Returning user login works (email and password, with 2FA where applicable)
- [ ] The home screen displays: the user's Naira balance, the account number with copy function, all 8 action tiles, a Deals of the Day section, and a recent activity list
- [ ] The balance can be hidden and revealed using the eye toggle
- [ ] Bottom navigation has exactly five tabs — Home, Bills, History, Referral, Profile — and each tab navigates to the correct screen

---

### B. Bill Payment — Full Flow for All Five Categories

Each of the following categories must work end to end — from selecting the service, through provider selection and detail entry, to PIN confirmation and a receipt being shown:

- [ ] Airtime — for all four networks (MTN, Glo, Airtel, 9mobile)
- [ ] Data — for all four networks, with selectable bundle plans
- [ ] Electricity — for all supported distribution companies, generating a payment token
- [ ] TV / Cable — for all supported providers (DStv, GOtv, Startimes, Showmax), with package selection
- [ ] Betting — for all supported platforms (Bet9ja, SportyBet, 1xBet, BetKing, NairaBet, MerryBet)

---

### C. Wallet

- [ ] The Deposit screen clearly shows the user's dedicated account number for funding via bank transfer
- [ ] The Withdraw flow allows the user to send their Naira balance to a registered Nigerian bank account, with PIN confirmation before any funds move
- [ ] The wallet balance updates correctly after transactions

---

### D. Deals of the Day

- [ ] At least three deals are visible on the home screen in a horizontally scrollable row
- [ ] Tapping "Grab Offer" on any deal takes the user directly into the relevant payment flow with the details pre-filled
- [ ] The section is visually distinct and does not feel like placeholder content

---

### E. Referral

- [ ] The Referral screen is accessible from the bottom nav
- [ ] The user's unique referral link is displayed and can be copied or shared in one tap
- [ ] The screen shows the number of successful referrals and total Naira earned

---

### F. Transaction History

- [ ] The History tab shows a complete list of all past transactions
- [ ] Each transaction entry shows the type, amount, date, and status
- [ ] Tapping a transaction shows its full details

---

### G. Profile and Account Management

All of the following must be accessible from the Profile tab and fully functional:

- [ ] Edit profile (name, photo, phone number)
- [ ] KYC verification flow (identity document submission)
- [ ] Update transaction PIN
- [ ] Update password
- [ ] Add and manage bank accounts for withdrawal
- [ ] View and manage notifications
- [ ] Access support
- [ ] Toggle between light and dark mode

---

### H. Quality and Compatibility

- [ ] The app runs without crashing on any standard Android device running Android 8.0 or later
- [ ] All screens are properly sized and usable on standard Nigerian Android phone screen sizes (5 to 6.7 inches)
- [ ] No screen is broken, blank, or unresponsive under normal usage
- [ ] The app loads to the home screen within five seconds on a standard mobile data connection

---

### I. Safety — Existing Platform Untouched

- [ ] The existing Celler web app functions identically to how it did before this project began
- [ ] The existing iOS Celler app is unaffected
- [ ] No existing user accounts, data, or transactions are altered or lost
- [ ] The new Android build is a clean parallel addition — it shares the codebase but does not interfere with anything already live

---

### J. Play Store — Go-Live

- [ ] The app is submitted to Google Play under the agreed new developer account and business entity
- [ ] The Play Store listing is complete — app name, description, screenshots (minimum five), category, content rating, privacy policy link, and contact details all filled in
- [ ] The app passes Google Play's review and is approved without policy violations
- [ ] The app is publicly live and downloadable by any Android user in Nigeria
- [ ] The app remains live without a policy-related takedown for a minimum of 30 days after launch

If the app is rejected by Google Play during review, the developer is responsible for addressing the rejection reasons and resubmitting until approval is achieved, within the agreed timeline.

---

## Open Items for Stakeholders to Resolve

These decisions must be made before the Play Store submission. They do not block the build but they block go-live.

| Decision | Owner | Status |
|----------|-------|--------|
| Confirm final app name (Zella or alternative) | Product / Founders | Open |
| Register new CAC business entity for Play Store account | Legal / Admin | Open |
| Open new Google Play developer account under new entity | Ops | Blocked by CAC |
| Design final logo for the new app | Design | Blocked by name decision |
| Confirm whether Deals of the Day are static or live in this version | Product | Open |
| Set target go-live date | Product / Engineering | Open |
