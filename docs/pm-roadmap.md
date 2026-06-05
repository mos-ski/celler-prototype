# Celler — Product Roadmap: What's Next

> **Context:** Celler is a live Nigerian crypto exchange. This prototype mirrors what exists today. The question is: **what do we build next to grow users, revenue, and retention?** Pure PM perspective — no code talk.

>
> **How to read each item:**
> - **What** — the feature in plain language
> - **Why Now** — why this matters at this stage, what it unlocks
> - **What To Do** — concrete, actionable steps
> - **The Win** — measurable outcome or strategic advantage
> - **Priority** — P0 (next 4 weeks), P1 (next quarter), P2 (next 2 quarters), P3 (backlog)

---

## STRATEGIC PILLARS

Everything below maps to one of four pillars that drive the business:

| Pillar | Goal | Key Metric |
|--------|------|-------------|
| **Trust** | Make users comfortable depositing real money | % of signups that complete first deposit |
| **Engagement** | Make users open the app daily | DAU/MAU ratio |
| **Revenue** | Increase fee revenue per user | ARPU (average revenue per user) |
| **Growth** | Acquire users without burning cash on ads | % of new users from referrals |

---

## PRIORITIZATION FRAMEWORK

Features are evaluated across five weighted dimensions. The composite score maps directly to the P0–P3 priority scale.

| Dimension | Weight | What It Measures | Low (1) | Medium (3) | High (5) |
|-----------|--------|------------------|---------|------------|----------|
| **User Impact** | 30% | How many users benefit, and how much? | Niche segment, occasional use | Moderate user base | All users, daily use |
| **Revenue Potential** | 25% | Direct or indirect revenue uplift | Minimal revenue lift | Moderate uplift | High-margin, high-volume |
| **Strategic Alignment** | 20% | How many pillars does it drive? | Nice-to-have, tangential | Supports one pillar | Drives multiple pillars |
| **Implementation Effort** | 15% | Engineering + operational complexity | Heavy lift (months) | Moderate (weeks) | Quick win (days) |
| **Competitive Urgency** | 10% | Are competitors shipping this now? | No competitor has it | Some competitors have it | Table stakes — expected |

### Priority Mapping

| Weighted Score | Priority | Timeline | What It Means |
|----------------|----------|----------|----------------|
| 4.0 – 5.0 | **P0** | Next 4 weeks | Ship now — high impact, urgent, or revenue-catalytic |
| 3.0 – 3.9 | **P1** | Next quarter | Build next — strong ROI, feeds the P0 foundation |
| 2.0 – 2.9 | **P2** | Next 2 quarters | Plan ahead — differentiator, requires P0/P1 foundations |
| 1.0 – 1.9 | **P3** | Backlog | Worth doing, but not yet — revisit when capacity opens |

### Applied Example: Portfolio Performance & Charting (P0)

| Dimension | Score | Rationale |
|-----------|:-----:|-----------|
| User Impact | 5 | Every user checks their portfolio; charts make the app "checkable" 3-5x/day |
| Revenue Potential | 4 | Higher engagement → more trades → more fee revenue |
| Strategic Alignment | 5 | Drives Engagement (daily opens) and Revenue (trade volume) |
| Implementation Effort | 3 | Chart libraries are well-established; cost-basis tracking adds moderate complexity |
| Competitive Urgency | 5 | Every exchange has portfolio charts — shipping without them is a retention risk |

**Weighted Score:** (5 × 0.30) + (4 × 0.25) + (5 × 0.20) + (3 × 0.15) + (5 × 0.10) = **4.45 → P0**

---

## P0 — NEXT 4 WEEKS

These are the highest-leverage moves. Each one either unlocks a revenue stream, removes a wall between the user and their money, or prevents churn.

---

### 1. Portfolio Performance & Charting

**What:** Show users how their portfolio is performing over time — total balance chart, profit/loss, per-coin price charts, and a "Top Movers" section.

**Why Now:** This is the single highest-engagement feature on any exchange. Right now, a user opens Celler, sees a number, and closes it. There's no reason to come back. A portfolio chart makes the app "checkable" — users open it 3-5x a day to see how they're doing. It turns a static balance into an emotional experience (your portfolio went up! or time to buy the dip!).

More importantly: without price charts, users go to CoinGecko or Binance to check prices, then come back to Celler to trade. Every time they leave your app, some of them don't come back. Keep them in-app.

**What To Do:**
- Add a portfolio value chart to the dashboard. Default view: 7 days. Toggle: 24h, 30d, 90d, 1y.
- Show total P&L as a percentage and in NGN (e.g., "Up 12.4% (₦48,200) this week").
- Each coin detail page gets a full price chart with the same time ranges plus 1h.
- Add a "Top Movers" card above the asset list — the 3 coins that moved the most in 24h (up and down). This is a proven engagement driver on every exchange.
- Track cost basis: record the purchase price when users buy so P&L is accurate, not just speculative.

