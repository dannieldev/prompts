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

test("la subpágina de valor comercial es servida como activo estático", async () => {
  const response = await worker.fetch(new Request("https://example.com/valor"), {
    ASSETS: { fetch: async () => new Response("valor público", { headers: { "Content-Type": "text/html" } }) },
  });
  assert.equal(await response.text(), "valor público");
  assert.match(response.headers.get("Cache-Control"), /no-store/);
});

test("colección aislada: catálogo base inmutable, favoritos e importación sin red ni datos heredados", async () => {
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
    assert.equal(promptApi.updatePrompt, undefined);
    assert.equal(promptApi.deletePrompt, undefined);

    const firstSeed = initial[0];
    const created = await promptApi.createPrompt({ title: "Prueba", description: "Local", content: "Solo navegador", category: "General", tags: [], models: [] });
    assert.equal(await promptApi.toggleFavorite(created.id), true);

    // Intentar sobrescribir un prompt base vía importData no debe alterar su título ni contenido
    await promptApi.importData([
      { ...firstSeed, title: "Intento de edición", content: "Contenido alterado" },
      { ...created, id: "import-fixture" },
    ]);
    const afterImport = await promptApi.getAllPrompts();
    assert.ok(afterImport.some((p) => p.id === "import-fixture"));
    const seedAfterImport = afterImport.find((p) => p.id === firstSeed.id);
    assert.equal(seedAfterImport.title, firstSeed.title);
    assert.equal(seedAfterImport.content, firstSeed.content);

    // Incluso si localStorage se vacía o altera manualmente, los 25 prompts por defecto vuelven intactos
    storage.set("prompts_celebres_public_v1", JSON.stringify([{ ...firstSeed, title: "Modificado", content: "Modificado" }]));
    const restored = await promptApi.getAllPrompts();
    assert.equal(restored.length, 25);
    assert.equal(restored.find((p) => p.id === firstSeed.id).title, firstSeed.title);
    assert.equal(restored.find((p) => p.id === firstSeed.id).content, firstSeed.content);

    storage.set("prompts_celebres_public_v1", "[]");
    assert.equal((await promptApi.getAllPrompts()).length, 25);

    // Si localStorage contiene JSON corrupto o no-arreglo, recupera automáticamente los 25 prompts base
    storage.set("prompts_celebres_public_v1", "{json-corrupto");
    assert.equal((await promptApi.getAllPrompts()).length, 25);
    storage.set("prompts_celebres_public_v1", "{}");
    assert.equal((await promptApi.getAllPrompts()).length, 25);

    assert.equal(storage.get(legacyKey), legacy);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else delete globalThis.localStorage;
  }
});

test("interfaz sin edición ni borrado persistente ni restaurar seeds; edición solo temporal en pop-up y variables preservan estructura", async () => {
  const { readFileSync } = await import("node:fs");
  const exportModal = readFileSync("src/components/ExportImportModal.tsx", "utf8");
  const promptCard = readFileSync("src/components/PromptCard.tsx", "utf8");
  const detailModal = readFileSync("src/components/PromptDetailModal.tsx", "utf8");
  const variableModal = readFileSync("src/components/VariableModal.tsx", "utf8");

  assert.ok(!exportModal.includes("Restaurar Seeds Maestros"));
  assert.ok(!exportModal.includes("Cargar Seeds"));
  assert.ok(!promptCard.includes("onEdit"));
  assert.ok(!promptCard.includes("onDelete"));
  assert.ok(!detailModal.includes("onEdit"));
  assert.match(detailModal, /no se guardan cambios/i);
  assert.match(detailModal, /<textarea/);
  assert.match(variableModal, /no se guardan cambios/i);
  assert.match(variableModal, /<textarea[\s\S]*id="variable-live-editor"/);

  const varBundle = await build({ entryPoints: ["src/lib/variableUtils.ts"], bundle: true, write: false, format: "esm", platform: "browser" });
  const { replaceVariables } = await import(`data:text/javascript;base64,${Buffer.from(varBundle.outputFiles[0].text).toString("base64")}`);
  assert.equal(
    replaceVariables("Experto en {{lenguaje}} y {{arquitectura}}", { lenguaje: "", arquitectura: "Clean" }),
    "Experto en {{lenguaje}} y Clean"
  );
});
