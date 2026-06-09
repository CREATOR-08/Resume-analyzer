import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/ratelimit";
import { sendReportEmail } from "@/lib/sendReportEmail";
export const runtime = "nodejs";

type StringRecord = Record<string, unknown>;

function asRecord(value: unknown): StringRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as StringRecord;
  }

  return {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function firstNumber(...values: unknown[]) {
  for (const value of values) {
    const number = Number(value);

    if (Number.isFinite(number)) {
      return Math.round(number);
    }
  }

  return 0;
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function listItems(values: unknown, fallback = "No items returned.") {
  const items = asArray(values)
    .map(asString)
    .filter(Boolean);

  if (!items.length) {
    return `<p class="muted">${escapeHtml(fallback)}</p>`;
  }

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function buildSkillsTable(report: StringRecord) {
  const skills = asArray(report.skills)
    .map(asRecord)
    .filter((skill) => asString(skill.skill) || asString(skill.name));

  if (!skills.length) {
    return `<p class="muted">No skill evidence returned.</p>`;
  }

  return `
    <table>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Need</th>
          <th>Match</th>
          <th>Score</th>
          <th>Gap</th>
        </tr>
      </thead>
      <tbody>
        ${skills
          .map(
            (skill) => `
              <tr>
                <td>${escapeHtml(asString(skill.skill) || asString(skill.name))}</td>
                <td>${escapeHtml(asString(skill.requirement) || "-")}</td>
                <td>${escapeHtml(asString(skill.match) || "-")}</td>
                <td>${escapeHtml(skill.score ?? "-")}</td>
                <td>${escapeHtml(asString(skill.gap) || "No major gap found.")}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function buildRecommendations(report: StringRecord) {
  const recommendations = asArray(report.recommendations)
    .map(asRecord)
    .filter((recommendation) => asString(recommendation.action));

  if (!recommendations.length) {
    return listItems(report.suggestions, "No recommendations returned.");
  }

  return recommendations
    .map(
      (recommendation) => `
        <article class="recommendation">
          <div class="recommendation-title">
            ${escapeHtml(asString(recommendation.area) || "Recommendation")}
            ${asString(recommendation.priority) ? `<span>${escapeHtml(recommendation.priority)}</span>` : ""}
          </div>
          <p>${escapeHtml(recommendation.action)}</p>
          ${
            asString(recommendation.suggested_project)
              ? `<p class="muted">Suggested project: ${escapeHtml(recommendation.suggested_project)}</p>`
              : ""
          }
        </article>
      `
    )
    .join("");
}

function buildAnalysisHtml({
  report,
  role,
  resumeFileName,
  score,
  userName,
}: {
  report: StringRecord;
  role: string;
  resumeFileName: string;
  score: number;
  userName: string;
}) {
  const categoryScores = asRecord(report.category_scores);
  const effectiveWeights = asRecord(report.effective_weights);
  const scoreRows = Object.entries(categoryScores)
    .map(([name, value]) => `<li><strong>${escapeHtml(name)}:</strong> ${escapeHtml(value)}</li>`)
    .join("");
  const weightRows = Object.entries(effectiveWeights)
    .map(([name, value]) => `<li><strong>${escapeHtml(name)}:</strong> ${escapeHtml(value)}</li>`)
    .join("");

  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>ResumeLens Analysis</title>
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
          .score {
            display: inline-flex;
            align-items: baseline;
            gap: 6px;
            color: #6ee7b7;
            font-size: 48px;
            font-weight: 800;
          }
          .score span {
            font-size: 18px;
            color: #94a3b8;
          }
          ul {
            margin: 0;
            padding-left: 18px;
          }
          li {
            margin: 7px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }
          th, td {
            border-bottom: 1px solid #334155;
            padding: 9px;
            text-align: left;
            vertical-align: top;
          }
          th {
            color: #cbd5e1;
            background: #111827;
          }
          .recommendation {
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
            background: #020617;
          }
          .recommendation-title {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            color: #ffffff;
            font-weight: 700;
          }
          .recommendation-title span {
            color: #bae6fd;
            font-size: 11px;
            text-transform: uppercase;
          }
          @media print {
            body { background: #020617; }
            .card, .recommendation { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <main class="page">
          <section class="hero">
            <div class="eyebrow">ResumeLens Analysis</div>
            <h1>Candidate Match Summary</h1>
            <p class="muted">
              ${escapeHtml(userName)} · ${escapeHtml(role || "Target role not provided")} · ${escapeHtml(
                resumeFileName || "Resume"
              )}
            </p>
          </section>

          <section class="grid">
            <div class="card">
              <h2>Overall Score</h2>
              <div class="score">${escapeHtml(score)}<span>/ 100</span></div>
            </div>
            <div class="card">
              <h2>Summary</h2>
              <p>${escapeHtml(asString(report.role_summary) || asString(report.final_summary) || "No summary returned.")}</p>
            </div>
          </section>

          <section class="grid">
            <div class="card">
              <h2>Strengths</h2>
              ${listItems(report.strengths, "No strengths returned.")}
            </div>
            <div class="card">
              <h2>Concerns</h2>
              ${listItems(report.concerns || report.weaknesses, "No concerns returned.")}
            </div>
          </section>

          <section class="card">
            <h2>Skill Evidence</h2>
            ${buildSkillsTable(report)}
          </section>

          <section class="card">
            <h2>Recommendations</h2>
            ${buildRecommendations(report)}
          </section>

          <section class="grid">
            <div class="card">
              <h2>Category Scores</h2>
              ${scoreRows ? `<ul>${scoreRows}</ul>` : `<p class="muted">No category scores returned.</p>`}
            </div>
            <div class="card">
              <h2>Effective Weights</h2>
              ${weightRows ? `<ul>${weightRows}</ul>` : `<p class="muted">No effective weights returned.</p>`}
            </div>
          </section>

          ${
            asString(report.disclaimer)
              ? `<section class="card"><h2>Disclaimer</h2><p class="muted">${escapeHtml(report.disclaimer)}</p></section>`
              : ""
          }
        </main>
      </body>
    </html>`;
}

async function createAnalysisPdf(html: string) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    return Buffer.from(
      await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "18mm",
          right: "14mm",
          bottom: "18mm",
          left: "14mm",
        },
      })
    );
  } finally {
    await browser.close();
  }
}

async function uploadPdfToSupabase(pdf: Buffer, path: string) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_PDF_BUCKET || "resume-pdfs";

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is not configured");
  }

  if (!supabaseKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured. Server-side uploads require the service role key, not the anon or publishable key.");
  }

  if (supabaseKey.startsWith("sb_publishable_")) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY appears to be a publishable key. Use the Supabase service role key instead.");
  }

  const uploadUrl = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/${bucket}/${path}`;
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/pdf",
      "x-upsert": "true",
    },
    body: new Uint8Array(pdf),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    console.error("Supabase upload error:", {
      status: response.status,
      message,
      url: uploadUrl,
      bucket,
    });
    throw new Error(message || "Failed to upload PDF to Supabase");
  }

  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${path}`;
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const userIdentifier = user ? `user:${user.id}` : "anonymous";

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { success } = await ratelimit.limit(userIdentifier);

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const report = asRecord(body.report);
    const role = asString(body.role);
    const resumeFileName = asString(body.resumeFileName) || "resume";
    const categoryScores = asRecord(report.category_scores);
    const score = firstNumber(
      report.overall_score,
      report.overallScore,
      report.score,
      categoryScores.overall,
      categoryScores.Overall
    );
    const safeFileName = resumeFileName.replace(/[^a-z0-9._-]/gi, "-").toLowerCase();
    const pdfPath = `${user.id}/${Date.now()}-${safeFileName}.pdf`;
    const html = buildAnalysisHtml({
      report,
      role,
      resumeFileName,
      score,
      userName: user.name || user.email,
    });
    const pdf = await createAnalysisPdf(html);
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
    const analysis = await prisma.analysis.create({
      data: {
        pdfUrl,
        score,
        userId: user.id,
      },
    });

    return NextResponse.json({
      message: "Analysis PDF saved",
      analysisId: analysis.id,
      pdfUrl,
      score,
    });
  } catch (error) {
    console.error("Save analysis PDF error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to save analysis PDF",
      },
      { status: 500 }
    );
  }
}
