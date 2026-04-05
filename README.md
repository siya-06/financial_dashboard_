# FinTrack — Finance Dashboard

A sleek, modern fintech dashboard built with React + Vite + Tailwind CSS v3 + Recharts.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite | Framework & build | 
| Tailwind CSS v3 | Styling |
| Recharts | Charts (Area, Pie, Bar) |
| Lucide React | Icons |
| Context API | State management |
| localStorage | Data persistence |

## Color Palette

`#DAA89B` · `#AE847E` · `#2C0E37` · `#690375` · `#CB429F`

Fonts: **Playfair Display** (headings) · **DM Sans** (body) · **DM Mono** (numbers)

---

## Features

### Dashboard
<img width="1919" height="878" alt="image" src="https://github.com/user-attachments/assets/1daaac81-2690-47ed-beac-8451d9e9d605" />

- Summary cards: Total Balance, Monthly Income, Monthly Expenses
- % change vs last month with green/red color cues
- 6-month balance trend — Area chart
- Spending breakdown by category — Donut chart
- Recent transactions widget

### Transactions
<img width="1919" height="917" alt="image" src="https://github.com/user-attachments/assets/92623ba0-5248-4c2b-9e59-ab46a34fe4b2" />

- Search by description or category
- Filter by type and category
- Sort by date or amount
- Admin: Add / Edit / Delete via modal
- Viewer: read-only

### Insights
<img width="1919" height="903" alt="image" src="https://github.com/user-attachments/assets/f7f8a2ea-eb1a-4961-bfef-98cf832ef74d" />
<img width="1421" height="139" alt="image" src="https://github.com/user-attachments/assets/52dd9093-9f5d-4768-af6b-226d4545a155" />

- Highest spending category
- Expense trend vs last month
- Savings rate
- Monthly comparison bar chart
- Category breakdown with progress bars
- Narrative summary

### Role-Based UI
Toggle Admin / Viewer in top navbar. Admin gets full CRUD; Viewer is read-only.

### UX
- localStorage persistence
- Dark mode (default on)
- Responsive with mobile sidebar drawer
- Empty states throughout
- Staggered fade-up animations

## Project Structure

```
src/
  context/AppContext.jsx
  data/mockData.js
  components/
    layout/Sidebar.jsx, Navbar.jsx
    dashboard/SummaryCards.jsx, BalanceTrend.jsx, SpendingBreakdown.jsx, RecentTransactions.jsx
    transactions/Transactions.jsx, TransactionModal.jsx
    insights/Insights.jsx
```
