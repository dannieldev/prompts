import React, { useState, useEffect } from "react";
import {
  X,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Layers,
  Palette,
  Zap,
  ShieldCheck,
  Terminal,
  Cloud,
  Scissors,
  Eye,
  CheckSquare,
  Square,
  RotateCcw,
} from "lucide-react";

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SectionKey =
  | "filosofia"
  | "fases"
  | "herramientas"
  | "design-spec"
  | "emil-motion"
  | "apple-hig"
  | "ponytail"
  | "impeccable"
  | "playwright"
  | "checklist"
  | "deploy";

interface SectionNavItem {
  id: SectionKey;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const NAV_ITEMS: SectionNavItem[] = [
  { id: "filosofia", label: "Filosofía Anti-Slop", icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
  { id: "fases", label: "Flujo en 7 Fases", icon: <Layers className="w-4 h-4 text-indigo-400" />, badge: "Ruta" },
  { id: "herramientas", label: "Catálogo de Skills", icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
  { id: "design-spec", label: "Tokens & DESIGN.md", icon: <Palette className="w-4 h-4 text-pink-400" /> },
  { id: "emil-motion", label: "Motion & Emil Kowalski", icon: <Zap className="w-4 h-4 text-sky-400" /> },
  { id: "apple-hig", label: "Ergonomía Apple HIG", icon: <Eye className="w-4 h-4 text-indigo-300" /> },
  { id: "ponytail", label: "Código Ponytail (Zero-Bloat)", icon: <Scissors className="w-4 h-4 text-amber-300" /> },
  { id: "impeccable", label: "Pulido Impeccable & Vercel", icon: <ShieldCheck className="w-4 h-4 text-rose-400" /> },
  { id: "playwright", label: "Pruebas con Playwright", icon: <Terminal className="w-4 h-4 text-violet-400" /> },
  { id: "checklist", label: "Checklist de 20 Puntos", icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, badge: "Interactivo" },
  { id: "deploy", label: "Despliegue Cloudflare", icon: <Cloud className="w-4 h-4 text-orange-400" /> },
];

const INITIAL_CHECKLIST = [
  { id: 1, text: "Página 404 personalizada con diseño de marca y botón de retorno al Home", checked: false },
  { id: 2, text: "Diseño Responsive total probado en 375px (iPhone), 768px (iPad) y 1440px (Desktop)", checked: false },
  { id: 3, text: "Enlaces verificados: 0 enlaces rotos o huérfanos apuntando a '#'", checked: false },
  { id: 4, text: "Validación de formularios con mensajes de error visuales y feedback de envío", checked: false },
  { id: 5, text: "Loading states (skeletons o spinners sutiles) en peticiones asíncronas", checked: false },
  { id: 6, text: "Manejo amigable de errores si una API o servicio externo falla", checked: false },
  { id: 7, text: "SEO semántico estricto (h1 único, h2, h3, nav, main, article, footer)", checked: false },
  { id: 8, text: "Meta description única (150-160 caracteres) optimizada en cada vista", checked: false },
  { id: 9, text: "Títulos únicos en formato 'Página | Marca' (<title>)", checked: false },
  { id: 10, text: "sitemap.xml accesible en la raíz para indexación de Google", checked: false },
  { id: 11, text: "robots.txt configurado apuntando al sitemap oficial", checked: false },
  { id: 12, text: "Alt text descriptivo obligatorio en todas las imágenes", checked: false },
  { id: 13, text: "Open Graph Tags completos (og:title, og:description, og:image 1200x630, twitter:card)", checked: false },
  { id: 14, text: "Favicon set completo: favicon.ico, favicon.svg y apple-touch-icon.png", checked: false },
  { id: 15, text: "HTTPS forzado con cabeceras de seguridad activas (HSTS, nosniff)", checked: false },
  { id: 16, text: "Telemetría/Analytics ligero (Cloudflare Web Analytics o Plausible) sin ralentizar", checked: false },
  { id: 17, text: "Optimización de imágenes en WebP o AVIF con loading='lazy' bajo el pliegue", checked: false },
  { id: 18, text: "Accesibilidad (a11y): Contraste mínimo 4.5:1 y navegación completa por teclado (focus-visible)", checked: false },
  { id: 19, text: "Consola de DevTools limpia sin excepciones no controladas de JavaScript ni warnings", checked: false },
  { id: 20, text: "Core Web Vitals en verde: LCP < 2.5s, INP < 200ms y CLS < 0.1", checked: false },
];

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeSection, setActiveSection] = useState<SectionKey>("filosofia");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  // Load checklist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dannieldev_web_checklist_v1");
      if (saved) {
        setChecklist(JSON.parse(saved));
      }
    } catch {}
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
    setChecklist(INITIAL_CHECKLIST);
    try {
      localStorage.removeItem("dannieldev_web_checklist_v1");
    } catch {}
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Keyboard shortcut Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const checkedCount = checklist.filter((i) => i.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#0c101d] border border-white/[0.1] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-enter">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0e1424]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-600 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-500/25 text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  Manual de Creación Web Anti-Genérica con IA
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  Guía Maestra
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Metodología, catálogo de skills, física de interacción y checklist de producción
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] active:scale-95 rounded-xl transition"
            aria-label="Cerrar documentación"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Columns (Sidebar Nav + Content) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#090d18] p-3 overflow-y-auto shrink-0 flex md:flex-col gap-1">
            <span className="hidden md:block px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Contenido del Manual
            </span>

            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left active:scale-[0.98] ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/35 shadow-xs"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-indigo-500/30 text-indigo-200"
                          : "bg-white/[0.06] text-slate-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0b0f1a] text-slate-200 text-sm leading-relaxed">
            {/* SECTION 1: FILOSOFÍA */}
            {activeSection === "filosofia" && (
              <div className="flex flex-col gap-5 max-w-4xl">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Principio Fundamental</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Criterio sobre Generación: La Muerte del "AI Slop"
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  La Inteligencia Artificial no diseña mal por falta de capacidad técnica, sino por <strong>falta de restricciones, referencias del mundo real y reglas explícitas</strong>. Cuando a un modelo le dices simplemente <em>"créame una web bonita"</em>, recurre al promedio aritmético de su base de entrenamiento:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                  <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-500/25">
                    <h4 className="text-rose-300 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      ❌ Lo que hace la IA por defecto (AI Slop)
                    </h4>
                    <ul className="text-xs text-rose-200/80 space-y-1.5 list-disc pl-4">
                      <li>Degradados violetas/azules saturados genéricos.</li>
                      <li>Héroe centrado con texto gigante sobre malla oscura idéntica.</li>
                      <li>Tres tarjetas flotantes idénticas sin jerarquía de contenido.</li>
                      <li>Tipografía Roboto o Inter sin emparejamientos con carácter.</li>
                      <li>Animaciones lentas de 800ms que hacen sentir la interfaz pesada.</li>
                      <li>Cero validación de enlaces, contrastes ni áreas táctiles.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/25">
                    <h4 className="text-emerald-300 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      ✅ El Estándar Senior Anti-Genérico
                    </h4>
                    <ul className="text-xs text-emerald-200/80 space-y-1.5 list-disc pl-4">
                      <li>Brief inferido y 3 diales calibrados (Varianza, Movimiento, Densidad).</li>
                      <li>Tokens reales de marcas de clase mundial con un archivo <code>DESIGN.md</code>.</li>
                      <li>Layouts asimétricos, Bento Grids y micro-bordes elegantes (<code>border-white/[0.08]</code>).</li>
                      <li>Micro-interacciones de 180-250ms con físicas de resorte (Emil Kowalski).</li>
                      <li>Botones con tap target de 44px (Apple HIG) y contraste WCAG 4.5:1.</li>
                      <li>Reducción de código (Ponytail) y verificación autónoma con Playwright.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#07090e] border border-white/[0.08] p-4 rounded-2xl">
                  <h4 className="text-sm font-bold text-white mb-2">Protocolo de Trabajo Obligatorio con Danniel</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Antes de escribir una sola línea de código en un nuevo sitio web, el agente <strong>no asume requerimientos a ciegas</strong>. Primero diagnostica el modo de superficie (<em>Persuade, Operate, Read o Experience</em>) y te propone un combo calibrado de 2 a 4 herramientas para que juntos validen la dirección estética antes del primer componente.
                  </p>
                </div>
              </div>
            )}

