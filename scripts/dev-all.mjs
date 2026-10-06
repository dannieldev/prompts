import { spawn } from "node:child_process";

console.log("⚡ Iniciando entorno completo de desarrollo de Prompts...");

// 1. Start Wrangler Worker on port 8787
const wrangler = spawn("npx", [
  "wrangler",
  "dev",
  "worker.js",
  "--port",
  "8787",
  "--persist-to",
  ".wrangler/state",
], { stdio: "inherit" });

// 2. Start Vite Dev Server on port 3018
const vite = spawn("npx", ["vite", "--port", "3018"], { stdio: "inherit" });

function cleanup() {
  console.log("\n🛑 Deteniendo servidores...");
  wrangler.kill();
  vite.kill();
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
