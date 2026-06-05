# Celler — User Stories

---

## EPIC 1: Authentication & Onboarding

### US-1.1 — View Splash Screen
**As a** first-time visitor,
**I want** to see a branded splash screen when I open the app,
**so that** I know I'm using the Celler platform.

**Acceptance Criteria:**
```gherkin
Given I open the Celler app
When the splash screen loads
Then I see the Celler logo with gradient branding
And I am automatically redirected after 2.5 seconds
```

### US-1.2 — View Welcome Carousel
**As a** new visitor,
**I want** to see an onboarding carousel explaining the app's value,
**so that** I understand what Celler offers before signing up.

**Acceptance Criteria:**
```gherkin
Given I have passed the splash screen
When I land on the welcome page
Then I see a 3-slide carousel with value propositions
And I can navigate between slides
And I see "Login" and "Sign Up" CTA buttons
```

### US-1.3 — Sign In to Existing Account
**As a** registered user,
**I want** to sign in with my email and password,
**so that** I can access my wallet and perform transactions.

**Acceptance Criteria:**
```gherkin
Given I am on the sign-in page
When I enter my registered email and correct password
And I tap "Sign In"
Then I am redirected to the dashboard
And my session is persisted in localStorage

Given I enter an incorrect password
When I tap "Sign In"
Then I see an error message indicating invalid credentials
```

### US-1.4 — Create New Account
**As a** new user,
**I want** to create an account through a multi-step process,
**so that** I can start using the platform securely.

**Acceptance Criteria:**
```gherkin
Given I am on the sign-up page
When I enter my email address
And I proceed to the OTP step
And I enter any valid 6-digit code
Then I proceed to the password creation step

Given I am on the password creation step
When I enter a password with 8+ characters, uppercase, and special character
And I confirm the password matches
Then my account is created
And I see a success confirmation
And I am redirected to sign-in or dashboard
```

### US-1.5 — Stay Logged In Across Sessions
**As a** returning user,
**I want** to remain logged in when I reopen the app,
**so that** I don't have to sign in every time.

**Acceptance Criteria:**
```gherkin
Given I have previously logged in
When I close and reopen the app
Then I am automatically redirected to the dashboard
And I do not see the sign-in screen
```

### US-1.6 — Log Out
**As a** logged-in user,
**I want** to log out of my account,
**so that** my account is secure when I'm done using the app.

**Acceptance Criteria:**
```gherkin
Given I am logged in and on the profile page
When I tap "Log Out"
Then my session is cleared from localStorage
And I am redirected to the sign-in page
```

---

## EPIC 2: Wallet & Dashboard

### US-2.1 — View Portfolio Balance
**As a** logged-in user,
**I want** to see my total portfolio balance in USD and NGN,
**so that** I know the total value of my assets at a glance.

**Acceptance Criteria:**
```gherkin
Given I am on the dashboard
When the page loads
Then I see my total balance displayed in USD
And I see the equivalent NGN value
And the balance reflects all coins in my wallet
```

### US-2.2 — View Asset List
**As a** user,
**I want** to see a list of my cryptocurrency holdings,
**so that** I can monitor each asset's balance and value.

**Acceptance Criteria:**
```gherkin
Given I am on the dashboard
When I scroll to the asset list
Then I see each coin with its icon, name, balance, and USD value
And I see the 24h price change percentage
And coins are sorted by default visibility settings
```

### US-2.3 — Access Quick Actions
**As a** user,
**I want** quick action buttons for common operations,
**so that** I can navigate to key features without searching.

**Acceptance Criteria:**
```gherkin
Given I am on the dashboard
When I view the quick actions section
Then I see buttons for Buy, Sell, Send, Receive, Swap, and More
And tapping each button navigates to the corresponding feature
```

### US-2.4 — Manage Visible Assets
**As a** user,
**I want** to toggle which coins appear on my dashboard,
**so that** I can customize my view to show only relevant assets.

