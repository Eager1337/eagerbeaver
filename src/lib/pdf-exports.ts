import { jsPDF } from "jspdf";
import type { Analytics } from "./portfolio-os-settings";
import { PROJECTS } from "../data/projects";

const BRAND = "Alusine G. Dumbuya — Eager Beaver";
const BRAND_TAG = "Full-Stack Developer · Systems Builder · Video Editor";
const CONTACT = "ebeaver091@gmail.com · +232 33 695 803 · github.com/Eager1337";

function header(doc: jsPDF, title: string) {
  doc.setFillColor(230, 57, 70);
  doc.rect(0, 0, 210, 22, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(BRAND, 14, 10);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(BRAND_TAG, 14, 16);
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(title, 14, 34);
  doc.setDrawColor(230, 57, 70);
  doc.setLineWidth(0.6);
  doc.line(14, 37, 196, 37);
}

function footer(doc: jsPDF) {
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(CONTACT, 14, 288);
    doc.text(`Page ${i} of ${pages}`, 196, 288, { align: "right" });
  }
}

function saveAs(doc: jsPDF, name: string) {
  doc.save(name);
}

/* ============ CV ============ */
export function downloadCvPdf() {
  const doc = new jsPDF();
  header(doc, "Curriculum Vitae");
  let y = 46;
  doc.setFontSize(10).setTextColor(60, 60, 60).setFont("helvetica", "normal");
  doc.text("Freetown, Sierra Leone · Limkokwing University", 14, y);
  y += 8;

  const sec = (title: string) => {
    y += 4;
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(230, 57, 70);
    doc.text(title.toUpperCase(), 14, y);
    y += 5;
    doc.setDrawColor(220, 220, 220);
    doc.line(14, y, 196, y);
    y += 5;
    doc.setTextColor(30, 30, 30).setFont("helvetica", "normal").setFontSize(10);
  };
  const line = (t: string) => {
    const wrapped = doc.splitTextToSize(t, 182);
    doc.text(wrapped, 14, y);
    y += wrapped.length * 5;
  };

  sec("Summary");
  line(
    "Full-stack developer and systems builder with a video-editing background. I ship end-to-end web products in React, TypeScript, TanStack Start, Node.js and Postgres — plus cinematic video in Premiere, After Effects and DaVinci Resolve. I build production-grade systems solo, from data model to deployment.",
  );

  sec("Core skills");
  ["HTML5, CSS3, JavaScript, TypeScript, React, Next.js, TanStack Start",
    "Node.js, PostgreSQL, Supabase, Cloudflare Workers, REST + server functions",
    "Tailwind CSS, Framer Motion, shadcn/ui, design systems, accessibility",
    "Premiere Pro, After Effects, DaVinci Resolve, motion typography, color",
    "Systems thinking, product ownership, CI/CD, testing, monitoring"]
    .forEach((t) => { line("• " + t); });

  sec("Selected projects");
  PROJECTS.slice(0, 8).forEach((p) => {
    doc.setFont("helvetica", "bold");
    line(`${p.title} — ${p.category}`);
    doc.setFont("helvetica", "normal");
    line(p.tagline);
    y += 1;
  });

  sec("Education");
  line("Limkokwing University, Sierra Leone — Software Engineering track (current).");

  sec("Contact");
  line("Email: ebeaver091@gmail.com");
  line("Phone: +232 33 695 803");
  line("GitHub: github.com/Eager1337");
  line("LinkedIn: linkedin.com/in/eager-beaver-03ab9040b");

  footer(doc);
  saveAs(doc, "Alusine-Dumbuya-CV.pdf");
}

