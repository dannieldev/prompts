import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Layers,
  Terminal,
  Palette,
  Zap,
  Eye,
  Scissors,
  ShieldCheck,
  CheckCircle2,
  Cloud,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  ChevronRight,
  Code2,
  ArrowUpRight,
  Compass,
  ExternalLink,
} from "lucide-react";

interface ManualPageProps {
  onNavigateToPrompts: () => void;
  onSelectPrompt?: (promptId: string) => void;
  onAddToast: (text: string, type?: "success" | "error" | "info") => void;
}

interface ChecklistItem {
  id: number;
  category: "UX/UI" | "SEO" | "Performance" | "Seguridad" | "Calidad";
  text: string;
  checked: boolean;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 1, category: "UX/UI", text: "Página 404 personalizada con diseño de marca y botón de retorno al Home", checked: false },
  { id: 2, category: "UX/UI", text: "Diseño Responsive total probado en 375px (iPhone), 768px (iPad) y 1440px (Desktop)", checked: false },
  { id: 3, category: "Calidad", text: "Enlaces verificados: 0 enlaces rotos o huérfanos apuntando a '#'", checked: false },
  { id: 4, category: "UX/UI", text: "Validación de formularios con mensajes de error visuales y feedback de envío", checked: false },
  { id: 5, category: "Performance", text: "Loading states (skeletons o spinners sutiles) en peticiones asíncronas", checked: false },
  { id: 6, category: "Calidad", text: "Manejo amigable de errores si una API o servicio externo falla", checked: false },
  { id: 7, category: "SEO", text: "SEO semántico estricto (h1 único, h2, h3, nav, main, article, footer)", checked: false },
  { id: 8, category: "SEO", text: "Meta description única (150-160 caracteres) optimizada en cada vista", checked: false },
  { id: 9, category: "SEO", text: "Títulos únicos en formato 'Página | Marca' (<title>)", checked: false },
  { id: 10, category: "SEO", text: "sitemap.xml accesible en la raíz para indexación de Google", checked: false },
  { id: 11, category: "SEO", text: "robots.txt configurado apuntando al sitemap oficial", checked: false },
  { id: 12, category: "SEO", text: "Alt text descriptivo obligatorio en todas las imágenes", checked: false },
  { id: 13, category: "SEO", text: "Open Graph Tags completos (og:title, og:description, og:image 1200x630, twitter:card)", checked: false },
  { id: 14, category: "UX/UI", text: "Favicon set completo: favicon.ico, favicon.svg y apple-touch-icon.png", checked: false },
  { id: 15, category: "Seguridad", text: "HTTPS forzado con cabeceras de seguridad activas (HSTS, nosniff)", checked: false },
  { id: 16, category: "Performance", text: "Si el proyecto necesita analítica, configurarla sin exponer datos personales ni ralentizar la página", checked: false },
  { id: 17, category: "Performance", text: "Optimización de imágenes en WebP o AVIF con loading='lazy' bajo el pliegue", checked: false },
  { id: 18, category: "UX/UI", text: "Accesibilidad (a11y): Contraste mínimo 4.5:1 y navegación completa por teclado (focus-visible)", checked: false },
  { id: 19, category: "Calidad", text: "Consola de DevTools limpia sin excepciones no controladas de JavaScript ni warnings", checked: false },
  { id: 20, category: "Performance", text: "Core Web Vitals en verde: LCP < 2.5s, INP < 200ms y CLS < 0.1", checked: false },
];

interface NavSection {
  id: string;
  title: string;
  group: string;
  icon: React.ReactNode;
}

const SECTIONS: NavSection[] = [
  { id: "filosofia", title: "1. Diseñar con criterio", group: "Estrategia y dirección", icon: <Sparkles className="w-4 h-4 text-accent" /> },
  { id: "fases", title: "2. Flujo en 7 fases", group: "Estrategia y dirección", icon: <Layers className="w-4 h-4 text-accent" /> },
  { id: "inspiracion", title: "3. Referencias visuales", group: "Estrategia y dirección", icon: <Compass className="w-4 h-4 text-accent" /> },
  { id: "herramientas", title: "4. Catálogo de skills", group: "Herramientas y diseño", icon: <Terminal className="w-4 h-4 text-accent" /> },
  { id: "design-spec", title: "5. Tokens y DESIGN.md", group: "Herramientas y diseño", icon: <Palette className="w-4 h-4 text-accent" /> },
  { id: "emil-motion", title: "6. Animación y movimiento", group: "Interacción y código", icon: <Zap className="w-4 h-4 text-accent" /> },
  { id: "apple-hig", title: "7. Ergonomía y Apple HIG", group: "Interacción y código", icon: <Eye className="w-4 h-4 text-accent" /> },
  { id: "ponytail", title: "8. Código simple con Ponytail", group: "Interacción y código", icon: <Scissors className="w-4 h-4 text-accent" /> },
  { id: "impeccable", title: "9. Pulido y accesibilidad", group: "Interacción y código", icon: <ShieldCheck className="w-4 h-4 text-accent" /> },
  { id: "playwright", title: "10. Pruebas con Playwright", group: "Revisión y publicación", icon: <Code2 className="w-4 h-4 text-accent" /> },
  { id: "checklist", title: "11. Checklist de 20 puntos", group: "Revisión y publicación", icon: <CheckCircle2 className="w-4 h-4 text-accent" /> },
  { id: "deploy", title: "12. Entrega y publicación", group: "Revisión y publicación", icon: <Cloud className="w-4 h-4 text-accent" /> },
];

