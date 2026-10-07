import React, { useState, useEffect } from "react";
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
  CheckSquare,
  Square,
  RotateCcw,
  ArrowLeft,
  Sliders,
  ChevronRight,
  Code2,
  BookmarkCheck,
  ArrowUpRight,
  Compass,
  ExternalLink,
} from "lucide-react";
import { Button, Chip, Kbd } from "@heroui/react";

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
  { id: 16, category: "Performance", text: "Telemetría/Analytics ligero (Cloudflare Web Analytics o Plausible) sin ralentizar", checked: false },
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
  { id: "filosofia", title: "1. Filosofía Anti-Slop", group: "Estrategia & Dirección", icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
  { id: "fases", title: "2. Flujo en 7 Fases", group: "Estrategia & Dirección", icon: <Layers className="w-4 h-4 text-indigo-400" /> },
  { id: "inspiracion", title: "3. Inspiración & Galerías UX/UI", group: "Estrategia & Dirección", icon: <Compass className="w-4 h-4 text-purple-400" /> },
  { id: "herramientas", title: "4. Catálogo de Skills", group: "Herramientas & Tokens", icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
  { id: "design-spec", title: "5. Tokens & DESIGN.md", group: "Herramientas & Tokens", icon: <Palette className="w-4 h-4 text-pink-400" /> },
  { id: "emil-motion", title: "6. Motion Emil Kowalski", group: "Físicas, Ergonomía & Código", icon: <Zap className="w-4 h-4 text-sky-400" /> },
  { id: "apple-hig", title: "7. Ergonomía Apple HIG", group: "Físicas, Ergonomía & Código", icon: <Eye className="w-4 h-4 text-indigo-300" /> },
  { id: "ponytail", title: "8. Código Ponytail Zero-Bloat", group: "Físicas, Ergonomía & Código", icon: <Scissors className="w-4 h-4 text-amber-300" /> },
  { id: "impeccable", title: "9. Pulido Impeccable & Vercel", group: "Físicas, Ergonomía & Código", icon: <ShieldCheck className="w-4 h-4 text-rose-400" /> },
  { id: "playwright", title: "10. Pruebas Playwright E2E", group: "Validación & Despliegue", icon: <Code2 className="w-4 h-4 text-violet-400" /> },
  { id: "checklist", title: "11. Checklist de 20 Puntos", group: "Validación & Despliegue", icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
  { id: "deploy", title: "12. Despliegue Cloudflare", group: "Validación & Despliegue", icon: <Cloud className="w-4 h-4 text-orange-400" /> },
];

export const ManualPage: React.FC<ManualPageProps> = ({
  onNavigateToPrompts,
  onSelectPrompt,
  onAddToast,
}) => {
  const [activeAnchor, setActiveAnchor] = useState<string>("filosofia");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [checklistFilter, setChecklistFilter] = useState<"todos" | "pendientes" | "completados">("todos");

  // Load checklist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dannieldev_web_checklist_v1");
      if (saved) {
        setChecklist(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Sync active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      const scrollPosition = window.scrollY + 180;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveAnchor(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    onAddToast("Código copiado al portapapeles", "success");
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveAnchor(id);
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const checkedCount = checklist.filter((i) => i.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  const filteredChecklist = checklist.filter((item) => {
    if (checklistFilter === "pendientes") return !item.checked;
    if (checklistFilter === "completados") return item.checked;
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
      {/* Subpage Breadcrumb & Top Bar */}
      <div className="border-b border-border/80 bg-surface/70 backdrop-blur-md px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToPrompts}
              className="flex items-center gap-2 rounded-xl text-xs font-semibold"
              aria-label="Volver a la Bóveda de Prompts"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-muted" />
              <span>Volver a Prompts</span>
              <Kbd className="text-[9px]">Esc</Kbd>
            </Button>
            <span className="text-slate-600 hidden sm:inline">/</span>
            <span className="text-xs font-semibold text-accent hidden sm:inline flex items-center gap-1.5">
              <BookmarkCheck className="w-3.5 h-3.5 text-accent" />
              Manual de Creación Web Anti-Genérica con IA
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Chip color="success" variant="soft" size="sm" className="font-semibold text-xs">
              Checklist: {checkedCount}/20
            </Chip>
          </div>
        </div>
      </div>

      {/* Hero Presentation Header */}
      <div className="relative border-b border-border/80 bg-gradient-to-b from-surface via-surface/90 to-background px-4 lg:px-8 py-12 lg:py-16 overflow-hidden">
        {/* Subtle radial backdrop glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-accent/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Chip color="accent" variant="soft" size="sm" className="font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-accent mr-1 inline" />
              Estándar de Ingeniería @dannieldev
            </Chip>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-muted hidden sm:inline">12 Capítulos Prácticos & 4 Galerías UX/UI</span>
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Manual de Creación Web{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-100 bg-clip-text text-transparent">
                Anti-Genérica con IA
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted leading-relaxed font-normal">
              De la idea en blanco a producción en Cloudflare con cero código basura, diseño de élite,
              físicas de interacción de clase mundial y auditoría autónoma en cada pantalla.
            </p>
          </div>

          {/* Quick Metrics & Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-2xl bg-surface-secondary/80 border border-border/80 flex flex-col gap-1">
              <span className="text-2xl font-black text-indigo-400 font-mono">12</span>
              <span className="text-xs font-semibold text-foreground/90">Capítulos Maestros</span>
              <span className="text-[11px] text-muted">Guía técnica integral</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary/80 border border-border/80 flex flex-col gap-1">
              <span className="text-2xl font-black text-purple-400 font-mono">4</span>
              <span className="text-xs font-semibold text-foreground/90">Galerías de Élite</span>
              <span className="text-[11px] text-muted">Inspiración UX/UI</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary/80 border border-border/80 flex flex-col gap-1">
              <span className="text-2xl font-black text-emerald-400 font-mono">20</span>
              <span className="text-xs font-semibold text-foreground/90">Puntos Pre-Launch</span>
              <span className="text-[11px] text-muted">Auditoría no negociable</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary/80 border border-border/80 flex flex-col gap-1">
              <span className="text-2xl font-black text-amber-400 font-mono">8</span>
              <span className="text-xs font-semibold text-foreground/90">Skills Especializadas</span>
              <span className="text-[11px] text-muted">En ~/.agents/skills</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-secondary/80 border border-border/80 flex flex-col gap-1">
              <span className="text-2xl font-black text-pink-400 font-mono">100%</span>
              <span className="text-xs font-semibold text-foreground/90">Anti-Slop Craft</span>
              <span className="text-[11px] text-muted">Cero plantillas genéricas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Documentation Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full flex-1 flex flex-col lg:flex-row gap-10">
        {/* Left Sticky Sidebar Table of Contents */}
        <aside className="lg:w-72 shrink-0 hidden lg:block self-start sticky top-20">
          <div className="p-4 rounded-3xl bg-surface border border-border/80 shadow-xl flex flex-col gap-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Índice del Manual
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-muted">
                11 Secciones
              </span>
            </div>

            {/* Navigation links grouped */}
            <div className="space-y-4">
              {Array.from(new Set(SECTIONS.map((s) => s.group))).map((groupName) => (
                <div key={groupName} className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted px-2 block">
                    {groupName}
                  </span>
                  <div className="space-y-0.5">
                    {SECTIONS.filter((s) => s.group === groupName).map((section) => {
                      const isActive = activeAnchor === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all text-left active:scale-[0.98] ${
                            isActive
                              ? "bg-indigo-600/20 text-indigo-200 border border-indigo-500/35 font-semibold shadow-xs"
                              : "text-muted hover:text-foreground/90 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span className="shrink-0">{section.icon}</span>
                          <span className="truncate">{section.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist progress mini card inside sidebar */}
            <div className="mt-2 pt-3 border-t border-border/60 bg-background p-3 rounded-2xl border border-border/60 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted font-medium">Auditoría Pre-Launch</span>
                <span className="font-bold text-emerald-400">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <button
                onClick={() => scrollToSection("checklist")}
                className="text-[11px] text-indigo-300 hover:text-indigo-200 font-semibold flex items-center justify-between pt-1 group"
              >
                <span>Ver los 20 puntos</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Expansive Content Stream */}
        <main className="flex-1 max-w-4xl space-y-20 py-2">
          {/* SECTION 1: FILOSOFÍA ANTI-SLOP */}
          <section id="filosofia" className="scroll-mt-24 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Capítulo 1 · Principio Rector</span>
              </div>
              {onSelectPrompt && (
                <button
                  onClick={() => onSelectPrompt("seed-26-protocolo-arranque-web")}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>Abrir Prompt de Arranque</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/25 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-rose-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>❌ Lo que hace la IA por defecto</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                    AI Slop
                  </span>
                </div>
                <ul className="text-xs text-rose-100/80 space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li>Degradados violetas y púrpuras saturados idénticos en todas las páginas.</li>
                  <li>Héroe centrado con texto gigante e ilegible sobre mallas oscuras estándar.</li>
                  <li>Tres tarjetas flotantes de idéntico tamaño sin jerarquía de contenido ni pesos.</li>
                  <li>Uso automático de Roboto o Inter sin emparejamientos con carácter tipográfico.</li>
                  <li>Animaciones lentas de 600–800ms que hacen sentir la interfaz pesada e hinchada.</li>
                  <li>Enlaces a <code>#</code> que no van a ningún lado y formularios sin feedback.</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/25 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>✅ El Estándar Senior Anti-Genérico</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                    Clase Mundial
                  </span>
                </div>
                <ul className="text-xs text-emerald-100/80 space-y-2.5 list-disc pl-4 leading-relaxed">
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
            <div className="p-6 rounded-3xl bg-surface border border-border/80 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Protocolo de Inicio Obligatorio con Danniel</span>
              </div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Al arrancar cualquier sitio web o landing page, el agente <strong>no codifica a ciegas</strong>.
                Primero saluda, diagnostica el modo de superficie (<em>Persuade, Operate, Read o Experience</em>)
                y propone activamente a Danniel un combo específico de 2 a 4 herramientas (referencia visual + sistema de componentes + filtro de animación/código)
                para validar la dirección antes de tocar una sola línea de código.
              </p>
            </div>
          </section>

          {/* SECTION 2: FLUJO EN 7 FASES */}
          <section id="fases" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Capítulo 2 · Metodología de Ejecución</span>
              </div>
              <span className="text-[11px] font-mono text-muted">Orden Lineal Estricto</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
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
                  color: "border-indigo-500/30 bg-indigo-950/10",
                },
                {
                  idx: "1",
                  fase: "Especificación de Tokens & DESIGN.md",
                  desc: "Establecer la paleta cromática exacta, pareja tipográfica, espaciados y radios. Si se emula una marca top (Stripe, Linear, Apple), se genera el archivo DESIGN.md en la raíz.",
                  tools: "getdesign.md · brandkit · DESIGN.md",
                  badge: "Tokens",
                  color: "border-pink-500/30 bg-pink-950/10",
                },
                {
                  idx: "2",
                  fase: "Arquitectura de Componentes & Layout",
                  desc: "Construcción del layout mobile-first. Inyección de Bento Grid, tarjetas con elevación sutil y jerarquía de texto donde el 100% de la información crítica sea legible sin scroll innecesario.",
                  tools: "uipro-cli · 21st.dev · Tailwind v4",
                  badge: "Estructura",
                  color: "border-sky-500/30 bg-sky-950/10",
                },
                {
                  idx: "3",
                  fase: "Motion & Micro-Interacciones Físicas",
                  desc: "Añadir retroalimentación táctil inmediata al presionar (:active:scale-[0.98]), transiciones fluidas de 180–250ms con curvas ease-out y soporte estricto a prefers-reduced-motion.",
                  tools: "emil-design-eng · Emil Kowalski Motion",
                  badge: "Física",
                  color: "border-amber-500/30 bg-amber-950/10",
                },
                {
                  idx: "4",
                  fase: "Poda de Código & Simplicidad Nativa",
                  desc: "Revisar el código generado bajo la lupa de Ponytail. Eliminar librerías npm innecesarias, wrappers redundantes y reemplazar lógica pesada por APIs nativas de HTML5 y CSS.",
                  tools: "ponytail · ponytail-audit",
                  badge: "Zero-Bloat",
                  color: "border-emerald-500/30 bg-emerald-950/10",
                },
                {
                  idx: "5",
                  fase: "Pulido de Craft & Anti-Patrones",
                  desc: "Inspeccionar con 60+ detectores: alinear ópticamente íconos, revisar contrastes WCAG AA (4.5:1), eliminar bordes toscos y verificar áreas táctiles de 44px en móviles.",
                  tools: "impeccable · web-design-guidelines · apple-design",
                  badge: "Auditoría",
                  color: "border-rose-500/30 bg-rose-950/10",
                },
                {
                  idx: "6",
                  fase: "Verificación en Navegador & Pre-Lanzamiento",
                  desc: "Correr pruebas autónomas con Playwright para asegurar 0 enlaces rotos, 0 errores en consola JS y verificar el Checklist de 20 Puntos antes de desplegar en Cloudflare.",
                  tools: "Playwright · Checklist 20 Puntos · Wrangler Deploy",
                  badge: "Lanzamiento",
                  color: "border-violet-500/30 bg-violet-950/10",
                },
              ].map((item) => (
                <div
                  key={item.idx}
                  className={`p-5 rounded-3xl border ${item.color} transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
                >
                  <div className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-2xl bg-white/[0.08] text-white flex items-center justify-center text-sm font-mono font-black shrink-0 border border-border">
                      {item.idx}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-white text-base">{item.fase}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-muted">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-muted/90 leading-relaxed max-w-2xl">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-xl bg-black/40 text-muted border border-border/80 shrink-0 self-end sm:self-center">
                    {item.tools}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: BÓVEDA DE INSPIRACIÓN UX/UI */}
          <section id="inspiracion" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Capítulo 3 · Referencias Visuales</span>
              </div>
              <span className="text-[11px] font-mono text-muted">4 Fuentes Oficiales</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Bóveda de Inspiración & Galerías UX/UI de Élite
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                El diseño de nivel mundial nunca comienza desde el vacío ni inventa patrones a ciegas.
                Utiliza estas cuatro fuentes de inspiración para extraer referencias visuales, tipografías,
                animaciones y componentes antes de escribir código:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Curated Design",
                  url: "https://curated.design/",
                  badge: "Dirección de Arte & Estilo",
                  badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/25",
                  description: "Catálogo editorial y directorio de élite con los mejores sitios web contemporáneos. Filtra por estética (SaaS, editorial, brutalismo refinado, minimalismo, lujo).",
                  usage: "Fase 0: Ideal para definir el 'vibe' visual, combinaciones tipográficas y paletas cromáticas antes de crear DESIGN.md.",
                },
                {
                  title: "Landing Love",
                  url: "https://www.landing.love/",
                  badge: "Animación & Storytelling",
                  badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/25",
                  description: "La mayor vitrina del mundo de landing pages interactivas y animadas. Filtrable por animaciones, categorías de producto y micro-interacciones.",
                  usage: "Fase 2 & 3: Estructuración de narrativa visual, secciones hero inmersivas y efectos de scroll en modo Persuade.",
                },
                {
                  title: "CTA Gallery",
                  url: "https://www.cta.gallery/",
                  badge: "Conversión & Botones",
                  badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
                  description: "Colección curada de los mejores Call To Action (CTAs), botones y bloques de cierre de alta conversión en la web.",
                  usage: "Fase 2 & 5: Diseño de llamadas a la acción irresistibles, formularios compactos y áreas táctiles de 44px con alto contraste.",
                },
                {
                  title: "The Component Gallery",
                  url: "https://component.gallery/",
                  badge: "Design Systems & Anatomía",
                  badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
                  description: "Índice y repositorio exhaustivo de componentes reales de interfaz extraídos de Design Systems de empresas globales (Shopify, Apple, IBM, etc.).",
                  usage: "Fase 2: Verificación de la anatomía, variantes, jerarquía y accesibilidad en modales, acordeones, tablas y menús.",
                },
              ].map((site, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-surface border border-border/80 hover:border-indigo-500/30 transition-all flex flex-col justify-between gap-4 shadow-sm group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                        <h3 className="font-bold text-white text-base">{site.title}</h3>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${site.badgeColor}`}>
                        {site.badge}
                      </span>
                    </div>

                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1.5 transition break-all"
                    >
                      <span>{site.url}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>

                    <p className="text-xs text-muted leading-relaxed">{site.description}</p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between flex-wrap gap-2 text-[11px]">
                    <span className="text-muted">
                      <strong className="text-muted">Aplicación:</strong> {site.usage}
                    </span>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] active:scale-95 text-foreground/90 transition font-semibold"
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
          <section id="herramientas" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Capítulo 4 · Arsenal de Habilidades</span>
              </div>
              <span className="text-[11px] font-mono text-muted">Instalado en ~/.agents/skills</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Catálogo de Skills y Comandos Globales
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Herramientas instaladas globalmente en el sistema operativo de Danniel para invocar de forma
                autónoma o mediante prompts específicos:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="p-5 rounded-3xl bg-surface border border-border/80 hover:border-indigo-500/30 transition-all flex flex-col justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base">{tool.name}</h3>
                      {onSelectPrompt && (
                        <button
                          onClick={() => onSelectPrompt(tool.promptId)}
                          className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 active:scale-95"
                          title="Usar este prompt en la bóveda"
                        >
                          <span>Usar Prompt</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <code className="text-xs text-indigo-300 font-mono block bg-black/40 px-2.5 py-1 rounded-lg border border-border/60">
                      {tool.cmd}
                    </code>
                    <p className="text-xs text-muted leading-relaxed">{tool.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-border/60 text-[11px] text-muted">
                    <strong className="text-muted">Cuándo aplicar:</strong> {tool.when}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: TOKENS & DESIGN.MD */}
          <section id="design-spec" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
                <Palette className="w-4 h-4" />
                <span>Capítulo 5 · Sistema de Tokens</span>
              </div>
              <span className="text-[11px] font-mono text-muted">Raíz del Proyecto</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Estructura Oficial de un `DESIGN.md`
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Tener un archivo <code>DESIGN.md</code> en la raíz del repositorio actúa como el único sistema de verdad.
                Evita que los modelos inventen estilos, colores arbitrarios o radios dispares sobre la marcha:
              </p>
            </div>

            <div className="relative bg-surface border border-border/80 rounded-3xl p-5 font-mono-code text-xs text-foreground/90 shadow-xl">
              <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-4">
                <div className="flex items-center gap-2 text-muted">
                  <Palette className="w-4 h-4 text-pink-400" />
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:scale-95 text-foreground/90 transition font-sans text-xs font-semibold"
                  title="Copiar plantilla DESIGN.md"
                >
                  {copiedCodeId === "design-md-spec" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado</span>
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
          <section id="emil-motion" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Capítulo 6 · Micro-Interacciones</span>
              </div>
              <span className="text-[11px] font-mono text-muted">180ms – 250ms máx</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Las 5 Reglas de Oro de Emil Kowalski
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Para que una web se sienta fluida, precisa y de gama alta (en lugar de lenta y artificial),
                las animaciones deben respetar estas cinco directrices fundamentales:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400 font-mono">1.</span>
                  <span>Curvas: ease-out al entrar, ease-in al salir</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  El ojo humano percibe como natural cuando un objeto entra rápido y frena suavemente (<code>ease-out</code>).
                  Usar <code>ease-in</code> al abrir menús o modales se siente pesado y perezoso.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400 font-mono">2.</span>
                  <span>Nunca escalar desde cero (scale 0)</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  En el mundo físico ningún objeto nace de un punto microscópico. Los modales y ventanas deben escalar
                  desde <code>scale(0.96)</code> o <code>scale(0.97)</code> con <code>opacity: 0</code> hacia <code>scale(1)</code>.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400 font-mono">3.</span>
                  <span>Techo estricto de duración: 180ms – 250ms</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Cualquier animación de más de 300ms en botones, menús o modales provoca fatiga cognitiva y hace sentir
                  lenta la app. Reserva duraciones mayores únicamente para transiciones de pantalla completa.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400 font-mono">4.</span>
                  <span>Feedback físico inmediato al presionar (:active)</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Todo botón debe responder al toque con <code>active:scale-[0.98]</code> y <code>transition: transform 100ms ease-out</code>.
                  El usuario debe sentir que los componentes tienen masa y resistencia física.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2 md:col-span-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400 font-mono">5.</span>
                  <span>Respeto inquebrantable a prefers-reduced-motion</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Usuarios con sensibilidad vestibular requieren la anulación de desplazamientos y zooms automáticos mediante
                  la media query estándar de CSS. En su lugar, utiliza fundidos suaves de opacidad (<code>opacity</code>).
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 7: APPLE HIG */}
          <section id="apple-hig" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Eye className="w-4 h-4" />
                <span>Capítulo 7 · Human Interface Guidelines</span>
              </div>
              <span className="text-[11px] font-mono text-muted">Apple HIG Ergonomics</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ergonomía Táctil y Fluidez Nativa (Apple HIG)
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                La interfaz debe sentirse como una extensión natural de la mano, con retroalimentación instantánea
                y materiales translúcidos que aportan jerarquía espacial:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="font-bold text-white text-sm">Área Táctil Mínima de 44x44 px</h3>
                <p className="text-xs text-muted leading-relaxed">
                  En dispositivos móviles ningún botón, enlace o ícono interactivo debe medir menos de 44x44px de área de contacto real,
                  incluso si el glifo visual mide 16px (usar padding invisible o <code>min-h-[44px] min-w-[44px]</code>).
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="font-bold text-white text-sm">Feedback en pointerdown</h3>
                <p className="text-xs text-muted leading-relaxed">
                  La reacción visual debe ocurrir en el microsegundo en que el dedo toca la pantalla, no al soltarlo (<code>click</code>).
                  La latencia percibida debe ser de 0 milisegundos.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="font-bold text-white text-sm">Materiales Translúcidos & Cristal Esmerilado</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Uso de fondos con <code>backdrop-blur-xl</code> en barras de navegación fijas y modales, permitiendo
                  intuir la profundidad y el contenido subyacente sin perder legibilidad.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="font-bold text-white text-sm">Manipulación Directa 1:1</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Cualquier gesto táctil (deslizamiento, drag & drop o apertura de cajones) debe seguir el dedo 1:1 y permitir
                  ser interrumpido o cancelado a mitad de camino sin bloquear la interfaz.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 8: PONYTAIL */}
          <section id="ponytail" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Scissors className="w-4 h-4" />
                <span>Capítulo 8 · The Lazy Senior Dev</span>
              </div>
              <span className="text-[11px] font-mono text-muted">-50% a -80% Código</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ponytail: Código Conciso y Zero-Bloat
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                La IA tiende al bloat: crea wrappers infinitos, importa librerías npm de 100KB para tareas que resuelve
                una sola línea de CSS y genera estados duplicados. Ponytail poda la sobre-ingeniería:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white">1. Pregunta antes de escribir: ¿Realmente se necesita?</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Aplica el principio YAGNI (<em>You Aren't Gonna Need It</em>). Elimina abstracciones prematuras y efectos
                  secundarios (<code>useEffect</code>) que solo sincronizan estados que podían calcularse en línea
                  con variables derivadas o <code>useMemo</code>.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white">2. Aprovecha las APIs Nativas de la Plataforma Web</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Usa <code>&lt;dialog&gt;</code> nativo con <code>showModal()</code>, <code>&lt;details&gt;</code> para acordeones,
                  <code>Intl.NumberFormat</code> para monedas, y selectores modernos de CSS (<code>:has()</code>, <code>@container</code>)
                  en lugar de dependencias npm pesadas.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white">3. Regla del Tamaño de Archivo</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Ningún componente de React debería superar las 250 líneas. Si supera ese límite, divídelo en subcomponentes
                  atómicos con responsabilidades únicas y contratos de tipado estrictos.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 9: IMPECCABLE & VERCEL */}
          <section id="impeccable" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Capítulo 9 · Auditoría de Calidad</span>
              </div>
              <span className="text-[11px] font-mono text-muted">Vercel Labs & Impeccable</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Pulido Impeccable & Directrices de Vercel Labs
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Antes de dar por finalizada una pantalla, audita visualmente contra las cuatro directrices
                de consistencia geométrica y accesibilidad:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>📐 Rejilla de 8pt Estricta</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Todos los márgenes, paddings y espaciados entre secciones deben seguir la escala de 4px / 8px:
                  <code>p-2 (8px), p-3 (12px), p-4 (16px), p-6 (24px), p-8 (32px), p-12 (48px)</code>.
                  Cero medidas arbitrarias como 13px o 27px.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>👁️ Contraste WCAG AA 4.5:1</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Todo texto debe superar la relación 4.5:1. En fondos oscuros (<code>#07090e</code>),
                  los títulos usan <code>#f8fafc</code> (100% contraste), las descripciones <code>#94a3b8</code> y
                  los metadatos <code>#64748b</code>.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>⌨️ Navegación por Teclado</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Nunca elimines el outline sin proveer un anillo accesible: usar{" "}
                  <code>focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:outline-none</code>{" "}
                  para navegación clara por tabulador.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🚫 Cero Truncamiento Involuntario</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  No cortes datos críticos con <code>truncate</code> a menos que proporciones un tooltip
                  o botón de expansión accesible para el usuario.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 10: PLAYWRIGHT */}
          <section id="playwright" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Capítulo 10 · Testing Autónomo E2E</span>
              </div>
              <span className="text-[11px] font-mono text-muted">Playwright Test Suite</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Pruebas Autónomas de Runtime con Playwright
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Antes de hacer deploy a producción, corre un script autónomo de Playwright para validar que la web
                funciona sin fallos en un navegador Chromium real:
              </p>
            </div>

            <div className="relative bg-surface border border-border/80 rounded-3xl p-5 font-mono-code text-xs text-foreground/90 shadow-xl">
              <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-4">
                <div className="flex items-center gap-2 text-muted font-sans">
                  <Terminal className="w-4 h-4 text-violet-400" />
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:scale-95 text-foreground/90 transition font-sans text-xs font-semibold"
                  title="Copiar script Playwright"
                >
                  {copiedCodeId === "playwright-script" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado</span>
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
          <section id="checklist" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Capítulo 11 · Auditoría de Producción</span>
              </div>
              <button
                onClick={resetChecklist}
                className="flex items-center gap-1.5 text-xs text-muted hover:text-rose-400 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar checklist</span>
              </button>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Checklist de 20 Puntos Pre-Lanzamiento
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  Marca cada punto verificado. Tu progreso se guarda automáticamente en este dispositivo.
                </p>
              </div>

              {/* Progress Summary Card */}
              <div className="flex items-center gap-3 bg-surface border border-border/80 px-5 py-3 rounded-2xl shadow-md">
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">
                    {checkedCount} de {checklist.length}
                  </span>
                  <span className="text-[11px] text-muted">Puntos Aprobados</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-extrabold text-emerald-400 text-base font-mono">
                  {progressPercent}%
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-white/[0.06] rounded-full overflow-hidden p-0.5 border border-border/60">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-muted">
                <span>0% Sin revisar</span>
                <span>50% Desarrollo avanzado</span>
                <span className="text-emerald-400 font-semibold">100% Ready for Production 🚀</span>
              </div>
            </div>

            {/* Checklist Filter Tabs */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setChecklistFilter("todos")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  checklistFilter === "todos"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white/[0.04] text-muted hover:text-white"
                }`}
              >
                Todos ({checklist.length})
              </button>
              <button
                onClick={() => setChecklistFilter("pendientes")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  checklistFilter === "pendientes"
                    ? "bg-amber-600/80 text-white shadow-xs"
                    : "bg-white/[0.04] text-muted hover:text-white"
                }`}
              >
                Pendientes ({checklist.length - checkedCount})
              </button>
              <button
                onClick={() => setChecklistFilter("completados")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  checklistFilter === "completados"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white/[0.04] text-muted hover:text-white"
                }`}
              >
                Completados ({checkedCount})
              </button>
            </div>

            {/* Interactive Checklist Cards */}
            <div className="space-y-2.5">
              {filteredChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 select-none active:scale-[0.99] ${
                    item.checked
                      ? "bg-emerald-950/25 border-emerald-500/35 text-emerald-100"
                      : "bg-surface border-border/70 text-muted hover:border-border"
                  }`}
                >
                  <div className="shrink-0">
                    {item.checked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-muted" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between gap-3">
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      <strong className="text-muted font-mono mr-2">#{item.id}</strong>
                      {item.text}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/[0.06] text-muted shrink-0">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 12: DESPLIEGUE EN CLOUDFLARE */}
          <section id="deploy" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Cloud className="w-4 h-4" />
                <span>Capítulo 12 · Infraestructura & Edge</span>
              </div>
              <span className="text-[11px] font-mono text-muted">Cloudflare Workers Assets</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Despliegue Global en Cloudflare Workers & D1
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Todo proyecto de Danniel se publica de manera ultra-rápida y con latencia mínima en la red
                perimetral de Cloudflare utilizando Workers Static Assets y base de datos D1:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-orange-400 font-mono">1.</span>
                  <span>Compilación de TypeScript & Vite</span>
                </h3>
                <p className="text-xs text-muted">
                  Genera los archivos optimizados en la carpeta <code>dist/</code>:
                </p>
                <code className="text-xs font-mono bg-black/40 px-3 py-1.5 rounded-xl text-indigo-300 block border border-border/60">
                  npm run build
                </code>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-orange-400 font-mono">2.</span>
                  <span>Configuración en wrangler.jsonc</span>
                </h3>
                <p className="text-xs text-muted">
                  Asegúrate de declarar los activos estáticos y el custom domain:
                </p>
                <pre className="text-xs font-mono bg-black/40 p-3.5 rounded-xl text-muted overflow-x-auto border border-border/60">
{`"assets": {
  "directory": "./dist",
  "not_found_handling": "single-page-application"
},
"routes": [
  { "pattern": "tudominio.dannieldev.com", "custom_domain": true }
]`}
                </pre>
              </div>

              <div className="p-5 rounded-3xl bg-surface border border-border/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-orange-400 font-mono">3.</span>
                  <span>Publicación Instantánea</span>
                </h3>
                <p className="text-xs text-muted">
                  Ejecuta Wrangler para subir únicamente los archivos modificados a la red mundial en menos de 3 segundos:
                </p>
                <code className="text-xs font-mono bg-black/40 px-3 py-1.5 rounded-xl text-emerald-300 block border border-border/60">
                  npx wrangler deploy
                </code>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/30 via-[#0c101d] to-violet-950/30 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">¿Listo para comenzar a construir?</h3>
                <p className="text-xs text-muted">
                  Abre la Bóveda de Prompts y ejecuta el Protocolo de Inicio con tu asistente.
                </p>
              </div>
              <button
                onClick={onNavigateToPrompts}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition active:scale-95 shadow-md shadow-indigo-600/30 shrink-0 flex items-center gap-2"
              >
                <span>Ir a la Bóveda de Prompts</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/60 py-6 px-4 text-center text-xs text-muted mt-auto bg-background/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-muted">📖 Manual Web Anti-Genérica</span>
            <span>·</span>
            <span>Estándar de ingeniería @dannieldev</span>
          </div>
          <div className="flex items-center gap-4 text-muted text-[11px]">
            <span>Cloudflare Workers + D1</span>
            <span>·</span>
            <span>11 Capítulos Técnicos</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