/* ============ Rate card ============ */
export function downloadRateCardPdf() {
  const doc = new jsPDF();
  header(doc, "Rate Card & Packages");
  let y = 46;
  doc.setFontSize(10).setTextColor(60, 60, 60);
  doc.text("All prices in USD. Includes design, development, deploy and 30-day support.", 14, y);
  y += 10;

  const tiers = [
    { name: "Starter Site", price: "$1,200", weeks: "2 weeks",
      inc: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO", "Deployed on Lovable Cloud"] },
    { name: "Growth Site", price: "$3,500", weeks: "4 weeks",
      inc: ["Up to 12 pages", "CMS or content model", "Auth + user accounts", "Analytics dashboard", "Custom animations"] },
    { name: "Signature Build", price: "from $8,000", weeks: "6–10 weeks",
      inc: ["Unlimited pages", "AI features", "Payments / subscriptions", "Multi-language", "Investor dashboard", "12-month roadmap"] },
  ];

  tiers.forEach((t) => {
    doc.setFillColor(245, 245, 245);
    doc.rect(14, y, 182, 44, "F");
    doc.setTextColor(20, 20, 20).setFont("helvetica", "bold").setFontSize(14);
    doc.text(t.name, 20, y + 9);
    doc.setTextColor(230, 57, 70);
    doc.text(t.price, 196, y + 9, { align: "right" });
    doc.setTextColor(90, 90, 90).setFont("helvetica", "normal").setFontSize(9);
    doc.text(t.weeks, 20, y + 15);
    doc.setTextColor(30, 30, 30).setFontSize(9);
    t.inc.forEach((it, i) => { doc.text("• " + it, 20, y + 22 + i * 4); });
    y += 50;
  });

  y += 4;
  doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(230, 57, 70);
  doc.text("ADD-ONS", 14, y); y += 6;
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(30, 30, 30);
  [
    "Video editing (per finished minute) — $180",
    "Extra page — $220",
    "Motion / animation pass — $650",
    "SEO audit + fixes — $450",
    "Ongoing retainer (monthly) — from $900",
  ].forEach((s) => { doc.text("• " + s, 14, y); y += 6; });

  footer(doc);
  saveAs(doc, "Eager-Beaver-Rate-Card.pdf");
}

/* ============ Analytics ============ */
export function downloadAnalyticsCsv(a: Analytics, compare?: [string, string]) {
  const rows: string[] = [];
  rows.push("Metric,Value");
  rows.push(`Sessions,${a.sessions}`);
  rows.push(`First seen,${a.firstSeen ? new Date(a.firstSeen).toISOString() : ""}`);
  const totalViews = Object.values(a.projectViews).reduce((n, v) => n + v, 0);
  const totalClicks = Object.values(a.featureClicks).reduce((n, v) => n + v, 0);
  rows.push(`Total project views,${totalViews}`);
  rows.push(`Total feature clicks,${totalClicks}`);
  rows.push("");
  rows.push("Project,Views");
  Object.entries(a.projectViews).sort((x, y) => y[1] - x[1]).forEach(([k, v]) => rows.push(`${k},${v}`));
  rows.push("");
  rows.push("Feature,Clicks");
  Object.entries(a.featureClicks).sort((x, y) => y[1] - x[1]).forEach(([k, v]) => rows.push(`${k},${v}`));
  if (compare) {
    rows.push("");
    rows.push("Comparison,Metric,Value");
    compare.forEach((slug) => {
      const p = PROJECTS.find((x) => x.slug === slug);
      if (!p) return;
      rows.push(`${p.title},Category,${p.category}`);
      rows.push(`${p.title},Tagline,"${p.tagline.replace(/"/g, '""')}"`);
      p.metrics.forEach((m) => rows.push(`${p.title},${m.label},${m.value}`));
    });
  }
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const el = document.createElement("a");
  el.href = url; el.download = `portfolio-os-analytics-${Date.now()}.csv`; el.click();
  URL.revokeObjectURL(url);
}

export function downloadAnalyticsPdf(a: Analytics, compare?: [string, string]) {
  const doc = new jsPDF();
  header(doc, "Investor Analytics Report");
  let y = 46;
  doc.setFontSize(10).setTextColor(60, 60, 60);
  doc.text(`Generated ${new Date().toLocaleString()}`, 14, y);
  y += 10;

  const totalViews = Object.values(a.projectViews).reduce((n, v) => n + v, 0);
  const totalClicks = Object.values(a.featureClicks).reduce((n, v) => n + v, 0);
  const kpis: [string, string][] = [
    ["Sessions", String(a.sessions)],
    ["Project views", String(totalViews)],
    ["Feature clicks", String(totalClicks)],
    ["First seen", a.firstSeen ? new Date(a.firstSeen).toLocaleDateString() : "—"],
  ];
  kpis.forEach(([k, v], i) => {
    const x = 14 + (i % 4) * 46;
    doc.setFillColor(245, 245, 245); doc.rect(x, y, 44, 22, "F");
    doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(120, 120, 120);
    doc.text(k, x + 3, y + 6);
    doc.setFont("helvetica", "bold").setFontSize(14).setTextColor(20, 20, 20);
    doc.text(v, x + 3, y + 16);
  });
  y += 32;

  doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(230, 57, 70);
  doc.text("TOP CASE STUDIES", 14, y); y += 6;
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(30, 30, 30);
  const top = Object.entries(a.projectViews).sort((x, z) => z[1] - x[1]).slice(0, 12);
  if (top.length === 0) {
    doc.setTextColor(120, 120, 120);
    doc.text("No project views recorded yet.", 14, y);
    y += 8;
  } else {
    top.forEach(([slug, n]) => {
      const p = PROJECTS.find((x) => x.slug === slug);
      doc.text(`${(p?.title ?? slug).slice(0, 60)}`, 14, y);
      doc.text(String(n), 196, y, { align: "right" });
      y += 6;
    });
  }

  if (compare) {
    y += 6;
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(230, 57, 70);
    doc.text("HEAD-TO-HEAD", 14, y); y += 6;
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(30, 30, 30);
    const [a1, a2] = compare.map((s) => PROJECTS.find((p) => p.slug === s));
    if (a1 && a2) {
      doc.setFont("helvetica", "bold");
      doc.text(a1.title, 14, y); doc.text(a2.title, 110, y); y += 6;
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(a1.tagline, 90), 14, y);
      doc.text(doc.splitTextToSize(a2.tagline, 90), 110, y);
      y += 14;
      const rows = Math.max(a1.metrics.length, a2.metrics.length);
      for (let i = 0; i < rows; i++) {
        const m1 = a1.metrics[i], m2 = a2.metrics[i];
        if (m1) doc.text(`${m1.label}: ${m1.value}`, 14, y);
        if (m2) doc.text(`${m2.label}: ${m2.value}`, 110, y);
        y += 6;
      }
    }
  }

  footer(doc);
  saveAs(doc, `investor-analytics-${Date.now()}.pdf`);
}

