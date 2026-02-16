

# Referral System PRD

## Overview
A referral rewards program where users earn NGN 5,000 for each referred user who signs up, completes KYC verification, and makes their first trade (buy, sell, or swap).

## Reward Structure
- **Reward per referral**: NGN 5,000 (admin-adjustable)
- **Trigger conditions**: Referred user must (1) sign up using referral code, (2) complete KYC verification, and (3) execute at least one trade
- **Payout currency**: NGN (credited to Naira wallet upon approval)

## Withdrawal Rules
- **Weekly withdrawal limit**: NGN 10,000 (admin-adjustable)
- **Process**: User submits a redemption/withdrawal request from their referral earnings balance
- **Admin approval required**: All withdrawal requests go to a pending state and must be manually approved by an admin before funds are released to the user's NGN wallet
- **Fraud control**: Admin can reject suspicious requests

## Referral Lifecycle

```text
+------------------+     +------------------+     +------------------+
|  User shares     | --> |  Friend signs up | --> |  Friend verifies |
|  referral code   |     |  with code       |     |  KYC             |
+------------------+     +------------------+     +------------------+
                                                          |
                                                          v
+------------------+     +------------------+     +------------------+
|  NGN 5,000 added | <-- |  Reward unlocked | <-- |  Friend makes    |
|  to referral     |     |                  |     |  first trade     |
|  earnings balance|     +------------------+     +------------------+
+------------------+
         |
         v
+------------------+     +------------------+     +------------------+
|  User requests   | --> |  Admin reviews   | --> |  Approved: funds |
|  withdrawal      |     |  & approves      |     |  sent to NGN     |
|  (max 10k/week)  |     |                  |     |  wallet          |
+------------------+     +------------------+     +------------------+
```

## Referral Page UI

### Top Section
- Banner: "Earn NGN 5,000 per Referral"
- Subtitle explaining the 3-step requirement (signup, verify, trade)

### Stats Cards
- **Total Earned** (lifetime referral earnings)
- **Available Balance** (withdrawable amount)
- **Withdrawn This Week** / **Weekly Limit** (e.g., NGN 2,000 / NGN 10,000)

### Referral Code & Link
- Display unique code with copy button
- Full referral link with copy button
- Share button (Web Share API)

### Referral List
Each referral entry shows:
- Friend's name (or masked email)
- Status badge: `Signed Up` | `Verified` | `Traded` (reward unlocked) | `Expired`
- Date joined
- Reward amount (greyed out until unlocked, green when earned)

### Withdrawal Section
- "Withdraw Earnings" button
- Amount input (capped at available balance and weekly remaining limit)
- Shows weekly limit usage
- Submit creates a pending request

### Withdrawal History
- List of past redemption requests
- Each shows: amount, date, status (`Pending` | `Approved` | `Rejected`)

## Admin-Adjustable Variables (stored in localStorage for prototype)
- `referralRewardNgn`: NGN 5,000 (default)
- `weeklyWithdrawLimitNgn`: NGN 10,000 (default)
- These are read from a config store so they can be changed from an admin settings page later

## Data Model (localStorage)

**Referral Config**:
```text
{
  rewardAmountNgn: 5000,
  weeklyWithdrawLimitNgn: 10000
}
```

**Referrals Array**:
```text
{
  id, referredName, referredEmail,
  dateJoined, status: "signed_up" | "verified" | "traded",
  rewardUnlocked: boolean, rewardAmountNgn
}
```

**Withdrawal Requests Array**:
```text
{
  id, amountNgn, dateRequested,
  status: "pending" | "approved" | "rejected",
  dateResolved?
}
```

## Technical Approach
- Extend `src/lib/crypto.ts` with referral store functions (config, referrals list, withdrawal requests)
- Rebuild `src/pages/Referral.tsx` with the full UI described above
- Add mock referral data (mix of statuses) so the page feels alive
- Withdrawal approval will credit the user's NGN wallet balance via `store.updateWalletCoin("NGN", amount)`
- No admin page in this phase -- approvals can be simulated with mock data

