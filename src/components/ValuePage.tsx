import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  ShieldCheck,
  FileText,
  Video,
  GitBranch,
  Search,
  Zap,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  RotateCcw,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Award,
  CheckCircle,
  XCircle,
  Scale,
  Code2,
} from "lucide-react";
import { Button, Chip } from "@heroui/react";

interface ValuePageProps {
  onNavigateToPrompts: () => void;
  onNavigateToManual: () => void;
  onSelectPrompt?: (promptId: string) => void;
  onAddToast: (text: string, type?: "success" | "error" | "info") => void;
}

interface ValueChecklistItem {
  id: number;
  category: "Estrategia & UX" | "Documentación" | "Capacitación" | "Código & Git" | "SEO" | "Performance & Seguridad" | "Soporte";
  title: string;
  detail: string;
  checked: boolean;
}

interface ValueSection {
  id: string;
  title: string;
  group: string;
  icon: React.ReactNode;
}

const INITIAL_VALUE_CHECKLIST: ValueChecklistItem[] = [
  {
    id: 1,
    category: "Estrategia & UX",
    title: "Propuesta UX/UI orientada a conversión real",
    detail: "Arquitectura de información, jerarquía visual, psicología del color y flujo guiado hacia compra, llamada o WhatsApp.",
    checked: false,
  },
  {
    id: 2,
    category: "Estrategia & UX",
    title: "Diseño responsive sin desbordamiento (320px a 1440px)",
    detail: "Áreas táctiles mínimas de 44px (Apple HIG), tipografía legible y pruebas en pantallas estrechas sin scroll horizontal.",
    checked: false,
  },
  {
    id: 3,
    category: "Estrategia & UX",
    title: "Microinteracciones fluidas y contraste accesible",
    detail: "Físicas de resorte de 180–250ms, estados hover/active perceptibles y contraste WCAG AA 4.5:1 verificado.",
    checked: false,
  },
  {
    id: 4,
    category: "Documentación",
    title: "Especificación técnica modular por componentes",
    detail: "Documento en Markdown o PDF que detalla arquitectura, componentes, dependencias y estructura de datos (cero cajas negras).",
    checked: false,
  },
  {
    id: 5,
    category: "Documentación",
    title: "Guía de variables de entorno y despliegue",
    detail: "Manual paso a paso para desplegar en staging/producción y configurar credenciales con total soberanía tecnológica.",
    checked: false,
  },
  {
    id: 6,
    category: "Capacitación",
    title: "Biblioteca de video-tutoriales operativos (Loom/privado)",
    detail: "Grabaciones en video explicando cómo actualizar textos, subir productos, publicar posts y gestionar formularios.",
    checked: false,
  },
  {
    id: 7,
    category: "Capacitación",
    title: "Cheatsheet de administración para el equipo del cliente",
    detail: "Guía de 1 página para que el cliente opere su web diariamente sin depender del programador para cada cambio menor.",
    checked: false,
  },
  {
    id: 8,
    category: "Código & Git",
    title: "Repositorio oficial en GitHub transferido al cliente",
    detail: "Organización o cuenta del cliente como propietaria formal del código fuente, garantizando su propiedad intelectual.",
    checked: false,
  },
  {
    id: 9,
    category: "Código & Git",
    title: "Historial de commits auditables (Conventional Commits)",
    detail: "Historial profesional de git que registra quién hizo cada cambio, cuándo y por qué, listo para auditoría y escalabilidad.",
    checked: false,
  },
  {
    id: 10,
    category: "SEO",
    title: "Semántica HTML5 estricta y jerarquía de encabezados",
    detail: "Uso riguroso de header, nav, main, article, footer, h1 único por vista y atributos aria-* donde se requiera.",
    checked: false,
  },
  {
    id: 11,
    category: "SEO",
    title: "Metadatos OpenGraph (1200x630) y Twitter Cards",
    detail: "Previsualizaciones elegantes y profesionales al compartir enlaces en WhatsApp, Telegram, LinkedIn y Twitter.",
    checked: false,
  },
  {
    id: 12,
    category: "SEO",
    title: "sitemap.xml y robots.txt indexables en Google",
    detail: "Archivos canónicos generados dinámicamente y validados en Google Search Console para indexación rápida.",
    checked: false,
  },
  {
    id: 13,
    category: "Performance & Seguridad",
    title: "Core Web Vitals en verde (Google PageSpeed 90-100)",
    detail: "LCP < 2.5s, INP < 200ms y CLS < 0.1 en dispositivos móviles con red 4G simulada.",
    checked: false,
  },
  {
    id: 14,
    category: "Performance & Seguridad",
    title: "Optimización de assets (WebP/AVIF y Lazy Loading)",
    detail: "Imágenes comprimidas, carga perezosa bajo el pliegue y fuentes auto-hospedadas sin flash de contenido sin estilo.",
    checked: false,
  },
  {
    id: 15,
    category: "Performance & Seguridad",
    title: "Certificado SSL/TLS forzado y cabeceras de seguridad",
    detail: "HTTPS estricto con HSTS, nosniff, frame-ancestors y protección perimetral activa vía Cloudflare.",
    checked: false,
  },
  {
    id: 16,
    category: "Soporte",
    title: "Propuesta formal de Retainer mensual ($100-$300+ USD)",
    detail: "Contrato de mantenimiento preventivo continuo que transforma un cobro puntual en una relación de negocio recurrente.",
    checked: false,
  },
  {
    id: 17,
    category: "Soporte",
    title: "Backups automáticos externos y monitoreo de uptime 24/7",
    detail: "Copias de seguridad periódicas y alertas inmediatas ante caídas de servidor o errores de infraestructura.",
    checked: false,
  },
  {
    id: 18,
    category: "Soporte",
    title: "Bolsa de horas de acompañamiento y parches técnicos",
    detail: "Actualización periódica de librerías, parches de seguridad y tiempo reservado para mejoras continuas.",
    checked: false,
  },
];