            {/* SECTION 2: FASES DE DESARROLLO */}
            {activeSection === "fases" && (
              <div className="flex flex-col gap-6 max-w-4xl">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>Metodología de Ejecución</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  El Flujo Maestro de 7 Fases
                </h3>
                <p className="text-slate-300">
                  Cada sitio web desarrollado con IA debe seguir este orden lineal estricto para garantizar un resultado de clase mundial:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      fase: "Fase 0: Brief Inference & Diagnóstico de Superficie",
                      desc: "Definir para quién es la web y cuál es su objetivo. Identificar si es 'Persuade' (Landing de conversión), 'Operate' (SaaS/Dashboard), 'Read' (Blog/Documentación) o 'Experience' (Showcase inmersivo).",
                      tools: "taste-skill / Protocolo de Arranque",
                    },
                    {
                      fase: "Fase 1: Especificación de Tokens & DESIGN.md",
                      desc: "Establecer la paleta cromática exacta, pareja tipográfica, espaciados y radios. Si se emula una marca top (Stripe, Linear, Apple), se genera el archivo DESIGN.md.",
                      tools: "getdesign.md / brandkit / DESIGN.md",
                    },
                    {
                      fase: "Fase 2: Arquitectura de Componentes & Layout",
                      desc: "Construcción del layout mobile-first. Inyección de Bento Grid, tarjetas con elevación sutil y jerarquía de texto donde el 100% de la información crítica sea legible.",
                      tools: "uipro-cli / 21st.dev / Tailwind v4",
                    },
                    {
                      fase: "Fase 3: Motion & Micro-Interacciones Físicas",
                      desc: "Añadir retroalimentación táctil inmediata al presionar (:active), transiciones fluidas de 180-250ms con curvas ease-out y soporte a prefers-reduced-motion.",
                      tools: "emil-design-eng / Framer Motion / Sonner",
                    },
                    {
                      fase: "Fase 4: Poda de Código & Simplicidad Nativa",
                      desc: "Revisar el código generado. Eliminar librerías innecesarias, wrappers redundantes y reemplazar lógica pesada por APIs nativas de HTML5 y CSS.",
                      tools: "ponytail / ponytail-audit",
                    },
                    {
                      fase: "Fase 5: Pulido de Craft & Anti-Patrones",
                      desc: "Inspeccionar con 60+ detectores: alinear ópticamente íconos, revisar contrastes WCAG AA (4.5:1), eliminar bordes toscos y verificar tap targets de 44px.",
                      tools: "impeccable / web-design-guidelines / apple-design",
                    },
                    {
                      fase: "Fase 6: Verificación en Navegador & Pre-Lanzamiento",
                      desc: "Correr pruebas autónomas con Playwright para asegurar 0 enlaces rotos, 0 errores en consola de JavaScript y pasar el Checklist de 20 Puntos antes de desplegar.",
                      tools: "Playwright / Checklist de 20 Puntos / Cloudflare Wrangler",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08] hover:border-indigo-500/30 transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-xs font-mono font-bold">
                            {idx}
                          </span>
                          <span>{item.fase}</span>
                        </h4>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                          {item.tools}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 pl-8">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: CATÁLOGO DE HERRAMIENTAS */}
            {activeSection === "herramientas" && (
              <div className="flex flex-col gap-6 max-w-4xl">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>Inventario Global</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Catálogo de Skills y Comandos Instalados
                </h3>
                <p className="text-slate-300">
                  Todas las herramientas se encuentran instaladas globalmente en <code>~/.agents/skills/</code> y disponibles para ejecución directa:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Taste Skill",
                      repo: "Leonxlnx/taste-skill",
                      desc: "Infiere brief, vibra y tono estético. Evita el inicio genérico con los 3 diales de varianza.",
                      when: "Fase 0 de cualquier sitio nuevo.",
                    },
                    {
                      name: "getdesign.md",
                      repo: "npx getdesign@latest add <brand>",
                      desc: "Descarga tokens oficiales de diseño (Stripe, Linear, Apple, Vercel) en un archivo DESIGN.md.",
                      when: "Cuando se busca emular una marca global.",
                    },
                    {
                      name: "UI/UX Pro Max",
                      repo: "uipro-cli (uipro init --ai <agent>)",
                      desc: "Base de inteligencia de diseño con 60+ estilos UI, paletas y emparejamientos tipográficos.",
                      when: "Para inyectar sistemas de diseño sólidos.",
                    },
                    {
                      name: "Emil Kowalski Skills",
                      repo: "emilkowalski/skills (emil-design-eng)",
                      desc: "Físicas de resorte, curvas ease-out, topes de 200-250ms y accesibilidad de motion.",
                      when: "Al codificar animaciones, modales o menús.",
                    },
                    {
                      name: "Apple Design Skill",
                      repo: "dickwu/apple-design-skill",
                      desc: "Auditor de 17 principios de Human Interface Guidelines: tap targets de 44px, tactile feedback.",
                      when: "Para apps web, dashboards y vistas móviles.",
                    },
                    {
                      name: "Ponytail",
                      repo: "DietrichGebert/ponytail",
                      desc: "The Lazy Senior Dev: reduce el código entre 50% y 80% usando APIs nativas de la web.",
                      when: "Para evitar sobre-ingeniería y bloat.",
                    },
                    {
                      name: "Impeccable Design",
                      repo: "pbakaus/impeccable",
                      desc: "60+ detectores deterministas para eliminar AI slop, arreglar alineaciones y contrastes.",
                      when: "Antes de dar por finalizada una pantalla.",
                    },
                    {
                      name: "Web Design Guidelines",
                      repo: "vercel-labs/agent-skills",
                      desc: "Audita contra las reglas de Vercel: rejilla de 8pt, contraste WCAG AA 4.5:1, foco accesible.",
                      when: "Revisión final de código y accesibilidad.",
                    },
                    {
                      name: "Scroll World",
                      repo: "oso95/scroll-world",
                      desc: "Motor de scroll-scrubbing Apple Showcase o Shopify Editions con cámara 3D diorama continua.",
                      when: "Para lanzamientos o landing pages inmersivas.",
                    },
                    {
                      name: "Playwright CLI / MCP",
                      repo: "npx playwright test",
                      desc: "Crawler autónomo que abre Chrome en local, valida enlaces, formularios y consola JS.",
                      when: "Pre-lanzamiento en runtime real.",
                    },
                  ].map((tool, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08] flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-bold text-white text-sm">{tool.name}</h4>
                        </div>
                        <code className="text-[10px] text-indigo-300 font-mono block mb-2 opacity-90">
                          {tool.repo}
                        </code>
                        <p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-white/[0.06] text-[11px] text-slate-500">
                        <strong className="text-slate-400">Cuándo usar:</strong> {tool.when}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 4: TOKENS Y DESIGN.MD */}
            {activeSection === "design-spec" && (
              <div className="flex flex-col gap-5 max-w-4xl">
                <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
                  <Palette className="w-4 h-4" />
                  <span>Tokens & Sistema de Diseño</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Estructura Oficial de un `DESIGN.md`
                </h3>
                <p className="text-slate-300">
                  El archivo <code>DESIGN.md</code> en la raíz del proyecto evita que la IA invente tokens sobre la marcha. Debe contener exactamente esta estructura:
                </p>

                <div className="relative bg-[#07090e] border border-white/[0.08] rounded-2xl p-4 font-mono-code text-xs text-slate-200">
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
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:scale-95 text-slate-300 transition"
                    title="Copiar plantilla DESIGN.md"
                  >
                    {copiedCodeId === "design-md-spec" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto whitespace-pre">
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
              </div>
            )}

            {/* SECTION 5: EMIL KOWALSKI MOTION */}
            {activeSection === "emil-motion" && (
              <div className="flex flex-col gap-5 max-w-4xl">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  <span>Físicas de Interacción</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Las 5 Reglas de Oro de Emil Kowalski
                </h3>
                <p className="text-slate-300">
                  Para que una web se sienta fluida y de gama alta (no artificial ni lenta), las animaciones deben cumplir estas directrices:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">1. Curvas: ease-out para entrar, ease-in para salir</h4>
                    <p className="text-xs text-slate-400">
                      El cerebro percibe como natural cuando algo entra rápido y frena suavemente (<code>ease-out</code>). El <code>ease-in</code> al abrir modales se siente pesado y perezoso.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">2. Nunca escalar desde cero (scale 0)</h4>
                    <p className="text-xs text-slate-400">
                      En el mundo físico, los objetos no nacen de un punto microscópico. Los modales y menús deben escalar desde <code>scale(0.96)</code> o <code>scale(0.97)</code> con <code>opacity: 0</code> hacia <code>scale(1)</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">3. Techo estricto de duración: 180ms – 250ms</h4>
                    <p className="text-xs text-slate-400">
                      Animaciones de más de 300ms en botones, menús o modales provocan fatiga cognitiva y hacen sentir la aplicación lenta. Reserva duraciones mayores sólo para transiciones de página completas.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">4. Feedback físico al presionar (:active)</h4>
                    <p className="text-xs text-slate-400">
                      Todo botón debe responder al toque en el puntero con <code>transform: scale(0.97)</code> o <code>scale(0.98)</code> y <code>transition: transform 100ms ease-out</code>. El usuario debe sentir que la interfaz tiene masa física.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">5. Respeto inquebrantable a prefers-reduced-motion</h4>
                    <p className="text-xs text-slate-400">
                      Usuarios con sensibilidad vestibular necesitan desactivación de desplazamientos y zooms automáticos mediante la media query estándar de CSS.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 6: APPLE HIG */}
            {activeSection === "apple-hig" && (
              <div className="flex flex-col gap-5 max-w-4xl">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  <span>Human Interface Guidelines</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Ergonomía Táctil y Fluidez Nativa (Apple HIG)
                </h3>
                <p className="text-slate-300">
                  La filosofía de Apple establece que la interfaz debe sentirse como una extensión natural de la mano:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="font-bold text-white text-sm mb-1.5">Área Táctil Mínima de 44x44 px</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      En dispositivos táctiles o móviles, ningún botón, enlace o ícono interactivo debe tener menos de 44x44px de área de contacto real, incluso si el ícono visual mide 16px (usar padding invisible o <code>min-h-[44px] min-w-[44px]</code>).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="font-bold text-white text-sm mb-1.5">Feedback en pointerdown</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      El feedback debe suceder en el instante en que el dedo toca la pantalla, no al soltarlo (<code>click</code>). La latencia percibida debe ser de 0 milisegundos.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="font-bold text-white text-sm mb-1.5">Materiales Traslúcidos & Desenfoque</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Uso de materiales translúcidos con <code>backdrop-blur-xl</code> (cristal esmerilado) para cabeceras y modales, permitiendo intuir la profundidad y el contenido que queda debajo.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="font-bold text-white text-sm mb-1.5">Manipulación Directa 1:1</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Los gestos (deslizamiento, scroll o modales emergentes) deben seguir 1:1 el dedo y permitir ser interrumpidos o revertidos a mitad del movimiento sin trabas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 7: PONYTAIL */}
            {activeSection === "ponytail" && (
              <div className="flex flex-col gap-5 max-w-4xl">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Scissors className="w-4 h-4" />
                  <span>The Lazy Senior Dev</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Ponytail: Código Conciso y Zero-Bloat
                </h3>
                <p className="text-slate-300">
                  La IA suele escribir código redundante: wrappers infinitos, librerías innecesarias de 80KB para tareas simples y estados duplicados. Ponytail reduce el código entre un <strong>54% y 94%</strong>:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">1. Pregunta antes de escribir: ¿Realmente se necesita?</h4>
                    <p className="text-xs text-slate-400">
                      Aplica el principio YAGNI (<em>You Aren't Gonna Need It</em>). Elimina abstracciones prematuras, wrappers inútiles y efectos secundarios (<code>useEffect</code>) que solo sincronizan estados que podían calcularse en línea (<code>useMemo</code> o variables derivadas).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">2. Aprovecha las APIs Nativas de la Plataforma Web</h4>
                    <p className="text-xs text-slate-400">
                      Usa <code>&lt;dialog&gt;</code> nativo con <code>showModal()</code>, <code>&lt;details&gt;</code> para acordeones, <code>Intl.NumberFormat</code> para monedas, y CSS moderno (<code>:has()</code>, <code>@container</code>) en lugar de dependencias npm pesadas.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">3. Regla del Tamaño de Archivo</h4>
                    <p className="text-xs text-slate-400">
                      Ningún componente de React debería superar las 250 líneas. Si supera ese límite, divídelo en piezas atómicas con responsabilidades únicas y contratos de tipado claros.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 8: IMPECCABLE & VERCEL */}
            {activeSection === "impeccable" && (
              <div className="flex flex-col gap-5 max-w-4xl">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Auditoría de Calidad</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Pulido Impeccable & Directrices de Vercel Labs
                </h3>
                <p className="text-slate-300">
                  Antes de publicar, revisa tu interfaz contra las 4 directrices visuales no negociables:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">📐 Rejilla de 8pt Estricta</h4>
                    <p className="text-xs text-slate-400">
                      Todos los márgenes, paddings y espaciados entre secciones deben seguir la escala de 4px / 8px: <code>p-2 (8px), p-3 (12px), p-4 (16px), p-6 (24px), p-8 (32px), p-12 (48px)</code>. Cero medidas arbitrarias como 13px o 27px.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">👁️ Contraste WCAG AA 4.5:1 Obligatorio</h4>
                    <p className="text-xs text-slate-400">
                      Todo texto legible debe superar la relación de contraste 4.5:1. En fondos oscuros (<code>#07090e</code>), los títulos deben usar <code>#f8fafc</code> (100% contraste), las descripciones <code>#94a3b8</code> y los metadatos <code>#64748b</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">⌨️ Navegación por Teclado & focus-visible</h4>
                    <p className="text-xs text-slate-400">
                      Nunca elimines el outline sin proveer un anillo accesible: usar <code>focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:outline-none</code> para que los usuarios con tabulador vean claramente dónde están situados.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1">🚫 Prevención de Truncamiento Involuntario</h4>
                    <p className="text-xs text-slate-400">
                      No cortes datos críticos con <code>truncate</code> a menos que proporciones un tooltip o botón de expansión accesible.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 9: PLAYWRIGHT */}
            {activeSection === "playwright" && (
              <div className="flex flex-col gap-5 max-w-4xl">
                <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>Automatización E2E</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Pruebas Autónomas de Runtime con Playwright
                </h3>
                <p className="text-slate-300">
                  Antes de hacer deploy a producción, corre un script autónomo de Playwright para validar que la web funciona en un navegador real:
                </p>

                <div className="relative bg-[#07090e] border border-white/[0.08] rounded-2xl p-4 font-mono-code text-xs text-slate-200">
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
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:scale-95 text-slate-300 transition"
                    title="Copiar script de Playwright"
                  >
                    {copiedCodeId === "playwright-script" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="overflow-x-auto whitespace-pre">
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
              </div>
            )}

            {/* SECTION 10: CHECKLIST INTERACTIVO */}
            {activeSection === "checklist" && (
              <div className="flex flex-col gap-5 max-w-4xl">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Auditoría de Producción</span>
                  </div>
                  <button
                    onClick={resetChecklist}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reiniciar checklist</span>
                  </button>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      Checklist de 20 Puntos Pre-Lanzamiento
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Marca cada punto completado para validar que la web está lista para producción.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-[#07090e] border border-white/[0.08] px-4 py-2 rounded-2xl">
                    <div className="text-right">
                      <span className="text-xs font-bold text-white block">
                        {checkedCount} de 20
                      </span>
                      <span className="text-[10px] text-slate-400">Puntos verificados</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-extrabold text-emerald-400 text-sm">
                      {progressPercent}%
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Checklist Interactive Items */}
                <div className="space-y-2 mt-2">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 select-none active:scale-[0.99] ${
                        item.checked
                          ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                          : "bg-[#07090e] border-white/[0.07] text-slate-300 hover:border-white/[0.15]"
                      }`}
                    >
                      <div className="shrink-0">
                        {item.checked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                      <span className="text-xs font-semibold leading-relaxed flex-1">
                        <strong className="text-slate-400 font-mono mr-2">#{item.id}</strong>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 11: DEPLOY CLOUDFLARE */}
            {activeSection === "deploy" && (
              <div className="flex flex-col gap-5 max-w-4xl">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                  <Cloud className="w-4 h-4" />
                  <span>Infraestructura & Despliegue</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Despliegue Global en Cloudflare Workers & D1
                </h3>
                <p className="text-slate-300">
                  Todo sitio web de Danniel se publica de forma ultra-rápida en la red perimetral de Cloudflare utilizando Cloudflare Workers Static Assets:
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1.5">1. Compilación del Proyecto</h4>
                    <p className="text-xs text-slate-400 mb-2">
                      Compila TypeScript y Vite para generar los activos en la carpeta <code>dist/</code>:
                    </p>
                    <code className="text-xs font-mono bg-black/50 px-3 py-1.5 rounded-lg text-indigo-300 block">
                      npm run build
                    </code>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1.5">2. Configuración en `wrangler.jsonc`</h4>
                    <p className="text-xs text-slate-400 mb-2">
                      Asegúrate de que el archivo declare los activos estáticos y el custom domain:
                    </p>
                    <pre className="text-xs font-mono bg-black/50 p-3 rounded-lg text-slate-300 overflow-x-auto">
{`"assets": {
  "directory": "./dist",
  "not_found_handling": "single-page-application"
},
"routes": [
  { "pattern": "tudominio.dannieldev.com", "custom_domain": true }
]`}
                    </pre>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08]">
                    <h4 className="text-sm font-bold text-white mb-1.5">3. Despliegue con 1 Comando</h4>
                    <p className="text-xs text-slate-400 mb-2">
                      Ejecuta Wrangler para subir los activos modificados en segundos:
                    </p>
                    <code className="text-xs font-mono bg-black/50 px-3 py-1.5 rounded-lg text-emerald-300 block">
                      npx wrangler deploy
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
