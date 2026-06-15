
import { asArray, asRecord, asString, escapeHtml, StringRecord } from "./data_definition";
import { listItems } from "./buildSkillsTable";
export function buildRecommendations(report: StringRecord) {
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