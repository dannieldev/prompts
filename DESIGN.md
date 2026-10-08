---
name: "Prompts Célebres"
description: "Biblioteca personal de prompts y manual web de Danniel."
colors:
  background: "#dfe2d7"
  foreground: "#26382f"
  surface: "#eeede4"
  surface-secondary: "#dce2d4"
  surface-tertiary: "#d0d9c8"
  surface-hover: "#e2e7d9"
  secondary-foreground: "#34483b"
  accent: "#365e48"
  accent-hover: "#284a37"
  muted: "#566157"
  border: "#c4ccbd"
  default: "#dce4d4"
  category: "#edf2e8"
  reading: "#465348"
  success: "#356547"
  warning: "#865b1f"
  danger: "#a33d3d"
  header-background: "#d3dccb"
  reading-background: "#ece9df"
  category-development-background: "#c6d8e4"
  category-development-ink: "#274c65"
  category-development-surface: "#e5e9e7"
  category-design-background: "#d6cce4"
  category-design-ink: "#554068"
  category-design-surface: "#eae5e9"
  category-marketing-background: "#e9ccad"
  category-marketing-ink: "#784119"
  category-marketing-surface: "#ece5d9"
  category-automation-background: "#bddbd2"
  category-automation-ink: "#285b50"
  category-automation-surface: "#e1e8e0"
  category-writing-background: "#e3c5ca"
  category-writing-ink: "#713b48"
  category-writing-surface: "#ebe3e0"
  category-systems-background: "#c0dadd"
  category-systems-ink: "#28555c"
  category-systems-surface: "#e1e8e6"
  category-reasoning-background: "#d4d9b5"
  category-reasoning-ink: "#515b25"
  category-reasoning-surface: "#e7e8da"
  category-general-background: "#d7d3ca"
  category-general-ink: "#554f44"
  category-general-surface: "#e7e5dc"
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(28px, 3vw, 38px)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-.035em"
  headline:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(26px, 2.8vw, 34px)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-.025em"
  title:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "19px"
    fontWeight: 650
    lineHeight: 1.45
    letterSpacing: "-.02em"
  body:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  reading:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 600
  code:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace"
    fontSize: "14px"
    lineHeight: 1.9
rounded:
  tag: "5px"
  navigation: "6px"
  select: "7px"
  button: "8px"
  field: "10px"
  card: "12px"
  dialog: "16px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  field: "20px"
  lg: "24px"
  xl: "32px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.button}"
    padding: "10px 16px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "{colors.default}"
    textColor: "{colors.accent}"
    rounded: "{rounded.button}"
    padding: "10px 16px"
    typography: "{typography.label}"
  button-quiet:
    textColor: "{colors.muted}"
    rounded: "{rounded.button}"
    padding: "10px 16px"
    typography: "{typography.label}"
  search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.field}"
    padding: "6px 20px"
  category-tag:
    backgroundColor: "{colors.category}"
    textColor: "{colors.accent}"
    rounded: "{rounded.tag}"
    padding: "4px 9px"
  prompt-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.card}"
    padding: "20px 24px 16px"
  navigation:
    textColor: "{colors.muted}"
  checklist-item:
    textColor: "{colors.foreground}"
    padding: "20px 4px"
---

# Design System: Prompts Célebres

## Overview

**Creative North Star: "Una biblioteca clara"**

La metáfora es una descripción editorial de la implementación, no una decisión de marca aprobada por el usuario.

La interfaz busca claridad, cercanía y espacio para leer. La paleta clara y el verde sobrio pertenecen a la implementación local actual; este documento registra lo construido y no implica una aprobación específica de la paleta ni una preferencia permanente del usuario.

La biblioteca facilita encontrar, adaptar y reutilizar contenido. El manual mantiene una columna de lectura amplia y un índice visible según el tamaño de pantalla. Ambos comparten tipografía, superficies y estados de interacción sin exigir la misma composición.

**Key Characteristics:**
- Fondo marfil, superficies blancas y acento verde.
- Jerarquía tipográfica clara y párrafos de lectura amplios.
- Bordes discretos para separar contenido; superficies planas.
- Navegación semántica, foco visible y adaptación a pantallas pequeñas.

## Colors