**Acceptance Criteria:**
```gherkin
Given I am on the dashboard
When I tap "Manage Assets"
Then I see a list of all supported coins with toggle switches
And toggling a coin on/off updates my dashboard view
And my preferences are saved to localStorage
```

### US-2.5 — View Coin Details
**As a** user,
**I want** to tap on a coin to see its detailed information,
**so that** I can perform specific actions for that asset.

**Acceptance Criteria:**
```gherkin
Given I am on the dashboard
When I tap on a specific coin
Then I am taken to the coin detail page
And I see the coin's balance, USD value, and quick action buttons
And I see the transaction history for that specific coin
```

---

## EPIC 3: Crypto Swap

### US-3.1 — Swap Cryptocurrency
**As a** user,
**I want** to exchange one cryptocurrency for another,
**so that** I can rebalance my portfolio or acquire a different asset.

**Acceptance Criteria:**
```gherkin
Given I am on the swap page
When I select a "from" coin and enter an amount
Then I see the calculated "to" amount based on current rates
And I see the applicable fee and slippage tolerance
And I can review the details before confirming
And upon confirmation, my wallet balances are updated
And I see a success animation with transaction timeline
```

### US-3.2 — View Swap Rate and Fees
**As a** user,
**I want** to see the exchange rate and fees before confirming a swap,
**so that** I can make an informed decision.

**Acceptance Criteria:**
```gherkin
Given I have selected coins and entered an amount
When I view the swap summary
Then I see the exchange rate (toCoin/fromCoin)
And I see the fee percentage and amount
And I see the slippage tolerance
```

### US-3.3 — Swap Coin Selection
**As a** user,
**I want** to browse and select coins from a list for swapping,
**so that** I can choose any supported pair.

**Acceptance Criteria:**
```gherkin
Given I am on the swap page
When I tap the coin selector
Then I see a searchable list of all supported coins
And I can select any coin as the "from" or "to" asset
And I cannot select the same coin for both sides
```

---

## EPIC 4: Withdrawal

### US-4.1 — Withdraw Cryptocurrency
**As a** user,
**I want** to send cryptocurrency to an external wallet address,
**so that** I can transfer my assets off the platform.

**Acceptance Criteria:**
```gherkin
Given I am on the withdrawal page for a crypto coin
When I enter a withdrawal amount
And I enter a valid recipient address
And I review the summary including fees
And I authenticate with FaceID or PIN
Then the withdrawal is processed
And my wallet balance is reduced
And I see a success confirmation
And the transaction appears in my history
```

### US-4.2 — Withdraw NGN to Bank
**As a** user,
**I want** to withdraw Nigerian Naira to my bank account,
**so that** I can access my fiat funds.

**Acceptance Criteria:**
```gherkin
Given I am on the NGN withdrawal page
When I enter a withdrawal amount
And I select a linked bank account
And I review the summary including the flat 100 NGN fee
And I authenticate with FaceID or PIN
Then the withdrawal is processed
And my NGN balance is reduced
And I see a success confirmation
```

### US-4.3 — Add Bank Account
**As a** user,
**I want** to add a bank account for NGN withdrawals,
**so that** I have a destination for my fiat withdrawals.

**Acceptance Criteria:**
```gherkin
Given I am on the bank details page
When I enter bank name, account number, and account name
And I save the account
Then the bank account is added to my list
And I can set it as default
```

### US-4.4 — Authenticate Withdrawal
**As a** user,
**I want** to authenticate before completing a withdrawal,
**so that** unauthorized withdrawals are prevented.

**Acceptance Criteria:**
```gherkin
Given I am on the withdrawal review step
When I choose FaceID authentication
Then I see a simulated FaceID scan for 2 seconds
And upon completion, the withdrawal proceeds

Given I choose PIN authentication
When I enter the correct 4-digit PIN
Then the withdrawal proceeds
And an incorrect PIN shows an error
```

