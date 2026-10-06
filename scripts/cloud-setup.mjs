import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

console.log("☁️  Configurando Cloudflare D1 para Prompts...");

try {
  // 1. Check existing databases
  console.log("🔍 Verificando bases de datos D1 en tu cuenta...");
  const listRaw = execSync("wrangler d1 list --json", { encoding: "utf8" });
  const databases = JSON.parse(listRaw);

  let db = databases.find((d) => d.name === "prompts");

  if (!db) {
    console.log("📦 Creando base de datos 'prompts' en Cloudflare D1...");
    execSync("wrangler d1 create prompts", { stdio: "inherit" });
    const updatedListRaw = execSync("wrangler d1 list --json", { encoding: "utf8" });
    const updatedDatabases = JSON.parse(updatedListRaw);
    db = updatedDatabases.find((d) => d.name === "prompts");
  } else {
    console.log(`✅ Base de datos 'prompts' encontrada: ID ${db.uuid}`);
  }

  if (!db || !db.uuid) {
    throw new Error("No se pudo obtener el ID de la base de datos D1.");
  }

  // 2. Update wrangler.jsonc with production DB ID
  console.log("📝 Actualizando wrangler.jsonc con database_id...");
  const wranglerConfigPath = "wrangler.jsonc";
  const wranglerContent = readFileSync(wranglerConfigPath, "utf8");

  const updatedConfig = wranglerContent.replace(
    /"database_id":\s*"[^"]*"/,
    `"database_id": "${db.uuid}"`
  );

  writeFileSync(wranglerConfigPath, updatedConfig, "utf8");
  console.log(`✅ wrangler.jsonc configurado con database_id: ${db.uuid}`);

  // 3. Apply remote migrations
  console.log("🚀 Aplicando migraciones a D1 remoto...");
  execSync("wrangler d1 migrations apply DB --remote -y", { stdio: "inherit" });

  console.log("\n🎉 ¡Listo! La base Cloudflare D1 está configurada y lista.");
  console.log("💡 Para desplegar en prompts.dannieldev.com ejecuta: npm run deploy");
} catch (error) {
  console.error("❌ Error en la configuración de Cloudflare:", error.message || error);
  process.exit(1);
}
