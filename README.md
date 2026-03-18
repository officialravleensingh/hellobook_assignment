# hellobooks — Logistics Accounting MVP

A customised front-end accounting dashboard built for the **Logistics & Transportation** industry, developed as part of the Front-End Developer Internship assignment at [hellobooks.ai](https://hellobooks.ai).

## Live Demo

🔗 [View Deployed App](https://officialravleensingh.github.io/hellobook_assignment/)

---

## Overview

This project adapts the hellobooks.ai accounting MVP specifically for logistics companies. The base MVP is a generic accounting tool — this version adds fleet management, shipment tracking, route-linked invoicing, and logistics-specific expense categories, making it purpose-built for trucking and freight businesses.

---

## Features

### Dashboard
- Revenue vs Expenses area chart (last 6 months)
- Expense breakdown pie chart by category
- Live stat cards: Total Revenue, Total Expenses, Net Profit, Fuel Costs
- Active Shipments count, Pending Invoices value, Fleet Utilisation %
- AI Insights panel with actionable recommendations
- Recent Activity feed

### Invoices
- 25 logistics invoices linked to shipment IDs and routes
- Summary cards: Total Invoiced, Paid, Pending, Overdue
- Search, status filter, sortable columns, pagination
- New Invoice modal with route and shipment fields

### Expenses
- 6 logistics-specific categories: Fuel, Maintenance, Driver Wages, Tolls & Permits, Insurance, Warehouse
- Clickable category cards as filters — values always match filtered rows
- Search, category + status filters, sortable table, pagination
- Add Expense modal

### Fleet Management
- 25 vehicles with real-time status: On Route, Available, Maintenance
- Card grid with fuel level indicator, driver, route, mileage
- Expandable cards showing last/next service dates and monthly revenue
- Search and status filter tabs
- Service due alerts (within 30 days)

### Shipments
- 25 shipments with status: In Transit, Loading, Delivered, Delayed
- Progress bar per active shipment
- Search and status filter tabs
- Top Revenue Routes bar chart

### Reports & Analytics
- Monthly Revenue vs Expenses bar chart
- Profit & Margin Trend dual-axis line chart
- Route Performance horizontal bar chart
- Expense Category Analysis table with % share

### Settings
- Company Profile: Name, Industry (Logistics & Transportation), GST, PAN, Address

---

## AI & Automation Features

The AI Insights panel on the Dashboard surfaces:
- **Fuel optimisation** — identifies routes where switching fuel type saves cost
- **Overdue invoice alerts** — flags invoices due within 5 days with auto-reminder status
- **Maintenance risk** — warns when a vehicle exceeds its service interval
- **Route underutilisation** — detects routes with low load factor and estimates revenue upside

---

## Tech Stack

| Tool | Version |
|---|---|
| React | 19 |
| Vite | 8 |
| Tailwind CSS | 3 |
| Recharts | 3 |
| React Router | 7 |
| Lucide React | latest |

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx       # Collapsible nav with 7 routes
│   │   └── Topbar.jsx        # Search, dark mode toggle, notifications
│   └── ui/
│       ├── Badge.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       └── Pagination.jsx
├── data/
│   └── mockData.js           # All data + auto-derived stats
├── lib/
│   └── utils.js              # cn(), formatCurrency(), formatDate()
├── pages/
│   ├── Dashboard.jsx
│   ├── Invoices.jsx
│   ├── Expenses.jsx
│   ├── Fleet.jsx
│   ├── Shipments.jsx
│   ├── Reports.jsx
│   └── Settings.jsx
├── App.jsx                   # Router + dark mode
└── main.jsx
```

---

## Data Architecture

All summary statistics (`dashboardStats`, `expenseBreakdown`) are **auto-derived** from the raw data arrays at module load time — never hardcoded. This ensures stat cards always match the underlying table data.

```js
// expenseBreakdown is computed from the expenses array — never hardcoded
export const expenseBreakdown = Object.entries(
  expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] }));
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build
```

---

## Assignment Context

- Company: hellobooks.ai
- Industry chosen: Logistics & Transportation
- Task: Customise the accounting MVP front-end for a specific industry
- Includes: AI feature proposals, industry-specific modules, derived data architecture