La paleta combina un marfil ligeramente verdoso con superficies blancas, texto oscuro y un solo acento verde principal. Los valores normativos están en el frontmatter; la fuente de implementación es `src/index.css`.

### Primary
- **Verde de acción** (`accent`): acciones principales, enlaces, foco y elementos activos. `accent-hover` oscurece el botón principal al pasar el cursor.

### Neutral
- **Marfil de página** (`background`): fondo continuo de biblioteca, encabezado y manual.
- **Blanco de superficie** (`surface`): tarjetas, campos y diálogos.
- **Verdes de apoyo** (`surface-secondary`, `surface-tertiary`, `surface-hover`, `default`, `category`): separación tonal, acciones secundarias y etiquetas.
- **Tinta verde** (`foreground`, `secondary-foreground`): títulos y controles; `reading` suaviza los párrafos del manual.
- **Texto de apoyo** (`muted`): descripciones, modelos, filtros y metadatos.
- **Borde suave** (`border`): campos, divisores y contornos de tarjetas.

Los colores semánticos `success`, `warning` y `danger` están definidos para feedback. No constituyen acentos decorativos adicionales. Las rampas del sidecar son muestras sintetizadas para inspección; no son tokens nuevos del producto.

## Typography

Plus Jakarta Sans define títulos, texto y controles; la pila de sistema sirve de respaldo. JetBrains Mono con respaldo monoespaciado se usa en bloques de código. La marca usa un símbolo vectorial de comillas escalonadas, compartido con el favicon.

### Hierarchy
- **Display:** encabezado de la biblioteca, tamaño fluido y peso medio.
- **Headline:** títulos de capítulos del manual, tamaño fluido y altura compacta.
- **Title:** títulos de tarjetas (19px; 20px en móvil), con salto de línea permitido.
- **Body:** texto base (16px); las descripciones de tarjetas usan 15px y altura de línea de 1.75.
- **Reading:** párrafos y listas del manual (17px), altura de línea de 1.85 en escritorio y 1.8 en móvil. Los párrafos tienen un máximo de 70ch.
- **Label:** botones de 14px; los metadatos y categorías usan 12–13px según función.
- **Code:** bloques de código de 14px; en móvil bajan a 13px con desplazamiento horizontal cuando es necesario.

## Layout

El contenido principal usa un ancho máximo de 1280px y márgenes laterales de 40px; el encabezado llega a 1440px. Hasta 760px de viewport, ambos usan márgenes de 20px.

La biblioteca dispone tarjetas en tres columnas con separación de 24px. Hasta 1100px usa dos columnas; hasta 760px usa una columna con separación de 20px. Los filtros se reordenan en una sola columna en móvil según la última regla de la hoja de estilos.

El manual usa un índice lateral de 250px, reducido a 230px hasta 1100px, y una columna de lectura de hasta 780px. El índice queda fijo durante el desplazamiento y agrupa los doce capítulos. En móvil pasa a un menú desplegable por encima de la lectura. La vista predeterminada muestra un capítulo; el lector puede activar la vista completa.

El encabezado es fijo al desplazarse. Los destinos internos conservan margen de desplazamiento para evitar que tape el contenido. Las reglas de impresión muestran todos los capítulos y retiran la navegación de la página impresa.

## Elevation & Depth

La estructura principal es plana. La variable de sombra de superficie está en `none`; las tarjetas se separan por color de fondo, borde y espacio. Los overlays de diálogos señalan la modalidad y no convierten las tarjetas del contenido en objetos elevados.

Las transiciones de los botones duran 160ms y afectan color y fondo. Los diálogos entran en 220ms; los avisos, en 250ms. Ambos usan la curva `cubic-bezier(0.16, 1, 0.3, 1)`. Se respeta `prefers-reduced-motion`.

## Shapes

Los bordes suavemente redondeados distinguen el papel de cada elemento: etiquetas pequeñas, campos y botones moderados, tarjetas de 12px y diálogos de 16px. Los diálogos ocupan la pantalla completa y eliminan el radio en móvil. La variable base de HeroUI usa 0.625rem; los componentes propios aplican los radios explícitos del frontmatter.

## Components

### Buttons

