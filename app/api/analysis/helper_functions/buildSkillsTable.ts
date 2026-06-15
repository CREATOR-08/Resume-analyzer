
import { asArray, asRecord, asString, escapeHtml, StringRecord } from "./data_definition";

export function buildSkillsTable(report: StringRecord) {
  const skills = asArray(report.skills)
    .map(asRecord)
    .filter((skill:any) => asString(skill.skill) || asString(skill.name));

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
            (skill:any) => `
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


export function listItems(values: unknown, fallback = "No items returned.") {
  const items = asArray(values)
    .map(asString)
    .filter(Boolean);

  if (!items.length) {
    return `<p class="muted">${escapeHtml(fallback)}</p>`;
  }

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