export const ManualPage: React.FC<ManualPageProps> = ({
  onNavigateToPrompts,
  onSelectPrompt,
  onAddToast,
}) => {
  const readChapter = () => SECTIONS.find((section) => section.id === window.location.hash.slice(1))?.id || "filosofia";
  const [activeAnchor, setActiveAnchor] = useState(readChapter);
  const [readAll, setReadAll] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const readingRef = useRef<HTMLElement>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [checklistFilter, setChecklistFilter] = useState<"todos" | "pendientes" | "completados">("todos");

  // Load checklist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dannieldev_web_checklist_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setChecklist(INITIAL_CHECKLIST.map((item) => ({
          ...item, checked: parsed.some((entry) => entry?.id === item.id && entry.checked === true),
        })));
      }
    } catch {}
  }, []);

  useEffect(() => {
    const syncChapter = () => { setActiveAnchor(readChapter()); setIndexOpen(false); };
    window.addEventListener("hashchange", syncChapter);
    window.addEventListener("popstate", syncChapter);
    return () => {
      window.removeEventListener("hashchange", syncChapter);
      window.removeEventListener("popstate", syncChapter);
    };
  }, []);

  useEffect(() => {
    document.title = `${SECTIONS.find((section) => section.id === activeAnchor)?.title} | Manual web`;
  }, [activeAnchor]);

  const toggleChecklistItem = (id: number) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setChecklist(updated);
    try {
      localStorage.setItem("dannieldev_web_checklist_v1", JSON.stringify(updated));
    } catch {}
  };

  const resetChecklist = () => {
    if (window.confirm("¿Deseas reiniciar todas las casillas del checklist?")) {
      setChecklist(INITIAL_CHECKLIST);
      try {
        localStorage.removeItem("dannieldev_web_checklist_v1");
      } catch {}
      onAddToast("Checklist reiniciado", "info");
    }
  };

  const handleCopyCode = async (text: string, id: string) => {
    try { await navigator.clipboard.writeText(text); }
    catch { onAddToast("No se pudo copiar. Selecciona el código y cópialo manualmente.", "error"); return; }
    setCopiedCodeId(id);
    onAddToast("Código copiado al portapapeles", "success");
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const scrollToSection = (id: string) => {
    setActiveAnchor(id);
    setIndexOpen(false);
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `/manual#${id}`);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ block: "start", behavior: "instant" });
      target?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
    });
  };

  const chapterLink = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    scrollToSection(id);
  };
  const activeIndex = SECTIONS.findIndex((section) => section.id === activeAnchor);

  const checkedCount = checklist.filter((i) => i.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  const filteredChecklist = checklist.filter((item) => {
    if (checklistFilter === "pendientes") return !item.checked;
    if (checklistFilter === "completados") return item.checked;
    return true;
  });

  return (
    <div className="manual-page">
      <div className="manual-intro page-width">
        <div>
          <h1>Manual de creación web con IA</h1>
          <p>De la idea al lanzamiento. Una guía para diseñar con criterio, construir y revisar tu web.</p>
        </div>
        <a className="quiet-button" href="/manual#checklist" onClick={(event) => chapterLink(event, "checklist")}>
          <CheckCircle2 size={18} aria-hidden="true" />Checklist · {checkedCount}/20
        </a>
      </div>
      <div className="manual-layout page-width">
        <aside className="manual-sidebar">
          <button className="chapter-menu-button" aria-expanded={indexOpen} aria-controls="manual-index" onClick={() => setIndexOpen(!indexOpen)}>
            <span>Capítulos del manual</span><ChevronRight size={18} className={indexOpen ? "rotate-90" : ""} aria-hidden="true" />
          </button>
          <nav id="manual-index" className={indexOpen ? "chapter-index is-open" : "chapter-index"} aria-label="Capítulos del manual">
            <p className="index-title">En este manual <span>{SECTIONS.length} capítulos</span></p>
            {Array.from(new Set(SECTIONS.map((section) => section.group))).map((group) => <div className="chapter-group" key={group}>
              <h2>{group}</h2>
              {SECTIONS.filter((section) => section.group === group).map((section) => <a key={section.id} href={`/manual#${section.id}`} aria-current={activeAnchor === section.id ? "step" : undefined} onClick={(event) => chapterLink(event, section.id)}>{section.title}</a>)}
            </div>)}
            <div className="sidebar-progress">
              <span>Tu checklist <strong>{checkedCount} de 20</strong></span>
              <progress max="20" value={checkedCount} aria-label="Progreso del checklist" />
              <a href="/manual#checklist" onClick={(event) => chapterLink(event, "checklist")}>Continuar revisión <ChevronRight size={16} aria-hidden="true" /></a>
            </div>
          </nav>
        </aside>
        <main id="main-content" ref={readingRef} className="manual-reading" tabIndex={-1}>
          <div className="reading-toolbar">
            <span>{readAll ? "Manual completo" : `Capítulo ${activeIndex + 1} de ${SECTIONS.length}`}</span>
            <button className="text-button" aria-pressed={readAll} onClick={() => setReadAll(!readAll)}>{readAll ? "Leer por capítulos" : "Ver todo el manual"}</button>
          </div>
          {/* SECTION 1: FILOSOFÍA ANTI-SLOP */}
          <section hidden={!readAll && activeAnchor !== "filosofia"} id="filosofia" className="scroll-mt-24 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Capítulo 1 · Principio Rector</span>
              </div>
              {onSelectPrompt && (
                <button
                  onClick={() => onSelectPrompt("seed-26-protocolo-arranque-web")}
                  className="text-sm font-semibold text-accent hover:text-accent flex items-center gap-1"
                >
                  <span>Abrir Prompt de Arranque</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Criterio sobre Generación: La Muerte del "AI Slop"
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                La Inteligencia Artificial no diseña mal por falta de capacidad técnica, sino por{" "}
                <strong>ausencia de restricciones explícitas, referencias reales del mundo profesional y reglas de diseño rigurosas</strong>.
                Cuando a un modelo le dices simplemente <em>"créame una landing bonita"</em>, recurre al promedio
                aritmético de su entrenamiento, generando interfaces clónicas.
              </p>
            </div>

            {/* Distributed Comparison Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-xl bg-surface-secondary border border-rose-500/25 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-accent font-semibold text-sm flex items-center gap-2">
                    <span>❌ Lo que hace la IA por defecto</span>
                  </h3>
                  <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-accent">
                    AI Slop
                  </span>
                </div>
                <ul className="text-sm text-accent space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li>Degradados violetas y púrpuras saturados idénticos en todas las páginas.</li>
                  <li>Héroe centrado con texto gigante e ilegible sobre mallas oscuras estándar.</li>
                  <li>Tres tarjetas flotantes de idéntico tamaño sin jerarquía de contenido ni pesos.</li>
                  <li>Uso automático de Roboto o Inter sin emparejamientos con carácter tipográfico.</li>
                  <li>Animaciones lentas de 600–800ms que hacen sentir la interfaz pesada e hinchada.</li>
                  <li>Enlaces a <code>#</code> que no van a ningún lado y formularios sin feedback.</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-surface-secondary border border-emerald-500/25 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-accent font-semibold text-sm flex items-center gap-2">
                    <span>✅ El Estándar Senior Anti-Genérico</span>
                  </h3>
                  <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-accent">
                    Clase Mundial
                  </span>
                </div>
                <ul className="text-sm text-accent space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li>Brief inferido y 3 diales calibrados (Varianza, Movimiento y Densidad).</li>
                  <li>Tokens reales de marcas de élite definidos en un archivo <code>DESIGN.md</code>.</li>
                  <li>Bento Grids asimétricos, jerarquía visual clara y micro-bordes elegantes (<code>border-border/80</code>).</li>
                  <li>Físicas de resorte de 180–250ms con retroalimentación háptica inmediata en <code>:active</code>.</li>
                  <li>Botones con área táctil mínima de 44px (Apple HIG) y contraste WCAG 4.5:1.</li>
                  <li>Verificación autónoma con Playwright y 0 librerías innecesarias (Ponytail).</li>
                </ul>
              </div>
            </div>

            {/* Protocol Callout Card */}
            <div className="p-6 rounded-xl bg-surface border border-border/80 space-y-3 ">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Sliders className="w-4 h-4" />
                <span>Protocolo de inicio del proyecto</span>
              </div>
              <p className="text-sm sm:text-sm text-muted leading-relaxed">
                Al arrancar cualquier sitio web o landing page, el agente <strong>no codifica a ciegas</strong>.
                Primero saluda, diagnostica el modo de superficie (<em>Persuade, Operate, Read o Experience</em>)
                y propone a la persona responsable un combo específico de 2 a 4 herramientas (referencia visual + sistema de componentes + filtro de animación/código)
                para validar la dirección antes de tocar una sola línea de código.
              </p>
            </div>
          </section>

          {/* SECTION 2: FLUJO EN 7 FASES */}
          <section hidden={!readAll && activeAnchor !== "fases"} id="fases" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Layers className="w-4 h-4" />
                <span>Capítulo 2 · Metodología de Ejecución</span>
              </div>
              <span className="text-sm font-mono text-muted">Orden Lineal Estricto</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                El Flujo Maestro de 7 Fases
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Todo proyecto web construido con IA debe transitar por estas 7 etapas sin saltarse pasos.
                La calidad del resultado final depende de consolidar cada fase antes de iniciar la siguiente.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  idx: "0",
                  fase: "Brief Inference & Diagnóstico de Superficie",
                  desc: "Definir para quién es la web y cuál es su objetivo. Identificar el modo: 'Persuade' (Landing de conversión), 'Operate' (SaaS/Dashboard), 'Read' (Blog/Docs) o 'Experience' (Showcase inmersivo).",
                  tools: "taste-skill · Protocolo de Inicio",
                  badge: "Estrategia",
                  color: "border-border bg-surface",
                },
                {
                  idx: "1",
                  fase: "Especificación de Tokens & DESIGN.md",
                  desc: "Establecer la paleta cromática exacta, pareja tipográfica, espaciados y radios. Si se emula una marca top (Stripe, Linear, Apple), se genera el archivo DESIGN.md en la raíz.",
                  tools: "getdesign.md · brandkit · DESIGN.md",
                  badge: "Tokens",
                  color: "border-border bg-surface",
                },
                {
                  idx: "2",
                  fase: "Arquitectura de Componentes & Layout",
                  desc: "Construcción del layout mobile-first. Inyección de Bento Grid, tarjetas con elevación sutil y jerarquía de texto donde el 100% de la información crítica sea legible sin scroll innecesario.",
                  tools: "uipro-cli · 21st.dev · Tailwind v4",
                  badge: "Estructura",
                  color: "border-border bg-surface",
                },
                {
                  idx: "3",
                  fase: "Motion & Micro-Interacciones Físicas",
                  desc: "Añadir retroalimentación táctil inmediata al presionar (:active:scale-[0.98]), transiciones fluidas de 180–250ms con curvas ease-out y soporte estricto a prefers-reduced-motion.",
                  tools: "emil-design-eng · Emil Kowalski Motion",
                  badge: "Física",
                  color: "border-border bg-surface",
                },
                {
                  idx: "4",
                  fase: "Poda de Código & Simplicidad Nativa",
                  desc: "Revisar el código generado bajo la lupa de Ponytail. Eliminar librerías npm innecesarias, wrappers redundantes y reemplazar lógica pesada por APIs nativas de HTML5 y CSS.",
                  tools: "ponytail · ponytail-audit",
                  badge: "Zero-Bloat",
                  color: "border-border bg-surface",
                },
                {
                  idx: "5",
                  fase: "Pulido de Craft & Anti-Patrones",
                  desc: "Inspeccionar con 60+ detectores: alinear ópticamente íconos, revisar contrastes WCAG AA (4.5:1), eliminar bordes toscos y verificar áreas táctiles de 44px en móviles.",
                  tools: "impeccable · web-design-guidelines · apple-design",
                  badge: "Auditoría",
                  color: "border-border bg-surface",
                },
                {
                  idx: "6",
                  fase: "Verificación en Navegador & Pre-Lanzamiento",
                  desc: "Probar los recorridos principales con Playwright, revisar enlaces y errores de consola, comprobar el checklist y retirar información privada antes de entregar una versión para revisión. Publicar en el destino acordado para el proyecto.",
                  tools: "Playwright · Checklist · Revisión de privacidad · Publicación",
                  badge: "Lanzamiento",
                  color: "border-border bg-surface",
                },
              ].map((item) => (
                <div
                  key={item.idx}
                  className={`p-5 rounded-3xl border ${item.color} transition-colors flex flex-col items-start gap-4`}
                >
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-2xl bg-surface-secondary text-foreground flex items-center justify-center text-sm font-mono font-black shrink-0 border border-border">
                      {item.idx}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground text-base">{item.fase}</h3>
                        <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-surface-secondary text-muted">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm text-muted/90 leading-relaxed max-w-2xl">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono px-3 py-1 rounded-xl bg-surface-secondary text-muted border border-border/80 max-w-full self-start">
                    {item.tools}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: BÓVEDA DE INSPIRACIÓN UX/UI */}
          <section hidden={!readAll && activeAnchor !== "inspiracion"} id="inspiracion" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Compass className="w-4 h-4" />
                <span>Capítulo 3 · Referencias Visuales</span>
              </div>
              <span className="text-sm font-mono text-muted">4 Fuentes Oficiales</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Bóveda de Inspiración & Galerías UX/UI de Élite
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                El diseño de nivel mundial nunca comienza desde el vacío ni inventa patrones a ciegas.
                Utiliza estas cuatro fuentes de inspiración para extraer referencias visuales, tipografías,
                animaciones y componentes antes de escribir código:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  title: "Curated Design",
                  url: "https://curated.design/",
                  badge: "Dirección de Arte & Estilo",
                  badgeColor: "bg-surface-secondary text-accent border-border",
                  description: "Catálogo editorial y directorio de élite con los mejores sitios web contemporáneos. Filtra por estética (SaaS, editorial, brutalismo refinado, minimalismo, lujo).",
                  usage: "Fase 0: Ideal para definir el 'vibe' visual, combinaciones tipográficas y paletas cromáticas antes de crear DESIGN.md.",
                },
                {
                  title: "Landing Love",
                  url: "https://www.landing.love/",
                  badge: "Animación & Storytelling",
                  badgeColor: "bg-surface-secondary text-accent border-border",
                  description: "La mayor vitrina del mundo de landing pages interactivas y animadas. Filtrable por animaciones, categorías de producto y micro-interacciones.",
                  usage: "Fase 2 & 3: Estructuración de narrativa visual, secciones hero inmersivas y efectos de scroll en modo Persuade.",
                },
                {
                  title: "CTA Gallery",
                  url: "https://www.cta.gallery/",
                  badge: "Conversión & Botones",
                  badgeColor: "bg-surface-secondary text-accent border-border",
                  description: "Colección curada de los mejores Call To Action (CTAs), botones y bloques de cierre de alta conversión en la web.",
                  usage: "Fase 2 & 5: Diseño de llamadas a la acción irresistibles, formularios compactos y áreas táctiles de 44px con alto contraste.",
                },
                {
                  title: "The Component Gallery",
                  url: "https://component.gallery/",
                  badge: "Design Systems & Anatomía",
                  badgeColor: "bg-surface-secondary text-accent border-border",
                  description: "Índice y repositorio exhaustivo de componentes reales de interfaz extraídos de Design Systems de empresas globales (Shopify, Apple, IBM, etc.).",
                  usage: "Fase 2: Verificación de la anatomía, variantes, jerarquía y accesibilidad en modales, acordeones, tablas y menús.",
                },
              ].map((site, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-surface border border-border/80 hover:border-indigo-500/30 transition-colors flex flex-col justify-between gap-4  group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                        <h3 className="font-bold text-foreground text-base">{site.title}</h3>
                      </div>
                      <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full border ${site.badgeColor}`}>
                        {site.badge}
                      </span>
                    </div>

                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent font-mono flex items-center gap-1.5 transition break-all"
                    >
                      <span>{site.url}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>

                    <p className="text-sm text-muted leading-relaxed">{site.description}</p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between flex-wrap gap-2 text-sm">
                    <span className="text-muted">
                      <strong className="text-muted">Aplicación:</strong> {site.usage}
                    </span>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-secondary hover:bg-surface-secondary active:scale-95 text-foreground/90 transition font-semibold"
                    >
                      <span>Explorar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: CATÁLOGO DE HERRAMIENTAS */}
          <section hidden={!readAll && activeAnchor !== "herramientas"} id="herramientas" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Terminal className="w-4 h-4" />
                <span>Capítulo 4 · Arsenal de Habilidades</span>
              </div>
              <span className="text-sm font-mono text-muted">Según tu agente y entorno</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Catálogo de Skills y Comandos Globales
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Selección de herramientas que puedes incorporar a tu flujo de trabajo. Comprueba su disponibilidad
                y sigue las instrucciones de instalación del agente que utilices:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  name: "Taste Skill",
                  cmd: "Leonxlnx/taste-skill",
                  promptId: "seed-15-taste-skill-direccion",
                  desc: "Infiere la audiencia, la vibra y calibra los 3 diales (Varianza, Movimiento y Densidad).",
                  when: "Fase 0 de cualquier sitio nuevo.",
                },
                {
                  name: "getdesign.md",
                  cmd: "npx getdesign@latest add <brand>",
                  promptId: "seed-16-getdesign-brand-spec",
                  desc: "Descarga tokens de diseño de marcas de élite (Stripe, Linear, Apple, Vercel) en un archivo DESIGN.md.",
                  when: "Cuando se busca emular una identidad de marca líder.",
                },
                {
                  name: "UI/UX Pro Max",
                  cmd: "uipro-cli (uipro init --ai <asistente>)",
                  promptId: "seed-17-uipro-component-architect",
                  desc: "Base de inteligencia UI con 60+ estilos de diseño, paletas de color y Bento Grids.",
                  when: "Para maquetar la arquitectura y los layouts de componentes.",
                },
                {
                  name: "Emil Kowalski Skills",
                  cmd: "emilkowalski/skills (emil-design-eng)",
                  promptId: "seed-18-emil-kowalski-motion",
                  desc: "Físicas de resorte, curvas ease-out, topes de 200–250ms y accesibilidad de motion.",
                  when: "Al codificar animaciones, menús o modales.",
                },
                {
                  name: "Apple Design Skill",
                  cmd: "dickwu/apple-design-skill",
                  promptId: "seed-19-apple-design-hig",
                  desc: "17 principios de Human Interface Guidelines: tap targets de 44px y materiales translúcidos.",
                  when: "Para apps web, dashboards y optimización móvil.",
                },
                {
                  name: "Ponytail",
                  cmd: "DietrichGebert/ponytail",
                  promptId: "seed-20-ponytail-zero-bloat",
                  desc: "The Lazy Senior Dev: reduce el código entre 50% y 80% usando APIs nativas de la web.",
                  when: "Para evitar sobre-ingeniería y librerías innecesarias.",
                },
                {
                  name: "Impeccable Design",
                  cmd: "pbakaus/impeccable",
                  promptId: "seed-21-impeccable-anti-slop",
                  desc: "60+ detectores deterministas para eliminar clichés de IA, alinear íconos y pulir contrastes.",
                  when: "Fase 5 de pulido de craft antes de producción.",
                },
                {
                  name: "Anti-Slop Suite (38 Reglas)",
                  cmd: "miqdadbadjuber/anti-slop (6 sub-skills + contrast-check.py)",
                  promptId: "seed-27-anti-slop-suite",
                  desc: "Suite de 6 skills (antislop, ui, copywriting, human, layoutmobile, code) con 38 reglas deterministas (R-01 a R-38), cero emojis decorativos, áreas táctiles de 44px, contraste WCAG AA verificado y Delivery Gate de 4 bloques.",
                  when: "Auditoría integral de UI, copy, accesibilidad, móvil 375px y código antes de entrega.",
                },
                {
                  name: "Web Design Guidelines",
                  cmd: "vercel-labs/agent-skills",
                  promptId: "seed-22-web-design-guidelines-vercel",
                  desc: "Audita contra las reglas de Vercel: rejilla de 8pt, contraste WCAG AA 4.5:1 y foco accesible.",
                  when: "Revisión final de código y accesibilidad.",
                },
                {
                  name: "Scroll World",
                  cmd: "oso95/scroll-world",
                  promptId: "seed-23-scroll-world-cinematic",
                  desc: "Motor cinemático de scroll-scrubbing Apple Showcase con vuelo de cámara 3D diorama.",
                  when: "Para landing pages inmersivas de alto impacto.",
                },
                {
                  name: "Playwright Suite",
                  cmd: "npx playwright test",
                  promptId: "seed-24-playwright-e2e-tester",
                  desc: "Crawler autónomo que abre Chrome en local, verifica 0 enlaces rotos y 0 errores en consola JS.",
                  when: "Pre-lanzamiento en runtime real antes de deploy.",
                },
              ].map((tool, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-surface border border-border/80 hover:border-indigo-500/30 transition-colors flex flex-col justify-between gap-4 "
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground text-base">{tool.name}</h3>
                      {onSelectPrompt && (
                        <button
                          onClick={() => onSelectPrompt(tool.promptId)}
                          className="text-sm font-semibold text-accent hover:text-accent flex items-center gap-1 active:scale-95"
                          title="Usar este prompt en la bóveda"
                        >
                          <span>Usar Prompt</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <code className="text-sm text-accent font-mono block bg-surface-secondary px-2.5 py-1 rounded-lg border border-border/60">
                      {tool.cmd}
                    </code>
                    <p className="text-sm text-muted leading-relaxed">{tool.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-border/60 text-sm text-muted">
                    <strong className="text-muted">Cuándo aplicar:</strong> {tool.when}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: TOKENS & DESIGN.MD */}
          <section hidden={!readAll && activeAnchor !== "design-spec"} id="design-spec" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Palette className="w-4 h-4" />
                <span>Capítulo 5 · Sistema de Tokens</span>
              </div>
              <span className="text-sm font-mono text-muted">Raíz del Proyecto</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Estructura Oficial de un `DESIGN.md`
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Tener un archivo <code>DESIGN.md</code> en la raíz del repositorio actúa como el único sistema de verdad.
                Evita que los modelos inventen estilos, colores arbitrarios o radios dispares sobre la marcha:
              </p>
            </div>

            <div className="relative bg-surface border border-border/80 rounded-xl p-5 font-mono-code text-sm text-foreground/90 ">
              <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-4">
                <div className="flex items-center gap-2 text-muted">
                  <Palette className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-muted font-sans">DESIGN.md (Plantilla Maestra)</span>
                </div>
                <button
                  onClick={() =>
                    handleCopyCode(
                      `# DESIGN.md — Especificación de Sistema de Diseño

## 1. Filosofía de Superficie y Elevación
- Base Background: #07090e (Profundo, mate)
- Elevated Surface: #0d121f (Tarjetas, modales)
- Floating Layer: #111828 (Dropdowns, popovers)
- Border Standard: rgba(255, 255, 255, 0.08)
- Border Hover: rgba(99, 102, 241, 0.35)

## 2. Paleta Cromática (WCAG AA > 4.5:1)
- Text Primary: #f8fafc (slate-50, 100% opacidad)
- Text Secondary: #94a3b8 (slate-400, 80% opacidad)
- Text Muted: #64748b (slate-500, 60% opacidad)
- Primary Accent: #6366f1 (Indigo 500)
- Accent Glow: rgba(99, 102, 241, 0.15)
- Success: #10b981 / Warning: #f59e0b / Danger: #f43f5e

## 3. Tipografía
- Headings: Plus Jakarta Sans / Inter Display (-0.02em tracking)
- Body: Plus Jakarta Sans / Inter (14px/22px o 16px/24px)
- Code & Data: JetBrains Mono (12px, tabular numbers)

## 4. Radios y Escala de Espaciado
- Rejilla: Múltiplos estrictos de 4px / 8px (8, 12, 16, 24, 32, 48px)
- Radius Tarjetas: 1rem (16px / rounded-2xl)
- Radius Botones: 0.75rem (12px / rounded-xl)
- Radius Badges: 9999px (rounded-full)`,
                      "design-md-spec"
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-secondary hover:bg-surface-secondary active:scale-95 text-foreground/90 transition font-sans text-sm font-semibold"
                  title="Copiar plantilla DESIGN.md"
                >
                  {copiedCodeId === "design-md-spec" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent" />
                      <span className="text-accent">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Plantilla</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="overflow-x-auto whitespace-pre leading-relaxed text-muted">
{`# DESIGN.md — Especificación de Sistema de Diseño

## 1. Filosofía de Superficie y Elevación
- Base Background: #07090e (Profundo, mate)
- Elevated Surface: #0d121f (Tarjetas, modales)
- Floating Layer: #111828 (Dropdowns, popovers)
- Border Standard: rgba(255, 255, 255, 0.08)
- Border Hover: rgba(99, 102, 241, 0.35)

## 2. Paleta Cromática (WCAG AA > 4.5:1)
- Text Primary: #f8fafc (slate-50, 100% opacidad)
- Text Secondary: #94a3b8 (slate-400, 80% opacidad)
- Text Muted: #64748b (slate-500, 60% opacidad)
- Primary Accent: #6366f1 (Indigo 500)
- Accent Glow: rgba(99, 102, 241, 0.15)
- Success: #10b981 / Warning: #f59e0b / Danger: #f43f5e

## 3. Tipografía
- Headings: Plus Jakarta Sans / Inter Display (-0.02em tracking)
- Body: Plus Jakarta Sans / Inter (14px/22px o 16px/24px)
- Code & Data: JetBrains Mono (12px, tabular numbers)

## 4. Radios y Escala de Espaciado
- Rejilla: Múltiplos estrictos de 4px / 8px (8, 12, 16, 24, 32, 48px)
- Radius Tarjetas: 1rem (16px / rounded-2xl)
- Radius Botones: 0.75rem (12px / rounded-xl)
- Radius Badges: 9999px (rounded-full)`}
              </pre>
            </div>
          </section>

          {/* SECTION 6: EMIL KOWALSKI MOTION */}
          <section hidden={!readAll && activeAnchor !== "emil-motion"} id="emil-motion" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Zap className="w-4 h-4" />
                <span>Capítulo 6 · Micro-Interacciones</span>
              </div>
              <span className="text-sm font-mono text-muted">180ms – 250ms máx</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Las 5 Reglas de Oro de Emil Kowalski
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Para que una web se sienta fluida, precisa y de gama alta (en lugar de lenta y artificial),
                las animaciones deben respetar estas cinco directrices fundamentales:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono">1.</span>
                  <span>Curvas: ease-out al entrar, ease-in al salir</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  El ojo humano percibe como natural cuando un objeto entra rápido y frena suavemente (<code>ease-out</code>).
                  Usar <code>ease-in</code> al abrir menús o modales se siente pesado y perezoso.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono">2.</span>
                  <span>Nunca escalar desde cero (scale 0)</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  En el mundo físico ningún objeto nace de un punto microscópico. Los modales y ventanas deben escalar
                  desde <code>scale(0.96)</code> o <code>scale(0.97)</code> con <code>opacity: 0</code> hacia <code>scale(1)</code>.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono">3.</span>
                  <span>Techo estricto de duración: 180ms – 250ms</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Cualquier animación de más de 300ms en botones, menús o modales provoca fatiga cognitiva y hace sentir
                  lenta la app. Reserva duraciones mayores únicamente para transiciones de pantalla completa.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono">4.</span>
                  <span>Feedback físico inmediato al presionar (:active)</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Todo botón debe responder al toque con <code>active:scale-[0.98]</code> y <code>transition: transform 100ms ease-out</code>.
                  El usuario debe sentir que los componentes tienen masa y resistencia física.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono">5.</span>
                  <span>Respeto inquebrantable a prefers-reduced-motion</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Usuarios con sensibilidad vestibular requieren la anulación de desplazamientos y zooms automáticos mediante
                  la media query estándar de CSS. En su lugar, utiliza fundidos suaves de opacidad (<code>opacity</code>).
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 7: APPLE HIG */}
          <section hidden={!readAll && activeAnchor !== "apple-hig"} id="apple-hig" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Eye className="w-4 h-4" />
                <span>Capítulo 7 · Human Interface Guidelines</span>
              </div>
              <span className="text-sm font-mono text-muted">Apple HIG Ergonomics</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Ergonomía Táctil y Fluidez Nativa (Apple HIG)
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                La interfaz debe sentirse como una extensión natural de la mano, con retroalimentación instantánea
                y materiales translúcidos que aportan jerarquía espacial:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="font-bold text-foreground text-sm">Área Táctil Mínima de 44x44 px</h3>
                <p className="text-sm text-muted leading-relaxed">
                  En dispositivos móviles ningún botón, enlace o ícono interactivo debe medir menos de 44x44px de área de contacto real,
                  incluso si el glifo visual mide 16px (usar padding invisible o <code>min-h-[44px] min-w-[44px]</code>).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="font-bold text-foreground text-sm">Feedback en pointerdown</h3>
                <p className="text-sm text-muted leading-relaxed">
                  La reacción visual debe ocurrir en el microsegundo en que el dedo toca la pantalla, no al soltarlo (<code>click</code>).
                  La latencia percibida debe ser de 0 milisegundos.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="font-bold text-foreground text-sm">Materiales Translúcidos & Cristal Esmerilado</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Uso de fondos con <code>backdrop-blur-xl</code> en barras de navegación fijas y modales, permitiendo
                  intuir la profundidad y el contenido subyacente sin perder legibilidad.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="font-bold text-foreground text-sm">Manipulación Directa 1:1</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Cualquier gesto táctil (deslizamiento, drag & drop o apertura de cajones) debe seguir el dedo 1:1 y permitir
                  ser interrumpido o cancelado a mitad de camino sin bloquear la interfaz.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 8: PONYTAIL */}
          <section hidden={!readAll && activeAnchor !== "ponytail"} id="ponytail" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Scissors className="w-4 h-4" />
                <span>Capítulo 8 · The Lazy Senior Dev</span>
              </div>
              <span className="text-sm font-mono text-muted">-50% a -80% Código</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Ponytail: Código Conciso y Zero-Bloat
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                La IA tiende al bloat: crea wrappers infinitos, importa librerías npm de 100KB para tareas que resuelve
                una sola línea de CSS y genera estados duplicados. Ponytail poda la sobre-ingeniería:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground">1. Pregunta antes de escribir: ¿Realmente se necesita?</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Aplica el principio YAGNI (<em>You Aren't Gonna Need It</em>). Elimina abstracciones prematuras y efectos
                  secundarios (<code>useEffect</code>) que solo sincronizan estados que podían calcularse en línea
                  con variables derivadas o <code>useMemo</code>.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground">2. Aprovecha las APIs Nativas de la Plataforma Web</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Usa <code>&lt;dialog&gt;</code> nativo con <code>showModal()</code>, <code>&lt;details&gt;</code> para acordeones,
                  <code>Intl.NumberFormat</code> para monedas, y selectores modernos de CSS (<code>:has()</code>, <code>@container</code>)
                  en lugar de dependencias npm pesadas.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground">3. Regla del Tamaño de Archivo</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Ningún componente de React debería superar las 250 líneas. Si supera ese límite, divídelo en subcomponentes
                  atómicos con responsabilidades únicas y contratos de tipado estrictos.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 9: IMPECCABLE & VERCEL */}
          <section hidden={!readAll && activeAnchor !== "impeccable"} id="impeccable" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Capítulo 9 · Auditoría de Calidad</span>
              </div>
              <span className="text-sm font-mono text-muted">Vercel Labs & Impeccable</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Pulido Impeccable & Directrices de Vercel Labs
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Antes de dar por finalizada una pantalla, audita visualmente contra las cuatro directrices
                de consistencia geométrica y accesibilidad:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span>📐 Rejilla de 8pt Estricta</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Todos los márgenes, paddings y espaciados entre secciones deben seguir la escala de 4px / 8px:
                  <code>p-2 (8px), p-3 (12px), p-4 (16px), p-6 (24px), p-8 (32px), p-12 (48px)</code>.
                  Cero medidas arbitrarias como 13px o 27px.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span>👁️ Contraste WCAG AA 4.5:1</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Todo texto debe superar la relación 4.5:1. En fondos oscuros (<code>#07090e</code>),
                  los títulos usan <code>#f8fafc</code> (100% contraste), las descripciones <code>#94a3b8</code> y
                  los metadatos <code>#64748b</code>.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span>⌨️ Navegación por Teclado</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Nunca elimines el outline sin proveer un anillo accesible: usar{" "}
                  <code>focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:outline-none</code>{" "}
                  para navegación clara por tabulador.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span>🚫 Cero Truncamiento Involuntario</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  No cortes datos críticos con <code>truncate</code> a menos que proporciones un tooltip
                  o botón de expansión accesible para el usuario.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 10: PLAYWRIGHT */}
          <section hidden={!readAll && activeAnchor !== "playwright"} id="playwright" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Code2 className="w-4 h-4" />
                <span>Capítulo 10 · Testing Autónomo E2E</span>
              </div>
              <span className="text-sm font-mono text-muted">Playwright Test Suite</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Pruebas Autónomas de Runtime con Playwright
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Antes de hacer deploy a producción, corre un script autónomo de Playwright para validar que la web
                funciona sin fallos en un navegador Chromium real:
              </p>
            </div>

            <div className="relative bg-surface border border-border/80 rounded-xl p-5 font-mono-code text-sm text-foreground/90 ">
              <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-4">
                <div className="flex items-center gap-2 text-muted font-sans">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-muted">tests/e2e-quality.spec.ts</span>
                </div>
                <button
                  onClick={() =>
                    handleCopyCode(
                      `import { test, expect } from '@playwright/test';

test('Auditoría Autónoma de Calidad Web', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  // 1. Visitar la página en local
  const response = await page.goto('http://localhost:3000');
  expect(response?.status()).toBe(200);

  // 2. Verificar que no haya enlaces rotos (# o huérfanos)
  const links = await page.$$eval('a', els => els.map(a => a.getAttribute('href')));
  for (const href of links) {
    expect(href).not.toBe('#');
    expect(href).not.toBe('');
  }

  // 3. Probar responsividad móvil (375x667)
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('body')).toBeVisible();

  // 4. Asegurar 0 errores de JavaScript en consola
  expect(errors).toHaveLength(0);
});`,
                      "playwright-script"
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-secondary hover:bg-surface-secondary active:scale-95 text-foreground/90 transition font-sans text-sm font-semibold"
                  title="Copiar script Playwright"
                >
                  {copiedCodeId === "playwright-script" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent" />
                      <span className="text-accent">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Test</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="overflow-x-auto whitespace-pre leading-relaxed text-muted">
{`import { test, expect } from '@playwright/test';

test('Auditoría Autónoma de Calidad Web', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  // 1. Visitar la página en local
  const response = await page.goto('http://localhost:3000');
  expect(response?.status()).toBe(200);

  // 2. Verificar que no haya enlaces rotos (# o huérfanos)
  const links = await page.$$eval('a', els => els.map(a => a.getAttribute('href')));
  for (const href of links) {
    expect(href).not.toBe('#');
    expect(href).not.toBe('');
  }

  // 3. Probar responsividad móvil (375x667)
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('body')).toBeVisible();

  // 4. Asegurar 0 errores de JavaScript en consola
  expect(errors).toHaveLength(0);
});`}
              </pre>
            </div>
          </section>

          {/* SECTION 11: CHECKLIST INTERACTIVO */}
          <section hidden={!readAll && activeAnchor !== "checklist"} id="checklist" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Capítulo 11 · Auditoría de Producción</span>
              </div>
              <button
                onClick={resetChecklist}
                className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar checklist</span>
              </button>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Checklist de 20 Puntos Pre-Lanzamiento
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  Marca cada punto verificado. Tu progreso se guarda automáticamente en este dispositivo.
                </p>
              </div>

              {/* Progress Summary Card */}
              <div className="flex items-center gap-3 bg-surface border border-border/80 px-5 py-3 rounded-2xl ">
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground block">
                    {checkedCount} de {checklist.length}
                  </span>
                  <span className="text-sm text-muted">Puntos Aprobados</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-extrabold text-accent text-base font-mono">
                  {progressPercent}%
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-surface-secondary rounded-full overflow-hidden p-0.5 border border-border/60">
                <div
                  className="h-full     rounded-full transition-colors duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>0% Sin revisar</span>
                <span>50% Desarrollo avanzado</span>
                <span className="text-accent font-semibold">100% Ready for Production 🚀</span>
              </div>
            </div>

            {/* Checklist Filter Tabs */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setChecklistFilter("todos")}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition ${
                  checklistFilter === "todos"
                    ? "bg-accent text-accent-foreground"
                    : "bg-surface-secondary text-muted hover:text-foreground"
                }`}
              >
                Todos ({checklist.length})
              </button>
              <button
                onClick={() => setChecklistFilter("pendientes")}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition ${
                  checklistFilter === "pendientes"
                    ? "bg-accent text-accent-foreground"
                    : "bg-surface-secondary text-muted hover:text-foreground"
                }`}
              >
                Pendientes ({checklist.length - checkedCount})
              </button>
              <button
                onClick={() => setChecklistFilter("completados")}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition ${
                  checklistFilter === "completados"
                    ? "bg-accent text-accent-foreground"
                    : "bg-surface-secondary text-muted hover:text-foreground"
                }`}
              >
                Completados ({checkedCount})
              </button>
            </div>

            <div className="checklist-items">
              {filteredChecklist.map((item) => <label key={item.id} className="checklist-item">
                <input type="checkbox" checked={item.checked} onChange={() => toggleChecklistItem(item.id)} />
                <span><span className="checklist-category">{item.category} · {item.id}</span>{item.text}</span>
              </label>)}
              {filteredChecklist.length === 0 && <p className="checklist-empty">No hay puntos en este filtro.</p>}
            </div>
          </section>

          {/* SECTION 12: ENTREGA Y PUBLICACIÓN */}
          <section hidden={!readAll && activeAnchor !== "deploy"} id="deploy" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Cloud className="w-4 h-4" />
                <span>Capítulo 12 · Entrega y publicación</span>
              </div>
              <span className="text-sm font-mono text-muted">Adaptado a cada proyecto</span>
            </div>

            <div className="space-y-2">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Del proyecto revisado a la publicación
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Una landing estática, una web con contenido y una aplicación con usuarios tienen necesidades distintas.
                El agente debe preparar la entrega y utilizar el proveedor, la cuenta y el dominio acordados para ese proyecto.
                Esta guía no presupone un alojamiento ni una infraestructura personal.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono">1.</span>
                  <span>Definir el destino y preparar la entrega</span>
                </h3>
                <p className="text-sm text-muted">
                  Identifica si el proyecto necesita solo archivos estáticos o también servidor, base de datos y autenticación.
                  Revisa los comandos de compilación del repositorio, las variables necesarias y las instrucciones del proveedor elegido.
                  Entrega una vista previa comprobable antes de publicar.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono">2.</span>
                  <span>Revisar qué información se hará pública</span>
                </h3>
                <p className="text-sm text-muted">
                  Revisa contenido, prompts, archivos compilados, imágenes, mapas de código fuente y respuestas de la API.
                  Retira credenciales, rutas locales, correos privados, identificadores de cuentas y datos de clientes o proyectos internos.
                  Usa ejemplos ficticios como <code>example.com</code> y variables descriptivas en las plantillas.
                </p>
                <p className="text-sm text-muted">
                  Las claves privadas deben permanecer en el servidor. Ocultar un dato en la interfaz o bloquear su indexación
                  no impide que se lea desde un archivo público o un endpoint sin control de acceso.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono">3.</span>
                  <span>Publicar y verificar la entrega</span>
                </h3>
                <p className="text-sm text-muted">
                  Confirma el destino y la autorización para publicar. Ejecuta el procedimiento del proyecto y comprueba la URL final,
                  HTTPS, navegación, formularios y permisos de acceso. Documenta cómo actualizar la versión y recuperar la anterior
                  si algo falla, sin incluir secretos en la documentación compartida.
                </p>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="p-6 rounded-xl     border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-foreground">¿Listo para comenzar a construir?</h3>
                <p className="text-sm text-muted">
                  Abre la Bóveda de Prompts y ejecuta el Protocolo de Inicio con tu asistente.
                </p>
              </div>
              <button
                onClick={onNavigateToPrompts}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm transition active:scale-95   shrink-0 flex items-center gap-2"
              >
                <span>Ir a la Bóveda de Prompts</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
          {!readAll && <nav className="chapter-pagination" aria-label="Navegar entre capítulos">
            {activeIndex > 0 ? <a href={`/manual#${SECTIONS[activeIndex - 1].id}`} onClick={(event) => chapterLink(event, SECTIONS[activeIndex - 1].id)}><span>Anterior</span>{SECTIONS[activeIndex - 1].title}</a> : <span />}
            {activeIndex < SECTIONS.length - 1 && <a href={`/manual#${SECTIONS[activeIndex + 1].id}`} onClick={(event) => chapterLink(event, SECTIONS[activeIndex + 1].id)}><span>Siguiente</span>{SECTIONS[activeIndex + 1].title}<ChevronRight size={18} aria-hidden="true" /></a>}
          </nav>}
        </main>
      </div>
      <footer className="site-footer page-width">
        <span>
          Manual web · Colección de{" "}
          <a href="https://dannieldev.com" target="_blank" rel="noopener noreferrer">
            @dannieldev
          </a>
        </span>
        <span>{SECTIONS.length} capítulos para consultar a tu ritmo</span>
      </footer>
    </div>
  );
};