---

## EPIC 5: Receive & Deposit

### US-5.1 — View Crypto Deposit Address
**As a** user,
**I want** to see my deposit address and QR code for a cryptocurrency,
**so that** I can receive funds from external wallets.

**Acceptance Criteria:**
```gherkin
Given I am on the receive page for a crypto coin
When the page loads
Then I see a QR code representing my deposit address
And I see the address as text
And I can copy the address to clipboard
```

### US-5.2 — View NGN Deposit Details
**As a** user,
**I want** to see bank details for depositing NGN,
**so that** I can fund my account via bank transfer.

**Acceptance Criteria:**
```gherkin
Given I am on the NGN receive page
When the page loads
Then I see the deposit bank name, account number, and account name
And I can copy the account number to clipboard
```

---

## EPIC 6: Transaction History

### US-6.1 — View Transaction History
**As a** user,
**I want** to see a list of all my transactions,
**so that** I can track my activity on the platform.

**Acceptance Criteria:**
```gherkin
Given I am on the history page
When the page loads
Then I see a chronological list of transactions
And each transaction shows type, coin, amount, date, and status
And transactions are grouped or sortable by date
```

### US-6.2 — Filter Transactions
**As a** user,
**I want** to filter transactions by type and status,
**so that** I can find specific transactions quickly.

**Acceptance Criteria:**
```gherkin
Given I am on the history page
When I select a transaction type filter
Then only transactions of that type are shown
When I select a status filter
Then only transactions with that status are shown
```

### US-6.3 — Search Transactions
**As a** user,
**I want** to search my transactions,
**so that** I can find a specific transaction by keyword.

**Acceptance Criteria:**
```gherkin
Given I am on the history page
When I enter a search term
Then transactions matching the term are filtered and displayed
```

### US-6.4 — View Transaction Details
**As a** user,
**I want** to tap on a transaction to see full details,
**so that** I can review all information about that transaction.

**Acceptance Criteria:**
```gherkin
Given I am on the history page
When I tap a transaction
Then I see a detail page with type, amount, fees, date, status, and addresses
And I see a calculation breakdown for swaps
```

### US-6.5 — View and Share Receipt
**As a** user,
**I want** to generate a receipt for a transaction,
**so that** I can share or print proof of the transaction.

**Acceptance Criteria:**
```gherkin
Given I am viewing a transaction detail
When I tap "View Receipt"
Then I see a formatted receipt with zigzag card design
And the receipt includes all transaction details
And I can share or print the receipt
```

---

## EPIC 7: Gift Card Trading

### US-7.1 — Browse Gift Card Brands
**As a** user,
**I want** to browse available gift card brands,
**so that** I can find the brand I want to sell.

**Acceptance Criteria:**
```gherkin
Given I am on the gift cards page
When the page loads
Then I see a grid of gift card brands organized by category
And each brand shows its logo and name
```

### US-7.2 — Sell a Gift Card
**As a** user,
**I want** to sell my gift card for NGN,
**so that** I can convert unused gift cards to cash.

**Acceptance Criteria:**
```gherkin
Given I am on the gift card sell page for a brand
When I enter the gift card amount
And I select the denomination tier
Then I see the calculated NGN payout based on the rate
And I can upload a card image
And I can review the order details
And upon submission, the order is created with "pending" status
And I see a success confirmation
```

### US-7.3 — View Gift Card Orders
**As a** user,
**I want** to see my gift card order history,
**so that** I can track the status of my sales.

**Acceptance Criteria:**
```gherkin
Given I am on the gift card orders page
When the page loads
Then I see a list of my gift card orders
And each order shows brand, amount, NGN payout, and status
And I can see pending, approved, and rejected orders
```

---

## EPIC 8: Referral Program

### US-8.1 — View Referral Code and Link
**As a** user,
**I want** to see my unique referral code and shareable link,
**so that** I can invite others to join Celler.

