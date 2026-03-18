

# Desktop Responsive Layout — Matching Figma Designs

## What the Figma shows

The uploaded screenshots reveal a consistent desktop layout pattern across all user-facing pages:

1. **Top bar**: Celler logo (top-left), settings gear icon (top-right), and on some pages a back button (top-center) and headphone/support icon
2. **Left sidebar**: Vertical nav with items — Home, History, Wallet, Profile (and contextually Swap) — with active item highlighted in primary color with a left accent. A "Logout" button at the bottom in red.
3. **Content area**: Centered card container (~650-700px max-width) with generous padding, sitting to the right of the sidebar
4. **Auth pages** (SignUp/SignIn): Full-width centered card layout with Celler logo top-left, gear + headphone icons top-right, a blue accent line below the top bar, and "Celler 2026" footer bottom-left
5. **KYC modal**: Overlay dialog on the dashboard prompting upgrade

## Current state

- Mobile-first with bottom nav bar and `max-w-[430px]` content
- No sidebar, no top bar with logo on desktop
- Auth pages are full-screen mobile layouts

## Plan

### 1. Refactor `AppLayout.tsx` for desktop sidebar

- On `md+` screens: Show a left sidebar with Celler logo, nav items (Home, History, Swap, Wallet, Profile), and Logout at bottom
- Hide bottom nav on `md+`; keep it for mobile
- Content area: Remove `max-w-[430px]` constraint on desktop, use `max-w-[720px]` centered in the remaining space
- Add top bar on desktop with Celler logo (already in sidebar), settings gear icon top-right
- Nav items change from mobile set (Home, History, Swap, Giftcard, Profile) to desktop set matching Figma: Home, History, Wallet, Profile (Swap shows contextually)

### 2. Add desktop top header bar

- Celler logo + "celler" text top-left (only on mobile, since desktop has it in sidebar — actually Figma shows logo in both sidebar area and top bar)
- Looking more carefully: Logo is top-left outside the sidebar, with a settings gear top-right. The sidebar sits below.
- Implementation: A persistent top bar with logo left, gear icon right. On pages with back buttons, show back button top-center.

### 3. Update auth pages (SignIn, SignUp)

- Add top bar with Celler logo, gear icon, headphone icon
- Blue accent line below the top bar
- Center the form in a card container (~max-w-md)
- "Celler 2026" footer bottom-left

### 4. Sidebar nav items & styling

- Items: Home (`/dashboard`), History (`/history`), Swap (`/swap`) — only on Swap page, Wallet (new route or link to `/manage-assets` or a wallet page), Profile (`/profile`)
- Active state: primary color text + left border/background accent
- Logout button at bottom in red with icon

### 5. Files to modify

| File | Change |
|------|--------|
| `src/components/AppLayout.tsx` | Major refactor — add desktop sidebar, top bar, responsive nav |
| `src/pages/SignIn.tsx` | Wrap in desktop auth layout with logo bar |
| `src/pages/SignUp.tsx` | Same auth layout wrapper |
| `src/pages/Dashboard.tsx` | Remove redundant header (greeting stays but adjust for desktop) |
| `src/pages/Swap.tsx` | Adjust for desktop content width |
| `src/pages/Profile.tsx` | Adjust padding for desktop |
| `src/pages/ManageAssets.tsx` | This becomes the "Wallet" page on desktop nav |
| `src/pages/CoinDetail.tsx` | Adjust back button positioning for desktop |
| Possibly create `src/components/DesktopSidebar.tsx` | Extracted sidebar component |
| Possibly create `src/components/AuthLayout.tsx` | Shared auth page wrapper |

### 6. Key design details from Figma

- Sidebar width: ~280px, dark background matching `--sidebar-background`
- Nav items: Icon + label, spaced ~50px apart vertically
- Active nav: Primary blue text, subtle background highlight with left accent
- Content area: Card-style with `bg-card` background, rounded corners
- Settings gear: Gray circle button, top-right of viewport
- Back button: Gray circle, positioned top-center between logo and gear
- The "Swap" nav item appears in sidebar only when on swap-related pages
- Wallet page shows coin list without the dashboard balance/actions section

### 7. Implementation approach

- Create a `DesktopSidebar` component with the nav structure
- In `AppLayout`, use `useIsMobile()` hook to conditionally render sidebar (desktop) vs bottom nav (mobile)
- Wrap content in a centered container with appropriate max-width on desktop
- Create an `AuthLayout` component for SignIn/SignUp with the top bar pattern
- Keep all existing mobile behavior intact