/* ============ Quote proposal ============ */
export interface QuoteInput {
  client: string;
  pages: number;
  complexity: string;
  timelineTier: string;
  weeks: number;
  addons: string[];
  subtotal: number;
  addonsTotal: number;
  total: number;
}

export function downloadQuotePdf(q: QuoteInput) {
  const doc = new jsPDF();
  header(doc, "Project Proposal");
  let y = 46;
  doc.setFontSize(10).setTextColor(60, 60, 60);
  doc.text(`Prepared for: ${q.client || "Client"}`, 14, y); y += 5;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, y); y += 10;

  const sec = (title: string) => {
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(230, 57, 70);
    doc.text(title.toUpperCase(), 14, y); y += 6;
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(30, 30, 30);
  };
  const li = (t: string) => { const w = doc.splitTextToSize("• " + t, 182); doc.text(w, 14, y); y += w.length * 5; };

  sec("Scope");
  li(`${q.pages} pages`);
  li(`${q.complexity[0].toUpperCase() + q.complexity.slice(1)} complexity`);
  q.addons.forEach(li);

  y += 3;
  sec("Timeline");
  li(`${q.weeks} weeks (${q.timelineTier})`);

  y += 3;
  sec("Investment");
  doc.text(`Subtotal:`, 14, y); doc.text(`$${q.subtotal.toLocaleString()}`, 196, y, { align: "right" }); y += 6;
  doc.text(`Add-ons:`, 14, y); doc.text(`$${q.addonsTotal.toLocaleString()}`, 196, y, { align: "right" }); y += 6;
  doc.setFont("helvetica", "bold").setFontSize(13);
  doc.text(`Total:`, 14, y); doc.text(`$${q.total.toLocaleString()}`, 196, y, { align: "right" });
  y += 10;

  doc.setFont("helvetica", "normal").setFontSize(10);
  sec("Deliverables");
  li("Production build shipped on Lovable Cloud");
  li("Full source access — you own the code");
  li("30-day post-launch support included");
  li("Signable SOW within 24 hours of acceptance");

  footer(doc);
  saveAs(doc, `proposal-${(q.client || "client").replace(/\W+/g, "-")}-${Date.now()}.pdf`);
}