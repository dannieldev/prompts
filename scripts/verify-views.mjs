import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const distDir = path.resolve("dist");
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
};

// 1. Static server with SPA fallback
const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0].split("#")[0];
  let filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA fallback
    const indexPath = path.join(distDir, "index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(indexPath).pipe(res);
  }
});

const PORT = 3847;
await new Promise((resolve) => server.listen(PORT, resolve));
console.log(`Servidor de prueba SPA escuchando en http://127.0.0.1:${PORT}`);

// 2. Launch Google Chrome headless
const chromeBin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const chromeProcess = spawn(chromeBin, [
  "--headless=new",
  "--remote-debugging-port=9333",
  "--no-first-run",
  "--no-default-browser-check",
  "--user-data-dir=/tmp/chrome-prompts-verify-" + Date.now(),
  "about:blank",
]);

await new Promise((r) => setTimeout(r, 1200));

try {
  // Query CDP version
  const versionRes = await fetch("http://127.0.0.1:9333/json/version");
  const versionData = await versionRes.json();
  const wsUrl = versionData.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let msgId = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    const id = msgId++;
    return new Promise((resolve) => {
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Create new target for our test
  const newTarget = await send("Target.createTarget", { url: `http://127.0.0.1:${PORT}/` });
  const targetId = newTarget.result.targetId;
  const attachRes = await send("Target.attachToTarget", { targetId, flatten: true });
  const sessionId = attachRes.result.sessionId;

  function sendSession(method, params = {}) {
    const id = msgId++;
    return new Promise((resolve) => {
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, sessionId, method, params }));
    });
  }

  await sendSession("Page.enable");
  await sendSession("Runtime.enable");

  async function evaluate(expression) {
    const res = await sendSession("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.result?.exceptionDetails) {
      throw new Error(`Evaluación fallida: ${JSON.stringify(res.result.exceptionDetails)}`);
    }
    return res.result?.result?.value;
  }

  console.log("Navegando a la biblioteca (/) en 1440px...");
  await sendSession("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await sendSession("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
  await new Promise((r) => setTimeout(r, 1000));

  let homeTitle = await evaluate("document.title");
  console.log("Título en /:", homeTitle);

  // Click on the new tab "Por qué $1k+"
  console.log("Haciendo clic en la pestaña 'Por qué $1k+'...");
  await evaluate(`(() => {
    const link = document.querySelector('a[href="/valor"]');
    if (!link) throw new Error("No se encontró el enlace /valor en el nav");
    link.click();
  })()`);
  await new Promise((r) => setTimeout(r, 600));

  let valorTitle = await evaluate("document.title");
  let valorUrl = await evaluate("window.location.pathname");
  let headingText = await evaluate("document.querySelector('h1')?.innerText");
  console.log("URL activa:", valorUrl);
  console.log("Título en /valor:", valorTitle);
  console.log("H1 en /valor:", headingText);

  if (valorUrl !== "/valor") throw new Error(`URL esperada /valor pero fue ${valorUrl}`);
  if (!valorTitle.includes("Por qué un sitio web")) throw new Error(`Título inesperado: ${valorTitle}`);

  // Test responsive viewports for horizontal overflow
  const viewports = [
    { name: "Desktop (1440px)", width: 1440, height: 900, mobile: false },
    { name: "Tablet (768px)", width: 768, height: 1024, mobile: true },
    { name: "Mobile iPhone (375px)", width: 375, height: 667, mobile: true },
    { name: "Mobile Ultra-estrecho (320px)", width: 320, height: 568, mobile: true },
  ];

  for (const vp of viewports) {
    console.log(`\nVerificando viewport: ${vp.name}...`);
    await sendSession("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.mobile,
    });
    await new Promise((r) => setTimeout(r, 400));

    const metrics = await evaluate(`(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      const bodyClientWidth = document.body.clientWidth;
      const navLinks = Array.from(document.querySelectorAll('.primary-nav a')).map(a => ({
        text: a.innerText.trim(),
        width: a.getBoundingClientRect().width,
        height: a.getBoundingClientRect().height
      }));
      return {
        scrollWidth,
        clientWidth,
        bodyScrollWidth,
        bodyClientWidth,
        hasHorizontalOverflow: scrollWidth > clientWidth,
        navLinks
      };
    })()`);

    console.log(`  clientWidth: ${metrics.clientWidth}px, scrollWidth: ${metrics.scrollWidth}px`);
    console.log(`  Enlaces de navegación encontrados:`, metrics.navLinks.map(l => `${l.text} (${Math.round(l.width)}x${Math.round(l.height)}px)`).join(", "));

    if (metrics.hasHorizontalOverflow) {
      throw new Error(`¡Desbordamiento horizontal detectado en ${vp.name}! scrollWidth (${metrics.scrollWidth}) > clientWidth (${metrics.clientWidth})`);
    }

    // Verify touch target height >= 44px
    for (const link of metrics.navLinks) {
      if (link.height < 43) {
        throw new Error(`Enlace táctil demasiado pequeño en ${vp.name}: ${link.text} tiene altura ${link.height}px`);
      }
    }
  }

  // Direct load of deep route /por-que-no-es-barato
  console.log("\nVerificando carga directa de alias /por-que-no-es-barato...");
  await sendSession("Page.navigate", { url: `http://127.0.0.1:${PORT}/por-que-no-es-barato` });
  await new Promise((r) => setTimeout(r, 800));
  let aliasHeading = await evaluate("document.querySelector('h1')?.innerText");
  console.log("H1 en /por-que-no-es-barato:", aliasHeading);
  if (!aliasHeading || !aliasHeading.includes("Por qué un sitio web")) {
    throw new Error("Alias /por-que-no-es-barato no renderizó la página de valor");
  }

  // Test interactive checklist toggle
  console.log("\nProbando interacción con checklist de valor...");
  const checklistResult = await evaluate(`(() => {
    const checkbox = document.querySelector('input[type="checkbox"]');
    if (!checkbox) throw new Error("No se encontró checkbox del checklist");
    const wasChecked = checkbox.checked;
    checkbox.click();
    return { wasChecked, isNowChecked: checkbox.checked, savedStorage: localStorage.getItem('dannieldev_web_value_checklist_v1') };
  })()`);
  console.log("Checklist antes:", checklistResult.wasChecked, "-> después:", checklistResult.isNowChecked);
  if (!checklistResult.isNowChecked) throw new Error("El checklist no respondió al clic");
  if (!checklistResult.savedStorage) throw new Error("El estado del checklist no se guardó en localStorage");

  console.log("\n✅ ¡Todas las verificaciones de Playwright / Headless Chrome pasaron exitosamente!");

  ws.close();
} finally {
  chromeProcess.kill("SIGKILL");
  server.close();
}
