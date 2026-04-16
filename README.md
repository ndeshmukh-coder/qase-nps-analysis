# Qase NPS Analysis Dashboard

Interactive React dashboards analyzing NPS survey data from Qase (test management platform).

## Contents

| File | Description |
|------|-------------|
| `nps-analysis.jsx` | **All-time analysis** — 3,163 responses (Mar 2023 – Apr 2026) |
| `nps-analysis-last-12-months.jsx` | **Last 12 months analysis** — 882 responses (Apr 2025 – Apr 2026) |
| `nps-survey-data.csv` | Raw NPS survey data |

## Key Findings

### All-Time (NPS +39.3)
- 56.6% Promoters / 26.1% Passives / 17.3% Detractors
- Top pain points: Test Case Management, UI/UX, Performance

### Last 12 Months (NPS +24.6) ⚠️
- NPS **dropped 14.7 points** vs. all-time
- Detractor rate rose to 22.8%
- New critical themes: **data-loss bugs**, **test case versioning gaps**
- Oct '25 and Jan '26 were crisis months (NPS +6 and +13)

## Dashboard Tabs

Both dashboards include:
- **Overview** — Executive summary, segmentation, score distribution, radar overlap chart
- **Themes** — Detractor friction points, Passive "missing link", Voice of Customer table
- **Insights** — 5 prioritized recommendations + "Delighter" strategy
- **Matrix** — 2×2 investment framework (Impact vs. Effort)

The last-12-months dashboard adds:
- **Trends** — Monthly NPS trajectory, Promoter/Detractor % lines, volume analysis

## Tech Stack

- React (JSX)
- Recharts for data visualization
- Tailwind-compatible inline styles

## Usage

These are React components designed to render in any React environment. Import and use as a default export:

```jsx
import NPSDashboard from './nps-analysis';
// or
import NPSLastYear from './nps-analysis-last-12-months';
```

---

*Analysis generated April 2026*
