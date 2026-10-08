import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import worker from "../worker.js";

const bundled = await build({ entryPoints: ["src/lib/api.ts"], bundle: true, write: false, format: "esm", platform: "browser" });
const { promptApi } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString("base64")}`);

test("ningún endpoint antiguo accede a datos ni activos, incluso si existe el binding", async () => {
  const env = new Proxy({}, { get() { throw new Error("Acceso a recursos privados"); } });
  for (const path of ["/api", "/api/prompts", "/api/export", "/api/import", "/api/prompts/seed", "/api/prompts/private-id", "/api/prompts/private-id/favorite"]) {
    for (const method of ["GET", "POST", "PUT", "DELETE", "OPTIONS"]) {
      const response = await worker.fetch(new Request(`https://example.com${path}`, { method }), env);
      assert.equal(response.status, 404, `${method} ${path}`);
      assert.equal(response.headers.get("Cache-Control"), "no-store");
      assert.deepEqual(await response.json(), { error: "Endpoint no disponible en la edición pública." });
    }
  }
});

test("el manual sigue siendo servido como activo estático", async () => {
  const response = await worker.fetch(new Request("https://example.com/manual"), {
    ASSETS: { fetch: async () => new Response("manual público", { headers: { "Content-Type": "text/html" } }) },
  });
  assert.equal(await response.text(), "manual público");
  assert.match(response.headers.get("Cache-Control"), /no-store/);
});

test("colección aislada: CRUD, favoritos e importación sin red ni datos heredados", async () => {
  const originalFetch = globalThis.fetch;
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const legacyKey = "dannieldev_prompts_vault_v1";
  const legacy = JSON.stringify([{ id: "private-fixture", title: "Privado", content: "No publicar" }]);
  const storage = new Map([[legacyKey, legacy]]);
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } });
  globalThis.fetch = () => { throw new Error("No se permiten peticiones de red"); };
  try {
    const initial = await promptApi.getAllPrompts();
    assert.equal(initial.length, 25);
    assert.ok(!initial.some((p) => p.id === "private-fixture"));
    const created = await promptApi.createPrompt({ title: "Prueba", description: "Local", content: "Solo navegador", category: "General", tags: [], models: [] });
    await promptApi.updatePrompt(created.id, { content: "Editado" });
    assert.equal(await promptApi.toggleFavorite(created.id), true);
    assert.equal((await promptApi.getAllPrompts()).find((p) => p.id === created.id).content, "Editado");
    await promptApi.importData([{ ...created, id: "import-fixture" }]);
    assert.ok((await promptApi.getAllPrompts()).some((p) => p.id === "import-fixture"));
    await promptApi.deletePrompt(created.id);
    assert.ok(!(await promptApi.getAllPrompts()).some((p) => p.id === created.id));
    assert.equal(storage.get(legacyKey), legacy);
    storage.set("prompts_celebres_public_v1", "[]");
    assert.deepEqual(await promptApi.getAllPrompts(), []);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else delete globalThis.localStorage;
  }
});
