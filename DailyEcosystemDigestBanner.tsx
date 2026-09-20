import jsPDF from "jspdf";
import { ResearchDossier } from "../components/modules/ModuleInvestmentReports";

/**
 * Generates a clean, professional, publication-ready PDF document for an Investment Report / Dossier
 */
export function generateReportPdf(dossier: ResearchDossier): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors
  const primaryGreen = [46, 90, 44] as [number, number, number]; // #2E5A2C
  const darkGreen = [30, 59, 29] as [number, number, number]; // #1E3B1D
  const lightBg = [246, 250, 245] as [number, number, number]; // #F6FAF5
  const borderGreen = [215, 231, 214] as [number, number, number]; // #D7E7D6
  const textDark = [15, 23, 42] as [number, number, number]; // #0F172A (slate-900)
  const textMuted = [100, 116, 139] as [number, number, number]; // #64748B (slate-500)
  const accentAmber = [180, 83, 9] as [number, number, number]; // amber-700
  const accentBlue = [29, 78, 216] as [number, number, number]; // blue-700

  // Helper to check page bounds & insert new page with running header/footer
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 22) {
      doc.addPage();
      y = margin + 12;
      drawRunningHeader();
    }
  };

  const drawRunningHeader = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
    doc.text("961AI VENTURE INTELLIGENCE & RESEARCH DESK", margin, 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(dossier.badge || "SPECIAL RESEARCH DOSSIER", pageWidth - margin, 10, { align: "right" });

    // Subtle header divider rule
    doc.setDrawColor(borderGreen[0], borderGreen[1], borderGreen[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, 12, pageWidth - margin, 12);
  };

  // ==========================================
  // 1. COVER / HEADER BLOCK
  // ==========================================
  
  // Top brand badge bar
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("961AI LEBANON & MENA VENTURE ECOSYSTEM INTELLIGENCE", margin + 3, y + 5.5);
  doc.text("OFFICIAL RESEARCH DOSSIER • 2026 EDITION", pageWidth - margin - 3, y + 5.5, { align: "right" });
  y += 12;

  // Category & Metadata Tags
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  const catText = `CATEGORY: ${dossier.category.toUpperCase()}`;
  doc.text(catText, margin, y);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const dateMeta = `${dossier.date}  |  ${dossier.readTime}  |  Classification: Institutional Brief`;
  doc.text(dateMeta, pageWidth - margin, y, { align: "right" });
  y += 5;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  const titleLines = doc.splitTextToSize(dossier.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 6.5 + 2;

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const subtitleLines = doc.splitTextToSize(dossier.subtitle, contentWidth);
  doc.text(subtitleLines, margin, y);
  y += subtitleLines.length * 4.5 + 3;

  // Publisher attribution & Tags
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Publisher / Intelligence Desk: ${dossier.publisher}`, margin, y);
  y += 4.5;

  if (dossier.tags && dossier.tags.length > 0) {
    doc.setFont("courier", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
    const tagsString = dossier.tags.join("   ");
    doc.text(tagsString, margin, y);
    y += 5;
  }

  // Divider
  doc.setDrawColor(borderGreen[0], borderGreen[1], borderGreen[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // ==========================================
  // 2. KEY METRICS & TELEMETRY GRID
  // ==========================================
  checkPageBreak(38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.text("EXECUTIVE KEY METRICS & TELEMETRY", margin, y);
  y += 4;

  const cardWidth = (contentWidth - 6) / 2;
  const cardHeight = 16;
  
  if (dossier.keyMetrics && dossier.keyMetrics.length > 0) {
    dossier.keyMetrics.slice(0, 4).forEach((metric, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const cardX = margin + col * (cardWidth + 6);
      const cardY = y + row * (cardHeight + 3);

      // Card Background
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.setDrawColor(borderGreen[0], borderGreen[1], borderGreen[2]);
      doc.setLineWidth(0.4);
      doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 1.5, 1.5, "FD");

      // Label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text(metric.label.toUpperCase(), cardX + 3, cardY + 4);

      // Value
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      if (metric.tone === "emerald") {
        doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
      } else if (metric.tone === "amber") {
        doc.setTextColor(accentAmber[0], accentAmber[1], accentAmber[2]);
      } else if (metric.tone === "blue") {
        doc.setTextColor(accentBlue[0], accentBlue[1], accentBlue[2]);
      } else {
        doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      }
      doc.text(metric.value, cardX + 3, cardY + 9);

      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      const descLine = doc.splitTextToSize(metric.description, cardWidth - 6)[0] || "";
      doc.text(descLine, cardX + 3, cardY + 13.5);
    });

    y += Math.ceil(Math.min(dossier.keyMetrics.length, 4) / 2) * (cardHeight + 3) + 3;
  }

  // ==========================================
  // 3. EXECUTIVE SUMMARY & HIGHLIGHTS
  // ==========================================
  checkPageBreak(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.text("EXECUTIVE SUMMARY & CORE FINDINGS", margin, y);
  y += 4.5;

  // Excerpt Paragraph
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const excerptLines = doc.splitTextToSize(dossier.excerpt, contentWidth);
  doc.text(excerptLines, margin, y);
  y += excerptLines.length * 4.2 + 3;

  // Bullet Points
  if (dossier.bulletHighlights && dossier.bulletHighlights.length > 0) {
    dossier.bulletHighlights.forEach((bullet) => {
      checkPageBreak(12);
      
      // Bullet Dot
      doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
      doc.circle(margin + 2, y - 1, 1, "F");

      // Bullet Text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      const bulletLines = doc.splitTextToSize(bullet, contentWidth - 6);
      doc.text(bulletLines, margin + 6, y);
      y += bulletLines.length * 3.8 + 2;
    });
    y += 3;
  }

  // ==========================================
  // 4. REPORT-SPECIFIC IN-DEPTH SECTIONS
  // ==========================================
  
  // Specific Data Section: MENA & LEBANON VC 2026
  if (dossier.slug === "mena_lebanon_vc") {
    checkPageBreak(50);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
    doc.text("TOP MENA STARTUP INVESTMENT CATEGORIES (2025–2026)", margin, y);
    y += 5;

    const categoriesData = [
      { sector: "FinTech (Payments, Open Banking, BNPL)", share: "~35% - 40%", trend: "Dominant Asset Class", driver: "Digital payments, open banking, B2B credit & GCC neobanking" },
      { sector: "Enterprise Software & AI (B2B SaaS)", share: "~18% - 22%", trend: "Fastest Growing", driver: "Arabic NLP/LLMs, robotic automation, sovereign cloud compute" },
      { sector: "E-Commerce & Retail Tech", share: "~12% - 15%", trend: "Maturing / M&A", driver: "Q-commerce consolidation, B2B wholesale marketplaces" },
      { sector: "HealthTech & BioTech", share: "~8% - 10%", trend: "High Demand", driver: "Telemedicine, AI diagnostics, pharmacy supply-chain digitization" },
      { sector: "CleanTech & AgriTech", share: "~5% - 8%", trend: "Sovereign Priority", driver: "Solar microgrids, water desalination, precision hydroponics" }
    ];

    categoriesData.forEach((row) => {
      checkPageBreak(12);
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.setDrawColor(borderGreen[0], borderGreen[1], borderGreen[2]);
      doc.roundedRect(margin, y, contentWidth, 10, 1, 1, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text(row.sector, margin + 3, y + 4.2);

      doc.setFont("courier", "bold");
      doc.setFontSize(8);
      doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
      doc.text(row.share, margin + 3, y + 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text(`[${row.trend}] ${row.driver}`, margin + 30, y + 8);

      y += 12;
    });

    checkPageBreak(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
    doc.text("REGIONAL COMPARISON: MENA VS. LEBANON ECOSYSTEM", margin, y);
    y += 5;

    const compData = [
      { dim: "Total Deployed Capital", mena: ">$3.0 Billion (Record High)", leb: "~$15M - $30M (Domestic Early-Stage)" },
      { dim: "Primary Funding Conduits", mena: "Sovereigns (PIF, Sanabil), Institutional VCs", leb: "DFIs (USAID, IFC), Impact & Diaspora Angels" },
      { dim: "Average Seed Deal Size", mena: "$1.5M - $3.0M", leb: "$250K - $750K" },
      { dim: "Average Series A Size", mena: "$7.0M - $15.0M", leb: "$2.0M - $5.0M (Cross-Border TopCos)" },
      { dim: "Lebanon Tech Arbitrage", mena: "Talent Importer / Market Destination", leb: "3.6x Engineering Cost Advantage (Beirut Hub)" }
    ];

    compData.forEach((row) => {
      checkPageBreak(8);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
      doc.text(`• ${row.dim}:`, margin + 2, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text(`MENA: ${row.mena}  |  Lebanon: ${row.leb}`, margin + 45, y);
      y += 5.5;
    });
  }

  // Specific Data Section: PE & VC Landscape 2026
  if (dossier.slug === "pe_vc") {
    checkPageBreak(50);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
    doc.text("PROMINENT HEADQUARTERED PRIVATE EQUITY MANAGERS", margin, y);
    y += 5;

    const peFirms = [
      { name: "Global Gate Capital", aum: "$6B+ AUM", strategy: "Multi-strategy (PE, Real Assets, Debt)", hq: "Beirut" },
      { name: "The EuroMena Funds", aum: "Undisclosed", strategy: "Growth Equity & Buyout (Health, Finance)", hq: "Beirut" },
      { name: "Lebanon Growth Capital Fund", aum: "$50M AUM", strategy: "DFI-backed SME Growth Equity", hq: "Beirut" },
      { name: "BY Venture Partners", aum: "Undisclosed", strategy: "Cross-Border MENA/US Early-Stage VC", hq: "Beirut" },
      { name: "Capital B & Emerging Inv. Partners", aum: "Undisclosed", strategy: "Mid-Market PE & Tech Buyout", hq: "Lebanon" }
    ];

    peFirms.forEach((firm) => {
      checkPageBreak(10);
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.setDrawColor(borderGreen[0], borderGreen[1], borderGreen[2]);
      doc.roundedRect(margin, y, contentWidth, 8.5, 1, 1, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text(firm.name, margin + 3, y + 4);

      doc.setFont("courier", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
      doc.text(firm.aum, margin + 60, y + 4);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text(firm.strategy, margin + 3, y + 7.2);
      doc.text(`HQ: ${firm.hq}`, pageWidth - margin - 20, y + 4);

      y += 10.5;
    });
  }

  // Specific Data Section: War Economics 2026
  if (dossier.slug === "war_economics") {
    checkPageBreak(50);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
    doc.text("STARTUP OPERATING COST INFLATION MATRIX (2026 WARTIME SCENARIO)", margin, y);
    y += 5;

    const inflationRows = [
      { item: "Energy & Generator Tariffs", baseline: "$120,000", wartime: "$160,000", change: "+33.3%", note: "Diesel spikes & microgrid reliance" },
      { item: "Logistics & War Risk Freight", baseline: "$200,000", wartime: "$300,000", change: "+50.0%", note: "Maritime insurance surcharges" },
      { item: "Raw Materials & Hardware", baseline: "$250,000", wartime: "$325,000", change: "+30.0%", note: "Regional supply chain delays" },
      { item: "Cloud & Cybersecurity Defense", baseline: "$80,000", wartime: "$95,000", change: "+18.8%", note: "Network hardening & DDoS resilience" },
      { item: "TOTAL OPERATING BURN", baseline: "$1,000,000", wartime: "$1,230,000", change: "+23.0%", note: "Runway compressed by ~2.8 months" }
    ];

    inflationRows.forEach((row, idx) => {
      checkPageBreak(8);
      const isTotal = idx === inflationRows.length - 1;
      if (isTotal) {
        doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2]);
        doc.roundedRect(margin, y, contentWidth, 8, 1, 1, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(255, 255, 255);
        doc.text(row.item, margin + 3, y + 5);
        doc.text(`Base: ${row.baseline}  -->  Wartime: ${row.wartime} (${row.change})`, margin + 60, y + 5);
      } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(textDark[0], textDark[1], textDark[2]);
        doc.text(`• ${row.item}:`, margin + 2, y + 3);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(textDark[0], textDark[1], textDark[2]);
        doc.text(`${row.baseline} -> ${row.wartime} (${row.change}) | ${row.note}`, margin + 50, y + 3);
      }
      y += 6.5;
    });
  }

  // Specific Data Section: Offshore Governance
  if (dossier.slug === "offshore_governance") {
    checkPageBreak(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
    doc.text("LEBANESE LAW NO. 85: OFFSHORE SAL TAX ADVANTAGES", margin, y);
    y += 5;

    const taxBenefits = [
      "0% Corporate Income Tax on foreign software exports & consulting services (vs 17% standard rate).",
      "0% Dividend Distribution Tax on profits disbursed from overseas revenues (vs 10% standard rate).",
      "100% Exemption from stamp duty on all commercial contracts executed with international clients.",
      "Fixed annual lump-sum municipal/state tax of only 1,000,000 LBP (~$11 USD).",
      "Delaware C-Corp or ADGM TopCo integration allows seamless YC SAFE issuances while keeping Beirut R&D."
    ];

    taxBenefits.forEach((benefit) => {
      checkPageBreak(8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      const lines = doc.splitTextToSize(`• ${benefit}`, contentWidth - 4);
      doc.text(lines, margin + 2, y);
      y += lines.length * 3.8 + 1.5;
    });
  }

  // ==========================================
  // 5. METHODOLOGY & CITATION FOOTER BLOCK
  // ==========================================
  checkPageBreak(30);
  y += 4;
  doc.setDrawColor(borderGreen[0], borderGreen[1], borderGreen[2]);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text("RESEARCH METHODOLOGY & SOURCE CITATIONS", margin, y);
  y += 3.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const disclaimer = 
    "Data synthesized from verified primary sources including MAGNiTT Emerging Markets VC Reports, ZoomInvestors PE Directory (Jan 2026), CapLink Regional Capital Dispatches, European Investment Bank (EIB) disclosures, and Lebanese Law No. 85 / Decree 46 regulatory frameworks. Compiled by 961AI Intelligence Desk for institutional investment guidance. Not formal legal or financial advice.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(disclaimerLines, margin, y);

  // ==========================================
  // 6. APPLY FOOTERS ACROSS ALL PAGES
  // ==========================================
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Footer divider line
    doc.setDrawColor(borderGreen[0], borderGreen[1], borderGreen[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    // Footer Text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
    doc.text("961AI VENTURE INTELLIGENCE", margin, pageHeight - 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(
      `Confidential & Proprietary • Document ID: ${dossier.id.toUpperCase()}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: "center" }
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: "right" });
  }

  // Trigger Download
  const filename = `${dossier.slug}_report_961ai_2026.pdf`;
  doc.save(filename);
}