const VALUE_SECTIONS: ValueSection[] = [
  { id: "la-falacia", title: "1. La falacia del sitio barato", group: "Fundamento & Problema", icon: <AlertTriangle className="w-4 h-4 text-accent" /> },
  { id: "pilar-ux", title: "2. Pilar 1: Estrategia UX/UI", group: "Los 7 Pilares ($1k+)", icon: <Sparkles className="w-4 h-4 text-accent" /> },
  { id: "pilar-docs", title: "3. Pilar 2: Documentación modular", group: "Los 7 Pilares ($1k+)", icon: <FileText className="w-4 h-4 text-accent" /> },
  { id: "pilar-capacitacion", title: "4. Pilar 3: Capacitación en video", group: "Los 7 Pilares ($1k+)", icon: <Video className="w-4 h-4 text-accent" /> },
  { id: "pilar-git", title: "5. Pilar 4: Repositorio GitHub", group: "Los 7 Pilares ($1k+)", icon: <GitBranch className="w-4 h-4 text-accent" /> },
  { id: "pilar-seo", title: "6. Pilar 5: SEO Técnico On-Page", group: "Los 7 Pilares ($1k+)", icon: <Search className="w-4 h-4 text-accent" /> },
  { id: "pilar-cwv", title: "7. Pilar 6: Performance & Seguridad", group: "Los 7 Pilares ($1k+)", icon: <Zap className="w-4 h-4 text-accent" /> },
  { id: "pilar-retainer", title: "8. Pilar 7: Soporte & Retainer", group: "Los 7 Pilares ($1k+)", icon: <Clock className="w-4 h-4 text-accent" /> },
  { id: "comparativa", title: "9. Tabla: $50 vs $1,000+ USD", group: "Negocio & Validación", icon: <Scale className="w-4 h-4 text-accent" /> },
  { id: "argumentario-roi", title: "10. Argumentario de ROI & Cierre", group: "Negocio & Validación", icon: <TrendingUp className="w-4 h-4 text-accent" /> },
  { id: "checklist-valor", title: "11. Checklist de Entregables", group: "Negocio & Validación", icon: <CheckCircle2 className="w-4 h-4 text-accent" /> },
];

