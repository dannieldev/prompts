import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const rules = [
  ["ruta personal", /\/(?:Users|home)\/[\w.-]+\//i],
  ["correo electrónico", /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i],
  ["subdominio privado", /(?<![\w-])(?!prompts\.dannieldev\.com\b)(?:[\w-]+\.)+dannieldev\.com\b/i],
  ["identificador de infraestructura", /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i],
  ["clave privada", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["token de acceso", /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-(?:proj-)?[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16})\b/],
];
// Compare against local configuration without printing its values.
const config = JSON.parse(readFileSync("wrangler.jsonc", "utf8"));
const privateValues = [config.account_id, ...(config.d1_databases ?? []).map((db) => db.database_id)].filter(Boolean);
const failures = [];
let count = 0;
function scan(path) {
  for (const name of readdirSync(path)) {
    const file = join(path, name);
    if (statSync(file).isDirectory()) { scan(file); continue; }
    count++;
    if (/\.(?:map|sql|toml)$|^(?:\.env|\.dev\.vars)|^(?:wrangler|seeds|README|CLOUDFLARE|AGENTS)/i.test(name)) {
      failures.push(`${relative(root, file)}: archivo interno o mapa de código fuente`);
    }
    if (!/\.(?:html|js|css|json|svg|txt|xml|md)$/.test(name) && name !== "_headers") continue;
    const text = readFileSync(file, "utf8");
    for (const [label, pattern] of rules) {
      if (pattern.test(text)) failures.push(`${relative(root, file)}: ${label}`);
    }
    if (privateValues.some((value) => text.includes(value))) {
      failures.push(`${relative(root, file)}: valor de configuración privada`);
    }
  }
}
scan(join(root, "dist"));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Auditoría pública: ${count} archivos compilados revisados, sin coincidencias de los patrones de datos privados.`);
}
