import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, CartesianGrid, Legend, Area, AreaChart } from "recharts";

const C = {
  bg: "#0A0D17",
  surface: "#11152A",
  surfaceAlt: "#171C34",
  border: "#222845",
  text: "#E6E9F4",
  textMuted: "#7B82A0",
  promoter: "#10B981",
  passive: "#F59E0B",
  detractor: "#EF4444",
  accent: "#818CF8",
  accentAlt: "#34D399",
  gold: "#FBBF24",
  warn: "#F97316",
  dangerBg: "#1C111B",
};

const segData = [
  { name: "Promoters", value: 418, pct: "47.4%", color: C.promoter },
  { name: "Passives", value: 263, pct: "29.8%", color: C.passive },
  { name: "Detractors", value: 201, pct: "22.8%", color: C.detractor },
];

const allTimeSegData = [
  { name: "Promoters", value: 1789, pct: "56.6%" },
  { name: "Passives", value: 827, pct: "26.1%" },
  { name: "Detractors", value: 547, pct: "17.3%" },
];

const scoreDistribution = [
  { score: "0", count: 58, fill: C.detractor },
  { score: "1", count: 9, fill: C.detractor },
  { score: "2", count: 9, fill: C.detractor },
  { score: "3", count: 17, fill: C.detractor },
  { score: "4", count: 15, fill: C.detractor },
  { score: "5", count: 43, fill: C.detractor },
  { score: "6", count: 50, fill: C.detractor },
  { score: "7", count: 79, fill: C.passive },
  { score: "8", count: 184, fill: C.passive },
  { score: "9", count: 117, fill: C.promoter },
  { score: "10", count: 301, fill: C.promoter },
];

const monthlyTrend = [
  { month: "Apr '25", nps: 18, avg: 7.4, n: 33, pPct: 48, dPct: 30 },
  { month: "May", nps: 44, avg: 8.4, n: 59, pPct: 59, dPct: 15 },
  { month: "Jun", nps: 28, avg: 8.0, n: 65, pPct: 45, dPct: 17 },
  { month: "Jul", nps: 32, avg: 8.0, n: 66, pPct: 53, dPct: 21 },
  { month: "Aug", nps: 27, avg: 7.6, n: 70, pPct: 50, dPct: 23 },
  { month: "Sep", nps: 49, avg: 8.3, n: 59, pPct: 61, dPct: 12 },
  { month: "Oct", nps: 6, avg: 7.1, n: 62, pPct: 34, dPct: 27 },
  { month: "Nov", nps: 27, avg: 7.7, n: 60, pPct: 47, dPct: 20 },
  { month: "Dec", nps: 31, avg: 7.9, n: 42, pPct: 50, dPct: 19 },
  { month: "Jan '26", nps: 13, avg: 7.2, n: 156, pPct: 41, dPct: 28 },
  { month: "Feb", nps: 23, avg: 7.6, n: 166, pPct: 46, dPct: 23 },
  { month: "Mar", nps: 15, avg: 7.0, n: 34, pPct: 50, dPct: 35 },
  { month: "Apr '26", nps: 10, avg: 7.2, n: 10, pPct: 40, dPct: 30 },
];

const passiveThemes = [
  { theme: "Test Case & Suite Mgmt", count: 23, pct: 28 },
  { theme: "UI/UX & Usability", count: 18, pct: 22 },
  { theme: "Reporting & Export", count: 8, pct: 10 },
  { theme: "Defect & Bug Mgmt", count: 7, pct: 9 },
  { theme: "Docs & Support", count: 7, pct: 9 },
  { theme: "Performance", count: 6, pct: 7 },
  { theme: "Automation & Params", count: 6, pct: 7 },
  { theme: "Pricing & Licensing", count: 4, pct: 5 },
  { theme: "Integrations & API", count: 2, pct: 2 },
  { theme: "Collaboration", count: 1, pct: 1 },
];

const detractorThemes = [
  { theme: "Test Case Management", count: 22 },
  { theme: "UI/UX & Usability", count: 17 },
  { theme: "Docs & Onboarding", count: 8 },
  { theme: "Bugs & Stability", count: 8 },
  { theme: "Integrations & API", count: 7 },
  { theme: "Performance & Speed", count: 7 },
  { theme: "Customer Support", count: 4 },
  { theme: "Survey Popup Fatigue", count: 4 },
  { theme: "Reporting & Dashboards", count: 3 },
  { theme: "Pricing & Free Plan", count: 1 },
];