export const ValuePage: React.FC<ValuePageProps> = ({
  onNavigateToPrompts,
  onNavigateToManual,
  onSelectPrompt,
  onAddToast,
}) => {
  const readSection = () => {
    const hash = window.location.hash.slice(1);
    return VALUE_SECTIONS.find((s) => s.id === hash)?.id || "la-falacia";
  };

  const [activeAnchor, setActiveAnchor] = useState(readSection);
  const [readAll, setReadAll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const readingRef = useRef<HTMLElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Checklist State
  const [checklist, setChecklist] = useState<ValueChecklistItem[]>(INITIAL_VALUE_CHECKLIST);
  const [checklistFilter, setChecklistFilter] = useState<"todos" | "pendientes" | "completados">("todos");

  // Load checklist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dannieldev_web_value_checklist_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setChecklist((current) =>
            current.map((item) => {
              const found = parsed.find((p: any) => p.id === item.id);
              return found ? { ...item, checked: Boolean(found.checked) } : item;
            })
          );
        }
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const toggleChecklistItem = (id: number) => {
    setChecklist((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
      try {
        localStorage.setItem("dannieldev_web_value_checklist_v1", JSON.stringify(updated));
      } catch {
        // Storage fail fallback
      }
      return updated;
    });
  };

  const resetChecklist = () => {
    if (window.confirm("¿Deseas reiniciar todas las casillas del checklist de entregables web?")) {
      setChecklist(INITIAL_VALUE_CHECKLIST);
      try {
        localStorage.removeItem("dannieldev_web_value_checklist_v1");
      } catch {
        // storage
      }
      onAddToast("Checklist de valor restablecido al estado inicial", "info");
    }
  };

  const copyChecklistAsText = async () => {
    const completed = checklist.filter((i) => i.checked).length;
    const lines = [
      `# Checklist de Entregables Web Profesional (> $1,000 USD)`,
      `Progreso: ${completed}/${checklist.length} entregables listos`,
      "",
      ...checklist.map((i) => `[${i.checked ? "X" : " "}] ${i.category}: ${i.title}\n    ${i.detail}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(lines);
      onAddToast("Checklist copiado como Markdown al portapapeles", "success");
    } catch {
      onAddToast("No se pudo copiar automáticamente", "error");
    }
  };

  const copyScriptText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      onAddToast("Argumento copiado al portapapeles", "success");
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      onAddToast("No se pudo copiar el texto", "error");
    }
  };

  // Sync anchor with URL hash and scroll accurately to section in both single-chapter and readAll mode
  const sectionLink = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    setActiveAnchor(sectionId);
    setMenuOpen(false);
    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, "", `/valor#${sectionId}`);
    }
    requestAnimationFrame(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "smooth" });
        target.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
      } else {
        readingRef.current?.focus();
        readingRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  useEffect(() => {
    const handleHash = () => {
      const current = window.location.hash.slice(1);
      if (current && VALUE_SECTIONS.some((s) => s.id === current)) {
        setActiveAnchor(current);
        setMenuOpen(false);
      }
    };
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("popstate", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("popstate", handleHash);
    };
  }, []);

  const checkedCount = checklist.filter((i) => i.checked).length;
  const filteredChecklist = checklist.filter((item) => {
    if (checklistFilter === "pendientes") return !item.checked;
    if (checklistFilter === "completados") return item.checked;
    return true;
  });

  const activeIndex = VALUE_SECTIONS.findIndex((s) => s.id === activeAnchor);
  const currentSection = VALUE_SECTIONS[activeIndex] || VALUE_SECTIONS[0];
  const prevSection = activeIndex > 0 ? VALUE_SECTIONS[activeIndex - 1] : null;
  const nextSection = activeIndex < VALUE_SECTIONS.length - 1 ? VALUE_SECTIONS[activeIndex + 1] : null;

  useEffect(() => {
    document.title = `${currentSection.title} · Por qué un sitio web profesional no es barato · Prompts Célebres`;
  }, [currentSection]);

  const groupedSections = VALUE_SECTIONS.reduce((acc, section) => {
    if (!acc[section.group]) acc[section.group] = [];
    acc[section.group].push(section);
    return acc;
  }, {} as Record<string, ValueSection[]>);

  const objectionScript = `Entiendo perfectamente que existan opciones en el mercado por $50 USD o personas que ofrecen páginas montadas en 10 minutos con plantillas de IA.

La diferencia fundamental es el objetivo del proyecto: un sitio de $50 USD es un gasto desechable que suele venir sin optimización móvil real, sin SEO, sin seguridad, sin documentación técnica y sin estrategia de conversión —lo que termina costando miles de dólares en clientes perdidos y re-trabajo a las pocas semanas.

Mi servicio no te vende un enlace con fotos; te entrega un activo de ingeniería y negocio probado:
1. Estrategia UX/UI a medida guiada a que tus visitantes compren, agenden o soliciten cotizaciones.
2. Rendimiento extremo con Core Web Vitals en verde en Google (carga sub-segundo en móviles).
3. Propiedad intelectual total: repositorio oficial transferido a tu cuenta de GitHub con historial limpio de commits.
4. Documentación modular y biblioteca de videos de capacitación para que tu equipo administre la web de forma 100% autónoma.
5. Plan de respaldo continuo, copias de seguridad automáticas y monitoreo de disponibilidad.

Si tu cliente promedio representa un beneficio de $200 USD, basta con que el nuevo sitio capture 5 clientes adicionales que antes rebotaban por desconfianza o lentitud para que la inversión completa quede amortizada al 100%.

¿Prefieres un cascarón que ahuyente prospectos o un canal de ventas sólido que trabaje para tu empresa las 24 horas del día?`;

  return (
    <>
      {/* Intro Banner */}
      <section className="manual-intro page-width" aria-labelledby="value-page-title">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Chip variant="secondary" size="sm" className="font-semibold text-xs text-accent">
              💎 Estrategia de Valor & Pricing Senior
            </Chip>
            <span className="text-xs text-muted">Guía completa de ingeniería y retorno comercial</span>
          </div>
          <h1 id="value-page-title" className="text-foreground">
            Por qué un sitio web profesional no es barato
          </h1>
          <p>
            Y cómo justificar presupuestos sobre los <strong>$1,000 USD</strong> entregando un ecosistema de
            ingeniería de software, optimización para conversión y autonomía operativa en lugar de un cascarón desechable.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap mt-3 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onNavigateToManual}
            className="rounded-xl text-xs font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            <span>Ver Manual Web</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onNavigateToPrompts}
            className="rounded-xl text-xs font-semibold shadow-sm"
          >
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span>Biblioteca de Prompts</span>
          </Button>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="manual-layout page-width">
        {/* Sidebar */}
        <aside className="manual-sidebar">
          <div className="index-title">
            Índice de Contenidos
            <span>Guía de 11 capítulos y checklist</span>
          </div>
          <button
            type="button"
            className="chapter-menu-button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>{currentSection.title}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-90" : ""}`} />
          </button>
          <nav className={`chapter-index ${menuOpen ? "is-open" : ""}`} aria-label="Secciones de la guía de valor">
            {Object.entries(groupedSections).map(([groupName, sections]) => (
              <div key={groupName} className="chapter-group">
                <h2>{groupName}</h2>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`/valor#${section.id}`}
                    aria-current={activeAnchor === section.id ? "true" : undefined}
                    onClick={(e) => sectionLink(e, section.id)}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            ))}
            <div className="sidebar-progress">
              <span>
                Entregables listos <strong>{checkedCount} de {checklist.length}</strong>
              </span>
              <progress max={checklist.length} value={checkedCount} aria-label="Progreso de entregables del paquete" />
              <a href="/valor#checklist-valor" onClick={(e) => sectionLink(e, "checklist-valor")}>
                <span>Revisar checklist</span>
                <ChevronRight size={16} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </aside>

        {/* Content Body */}
        <main id="main-content" ref={readingRef} className="manual-reading" tabIndex={-1}>
          <div className="reading-toolbar">
            <span>{readAll ? "Guía completa desplegada" : `Capítulo ${activeIndex + 1} de ${VALUE_SECTIONS.length}`}</span>
            <button className="text-button" aria-pressed={readAll} onClick={() => setReadAll(!readAll)}>
              {readAll ? "Leer por capítulos" : "Ver toda la guía"}
            </button>
          </div>

          {/* SECTION 1: LA FALACIA DEL SITIO BARATO */}
          <section hidden={!readAll && activeAnchor !== "la-falacia"} id="la-falacia" className="scroll-mt-24 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>Capítulo 1 · Diagnóstico del Mercado</span>
              </div>
              <span className="text-xs font-mono text-muted bg-surface-secondary px-2.5 py-1 rounded-md">
                Deuda Técnica vs Inversión
              </span>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                La Trampa del "Sitio Barato" y la Falacia de la IA
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                En el mercado digital abundan ofertas de personas cobrando <strong>$20, $30 o $50 USD</strong> por un
                supuesto "sitio web terminado", e incluso prospectos que argumentan:{" "}
                <em>"Yo hice el mío en una tarde y solo me costó $1 en tokens de ChatGPT"</em>.
              </p>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                Esto crea una ilusión óptica en clientes poco experimentados, pero oculta dos verdades contundentes
                que cualquier profesional debe saber articular con firmeza:
              </p>
            </div>

            {/* The 2 Realities Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-surface-secondary border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-accent font-semibold text-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>1. No es accesible, es novato</span>
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700">
                    Sin valor
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  Quien cobra $30 USD no está cobrando barato por "generosidad"; cobra poco porque{" "}
                  <strong>no sabe entregar valor, no conoce de ingeniería, ni de psicología de ventas, ni respeta su propio tiempo</strong>.
                  Su trabajo termina siendo un copia y pega sin pruebas ni soporte.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-surface-secondary border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-accent font-semibold text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>2. Lo barato sale carísimo</span>
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800">
                    Costo oculto
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  Un sitio de $30 suele ser un cascarón genérico sin estrategia, sin optimización móvil, sin seguridad,
                  con tiempos de carga de 6 segundos y sin SEO. Se rompe con el primer cambio y{" "}
                  <strong>ahuyenta al 80% de los clientes potenciales antes de que lean una palabra</strong>.
                </p>
              </div>
            </div>

            {/* Quote Callout */}
            <div className="p-6 rounded-xl bg-surface border border-border/80 space-y-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Principio de Negocio Fundamental</span>
              </div>
              <blockquote className="text-sm sm:text-base font-medium text-foreground italic border-l-2 border-accent pl-3 my-2">
                "Cuando un cliente compra una web por $50 USD, no está adquiriendo un activo comercial;
                está firmando una hipoteca de deuda técnica que explotará a las dos semanas."
              </blockquote>
              <p className="text-xs text-muted">
                Un sitio profesional sobre $1,000 USD se justifica porque resuelve el problema completo:
                diseño, ingeniería, autonomía del cliente, velocidad extrema, seguridad y respaldo legal de código.
              </p>
            </div>

            {/* The 7 Pillars Ecosystem Architecture Overview (Interactive Flowchart Counterpart) */}
            <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                  <Award className="w-4 h-4" />
                  <span>El Ecosistema Completo: Los 7 Pilares (&gt; $1,000 USD)</span>
                </div>
                <span className="text-xs font-mono text-muted bg-surface-secondary px-2.5 py-1 rounded-md">
                  7 activos tangibles
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Para justificar presupuestos sobre <strong>$1,000 USD</strong> y diferenciarse radicalmente de la competencia amateur, un proyecto web profesional no se entrega como un simple link; se entrega como un <strong>ecosistema de ingeniería completo</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {[
                  { id: "pilar-ux", num: "1", title: "Estrategia UX/UI", detail: "Arquitectura, jerarquía y diseño enfocado a conversión" },
                  { id: "pilar-docs", num: "2", title: "Documentación Modular", detail: "Especificación técnica clara, cero cajas negras" },
                  { id: "pilar-capacitacion", num: "3", title: "Capacitación en Video", detail: "Loom y cheatsheets para autogestión sin dependencia" },
                  { id: "pilar-git", num: "4", title: "Repositorio GitHub", detail: "Control de versiones, Conventional Commits y soberanía" },
                  { id: "pilar-seo", num: "5", title: "SEO Técnico On-Page", detail: "Semántica HTML5, OpenGraph, sitemap.xml y robots.txt" },
                  { id: "pilar-cwv", num: "6", title: "Rendimiento & Seguridad", detail: "Core Web Vitals verdes, WebP/AVIF y SSL Cloudflare" },
                  { id: "pilar-retainer", num: "7", title: "Soporte & Retainer", detail: "Fee mensual recurrente, backups y monitoreo 24/7" },
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`/valor#${p.id}`}
                    onClick={(e) => sectionLink(e, p.id)}
                    className="p-3.5 rounded-xl bg-surface-secondary hover:bg-surface border border-border transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                          Pilar {p.num}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                        {p.title}
                      </div>
                      <p className="text-xs text-muted mt-1 leading-snug">
                        {p.detail}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: PILAR 1 - UX/UI */}
          <section hidden={!readAll && activeAnchor !== "pilar-ux"} id="pilar-ux" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Pilar 1 de 7 · Experiencia y Conversión</span>
              </div>
              <Chip size="sm" variant="secondary" className="text-xs font-semibold">
                Estrategia UX/UI
              </Chip>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Propuesta y Estrategia de Diseño UX/UI Orientada a Conversión
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                Un desarrollo profesional nunca arranca instalando una plantilla prediseñada al azar o aceptando
                el primer diseño genérico generado por IA. Se fundamenta en una{" "}
                <strong>arquitectura de información deliberada</strong> diseñada para convertir visitantes en clientes.
              </p>
            </div>

            <div className="space-y-3 text-sm text-foreground/90">
              <div className="p-4 rounded-xl bg-surface border border-border space-y-2">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Lo que incluye la entrega profesional:</span>
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-muted">
                  <li>
                    <strong>Arquitectura de Información (IA):</strong> Organización jerárquica de la navegación para que el usuario encuentre respuestas en menos de 3 clics.
                  </li>
                  <li>
                    <strong>Psicología visual y tokens de marca:</strong> Paleta cromática contrastada (WCAG AA 4.5:1), tipografías con pesos armoniosos y ritmo vertical de 8pt.
                  </li>
                  <li>
                    <strong>Diseño mobile-first estricto:</strong> Tap targets táctiles con área mínima de 44×44px (Apple HIG) y cero elementos comprimidos.
                  </li>
                  <li>
                    <strong>Foco en conversión directa:</strong> Cada sección guía al visitante hacia una acción principal medible (comprar, agendar llamada, enviar WhatsApp calificado o solicitar cotización).
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface-secondary border border-rose-500/20 text-xs sm:text-sm text-muted">
                <strong className="text-rose-700 block mb-1">❌ El contraste amateur:</strong>
                Las webs de $30 USD colocan bloques de texto interminables, botones desalineados, colores chillones sin contraste y menús que colapsan en pantallas móviles, provocando una tasa de rebote superior al 70%.
              </div>
            </div>
          </section>

          {/* SECTION 3: PILAR 2 - DOCUMENTACIÓN MODULAR */}
          <section hidden={!readAll && activeAnchor !== "pilar-docs"} id="pilar-docs" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <FileText className="w-4 h-4" />
                <span>Pilar 2 de 7 · Claridad Técnica</span>
              </div>
              <Chip size="sm" variant="secondary" className="text-xs font-semibold">
                Cero Cajas Negras
              </Chip>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Documentación Técnica Modular y Estructurada
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                El cliente profesional nunca recibe un software misterioso o una caja negra incomprensible.
                Recibe un sistema formalmente documentado por módulos, lo que le otorga{" "}
                <strong>soberanía tecnológica y tranquilidad patrimonial</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
                <div className="text-xs font-bold text-accent uppercase tracking-wider">Módulo 1</div>
                <h3 className="font-semibold text-foreground text-sm">Arquitectura & Stack</h3>
                <p className="text-xs text-muted">Explicación concisa de tecnologías utilizadas, rutas de la aplicación y flujos de datos.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
                <div className="text-xs font-bold text-accent uppercase tracking-wider">Módulo 2</div>
                <h3 className="font-semibold text-foreground text-sm">Componentes & UI</h3>
                <p className="text-xs text-muted">Catálogo de componentes reutilizables, tokens CSS de diseño y variables globales.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
                <div className="text-xs font-bold text-accent uppercase tracking-wider">Módulo 3</div>
                <h3 className="font-semibold text-foreground text-sm">Guía de Despliegue</h3>
                <p className="text-xs text-muted">Variables de entorno, scripts de compilación, dominios y configuración de producción.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border/80 text-xs sm:text-sm text-foreground/80 space-y-2">
              <p>
                <strong>¿Por qué el cliente paga por esto?</strong> Porque si el día de mañana contrata a un nuevo programador o agencia,
                no tendrá que pagar miles de dólares para que "descifren un código espagueti". La documentación ahorra semanas de tiempo y elimina el riesgo de dependencia.
              </p>
            </div>
          </section>

          {/* SECTION 4: PILAR 3 - CAPACITACIÓN EN VIDEO */}
          <section hidden={!readAll && activeAnchor !== "pilar-capacitacion"} id="pilar-capacitacion" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Video className="w-4 h-4" />
                <span>Pilar 3 de 7 · Autonomía del Cliente</span>
              </div>
              <Chip size="sm" variant="secondary" className="text-xs font-semibold">
                Capacitación Operativa
              </Chip>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Capacitación Operativa (Grabada en Video y Cheatsheet)
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                Uno de los mayores temores de un empresario al encargar una web es quedar "secuestrado",
                teniendo que pagar horas técnicas o esperar días cada vez que necesita cambiar un teléfono, un texto o un precio.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-border space-y-4">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Qué incluye el paquete de capacitación (&gt; $1,000 USD):</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted">
                <div className="p-3 rounded-lg bg-surface-secondary space-y-1">
                  <strong className="text-foreground block">📹 Videos paso a paso en Loom</strong>
                  <span>Cápsulas breves (3-5 minutos) mostrando tareas específicas: cómo añadir un artículo, cómo editar un banner, cómo exportar formularios.</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-secondary space-y-1">
                  <strong className="text-foreground block">📄 Cheatsheet de 1 página</strong>
                  <span>Resumen imprimible o PDF con accesos, atajos y el paso a paso de las tareas más comunes para el equipo operativo.</span>
                </div>
              </div>
              <p className="text-xs text-foreground/80">
                Al terminar el proyecto, el cliente siente que ha comprado una <strong>herramienta de trabajo propia</strong> que su equipo domina, no una carga técnica.
              </p>
            </div>
          </section>

          {/* SECTION 5: PILAR 4 - REPOSITORIO GITHUB */}
          <section hidden={!readAll && activeAnchor !== "pilar-git"} id="pilar-git" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <GitBranch className="w-4 h-4" />
                <span>Pilar 4 de 7 · Propiedad Intelectual</span>
              </div>
              <Chip size="sm" variant="secondary" className="text-xs font-semibold">
                Control de Versiones Oficial
              </Chip>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Entrega de Repositorio en GitHub con Control de Versiones
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                El código de un proyecto serio no se entrega como un archivo ZIP adjunto en un correo ni se deja
                bloqueado en la cuenta personal del desarrollador. Se transfiere de forma oficial y formal mediante un{" "}
                <strong>repositorio de Git en la organización del cliente</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-border space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Code2 className="w-4 h-4" />
                <span>Garantías de la transferencia formal en GitHub:</span>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-muted">
                <li>
                  <strong>Propiedad Intelectual Real:</strong> El cliente tiene posesión jurídica y técnica total de sus activos digitales.
                </li>
                <li>
                  <strong>Historial de Commits Limpio y Auditable:</strong> Cada cambio está registrado con Conventional Commits (quién, cuándo y por qué), facilitando auditorías de seguridad y calidad.
                </li>
                <li>
                  <strong>Ramas protegidas y despliegue continuo (CI/CD):</strong> Separación de ambientes (producción vs pruebas) para evitar que cambios accidentales rompan el sitio en vivo.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 6: PILAR 5 - SEO TÉCNICO ON-PAGE */}
          <section hidden={!readAll && activeAnchor !== "pilar-seo"} id="pilar-seo" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Search className="w-4 h-4" />
                <span>Pilar 5 de 7 · Visibilidad Orgánica</span>
              </div>
              <Chip size="sm" variant="secondary" className="text-xs font-semibold">
                SEO On-Page & Indexación
              </Chip>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Posicionamiento SEO Técnico y On-Page Esencial
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                Tener el sitio web más bonito del mundo no sirve de nada si Google no puede leerlo o si
                al compartir el enlace en WhatsApp o LinkedIn aparece una imagen rota y un texto genérico.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface border border-border space-y-2">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Semántica & Metadatos</span>
                </h3>
                <ul className="list-disc pl-4 text-xs sm:text-sm text-muted space-y-1.5">
                  <li>Estructura HTML5 semántica estricta (<code>h1</code> único, jerarquía de <code>h2/h3</code>, <code>nav</code>, <code>main</code>, <code>footer</code>).</li>
                  <li>Títulos únicos por página (<code className="font-mono text-accent">&lt;title&gt;</code>) y meta descriptions persuasivas.</li>
                  <li>Etiquetas Open Graph y Twitter Cards con imagen de alta calidad (1200×630px).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border space-y-2">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Indexación & Rastreo</span>
                </h3>
                <ul className="list-disc pl-4 text-xs sm:text-sm text-muted space-y-1.5">
                  <li>Archivo <code className="font-mono text-accent">sitemap.xml</code> dinámico con todas las URLs canónicas.</li>
                  <li>Archivo <code className="font-mono text-accent">robots.txt</code> configurado correctamente evitando el bloqueo de recursos.</li>
                  <li>Verificación y envío del sitemap a Google Search Console.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 7: PILAR 6 - CWV Y SEGURIDAD */}
          <section hidden={!readAll && activeAnchor !== "pilar-cwv"} id="pilar-cwv" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Zap className="w-4 h-4" />
                <span>Pilar 6 de 7 · Velocidad & Blindaje</span>
              </div>
              <Chip size="sm" variant="secondary" className="text-xs font-semibold">
                PageSpeed 95-100 & SSL
              </Chip>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Rendimiento Extremo (Performance) y Seguridad Perimetral
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                Cada segundo extra que tarda una página web en cargar reduce las conversiones un <strong>20%</strong>.
                Un servicio profesional entrega una experiencia de carga instantánea verificable en Google PageSpeed Insights.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-surface border border-emerald-600/30 space-y-1.5">
                <div className="text-xs font-bold text-emerald-700 uppercase">Core Web Vitals</div>
                <h3 className="font-semibold text-foreground text-sm">Todo en Verde</h3>
                <p className="text-xs text-muted">LCP &lt; 2.5s, INP &lt; 200ms y CLS &lt; 0.1 en PageSpeed móvil.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
                <div className="text-xs font-bold text-accent uppercase">Optimización Assets</div>
                <h3 className="font-semibold text-foreground text-sm">Formatos Modernos</h3>
                <p className="text-xs text-muted">WebP y AVIF comprimidos, Lazy Loading nativo y fuentes auto-hospedadas.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
                <div className="text-xs font-bold text-accent uppercase">Seguridad Perimetral</div>
                <h3 className="font-semibold text-foreground text-sm">Edge CDN & Cabeceras</h3>
                <p className="text-xs text-muted">SSL/TLS forzado, HSTS, protección contra inyección y mitigación DDoS en Cloudflare.</p>
              </div>
            </div>
          </section>

          {/* SECTION 8: PILAR 7 - SOPORTE Y RETAINER */}
          <section hidden={!readAll && activeAnchor !== "pilar-retainer"} id="pilar-retainer" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Clock className="w-4 h-4" />
                <span>Pilar 7 de 7 · Continuidad Operativa</span>
              </div>
              <Chip size="sm" variant="secondary" className="text-xs font-semibold">
                Fee Recurrente / Retainer
              </Chip>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Plan de Soporte y Continuidad (El Modelo de Retainer Mensual)
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                Todo software en producción es un organismo vivo: requiere actualizaciones de seguridad,
                copias de respaldo periódicas y monitoreo constante. El profesional no desaparece tras cobrar;
                plantea un <strong>acuerdo de mantenimiento mensual ($100 - $300+ USD)</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-border space-y-3">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Componentes del Retainer Mensual:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted">
                <div className="p-3 rounded-lg bg-surface-secondary space-y-1">
                  <strong className="text-foreground block">🛡️ Copias de Seguridad & Monitoreo 24/7</strong>
                  <span>Backups externos automatizados y monitoreo de disponibilidad para actuar de inmediato si el servidor falla.</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-secondary space-y-1">
                  <strong className="text-foreground block">⏱️ Bolsa de Horas de Mejoras</strong>
                  <span>2 a 4 horas mensuales reservadas para ajustes de diseño, nuevas secciones o integración de herramientas.</span>
                </div>
              </div>
              <p className="text-xs text-muted">
                Este pilar transforma una transacción única en una relación de negocio de largo plazo con ingresos predecibles para el desarrollador y tranquilidad absoluta para el cliente.
              </p>
            </div>
          </section>

          {/* SECTION 9: TABLA COMPARATIVA */}
          <section hidden={!readAll && activeAnchor !== "comparativa"} id="comparativa" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <Scale className="w-4 h-4" />
                <span>Capítulo 9 · Comparativa Frente a Frente</span>
              </div>
              <Chip size="sm" variant="secondary" className="text-xs font-semibold">
                Contraste Inmediato
              </Chip>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Cuadro Comparativo: "Sitio de $50 USD" vs Servicio Web Profesional ($1,000+ USD)
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                Esta tabla resume visualmente por qué dos presupuestos aparentemente relacionados
                en realidad corresponden a dos categorías de producto completamente distintas:
              </p>
            </div>

            {/* Comparison Cards / Table */}
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-left border-collapse min-w-[580px] bg-surface rounded-xl overflow-hidden border border-border">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary text-xs uppercase tracking-wider text-muted">
                    <th className="py-3 px-4 font-semibold w-1/4">Criterio</th>
                    <th className="py-3 px-4 font-bold w-3/8 text-danger bg-danger/10">Sitio de $50 USD (Amateur / Plantilla IA)</th>
                    <th className="py-3 px-4 font-bold w-3/8 text-accent bg-accent/15">Servicio Web Profesional ($1,000+ USD)</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm divide-y divide-border/70 text-foreground">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-muted">Objetivo Real</td>
                    <td className="py-3.5 px-4 bg-danger/5 text-foreground/80">"Tener presencia digital cualquiera"</td>
                    <td className="py-3.5 px-4 bg-accent/10 text-foreground font-semibold">Generar prospectos, autoridad y ventas reales</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-muted">Diseño & UX</td>
                    <td className="py-3.5 px-4 bg-danger/5 text-foreground/80">Plantilla genérica, elementos desalineados, AI slop</td>
                    <td className="py-3.5 px-4 bg-accent/10 text-foreground font-semibold">Diseño UX/UI a medida, jerarquía y microinteracciones</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-muted">Velocidad</td>
                    <td className="py-3.5 px-4 bg-danger/5 text-foreground/80">Lenta (&gt;4s), imágenes sin comprimir, plugins basura</td>
                    <td className="py-3.5 px-4 bg-accent/10 text-foreground font-semibold">Carga sub-segundo, Core Web Vitals en verde (95-100)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-muted">SEO & Social</td>
                    <td className="py-3.5 px-4 bg-danger/5 text-foreground/80">Sin metadatos; vista previa rota en WhatsApp</td>
                    <td className="py-3.5 px-4 bg-accent/10 text-foreground font-semibold">Semántica estricta, OpenGraph 1200×630 y sitemap verificado</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-muted">Propiedad Código</td>
                    <td className="py-3.5 px-4 bg-danger/5 text-foreground/80">Código cautivo o bloqueado en plataformas cerradas</td>
                    <td className="py-3.5 px-4 bg-accent/10 text-foreground font-semibold">Repositorio GitHub propio, versionado y transferido</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-muted">Documentación</td>
                    <td className="py-3.5 px-4 bg-danger/5 text-foreground/80">Caja negra absoluta; cero tutoriales</td>
                    <td className="py-3.5 px-4 bg-accent/10 text-foreground font-semibold">Documentación técnica modular y videos de capacitación</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-muted">Continuidad</td>
                    <td className="py-3.5 px-4 bg-danger/5 text-foreground/80">Abandonado tras entrega; se rompe ante updates</td>
                    <td className="py-3.5 px-4 bg-accent/10 text-foreground font-semibold">Plan de mantenimiento preventivo, backups y soporte</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-muted">Percepción</td>
                    <td className="py-3.5 px-4 bg-danger/5 text-foreground/80">Imagen improvisada o desconfianza en el cliente</td>
                    <td className="py-3.5 px-4 bg-accent/10 text-foreground font-semibold">Activo corporativo sólido que genera confianza y ROI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 10: ARGUMENTARIO DE ROI & CIERRE */}
          <section hidden={!readAll && activeAnchor !== "argumentario-roi"} id="argumentario-roi" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Capítulo 10 · Argumentario de Ventas</span>
              </div>
              <Chip size="sm" variant="secondary" className="text-xs font-semibold">
                Retorno de Inversión
              </Chip>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Cómo Comunicar el Valor y Demostrar el Retorno de Inversión (ROI)
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                Los clientes no compran líneas de código ni componentes React; compran <strong>resultados de negocio</strong>.
                Cuando un cliente cuestiona el precio, no se compite bajando la tarifa: se ilumina el costo de la mala calidad.
              </p>
            </div>

            {/* ROI Math Card */}
            <div className="p-5 rounded-xl bg-surface border border-border space-y-3">
              <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                <DollarSign className="w-4 h-4" />
                <span>La Matemática del ROI: Por qué $1,000 USD es más barato que $50 USD</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-lg bg-surface-secondary space-y-1.5 border border-border/60">
                  <div className="text-rose-700 font-bold uppercase text-xs">Escenario A: Web Barata ($50 USD)</div>
                  <p className="text-muted">
                    Tráfico: 1,000 visitas/mes. Carga lenta (5s) y diseño dudoso. Convierte solo al <strong>0.3%</strong> (3 clientes).
                    Con ticket de $100 USD = <strong>$300 USD/mes</strong> ($3,600/año).
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-surface-secondary space-y-1.5 border border-emerald-600/30">
                  <div className="text-emerald-800 font-bold uppercase text-xs">Escenario B: Web Profesional ($1,000 USD)</div>
                  <p className="text-muted">
                    Tráfico: 1,000 visitas/mes. Carga instantánea (&lt;1s) y flujo claro. Convierte al <strong>2.1%</strong> (21 clientes).
                    Con ticket de $100 USD = <strong>$2,100 USD/mes</strong> ($25,200/año).
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-accent/10 text-accent text-xs sm:text-sm font-semibold">
                Diferencia neta anual: ¡+$21,600 USD generados por la web profesional! El proyecto de $1,000 USD se amortiza en las primeras dos semanas.
              </div>
            </div>

            {/* Copyable Script Card */}
            <div className="p-5 rounded-xl bg-surface border border-border space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Script de respuesta ante la objeción: "Alguien me lo hace por $50"</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyScriptText("objection", objectionScript)}
                  className="rounded-xl text-xs font-semibold"
                >
                  {copiedId === "objection" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent mr-1" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      <span>Copiar script</span>
                    </>
                  )}
                </Button>
              </div>
              <pre className="text-xs leading-relaxed p-4 rounded-lg bg-surface-secondary border border-border/80 whitespace-pre-wrap font-sans text-foreground/90 overflow-x-auto max-h-72 overflow-y-auto">
                {objectionScript}
              </pre>
            </div>
          </section>

          {/* SECTION 11: CHECKLIST INTERACTIVO */}
          <section hidden={!readAll && activeAnchor !== "checklist-valor"} id="checklist-valor" className="scroll-mt-24 space-y-6 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Capítulo 11 · Control de Calidad del Paquete</span>
              </div>
              <span className="text-xs font-mono text-muted">
                {checkedCount} de {checklist.length} listos
              </span>
            </div>

            <div className="space-y-3">
              <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Checklist Interactivo de Entregables del Paquete &gt; $1,000 USD
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                Verifica cada uno de estos 18 puntos antes de enviar una cotización formal o hacer la entrega
                definitiva a tu cliente. Tu progreso se guarda automáticamente en este navegador.
              </p>
            </div>

            {/* Checklist Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setChecklistFilter("todos")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[38px] transition-colors ${checklistFilter === "todos" ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}
                >
                  Todos ({checklist.length})
                </button>
                <button
                  type="button"
                  onClick={() => setChecklistFilter("pendientes")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[38px] transition-colors ${checklistFilter === "pendientes" ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}
                >
                  Pendientes ({checklist.length - checkedCount})
                </button>
                <button
                  type="button"
                  onClick={() => setChecklistFilter("completados")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[38px] transition-colors ${checklistFilter === "completados" ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}
                >
                  Listos ({checkedCount})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyChecklistAsText}
                  className="rounded-xl text-xs font-semibold"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  <span>Copiar Markdown</span>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={resetChecklist}
                  className="rounded-xl text-xs text-muted hover:text-danger"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  <span>Restablecer</span>
                </Button>
              </div>
            </div>

            {/* Checklist Items List */}
            <div className="space-y-2">
              {filteredChecklist.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer select-none ${
                    item.checked
                      ? "bg-accent/10 border-accent/40 text-foreground"
                      : "bg-surface border-border hover:bg-surface-secondary text-foreground"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="mt-1 w-4 h-4 rounded accent-accent shrink-0 cursor-pointer"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-2 py-0.5 rounded bg-surface-secondary">
                        {item.category}
                      </span>
                      <span className={`text-sm font-semibold ${item.checked ? "line-through text-muted" : "text-foreground"}`}>
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* Related Prompts Footer Callout */}
            <div className="p-6 rounded-2xl bg-surface border border-accent/30 space-y-3 mt-8">
              <div className="flex items-center gap-2 text-accent font-semibold text-sm">
                <Award className="w-4 h-4" />
                <span>Herramientas Complementarias en Prompts Célebres</span>
              </div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Utiliza las plantillas probadas de nuestra biblioteca para acelerar cada fase de tu propuesta y desarrollo:
              </p>
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {onSelectPrompt && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelectPrompt("seed-26-protocolo-arranque-web")}
                      className="rounded-xl text-xs font-semibold"
                    >
                      <span>Prompt de Arranque Web</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelectPrompt("seed-05-propuesta-comercial")}
                      className="rounded-xl text-xs font-semibold"
                    >
                      <span>Prompt de Propuesta Comercial</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </>
                )}
                <Button
                  size="sm"
                  variant="primary"
                  onClick={onNavigateToManual}
                  className="rounded-xl text-xs font-semibold"
                >
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  <span>Ir al Manual Anti-Genérico</span>
                </Button>
              </div>
            </div>
          </section>

          {/* Bottom Pagination */}
          {!readAll && (
            <nav className="chapter-pagination" aria-label="Navegación entre capítulos de valor">
              {prevSection && (
                <a
                  href={`/valor#${prevSection.id}`}
                  className="chapter-prev"
                  onClick={(e) => sectionLink(e, prevSection.id)}
                >
                  <span>Capítulo anterior</span>
                  <strong>{prevSection.title}</strong>
                </a>
              )}
              {nextSection && (
                <a
                  href={`/valor#${nextSection.id}`}
                  className="chapter-next"
                  onClick={(e) => sectionLink(e, nextSection.id)}
                >
                  <span>Siguiente capítulo</span>
                  <strong>{nextSection.title}</strong>
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
              )}
            </nav>
          )}
        </main>
      </div>

      <footer className="site-footer page-width">
        <span>
          Por qué un sitio web profesional no es barato · Colección de{" "}
          <a href="https://dannieldev.com" target="_blank" rel="noopener noreferrer">
            @dannieldev
          </a>
        </span>
        <span>{VALUE_SECTIONS.length} capítulos y checklist de 18 entregables clave</span>
      </footer>
    </>
  );
};
