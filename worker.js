import { SEED_PROMPTS } from "./seeds.js";

/**
 * Cloudflare Worker for prompts.dannieldev.com
 * Handles API routes connected to Cloudflare D1 and serves static assets.
 */

// Simple UUID generator for browser / worker environment
function generateId() {
  return "prompt_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 9);
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...CORS_HEADERS,
    },
  });
}

// Convert D1 database row to PromptItem model
function formatRow(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    content: row.content,
    category: row.category,
    tags: safeJsonParse(row.tags, []),
    models: safeJsonParse(row.models, []),
    is_favorite: Boolean(row.is_favorite),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function safeJsonParse(val, fallback) {
  if (!val) return fallback;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

// Ensure the table exists
async function ensureTable(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS prompts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT NOT NULL DEFAULT '[]',
      models TEXT NOT NULL DEFAULT '[]',
      is_favorite INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `).run();
}

async function seedDatabase(db) {
  const now = new Date().toISOString();
  for (const item of SEED_PROMPTS) {
    await db.prepare(`
      INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      item.id,
      item.title,
      item.description || "",
      item.content,
      item.category,
      JSON.stringify(item.tags || []),
      JSON.stringify(item.models || []),
      item.is_favorite ? 1 : 0,
      item.created_at || now,
      item.updated_at || now
    ).run();
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Only intercept /api routes; all others are served by Cloudflare Static Assets
    if (!url.pathname.startsWith("/api/")) {
      if (env.ASSETS) {
        const assetRes = await env.ASSETS.fetch(request);
        const headers = new Headers(assetRes.headers);
        headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

        // Force fresh HTML so browsers and CDNs immediately see updated assets
        if (url.pathname === "/" || url.pathname.endsWith(".html") || !url.pathname.includes(".")) {
          headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
          headers.set("Pragma", "no-cache");
          headers.set("Expires", "0");
        } else if (url.pathname.startsWith("/assets/")) {
          headers.set("Cache-Control", "public, max-age=31536000, immutable");
        }

        return new Response(assetRes.body, {
          status: assetRes.status,
          statusText: assetRes.statusText,
          headers,
        });
      }
      return new Response("Not found", {
        status: 404,
        headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
      });
    }

    const db = env.DB;
    if (!db) {
      return jsonResponse({ error: "Cloudflare D1 binding (DB) is not configured" }, 503);
    }

    try {
      await ensureTable(db);

      // GET /api/prompts
      if (url.pathname === "/api/prompts" && request.method === "GET") {
        let result = await db.prepare(
          "SELECT * FROM prompts ORDER BY is_favorite DESC, updated_at DESC"
        ).all();

        // Auto-seed if database is currently empty
        if (!result.results || result.results.length === 0) {
          await seedDatabase(db);
          result = await db.prepare(
            "SELECT * FROM prompts ORDER BY is_favorite DESC, updated_at DESC"
          ).all();
        }

        const prompts = (result.results || []).map(formatRow);
        return jsonResponse(prompts);
      }

      // POST /api/prompts
      if (url.pathname === "/api/prompts" && request.method === "POST") {
        const body = await request.json();
        const { title, description, content, category, tags = [], models = [], is_favorite = false } = body;

        if (!title || !content || !category) {
          return jsonResponse({ error: "Título, contenido y categoría son obligatorios." }, 400);
        }

        const id = generateId();
        const now = new Date().toISOString();

        await db.prepare(`
          INSERT INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          id,
          title.trim(),
          (description || "").trim(),
          content,
          category,
          JSON.stringify(tags),
          JSON.stringify(models),
          is_favorite ? 1 : 0,
          now,
          now
        ).run();

        const created = await db.prepare("SELECT * FROM prompts WHERE id = ?").bind(id).first();
        return jsonResponse(formatRow(created), 201);
      }

      // PUT /api/prompts/:id
      const idMatch = url.pathname.match(/^\/api\/prompts\/([^/]+)$/);
      if (idMatch && request.method === "PUT") {
        const id = idMatch[1];
        const body = await request.json();
        const { title, description, content, category, tags, models, is_favorite } = body;

        const existing = await db.prepare("SELECT * FROM prompts WHERE id = ?").bind(id).first();
        if (!existing) {
          return jsonResponse({ error: "Prompt no encontrado." }, 404);
        }

        const now = new Date().toISOString();
        const updatedTitle = title !== undefined ? title.trim() : existing.title;
        const updatedDesc = description !== undefined ? description.trim() : existing.description;
        const updatedContent = content !== undefined ? content : existing.content;
        const updatedCategory = category !== undefined ? category : existing.category;
        const updatedTags = tags !== undefined ? JSON.stringify(tags) : existing.tags;
        const updatedModels = models !== undefined ? JSON.stringify(models) : existing.models;
        const updatedFav = is_favorite !== undefined ? (is_favorite ? 1 : 0) : existing.is_favorite;

        await db.prepare(`
          UPDATE prompts
          SET title = ?, description = ?, content = ?, category = ?, tags = ?, models = ?, is_favorite = ?, updated_at = ?
          WHERE id = ?
        `).bind(
          updatedTitle,
          updatedDesc,
          updatedContent,
          updatedCategory,
          updatedTags,
          updatedModels,
          updatedFav,
          now,
          id
        ).run();

        const updated = await db.prepare("SELECT * FROM prompts WHERE id = ?").bind(id).first();
        return jsonResponse(formatRow(updated));
      }

      // DELETE /api/prompts/:id
      if (idMatch && request.method === "DELETE") {
        const id = idMatch[1];
        await db.prepare("DELETE FROM prompts WHERE id = ?").bind(id).run();
        return jsonResponse({ success: true, id });
      }

      // POST /api/prompts/:id/favorite
      const favMatch = url.pathname.match(/^\/api\/prompts\/([^/]+)\/favorite$/);
      if (favMatch && request.method === "POST") {
        const id = favMatch[1];
        const existing = await db.prepare("SELECT is_favorite FROM prompts WHERE id = ?").bind(id).first();
        if (!existing) {
          return jsonResponse({ error: "Prompt no encontrado." }, 404);
        }

        const newFav = existing.is_favorite ? 0 : 1;
        const now = new Date().toISOString();

        await db.prepare("UPDATE prompts SET is_favorite = ?, updated_at = ? WHERE id = ?")
          .bind(newFav, now, id)
          .run();

        return jsonResponse({ id, is_favorite: Boolean(newFav) });
      }

      // POST /api/prompts/seed - Bulk import seed data if empty or forced
      if (url.pathname === "/api/prompts/seed" && request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        const { prompts: seedList = [], force = false } = body;

        const countResult = await db.prepare("SELECT COUNT(*) as total FROM prompts").first();
        if (!force && countResult && countResult.total > 0) {
          return jsonResponse({ message: "La base de datos ya contiene prompts.", total: countResult.total });
        }

        const now = new Date().toISOString();
        let inserted = 0;

        for (const item of seedList) {
          await db.prepare(`
            INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            item.id || generateId(),
            item.title,
            item.description || "",
            item.content,
            item.category,
            JSON.stringify(item.tags || []),
            JSON.stringify(item.models || []),
            item.is_favorite ? 1 : 0,
            item.created_at || now,
            item.updated_at || now
          ).run();
          inserted++;
        }

        return jsonResponse({ success: true, inserted });
      }

      // GET /api/export
      if (url.pathname === "/api/export" && request.method === "GET") {
        const result = await db.prepare(
          "SELECT * FROM prompts ORDER BY created_at ASC"
        ).all();

        const prompts = (result.results || []).map(formatRow);
        return jsonResponse({
          version: "1.0",
          exported_at: new Date().toISOString(),
          prompts,
        });
      }

      // POST /api/import
      if (url.pathname === "/api/import" && request.method === "POST") {
        const body = await request.json();
        const items = Array.isArray(body) ? body : (body.prompts || []);

        if (!Array.isArray(items) || items.length === 0) {
          return jsonResponse({ error: "Formato de importación inválido o lista vacía." }, 400);
        }

        const now = new Date().toISOString();
        let importedCount = 0;

        for (const item of items) {
          if (!item.title || !item.content) continue;
          await db.prepare(`
            INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            item.id || generateId(),
            item.title,
            item.description || "",
            item.content,
            item.category || "General",
            JSON.stringify(item.tags || []),
            JSON.stringify(item.models || []),
            item.is_favorite ? 1 : 0,
            item.created_at || now,
            now
          ).run();
          importedCount++;
        }

        return jsonResponse({ success: true, count: importedCount });
      }

      return jsonResponse({ error: "Endpoint no encontrado." }, 404);
    } catch (err) {
      console.error("Worker API Error:", err);
      return jsonResponse({ error: "Error en el servidor: " + (err.message || String(err)) }, 500);
    }
  },
};
