import { writeFileSync } from "node:fs";
import { SEED_PROMPTS } from "../seeds.js";

const now = new Date().toISOString();
let sql = "";

for (const p of SEED_PROMPTS) {
  const esc = (s) => (s ? String(s).replace(/'/g, "''") : "");
  sql += `INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('${esc(p.id)}', '${esc(p.title)}', '${esc(p.description)}', '${esc(p.content)}', '${esc(p.category)}', '${esc(JSON.stringify(p.tags || []))}', '${esc(JSON.stringify(p.models || []))}', ${p.is_favorite ? 1 : 0}, '${esc(p.created_at || now)}', '${esc(now)}');\n`;
}

writeFileSync("migrations/seed_data.sql", sql, "utf8");
console.log(`✅ Generated migrations/seed_data.sql with ${SEED_PROMPTS.length} prompts.`);