El botón principal verde señala «Nuevo prompt». Los botones secundarios usan un fondo verde claro; las acciones discretas usan texto de apoyo y adquieren fondo al pasar el cursor. La altura mínima de los controles principales es 44px. El foco visible global usa un contorno de 2px y separación de 4px. «Ver prompt» es una acción textual subrayada al pasar el cursor.

### Chips

Las categorías aparecen como etiquetas pequeñas con fondo claro y texto verde. No actúan como botones. Las etiquetas de temas son botones de texto; «Favoritos» usa `aria-pressed` y fondo resaltado cuando está activo.

### Cards / Containers

Las tarjetas blancas muestran categoría, favorito, título, descripción, modelos, temas y acciones explícitas. El título abre el detalle; copiar y adaptar siguen siendo acciones separadas. Su relleno es 20px 24px 16px en escritorio y 16px 20px en móvil. Los títulos permiten palabras largas y no se recortan por altura fija.

### Inputs / Fields

La búsqueda ocupa una fila amplia con icono y atajo de teclado. El campo tiene una altura mínima de 48px, texto de 17px en escritorio y 16px en móvil. El contenedor usa borde de acento y un contorno tenue con `focus-within`. Los filtros nativos mantienen etiquetas visibles y altura mínima de 44px; en móvil usan texto de 16px.

### Navigation

La navegación principal consta de Biblioteca y Manual web. La página activa muestra color de acento, peso mayor y una línea inferior, vinculada a `aria-current`. Los enlaces conservan destinos reales y permiten abrir en otra pestaña. En móvil esta navegación ocupa su propia fila.

El índice del manual agrupa capítulos por tema. Cada capítulo tiene un hash de URL, estado activo, y enlaces anterior/siguiente cuando corresponden. El menú móvil expone su estado expandido.

### Checklist

Cada punto es una etiqueta con checkbox nativo, categoría pequeña y texto principal. Los puntos marcados adquieren fondo verde claro. El progreso se expresa con números y barra, y se conserva localmente. Los filtros muestran todos, pendientes o completados.

## Do's and Don'ts

### Do:
- Do conservar los tokens del frontmatter al extender los componentes existentes.
- Do mantener los párrafos del manual en 17px y comprobar su lectura en móvil.
- Do conservar los estados aria-current, aria-pressed y focus-visible donde corresponda.
- Do probar los títulos largos, filtros y acciones con el ancho disponible.
- Do conservar la reducción de movimiento y el flujo de lectura por capítulos.

### Don't:
- Don't convertir los párrafos del manual en metadatos pequeños.
- Don't sustituir los enlaces de capítulos por controles sin URL propia.
- Don't añadir sombras a las tarjetas para sustituir su separación actual por bordes.
- Don't confundir los ejemplos de código del manual con tokens de esta interfaz.
- Don't atribuir las decisiones de implementación a preferencias permanentes del usuario.

### Ajuste de color solicitado

Fondo piedra y cabecera salvia para reducir la luminosidad de grandes superficies, sin modo oscuro. El manual usa un papel cálido diferenciado (#ece9df). Las tarjetas tienen un tinte leve por categoría y etiquetas más marcadas; el nombre textual siempre acompaña al color.

| Categoría | Etiqueta | Texto | Tarjeta |
|---|---|---|---|
| Desarrollo | #c6d8e4 | #274c65 | #e5e9e7 |
| Diseño Web IA | #d6cce4 | #554068 | #eae5e9 |
| Marketing | #e9ccad | #784119 | #ece5d9 |
| Automatización | #bddbd2 | #285b50 | #e1e8e0 |
| Redacción | #e3c5ca | #713b48 | #ebe3e0 |
| Sistemas | #c0dadd | #28555c | #e1e8e6 |
| Razonamiento | #d4d9b5 | #515b25 | #e7e8da |
| General | #d7d3ca | #554f44 | #e7e5dc |

### Símbolo de marca

Prompts Célebres conserva su nombre. El símbolo son dos comillas escalonadas, papel y ámbar sobre verde, trazadas como SVG sin tipografías. `public/favicon.svg` se comparte entre el encabezado y el favicon; el ICO incluye 16, 32 y 48 px, y el icono Apple 180 px. El nombre completo permanece visible también en móvil.
