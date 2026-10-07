import { readFileSync, writeFileSync } from "node:fs";

export const TOOLKIT_PROMPTS = [
  {
    id: "seed-15-taste-skill-direccion",
    title: "Taste Skill — Dirección Estética y Vibe Anti-Plantilla",
    description: "Infiere la audiencia, el tono estético y los 3 diales (varianza, movimiento, densidad) antes de tirar una sola línea de código.",
    category: "Diseño Web IA",
    tags: ["taste-skill", "diseño-web", "anti-slop", "ui-ux", "frontend", "branding"],
    models: ["Claude 3.5 Sonnet", "Codex", "Gemini 1.5 Pro"],
    is_favorite: true,
    content: `Actúa como un Design Director de clase mundial especializado en interfaces de alto impacto visual y anti-slop.

Tu tarea es ejecutar la fase de **Brief Inference y Dirección Estética** para un nuevo proyecto web antes de generar código.

Contexto del proyecto:
- Tipo de sitio: {{tipo_sitio}}
- Audiencia objetivo: {{audiencia}}
- Vibe / Sensación deseada: {{tono_estetico}}
- Referencias de marcas o competidores: {{referencias_visuales}}

Sigue estas reglas estrictas:
1. **Design Read Obligatorio**: Comienza tu respuesta con una sola línea:
   "Reading this as: [tipo de página] para [audiencia], con un lenguaje [vibe], apoyado en [familia estética/sistema de diseño]."
2. **Configuración de los 3 Diales**:
   - DESIGN_VARIANCE (1 a 10): 1 = Simetría corporativa, 10 = Caos editorial/artístico.
   - MOTION_INTENSITY (1 a 10): 1 = Estático/sobrio, 10 = Físicas dinámicas/cinemáticas.
   - VISUAL_DENSITY (1 a 10): 1 = Espacioso/galería, 10 = Dashboard/cockpit.
3. **Anti-Default Discipline**: Queda estrictamente prohibido usar degradados púrpura genéricos, Inter por defecto, héroes centrados con mallas oscuras estándar o 3 tarjetas idénticas.
4. **Definición de Tokens**:
   - Paleta cromática exacta (Background primario, Surface, Accent con alto contraste y ratio WCAG > 4.5:1).
   - Pareja tipográfica (Titulares con carácter + Cuerpo de alta legibilidad).
   - Estructura de layout no convencional pero intuitiva.`,
  },
  {
    id: "seed-16-getdesign-brand-spec",
    title: "getdesign.md — Sistema de Tokens de Marcas de Élite",
    description: "Extrae o adapta las reglas de diseño (colores hex, tipografía, espaciado y bordes) de marcas globales de referencia (Stripe, Linear, Apple).",
    category: "Diseño Web IA",
    tags: ["getdesign", "design-tokens", "branding", "stripe", "linear", "apple"],
    models: ["Claude 3.5 Sonnet", "Codex"],
    is_favorite: true,
    content: `Actúa como un Lead Design Systems Engineer. Tu objetivo es generar una especificación estricta tipo \`DESIGN.md\` para el proyecto {{nombre_proyecto}}, tomando como referencia de clase mundial el lenguaje visual de {{marca_referencia}} (ej. Stripe, Linear, Apple, Vercel, Raycast).

Objetivo de la interfaz: {{objetivo_ui}}

Genera la especificación estructurada con el formato oficial de tokens para Tailwind CSS y CSS variables:
1. **Filosofía de Superficies y Luz**:
   - Comportamiento de fondos (Background profundo, bordes semi-transparentes de 1px, elevaciones limpias).
2. **Paleta Cromática Funcional**:
   - Hexadecimales exactos para text-primary, text-secondary, borders, background, accent-glow.
3. **Escala de Espaciado y Rejilla**:
   - Múltiplos de 4px / 8px exactos.
4. **Radios y Sombras**:
   - Border radius consistentes (\`rounded-xl\` para tarjetas, \`rounded-lg\` para botones, \`rounded-full\` para badges).
5. **Componentes Clave**:
   - Reglas de diseño para: Button (Default, Hover, Active press), Input con focus ring, Card con hover highlight.
6. **Configuración Tailwind v4 / CSS**:
   - Código directo listo para pegar en el archivo CSS global o tailwind config.`,
  },
  {
    id: "seed-17-uipro-component-architect",
    title: "UI/UX Pro Max — Arquitecto de Componentes Modernos",
    description: "Diseña componentes frontend de alta fidelidad: Bento Grids, tarjetas interactivas, estados hover y jerarquía limpia.",
    category: "Diseño Web IA",
    tags: ["uipro", "design-system", "bento-grid", "tailwind", "react", "components"],
    models: ["Claude 3.5 Sonnet", "GPT-4o", "Codex"],
    is_favorite: true,
    content: `Actúa como un Principal UI/UX Engineer utilizando el motor de conocimiento UI/UX Pro Max.

Diseña y codifica un componente production-ready para:
- Nombre / Tipo de componente: {{nombre_componente}}
- Estilo estético: {{estilo_ui}} (ej. Modern Dark Bento, Minimalist Neumorphic, Cyber-Industrial, Editorial SaaS)
- Stack técnico: {{stack_frontend}} (ej. React 19 + Tailwind CSS + Lucide Icons)
- Paleta o acento: {{paleta_color}}

Requisitos indispensables de diseño:
1. **Jerarquía Visual Inequívoca**: Títulos prominentes, subtítulos con contraste adecuado (#94a3b8), badges contextuales.
2. **Micro-Detalles de Borde y Fondo**: Bordes sutiles semi-transparentes (\`border-white/[0.08]\`), fondos oscuros texturizados (\`bg-[#0d111c]\`).
3. **Estados Interactivos**: Hover sutil con elevación de 1-2px, active press con \`scale-[0.98]\`, foco accesible con \`focus-visible:ring-2\`.
4. **Responsive Mobile-First**: Adaptación natural sin romper padding ni truncar textos críticos.
5. **Código Limpio**: Cero dependencias externas pesadas innecesarias.

Entrega el código completo del componente en TSX/JSX con tipos claros y comentarios mínimos solo donde sea necesario.`,
  },
  {
    id: "seed-18-emil-kowalski-motion",
    title: "Emil Kowalski — Micro-Interacciones y Físicas de Resorte",
    description: "Implementa animaciones que se sienten naturales: curvas ease-out, topes de 200-300ms, resortes y respeto a prefers-reduced-motion.",
    category: "Diseño Web IA",
    tags: ["emil-kowalski", "framer-motion", "animacion", "motion", "microinteracciones", "sonner"],
    models: ["Claude 3.5 Sonnet", "Codex"],
    is_favorite: true,
    content: `Actúa como un Senior Design Engineer entrenado en la escuela de interacción de Emil Kowalski (*Animations on the Web*).

Tu objetivo es animar o pulir la interacción de {{elemento_interactivo}} utilizando {{biblioteca_animacion}} (ej. Framer Motion, Motion One, o CSS transitions nativas).

Tipo de interacción deseada: {{tipo_interaccion}} (ej. Modal reveal, Dropdown menu, Card hover & tilt, Toast notification, Button press).

Reglas de oro que debes cumplir sin excepción:
1. **Curvas de Aceleración**: Entradas SIEMPRE en \`ease-out\` (o resorte amortiguado sin oscilaciones eternas), salidas en \`ease-in\`.
2. **Origen y Escala**: NUNCA escalar desde cero (\`scale(0)\`). Escalar desde \`scale(0.95)\` o \`scale(0.97)\` con \`opacity: 0\`. En el mundo real nada aparece de la nada.
3. **Techo de Duración**: Las transiciones funcionales deben durar entre **180ms y 300ms**. Nada de animaciones de 800ms que hagan sentir la app lenta.
4. **Feedback Táctil Inmediato**: Al presionar (\`:active\`), reducir escala a \`0.97\` o \`0.98\` con \`transition: transform 100ms ease-out\`.
5. **Accesibilidad Obligatoria**: Incluir soporte para \`@media (prefers-reduced-motion: reduce)\` desactivando transforms de desplazamiento.

Entrega:
- Tabla de diagnóstico Antes / Después si aplica.
- Código completo de la animación listo para producción.`,
  },
  {
    id: "seed-19-apple-design-hig",
    title: "Apple Design HIG — Ergonomía Táctil y Fluidez Nativa",
    description: "Audita y refactoriza interfaces web bajo las 17 directrices de Apple: áreas táctiles de 44px, feedback en pointerdown y jerarquía tipográfica.",
    category: "Diseño Web IA",
    tags: ["apple-design", "hig", "tactile-ui", "direct-manipulation", "ux", "ergonomia"],
    models: ["Claude 3.5 Sonnet", "Codex"],
    is_favorite: true,
    content: `Actúa como un Principal Apple Interface Designer aplicando las Human Interface Guidelines (HIG) de Apple traducidas a la web moderna.

Audita y eleva la calidad del siguiente componente o vista web:
- Elemento a auditar: {{interfaz_o_componente}}
- Código actual:
\`\`\`
{{codigo_actual}}
\`\`\`

Aplica rigurosamente los principios de Apple Design:
1. **Respuesta Inmediata al Tacto**: Feedback visual en \`pointerdown\`, no en el release o click. Latencia percibida = 0ms.
2. **Área Táctil Mínima (Tap Target)**: Todo botón, enlace o elemento interactivo debe tener al menos **44x44 px** de área de toque real en mobile.
3. **Tipografía y Legibilidad**: Escala tipográfica nítida (SF Pro / System fonts), tracking ajustado en titulares (\`tracking-tight\`), leading holgado en cuerpos.
4. **Materiales y Profundidad**: Fondos con desenfoque de cristal (\`backdrop-blur-xl\`, \`bg-black/60\` o \`bg-slate-900/80\`) con bordes interiores finos de luz.
5. **Direct Manipulation**: Gestos interrumpibles que sigan 1:1 el puntero o dedo del usuario.

Devuelve el código refactorizado con una explicación de las mejoras ergonómicas aplicadas.`,
  },
  {
    id: "seed-20-ponytail-zero-bloat",
    title: "Ponytail — Senior Dev Reducer & Zero-Bloat Code",
    description: "Elimina sobre-ingeniería, dependencias innecesarias y código verboso. Reduce líneas entre 50% y 80% usando APIs nativas de la plataforma.",
    category: "Desarrollo",
    tags: ["ponytail", "clean-code", "zero-bloat", "native-apis", "optimizacion", "yagni"],
    models: ["Claude 3.5 Sonnet", "Codex", "Gemini 1.5 Pro"],
    is_favorite: true,
    content: `Actúa como un Senior Staff Engineer bajo la disciplina "Ponytail: The Lazy Senior Dev".
Tu lema es: *"El código más rápido y con menos bugs es el que nunca se escribe"*.

Analiza el siguiente componente o módulo en {{lenguaje}}:
\`\`\`{{lenguaje}}
{{codigo_verboso}}
\`\`\`

Objetivo del módulo: {{objetivo_modulo}}

Ejecuta una reducción implacable de código aplicando estas directrices:
1. **¿Se necesita de verdad? (YAGNI)**: Elimina abstracciones prematuras, wrappers inútiles, estados locales redundantes y efectos secundarios (\`useEffect\`) innecesarios.
2. **Aprovecha la Plataforma Web**: Reemplaza librerías de 50KB por elementos y APIs nativas (\`<dialog>\`, \`<details>\`, \`Intl\`, \`URLSearchParams\`, CSS moderno \`:has()\`, \`@container\`, etc.).
3. **Mide la Reducción**: Indica exactamente el porcentaje de reducción de líneas logrado (meta: 40% a 70%).
4. **Cero Regresiones**: El código resultante debe mantener el 100% de la funcionalidad, con tipos estrictos y mucha mayor legibilidad.

Entrega el código simplificado listo para producción.`,
  },
  {
    id: "seed-21-impeccable-anti-slop",
    title: "Impeccable Design — Pulido Quirúrgico y Anti-Clichés de IA",
    description: "Detecta y elimina los 60+ anti-patrones clásicos de IA: sombras desfasadas, bordes inconsistentes, alineación óptica y contrastes pobres.",
    category: "Diseño Web IA",
    tags: ["impeccable", "craft", "polish", "anti-patrones", "layout", "visual-hierarchy"],
    models: ["Claude 3.5 Sonnet", "Codex"],
    is_favorite: true,
    content: `Actúa como un Design Director de élite ejecutando una auditoría quirúrgica de pulido \`Impeccable Craft\`.

Inspecciona este layout o pantalla:
- Vista: {{pantalla_o_vista}}
- Código actual:
\`\`\`
{{codigo_layout}}
\`\`\`

Pasa el filtro de los 60+ detectores de anti-patrones y calidad visual:
1. **Anti-AI Slop**:
   - Elimina gradientes genéricos morados/azules que no aportan identidad.
   - Corrige sombras flotantes desproporcionadas: reemplázalas por bordes con opacidades sutiles (\`border border-white/10\`) y elevaciones controladas.
   - Elimina tarjetas idénticas repetitivas: introduce asimetría deliberada o anchos diferenciados según la importancia del contenido.
2. **Jerarquía y Escala de Blancos**:
   - Asegura una escala clara de jerarquía de texto: 100% opacidad para títulos, 70-80% para descripción, 50-60% para metadatos/fechas.
3. **Alineación Óptica**:
   - Íconos alineados visualmente al centro de sus contenedores, paddings simétricos y consistentes.
4. **Densidad y Respiración**:
   - Espaciado suficiente entre secciones para evitar apiñamiento.

Devuelve:
1. Lista de defectos visuales o clichés corregidos (máximo 4 puntos).
2. Código pulido y perfeccionado.`,
  },
  {
    id: "seed-22-web-design-guidelines-vercel",
    title: "Web Design Guidelines — Auditoría Vercel Labs (WCAG & 8pt Grid)",
    description: "Audita el frontend contra las directrices de interfaz de Vercel: rejilla de 8pt, contraste WCAG AA 4.5:1, prevención de truncamiento y foco visible.",
    category: "Diseño Web IA",
    tags: ["web-guidelines", "vercel", "wcag", "a11y", "8pt-grid", "accesibilidad"],
    models: ["Claude 3.5 Sonnet", "Codex"],
    is_favorite: true,
    content: `Actúa como un Accessibility & Frontend Quality Engineer aplicando las Web Design Guidelines oficiales de Vercel Labs.

Audita el siguiente código de interfaz:
\`\`\`
{{codigo_a_auditar}}
\`\`\`

Evalúa estrictamente cada una de estas reglas:
1. **Rejilla de 8pt**: Todos los márgenes, paddings y espaciados deben seguir la escala de 4px / 8px (ej. 8, 12, 16, 24, 32, 48px).
2. **Contraste de Color (WCAG AA)**: El texto sobre fondo debe cumplir un ratio de contraste mínimo de **4.5:1** para texto normal y **3:1** para texto grande o elementos gráficos.
3. **Navegación por Teclado y Foco**: Los elementos interactivos deben contar con \`:focus-visible\` claramente visible (anillo de foco con offset), sin depender únicamente del ratón.
4. **Prevención de Truncamiento**: Nunca trunques datos críticos de usuario con \`truncate\` sin un tooltip o mecanismo accesible para ver el contenido completo.
5. **Etiquetas y Atributos ARIA**: Botones que solo tienen un ícono deben tener \`aria-label\` descriptivo.

Reporta los hallazgos en formato conciso:
- \`linea:problema\` -> \`corrección sugerida\`.
- Código final corregido y validado.`,
  },
  {
    id: "seed-23-scroll-world-cinematic",
    title: "Scroll World — Experiencia Inmersiva con Scroll-Scrubbing",
    description: "Diseña una narrativa cinemática estilo Apple Showcase donde el scroll del usuario viaja a través de dioramas o escenas 3D fluidas.",
    category: "Diseño Web IA",
    tags: ["scroll-world", "higgsfield", "scroll-driven", "cinematic", "landing-page", "3d"],
    models: ["Claude 3.5 Sonnet", "Codex"],
    is_favorite: false,
    content: `Actúa como un Creative Technologist experto en narrativa digital y experiencias inmersivas con el motor Scroll World.

Diseña la arquitectura técnica y la estructura de una landing cinemática de scroll-scrubbing para:
- Producto o historia: {{producto}}
- Escenas clave del recorrido: {{escenas_clave}}
- Mensaje o llamada a la acción principal: {{cta_final}}

Requisitos del diseño de la experiencia:
1. **Arquitectura del Canvas**: Contenedor con \`position: sticky\` en una pista de desplazamiento de varias alturas de viewport (\`h-[400vh]\`).
2. **Progresión Continua sin Cortes**: El progreso de desplazamiento (\`scrollProgress\` de 0.0 a 1.0) mapea interpolaciones suaves de cámara, rotación y revelación de textos.
3. **Superposiciones Editoriales**: Textos minimalistas de alto impacto que entran y salen en rangos específicos del scroll (ej. escena 1: 0.1-0.3, escena 2: 0.4-0.6).
4. **Degradación Elegante**: En dispositivos móviles con pantallas táctiles pequeñas o en navegadores con baja aceleración por hardware, prever un modo de lectura fluido.
5. **Rendimiento a 60 FPS**: Uso estricto de transformaciones aceleradas por GPU (\`translate3d\`, \`opacity\`, \`will-change: transform\`).

Entrega la implementación paso a paso con código React / HTML5 + CSS listo para integrar.`,
  },
  {
    id: "seed-24-playwright-e2e-tester",
    title: "Playwright — Suite Autónoma de Pruebas E2E y Enlaces",
    description: "Genera scripts automatizados con Playwright para rastrear links rotos, probar formularios, responsive y capturar errores de consola.",
    category: "Automatización",
    tags: ["playwright", "testing", "browser-automation", "e2e", "qa", "responsive"],
    models: ["Codex", "Claude 3.5 Sonnet"],
    is_favorite: true,
    content: `Actúa como un Principal QA Automation Engineer especializado en Playwright y Node.js.

Genera una suite completa de pruebas autónomas en TypeScript para el sitio web alojado en {{url_o_puerto_local}}.

La suite debe validar automáticamente:
1. **Rastreo de Enlaces Internos**: Visitar todos los \`<a href>\` de la página, comprobar que devuelven código HTTP 200 y que no existen enlaces vacíos o que apunten a \`#\`.
2. **Formularios y Validación**: Probar el formulario de {{nombre_formulario}} enviando datos inválidos (comprobar mensajes de error) y luego datos válidos (comprobar feedback de éxito).
3. **Consola Limpia**: Escuchar eventos \`page.on('console')\` y \`page.on('pageerror')\`, haciendo que el test falle si hay excepciones no controladas en JavaScript.
4. **Matriz Responsive**: Validar el renderizado en 3 viewports:
   - Móvil: 375x667 (iPhone SE)
   - Tablet: 768x1024 (iPad)
   - Desktop: 1440x900
5. **Capturas de Pantalla de Regresión**: Guardar screenshots de cada vista para comprobación visual.

Entrega el archivo \`tests/site-audit.spec.ts\` completo, ejecutable con \`npx playwright test\`.`,
  },
  {
    id: "seed-25-checklist-20-puntos-web",
    title: "Checklist de 20 Puntos Pre-Lanzamiento Web con IA",
    description: "Auditoría exhaustiva de 20 puntos críticos antes de desplegar cualquier web a producción: SEO, responsive, 404, consola limpia y Core Web Vitals.",
    category: "Diseño Web IA",
    tags: ["checklist", "pre-lanzamiento", "qa", "seo", "produccion", "auditoria", "web-vitals"],
    models: ["Claude 3.5 Sonnet", "GPT-4o", "Codex", "Gemini 1.5 Pro"],
    is_favorite: true,
    content: `Actúa como un Web Launch Director y Release Manager implacable. Tu labor es realizar la auditoría final previa a producción del siguiente sitio web.

- URL o entorno: {{url_o_codigo_proyecto}}
- Tipo de proyecto: {{tipo_sitio}}
- Stack técnico: {{stack_tecnologico}}

Audita exhaustivamente el proyecto punto por punto contra los **20 Puntos Mandatorios Pre-Lanzamiento**:

1. [ ] **404 Personalizada**: ¿Tiene diseño de marca y botón de regreso funcional?
2. [ ] **Diseño Responsive Total**: ¿Probado en 375px, 768px, 1024px y 1440px sin scroll horizontal involuntario?
3. [ ] **Enlaces Verificados**: ¿Cero links rotos o huérfanos apuntando a \`#\`?
4. [ ] **Validación de Formularios**: ¿Feedback visual claro, required fields y estados de error?
5. [ ] **Estados de Carga (Loading)**: ¿Skeletons o spinners sutiles en peticiones asíncronas?
6. [ ] **Manejo de Errores**: ¿Fallbacks amigables si la API falla?
7. [ ] **SEO Semántico**: ¿Jerarquía estricta (\`h1\` único, \`h2\`, \`h3\`, \`<nav>\`, \`<main>\`, \`<footer>\`)?
8. [ ] **Meta Description**: ¿Texto único de 150-160 caracteres optimizado?
9. [ ] **Títulos Únicos (\`<title>\`)**: ¿Formato \`Página | Marca\`?
10. [ ] **\`sitemap.xml\`**: ¿Existe y es accesible para motores de búsqueda?
11. [ ] **\`robots.txt\`**: ¿Configurado correctamente apuntando al sitemap?
12. [ ] **Alt Text en Imágenes**: ¿Textos descriptivos obligatorios en todas las imágenes?
13. [ ] **Open Graph Tags**: ¿\`og:title\`, \`og:description\`, \`og:image\` (1200x630px) y \`twitter:card\`?
14. [ ] **Favicon Completo**: ¿\`favicon.ico\`, \`favicon.svg\` y \`apple-touch-icon.png\`?
15. [ ] **HTTPS y Cabeceras**: ¿Certificado SSL y cabeceras de seguridad activas?
16. [ ] **Analytics Ligero**: ¿Telemetría configurada sin penalizar la velocidad de carga?
17. [ ] **Optimización de Imágenes**: ¿Formato WebP/AVIF con \`loading="lazy"\` bajo el pliegue?
18. [ ] **Accesibilidad (a11y)**: ¿Contraste mínimo 4.5:1 y navegación completa por teclado?
19. [ ] **Consola DevTools Limpia**: ¿Cero errores de JavaScript o warnings de React?
20. [ ] **Core Web Vitals**: ¿LCP < 2.5s, INP < 200ms y CLS < 0.1?

Entrega un informe en forma de semáforo (🟢 Aprobado / 🟡 Advertencia / 🔴 Bloqueante) con los cambios de código específicos para subsanar cada falla detectada.`,
  },
  {
    id: "seed-26-protocolo-arranque-web",
    title: "Protocolo de Arranque Colaborativo — Combo de Skills Web",
    description: "El prompt maestro para iniciar cualquier proyecto web: diagnostica el modo (Persuade, Operate, Read, Experience) y propone un combo de 2 a 4 herramientas antes de codificar.",
    category: "Diseño Web IA",
    tags: ["protocolo-arranque", "planificacion", "briefing", "combos-skills", "anti-slop"],
    models: ["Claude 3.5 Sonnet", "Codex", "Gemini 1.5 Pro"],
    is_favorite: true,
    content: `Actúa como mi Lead Web AI Architect y compañero de pair programming.
Vamos a comenzar a desarrollar un nuevo sitio web o landing page.

Brief inicial del proyecto:
- Idea / Propósito: {{idea_del_proyecto}}
- Audiencia o cliente: {{audiencia}}
- Objetivo de conversión o acción clave: {{objetivo_clave}}

Antes de escribir una sola línea de código, sigue este protocolo obligatorio:
1. **Diagnóstico del Modo de Superficie**: Identifica cuál de los 4 modos aplica:
   - *Persuade*: Landing page, marketing, pricing (el diseño es el producto).
   - *Operate*: App web, dashboard, herramienta interna (la usabilidad y la velocidad priman).
   - *Read*: Documentación, blog, guías de conocimiento (la tipografía y la legibilidad mandan).
   - *Experience*: Portafolio, showcase inmersivo (la interfaz retrocede ante la obra).
2. **Propuesta Activa del Combo de Herramientas**: Proponme un combo equilibrado de 2 a 4 herramientas de nuestro kit:
   - *Dirección*: ¿\`taste-skill\` minimalista o \`getdesign\` emulando Stripe/Linear?
   - *Componentes*: ¿\`uipro-cli\` con Bento Grid o 21st.dev con micro-animaciones?
   - *Filtro de Código*: ¿Activamos \`ponytail\` para mantener el código en menos de 200 líneas?
   - *Auditoría*: ¿\`web-design-guidelines\` de Vercel + checklist de 20 puntos?
3. **Pregunta de Alineación**: Hazme exactamente UNA pregunta concreta para validar el combo antes de proceder a la arquitectura.`,
  },
];