**Acceptance Criteria:**
```gherkin
Given I am on the referral page
When the page loads
Then I see my unique referral code
And I see a shareable referral link
And I can copy both to clipboard
```

### US-8.2 — Track Referral Earnings
**As a** user,
**I want** to see my referral earnings and statistics,
**so that** I know how much I've earned and can earn.

**Acceptance Criteria:**
```gherkin
Given I am on the referral page
When I view my earnings section
Then I see total earned, total withdrawn, and available balance
And I see my referral list with their status (signed up, verified, traded)
```

### US-8.3 — Withdraw Referral Earnings
**As a** user,
**I want** to request a withdrawal of my referral earnings,
**so that** I can access my earned rewards.

**Acceptance Criteria:**
```gherkin
Given I have available referral earnings
When I request a withdrawal
Then the request is submitted with "pending" status
And I cannot exceed the weekly withdrawal limit of 10,000 NGN
And the withdrawal requires admin approval
```

---

## EPIC 9: KYC Verification

### US-9.1 — View KYC Tiers and Limits
**As a** user,
**I want** to see the KYC tiers and their associated limits,
**so that** I understand what verification level I need.

**Acceptance Criteria:**
```gherkin
Given I am on the KYC page
When the page loads
Then I see all 3 KYC tiers with their requirements and limits
And I see my current verification status
```

### US-9.2 — Complete KYC Verification
**As a** user,
**I want** to submit KYC documents for verification,
**so that** I can increase my transaction limits.

**Acceptance Criteria:**
```gherkin
Given I am on the KYC page
When I select a tier to verify
And I submit the required documents
Then my verification is submitted for review
And I see the expected approval type (auto or manual)
```

---

## EPIC 10: Profile & Security

### US-10.1 — Edit Profile
**As a** user,
**I want** to update my profile information,
**so that** my account details are current.

**Acceptance Criteria:**
```gherkin
Given I am on the edit profile page
When I update my full name, username, or phone number
And I save the changes
Then my profile is updated
And the changes are reflected across the app
```

### US-10.2 — Change Password
**As a** user,
**I want** to change my account password,
**so that** I can maintain account security.

**Acceptance Criteria:**
```gherkin
Given I am on the update password page
When I enter my current password and a new valid password
And I confirm the new password
Then my password is updated
```

### US-10.3 — Update Transaction PIN
**As a** user,
**I want** to change my transaction PIN,
**so that** I can keep my transactions secure.

**Acceptance Criteria:**
```gherkin
Given I am on the update PIN page
When I enter my current PIN, a new PIN, and confirm the new PIN
And the new PINs match
Then my transaction PIN is updated
```

### US-10.4 — Set Up Two-Factor Authentication
**As a** user,
**I want** to enable 2FA on my account,
**so that** I add an extra layer of security.

**Acceptance Criteria:**
```gherkin
Given I am on the 2FA setup page
When I view the QR code and secret key
And I enter the verification code from my authenticator app
Then 2FA is enabled on my account
```

### US-10.5 — Change App Theme
**As a** user,
**I want** to switch between light, dark, and system themes,
**so that** the app matches my visual preference.

**Acceptance Criteria:**
```gherkin
Given I am on the appearance page
When I select a theme option
Then the app theme changes immediately
And my preference is saved to localStorage
```

---

## EPIC 11: Notifications

### US-11.1 — View Notifications
**As a** user,
**I want** to see my in-app notifications,
**so that** I stay informed about platform updates and my account.

**Acceptance Criteria:**
```gherkin
Given I am on the notifications page
When the page loads
Then I see a list of notifications with title, description, and timestamp
And notifications include types like rate updates, new features, and price alerts
```

---

## EPIC 12: Admin Dashboard

### US-12.1 — View Admin Overview
**As an** admin,
**I want** to see a dashboard with key platform metrics,
**so that** I can monitor the health of the platform.