const radarData = [
  { subject: "Test Case Mgmt", passives: 28, detractors: 35 },
  { subject: "UI/UX", passives: 22, detractors: 27 },
  { subject: "Integrations", passives: 2, detractors: 11 },
  { subject: "Performance", passives: 7, detractors: 11 },
  { subject: "Docs & Support", passives: 9, detractors: 13 },
  { subject: "Reporting", passives: 10, detractors: 5 },
  { subject: "Bugs", passives: 0, detractors: 13 },
];

const investmentMatrix = [
  { name: "Fix 'save & create another' data loss", impact: "High", effort: "Low", quadrant: "quick-win", emoji: "💾" },
  { name: "Kill in-app survey popup", impact: "Med", effort: "Low", quadrant: "quick-win", emoji: "🔕" },
  { name: "Add test case versioning/history", impact: "High", effort: "Med", quadrant: "quick-win", emoji: "📜" },
  { name: "Overhaul bulk edit & navigation UX", impact: "High", effort: "High", quadrant: "strategic", emoji: "🧭" },
  { name: "Performance SLOs (<2s page loads)", impact: "High", effort: "High", quadrant: "strategic", emoji: "⚡" },
  { name: "Deepen Jira bidirectional sync", impact: "High", effort: "High", quadrant: "strategic", emoji: "🔗" },
  { name: "Interactive onboarding wizard", impact: "Med", effort: "Med", quadrant: "plan", emoji: "🗺️" },
  { name: "Dashboard widget customization", impact: "Med", effort: "Med", quadrant: "plan", emoji: "📊" },
];

const vocQuotes = [
  {
    theme: "UI/UX & Usability",
    freq: "17 Detractor / 18 Passive",
    quotes: [
      "\"The user UI is terrible and SLOW. As a good example, you can check how it works in TestRail.\" — Score 0, Jan '26",
      "\"counterintuitive UI. A few people deleted folder instead of TC.\" — Score 0, Jan '26",
      "\"I think the UI is not super intuitive and can appear very busy/hard to navigate\" — Score 8, Passive",
    ],
  },
  {
    theme: "Test Case Management",
    freq: "22 Detractor / 23 Passive",
    quotes: [
      "\"No 'replace all' options, Extra lengthy workflow, Hard to find test cases, No Bulk delete\" — Score 0, Jan '26",
      "\"Creating multiple tests is timeconsuming because all the data gets cleared when clicking 'save and create another'\" — Score 4, Jan '26",
      "\"Copying test cases are difficult\" — Score 8, Passive",
    ],
  },
  {
    theme: "Performance & Speed",
    freq: "7 Detractor / 6 Passive",
    quotes: [
      "\"Improve search, filtering and general speed of the webapp\" — Score 0, Jan '26",
      "\"too slow loading pages, can't add custom statuses for defects\" — Score 6, Sep '25",
      "\"Extremely slow to render page. Not intuitive to add tests to runs\" — Score 8, Passive",
    ],
  },
  {
    theme: "Bugs & Stability",
    freq: "8 Detractor / ~6 Passive",
    quotes: [
      "\"a lot of bugs in system\" — Score 4, Jan '26",
      "\"I just lost my testcase because I couldn't save\" — Score 3, Aug '25",
      "\"buggy\" — Score 6, Feb '26",
    ],
  },
  {
    theme: "Integrations & API",
    freq: "7 Detractor / 2 Passive",
    quotes: [
      "\"So hard to integrate with other apps\" — Score 1, Jan '26",
      "\"I don't like the synchronization with Jira regarding saving edited text\" — Score 2, Jan '26",
      "\"Poor documentation for Junit5 integration, old deprecated examples\" — Score 0, Oct '25",
    ],
  },
];

const tabs = ["Overview", "Trends", "Themes", "Insights", "Matrix"];