async function main() {
  const { SEED_PROMPTS: existingSeeds } = await import("../seeds.js");
  const existingIds = new Set(existingSeeds.map((p) => p.id));
  
  const toAdd = TOOLKIT_PROMPTS.filter((p) => !existingIds.has(p.id)).map((p) => ({
    ...p,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  if (toAdd.length === 0) {
    console.log("No new prompts to add; all IDs already present.");
    return;
  }

  const combined = [...existingSeeds, ...toAdd];

  // Write seeds.js
  const seedsJsContent = `export const SEED_PROMPTS = ${JSON.stringify(combined, null, 2)};\n`;
  writeFileSync("seeds.js", seedsJsContent, "utf8");
  console.log(`Updated seeds.js with ${combined.length} prompts.`);

  // Write src/lib/seedData.ts
  const seedDataTsContent = `import { PromptItem } from "../types";\n\nexport const SEED_PROMPTS: PromptItem[] = ${JSON.stringify(combined, null, 2)};\n`;
  writeFileSync("src/lib/seedData.ts", seedDataTsContent, "utf8");
  console.log(`Updated src/lib/seedData.ts with ${combined.length} prompts.`);

  // Run generate-seed-sql.mjs logic
  const now = new Date().toISOString();
  let sql = "";
  for (const p of combined) {
    const esc = (s) => (s ? String(s).replace(/'/g, "''") : "");
    sql += `INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('${esc(p.id)}', '${esc(p.title)}', '${esc(p.description)}', '${esc(p.content)}', '${esc(p.category)}', '${esc(JSON.stringify(p.tags || []))}', '${esc(JSON.stringify(p.models || []))}', ${p.is_favorite ? 1 : 0}, '${esc(p.created_at || now)}', '${esc(now)}');\n`;
  }
  writeFileSync("migrations/seed_data.sql", sql, "utf8");
  console.log(`Updated migrations/seed_data.sql with ${combined.length} prompts.`);
}

main().catch(console.error);