**Acceptance Criteria:**
```gherkin
Given I am on the admin dashboard
When the page loads
Then I see total registered users, verified users, active users
And I see total transactions and volume
And I see a revenue chart over time
And I see recent orders
```

### US-12.2 — Manage Customers
**As an** admin,
**I want** to view and manage platform customers,
**so that** I can monitor user activity and status.

**Acceptance Criteria:**
```gherkin
Given I am on the customers page
When I view the customer list
Then I see customers with their KYC level, status, and trade counts
And I can filter by tabs (all, verified, unverified)
And I can tap a customer to see their detailed profile
```

### US-12.3 — Monitor Transactions
**As an** admin,
**I want** to view all platform transactions,
**so that** I can monitor trading activity.

**Acceptance Criteria:**
```gherkin
Given I am on the orders/transactions page
When I view the transaction list
Then I see all orders with type, amount, user, and status
And I can filter by transaction type tabs
```

### US-12.4 — Approve/Reject Gift Card Orders
**As an** admin,
**I want** to review and process gift card orders,
**so that** I can approve legitimate sales and reject fraudulent ones.

**Acceptance Criteria:**
```gherkin
Given I am on the gift card orders page
When I view pending orders
Then I see order details including brand, amount, and card image
And I can approve or reject each order
And approving credits the NGN payout to the user's wallet
```

### US-12.5 — Manage Referrals
**As an** admin,
**I want** to review and process referral withdrawal requests,
**so that** I can control reward payouts.

**Acceptance Criteria:**
```gherkin
Given I am on the admin referrals page
When I view pending withdrawal requests
Then I can approve or reject each request
And I can view all referrals and their status
And I can update referral configuration (reward amount, weekly limit)
```

### US-12.6 — Process KYC Approvals
**As an** admin,
**I want** to review and approve KYC submissions,
**so that** I can verify user identities for higher tiers.

**Acceptance Criteria:**
```gherkin
Given I am on the admin KYC page
When I view pending approvals
Then I see the list of users awaiting verification
And I can approve or reject each submission
And I see a verification log of past actions
```

### US-12.7 — Send Push Notifications
**As an** admin,
**I want** to compose and send push notifications to users,
**so that** I can communicate important updates.

**Acceptance Criteria:**
```gherkin
Given I am on the push notifications page
When I compose a notification with title, message, and audience
And I send it
Then the notification is recorded in the history
And it is marked with the sent date and recipient count
```

### US-12.8 — Configure System Settings
**As an** admin,
**I want** to adjust platform-wide settings,
**so that** I can control fees, limits, and referral parameters.

**Acceptance Criteria:**
```gherkin
Given I am on the admin settings page
When I view the settings tabs
Then I can adjust trade fees, withdrawal fees, swap fees, and NGN rate markup
And I can update KYC tier limits
And I can update referral reward amount and weekly withdrawal limit
And changes are saved and reflected in the user app
```

---

## Story Summary

| Epic | Story Count | Stories |
|------|-------------|---------|
| Authentication & Onboarding | 6 | US-1.1 to US-1.6 |
| Wallet & Dashboard | 5 | US-2.1 to US-2.5 |
| Crypto Swap | 3 | US-3.1 to US-3.3 |
| Withdrawal | 4 | US-4.1 to US-4.4 |
| Receive & Deposit | 2 | US-5.1 to US-5.2 |
| Transaction History | 5 | US-6.1 to US-6.5 |
| Gift Card Trading | 3 | US-7.1 to US-7.3 |
| Referral Program | 3 | US-8.1 to US-8.3 |
| KYC Verification | 2 | US-9.1 to US-9.2 |
| Profile & Security | 5 | US-10.1 to US-10.5 |
| Notifications | 1 | US-11.1 |
| Admin Dashboard | 8 | US-12.1 to US-12.8 |
| **Total** | **47** | |