function Stat({ label, value, sub, color, delta, deltaColor }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.6, color: C.textMuted, marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 800, color: color || C.text, lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{value}</div>
      {delta && <div style={{ fontSize: 12, color: deltaColor || C.textMuted, marginTop: 4, fontFamily: "'IBM Plex Mono', monospace" }}>{delta}</div>}
      {sub && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: 22,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, accent }) {
  return (
    <h3 style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize: 17,
      fontWeight: 700,
      color: C.text,
      margin: "0 0 14px 0",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}>
      {accent && <span style={{ width: 4, height: 18, background: accent, borderRadius: 2, display: "inline-block" }} />}
      {children}
    </h3>
  );
}

function ThemeBar({ data, color, maxVal }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {data.map((t, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 160, fontSize: 12, color: C.text, fontWeight: 500, flexShrink: 0 }}>{t.theme}</div>
          <div style={{ flex: 1, height: 20, background: C.surfaceAlt, borderRadius: 5, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${(t.count / maxVal) * 100}%`,
              background: `linear-gradient(90deg, ${color}, ${color}77)`,
              borderRadius: 5,
            }} />
          </div>
          <div style={{ width: 28, fontSize: 12, color: C.textMuted, textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>{t.count}</div>
        </div>
      ))}
    </div>
  );
}

function OverviewTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Alert Banner */}
      <Card style={{ background: `linear-gradient(135deg, #1a1020, #16112a)`, borderColor: C.detractor + "55" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <span style={{ fontSize: 24, lineHeight: 1 }}>⚠️</span>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15, color: C.detractor, marginBottom: 6 }}>NPS Declining — Down 14.7 Points vs. All-Time</div>
            <p style={{ color: C.textMuted, lineHeight: 1.7, fontSize: 13, margin: 0 }}>
              Over the past 12 months, Qase's NPS has fallen to <strong style={{ color: C.detractor }}>+24.6</strong> (from +39.3 all-time), driven by a 5.5-point rise in Detractor share (22.8% vs. 17.3%) and a 9.2-point drop in Promoter share (47.4% vs. 56.6%). 
              The degradation is concentrated in <strong style={{ color: C.passive }}>Q4 2025 and Q1 2026</strong>, where monthly NPS dipped as low as +6 (Oct '25) and +10 (Apr '26 partial), suggesting newly-onboarded users are hitting friction earlier. 
              The core complaints — UI navigation friction, test case management rigidity, and performance — have persisted unchanged from the all-time dataset, indicating these issues are calcifying into brand perception rather than being resolved.
            </p>
          </div>
        </div>
      </Card>

      {/* Key Metrics with deltas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
        {[
          { label: "NPS Score", value: "+24.6", color: C.warn, delta: "↓ from +39.3", deltaColor: C.detractor },
          { label: "Avg Score", value: "7.64", delta: "↓ from 8.1", deltaColor: C.detractor },
          { label: "Responses", value: "882", sub: "last 12 mo." },
          { label: "Detractor %", value: "22.8%", color: C.detractor, delta: "↑ from 17.3%", deltaColor: C.detractor },
          { label: "Comment Rate", value: "17%", sub: "150 verbatims", delta: "↑ from 13%", deltaColor: C.accentAlt },
        ].map((s, i) => (
          <Card key={i}><Stat {...s} /></Card>
        ))}
      </div>

      {/* Segmentation + Score Dist */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 18 }}>
        <Card>
          <SectionTitle accent={C.promoter}>Segmentation</SectionTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <ResponsiveContainer width="48%" height={170}>
              <PieChart>
                <Pie data={segData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
                  {segData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {segData.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                  <div>
                    <div style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{s.value} ({s.pct})</div>
                    <div style={{ fontSize: 10, color: C.textMuted, fontStyle: "italic" }}>was {allTimeSegData[i].pct}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle accent={C.accentAlt}>Score Distribution (Last 12 Mo.)</SectionTitle>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={scoreDistribution} barCategoryGap="18%">
              <XAxis dataKey="score" tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 12 }} cursor={{ fill: C.border + "30" }} />
              <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                {scoreDistribution.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Radar */}
      <Card>
        <SectionTitle accent={C.detractor}>Pain Overlap: Passives vs. Detractors (Last 12 Mo.)</SectionTitle>
        <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 10px 0" }}>% of each group's feedback by theme. The "Bugs" spike in Detractors (not shared by Passives) is a new signal vs. all-time data.</p>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radarData}>
            <PolarGrid stroke={C.border} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: C.textMuted, fontSize: 11 }} />
            <PolarRadiusAxis tick={{ fill: C.textMuted, fontSize: 9 }} domain={[0, 40]} />
            <Radar name="Passives" dataKey="passives" stroke={C.passive} fill={C.passive} fillOpacity={0.2} strokeWidth={2} />
            <Radar name="Detractors" dataKey="detractors" stroke={C.detractor} fill={C.detractor} fillOpacity={0.15} strokeWidth={2} />
            <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: C.passive }}>● Passives (29.8%)</span>
          <span style={{ fontSize: 12, color: C.detractor }}>● Detractors (22.8%)</span>
        </div>
      </Card>
    </div>
  );
}

function TrendsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card>
        <SectionTitle accent={C.accent}>Monthly NPS Trend</SectionTitle>
        <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 10px 0" }}>NPS volatility is high month-to-month, but the trendline is clearly downward — Q1 2026 is the weakest quarter on record.</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthlyTrend}>
            <defs>
              <linearGradient id="npsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.accent} stopOpacity={0.3} />
                <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} domain={[-10, 60]} />
            <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 12 }} />
            <Area type="monotone" dataKey="nps" stroke={C.accent} fill="url(#npsGrad)" strokeWidth={2.5} dot={{ fill: C.accent, strokeWidth: 0, r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card>
          <SectionTitle accent={C.promoter}>Monthly Promoter vs. Detractor %</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 70]} />
              <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 12 }} />
              <Line type="monotone" dataKey="pPct" stroke={C.promoter} strokeWidth={2} dot={{ r: 3 }} name="Promoter %" />
              <Line type="monotone" dataKey="dPct" stroke={C.detractor} strokeWidth={2} dot={{ r: 3 }} name="Detractor %" />
              <Legend wrapperStyle={{ fontSize: 11, color: C.textMuted }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle accent={C.passive}>Monthly Response Volume</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyTrend}>
              <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 12 }} />
              <Bar dataKey="n" fill={C.accent} radius={[4, 4, 0, 0]} name="Responses" />
            </BarChart>
          </ResponsiveContainer>
          <p style={{ color: C.textMuted, fontSize: 11, marginTop: 8, marginBottom: 0 }}>⚠ Jan–Feb '26 saw a 2.5x volume spike (survey push?) correlating with the lowest NPS months — higher survey fatigue = lower scores.</p>
        </Card>
      </div>

      {/* Key Trend Insight */}
      <Card style={{ borderColor: C.warn + "44" }}>
        <SectionTitle accent={C.warn}>Trend Analysis Insight</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { title: "Oct '25 Crash (NPS +6)", body: "Worst single month. Detractor % spiked to 27%. Coincides with possible pricing/plan change — investigate product changelog and pricing events around this date.", color: C.detractor },
            { title: "Sep '25 Peak (NPS +49)", body: "Best month of the year. Only 12% Detractors. Suggests a positive feature release or reduced friction event — replicate whatever changed.", color: C.promoter },
            { title: "Jan '26 Volume Anomaly", body: "156 responses (2.5× avg) with NPS of +13. The aggressive survey distribution likely captured more casual/frustrated users who don't normally respond.", color: C.warn },
          ].map((item, i) => (
            <div key={i} style={{ padding: 14, background: C.surfaceAlt, borderRadius: 10, borderTop: `3px solid ${item.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>{item.title}</div>
              <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ThemesTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card>
          <SectionTitle accent={C.detractor}>Detractor Friction Points</SectionTitle>
          <p style={{ color: C.textMuted, fontSize: 11, margin: "0 0 10px 0" }}>63 coded comments from 201 Detractors (31% comment rate)</p>
          <ThemeBar data={detractorThemes} color={C.detractor} maxVal={22} />
        </Card>
        <Card>
          <SectionTitle accent={C.passive}>Passive "Missing Link"</SectionTitle>
          <p style={{ color: C.textMuted, fontSize: 11, margin: "0 0 10px 0" }}>82 labeled insights from 263 Passives (31% feedback rate)</p>
          <ThemeBar data={passiveThemes} color={C.passive} maxVal={23} />
        </Card>
      </div>

      {/* VoC Table */}
      <Card>
        <SectionTitle accent={C.accent}>Voice of Customer — Last 12 Months</SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 5px" }}>
            <thead>
              <tr>
                {["Theme", "Frequency", "Representative Quotes (Last 12 Mo.)"].map((h, i) => (
                  <th key={i} style={{
                    textAlign: "left", padding: "8px 12px", fontSize: 10,
                    textTransform: "uppercase", letterSpacing: 1.2,
                    color: C.textMuted, borderBottom: `1px solid ${C.border}`,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vocQuotes.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? C.surfaceAlt : "transparent" }}>
                  <td style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: C.text, verticalAlign: "top", whiteSpace: "nowrap", borderRadius: "8px 0 0 8px" }}>{row.theme}</td>
                  <td style={{ padding: "10px 12px", fontSize: 11, color: C.textMuted, verticalAlign: "top", whiteSpace: "nowrap" }}>{row.freq}</td>
                  <td style={{ padding: "10px 12px", fontSize: 11, color: C.textMuted, lineHeight: 1.6, borderRadius: "0 8px 8px 0" }}>
                    {row.quotes.map((q, j) => (
                      <div key={j} style={{ marginBottom: j < row.quotes.length - 1 ? 6 : 0, paddingLeft: 8, borderLeft: `2px solid ${C.border}` }}>{q}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New vs All-Time Comparison */}
      <Card style={{ borderColor: C.accent + "33" }}>
        <SectionTitle accent={C.warn}>What Changed vs. All-Time?</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ padding: 14, background: C.surfaceAlt, borderRadius: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.detractor, marginBottom: 8 }}>🔺 Escalating Issues</div>
            <ul style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.8, margin: 0, paddingLeft: 16 }}>
              <li><strong style={{ color: C.text }}>Bugs & Stability</strong> jumped from ~8% to 13% of Detractor complaints — data loss events are now being reported</li>
              <li><strong style={{ color: C.text }}>Integrations</strong> remain painful but shifted from "shallow" to "actively broken" (Jira sync losing formatting)</li>
              <li><strong style={{ color: C.text }}>Test case versioning</strong> emerged as a new, distinct complaint not prominent in the all-time data</li>
            </ul>
          </div>
          <div style={{ padding: 14, background: C.surfaceAlt, borderRadius: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.promoter, marginBottom: 8 }}>🔽 Stabilized Issues</div>
            <ul style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.8, margin: 0, paddingLeft: 16 }}>
              <li><strong style={{ color: C.text }}>Pricing complaints</strong> dropped from 5% to ~1% of Detractor feedback — users have either adapted or churned</li>
              <li><strong style={{ color: C.text }}>Defect management</strong> complaints also declined, suggesting some improvements landed</li>
              <li><strong style={{ color: C.text }}>Core satisfaction</strong> — Promoters who do score still score 9–10, meaning the product's value proposition is intact for power users</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InsightsTab() {
  const insights = [
    {
      num: "01",
      title: "Urgent: Fix Data-Loss Bugs in Test Case Editing",
      impact: "Critical",
      segment: "Detractors (new signal)",
      desc: "Multiple users in the last 12 months report losing test cases due to save failures and the 'save & create another' bug clearing all fields. This is a retention emergency — no user tolerates data loss. Prioritize a thorough audit of save/edit paths and add autosave + unsaved-changes warnings.",
      color: C.detractor,
    },
    {
      num: "02",
      title: "Overhaul Test Case Navigation for Large Repositories",
      impact: "High",
      segment: "Detractors + Passives",
      desc: "The #1 complaint across both segments for 12+ months running. Users managing hundreds of cases hit a wall with the current navigation. Implement: keyboard shortcuts, breadcrumb-based navigation, bulk selection that persists across pages, and inline case preview without full-page navigation.",
      color: C.warn,
    },
    {
      num: "03",
      title: "Reduce Survey Aggressiveness — Especially During High-Volume Pushes",
      impact: "Medium (Trust)",
      segment: "Detractors",
      desc: "The Jan–Feb '26 survey push (2.5× normal volume) correlated with the lowest NPS months. Four Detractors scored 0 explicitly because of popup interruption. Implement rate-limiting: max 1 survey per user per quarter, triggered after a positive milestone (e.g., completing a test run), never on page load.",
      color: C.passive,
    },
    {
      num: "04",
      title: "Add Test Case Versioning & Change History",
      impact: "High",
      segment: "Detractors + Passives (new demand)",
      desc: "A newly prominent theme in last-12-month data not visible in all-time analysis. Users modifying a test case see changes reflected retroactively in historical runs, losing audit trail. Implement version snapshots tied to test runs, with diff-view capability.",
      color: C.accent,
    },
    {
      num: "05",
      title: "Invest in Performance Monitoring & SLOs",
      impact: "High",
      segment: "All Segments",
      desc: "Performance complaints held steady at ~11% of negative feedback. Users specifically cite 3+ minute QQL queries and 10-second waits on saves. Instrument real-user monitoring, set public SLOs for critical paths, and consider client-side caching for repository browsing.",
      color: C.accentAlt,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card style={{ background: `linear-gradient(135deg, ${C.surface}, #14112a)` }}>
        <SectionTitle accent={C.gold}>Actionable Insights — Last 12 Months</SectionTitle>
        <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 4px 0" }}>Five prioritized actions reflecting the shifted signal from the most recent data window. Note the emergence of data-loss and versioning as critical new themes.</p>
      </Card>

      {insights.map((ins, i) => (
        <Card key={i} style={{ borderLeft: `3px solid ${ins.color}`, paddingLeft: 26 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
            <div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: ins.color, marginRight: 8 }}>{ins.num}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: "'Outfit', sans-serif" }}>{ins.title}</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 16, background: ins.color + "22", color: ins.color, fontWeight: 600 }}>Impact: {ins.impact}</span>
              <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 16, background: C.surfaceAlt, color: C.textMuted }}>{ins.segment}</span>
            </div>
          </div>
          <p style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.7, margin: 0 }}>{ins.desc}</p>
        </Card>
      ))}

      {/* Delighter */}
      <Card style={{
        background: `linear-gradient(135deg, #131020, #0f1528)`,
        border: `1px solid ${C.gold}33`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -15, right: -15, fontSize: 70, opacity: 0.05 }}>✨</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 18 }}>🎁</span>
          <SectionTitle accent={C.gold}>The "Delighter" Strategy — Low-Hanging Fruit</SectionTitle>
        </div>
        <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, color: C.gold, margin: "0 0 8px 0" }}>
          "Smart Autosave" + Unsaved Changes Shield
        </h4>
        <p style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.8, margin: 0 }}>
          The most emotionally damaging complaint in the last-year data is <strong style={{ color: C.text }}>losing work</strong> — "I just lost my testcase because I couldn't save" and "all the data gets cleared when clicking 'save and create another.'" 
          Implement <strong style={{ color: C.gold }}>client-side autosave with visual confirmation</strong> (a small "Saved ✓" indicator, similar to Google Docs) plus a <strong style={{ color: C.gold }}>browser-native beforeunload warning</strong> when navigating away from unsaved edits. 
          This costs minimal engineering effort (localStorage draft + event listener), eliminates the single most trust-destroying failure mode, and turns a pain point into a delighter — users will feel the product is "watching their back." 
          <strong style={{ color: C.gold }}>Estimated effort: 1–2 sprint cycles. Estimated NPS impact: +2 to +4 points</strong> by converting frustrated Detractors who experienced data loss into relieved Passives or Promoters.
        </p>
      </Card>
    </div>
  );
}

