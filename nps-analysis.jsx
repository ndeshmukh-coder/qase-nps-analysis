import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const COLORS = {
  bg: "#0C0F1A",
  surface: "#141829",
  surfaceAlt: "#1A1F35",
  border: "#252B45",
  text: "#E8EAF0",
  textMuted: "#8B90A8",
  promoter: "#22C997",
  passive: "#F5A623",
  detractor: "#E54D6B",
  accent: "#6C63FF",
  accentAlt: "#4ECDC4",
  gold: "#FFD700",
};

const segData = [
  { name: "Promoters", value: 1789, pct: "56.6%", color: COLORS.promoter },
  { name: "Passives", value: 827, pct: "26.1%", color: COLORS.passive },
  { name: "Detractors", value: 547, pct: "17.3%", color: COLORS.detractor },
];

const scoreDistribution = [
  { score: "0", count: 135, fill: COLORS.detractor },
  { score: "1", count: 28, fill: COLORS.detractor },
  { score: "2", count: 21, fill: COLORS.detractor },
  { score: "3", count: 49, fill: COLORS.detractor },
  { score: "4", count: 46, fill: COLORS.detractor },
  { score: "5", count: 130, fill: COLORS.detractor },
  { score: "6", count: 138, fill: COLORS.detractor },
  { score: "7", count: 271, fill: COLORS.passive },
  { score: "8", count: 556, fill: COLORS.passive },
  { score: "9", count: 447, fill: COLORS.promoter },
  { score: "10", count: 1342, fill: COLORS.promoter },
];

const passiveThemes = [
  { theme: "Test Case & Suite Mgmt", count: 57, pct: 27 },
  { theme: "UI/UX & Usability", count: 46, pct: 21 },
  { theme: "Defect & Bug Mgmt", count: 21, pct: 10 },
  { theme: "Docs & Support", count: 20, pct: 9 },
  { theme: "Reporting & Export", count: 17, pct: 8 },
  { theme: "Performance", count: 12, pct: 6 },
  { theme: "Automation & Params", count: 12, pct: 6 },
  { theme: "Integrations & API", count: 11, pct: 5 },
  { theme: "Pricing & Licensing", count: 10, pct: 5 },
  { theme: "Collaboration", count: 8, pct: 4 },
];

const detractorThemes = [
  { theme: "Test Case Management", count: 52 },
  { theme: "UI/UX & Usability", count: 40 },
  { theme: "Docs & Onboarding", count: 19 },
  { theme: "Bugs & Stability", count: 15 },
  { theme: "Integrations & API", count: 15 },
  { theme: "Performance & Speed", count: 13 },
  { theme: "Customer Support", count: 11 },
  { theme: "Survey Popup Fatigue", count: 9 },
  { theme: "Reporting & Dashboards", count: 8 },
  { theme: "Pricing & Free Plan", count: 6 },
];

const radarData = [
  { subject: "Test Case Mgmt", passives: 27, detractors: 30 },
  { subject: "UI/UX", passives: 21, detractors: 23 },
  { subject: "Integrations", passives: 5, detractors: 9 },
  { subject: "Performance", passives: 6, detractors: 7 },
  { subject: "Docs & Support", passives: 9, detractors: 11 },
  { subject: "Reporting", passives: 8, detractors: 5 },
  { subject: "Pricing", passives: 5, detractors: 3 },
];

const investmentMatrix = [
  { name: "Fix test run navigation & bulk edit", impact: "High", effort: "Low", quadrant: "quick-win", emoji: "🎯" },
  { name: "Eliminate in-app survey popup", impact: "Med", effort: "Low", quadrant: "quick-win", emoji: "🔕" },
  { name: "Speed up page loads & save ops", impact: "High", effort: "Med", quadrant: "quick-win", emoji: "⚡" },
  { name: "Overhaul shared steps UX", impact: "High", effort: "High", quadrant: "strategic", emoji: "🔧" },
  { name: "Richer dashboard widgets & QQL", impact: "High", effort: "High", quadrant: "strategic", emoji: "📊" },
  { name: "Deeper Jira/GitHub integration", impact: "Med", effort: "High", quadrant: "strategic", emoji: "🔗" },
  { name: "Interactive onboarding wizard", impact: "Med", effort: "Med", quadrant: "plan", emoji: "🗺️" },
  { name: "Expand free-tier limits", impact: "Med", effort: "Low", quadrant: "plan", emoji: "🎁" },
];

