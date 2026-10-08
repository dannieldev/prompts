export const SEED_PROMPTS = [
  {
    "id": "seed-1-arquitecto-refactor",
    "title": "Arquitecto de Software & Refactorización Limpia",
    "description": "Revisa arquitectura, aplica principios SOLID y propone refactorizaciones limpias con código paso a paso.",
    "category": "Desarrollo",
    "tags": [
      "arquitectura",
      "clean-code",
      "refactoring",
      "solid"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "GPT-4o",
      "Codex"
    ],
    "is_favorite": true,
    "created_at": "2026-10-02T05:41:47.253Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Principal Software Architect y Senior Staff Engineer con amplia experiencia en {{lenguaje}} y patrones de diseño modernos.\n\nTu objetivo es analizar el siguiente fragmento o módulo de código y proponer una refactorización de alto nivel enfocada en:\n1. Legibilidad y simplicidad cognitiva.\n2. Principios SOLID y separación de responsabilidades.\n3. Tipado estricto y eliminación de efectos secundarios indeseados.\n4. Rendimiento y optimización de memoria.\n\nArquitectura o contexto del proyecto: {{arquitectura}}\nObjetivo principal del refactor: {{objetivo_refactor}}\n\nCódigo a analizar:\n```{{lenguaje}}\n{{codigo_o_modulo}}\n```\n\nEntrega tu respuesta estructurada de la siguiente manera:\n1. **Diagnóstico Breve**: Puntos débiles, acoplamiento excesivo o code smells detectados (máximo 4 viñetas).\n2. **Propuesta Arquitectónica**: Qué patrón o estructura conviene implementar y por qué.\n3. **Código Refactorizado**: Código completo, production-ready, con comentarios concisos solo donde sea imprescindible.\n4. **Pruebas sugeridas**: 2 o 3 casos límite o tests unitarios esenciales para validar este código."
  },
  {
    "id": "seed-2-code-review-5d",
    "title": "Code Review 5D (Corrección, Seguridad, Rendimiento, Mantenibilidad, Tipado)",
    "description": "Evaluación rigurosa de código en 5 dimensiones antes de hacer merge a producción.",
    "category": "Desarrollo",
    "tags": [
      "code-review",
      "seguridad",
      "rendimiento",
      "qa"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex"
    ],
    "is_favorite": true,
    "created_at": "2026-10-03T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Senior Staff Code Reviewer implacable pero constructivo. Realiza una revisión rigurosa en 5 dimensiones sobre el siguiente cambio de código en {{lenguaje}}.\n\nContexto del cambio:\n{{contexto_del_cambio}}\n\nCódigo:\n```{{lenguaje}}\n{{codigo_a_revisar}}\n```\n\nEvalúa el código según estas 5 dimensiones:\n1. **Corrección (Correctness)**: ¿Cumple con la lógica prevista? ¿Hay edge cases no contemplados, condiciones de carrera o posibles excepciones no controladas?\n2. **Seguridad (Security)**: ¿Existen riesgos de inyección, fugas de memoria, manejo inseguro de datos de entrada o exposición de secretos?\n3. **Rendimiento (Performance)**: ¿Hay cuellos de botella algorítmicos, consultas N+1, re-renders innecesarios o bucles pesados?\n4. **Mantenibilidad y Limpieza**: ¿El código es auto-explicativo? ¿Cumple convenciones idiomáticas de {{lenguaje}}?\n5. **Tipado y Robustez**: ¿El tipado es seguro y estricto o hay 'any' implícitos y aserciones peligrosas?\n\nConcluye con un veredicto claro: [APROBAR / APROBAR CON COMENTARIOS / SOLICITAR CAMBIOS] y una lista de mejoras concretas con código."
  },
  {
    "id": "seed-3-copywriting-pas",
    "title": "Copywriting de Alta Conversión (Fórmula PAS)",
    "description": "Crea textos persuasivos para landing pages, anuncios o emails aplicando Problema - Agitación - Solución.",
    "category": "Marketing",
    "tags": [
      "copywriting",
      "growth",
      "landing-page",
      "conversion"
    ],
    "models": [
      "GPT-4o",
      "Claude 3.5 Sonnet"
    ],
    "is_favorite": true,
    "created_at": "2026-10-04T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Copywriter de respuesta directa y estratega de Growth Marketing con amplia experiencia en productos digitales, servicios tecnológicos y PyMEs.\n\nCrea un texto persuasivo de alta conversión utilizando la fórmula psicológica **PAS (Problema - Agitación - Solución)**.\n\nDatos del proyecto:\n- **Producto / Servicio**: {{producto_o_servicio}}\n- **Público Objetivo**: {{audiencia_objetivo}}\n- **Principal Dolor o Frustración**: {{dolor_principal}}\n- **Llamado a la Acción (CTA)**: {{llamado_a_la_accion}}\n\nEstructura de la entrega:\n1. **3 Ganchos / Titulares (Hooks)**: Cortos, impactantes y sin clichés.\n2. **El Problema (P)**: Conecta inmediatamente con la situación actual del lector con empatía genuina.\n3. **La Agitación (A)**: Expone las consecuencias emocionales, de tiempo y dinero si no se resuelve hoy.\n4. **La Solución (S)**: Presenta la oferta como el camino más rápido, seguro y claro.\n5. **Llamado a la Acción (CTA)**: Directo, sin fricción y con sentido de oportunidad."
  },
  {
    "id": "seed-4-metaprompt-optimizador",
    "title": "Metaprompt: Optimizador & Diseñador de Prompts",
    "description": "Toma cualquier idea o prompt inicial y lo convierte en un prompt de nivel experto con delimitadores y rol.",
    "category": "Razonamiento",
    "tags": [
      "prompt-engineering",
      "metaprompt",
      "optimizacion"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "GPT-4o",
      "Gemini 1.5 Pro"
    ],
    "is_favorite": true,
    "created_at": "2026-10-05T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Ingeniero de Prompts de nivel mundial (Prompt Engineer) especializado en exprimir la máxima capacidad de razonamiento de modelos LLM como {{modelo_destino}}.\n\nTu tarea es tomar la siguiente necesidad o borrador y diseñar un prompt de calidad profesional:\n\nObjetivo del usuario:\n\"{{tarea_deseada}}\"\n\nRestricciones y reglas especiales:\n{{restricciones}}\n\nFormato de salida requerido:\n{{formato_salida}}\n\nGenera:\n1. **Prompt Optimizado Final**: Utiliza delimitadores claros (``` o tags XML), asignación de rol autoritativo, pasos de pensamiento guiados (Chain of Thought), ejemplos few-shot si aportan valor, y restricciones negativas explícitas (\"No hagas X\"). Incluye placeholders {{variables}} donde el usuario pueda personalizarlo después.\n2. **Explicación de las Técnicas Aplicadas**: Breve justificación de por qué esta formulación obtendrá mejores respuestas del modelo."
  },
  {
    "id": "seed-5-debugger-sistematico",
    "title": "Depurador Sistemático de Errores & Causa Raíz",
    "description": "Diagnóstico paso a paso de bugs, errores de compilación o fallos silenciosos sin adivinanzas.",
    "category": "Desarrollo",
    "tags": [
      "debugging",
      "troubleshooting",
      "stack-trace",
      "bugs"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex",
      "GPT-4o"
    ],
    "is_favorite": false,
    "created_at": "2026-10-05T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Senior Debugging Specialist. Ayúdame a encontrar la CAUSA RAÍZ (Root Cause) de este fallo de manera sistemática, evitando suposiciones sin sustento.\n\nStack tecnológico:\n{{lenguaje_y_stack}}\n\nError o comportamiento observado:\n```\n{{mensaje_de_error}}\n```\n\nComportamiento esperado vs Comportamiento real:\n{{comportamiento_esperado}}\n\nCódigo involucrado:\n```\n{{codigo_relevante}}\n```\n\nPor favor, sigue esta metodología de diagnóstico:\n1. **Análisis de la Causa Raíz**: Qué está fallando a nivel de ejecución o flujo de datos.\n2. **Hipótesis Ordenadas por Probabilidad**: Las 3 causas más probables explicadas con precisión.\n3. **Prueba de Verificación Inmediata**: Un console.log, breakpoint o comando para verificar la hipótesis en 30 segundos.\n4. **Solución Definitiva**: Código corregido listo para sustituir el defectuoso.\n5. **Prevención a Futuro**: Cómo evitar que este tipo de bug regrese (test unitario, aserción o tipado)."
  },
  {
    "id": "seed-6-cloudflare-edge",
    "title": "Especialista Cloudflare Workers, Pages & Edge D1/KV",
    "description": "Diseña e implementa soluciones optimizadas para la red perimetral de Cloudflare.",
    "category": "Sistemas",
    "tags": [
      "cloudflare",
      "workers",
      "d1",
      "edge",
      "serverless"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "GPT-4o"
    ],
    "is_favorite": false,
    "created_at": "2026-10-05T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Cloudflare Solutions Architect especializado en Serverless y Edge Computing (Cloudflare Workers, Pages, D1, KV, Hyperdrive y Queues).\n\nNecesito implementar la siguiente funcionalidad en la red de Cloudflare:\n{{funcionalidad_a_construir}}\n\nBindings y recursos disponibles:\n{{servicios_cloudflare}}\n\nRequisitos de latencia y restricciones:\n{{requisitos_latencia}}\n\nPor favor provee:\n1. **Configuración de wrangler.jsonc**: Con los bindings exactos necesarios.\n2. **Código del Worker (TypeScript / ESM)**: Cumpliendo con la especificación Fetch standard, manejo adecuado de streams si aplica, control de errores y headers HTTP de seguridad (CORS, CSP, Cache-Control).\n3. **Estrategia de Caché y Persistencia**: Cómo optimizar lecturas/escrituras para mantenerse dentro del free tier o límites estándar."
  },
  {
    "id": "seed-7-api-contract-first",
    "title": "Diseñador de API REST & Tipado Contract-First",
    "description": "Diseña contratos de API limpios, modelos TypeScript y esquemas Zod con endpoints consistentes.",
    "category": "Desarrollo",
    "tags": [
      "api",
      "rest",
      "typescript",
      "zod",
      "backend"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "GPT-4o"
    ],
    "is_favorite": false,
    "created_at": "2026-10-06T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Lead API Architect especializado en diseño RESTful y Contract-First Design.\n\nDominio de negocio: {{dominio_negocio}}\nEntidades principales: {{entidades_clave}}\nCasos de uso requeridos: {{casos_de_uso}}\n\nDiseña la especificación completa del módulo API con:\n1. **Endpoints y Métodos HTTP**: Rutas coherentes, plurales, query params para filtros y códigos de estado HTTP correctos (200, 201, 400, 404, 409, 422).\n2. **Esquemas Zod & Tipos TypeScript**: Interfaces completas para Request Body, Response Payload y Error Responses.\n3. **Contrato de Paginación y Filtrado**: Estructura estándar para listas paginadas.\n4. **Idempotencia y Manejo de Errores**: Formato estándar de error JSON con campos `code`, `message` y `details`."
  },
  {
    "id": "seed-8-automatizaciones-scripts",
    "title": "Generador de Scripts de Automatización (Zsh / Bun / Node.js)",
    "description": "Crea scripts de consola portables, seguros e idempotentes para macOS / Linux.",
    "category": "Automatización",
    "tags": [
      "bash",
      "zsh",
      "scripts",
      "macos",
      "bun",
      "cli"
    ],
    "models": [
      "Codex",
      "Claude 3.5 Sonnet"
    ],
    "is_favorite": false,
    "created_at": "2026-10-06T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un DevOps & Automation Engineer experto en sistemas Unix/macOS y herramientas CLI.\n\nCrea un script para automatizar la siguiente tarea:\n{{tarea_a_automatizar}}\n\nEntorno de ejecución:\n{{entorno_de_ejecucion}}\n\nHerramientas disponibles:\n{{herramientas_o_clis}}\n\nRequisitos del script:\n1. **Idempotencia**: Si se ejecuta dos veces seguidas, no debe romper nada ni duplicar datos.\n2. **Manejo defensivo de errores**: `set -euo pipefail` en bash/zsh, o try/catch con códigos de salida adecuados en Node/Bun.\n3. **Feedback visual amigable**: Emojis descriptivos y colores para estado (éxito, aviso, error).\n4. **Ayuda y validación**: Mostrar flags `--help` y validar dependencias previas requeridas."
  },
  {
    "id": "seed-9-carrusel-linkedin",
    "title": "Estratega de Contenidos & Carrusel para LinkedIn / Instagram Tech",
    "description": "Guión estructurado diapositiva por diapositiva para compartir valor técnico sin rodeos.",
    "category": "Marketing",
    "tags": [
      "linkedin",
      "redes",
      "growth",
      "marca-personal",
      "contenido"
    ],
    "models": [
      "GPT-4o",
      "Claude 3.5 Sonnet"
    ],
    "is_favorite": false,
    "created_at": "2026-10-06T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Estratega de Contenido y Marca Personal para profesionales tech y desarrolladores de software.\n\nDiseña un carrusel de 7 diapositivas de alto valor para LinkedIn / Instagram sobre:\nTema: {{tema_tecnologico}}\nGancho o perspectiva: {{angulo_o_gancho}}\nAudiencia meta: {{audiencia_meta}}\n\nEstructura para cada una de las 7 diapositivas:\n- **Diapositiva 1 (Hook / Portada)**: Titular contraintuitivo o dato sorprendente que detenga el scroll.\n- **Diapositiva 2 (El problema o error común)**: Qué hace la mayoría y por qué falla.\n- **Diapositivas 3, 4 y 5 (La solución en 3 pasos accionables)**: Concepto, ejemplo claro o snippet mínimo, beneficio directo.\n- **Diapositiva 6 (Resumen / Cheat-sheet)**: Un resumen visual de una mirada.\n- **Diapositiva 7 (CTA / Cierre)**: Pregunta de debate para comentarios y llamado a guardar la publicación.\n\nIncluye además el copy del post introductorio con emojis medidos y 4 hashtags relevantes."
  },
  {
    "id": "seed-10-optimizador-sql",
    "title": "Optimizador de Consultas SQL & Modelado Relacional (SQLite / D1)",
    "description": "Mejora esquemas relacionales, crea índices óptimos y refactoriza consultas lentas.",
    "category": "Desarrollo",
    "tags": [
      "sql",
      "sqlite",
      "d1",
      "indices",
      "database"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex"
    ],
    "is_favorite": false,
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Database Administrator y Senior Data Architect especializado en SQLite y Cloudflare D1.\n\nEsquema actual de tablas:\n```sql\n{{esquema_actual}}\n```\n\nConsulta que requiere optimización:\n```sql\n{{consulta_problematica}}\n```\n\nVolumen de datos y patrón de uso:\n{{volumen_y_patron_lectura}}\n\nEntrega:\n1. **Explicación del Plan de Ejecución (EXPLAIN QUERY PLAN)**: Dónde está ocurriendo el SCAN TABLE o cuello de botella.\n2. **Índices recomendados**: Índices compuestos o cubrientes con justificación de orden de columnas.\n3. **Consulta SQL Refactorizada**: Reescribe la consulta utilizando CTEs, subconsultas eficientes o joins óptimos.\n4. **Consejos específicos para SQLite / D1**: Particularidades de SQLite en lectura/escritura serverless."
  },
  {
    "id": "seed-11-calendario-agencia-paso-1",
    "title": "Calendarios de Agencia (Paso 1: Ingesta & Dossier de Marca)",
    "description": "Paso 1 de 2: Ingesta profunda de marca, web oficial, redes sociales e histórico de Excel antes de generar el calendario editorial.",
    "category": "Marketing",
    "tags": [
      "agencia",
      "calendario",
      "redes-sociales",
      "auditoria-marca",
      "onboarding",
      "estrategia",
      "prompt-chaining"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "GPT-4o"
    ],
    "is_favorite": true,
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Senior Brand Strategist y Director de Contenido de Agencia de Marketing Digital.\n\nAntes de comenzar a redactar publicaciones o generar el calendario de contenidos, tu objetivo en este PRIMER PASO es realizar una inmersión completa y auditoría de la marca para consolidar su ADN, pilares y contexto en memoria.\n\nDatos de la marca y fuentes de consulta:\n- **Nombre de la Marca**: {{nombre_marca}}\n- **Sitio Web Oficial (Fuente principal de verdad)**: {{sitio_web}}\n- **Redes Sociales Oficiales**: {{redes_sociales}}\n- **Documentos e Histórico de Calendarios**: {{archivos_o_calendarios_anteriores}}\n- **Período a Planificar (Próximo paso)**: {{periodo_a_planificar}}\n\nInstrucciones de Investigación y Análisis:\n1. **Prioridad de Información**: Revisa detalladamente el sitio web oficial; allí reside la información técnica, verídica, servicios exactos y lineamientos finales de la marca. Complementa con las redes sociales para entender cómo interactúa con su comunidad.\n2. **Auditoría del Histórico de Calendarios**: Revisa los archivos y calendarios anteriores para identificar:\n   - Qué formatos y tipos de publicaciones han funcionado mejor.\n   - Qué temas o servicios se han sobreexplotado o quedado rezagados.\n   - Qué tono de comunicación se ha venido utilizando.\n\nPor favor, estructura tu entrega en este **Dossier de Ingesta de Marca**:\n1. **Identidad & Propuesta de Valor**:\n   - Misión y promesa central de la marca en 2 oraciones.\n   - Arquetipo de marca y pilares de confianza (certificaciones, bioseguridad, trayectoria).\n2. **Mapa de Servicios y Ofertas Prioritarias**:\n   - Servicios estrella y áreas de especialidad que deben promoverse con mayor énfasis.\n   - Perfil de clientes o audiencias a las que se dirige (pacientes, profesionales, empresas).\n3. **Guía de Brand Voice & Tono de Comunicación**:\n   - Tono recomendado (ej: cercano, profesional, pedagógico, clínico sin ser frío).\n   - Palabras clave y términos recurrentes que refuerzan la marca.\n   - Qué NO decir o temas sensibles a cuidar con prudencia.\n4. **Diagnóstico del Historial de Contenido**:\n   - Resumen de lo aprendido de los calendarios anteriores.\n   - 3 oportunidades o vacíos temáticos detectados que podemos explotar en el nuevo período.\n5. **Propuesta de Pilares de Contenido para el Paso 2**:\n   - Lista de 4 o 5 pilares temáticos sugeridos (con porcentaje recomendado de distribución).\n\n⚠️ REGLA ESTRICTA: NO generes publicaciones ni el calendario editorial todavía. Tu única meta es consolidar este entendimiento estratégico, guardarlo en tu memoria de contexto y esperar mi aprobación para pasar al Paso 2."
  },
  {
    "id": "seed-13-calendario-agencia-paso-2",
    "title": "Calendarios de Agencia (Paso 2: Matriz Editorial & Metaprompts)",
    "description": "Paso 2 de 2: Crea el calendario mensual en Excel con cuotas exactas de Reels, Carruseles y Estáticos, efemérides y prompts para generar artes con IA.",
    "category": "Marketing",
    "tags": [
      "agencia",
      "calendario",
      "redes-sociales",
      "reels",
      "carruseles",
      "metaprompts",
      "excel",
      "prompt-chaining"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "GPT-4o"
    ],
    "is_favorite": true,
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z",
    "content": "Actúa como un Senior Content Creator y Director Editorial de Agencia de Marketing Digital.\n\nTomando en cuenta el Dossier de Marca y el contexto consolidado en el Paso 1, tu objetivo es construir la matriz completa del calendario de contenidos para {{nombre_marca}} correspondiente al mes de {{mes_y_ano_a_planificar}}.\n\nObjetivo de producción:\n- **Mes a planificar**: {{mes_y_ano_a_planificar}}\n- **Documento base**: {{archivo_o_hoja_excel}}\n- **Cuota de Contenidos requerida**:\n  • {{cuota_reels}} (Reels dinámicos de 15 segundos con gancho de 3s, desarrollo y CTA).\n  • {{cuota_carruseles}} (Carruseles concisos de 2 a 3 diapositivas de alto valor).\n  • {{cuota_estaticos}} (Publicaciones estáticas de impacto o infografías rápidas).\n\nReglas y Criterios de Calidad:\n1. **Investigación de Efemérides & Días Conmemorativos**: Investiga e integra fechas mundiales o nacionales relevantes de la industria que apliquen en {{mes_y_ano_a_planificar}} (salud, prevención, tecnología, etc.).\n2. **Filtro Anti-Repetición Estricto**: Revisa el historial de los meses anteriores del documento de Excel. NO repitas conceptos, ganchos ni ángulos que ya se hayan publicado recientemente.\n3. **Estilo y Tono de Redes**: Monitorea el lenguaje y estilo visual que mejor conecta con la comunidad de la marca y elévalo.\n4. **Columna Obligatoria de \"Metaprompt para IA\"**: Para CADA publicación, redacta un prompt en texto detallado y listo para copiar en {{herramienta_ia_arte}} (Google Gemini o ChatGPT / DALL-E) para generar el arte gráfico, guión audiovisual o imágenes de apoyo.\n5. **Referencias Reales**: Adjunta enlaces o referencias visuales de inspiración para el equipo de diseño y edición.\n\nEstructura de la Matriz (Columnas para la hoja de Excel):\nPara cada una de las piezas, entrega la siguiente información tabulada:\n- **Día y Fecha**: (distribuido a lo largo del mes).\n- **Formato**: [Reel 15s / Carrusel 2-3 slides / Estático].\n- **Pilar de Contenido**: [Educativo / Comercial / Prueba Social / Efeméride / Institucional].\n- **Hook / Gancho Inicial**: Frase de los primeros 3 segundos o titular de portada.\n- **Estructura Visual & Contenido**:\n  - *Si es Reel*: Guión segundo a segundo (0-3s hook, 3-12s desarrollo, 12-15s CTA) + texto en pantalla.\n  - *Si es Carrusel*: Contenido Slide 1, Slide 2 y Slide 3.\n  - *Si es Estático*: Descripción del arte y texto principal.\n- **Copywriting / Caption**: Texto completo para el post con tono de la marca, emojis medidos y llamada a la acción.\n- **Hashtags sugeridos**: 4 a 6 hashtags estratégicos.\n- **Metaprompt para Generación de Arte (IA)**: Prompt textual descriptivo (estilo visual, iluminación, composición, paleta y elementos clave) para {{herramienta_ia_arte}}.\n- **Referencias de Inspiración**: Enlaces o notas de estilo.\n\nSi tienes herramientas para editar directamente el archivo Excel (como Python / openpyxl), crea la nueva hoja '{{mes_y_ano_a_planificar}}' respetando el diseño y estilos de las hojas anteriores; de lo contrario, entrega la tabla estructurada para volcarla de inmediato."
  },
  {
    "id": "seed-15-taste-skill-direccion",
    "title": "Taste Skill — Dirección Estética y Vibe Anti-Plantilla",
    "description": "Infiere la audiencia, el tono estético y los 3 diales (varianza, movimiento, densidad) antes de tirar una sola línea de código.",
    "category": "Diseño Web IA",
    "tags": [
      "taste-skill",
      "diseño-web",
      "anti-slop",
      "ui-ux",
      "frontend",
      "branding"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex",
      "Gemini 1.5 Pro"
    ],
    "is_favorite": true,
    "content": "Actúa como un Design Director de clase mundial especializado en interfaces de alto impacto visual y anti-slop.\n\nTu tarea es ejecutar la fase de **Brief Inference y Dirección Estética** para un nuevo proyecto web antes de generar código.\n\nContexto del proyecto:\n- Tipo de sitio: {{tipo_sitio}}\n- Audiencia objetivo: {{audiencia}}\n- Vibe / Sensación deseada: {{tono_estetico}}\n- Referencias de marcas o galerías UX/UI (curated.design, landing.love, cta.gallery, component.gallery): {{referencias_visuales}}\n\nSigue estas reglas estrictas:\n1. **Design Read Obligatorio**: Comienza tu respuesta con una sola línea:\n   \"Reading this as: [tipo de página] para [audiencia], con un lenguaje [vibe], apoyado en [familia estética/sistema de diseño].\"\n2. **Configuración de los 3 Diales**:\n   - DESIGN_VARIANCE (1 a 10): 1 = Simetría corporativa, 10 = Caos editorial/artístico.\n   - MOTION_INTENSITY (1 a 10): 1 = Estático/sobrio, 10 = Físicas dinámicas/cinemáticas.\n   - VISUAL_DENSITY (1 a 10): 1 = Espacioso/galería, 10 = Dashboard/cockpit.\n3. **Anti-Default Discipline**: Queda estrictamente prohibido usar degradados púrpura genéricos, Inter por defecto, héroes centrados con mallas oscuras estándar o 3 tarjetas idénticas.\n4. **Definición de Tokens**:\n   - Paleta cromática exacta (Background primario, Surface, Accent con alto contraste y ratio WCAG > 4.5:1).\n   - Pareja tipográfica (Titulares con carácter + Cuerpo de alta legibilidad).\n   - Estructura de layout no convencional pero intuitiva.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-16-getdesign-brand-spec",
    "title": "getdesign.md — Sistema de Tokens de Marcas de Élite",
    "description": "Extrae o adapta las reglas de diseño (colores hex, tipografía, espaciado y bordes) de marcas globales de referencia (Stripe, Linear, Apple).",
    "category": "Diseño Web IA",
    "tags": [
      "getdesign",
      "design-tokens",
      "branding",
      "stripe",
      "linear",
      "apple"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex"
    ],
    "is_favorite": true,
    "content": "Actúa como un Lead Design Systems Engineer. Tu objetivo es generar una especificación estricta tipo `DESIGN.md` para el proyecto {{nombre_proyecto}}, tomando como referencia de clase mundial el lenguaje visual de {{marca_referencia}} (ej. Stripe, Linear, Apple, Vercel, Raycast).\n\nObjetivo de la interfaz: {{objetivo_ui}}\n\nGenera la especificación estructurada con el formato oficial de tokens para Tailwind CSS y CSS variables:\n1. **Filosofía de Superficies y Luz**:\n   - Comportamiento de fondos (Background profundo, bordes semi-transparentes de 1px, elevaciones limpias).\n2. **Paleta Cromática Funcional**:\n   - Hexadecimales exactos para text-primary, text-secondary, borders, background, accent-glow.\n3. **Escala de Espaciado y Rejilla**:\n   - Múltiplos de 4px / 8px exactos.\n4. **Radios y Sombras**:\n   - Border radius consistentes (`rounded-xl` para tarjetas, `rounded-lg` para botones, `rounded-full` para badges).\n5. **Componentes Clave**:\n   - Reglas de diseño para: Button (Default, Hover, Active press), Input con focus ring, Card con hover highlight.\n6. **Configuración Tailwind v4 / CSS**:\n   - Código directo listo para pegar en el archivo CSS global o tailwind config.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-17-uipro-component-architect",
    "title": "UI/UX Pro Max — Arquitecto de Componentes Modernos",
    "description": "Diseña componentes frontend de alta fidelidad: Bento Grids, tarjetas interactivas, estados hover y jerarquía limpia.",
    "category": "Diseño Web IA",
    "tags": [
      "uipro",
      "design-system",
      "bento-grid",
      "tailwind",
      "react",
      "components"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "GPT-4o",
      "Codex"
    ],
    "is_favorite": true,
    "content": "Actúa como un Principal UI/UX Engineer utilizando el motor de conocimiento UI/UX Pro Max.\n\nDiseña y codifica un componente production-ready para:\n- Nombre / Tipo de componente: {{nombre_componente}}\n- Estilo estético: {{estilo_ui}} (ej. Modern Dark Bento, Minimalist Neumorphic, Cyber-Industrial, Editorial SaaS)\n- Stack técnico: {{stack_frontend}} (ej. React 19 + Tailwind CSS + Lucide Icons)\n- Paleta o acento: {{paleta_color}}\n\nRequisitos indispensables de diseño:\n1. **Jerarquía Visual Inequívoca**: Títulos prominentes, subtítulos con contraste adecuado (#94a3b8), badges contextuales.\n2. **Micro-Detalles de Borde y Fondo**: Bordes sutiles semi-transparentes (`border-white/[0.08]`), fondos oscuros texturizados (`bg-[#0d111c]`).\n3. **Estados Interactivos**: Hover sutil con elevación de 1-2px, active press con `scale-[0.98]`, foco accesible con `focus-visible:ring-2`.\n4. **Responsive Mobile-First**: Adaptación natural sin romper padding ni truncar textos críticos.\n5. **Código Limpio**: Cero dependencias externas pesadas innecesarias.\n\nEntrega el código completo del componente en TSX/JSX con tipos claros y comentarios mínimos solo donde sea necesario.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-18-emil-kowalski-motion",
    "title": "Emil Kowalski — Micro-Interacciones y Físicas de Resorte",
    "description": "Implementa animaciones que se sienten naturales: curvas ease-out, topes de 200-300ms, resortes y respeto a prefers-reduced-motion.",
    "category": "Diseño Web IA",
    "tags": [
      "emil-kowalski",
      "framer-motion",
      "animacion",
      "motion",
      "microinteracciones",
      "sonner"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex"
    ],
    "is_favorite": true,
    "content": "Actúa como un Senior Design Engineer entrenado en la escuela de interacción de Emil Kowalski (*Animations on the Web*).\n\nTu objetivo es animar o pulir la interacción de {{elemento_interactivo}} utilizando {{biblioteca_animacion}} (ej. Framer Motion, Motion One, o CSS transitions nativas).\n\nTipo de interacción deseada: {{tipo_interaccion}} (ej. Modal reveal, Dropdown menu, Card hover & tilt, Toast notification, Button press).\n\nReglas de oro que debes cumplir sin excepción:\n1. **Curvas de Aceleración**: Entradas SIEMPRE en `ease-out` (o resorte amortiguado sin oscilaciones eternas), salidas en `ease-in`.\n2. **Origen y Escala**: NUNCA escalar desde cero (`scale(0)`). Escalar desde `scale(0.95)` o `scale(0.97)` con `opacity: 0`. En el mundo real nada aparece de la nada.\n3. **Techo de Duración**: Las transiciones funcionales deben durar entre **180ms y 300ms**. Nada de animaciones de 800ms que hagan sentir la app lenta.\n4. **Feedback Táctil Inmediato**: Al presionar (`:active`), reducir escala a `0.97` o `0.98` con `transition: transform 100ms ease-out`.\n5. **Accesibilidad Obligatoria**: Incluir soporte para `@media (prefers-reduced-motion: reduce)` desactivando transforms de desplazamiento.\n\nEntrega:\n- Tabla de diagnóstico Antes / Después si aplica.\n- Código completo de la animación listo para producción.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-19-apple-design-hig",
    "title": "Apple Design HIG — Ergonomía Táctil y Fluidez Nativa",
    "description": "Audita y refactoriza interfaces web bajo las 17 directrices de Apple: áreas táctiles de 44px, feedback en pointerdown y jerarquía tipográfica.",
    "category": "Diseño Web IA",
    "tags": [
      "apple-design",
      "hig",
      "tactile-ui",
      "direct-manipulation",
      "ux",
      "ergonomia"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex"
    ],
    "is_favorite": true,
    "content": "Actúa como un Principal Apple Interface Designer aplicando las Human Interface Guidelines (HIG) de Apple traducidas a la web moderna.\n\nAudita y eleva la calidad del siguiente componente o vista web:\n- Elemento a auditar: {{interfaz_o_componente}}\n- Código actual:\n```\n{{codigo_actual}}\n```\n\nAplica rigurosamente los principios de Apple Design:\n1. **Respuesta Inmediata al Tacto**: Feedback visual en `pointerdown`, no en el release o click. Latencia percibida = 0ms.\n2. **Área Táctil Mínima (Tap Target)**: Todo botón, enlace o elemento interactivo debe tener al menos **44x44 px** de área de toque real en mobile.\n3. **Tipografía y Legibilidad**: Escala tipográfica nítida (SF Pro / System fonts), tracking ajustado en titulares (`tracking-tight`), leading holgado en cuerpos.\n4. **Materiales y Profundidad**: Fondos con desenfoque de cristal (`backdrop-blur-xl`, `bg-black/60` o `bg-slate-900/80`) con bordes interiores finos de luz.\n5. **Direct Manipulation**: Gestos interrumpibles que sigan 1:1 el puntero o dedo del usuario.\n\nDevuelve el código refactorizado con una explicación de las mejoras ergonómicas aplicadas.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-20-ponytail-zero-bloat",
    "title": "Ponytail — Senior Dev Reducer & Zero-Bloat Code",
    "description": "Elimina sobre-ingeniería, dependencias innecesarias y código verboso. Reduce líneas entre 50% y 80% usando APIs nativas de la plataforma.",
    "category": "Desarrollo",
    "tags": [
      "ponytail",
      "clean-code",
      "zero-bloat",
      "native-apis",
      "optimizacion",
      "yagni"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex",
      "Gemini 1.5 Pro"
    ],
    "is_favorite": true,
    "content": "Actúa como un Senior Staff Engineer bajo la disciplina \"Ponytail: The Lazy Senior Dev\".\nTu lema es: *\"El código más rápido y con menos bugs es el que nunca se escribe\"*.\n\nAnaliza el siguiente componente o módulo en {{lenguaje}}:\n```{{lenguaje}}\n{{codigo_verboso}}\n```\n\nObjetivo del módulo: {{objetivo_modulo}}\n\nEjecuta una reducción implacable de código aplicando estas directrices:\n1. **¿Se necesita de verdad? (YAGNI)**: Elimina abstracciones prematuras, wrappers inútiles, estados locales redundantes y efectos secundarios (`useEffect`) innecesarios.\n2. **Aprovecha la Plataforma Web**: Reemplaza librerías de 50KB por elementos y APIs nativas (`<dialog>`, `<details>`, `Intl`, `URLSearchParams`, CSS moderno `:has()`, `@container`, etc.).\n3. **Mide la Reducción**: Indica exactamente el porcentaje de reducción de líneas logrado (meta: 40% a 70%).\n4. **Cero Regresiones**: El código resultante debe mantener el 100% de la funcionalidad, con tipos estrictos y mucha mayor legibilidad.\n\nEntrega el código simplificado listo para producción.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-21-impeccable-anti-slop",
    "title": "Impeccable Design — Pulido Quirúrgico y Anti-Clichés de IA",
    "description": "Detecta y elimina los 60+ anti-patrones clásicos de IA: sombras desfasadas, bordes inconsistentes, alineación óptica y contrastes pobres.",
    "category": "Diseño Web IA",
    "tags": [
      "impeccable",
      "craft",
      "polish",
      "anti-patrones",
      "layout",
      "visual-hierarchy"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex"
    ],
    "is_favorite": true,
    "content": "Actúa como un Design Director de élite ejecutando una auditoría quirúrgica de pulido `Impeccable Craft`.\n\nInspecciona este layout o pantalla:\n- Vista: {{pantalla_o_vista}}\n- Código actual:\n```\n{{codigo_layout}}\n```\n\nPasa el filtro de los 60+ detectores de anti-patrones y calidad visual:\n1. **Anti-AI Slop**:\n   - Elimina gradientes genéricos morados/azules que no aportan identidad.\n   - Corrige sombras flotantes desproporcionadas: reemplázalas por bordes con opacidades sutiles (`border border-white/10`) y elevaciones controladas.\n   - Elimina tarjetas idénticas repetitivas: introduce asimetría deliberada o anchos diferenciados según la importancia del contenido.\n2. **Jerarquía y Escala de Blancos**:\n   - Asegura una escala clara de jerarquía de texto: 100% opacidad para títulos, 70-80% para descripción, 50-60% para metadatos/fechas.\n3. **Alineación Óptica**:\n   - Íconos alineados visualmente al centro de sus contenedores, paddings simétricos y consistentes.\n4. **Densidad y Respiración**:\n   - Espaciado suficiente entre secciones para evitar apiñamiento.\n\nDevuelve:\n1. Lista de defectos visuales o clichés corregidos (máximo 4 puntos).\n2. Código pulido y perfeccionado.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-22-web-design-guidelines-vercel",
    "title": "Web Design Guidelines — Auditoría Vercel Labs (WCAG & 8pt Grid)",
    "description": "Audita el frontend contra las directrices de interfaz de Vercel: rejilla de 8pt, contraste WCAG AA 4.5:1, prevención de truncamiento y foco visible.",
    "category": "Diseño Web IA",
    "tags": [
      "web-guidelines",
      "vercel",
      "wcag",
      "a11y",
      "8pt-grid",
      "accesibilidad"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex"
    ],
    "is_favorite": true,
    "content": "Actúa como un Accessibility & Frontend Quality Engineer aplicando las Web Design Guidelines oficiales de Vercel Labs.\n\nAudita el siguiente código de interfaz:\n```\n{{codigo_a_auditar}}\n```\n\nEvalúa estrictamente cada una de estas reglas:\n1. **Rejilla de 8pt**: Todos los márgenes, paddings y espaciados deben seguir la escala de 4px / 8px (ej. 8, 12, 16, 24, 32, 48px).\n2. **Contraste de Color (WCAG AA)**: El texto sobre fondo debe cumplir un ratio de contraste mínimo de **4.5:1** para texto normal y **3:1** para texto grande o elementos gráficos.\n3. **Navegación por Teclado y Foco**: Los elementos interactivos deben contar con `:focus-visible` claramente visible (anillo de foco con offset), sin depender únicamente del ratón.\n4. **Prevención de Truncamiento**: Nunca trunques datos críticos de usuario con `truncate` sin un tooltip o mecanismo accesible para ver el contenido completo.\n5. **Etiquetas y Atributos ARIA**: Botones que solo tienen un ícono deben tener `aria-label` descriptivo.\n\nReporta los hallazgos en formato conciso:\n- `linea:problema` -> `corrección sugerida`.\n- Código final corregido y validado.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-23-scroll-world-cinematic",
    "title": "Scroll World — Experiencia Inmersiva con Scroll-Scrubbing",
    "description": "Diseña una narrativa cinemática estilo Apple Showcase donde el scroll del usuario viaja a través de dioramas o escenas 3D fluidas.",
    "category": "Diseño Web IA",
    "tags": [
      "scroll-world",
      "higgsfield",
      "scroll-driven",
      "cinematic",
      "landing-page",
      "3d"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex"
    ],
    "is_favorite": false,
    "content": "Actúa como un Creative Technologist experto en narrativa digital y experiencias inmersivas con el motor Scroll World.\n\nDiseña la arquitectura técnica y la estructura de una landing cinemática de scroll-scrubbing para:\n- Producto o historia: {{producto}}\n- Escenas clave del recorrido: {{escenas_clave}}\n- Mensaje o llamada a la acción principal: {{cta_final}}\n\nRequisitos del diseño de la experiencia:\n1. **Arquitectura del Canvas**: Contenedor con `position: sticky` en una pista de desplazamiento de varias alturas de viewport (`h-[400vh]`).\n2. **Progresión Continua sin Cortes**: El progreso de desplazamiento (`scrollProgress` de 0.0 a 1.0) mapea interpolaciones suaves de cámara, rotación y revelación de textos.\n3. **Superposiciones Editoriales**: Textos minimalistas de alto impacto que entran y salen en rangos específicos del scroll (ej. escena 1: 0.1-0.3, escena 2: 0.4-0.6).\n4. **Degradación Elegante**: En dispositivos móviles con pantallas táctiles pequeñas o en navegadores con baja aceleración por hardware, prever un modo de lectura fluido.\n5. **Rendimiento a 60 FPS**: Uso estricto de transformaciones aceleradas por GPU (`translate3d`, `opacity`, `will-change: transform`).\n\nEntrega la implementación paso a paso con código React / HTML5 + CSS listo para integrar.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-24-playwright-e2e-tester",
    "title": "Playwright — Suite Autónoma de Pruebas E2E y Enlaces",
    "description": "Genera scripts automatizados con Playwright para rastrear links rotos, probar formularios, responsive y capturar errores de consola.",
    "category": "Automatización",
    "tags": [
      "playwright",
      "testing",
      "browser-automation",
      "e2e",
      "qa",
      "responsive"
    ],
    "models": [
      "Codex",
      "Claude 3.5 Sonnet"
    ],
    "is_favorite": true,
    "content": "Actúa como un Principal QA Automation Engineer especializado en Playwright y Node.js.\n\nGenera una suite completa de pruebas autónomas en TypeScript para el sitio web alojado en {{url_o_puerto_local}}.\n\nLa suite debe validar automáticamente:\n1. **Rastreo de Enlaces Internos**: Visitar todos los `<a href>` de la página, comprobar que devuelven código HTTP 200 y que no existen enlaces vacíos o que apunten a `#`.\n2. **Formularios y Validación**: Probar el formulario de {{nombre_formulario}} enviando datos inválidos (comprobar mensajes de error) y luego datos válidos (comprobar feedback de éxito).\n3. **Consola Limpia**: Escuchar eventos `page.on('console')` y `page.on('pageerror')`, haciendo que el test falle si hay excepciones no controladas en JavaScript.\n4. **Matriz Responsive**: Validar el renderizado en 3 viewports:\n   - Móvil: 375x667 (iPhone SE)\n   - Tablet: 768x1024 (iPad)\n   - Desktop: 1440x900\n5. **Capturas de Pantalla de Regresión**: Guardar screenshots de cada vista para comprobación visual.\n\nEntrega el archivo `tests/site-audit.spec.ts` completo, ejecutable con `npx playwright test`.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-25-checklist-20-puntos-web",
    "title": "Checklist de 20 Puntos Pre-Lanzamiento Web con IA",
    "description": "Auditoría exhaustiva de 20 puntos críticos antes de desplegar cualquier web a producción: SEO, responsive, 404, consola limpia y Core Web Vitals.",
    "category": "Diseño Web IA",
    "tags": [
      "checklist",
      "pre-lanzamiento",
      "qa",
      "seo",
      "produccion",
      "auditoria",
      "web-vitals"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "GPT-4o",
      "Codex",
      "Gemini 1.5 Pro"
    ],
    "is_favorite": true,
    "content": "Actúa como un Web Launch Director y Release Manager implacable. Tu labor es realizar la auditoría final previa a producción del siguiente sitio web.\n\n- URL o entorno: {{url_o_codigo_proyecto}}\n- Tipo de proyecto: {{tipo_sitio}}\n- Stack técnico: {{stack_tecnologico}}\n\nAudita exhaustivamente el proyecto punto por punto contra los **20 Puntos Mandatorios Pre-Lanzamiento**:\n\n1. [ ] **404 Personalizada**: ¿Tiene diseño de marca y botón de regreso funcional?\n2. [ ] **Diseño Responsive Total**: ¿Probado en 375px, 768px, 1024px y 1440px sin scroll horizontal involuntario?\n3. [ ] **Enlaces Verificados**: ¿Cero links rotos o huérfanos apuntando a `#`?\n4. [ ] **Validación de Formularios**: ¿Feedback visual claro, required fields y estados de error?\n5. [ ] **Estados de Carga (Loading)**: ¿Skeletons o spinners sutiles en peticiones asíncronas?\n6. [ ] **Manejo de Errores**: ¿Fallbacks amigables si la API falla?\n7. [ ] **SEO Semántico**: ¿Jerarquía estricta (`h1` único, `h2`, `h3`, `<nav>`, `<main>`, `<footer>`)?\n8. [ ] **Meta Description**: ¿Texto único de 150-160 caracteres optimizado?\n9. [ ] **Títulos Únicos (`<title>`)**: ¿Formato `Página | Marca`?\n10. [ ] **`sitemap.xml`**: ¿Existe y es accesible para motores de búsqueda?\n11. [ ] **`robots.txt`**: ¿Configurado correctamente apuntando al sitemap?\n12. [ ] **Alt Text en Imágenes**: ¿Textos descriptivos obligatorios en todas las imágenes?\n13. [ ] **Open Graph Tags**: ¿`og:title`, `og:description`, `og:image` (1200x630px) y `twitter:card`?\n14. [ ] **Favicon Completo**: ¿`favicon.ico`, `favicon.svg` y `apple-touch-icon.png`?\n15. [ ] **HTTPS y Cabeceras**: ¿Certificado SSL y cabeceras de seguridad activas?\n16. [ ] **Analytics Ligero**: ¿Telemetría configurada sin penalizar la velocidad de carga?\n17. [ ] **Optimización de Imágenes**: ¿Formato WebP/AVIF con `loading=\"lazy\"` bajo el pliegue?\n18. [ ] **Accesibilidad (a11y)**: ¿Contraste mínimo 4.5:1 y navegación completa por teclado?\n19. [ ] **Consola DevTools Limpia**: ¿Cero errores de JavaScript o warnings de React?\n20. [ ] **Core Web Vitals**: ¿LCP < 2.5s, INP < 200ms y CLS < 0.1?\n\nEntrega un informe en forma de semáforo (🟢 Aprobado / 🟡 Advertencia / 🔴 Bloqueante) con los cambios de código específicos para subsanar cada falla detectada.\n\nRevisión de privacidad previa a publicar: inspecciona textos, prompts, archivos compilados y respuestas de API. No incluyas credenciales, correos privados, rutas locales, identificadores de cuentas ni información de clientes o proyectos internos. Usa ejemplos ficticios y comprueba que ningún endpoint público exporte colecciones privadas. No publiques hasta resolver los hallazgos.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-26-protocolo-arranque-web",
    "title": "Protocolo de Arranque Colaborativo — Combo de Skills Web",
    "description": "El prompt maestro para iniciar cualquier proyecto web: diagnostica el modo (Persuade, Operate, Read, Experience) y propone un combo de 2 a 4 herramientas antes de codificar.",
    "category": "Diseño Web IA",
    "tags": [
      "protocolo-arranque",
      "planificacion",
      "briefing",
      "combos-skills",
      "anti-slop"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex",
      "Gemini 1.5 Pro"
    ],
    "is_favorite": true,
    "content": "Actúa como mi Lead Web AI Architect y compañero de pair programming.\nVamos a comenzar a desarrollar un nuevo sitio web o landing page.\n\nBrief inicial del proyecto:\n- Idea / Propósito: {{idea_del_proyecto}}\n- Audiencia o cliente: {{audiencia}}\n- Objetivo de conversión o acción clave: {{objetivo_clave}}\n\nAntes de escribir una sola línea de código, sigue este protocolo obligatorio:\n1. **Diagnóstico del Modo de Superficie**: Identifica cuál de los 4 modos aplica:\n   - *Persuade*: Landing page, marketing, pricing (el diseño es el producto).\n   - *Operate*: App web, dashboard, herramienta interna (la usabilidad y la velocidad priman).\n   - *Read*: Documentación, blog, guías de conocimiento (la tipografía y la legibilidad mandan).\n   - *Experience*: Portafolio, showcase inmersivo (la interfaz retrocede ante la obra).\n2. **Propuesta Activa del Combo de Herramientas**: Proponme un combo equilibrado de 2 a 4 herramientas disponibles en el entorno del proyecto (no asumas que ya están instaladas):\n   - *Dirección*: ¿`taste-skill` minimalista o `getdesign` emulando Stripe/Linear?\n   - *Componentes*: ¿`uipro-cli` con Bento Grid o 21st.dev con micro-animaciones?\n   - *Filtro de Código*: ¿Activamos `ponytail` para mantener el código en menos de 200 líneas?\n   - *Auditoría*: ¿`web-design-guidelines` de Vercel + checklist de 20 puntos?\n3. **Pregunta de Alineación**: Hazme exactamente UNA pregunta concreta para validar el combo antes de proceder a la arquitectura.\n4. **Entorno y privacidad**: No asumas proveedor, cuenta, dominio ni rutas personales. Usa variables o ejemplos ficticios para la configuración y excluye credenciales y datos privados de los entregables públicos. Antes de publicar, confirma el destino y la autorización de la persona responsable.",
    "created_at": "2026-10-07T05:41:47.254Z",
    "updated_at": "2026-10-07T05:41:47.254Z"
  },
  {
    "id": "seed-27-anti-slop-suite",
    "title": "Anti-Slop Suite — Auditoría de 38 Reglas y Delivery Gate (miqdadbadjuber/anti-slop)",
    "description": "Ejecuta las 6 sub-skills de miqdadbadjuber/anti-slop (antislop, ui, copywriting, human, layoutmobile, code) con 38 reglas deterministas (R-01 a R-38), contraste WCAG AA verificado y Delivery Gate de 4 bloques.",
    "category": "Diseño Web IA",
    "tags": [
      "anti-slop",
      "miqdadbadjuber",
      "wcag",
      "ui-audit",
      "copywriting",
      "mobile-44px",
      "delivery-gate"
    ],
    "models": [
      "Claude 3.5 Sonnet",
      "Codex",
      "GPT-4o",
      "Gemini 1.5 Pro"
    ],
    "is_favorite": true,
    "content": "Actúa como un Principal Design & Frontend Auditor ejecutando la suite completa `miqdadbadjuber/anti-slop` (6 skills: `antislop`, `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`).\n\nProyecto o vista a auditar:\n- Ruta o URL: {{ruta_o_url_proyecto}}\n- Contexto del cliente / audiencia: {{audiencia_objetivo}}\n\nEjecuta la auditoría y corrección contra las **38 Reglas (`R-01` a `R-38`)**:\n1. **Liveliness Toolkit & `DESIGN.md` (`R-31`, `R-37`)**:\n   - Calibra los 3 diales (`ENERGY`, `RHYTHM`, `MOTION` de 1 a 5) según el rubro y documenta las decisiones de paleta, tipografía y layout en `DESIGN.md`.\n2. **Universal & UI (`R-01`..`R-19`, `R-35`)**:\n   - `R-04`: Cero emojis decorativos (`🚀`, `🔒`, `🏢`, `✦`) en interfaz, botones o tarjetas. Reemplázalos por SVGs vectoriales limpios o índices numerados monospace (`01`–`07`).\n   - `R-19`: Elimina animaciones infinitas en puntos de estado (`pulse`, `ping` decorativo) que distraigan la lectura.\n3. **Copywriting (`R-21`..`R-24`, `R-36`)**:\n   - Cero em dashes (`—`), cero frases infladas de IA (\"En el mundo actual...\", \"Eleva tu...\") y terminología real del dominio.\n4. **Human & WCAG 2.x AA Contrast (`R-25`..`R-30`)**:\n   - Verifica cada par texto/fondo con luminancia relativa WCAG 2.x (`>= 4.5:1` texto normal, `>= 3.0:1` texto grande). Ningún botón verde/dorado o texto secundario puede fallar.\n5. **Layout & Mobile 375px (`R-03`, `R-16`, `R-28`)**:\n   - Cero desborde horizontal (`scrollWidth <= innerWidth`) en `375px`.\n   - Todos los controles interactivos (`a`, `button`, `input`, `select`, chips, tabs) deben medir mínimo `44x44px` (`R-03`).\n6. **Code Hygiene (`R-20`, `R-22`, `R-34`)**:\n   - Elimina banners decorativos en comentarios (`/* ===...=== */`, `<!-- ===...=== -->`) y código muerto.\n\nAl finalizar, guarda el reporte en `anti-slop/audit-001-YYYY-MM-DD.md` y entrega el **Delivery Gate de 4 bloques** (`Dial`, `Design-choice reasons`, `Rule check R-01..R-38`, `Overrides`).",
    "created_at": "2026-10-07T19:30:00.000Z",
    "updated_at": "2026-10-07T19:30:00.000Z"
  }
];