function MatrixTab() {
  const quadrants = {
    "quick-win": { label: "Quick Wins", sub: "High Impact / Low–Med Effort", color: C.promoter },
    "strategic": { label: "Strategic Bets", sub: "High Impact / High Effort", color: C.accent },
    "plan": { label: "Plan & Monitor", sub: "Med Impact / Med Effort", color: C.passive },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card>
        <SectionTitle accent={C.accent}>Investment Matrix — Last 12 Months Signal</SectionTitle>
        <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 18px 0" }}>Reprioritized based on the shifted pain profile. Data-loss prevention and versioning have moved up vs. the all-time matrix.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {Object.entries(quadrants).map(([key, q]) => (
            <Card key={key} style={{ background: C.surfaceAlt, border: `1px solid ${q.color}33` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: q.color, marginBottom: 3, fontFamily: "'Outfit', sans-serif" }}>{q.label}</div>
              <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 12, fontFamily: "'IBM Plex Mono', monospace" }}>{q.sub}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {investmentMatrix.filter(item => item.quadrant === key).map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "9px 11px", background: C.surface, borderRadius: 9,
                    border: `1px solid ${C.border}`,
                  }}>
                    <span style={{ fontSize: 16 }}>{item.emoji}</span>
                    <div>
                      <div style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{item.name}</div>
                      <div style={{ fontSize: 10, color: C.textMuted }}>Impact: {item.impact} · Effort: {item.effort}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          <Card style={{ background: C.surfaceAlt, border: `1px solid ${C.detractor}22`, opacity: 0.7 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.detractor, marginBottom: 3, fontFamily: "'Outfit', sans-serif" }}>Deprioritize</div>
            <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 12, fontFamily: "'IBM Plex Mono', monospace" }}>Low Impact / High Effort</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { emoji: "🗣️", name: "Voice input for test steps", sub: "Single-user request" },
                { emoji: "🔤", name: "Custom case ID numbering", sub: "Niche, high schema cost" },
                { emoji: "🌐", name: "Multi-byte IME edge cases", sub: "Important but narrow user base" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 11px", background: C.surface, borderRadius: 9,
                  border: `1px solid ${C.border}`,
                }}>
                  <span style={{ fontSize: 16 }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: 10, color: C.textMuted, opacity: 0.7 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Card>

      {/* Root Cause */}
      <Card>
        <SectionTitle accent={C.detractor}>Root Cause Summary — Last 12 Months</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ padding: 14, background: C.surfaceAlt, borderRadius: 10, borderLeft: `3px solid ${C.detractor}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.detractor, marginBottom: 6 }}>Detractor Friction Points</div>
            <ul style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.8, margin: 0, paddingLeft: 16 }}>
              <li><strong style={{ color: C.text }}>Data loss on save</strong> — the most trust-destroying failure, newly prominent</li>
              <li>Rigid test case workflows force excessive clicking for basic operations</li>
              <li>No test case versioning creates audit trail anxiety for regulated teams</li>
              <li>Jira integration breaks formatting and lacks bidirectional sync</li>
              <li>Survey popup aggression actively damages brand sentiment</li>
            </ul>
          </div>
          <div style={{ padding: 14, background: C.surfaceAlt, borderRadius: 10, borderLeft: `3px solid ${C.passive}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.passive, marginBottom: 6 }}>Passive "Missing Link"</div>
            <ul style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.8, margin: 0, paddingLeft: 16 }}>
              <li>Bulk edit and cross-case operations would unlock power-user workflows</li>
              <li>Dashboard widgets are too rigid — managers need custom queries</li>
              <li>Shared steps can't nest or clone across projects</li>
              <li>Performance is "okay" but not delightful — slow loads accumulate frustration</li>
              <li>Review notifications and collaboration features feel half-built</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function NPSLastYear() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      color: C.text,
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      padding: "22px 26px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: `linear-gradient(135deg, ${C.warn}, ${C.detractor})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 800, color: "#fff",
            fontFamily: "'Outfit', sans-serif",
          }}>Q</div>
          <div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 21, fontWeight: 800, margin: 0, letterSpacing: -0.4 }}>
              Qase NPS — Last 12 Months
            </h1>
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>882 responses · 150 verbatims · Apr 2025 – Apr 2026</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 3, marginBottom: 22, background: C.surface, padding: 3, borderRadius: 10, width: "fit-content" }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "7px 18px",
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              color: activeTab === i ? C.text : C.textMuted,
              background: activeTab === i ? C.surfaceAlt : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && <OverviewTab />}
      {activeTab === 1 && <TrendsTab />}
      {activeTab === 2 && <ThemesTab />}
      {activeTab === 3 && <InsightsTab />}
      {activeTab === 4 && <MatrixTab />}
    </div>
  );
}