**The Win:**
- DAU increase of 30-50% (users check their portfolio multiple times daily — this is the #1 reason people open finance apps)
- Higher swap and sell volume (when users see a coin is up, they're more likely to take profit)
- Reduced bounce to competitors for price checking
- Top Movers creates trading activity — people buy what's going up

**Priority:** P0

---

### 2. Price Alerts

**What:** Let users set custom alerts for price movements and get notified when triggered.

**Why Now:** This is the highest-ROI feature you can build right now — low effort, massive engagement impact. Every major exchange has price alerts. They're the #1 reason users come back to the app: "BTC just hit ₦145M, better go check my portfolio." Without alerts, users either check obsessively (bad UX) or forget about Celler entirely (churn). Each triggered alert is a free, re-engagement touchpoint that brings the user back into the trading flow.

**What To Do:**
- Add a "Set Alert" button on every coin detail page and next to each coin in the asset list.
- Alert types: Price above X, Price below X, Price change ±X% in 24h.
- Deliver via push notification and in-app notification badge.
- Add an "Alerts" tab in the notification center showing active and triggered alerts.
- Allow multiple alerts per coin (e.g., BTC above ₦150M AND BTC below ₦130M).
- Simple toggle: one tap to turn an alert on/off.

**The Win:**
- Each triggered alert = 1 app open = 1 trading opportunity. Expect 15-25% of DAU to come from alert triggers within 3 months.
- Users who set alerts have 2-3x higher retention than users who don't (industry benchmark).
- Alerts make Celler proactive instead of passive — you come to the user, rather than waiting for the user to remember you exist.

**Priority:** P0

---

### 3. Smart Notifications System

**What:** Build a real notification engine that delivers timely, relevant, actionable messages — not just "something happened" but "here's what happened and what you can do about it."

**Why Now:** Right now, the app has 4 hardcoded notification items. None of them are real. A dead notification center is worse than no notification center — it teaches users to ignore it. Fix this, and notifications become your strongest retention and revenue tool.

**What To Do:**

Build three categories, each with different rules:

**Transactional (always on, not optional):**
- Deposit credited — "₦250,000 has been added to your NGN wallet. Ready to buy BTC →"
- Withdrawal processed — "Your 0.05 BTC withdrawal is confirmed. View details →"
- Swap completed — "0.15 ETH swapped for 0.38 BNB. See receipt →"
- KYC approved — "Your Tier 2 verification is approved! Your limits are now ₦705,000/withdrawal."
- Gift card approved — "Your Amazon gift card was approved. ₦52,500 credited to your wallet."
- Security alerts — "New login from iPhone 12, Lagos. Was this you?" with a "Secure my account" button.

**Price & Market (opt-in):**
- Daily portfolio summary at a time the user chooses
- Weekly market recap email
- Coin listing announcements

**Social & Promo (opt-in, default off):**
- Referral reward earned
- Limited-time fee discounts
- New feature announcements

**Notification preferences:** Let users choose categories and channels (push, email, SMS, in-app). Add quiet hours.

**The Win:**
- Transactional notifications build trust — users know what's happening with their money in real-time.
- Each notification with a deep link (tap to go to the relevant screen) drives 15-30% more app opens.
- Users who receive transactional notifications have 40% higher 30-day retention (industry data).
- This is infrastructure — every future feature (alerts, referral updates, bill reminders) uses this system.

**Priority:** P0

---

### 4. Bill Payments — Ship Airtime & Data First

**What:** Enable users to buy airtime and data bundles directly from their NGN wallet. Then expand to electricity, TV subscriptions, and more.

**Why Now:** The bill payments screen currently says "Coming Soon." But the data and category structure are already built. Airtime and data are the highest-frequency financial transactions in Nigeria — the average Nigerian buys airtime 3-5 times per week. This is not a crypto feature. It's a daily-use feature that makes Celler the app they open every morning.

Here's the flywheel: User opens Celler to buy airtime → sees their NGN balance → wonders "should I buy some BTC today?" → buys crypto. Bill payments turn Celler from a sometimes-app into an everyday-app.

**What To Do:**
- **Phase 1 — Airtime & Data (Week 1-2):** Integrate VTpass (or similar). Support all 4 carriers (MTN, Glo, Airtel, 9mobile). Pay from NGN wallet balance. Instant delivery. Add a transaction history tab specifically for bills.
- **Phase 2 — Electricity Tokens (Week 3-4):** Support prepaid meter token purchases. Users enter their meter number, select amount, receive token via notification. This is monthly recurring revenue.
- **Phase 3 — TV Subscriptions (Month 2):** DStv, GOtv, Showmax. Add subscription reminders ("Your DStv expires in 3 days. Renew now?").
- **Phase 4 — Betting (Evaluate):** Controversial. Decide if it aligns with your brand before shipping.
- On the dashboard, add a "Quick Bill Pay" card below the portfolio chart for one-tap access.
- After every bill payment, show a nudge: "You have ₦X left in your NGN wallet. Invest it today?"

**The Win:**
- DAU increase of 2-3x for users who adopt bill payments (they'll open the app for airtime alone).
- Increased NGN wallet balances — users top up for bills, then trade the excess.
- Bill payments have slim margins (1-3%) but they're high-volume and drive habit formation.
- Competitive parity — Busha, Quidax, and Palmpay all offer bill payments. Users expect it.

**Priority:** P0

---

## P1 — NEXT QUARTER

These features drive growth, revenue, and differentiation. They build on the P0 foundation.

---

### 5. Referral Program 2.0 — From Flat to Viral

**What:** Upgrade the referral system from a flat ₦5,000 bonus to a growth engine with two-sided rewards, milestone unlocking, limited-time boosts, and a leaderboard.

**Why Now:** Nigerian crypto users rely heavily on peer recommendations. Word of mouth is the #1 acquisition channel for fintechs in Nigeria. A well-designed referral program can drive 20-30% of new signups at near-zero CAC. But the current system (flat bonus, no urgency, one-sided) isn't designed for virality. It's a checkbox, not a growth lever.

**What To Do:**
- **Two-sided rewards:** Both referrer AND referred user get a bonus. "Invite a friend — you get ₦5,000, they get ₦2,500 in free BTC." Two-sided rewards increase conversion by 2-3x because the referrer can offer their friend something.
- **Milestone-based unlocking:** Referral signs up → ₦1,000 locked. Completes KYC → ₦2,000 unlocked. Makes first trade → ₦2,000 unlocked. This drives referred users through your entire funnel instead of just signing up and ghosting.
- **Limited-time boosts:** Run "Double Referral Weekend" or "Referral Week" monthly. 2x bonuses create urgency and cause spikes in acquisition.
- **Referral leaderboard:** Top 3 referrers each month get a bonus prize (e.g., ₦50,000, ₦30,000, ₦20,000). This gamifies referrals and creates power users.
- **WhatsApp-first sharing:** Pre-built share messages optimized for WhatsApp (the #1 sharing channel in Nigeria). Include the referral code in the message text, not just a link — many users share via screenshots, not links.
- **Attribution tracking:** Know which channel each referral came from (WhatsApp, Twitter, direct link) so you can optimize and double down on what works.

**The Win:**
- 20-30% of new signups from referrals (industry benchmark for Nigerian fintechs).
- Referred users have 25-40% higher retention than organic users (they came from a friend's recommendation).
- Lowest CAC channel — you pay for results, not impressions.
- Monthly boosts create predictable acquisition spikes.

**Priority:** P1

---

### 6. Gift Card Experience Overhaul

**What:** Transform gift card trading from a basic flow into a fast, transparent, trust-building experience with real-time rates, rate locking, faster processing, and fraud detection.

**Why Now:** Gift cards are one of the highest-margin products in a Nigerian exchange (20-40% margins). They're also a gateway drug for new crypto users — many people's first interaction with crypto is selling a gift card for naira, then wondering "what if I bought BTC instead?" But the current experience is generic: upload a card, wait, hope it gets approved. There's no rate transparency, no processing time estimates, and no trust signals. Sellers who have bad experiences (slow payouts, unclear rates) leave permanently and tell their friends.

Competitors like Cardtonic and Prestmit have optimized this flow end-to-end. You need to at least match them.

**What To Do:**
- **Real-time dynamic rates:** Show live rates that update based on supply and demand. When you have too many Amazon cards, the rate drops. When inventory is low, it rises. Display prominently: "Amazon: 72%/₦360,000 in stock — rates may change."
- **Rate lock:** When a user selects a rate, lock it for 15 minutes while they complete the trade. This eliminates "the rate changed while I was uploading my card" — the #1 complaint in gift card trading.
- **Processing time estimates:** "Amazon cards are typically processed in 10 minutes." "Steam cards take 20-30 minutes." Set expectations so users aren't left guessing.
- **Real-time order tracking:** Submitted → Under Review → Approved → Credited. Push notification at each stage.
- **Reputation system:** Frequent sellers get a badge ("Verified Seller"), priority processing, and slightly better rates (1-2% bonus). This incentivizes repeat selling.
- **Fraud prevention:** Detect duplicate card codes, flag suspicious patterns (same card submitted by multiple users), and verify card balances before payout.
- **Expanding brand coverage:** Start with the 8 brands you have, but add more based on demand data: Nike, Sephora, eBay, Walmart, Mastercard Vanilla. Ask users which brands they want via a feedback form.

**The Win:**
- 5-15% margin improvement through dynamic rates.
- Higher repeat rate — sellers who get fast, transparent processing come back.
- Lower fraud losses — duplicate detection alone can save 2-5% of revenue.
- Gift card sellers are your easiest crypto converts — they already have NGN in their wallet.

**Priority:** P1

---

### 7. Fee Transparency & Tiered Pricing

**What:** Create a public, clear fee schedule, and introduce volume-based fee tiers that reward your best traders and incentivize more trading.

**Why Now:** Nigerian crypto users are extremely fee-sensitive. They comparison-shop across exchanges before every trade. If they can't find your fees easily, they assume you're hiding something. If your fees are flat with no volume discount, power traders leave for competitors who reward their volume.

Right now, fees are configured but not prominently displayed. Users discover them mid-transaction, which feels like a hidden cost. And all users pay the same rate regardless of volume.

**What To Do:**
- **Public fee page:** Add a "Fees" link in the footer and in every transaction confirmation screen. List every fee clearly: trade (1.5%), swap (0.8%), withdrawal (crypto: $0.50, NGN: ₦100), gift card rates by brand. No asterisks.
- **In-transaction fee preview:** Before every trade, show "You'll pay ₦X in fees (1.5%). You'll receive ₦Y." Full transparency before commitment.
- **Volume-based fee tiers:**
  - Bronze (default): 1.5% trade, 0.8% swap
  - Silver (₦5M+ monthly volume): 1.2% trade, 0.6% swap
  - Gold (₦20M+ monthly volume): 0.9% trade, 0.4% swap
  - Platinum (₦100M+ monthly volume): 0.6% trade, 0.2% swap
- Users see their current tier and how much more they need to trade to reach the next one. This is gamification that directly drives revenue.
- **Celler Pro subscription (₦5,000/month):** Zero-fee trades (or 0.5%), priority support, higher withdrawal limits, early access to new features, "Pro" badge. This creates recurring revenue and appeals to serious traders.
- **Fee comparison:** "Our fees vs. Other exchanges" on the fee page. Nigerian users comparison-shop — show them you're competitive.

**The Win:**
- Trust: transparent fees increase conversion rates on trades (users who know the cost upfront complete more transactions).
- Volume increase: tiered pricing incentivizes 20-40% more trading volume as users chase the next tier.
- Recurring revenue: even ₦5,000/month × 1,000 Pro subscribers = ₦5M/month predictable revenue.
- Retention: Pro users don't leave — they're paying for the privilege.

**Priority:** P1

---

### 8. Portfolio P&L Tracking with Cost Basis

**What:** Track what users paid for each coin so you can show accurate profit/loss — not just current balance, but "you invested ₦X, it's now worth ₦Y, that's a +Z% return."

**Why Now:** This is deeper than the portfolio chart (#1). The chart shows value over time, but P&L tracking shows *how much money the user has made or lost*. This is the question every investor asks first: "Am I up or down?" Without an answer, users open a spreadsheet or use another app to calculate it — and that other app might become their primary exchange.

Cost basis tracking also unlocks tax reporting (future feature) and makes Celler feel like a serious financial platform.

**What To Do:**
- Every buy/sell/swap records: amount, purchase price, purchase date, fees paid.
- Show per-coin P&L: "You bought 0.005 BTC for ₦475,000. It's now worth ₦512,300. Up 7.8%."
- Show total portfolio P&L: "Total invested: ₦1,200,000. Current value: ₦1,340,000. Up 11.7%."
- Add unrealized vs. realized gains breakdown. This matters for tax purposes.
- Show average entry price per coin.
- "If you sold now" preview on each coin: "Selling 0.005 BTC now would give you ₦512,300 after fees."

**The Win:**
- Portfolio P&L is the #1 reason people open investing apps. Expect 20-30% DAU increase from existing users.
- Users who see their gains are 2x more likely to trade (taking profits, buying dips).
- This is table stakes — every competitor has it. Not having it is a reason to switch away.

**Priority:** P1

---

### 9. Admin Operations Dashboard — Real Data, Real Actions

**What:** Replace the mock admin dashboard with a functional operations center that shows real data and enables real actions.

**Why Now:** You can't scale operations without operational tools. Right now, the admin dashboard shows fake data. Every real scenario — processing a gift card, reviewing KYC, freezing a suspicious account, updating a fee — requires a real dashboard. Until this works, your operations team is doing everything manually (spreadsheets, direct database queries, or not at all).

**What To Do:**
- **User management:** Search/filter users by name, email, KYC status, balance, activity. View full user profile, transaction history, wallet balances, and risk score. Freeze/unfreeze accounts.
- **KYC review queue:** Prioritized list of pending applications. See documents side-by-side (BVN photo vs. uploaded selfie). Approve, reject with reason, or request more info. Auto-approve Tiers 1 and 2 where possible.
- **Transaction monitoring:** Real-time feed of all transactions. Filter by type, amount, status. Flag suspicious patterns (same IP, rapid withdrawals, unusual amounts). Set up alerts for transactions above a threshold.
- **Gift card processing:** Queue of submitted cards with image viewer, rate calculator, and approve/reject workflow. Bulk processing for high-volume periods.
- **Fee management:** Change trade fees, swap fees, withdrawal fees, and gift card rates without a deployment. A/B test fee changes.
- **Notification composer:** Send targeted push notifications and emails to user segments (all users, KYC-complete, inactive, etc.).
- **Audit log:** Every admin action logged with timestamp, admin ID, and details. Non-negotiable for compliance.

**The Win:**
- Your ops team handles 10x the users without 10x the headcount.
- Faster KYC processing = faster time-to-first-trade = less user churn during onboarding.
- Fraud detection at the admin level prevents losses before they happen.
- Regulatory compliance requires an audit trail — you can't pass an audit without one.

**Priority:** P1

---

### 10. In-App Education & Guided Onboarding

**What:** Replace the generic 3-slide welcome carousel with a smart onboarding flow, and add in-app educational content for first-time crypto users.

**Why Now:** Nigeria has a massive population of first-time crypto users — people who have heard of Bitcoin but don't know what gas fees are, what a wallet address is, or why they should care. If you only serve experienced traders, you're ignoring 70% of your potential market. Your onboarding is the difference between "downloaded, confused, left" and "downloaded, learned, traded, stayed."

**What To Do:**
- **Smart onboarding:** Replace the 3-slide carousel with a branching flow. Ask: "New to crypto?" → 5 quick explainer cards (What is crypto? Why Celler? How to stay safe? How to make your first trade?). "Already a trader?" → Skip straight to the dashboard.
- **First-trade prompt:** For users with zero transaction history, show a prominent "Make your first trade" card with a suggested amount: "Start with ₦5,000 in BTC — that's about 0.00005 BTC." Make the first action obvious and small.
- **Learn section:** Short articles (<2 min each): What is Bitcoin? How to read a price chart. What are gas fees? How to avoid scams. What is KYC and why does it matter? How gift card trading works.
- **Contextual tooltips:** First time on the swap page? "Slippage is the difference between the expected price and the actual price. Keep it at 0.5% for most trades." First withdrawal? "Double-check the network — sending BTC to an ETH address means permanent loss."
- **Progress badge:** "Beginner → Trader → Pro" based on actions completed (first deposit, first trade, first swap, KYC verified). This gamifies learning.

**The Win:**
- Higher KYC completion: users who understand why KYC matters complete it 40% more often.
- Higher first-trade rate: users who see a suggested first trade are 2-3x more likely to complete one.
- Lower support volume: educational content reduces "what does this mean?" tickets by 30-50%.
- Market expansion: you become the easiest on-ramp for first-time crypto users in Nigeria.

**Priority:** P1

---

## P2 — NEXT TWO QUARTERS

These features differentiate Celler from competitors and open new growth channels.

---

### 11. Landing Page & Public Web Presence

**What:** Build a public-facing website that explains what Celler is, shows your fees, demonstrates security, and drives app downloads.

**Why Now:** When a Nigerian user hears about Celler from a friend, the first thing they do is Google "Celler crypto exchange." If they find nothing — or worse, find a competitor's ad — you lose them before they even try. A landing page is not marketing fluff; it's a conversion prerequisite. Every major competitor (Busha, Luno, Quidax) has one.

**What To Do:**
- Build a mobile-first landing page: hero section (what Celler does in one sentence), supported coins, fee comparison, security explanation, app download links, and social proof (user count, volume, ratings).
- Create dedicated pages: /fees, /security, /how-it-works, /supported-coins, /gift-cards.
- Add an FAQ section answering the top 20 questions Nigerian crypto users have.
- SEO optimization: rank for "crypto exchange Nigeria," "sell gift cards for naira," "buy bitcoin Nigeria," etc.
- Add testimonials and reviews (start with early users, expand as you get more).
- Link to your WhatsApp community and social media.
- Include a "Download App" CTA that links to the Play Store / App Store / PWA install prompt.

**The Win:**
- 3x higher conversion from search/social traffic → app download → signup.
- Organic traffic from SEO reduces dependency on paid ads.
- Public fee and security pages build trust before the user even creates an account.
- App store discovery (when users search for crypto exchanges on the Play Store).

**Priority:** P2

---

### 12. Celler Earn — Staking & Yield Product

**What:** Let users earn interest on their NGN and stablecoin (USDT/USDC) balances by locking funds for fixed periods.

**Why Now:** Nigerian savings accounts pay 5-10% interest. If Celler offers 8-12% on NGN and 5-8% on USDT, users have a compelling reason to keep money on the platform instead of moving it to their bank. This creates a "why withdraw?" dynamic — the money stays on Celler, earns interest, and is available to trade when the user wants.

**What To Do:**
- Offer 3 lock periods: 30 days (lower yield, higher flexibility), 90 days (medium yield), 180 days (highest yield).
- Back yields with real instruments: NGN yields from Treasury bills and money market funds, USDT yields from DeFi lending (Aave, Compound) or institutional lending.
- Show projected earnings on the dashboard: "Your ₦50,000 could earn ₦416/month in Celler Earn."
- Allow early withdrawal with a 1% penalty (keeps it flexible enough that users aren't scared to lock).
- Each earn position has its own dashboard: amount locked, daily interest accrual, maturity date, total earned.
- Start conservatively — it's better to under-promise and over-deliver on yield.

**The Win:**
- Increased NGN and USDT deposits (users move money from banks to Celler).
- Reduced withdrawal frequency (funds are locked and earning, not sitting idle).
- New revenue stream: the spread between what you earn on the capital and what you pay users.
- Differentiation: most Nigerian exchanges don't offer this, or offer it poorly.

**Priority:** P2

---

### 13. Transaction Export & Tax Tools

**What:** Let users export their transaction history in CSV, PDF, and Excel formats, and view a tax summary (gains, losses, net P&L).

**Why Now:** As crypto regulation increases in Nigeria, more users need transaction records for tax purposes. Even without regulation, serious traders and businesses need exports for their own bookkeeping. This is also a business-user acquisition tool — small businesses that accept crypto payments need proper records.

**What To Do:**
- Add "Export" buttons on the transaction history page with format options (CSV, PDF, Excel).
- Allow date range selection for exports.
- Create a tax summary view: total gains, total losses, net P&L per coin, estimated tax liability based on current Nigerian capital gains rules.
- For business users: a dedicated dashboard with bulk export and summary reports.
- Receipts downloadable as PDF with Celler letterhead, transaction reference, and company details.

**The Win:**
- Business user acquisition — businesses won't use an exchange without export.
- Trust signal: organized financial records = professional platform.
- Potential premium feature: advanced tax tools behind the Pro subscription paywall.
- Regulatory readiness: when CBN requires transaction reporting, you're already prepared.

**Priority:** P2

---

### 14. Dynamic Gift Card Rate Engine

**What:** Move from static rates (55-75% by brand) to dynamic rates that adjust daily based on supply, demand, processing capacity, and competitor pricing.

**Why Now:** Static rates mean you either overpay on cards you have too many of (losing margin) or underpay on cards you need (losing sellers to competitors like Cardtonic who offer better rates). Dynamic pricing is standard at every major gift card platform.

**What To Do:**
- Build a rate engine that adjusts rates based on: current inventory (how many Amazon cards are in the queue), processing capacity (how fast can your team approve cards), and competitor rates (what are Prestmit, Cardtonic, and Patricia offering?).
- Display real-time rates: "Amazon: 72% — rates may change." When rates go up, push notify active sellers: "Amazon card rates just went up! Sell now."
- Rate lock: freeze the displayed rate for 15 minutes during the sell process.
- Admin dashboard shows: current rates, inventory levels, processing times, and AI-suggested rate adjustments.
- Track sell-through rate per brand. If you're buying 100 Amazon cards/month but only offloading 30, drop the rate.

**The Win:**
- 5-15% margin improvement by optimizing rates for supply/demand.
- Higher volume: competitive rates attract more sellers.
- Lower inventory risk: avoid over-accumulating cards you can't offload.
- happier sellers: real-time rates and rate locking build trust.

**Priority:** P2

---

### 15. Mobile App (PWA First, Then Native)

**Why Now:** Most Nigerian crypto users trade on their phones. A web app can't send reliable push notifications on iOS, can't use biometric auth, and doesn't appear in the Play Store — where 85%+ of Nigerian users discover apps. If you're not in the Play Store, you don't exist for most of your market.

**What To Do:**
- **Phase 1 (2 weeks): PWA.** Add "Add to Home Screen" prompt. Enable offline caching for the dashboard. Service worker for faster loading. This gets you 80% of the native experience with near-zero effort.
- **Phase 2 (2-3 months): React Native app.** Reuse your business logic and API layer. Focus on: biometric login (FaceID/fingerprint), push notifications, camera access for KYC and gift cards, smooth animations.
- **Phase 3: Play Store launch first** (Android is 85%+ of Nigeria). App Store follows.
- Optimize for mobile: larger touch targets, thumb-friendly navigation, swipe gestures.
- Add deep linking: tap a price alert → opens the coin detail page. Tap a gift card notification → opens the order detail.

**The Win:**
- 3x higher 30-day retention for native apps vs. web (industry benchmark).
- Push notification delivery that actually works on iOS.
- Play Store = free organic discovery. Users search "crypto exchange" and find you.
- Biometric login reduces friction and increases security.

**Priority:** P2

---

### 16. Community & Trust Infrastructure

**What:** Build visible trust signals and a community presence that shows Celler is real, active, and reliable.

**Why Now:** Nigerian crypto users are skeptical — and they should be. Too many exchanges have taken people's money and disappeared. Trust is your #1 competitive moat. Users who don't trust you won't deposit money, no matter how good the app is. Trust isn't built by claiming to be trustworthy — it's built by being transparent and letting users verify for themselves.

**What To Do:**
- **In-app trust signals:** Show total users, total volume traded, average processing time, uptime percentage. Update in real-time. "35,000+ users trust Celler. ₦12.5B+ traded. 99.98% uptime."
- **Status page:** Create status.celler.app showing system health, planned maintenance, and incident history.
- **Community channels:** WhatsApp Community (not just a group — use Communities for organization). Telegram channel. Be present, answer questions, share updates.
- **Transparency reports:** Monthly blog post or email with user growth, volume, security updates, and any incidents handled.
- **User reviews:** After every completed trade or gift card sale, prompt "How was this experience?" Show aggregate ratings publicly.
- **Security page:** Public page explaining your security measures (2FA, PIN, encryption, KYC tiers). "Here's how we protect your money" is more powerful than any marketing copy.
- **Influencer partnerships:** Work with 3-5 trusted Nigerian crypto YouTubers and Twitter personalities for honest reviews and tutorials.

**The Win:**
- Trust directly correlates with deposits. Users who see social proof and transparency are 2-3x more likely to make a first deposit.
- Community channels double as customer support lite — power users help new users, reducing your support load.
- Transparency reports and a status page are table stakes for serious financial platforms.
- A linked WhatsApp community reduces churn — users feel connected and supported.

**Priority:** P2

---

## P3 — BACKLOG

These are valuable but not urgent. Ship them when you've exhausted the P0-P2 items or when you have excess capacity.

---

### 17. NGN Staking / Earn Product

(Covered in P2 as #12 — Celler Earn)

---

### 18. Localization — Yoruba, Hausa, Igbo, Pidgin

**What:** Translate the app into major Nigerian languages and Pidgin English.

**Why Later, Not Now:** English reaches the urban, tech-savvy segment — your early adopters. Localization unlocks the next wave of users, but it's expensive (professional translation, ongoing maintenance, testing) and doesn't help your current users. Prioritize after your English-language experience is rock-solid.

**What To Do When You're Ready:**
- Start with Yoruba (largest digital population in Lagos/Ogun tech hubs) and Pidgin (widely understood).
- Prioritize translation for: onboarding, buy/sell, fee disclosures, security warnings, error messages. These are the moments where confusion causes drop-off.
- Use professional translators — financial jargon in Yoruba must be precise, not Google-translated.
- Add a language toggle in settings. Detect device language on first launch.

**The Win:** 2-5x addressable user base expansion. First-mover advantage (no Nigerian crypto exchange is currently localized).

**Priority:** P3

---

### 19. Recurring Buys (DCA)

**What:** Let users set up automated recurring purchases: "Buy ₦10,000 of BTC every Monday."

**Why Later:** DCA is a power-user feature that deepens engagement and increases average deposit size. But it requires reliable NGN funding (bank mandates or auto-debits), which adds complexity. Ship after the core buy flow and bill payments are mature.

**What To Do When You're Ready:**
- Offer daily, weekly, bi-weekly, and monthly frequencies.
- Show projected returns: "If you invested ₦10,000/week for the last year, you'd have ₦620,000 worth of BTC."
- Send a notification before each purchase so users can cancel or adjust.
- Provide a DCA performance dashboard showing total invested, current value, and average purchase price.

**The Win:** Higher deposits (automated purchases mean predictable NGN inflows). Higher retention (users with a DCA plan don't leave). Higher trading volume (each DCA execution generates fee revenue).

**Priority:** P3

---

### 20. Watchlist

**What:** Let users track coins they don't own yet, with price alerts and a "Compare" view.

**Why Later:** Nice-to-have for engagement, but not a reason to use the app. Ship after the core experience (charts, alerts, P&L) is strong.

**What To Do When You're Ready:**
- Add a "Watch" toggle next to every coin in the asset list.
- Watchlist appears as a separate section on the dashboard.
- Pre-populate with trending coins the user doesn't own.
- One-tap buy from the watchlist.

**The Win:** Increases assets-list engagement. Users who watch coins they don't own yet are more likely to buy them.

**Priority:** P3

---

### 21. Advanced Trading Features (Limit Orders, Stop-Loss)

**What:** Let users set limit orders ("buy BTC when it drops to ₦130M") and stop-loss orders ("sell BTC if it drops below ₦120M").

**Why Later:** These are essential for serious traders, but they require an order book or at least a matching engine, which is a significant backend investment. Ship after the basic buy/sell flow has high volume and the real-time pricing infrastructure is stable.

**What To Do When You're Ready:**
- Limit orders: "Buy 0.001 BTC at ₦130M or lower." Execute when the price hits the target.
- Stop-loss orders: "Sell 0.001 BTC if BTC drops below ₦120M." Protects against crashes.
- Show open orders on the dashboard with status (pending, filled, cancelled, expired).
- Send notifications when orders fill or expire.

**The Win:** Attracts serious traders who currently use Binance or Bybit for limit orders. Higher trading volume (limit orders generate more fee revenue). Reduces emotional trading (users set plans in advance, not panic-sell).

**Priority:** P3

---

### 22. Business Accounts & Payroll

**What:** Offer a business tier with multi-user access, bulk payments, payroll, and dedicated support.

**Why Later:** Businesses are a high-value segment (higher volume, more predictable), but they have different needs (multi-user access, approval workflows, invoicing). This is a separate product that happens to share infrastructure. Don't distract from consumer growth.

**What To Do When You're Ready:**
- Business account with KYB (Know Your Business) verification.
- Multi-user access with roles: admin, trader, viewer.
- Bulk payment: pay 50 employees in one transaction.
- Payroll: automatically convert NGN payroll to BTC/USDT and distribute.
- Dedicated account manager for businesses above a volume threshold.
- Invoice generation and transaction export for accounting.

**The Win:** High-volume, high-retention customers. Businesses don't switch exchanges easily once integrated. 10x the volume of a consumer user. Premium pricing justified by premium features.

**Priority:** P3

---

### 23. API for Partners & B2B

**What:** Expose a public API that lets businesses and developers integrate Celler's trading, gift card, and bill payment functionality into their own apps.

**Why Later:** APIs create network effects and unlock use cases you can't build yourself. But they require significant investment in documentation, developer support, rate limiting, and security. Ship after the consumer experience is stable and the admin tools are mature.

**What To Do When You're Ready:**
- APIs for: market data, quotes, trade execution, gift card rates and submission, bill payments, wallet balances.
- Developer portal with documentation, sandbox, and API key management.
- Rate limiting per tier: free (100 requests/min), standard (1,000), enterprise (custom).
- Webhook notifications for trade confirmations and status changes.
- Monitor usage and charge per-transaction fees.

**The Win:** New revenue stream (API fees). Network effects: every integration brings users and volume. Businesses are sticky — once they integrate, they rarely switch.

**Priority:** P3

---

### 24. Compliance & Regulatory Readiness

**What:** Build the infrastructure to pass a regulatory audit, respond to government inquiries, and operate legally across Nigerian states and eventually other West African countries.

**Why Later (But Plan Now):** You don't need to be fully compliant on day one, but you need to architect for compliance. Every feature you build without compliance in mind creates retroactive work. Start planning now, implement over time.

**What To Do:**
- Audit log: every user action, admin action, and system event is logged with timestamp, actor, and details.
- KYC/AML policies: documented procedures for identity verification, suspicious activity reporting, and record retention.
- Transaction reporting: ability to export transaction volumes, patterns, and flagged activities for regulators.
- Data protection: comply with NDPR (Nigeria Data Protection Regulation). User consent, data access requests, right to deletion.
- Money laundering checks: flag transactions above regulatory thresholds, monitor for structuring (multiple small transactions just below the limit), and report suspicious activity.
- Reserve proof: periodic publication of proof-of-reserves showing you hold the assets you claim to hold.

**The Win:** Operating without regulatory risk. Ability to expand to other markets (Ghana, Kenya, South Africa) without rebuilding. Trust signal: "We're compliant and transparent" attracts institutional users and serious traders.

**Priority:** P3

---

## FEATURE PRIORITIZATION MATRIX

Every feature is scored across the five dimensions (1–5 scale) and weighted per the framework above. The composite score sets the initial priority; dependencies, sequencing, and strategic judgment may shift a feature up or down one band.

| # | Feature | Impact<br>(30%) | Revenue<br>(25%) | Strategic<br>(20%) | Effort<br>(15%) | Competitive<br>(10%) | Score | Priority |
|---|---------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | Portfolio Performance & Charting | 5 | 4 | 5 | 3 | 5 | **4.45** | P0 |
| 2 | Price Alerts | 5 | 4 | 5 | 4 | 5 | **4.60** | P0 |
| 3 | Smart Notifications System | 5 | 3 | 5 | 3 | 4 | **4.10** | P0 |
| 4 | Bill Payments — Airtime & Data | 5 | 5 | 5 | 4 | 5 | **4.85** | P0 |
| 5 | Referral Program 2.0 | 3 | 5 | 4 | 3 | 3 | **3.70** | P1 |
| 6 | Gift Card Experience Overhaul | 3 | 5 | 4 | 3 | 4 | **3.80** | P1 |
| 7 | Fee Transparency & Tiered Pricing | 3 | 5 | 4 | 4 | 3 | **3.85** | P1 |
| 8 | Portfolio P&L Tracking | 4 | 3 | 4 | 4 | 4 | **3.75** | P1 |
| 9 | Admin Operations Dashboard | 3 | 5 | 2 | 2 | 3 | **3.15** | P1 |
| 10 | In-App Education & Onboarding | 4 | 3 | 3 | 4 | 3 | **3.45** | P1 |
| 11 | Landing Page & Web Presence | 3 | 3 | 3 | 4 | 2 | **3.05** | P2 |
| 12 | Celler Earn — Staking & Yield | 2 | 5 | 3 | 2 | 2 | **2.75** | P2 |
| 13 | Transaction Export & Tax Tools | 2 | 2 | 2 | 5 | 2 | **2.45** | P2 |
| 14 | Dynamic Gift Card Rate Engine | 2 | 4 | 3 | 3 | 3 | **2.95** | P2 |
| 15 | Mobile App (PWA → Native) | 3 | 3 | 4 | 1 | 3 | **2.90** | P2 |
| 16 | Community & Trust Infrastructure | 3 | 2 | 3 | 3 | 2 | **2.65** | P2 |
| 18 | Localization — Yoruba, Hausa, Igbo, Pidgin | 2 | 2 | 2 | 2 | 1 | **1.90** | P3 |
| 19 | Recurring Buys (DCA) | 2 | 3 | 2 | 2 | 2 | **2.25** | P3 |
| 20 | Watchlist | 2 | 1 | 1 | 3 | 2 | **1.70** | P3 |
| 21 | Advanced Trading (Limit, Stop-Loss) | 1 | 3 | 2 | 1 | 3 | **1.90** | P3 |
| 22 | Business Accounts & Payroll | 1 | 3 | 3 | 1 | 1 | **1.90** | P3 |
| 23 | API for Partners & B2B | 1 | 4 | 2 | 1 | 1 | **1.95** | P3 |
| 24 | Compliance & Regulatory Readiness | 2 | 1 | 2 | 2 | 2 | **1.75** | P3 |

> **Reading the matrix:** Higher scores = higher priority. Features at the top of each band have the strongest case within that tier. Effort is scored inversely (1 = heavy lift, 5 = quick win), so a high-effort feature naturally scores lower — reflecting the reality that big bets need proportionally bigger impact to justify their slot.

---

## EXECUTION SUMMARY

### First 4 Weeks — Build Engagement & Revenue Foundations

| Week | Focus |
|------|-------|
| 1-2 | Portfolio charts + price alerts + P&L tracking |
| 3-4 | Notifications engine + bill payments (airtime/data) |

### Next Quarter — Growth & Revenue

| Month | Focus |
|-------|-------|
| 2 | Referral Program 2.0 + gift card overhaul |
| 3 | Fee transparency & tiered pricing + admin dashboard |
| 4 | In-app education + landing page |

### Next Two Quarters — Differentiation

| Quarter | Focus |
|---------|-------|
| Q3 | Celler Earn + transaction export + dynamic gift card rates + PWA |
| Q4 | Native app + community & trust + compliance readiness |

---

### Key Metrics to Track

| Metric | Why It Matters | Current Baseline | Target (6 months) |
|--------|---------------|------------------|--------------------|
| DAU/MAU ratio | Measures stickiness | Track from live app | >30% |
| First deposit rate | Trust — do users fund their account? | Track from live app | >40% of signups |
| Referral signup % | Growth — are users bringing users? | Track from live app | >20% |
| Gift card processing time | Speed — are we fast enough? | Track from live app | <15 min average |
| ARPU (monthly) | Revenue — how much does each user generate? | Track from live app | 2x in 6 months |
| KYC completion rate | Friction — where do users drop off? | Track from live app | >60% |
| Alert opt-in rate | Engagement — do users care about prices? | N/A (new feature) | >25% |
| Bill payment adoption | Daily usage — do users open the app daily? | N/A (new feature) | >30% of active users |

---

*This roadmap is a living document. Revisit priorities monthly based on user data, competitive moves, and what's actually moving the metrics.*