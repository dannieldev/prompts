# ⚡ Prompts Célebres — dannieldev

Bóveda personal de prompts probados, optimizados y listos para reutilizar con **variables dinámicas**, buscador instantáneo, categorización por áreas y recomendación por modelo de IA (**ChatGPT, Claude, Codex, Gemini, DeepSeek**).

---

## 🎯 Características Principales

1. **Buscador Omnibox en Tiempo Real**:
   - Búsqueda instantánea en títulos, descripciones, contenido, etiquetas y modelos.
   - Atajo de teclado: presiona `/` o `Cmd+K` para buscar inmediatamente.
2. **Variables Dinámicas Interactivas (`{{variable}}`)**:
   - Detecta automáticamente placeholders como `{{lenguaje}}`, `{{codigo}}`, `{{audiencia}}`.
   - Botón **"Rellenar y Usar" ⚡**: abre un formulario modal para ingresar los valores, previsualizar el prompt final y copiarlo al portapapeles con 1 solo clic.
3. **Copiado Rápido con 1 Clic**:
   - Copia directamente el prompt original o su versión parametrizada con confirmación visual rápida.
4. **Categorías & Filtros por Modelo**:
   - Áreas: 💻 Desarrollo, 📈 Marketing, ⚡ Automatización, ✍️ Redacción, ☁️ Sistemas, 🧠 Razonamiento, 📌 General.
   - Modelos: Claude 3.5 Sonnet, GPT-4o, Codex, Gemini 1.5 Pro, DeepSeek / Ollama.
   - Filtro de **Prompts Célebres ⭐ (Favoritos)** para tener los mejores siempre al alcance.
5. **Doble Persistencia (Local + Cloudflare D1)**:
   - Funciona 100% de inmediato en tu navegador en modo local offline con respaldo automático.
   - Conectable a Cloudflare D1 para sincronización multi-dispositivo y despliegue en `prompts.dannieldev.com`.
6. **Respaldo e Importación JSON**:
   - Descarga copias de seguridad de tu bóveda en cualquier momento o importa nuevos prompts.

---

## 🚀 Comandos Rápidos

```bash
# Iniciar entorno de desarrollo completo (Vite + Cloudflare D1 Worker)
npm run dev:all

# Iniciar únicamente la interfaz visual (modo rápido)
npm run dev

# Compilar frontend
npm run build

# Configurar base D1 en Cloudflare (una sola vez)
npm run cloud:setup

# Publicar en Cloudflare Workers (prompts.dannieldev.com)
npm run deploy
```

---

## ⌨️ Atajos de Teclado

- `/` o `Cmd + K`: Enfocar buscador.
- `N`: Abrir modal de nuevo prompt.
- `Esc`: Cerrar modales o limpiar búsqueda.

---

## 📁 Estructura del Proyecto

```
prompts/
├── worker.js                 # Worker Cloudflare con API REST sobre D1 y Static Assets
├── wrangler.jsonc            # Configuración de Cloudflare Workers, Assets y binding DB
├── migrations/
│   └── 0001_init.sql         # Esquema de la tabla 'prompts' en SQLite / D1
├── seeds.js                  # 10 Prompts Célebres iniciales (Desarrollo, Copy, Edge, etc.)
├── scripts/
│   ├── dev-all.mjs           # Ejecuta Vite + Wrangler concurrentemente
│   └── cloud-setup.mjs       # Creación de D1 en Cloudflare y migración remota
├── src/
│   ├── types.ts              # Modelos TypeScript
│   ├── lib/
│   │   ├── api.ts            # Cliente con soporte D1 Cloud + fallback LocalStorage
│   │   ├── variableUtils.ts  # Extractor y reemplazador de variables {{var}}
│   │   ├── constants.ts      # Categorías, iconos y modelos
│   │   └── seedData.ts       # Datos predeterminados
│   ├── components/
│   │   ├── Header.tsx        # Barra superior con omnibox y atajos
│   │   ├── CategoryFilter.tsx# Filtros por categoría, modelo, tags y favoritos
│   │   ├── PromptCard.tsx    # Tarjeta de prompt con acciones y variables
│   │   ├── VariableModal.tsx # Modal para rellenar variables en vivo y copiar
│   │   ├── PromptEditorModal.tsx # Creador y editor con Markdown preview
│   │   ├── PromptDetailModal.tsx # Vista de lectura completa
│   │   ├── ExportImportModal.tsx # Descarga y subida de respaldos JSON
│   │   └── Toast.tsx         # Notificaciones flotantes
│   ├── App.tsx               # Orquestación de estado y vistas
│   └── main.tsx              # Punto de entrada
└── Iniciar Prompts.command   # Acceso directo para macOS
```