const vocQuotes = [
  {
    theme: "UI/UX & Usability",
    freq: "40+ Detractor / 46 Passive mentions",
    quotes: [
      "\"counterintuitive UI. A few people deleted folder instead of TC. Can't copy TC.\" — Score 0",
      "\"Clunky UI. So many things that could be easily tweaked to make a massive difference.\" — Score 5",
      "\"all kinds of annoying UI bugs\" — Score 8 (Passive)",
    ],
  },
  {
    theme: "Test Case & Suite Mgmt",
    freq: "52 Detractor / 57 Passive mentions",
    quotes: [
      "\"Need to improve on filter, especially add execute-by filter in test run\" — Score 7",
      "\"it's not that convenient when need to write many cases, edit cases, copy cases\" — Score 3",
      "\"No 'replace all' options, extra lengthy workflow, hard to find test cases\" — Score 0",
    ],
  },
  {
    theme: "Performance & Speed",
    freq: "13 Detractor / 12 Passive mentions",
    quotes: [
      "\"Works slow. 10 sec waiting after every change I make in a test-run\" — Score 4",
      "\"Browsing test cases takes forever.\" — Score 5",
      "\"sometimes loads slowly, and it lacks integration with IntelliJ\" — Score 7",
    ],
  },
  {
    theme: "Integrations & API",
    freq: "15 Detractor / 11 Passive mentions",
    quotes: [
      "\"the awful integration with Jira… lack of information in report dashboards\" — Score 5",
      "\"Weak integration possibilities (GitHub, Azure)\" — Score 6",
      "\"Integration with Linear could be better — ticket creation and syncing is buggy\" — Score 9",
    ],
  },
  {
    theme: "Pricing & Free Plan",
    freq: "6 Detractor / 10 Passive mentions",
    quotes: [
      "\"COST IS TOO HIGH FOR SUBSCRIPTION\" — Score 1",
      "\"Not only that you introduced paying, it is WAY OVERPRICED\" — Score 6",
      "\"I think too many options are behind paywall\" — Score 9",
    ],
  },
];

const tabs = ["Overview", "Themes", "Insights", "Matrix"];

function Stat({ label, value, sub, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: COLORS.textMuted, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: color || COLORS.text, lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, accent }) {
  return (
    <h3 style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 18,
      fontWeight: 700,
      color: COLORS.text,
      margin: "0 0 16px 0",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}>
      {accent && <span style={{ width: 4, height: 20, background: accent, borderRadius: 2, display: "inline-block" }} />}
      {children}
    </h3>
  );
}

function OverviewTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Executive Summary */}
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.surface} 0%, ${COLORS.surfaceAlt} 100%)`, borderColor: COLORS.accent + "40" }}>
        <SectionTitle accent={COLORS.accent}>Executive Summary</SectionTitle>
        <p style={{ color: COLORS.textMuted, lineHeight: 1.7, fontSize: 14, margin: 0 }}>
          Qase holds a <strong style={{ color: COLORS.promoter }}>+39 NPS</strong> driven by a loyal Promoter base of 56.6% who value the product's core concept—but a Detractor rate of 17.3% and a large Passive cohort of 26.1% signal significant friction that threatens retention and growth. 
          The two dominant pain points—<strong style={{ color: COLORS.passive }}>test case management workflow rigidity</strong> and <strong style={{ color: COLORS.passive }}>UI/UX usability issues</strong>—account for nearly half of all negative feedback across both segments. 
          Addressing performance bottlenecks and eliminating survey popup interruptions represent immediate "quick wins" that can unlock measurable NPS lift while deeper investments in shared steps, dashboard customization, and integration depth are built out.
        </p>
      </Card>

      {/* Key Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          { label: "NPS Score", value: "+39.3", color: COLORS.promoter },
          { label: "Avg Score", value: "8.1", sub: "out of 10" },
          { label: "Responses", value: "3,163", sub: "with feedback" },
          { label: "Comment Rate", value: "13%", sub: "407 verbatims" },
        ].map((s, i) => (
          <Card key={i}><Stat {...s} /></Card>
        ))}
      </div>

      {/* Segmentation + Distribution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20 }}>
        <Card>
          <SectionTitle accent={COLORS.promoter}>NPS Segmentation</SectionTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={segData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" stroke="none">
                  {segData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {segData.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>{s.value.toLocaleString()} ({s.pct})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle accent={COLORS.accentAlt}>Score Distribution</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={scoreDistribution} barCategoryGap="20%">
              <XAxis dataKey="score" tick={{ fill: COLORS.textMuted, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip
                contentStyle={{ background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, fontSize: 12 }}
                cursor={{ fill: COLORS.border + "40" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {scoreDistribution.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Radar */}
      <Card>
        <SectionTitle accent={COLORS.detractor}>Pain Overlap: Passives vs. Detractors</SectionTitle>
        <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 12px 0" }}>Percentage of each group's feedback attributed to each theme — shared pain areas are the highest-leverage targets.</p>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke={COLORS.border} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
            <PolarRadiusAxis tick={{ fill: COLORS.textMuted, fontSize: 10 }} domain={[0, 35]} />
            <Radar name="Passives" dataKey="passives" stroke={COLORS.passive} fill={COLORS.passive} fillOpacity={0.2} strokeWidth={2} />
            <Radar name="Detractors" dataKey="detractors" stroke={COLORS.detractor} fill={COLORS.detractor} fillOpacity={0.15} strokeWidth={2} />
            <Tooltip contentStyle={{ background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text, fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: COLORS.passive }}>● Passives</span>
          <span style={{ fontSize: 12, color: COLORS.detractor }}>● Detractors</span>
        </div>
      </Card>
    </div>
  );
}

function ThemesTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card>
        <SectionTitle accent={COLORS.detractor}>Detractor Friction Points — Top Themes</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {detractorThemes.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 170, fontSize: 13, color: COLORS.text, fontWeight: 500, flexShrink: 0 }}>{t.theme}</div>
              <div style={{ flex: 1, height: 22, background: COLORS.surfaceAlt, borderRadius: 6, overflow: "hidden", position: "relative" }}>
                <div style={{
                  height: "100%",
                  width: `${(t.count / 52) * 100}%`,
                  background: `linear-gradient(90deg, ${COLORS.detractor}, ${COLORS.detractor}88)`,
                  borderRadius: 6,
                  transition: "width 0.6s ease",
                }} />
              </div>
              <div style={{ width: 30, fontSize: 13, color: COLORS.textMuted, textAlign: "right", fontFamily: "'JetBrains Mono', monospace" }}>{t.count}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle accent={COLORS.passive}>Passive "Missing Link" — Top Themes</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {passiveThemes.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 170, fontSize: 13, color: COLORS.text, fontWeight: 500, flexShrink: 0 }}>{t.theme}</div>
              <div style={{ flex: 1, height: 22, background: COLORS.surfaceAlt, borderRadius: 6, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${(t.count / 57) * 100}%`,
                  background: `linear-gradient(90deg, ${COLORS.passive}, ${COLORS.passive}88)`,
                  borderRadius: 6,
                }} />
              </div>
              <div style={{ width: 30, fontSize: 13, color: COLORS.textMuted, textAlign: "right", fontFamily: "'JetBrains Mono', monospace" }}>{t.count}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* VoC Table */}
      <Card>
        <SectionTitle accent={COLORS.accent}>Voice of Customer — Key Themes</SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 6px" }}>
            <thead>
              <tr>
                {["Theme", "Frequency", "Representative Quotes"].map((h, i) => (
                  <th key={i} style={{
                    textAlign: "left", padding: "10px 14px", fontSize: 11,
                    textTransform: "uppercase", letterSpacing: 1.2,
                    color: COLORS.textMuted, borderBottom: `1px solid ${COLORS.border}`,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vocQuotes.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? COLORS.surfaceAlt : "transparent" }}>
                  <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600, color: COLORS.text, verticalAlign: "top", whiteSpace: "nowrap", borderRadius: "8px 0 0 8px" }}>{row.theme}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.textMuted, verticalAlign: "top", whiteSpace: "nowrap" }}>{row.freq}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6, borderRadius: "0 8px 8px 0" }}>
                    {row.quotes.map((q, j) => (
                      <div key={j} style={{ marginBottom: j < row.quotes.length - 1 ? 8 : 0, paddingLeft: 10, borderLeft: `2px solid ${COLORS.border}` }}>{q}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function InsightsTab() {
  const insights = [
    {
      num: "01",
      title: "Streamline Test Run Navigation & Bulk Operations",
      impact: "High",
      segment: "Detractors + Passives",
      desc: "The #1 pain across both segments. Users cannot efficiently browse large test sets, bulk-edit cases, or navigate between cases without closing them. Add keyboard shortcuts, persistent bulk selection, and in-context case editing within test runs.",
      color: COLORS.detractor,
    },
    {
      num: "02",
      title: "Eliminate Survey Popup Interruption & Respect User Flow",
      impact: "Medium (Trust)",
      segment: "Detractors",
      desc: "Nine detractors scored 0 specifically because the in-app popup survey interrupted their work. Replace it with a non-blocking, contextual prompt (e.g., after completing a milestone) to recover trust without sacrificing feedback volume.",
      color: COLORS.passive,
    },
    {
      num: "03",
      title: "Invest in Performance — Target Sub-2s Page Loads",
      impact: "High",
      segment: "All Segments",
      desc: "\"10 sec waiting after every change\" and \"browsing test cases takes forever\" are retention-killers. Instrument real-user performance monitoring and set SLOs for critical paths: case save (<1s), suite browse (<2s), test run load (<3s).",
      color: COLORS.promoter,
    },
    {
      num: "04",
      title: "Build an Interactive Onboarding & Documentation Hub",
      impact: "Medium",
      segment: "Detractors (new users)",
      desc: "19 detractors cite lack of tutorials, demos, or documentation. New users get lost and churn before seeing value. An in-app guided tour for first-project setup plus a curated \"quick start\" video series would close this gap.",
      color: COLORS.accent,
    },
    {
      num: "05",
      title: "Deepen Jira Integration & Standardize API Surface",
      impact: "High",
      segment: "Passives → Promoter conversion",
      desc: "Jira is mentioned more than any other integration. Users want bidirectional sync of defects, embedded test results in Jira tickets, and JQL support inside Qase. Fixing the integration bridges the gap for enterprise adoption.",
      color: COLORS.accentAlt,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.surface}, #1a1535)` }}>
        <SectionTitle accent={COLORS.gold}>Actionable Insights — Prioritized Recommendations</SectionTitle>
        <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 4px 0" }}>Five high-priority actions ranked by estimated NPS impact and cross-segment urgency.</p>
      </Card>

      {insights.map((ins, i) => (
        <Card key={i} style={{ borderLeft: `3px solid ${ins.color}`, paddingLeft: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ins.color, marginRight: 10 }}>{ins.num}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}>{ins.title}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: ins.color + "22", color: ins.color, fontWeight: 600 }}>Impact: {ins.impact}</span>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: COLORS.surfaceAlt, color: COLORS.textMuted }}>{ins.segment}</span>
            </div>
          </div>
          <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{ins.desc}</p>
        </Card>
      ))}

      {/* Delighter */}
      <Card style={{
        background: `linear-gradient(135deg, #1a1a2e, #16213e)`,
        border: `1px solid ${COLORS.gold}44`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: 80, opacity: 0.06 }}>✨</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 20 }}>🎁</span>
          <SectionTitle accent={COLORS.gold}>The "Delighter" Strategy — Low-Hanging Fruit</SectionTitle>
        </div>
        <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, color: COLORS.gold, margin: "0 0 10px 0" }}>
          "Quick Case Peek" — Inline Case Preview on Hover
        </h4>
        <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.8, margin: 0 }}>
          The single most-requested micro-interaction buried in the data: users hate opening and closing cases just to check contents. 
          Implement a <strong style={{ color: COLORS.text }}>hover-triggered side panel preview</strong> (similar to Gmail's email preview or Notion's page peek) that shows case title, steps, expected result, and last run status — without navigating away from the current view. 
          This directly addresses the #1 detractor complaint ("can't surf between cases without closing"), satisfies passive requests for "better repository UX," and costs relatively little engineering effort since the data is already fetched. 
          <strong style={{ color: COLORS.gold }}>Estimated effort: 2–3 sprint cycles. Estimated NPS impact: +3 to +5 points</strong> from reduced friction in daily workflows.
        </p>
      </Card>
    </div>
  );
}

