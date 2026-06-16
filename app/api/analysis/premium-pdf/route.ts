import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { createAnalysisPdf } from "../helper_functions/createAnalysisPdf";
import { uploadPdfToSupabase } from "../helper_functions/uploadPdfToSupabase";
import { sendReportEmail } from "@/lib/sendReportEmail";

export const runtime = "nodejs";

function buildPremiumHtml({
  report,
  companyName,
  role,
  userName,
}: {
  report: any;
  companyName: string;
  role: string;
  userName: string;
}) {
  const summary = report.summary ?? {};
  const grammarIssues = report.grammar ?? [];
  const weakVerbs = report.weak_verbs ?? [];
  const suggestions = report.suggestions ?? [];
  const lacking = report.lacking ?? [];

  const grammarRows = grammarIssues
    .map(
      (item: any) => `
      <div style="border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #0f172a;">
        <h4 style="color: #f87171; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase;">Original</h4>
        <p style="color: #cbd5e1; margin: 0 0 10px 0; font-style: italic;">"${item.original || ""}"</p>
        <h4 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase;">Issue</h4>
        <p style="color: #cbd5e1; margin: 0 0 10px 0;">${item.issue || ""}</p>
        <h4 style="color: #86efac; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase;">Suggestion</h4>
        <p style="color: #cbd5e1; margin: 0;">${item.suggestion || ""}</p>
      </div>`
    )
    .join("");

  const weakVerbRows = weakVerbs
    .map(
      (item: any) => `
      <div style="border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #0f172a;">
        <h4 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase;">Weak Word: "${item.weak_word || ""}"</h4>
        <p style="color: #cbd5e1; margin: 0 0 10px 0; font-size: 12px;">In: "${item.original || ""}"</p>
        <h4 style="color: #86efac; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase;">Suggestion</h4>
        <p style="color: #cbd5e1; margin: 0; font-weight: bold;">${item.suggestion || ""}</p>
      </div>`
    )
    .join("");

  const suggestionsRows = suggestions
    .map(
      (item: any) => `
      <div style="border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #0f172a;">
        <p style="color: #ffffff; margin: 0 0 8px 0; font-weight: bold;">${item.issue || ""}</p>
        <p style="color: #cbd5e1; margin: 0;">💡 ${item.suggestion || ""}</p>
      </div>`
    )
    .join("");

  const lackingRows = lacking
    .map(
      (item: any) => `
      <div style="border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #0f172a;">
        <p style="color: #ffffff; margin: 0 0 8px 0; font-weight: bold;">${item.issue || ""}</p>
        <p style="color: #cbd5e1; margin: 0;">✓ ${item.suggestion || ""}</p>
      </div>`
    )
    .join("");

  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Premium Resume Analysis</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            color: #e5e7eb;
            background: #020617;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.5;
          }
          .page {
            padding: 42px;
          }
          .hero {
            border-bottom: 1px solid #334155;
            padding-bottom: 24px;
            margin-bottom: 24px;
          }
          .eyebrow {
            color: #67e8f9;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          h1 {
            color: #ffffff;
            font-size: 36px;
            line-height: 1.1;
            margin: 10px 0;
          }
          h2 {
            color: #ffffff;
            font-size: 17px;
            margin: 0 0 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .muted {
            color: #94a3b8;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .card {
            border: 1px solid #334155;
            border-radius: 8px;
            background: #0f172a;
            padding: 18px;
            margin-bottom: 16px;
          }
          ul {
            margin: 0;
            padding-left: 18px;
          }
          li {
            margin: 7px 0;
          }
          @media print {
            body { background: #020617; }
            .card { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <main class="page">
          <section class="hero">
            <div class="eyebrow">Premium Resume Analysis</div>
            <h1>${companyName}</h1>
            <p class="muted">
              ${userName} · ${role} · Premium Analysis
            </p>
          </section>

          <section class="grid">
            <div class="card">
              <h2>Analysis Summary</h2>
              <ul>
                <li><strong>Grammar Issues:</strong> ${summary.grammar_count ?? 0}</li>
                <li><strong>Weak Verbs:</strong> ${summary.weak_verbs_count ?? 0}</li>
                <li><strong>Suggestions:</strong> ${summary.suggestion_count ?? 0}</li>
                <li><strong>Missing Elements:</strong> ${summary.lacking_count ?? 0}</li>
              </ul>
            </div>
          </section>

          ${
            grammarIssues.length > 0
              ? `
          <section class="card">
            <h2>Grammar & Writing Issues (${grammarIssues.length})</h2>
            ${grammarRows}
          </section>
          `
              : ""
          }

          ${
            weakVerbs.length > 0
              ? `
          <section class="card">
            <h2>Weak Verb Usage (${weakVerbs.length})</h2>
            ${weakVerbRows}
          </section>
          `
              : ""
          }

          ${
            suggestions.length > 0
              ? `
          <section class="card">
            <h2>Recommendations (${suggestions.length})</h2>
            ${suggestionsRows}
          </section>
          `
              : ""
          }

          ${
            lacking.length > 0
              ? `
          <section class="card">
            <h2>Missing Elements (${lacking.length})</h2>
            ${lackingRows}
          </section>
          `
              : ""
          }
        </main>
      </body>
    </html>`;
}

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const report = body.report ?? {};
    const companyName = body.companyName || "Premium Analysis";
    const role = body.role || "Target Role";

    const html = buildPremiumHtml({
      report,
      companyName,
      role,
      userName: user.name || user.email,
    });

    const pdf = await createAnalysisPdf(html);
    const pdfPath = `${user.id}/${Date.now()}-premium-analysis.pdf`;
    const pdfUrl = await uploadPdfToSupabase(pdf, pdfPath);

    try {
      await sendReportEmail({
        email: user.email,
        name: user.name || undefined,
        pdfUrl,
      });
    } catch (err) {
      console.error("Email failed:", err);
    }

    return NextResponse.json({
      message: "Premium analysis PDF generated and sent",
      pdfUrl,
    });
  } catch (error) {
    console.error("Premium PDF generation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate premium PDF",
      },
      { status: 500 }
    );
  }
}
