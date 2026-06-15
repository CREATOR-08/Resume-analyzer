import { asArray, asRecord, asString, escapeHtml, StringRecord } from "./data_definition";

import { buildRecommendations } from "./buildRecommendations";
import { buildSkillsTable ,listItems} from "./buildSkillsTable";
export function buildAnalysisHtml({
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