function MatrixTab() {
  const quadrants = {
    "quick-win": { label: "Quick Wins", sub: "High Impact / Low Effort", color: COLORS.promoter, col: 0, row: 0 },
    "strategic": { label: "Strategic Bets", sub: "High Impact / High Effort", color: COLORS.accent, col: 1, row: 0 },
    "plan": { label: "Plan & Monitor", sub: "Medium Impact / Mixed Effort", color: COLORS.passive, col: 0, row: 1 },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card>
        <SectionTitle accent={COLORS.accent}>Investment Matrix — Impact vs. Effort</SectionTitle>
        <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 20px 0" }}>Resource allocation framework based on NPS impact potential and implementation complexity.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {Object.entries(quadrants).map(([key, q]) => (
            <Card key={key} style={{ background: COLORS.surfaceAlt, border: `1px solid ${q.color}33` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: q.color, marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>{q.label}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>{q.sub}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {investmentMatrix.filter(item => item.quadrant === key).map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", background: COLORS.surface, borderRadius: 10,
                    border: `1px solid ${COLORS.border}`,
                  }}>
                    <span style={{ fontSize: 18 }}>{item.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 500 }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>Impact: {item.impact} · Effort: {item.effort}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Avoid quadrant */}
          <Card style={{ background: COLORS.surfaceAlt, border: `1px solid ${COLORS.detractor}22`, opacity: 0.7 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.detractor, marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>Deprioritize</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Low Impact / High Effort</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { emoji: "🔤", name: "Custom case ID numbering schemes", sub: "Niche request, complex schema change" },
                { emoji: "🗣️", name: "Voice input for test steps", sub: "Single user request, high R&D cost" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", background: COLORS.surface, borderRadius: 10,
                  border: `1px solid ${COLORS.border}`,
                }}>
                  <span style={{ fontSize: 18 }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, opacity: 0.7 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Card>

      {/* Root Cause Summary */}
      <Card>
        <SectionTitle accent={COLORS.detractor}>Root Cause Summary</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ padding: 16, background: COLORS.surfaceAlt, borderRadius: 12, borderLeft: `3px solid ${COLORS.detractor}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.detractor, marginBottom: 8 }}>Detractor Friction Points</div>
            <ul style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
              <li>Rigid test run workflows force excessive clicking and navigation</li>
              <li>Page load latency compounds into daily workflow frustration</li>
              <li>Intrusive survey popups actively damage brand perception</li>
              <li>Steep learning curve with insufficient onboarding</li>
              <li>Shallow integrations (especially Jira) create manual workarounds</li>
            </ul>
          </div>
          <div style={{ padding: 16, background: COLORS.surfaceAlt, borderRadius: 12, borderLeft: `3px solid ${COLORS.passive}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.passive, marginBottom: 8 }}>Passive "Missing Link"</div>
            <ul style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
              <li>Test case mgmt is "good enough" but lacks power-user features (bulk ops, shared step nesting)</li>
              <li>UI is functional but not delightful — small polish gaps accumulate</li>
              <li>Reporting/dashboards lack customization for manager-level views</li>
              <li>Pricing feels misaligned for small teams (1–3 users penalized)</li>
              <li>Defect management workflow is disjointed from test execution</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function NPSDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      padding: "24px 28px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentAlt})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 800, color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>Q</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
              Qase NPS Analysis
            </h1>
            <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>3,163 responses · 407 verbatim comments · Mar 2023 – Apr 2025</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: COLORS.surface, padding: 4, borderRadius: 12, width: "fit-content" }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              color: activeTab === i ? COLORS.text : COLORS.textMuted,
              background: activeTab === i ? COLORS.surfaceAlt : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 0 && <OverviewTab />}
      {activeTab === 1 && <ThemesTab />}
      {activeTab === 2 && <InsightsTab />}
      {activeTab === 3 && <MatrixTab />}
    </div>
  );
}
