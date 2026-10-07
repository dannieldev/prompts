INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-1-arquitecto-refactor', 'Arquitecto de Software & Refactorización Limpia', 'Revisa arquitectura, aplica principios SOLID y propone refactorizaciones limpias con código paso a paso.', 'Actúa como un Principal Software Architect y Senior Staff Engineer con amplia experiencia en {{lenguaje}} y patrones de diseño modernos.

Tu objetivo es analizar el siguiente fragmento o módulo de código y proponer una refactorización de alto nivel enfocada en:
1. Legibilidad y simplicidad cognitiva.
2. Principios SOLID y separación de responsabilidades.
3. Tipado estricto y eliminación de efectos secundarios indeseados.
4. Rendimiento y optimización de memoria.

Arquitectura o contexto del proyecto: {{arquitectura}}
Objetivo principal del refactor: {{objetivo_refactor}}

Código a analizar:
```{{lenguaje}}
{{codigo_o_modulo}}
```

Entrega tu respuesta estructurada de la siguiente manera:
1. **Diagnóstico Breve**: Puntos débiles, acoplamiento excesivo o code smells detectados (máximo 4 viñetas).
2. **Propuesta Arquitectónica**: Qué patrón o estructura conviene implementar y por qué.
3. **Código Refactorizado**: Código completo, production-ready, con comentarios concisos solo donde sea imprescindible.
4. **Pruebas sugeridas**: 2 o 3 casos límite o tests unitarios esenciales para validar este código.', 'Desarrollo', '["arquitectura","clean-code","refactoring","solid"]', '["Claude 3.5 Sonnet","GPT-4o","Codex"]', 1, '2026-10-02T05:41:47.253Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-2-code-review-5d', 'Code Review 5D (Corrección, Seguridad, Rendimiento, Mantenibilidad, Tipado)', 'Evaluación rigurosa de código en 5 dimensiones antes de hacer merge a producción.', 'Actúa como un Senior Staff Code Reviewer implacable pero constructivo. Realiza una revisión rigurosa en 5 dimensiones sobre el siguiente cambio de código en {{lenguaje}}.

Contexto del cambio:
{{contexto_del_cambio}}

Código:
```{{lenguaje}}
{{codigo_a_revisar}}
```

Evalúa el código según estas 5 dimensiones:
1. **Corrección (Correctness)**: ¿Cumple con la lógica prevista? ¿Hay edge cases no contemplados, condiciones de carrera o posibles excepciones no controladas?
2. **Seguridad (Security)**: ¿Existen riesgos de inyección, fugas de memoria, manejo inseguro de datos de entrada o exposición de secretos?
3. **Rendimiento (Performance)**: ¿Hay cuellos de botella algorítmicos, consultas N+1, re-renders innecesarios o bucles pesados?
4. **Mantenibilidad y Limpieza**: ¿El código es auto-explicativo? ¿Cumple convenciones idiomáticas de {{lenguaje}}?
5. **Tipado y Robustez**: ¿El tipado es seguro y estricto o hay ''any'' implícitos y aserciones peligrosas?

Concluye con un veredicto claro: [APROBAR / APROBAR CON COMENTARIOS / SOLICITAR CAMBIOS] y una lista de mejoras concretas con código.', 'Desarrollo', '["code-review","seguridad","rendimiento","qa"]', '["Claude 3.5 Sonnet","Codex"]', 1, '2026-10-03T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-3-copywriting-pas', 'Copywriting de Alta Conversión (Fórmula PAS)', 'Crea textos persuasivos para landing pages, anuncios o emails aplicando Problema - Agitación - Solución.', 'Actúa como un Copywriter de respuesta directa y estratega de Growth Marketing con amplia experiencia en productos digitales, servicios tecnológicos y PyMEs.

Crea un texto persuasivo de alta conversión utilizando la fórmula psicológica **PAS (Problema - Agitación - Solución)**.

Datos del proyecto:
- **Producto / Servicio**: {{producto_o_servicio}}
- **Público Objetivo**: {{audiencia_objetivo}}
- **Principal Dolor o Frustración**: {{dolor_principal}}
- **Llamado a la Acción (CTA)**: {{llamado_a_la_accion}}

Estructura de la entrega:
1. **3 Ganchos / Titulares (Hooks)**: Cortos, impactantes y sin clichés.
2. **El Problema (P)**: Conecta inmediatamente con la situación actual del lector con empatía genuina.
3. **La Agitación (A)**: Expone las consecuencias emocionales, de tiempo y dinero si no se resuelve hoy.
4. **La Solución (S)**: Presenta la oferta como el camino más rápido, seguro y claro.
5. **Llamado a la Acción (CTA)**: Directo, sin fricción y con sentido de oportunidad.', 'Marketing', '["copywriting","growth","landing-page","conversion"]', '["GPT-4o","Claude 3.5 Sonnet"]', 1, '2026-10-04T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-4-metaprompt-optimizador', 'Metaprompt: Optimizador & Diseñador de Prompts', 'Toma cualquier idea o prompt inicial y lo convierte en un prompt de nivel experto con delimitadores y rol.', 'Actúa como un Ingeniero de Prompts de nivel mundial (Prompt Engineer) especializado en exprimir la máxima capacidad de razonamiento de modelos LLM como {{modelo_destino}}.

Tu tarea es tomar la siguiente necesidad o borrador y diseñar un prompt de calidad profesional:

Objetivo del usuario:
"{{tarea_deseada}}"

Restricciones y reglas especiales:
{{restricciones}}

Formato de salida requerido:
{{formato_salida}}

Genera:
1. **Prompt Optimizado Final**: Utiliza delimitadores claros (``` o tags XML), asignación de rol autoritativo, pasos de pensamiento guiados (Chain of Thought), ejemplos few-shot si aportan valor, y restricciones negativas explícitas ("No hagas X"). Incluye placeholders {{variables}} donde el usuario pueda personalizarlo después.
2. **Explicación de las Técnicas Aplicadas**: Breve justificación de por qué esta formulación obtendrá mejores respuestas del modelo.', 'Razonamiento', '["prompt-engineering","metaprompt","optimizacion"]', '["Claude 3.5 Sonnet","GPT-4o","Gemini 1.5 Pro"]', 1, '2026-10-05T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-5-debugger-sistematico', 'Depurador Sistemático de Errores & Causa Raíz', 'Diagnóstico paso a paso de bugs, errores de compilación o fallos silenciosos sin adivinanzas.', 'Actúa como un Senior Debugging Specialist. Ayúdame a encontrar la CAUSA RAÍZ (Root Cause) de este fallo de manera sistemática, evitando suposiciones sin sustento.

Stack tecnológico:
{{lenguaje_y_stack}}

Error o comportamiento observado:
```
{{mensaje_de_error}}
```

Comportamiento esperado vs Comportamiento real:
{{comportamiento_esperado}}

Código involucrado:
```
{{codigo_relevante}}
```

Por favor, sigue esta metodología de diagnóstico:
1. **Análisis de la Causa Raíz**: Qué está fallando a nivel de ejecución o flujo de datos.
2. **Hipótesis Ordenadas por Probabilidad**: Las 3 causas más probables explicadas con precisión.
3. **Prueba de Verificación Inmediata**: Un console.log, breakpoint o comando para verificar la hipótesis en 30 segundos.
4. **Solución Definitiva**: Código corregido listo para sustituir el defectuoso.
5. **Prevención a Futuro**: Cómo evitar que este tipo de bug regrese (test unitario, aserción o tipado).', 'Desarrollo', '["debugging","troubleshooting","stack-trace","bugs"]', '["Claude 3.5 Sonnet","Codex","GPT-4o"]', 0, '2026-10-05T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-6-cloudflare-edge', 'Especialista Cloudflare Workers, Pages & Edge D1/KV', 'Diseña e implementa soluciones optimizadas para la red perimetral de Cloudflare.', 'Actúa como un Cloudflare Solutions Architect especializado en Serverless y Edge Computing (Cloudflare Workers, Pages, D1, KV, Hyperdrive y Queues).

Necesito implementar la siguiente funcionalidad en la red de Cloudflare:
{{funcionalidad_a_construir}}

Bindings y recursos disponibles:
{{servicios_cloudflare}}

Requisitos de latencia y restricciones:
{{requisitos_latencia}}

Por favor provee:
1. **Configuración de wrangler.jsonc**: Con los bindings exactos necesarios.
2. **Código del Worker (TypeScript / ESM)**: Cumpliendo con la especificación Fetch standard, manejo adecuado de streams si aplica, control de errores y headers HTTP de seguridad (CORS, CSP, Cache-Control).
3. **Estrategia de Caché y Persistencia**: Cómo optimizar lecturas/escrituras para mantenerse dentro del free tier o límites estándar.', 'Sistemas', '["cloudflare","workers","d1","edge","serverless"]', '["Claude 3.5 Sonnet","GPT-4o"]', 0, '2026-10-05T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-7-api-contract-first', 'Diseñador de API REST & Tipado Contract-First', 'Diseña contratos de API limpios, modelos TypeScript y esquemas Zod con endpoints consistentes.', 'Actúa como un Lead API Architect especializado en diseño RESTful y Contract-First Design.

Dominio de negocio: {{dominio_negocio}}
Entidades principales: {{entidades_clave}}
Casos de uso requeridos: {{casos_de_uso}}

Diseña la especificación completa del módulo API con:
1. **Endpoints y Métodos HTTP**: Rutas coherentes, plurales, query params para filtros y códigos de estado HTTP correctos (200, 201, 400, 404, 409, 422).
2. **Esquemas Zod & Tipos TypeScript**: Interfaces completas para Request Body, Response Payload y Error Responses.
3. **Contrato de Paginación y Filtrado**: Estructura estándar para listas paginadas.
4. **Idempotencia y Manejo de Errores**: Formato estándar de error JSON con campos `code`, `message` y `details`.', 'Desarrollo', '["api","rest","typescript","zod","backend"]', '["Claude 3.5 Sonnet","GPT-4o"]', 0, '2026-10-06T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-8-automatizaciones-scripts', 'Generador de Scripts de Automatización (Zsh / Bun / Node.js)', 'Crea scripts de consola portables, seguros e idempotentes para macOS / Linux.', 'Actúa como un DevOps & Automation Engineer experto en sistemas Unix/macOS y herramientas CLI.

Crea un script para automatizar la siguiente tarea:
{{tarea_a_automatizar}}

Entorno de ejecución:
{{entorno_de_ejecucion}}

Herramientas disponibles:
{{herramientas_o_clis}}

Requisitos del script:
1. **Idempotencia**: Si se ejecuta dos veces seguidas, no debe romper nada ni duplicar datos.
2. **Manejo defensivo de errores**: `set -euo pipefail` en bash/zsh, o try/catch con códigos de salida adecuados en Node/Bun.
3. **Feedback visual amigable**: Emojis descriptivos y colores para estado (éxito, aviso, error).
4. **Ayuda y validación**: Mostrar flags `--help` y validar dependencias previas requeridas.', 'Automatización', '["bash","zsh","scripts","macos","bun","cli"]', '["Codex","Claude 3.5 Sonnet"]', 0, '2026-10-06T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-9-carrusel-linkedin', 'Estratega de Contenidos & Carrusel para LinkedIn / Instagram Tech', 'Guión estructurado diapositiva por diapositiva para compartir valor técnico sin rodeos.', 'Actúa como un Estratega de Contenido y Marca Personal para profesionales tech y desarrolladores de software.

Diseña un carrusel de 7 diapositivas de alto valor para LinkedIn / Instagram sobre:
Tema: {{tema_tecnologico}}
Gancho o perspectiva: {{angulo_o_gancho}}
Audiencia meta: {{audiencia_meta}}

Estructura para cada una de las 7 diapositivas:
- **Diapositiva 1 (Hook / Portada)**: Titular contraintuitivo o dato sorprendente que detenga el scroll.
- **Diapositiva 2 (El problema o error común)**: Qué hace la mayoría y por qué falla.
- **Diapositivas 3, 4 y 5 (La solución en 3 pasos accionables)**: Concepto, ejemplo claro o snippet mínimo, beneficio directo.
- **Diapositiva 6 (Resumen / Cheat-sheet)**: Un resumen visual de una mirada.
- **Diapositiva 7 (CTA / Cierre)**: Pregunta de debate para comentarios y llamado a guardar la publicación.

Incluye además el copy del post introductorio con emojis medidos y 4 hashtags relevantes.', 'Marketing', '["linkedin","redes","growth","marca-personal","contenido"]', '["GPT-4o","Claude 3.5 Sonnet"]', 0, '2026-10-06T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-10-optimizador-sql', 'Optimizador de Consultas SQL & Modelado Relacional (SQLite / D1)', 'Mejora esquemas relacionales, crea índices óptimos y refactoriza consultas lentas.', 'Actúa como un Database Administrator y Senior Data Architect especializado en SQLite y Cloudflare D1.

Esquema actual de tablas:
```sql
{{esquema_actual}}
```

Consulta que requiere optimización:
```sql
{{consulta_problematica}}
```

Volumen de datos y patrón de uso:
{{volumen_y_patron_lectura}}

Entrega:
1. **Explicación del Plan de Ejecución (EXPLAIN QUERY PLAN)**: Dónde está ocurriendo el SCAN TABLE o cuello de botella.
2. **Índices recomendados**: Índices compuestos o cubrientes con justificación de orden de columnas.
3. **Consulta SQL Refactorizada**: Reescribe la consulta utilizando CTEs, subconsultas eficientes o joins óptimos.
4. **Consejos específicos para SQLite / D1**: Particularidades de SQLite en lectura/escritura serverless.', 'Desarrollo', '["sql","sqlite","d1","indices","database"]', '["Claude 3.5 Sonnet","Codex"]', 0, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-11-calendario-agencia-paso-1', 'Calendarios de Agencia (Paso 1: Ingesta & Dossier de Marca)', 'Paso 1 de 2: Ingesta profunda de marca, web oficial, redes sociales e histórico de Excel antes de generar el calendario editorial.', 'Actúa como un Senior Brand Strategist y Director de Contenido de Agencia de Marketing Digital.

Antes de comenzar a redactar publicaciones o generar el calendario de contenidos, tu objetivo en este PRIMER PASO es realizar una inmersión completa y auditoría de la marca para consolidar su ADN, pilares y contexto en memoria.

Datos de la marca y fuentes de consulta:
- **Nombre de la Marca**: {{nombre_marca}}
- **Sitio Web Oficial (Fuente principal de verdad)**: {{sitio_web}}
- **Redes Sociales Oficiales**: {{redes_sociales}}
- **Documentos e Histórico de Calendarios**: {{archivos_o_calendarios_anteriores}}
- **Período a Planificar (Próximo paso)**: {{periodo_a_planificar}}

Instrucciones de Investigación y Análisis:
1. **Prioridad de Información**: Revisa detalladamente el sitio web oficial; allí reside la información técnica, verídica, servicios exactos y lineamientos finales de la marca. Complementa con las redes sociales para entender cómo interactúa con su comunidad.
2. **Auditoría del Histórico de Calendarios**: Revisa los archivos y calendarios anteriores para identificar:
   - Qué formatos y tipos de publicaciones han funcionado mejor.
   - Qué temas o servicios se han sobreexplotado o quedado rezagados.
   - Qué tono de comunicación se ha venido utilizando.

Por favor, estructura tu entrega en este **Dossier de Ingesta de Marca**:
1. **Identidad & Propuesta de Valor**:
   - Misión y promesa central de la marca en 2 oraciones.
   - Arquetipo de marca y pilares de confianza (certificaciones, bioseguridad, trayectoria).
2. **Mapa de Servicios y Ofertas Prioritarias**:
   - Servicios estrella y áreas de especialidad que deben promoverse con mayor énfasis.
   - Perfil de clientes o audiencias a las que se dirige (pacientes, profesionales, empresas).
3. **Guía de Brand Voice & Tono de Comunicación**:
   - Tono recomendado (ej: cercano, profesional, pedagógico, clínico sin ser frío).
   - Palabras clave y términos recurrentes que refuerzan la marca.
   - Qué NO decir o temas sensibles a cuidar con prudencia.
4. **Diagnóstico del Historial de Contenido**:
   - Resumen de lo aprendido de los calendarios anteriores.
   - 3 oportunidades o vacíos temáticos detectados que podemos explotar en el nuevo período.
5. **Propuesta de Pilares de Contenido para el Paso 2**:
   - Lista de 4 o 5 pilares temáticos sugeridos (con porcentaje recomendado de distribución).

⚠️ REGLA ESTRICTA: NO generes publicaciones ni el calendario editorial todavía. Tu única meta es consolidar este entendimiento estratégico, guardarlo en tu memoria de contexto y esperar mi aprobación para pasar al Paso 2.', 'Marketing', '["agencia","calendario","redes-sociales","auditoria-marca","onboarding","estrategia","prompt-chaining"]', '["Claude 3.5 Sonnet","GPT-4o"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-12-gamma-laboratorios-onboarding', 'Gamma Laboratorios — Auditoría de Marca & Calendario (Paso 1)', 'Auditoría de marca e ingesta histórica específica para Gamma Laboratorios (El Salvador) antes de generar el calendario.', 'Actúa como un Senior Brand Strategist y Director de Contenido de Agencia de Marketing Digital para Gamma Laboratorios (El Salvador).

Antes de generar el calendario de contenidos, necesito que realices una inmersión completa y auditoría de la marca para consolidar su ADN en memoria.

Fuentes oficiales de investigación:
- **Sitio Web Oficial (Fuente principal y final)**: https://www.gammalaboratories.com/
- **Facebook Oficial**: https://www.facebook.com/GammaLaboratoriesSV/?locale=es_LA
- **Histórico de Calendarios y Documentos**: {{ruta_o_archivos_excel}}
- **Mes o Período a Planificar**: {{mes_a_planificar}}

Instrucciones:
1. Revisa principalmente el sitio web oficial; allí está la información verídica, servicios clínicos, perfiles de laboratorio y catálogo final.
2. Analiza los calendarios anteriores en Excel para entender qué pilares temáticos se han publicado, qué servicios se han priorizado y qué tono se ha usado.
3. Entrega un Dossier de Ingesta de Marca con:
   - Identidad y propuesta de valor única en el sector de salud y análisis clínicos.
   - Servicios prioritarios a promover (check-ups, perfiles preventivos, pruebas especializadas).
   - Brand voice (tono científico, empático, confiable y pedagógico).
   - Hallazgos clave de los calendarios anteriores en Excel.
   - Propuesta de 4 pilares temáticos estructurados para el siguiente calendario.

⚠️ REGLA: No generes el calendario todavía. Guarda este contexto en memoria y espera mi feedback para el Paso 2.', 'Marketing', '["gamma-laboratorios","salud","calendario","agencia","el-salvador"]', '["Claude 3.5 Sonnet","GPT-4o"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-13-calendario-agencia-paso-2', 'Calendarios de Agencia (Paso 2: Matriz Editorial & Metaprompts)', 'Paso 2 de 2: Crea el calendario mensual en Excel con cuotas exactas de Reels, Carruseles y Estáticos, efemérides y prompts para generar artes con IA.', 'Actúa como un Senior Content Creator y Director Editorial de Agencia de Marketing Digital.

Tomando en cuenta el Dossier de Marca y el contexto consolidado en el Paso 1, tu objetivo es construir la matriz completa del calendario de contenidos para {{nombre_marca}} correspondiente al mes de {{mes_y_ano_a_planificar}}.

Objetivo de producción:
- **Mes a planificar**: {{mes_y_ano_a_planificar}}
- **Documento base**: {{archivo_o_hoja_excel}}
- **Cuota de Contenidos requerida**:
  • {{cuota_reels}} (Reels dinámicos de 15 segundos con gancho de 3s, desarrollo y CTA).
  • {{cuota_carruseles}} (Carruseles concisos de 2 a 3 diapositivas de alto valor).
  • {{cuota_estaticos}} (Publicaciones estáticas de impacto o infografías rápidas).

Reglas y Criterios de Calidad:
1. **Investigación de Efemérides & Días Conmemorativos**: Investiga e integra fechas mundiales o nacionales relevantes de la industria que apliquen en {{mes_y_ano_a_planificar}} (salud, prevención, tecnología, etc.).
2. **Filtro Anti-Repetición Estricto**: Revisa el historial de los meses anteriores del documento de Excel. NO repitas conceptos, ganchos ni ángulos que ya se hayan publicado recientemente.
3. **Estilo y Tono de Redes**: Monitorea el lenguaje y estilo visual que mejor conecta con la comunidad de la marca y elévalo.
4. **Columna Obligatoria de "Metaprompt para IA"**: Para CADA publicación, redacta un prompt en texto detallado y listo para copiar en {{herramienta_ia_arte}} (Google Gemini o ChatGPT / DALL-E) para generar el arte gráfico, guión audiovisual o imágenes de apoyo.
5. **Referencias Reales**: Adjunta enlaces o referencias visuales de inspiración para el equipo de diseño y edición.

Estructura de la Matriz (Columnas para la hoja de Excel):
Para cada una de las piezas, entrega la siguiente información tabulada:
- **Día y Fecha**: (distribuido a lo largo del mes).
- **Formato**: [Reel 15s / Carrusel 2-3 slides / Estático].
- **Pilar de Contenido**: [Educativo / Comercial / Prueba Social / Efeméride / Institucional].
- **Hook / Gancho Inicial**: Frase de los primeros 3 segundos o titular de portada.
- **Estructura Visual & Contenido**:
  - *Si es Reel*: Guión segundo a segundo (0-3s hook, 3-12s desarrollo, 12-15s CTA) + texto en pantalla.
  - *Si es Carrusel*: Contenido Slide 1, Slide 2 y Slide 3.
  - *Si es Estático*: Descripción del arte y texto principal.
- **Copywriting / Caption**: Texto completo para el post con tono de la marca, emojis medidos y llamada a la acción.
- **Hashtags sugeridos**: 4 a 6 hashtags estratégicos.
- **Metaprompt para Generación de Arte (IA)**: Prompt textual descriptivo (estilo visual, iluminación, composición, paleta y elementos clave) para {{herramienta_ia_arte}}.
- **Referencias de Inspiración**: Enlaces o notas de estilo.

Si tienes herramientas para editar directamente el archivo Excel (como Python / openpyxl), crea la nueva hoja ''{{mes_y_ano_a_planificar}}'' respetando el diseño y estilos de las hojas anteriores; de lo contrario, entrega la tabla estructurada para volcarla de inmediato.', 'Marketing', '["agencia","calendario","redes-sociales","reels","carruseles","metaprompts","excel","prompt-chaining"]', '["Claude 3.5 Sonnet","GPT-4o"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-14-gamma-laboratorios-calendario-paso-2', 'Gamma Laboratorios — Generación de Calendario & Excel (Paso 2)', 'Generación del calendario de Gamma Laboratorios para Excel con 6 Reels (15s), 6 Carruseles (2-3 slides), 6 Estáticos, efemérides y prompts para IA.', 'Actúa como Director de Contenido de Agencia para Gamma Laboratorios (El Salvador).

Con base en la auditoría y dossier consolidado en el Paso 1, genera el calendario editorial completo para el mes de {{mes_a_planificar}} en el documento de Excel.

Requisitos de Entrega:
- **Nueva hoja de Excel**: Crear o preparar una hoja adicional llamada ''{{mes_a_planificar}}'', manteniendo exactamente la misma estructura de columnas y formatos de los meses anteriores.
- **Mix de Contenidos (18 piezas en total)**:
  • **6 Reels**: De exactamente 15 segundos (0-3s Hook médico/preventivo, 3-12s respuesta clara, 12-15s CTA para cotizar o visitar sucursal).
  • **6 Carruseles**: De 2 a 3 slides únicamente (concisos, directos al grano y con tipografía legible).
  • **6 Estáticos**: Piezas de valor único, infografías rápidas o promociones de perfiles de laboratorio.

Reglas Obligatorias:
1. **Efemérides de Salud**: Revisa días mundiales o nacionales de salud que apliquen en {{mes_a_planificar}} para Gamma Laboratorios (ej. diabetes, salud masculina/femenina, corazón, etc.).
2. **Cero Repeticiones**: Contrasta contra todos los meses del 2026 en el Excel. No repitas ángulos ni temas ya quemados.
3. **Columna "Prompt para IA"**: Para cada publicación, incluye un prompt detallado listo para copiar en Google Gemini o ChatGPT para generar el arte gráfico, portada o guión visual.
4. **Referencias**: Adjunta referencias visuales para el diseñador.
5. **Calidad**: Solo incluye ideas sólidas, clínicamente verídicas y con alta probabilidad de interacción.

Estructura requerida por fila:
`ID | Fecha | Pilar | Formato | Hook | Estructura / Slides | Caption Completo | Prompt para Arte IA | Referencias`', 'Marketing', '["gamma-laboratorios","calendario","excel","reels","salud","el-salvador","antigravity"]', '["Claude 3.5 Sonnet","GPT-4o","Gemini 1.5 Pro"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-15-taste-skill-direccion', 'Taste Skill — Dirección Estética y Vibe Anti-Plantilla', 'Infiere la audiencia, el tono estético y los 3 diales (varianza, movimiento, densidad) antes de tirar una sola línea de código.', 'Actúa como un Design Director de clase mundial especializado en interfaces de alto impacto visual y anti-slop.

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
   - Estructura de layout no convencional pero intuitiva.', 'Diseño Web IA', '["taste-skill","diseño-web","anti-slop","ui-ux","frontend","branding"]', '["Claude 3.5 Sonnet","Codex","Gemini 1.5 Pro"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-16-getdesign-brand-spec', 'getdesign.md — Sistema de Tokens de Marcas de Élite', 'Extrae o adapta las reglas de diseño (colores hex, tipografía, espaciado y bordes) de marcas globales de referencia (Stripe, Linear, Apple).', 'Actúa como un Lead Design Systems Engineer. Tu objetivo es generar una especificación estricta tipo `DESIGN.md` para el proyecto {{nombre_proyecto}}, tomando como referencia de clase mundial el lenguaje visual de {{marca_referencia}} (ej. Stripe, Linear, Apple, Vercel, Raycast).

Objetivo de la interfaz: {{objetivo_ui}}

Genera la especificación estructurada con el formato oficial de tokens para Tailwind CSS y CSS variables:
1. **Filosofía de Superficies y Luz**:
   - Comportamiento de fondos (Background profundo, bordes semi-transparentes de 1px, elevaciones limpias).
2. **Paleta Cromática Funcional**:
   - Hexadecimales exactos para text-primary, text-secondary, borders, background, accent-glow.
3. **Escala de Espaciado y Rejilla**:
   - Múltiplos de 4px / 8px exactos.
4. **Radios y Sombras**:
   - Border radius consistentes (`rounded-xl` para tarjetas, `rounded-lg` para botones, `rounded-full` para badges).
5. **Componentes Clave**:
   - Reglas de diseño para: Button (Default, Hover, Active press), Input con focus ring, Card con hover highlight.
6. **Configuración Tailwind v4 / CSS**:
   - Código directo listo para pegar en el archivo CSS global o tailwind config.', 'Diseño Web IA', '["getdesign","design-tokens","branding","stripe","linear","apple"]', '["Claude 3.5 Sonnet","Codex"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-17-uipro-component-architect', 'UI/UX Pro Max — Arquitecto de Componentes Modernos', 'Diseña componentes frontend de alta fidelidad: Bento Grids, tarjetas interactivas, estados hover y jerarquía limpia.', 'Actúa como un Principal UI/UX Engineer utilizando el motor de conocimiento UI/UX Pro Max.

Diseña y codifica un componente production-ready para:
- Nombre / Tipo de componente: {{nombre_componente}}
- Estilo estético: {{estilo_ui}} (ej. Modern Dark Bento, Minimalist Neumorphic, Cyber-Industrial, Editorial SaaS)
- Stack técnico: {{stack_frontend}} (ej. React 19 + Tailwind CSS + Lucide Icons)
- Paleta o acento: {{paleta_color}}

Requisitos indispensables de diseño:
1. **Jerarquía Visual Inequívoca**: Títulos prominentes, subtítulos con contraste adecuado (#94a3b8), badges contextuales.
2. **Micro-Detalles de Borde y Fondo**: Bordes sutiles semi-transparentes (`border-white/[0.08]`), fondos oscuros texturizados (`bg-[#0d111c]`).
3. **Estados Interactivos**: Hover sutil con elevación de 1-2px, active press con `scale-[0.98]`, foco accesible con `focus-visible:ring-2`.
4. **Responsive Mobile-First**: Adaptación natural sin romper padding ni truncar textos críticos.
5. **Código Limpio**: Cero dependencias externas pesadas innecesarias.

Entrega el código completo del componente en TSX/JSX con tipos claros y comentarios mínimos solo donde sea necesario.', 'Diseño Web IA', '["uipro","design-system","bento-grid","tailwind","react","components"]', '["Claude 3.5 Sonnet","GPT-4o","Codex"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-18-emil-kowalski-motion', 'Emil Kowalski — Micro-Interacciones y Físicas de Resorte', 'Implementa animaciones que se sienten naturales: curvas ease-out, topes de 200-300ms, resortes y respeto a prefers-reduced-motion.', 'Actúa como un Senior Design Engineer entrenado en la escuela de interacción de Emil Kowalski (*Animations on the Web*).

Tu objetivo es animar o pulir la interacción de {{elemento_interactivo}} utilizando {{biblioteca_animacion}} (ej. Framer Motion, Motion One, o CSS transitions nativas).

Tipo de interacción deseada: {{tipo_interaccion}} (ej. Modal reveal, Dropdown menu, Card hover & tilt, Toast notification, Button press).

Reglas de oro que debes cumplir sin excepción:
1. **Curvas de Aceleración**: Entradas SIEMPRE en `ease-out` (o resorte amortiguado sin oscilaciones eternas), salidas en `ease-in`.
2. **Origen y Escala**: NUNCA escalar desde cero (`scale(0)`). Escalar desde `scale(0.95)` o `scale(0.97)` con `opacity: 0`. En el mundo real nada aparece de la nada.
3. **Techo de Duración**: Las transiciones funcionales deben durar entre **180ms y 300ms**. Nada de animaciones de 800ms que hagan sentir la app lenta.
4. **Feedback Táctil Inmediato**: Al presionar (`:active`), reducir escala a `0.97` o `0.98` con `transition: transform 100ms ease-out`.
5. **Accesibilidad Obligatoria**: Incluir soporte para `@media (prefers-reduced-motion: reduce)` desactivando transforms de desplazamiento.

Entrega:
- Tabla de diagnóstico Antes / Después si aplica.
- Código completo de la animación listo para producción.', 'Diseño Web IA', '["emil-kowalski","framer-motion","animacion","motion","microinteracciones","sonner"]', '["Claude 3.5 Sonnet","Codex"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-19-apple-design-hig', 'Apple Design HIG — Ergonomía Táctil y Fluidez Nativa', 'Audita y refactoriza interfaces web bajo las 17 directrices de Apple: áreas táctiles de 44px, feedback en pointerdown y jerarquía tipográfica.', 'Actúa como un Principal Apple Interface Designer aplicando las Human Interface Guidelines (HIG) de Apple traducidas a la web moderna.

Audita y eleva la calidad del siguiente componente o vista web:
- Elemento a auditar: {{interfaz_o_componente}}
- Código actual:
```
{{codigo_actual}}
```

Aplica rigurosamente los principios de Apple Design:
1. **Respuesta Inmediata al Tacto**: Feedback visual en `pointerdown`, no en el release o click. Latencia percibida = 0ms.
2. **Área Táctil Mínima (Tap Target)**: Todo botón, enlace o elemento interactivo debe tener al menos **44x44 px** de área de toque real en mobile.
3. **Tipografía y Legibilidad**: Escala tipográfica nítida (SF Pro / System fonts), tracking ajustado en titulares (`tracking-tight`), leading holgado en cuerpos.
4. **Materiales y Profundidad**: Fondos con desenfoque de cristal (`backdrop-blur-xl`, `bg-black/60` o `bg-slate-900/80`) con bordes interiores finos de luz.
5. **Direct Manipulation**: Gestos interrumpibles que sigan 1:1 el puntero o dedo del usuario.

Devuelve el código refactorizado con una explicación de las mejoras ergonómicas aplicadas.', 'Diseño Web IA', '["apple-design","hig","tactile-ui","direct-manipulation","ux","ergonomia"]', '["Claude 3.5 Sonnet","Codex"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-20-ponytail-zero-bloat', 'Ponytail — Senior Dev Reducer & Zero-Bloat Code', 'Elimina sobre-ingeniería, dependencias innecesarias y código verboso. Reduce líneas entre 50% y 80% usando APIs nativas de la plataforma.', 'Actúa como un Senior Staff Engineer bajo la disciplina "Ponytail: The Lazy Senior Dev".
Tu lema es: *"El código más rápido y con menos bugs es el que nunca se escribe"*.

Analiza el siguiente componente o módulo en {{lenguaje}}:
```{{lenguaje}}
{{codigo_verboso}}
```

Objetivo del módulo: {{objetivo_modulo}}

Ejecuta una reducción implacable de código aplicando estas directrices:
1. **¿Se necesita de verdad? (YAGNI)**: Elimina abstracciones prematuras, wrappers inútiles, estados locales redundantes y efectos secundarios (`useEffect`) innecesarios.
2. **Aprovecha la Plataforma Web**: Reemplaza librerías de 50KB por elementos y APIs nativas (`<dialog>`, `<details>`, `Intl`, `URLSearchParams`, CSS moderno `:has()`, `@container`, etc.).
3. **Mide la Reducción**: Indica exactamente el porcentaje de reducción de líneas logrado (meta: 40% a 70%).
4. **Cero Regresiones**: El código resultante debe mantener el 100% de la funcionalidad, con tipos estrictos y mucha mayor legibilidad.

Entrega el código simplificado listo para producción.', 'Desarrollo', '["ponytail","clean-code","zero-bloat","native-apis","optimizacion","yagni"]', '["Claude 3.5 Sonnet","Codex","Gemini 1.5 Pro"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-21-impeccable-anti-slop', 'Impeccable Design — Pulido Quirúrgico y Anti-Clichés de IA', 'Detecta y elimina los 60+ anti-patrones clásicos de IA: sombras desfasadas, bordes inconsistentes, alineación óptica y contrastes pobres.', 'Actúa como un Design Director de élite ejecutando una auditoría quirúrgica de pulido `Impeccable Craft`.

Inspecciona este layout o pantalla:
- Vista: {{pantalla_o_vista}}
- Código actual:
```
{{codigo_layout}}
```

Pasa el filtro de los 60+ detectores de anti-patrones y calidad visual:
1. **Anti-AI Slop**:
   - Elimina gradientes genéricos morados/azules que no aportan identidad.
   - Corrige sombras flotantes desproporcionadas: reemplázalas por bordes con opacidades sutiles (`border border-white/10`) y elevaciones controladas.
   - Elimina tarjetas idénticas repetitivas: introduce asimetría deliberada o anchos diferenciados según la importancia del contenido.
2. **Jerarquía y Escala de Blancos**:
   - Asegura una escala clara de jerarquía de texto: 100% opacidad para títulos, 70-80% para descripción, 50-60% para metadatos/fechas.
3. **Alineación Óptica**:
   - Íconos alineados visualmente al centro de sus contenedores, paddings simétricos y consistentes.
4. **Densidad y Respiración**:
   - Espaciado suficiente entre secciones para evitar apiñamiento.

Devuelve:
1. Lista de defectos visuales o clichés corregidos (máximo 4 puntos).
2. Código pulido y perfeccionado.', 'Diseño Web IA', '["impeccable","craft","polish","anti-patrones","layout","visual-hierarchy"]', '["Claude 3.5 Sonnet","Codex"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-22-web-design-guidelines-vercel', 'Web Design Guidelines — Auditoría Vercel Labs (WCAG & 8pt Grid)', 'Audita el frontend contra las directrices de interfaz de Vercel: rejilla de 8pt, contraste WCAG AA 4.5:1, prevención de truncamiento y foco visible.', 'Actúa como un Accessibility & Frontend Quality Engineer aplicando las Web Design Guidelines oficiales de Vercel Labs.

Audita el siguiente código de interfaz:
```
{{codigo_a_auditar}}
```

Evalúa estrictamente cada una de estas reglas:
1. **Rejilla de 8pt**: Todos los márgenes, paddings y espaciados deben seguir la escala de 4px / 8px (ej. 8, 12, 16, 24, 32, 48px).
2. **Contraste de Color (WCAG AA)**: El texto sobre fondo debe cumplir un ratio de contraste mínimo de **4.5:1** para texto normal y **3:1** para texto grande o elementos gráficos.
3. **Navegación por Teclado y Foco**: Los elementos interactivos deben contar con `:focus-visible` claramente visible (anillo de foco con offset), sin depender únicamente del ratón.
4. **Prevención de Truncamiento**: Nunca trunques datos críticos de usuario con `truncate` sin un tooltip o mecanismo accesible para ver el contenido completo.
5. **Etiquetas y Atributos ARIA**: Botones que solo tienen un ícono deben tener `aria-label` descriptivo.

Reporta los hallazgos en formato conciso:
- `linea:problema` -> `corrección sugerida`.
- Código final corregido y validado.', 'Diseño Web IA', '["web-guidelines","vercel","wcag","a11y","8pt-grid","accesibilidad"]', '["Claude 3.5 Sonnet","Codex"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-23-scroll-world-cinematic', 'Scroll World — Experiencia Inmersiva con Scroll-Scrubbing', 'Diseña una narrativa cinemática estilo Apple Showcase donde el scroll del usuario viaja a través de dioramas o escenas 3D fluidas.', 'Actúa como un Creative Technologist experto en narrativa digital y experiencias inmersivas con el motor Scroll World.

Diseña la arquitectura técnica y la estructura de una landing cinemática de scroll-scrubbing para:
- Producto o historia: {{producto}}
- Escenas clave del recorrido: {{escenas_clave}}
- Mensaje o llamada a la acción principal: {{cta_final}}

Requisitos del diseño de la experiencia:
1. **Arquitectura del Canvas**: Contenedor con `position: sticky` en una pista de desplazamiento de varias alturas de viewport (`h-[400vh]`).
2. **Progresión Continua sin Cortes**: El progreso de desplazamiento (`scrollProgress` de 0.0 a 1.0) mapea interpolaciones suaves de cámara, rotación y revelación de textos.
3. **Superposiciones Editoriales**: Textos minimalistas de alto impacto que entran y salen en rangos específicos del scroll (ej. escena 1: 0.1-0.3, escena 2: 0.4-0.6).
4. **Degradación Elegante**: En dispositivos móviles con pantallas táctiles pequeñas o en navegadores con baja aceleración por hardware, prever un modo de lectura fluido.
5. **Rendimiento a 60 FPS**: Uso estricto de transformaciones aceleradas por GPU (`translate3d`, `opacity`, `will-change: transform`).

Entrega la implementación paso a paso con código React / HTML5 + CSS listo para integrar.', 'Diseño Web IA', '["scroll-world","higgsfield","scroll-driven","cinematic","landing-page","3d"]', '["Claude 3.5 Sonnet","Codex"]', 0, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-24-playwright-e2e-tester', 'Playwright — Suite Autónoma de Pruebas E2E y Enlaces', 'Genera scripts automatizados con Playwright para rastrear links rotos, probar formularios, responsive y capturar errores de consola.', 'Actúa como un Principal QA Automation Engineer especializado en Playwright y Node.js.

Genera una suite completa de pruebas autónomas en TypeScript para el sitio web alojado en {{url_o_puerto_local}}.

La suite debe validar automáticamente:
1. **Rastreo de Enlaces Internos**: Visitar todos los `<a href>` de la página, comprobar que devuelven código HTTP 200 y que no existen enlaces vacíos o que apunten a `#`.
2. **Formularios y Validación**: Probar el formulario de {{nombre_formulario}} enviando datos inválidos (comprobar mensajes de error) y luego datos válidos (comprobar feedback de éxito).
3. **Consola Limpia**: Escuchar eventos `page.on(''console'')` y `page.on(''pageerror'')`, haciendo que el test falle si hay excepciones no controladas en JavaScript.
4. **Matriz Responsive**: Validar el renderizado en 3 viewports:
   - Móvil: 375x667 (iPhone SE)
   - Tablet: 768x1024 (iPad)
   - Desktop: 1440x900
5. **Capturas de Pantalla de Regresión**: Guardar screenshots de cada vista para comprobación visual.

Entrega el archivo `tests/site-audit.spec.ts` completo, ejecutable con `npx playwright test`.', 'Automatización', '["playwright","testing","browser-automation","e2e","qa","responsive"]', '["Codex","Claude 3.5 Sonnet"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-25-checklist-20-puntos-web', 'Checklist de 20 Puntos Pre-Lanzamiento Web con IA', 'Auditoría exhaustiva de 20 puntos críticos antes de desplegar cualquier web a producción: SEO, responsive, 404, consola limpia y Core Web Vitals.', 'Actúa como un Web Launch Director y Release Manager implacable. Tu labor es realizar la auditoría final previa a producción del siguiente sitio web.

- URL o entorno: {{url_o_codigo_proyecto}}
- Tipo de proyecto: {{tipo_sitio}}
- Stack técnico: {{stack_tecnologico}}

Audita exhaustivamente el proyecto punto por punto contra los **20 Puntos Mandatorios Pre-Lanzamiento**:

1. [ ] **404 Personalizada**: ¿Tiene diseño de marca y botón de regreso funcional?
2. [ ] **Diseño Responsive Total**: ¿Probado en 375px, 768px, 1024px y 1440px sin scroll horizontal involuntario?
3. [ ] **Enlaces Verificados**: ¿Cero links rotos o huérfanos apuntando a `#`?
4. [ ] **Validación de Formularios**: ¿Feedback visual claro, required fields y estados de error?
5. [ ] **Estados de Carga (Loading)**: ¿Skeletons o spinners sutiles en peticiones asíncronas?
6. [ ] **Manejo de Errores**: ¿Fallbacks amigables si la API falla?
7. [ ] **SEO Semántico**: ¿Jerarquía estricta (`h1` único, `h2`, `h3`, `<nav>`, `<main>`, `<footer>`)?
8. [ ] **Meta Description**: ¿Texto único de 150-160 caracteres optimizado?
9. [ ] **Títulos Únicos (`<title>`)**: ¿Formato `Página | Marca`?
10. [ ] **`sitemap.xml`**: ¿Existe y es accesible para motores de búsqueda?
11. [ ] **`robots.txt`**: ¿Configurado correctamente apuntando al sitemap?
12. [ ] **Alt Text en Imágenes**: ¿Textos descriptivos obligatorios en todas las imágenes?
13. [ ] **Open Graph Tags**: ¿`og:title`, `og:description`, `og:image` (1200x630px) y `twitter:card`?
14. [ ] **Favicon Completo**: ¿`favicon.ico`, `favicon.svg` y `apple-touch-icon.png`?
15. [ ] **HTTPS y Cabeceras**: ¿Certificado SSL y cabeceras de seguridad activas?
16. [ ] **Analytics Ligero**: ¿Telemetría configurada sin penalizar la velocidad de carga?
17. [ ] **Optimización de Imágenes**: ¿Formato WebP/AVIF con `loading="lazy"` bajo el pliegue?
18. [ ] **Accesibilidad (a11y)**: ¿Contraste mínimo 4.5:1 y navegación completa por teclado?
19. [ ] **Consola DevTools Limpia**: ¿Cero errores de JavaScript o warnings de React?
20. [ ] **Core Web Vitals**: ¿LCP < 2.5s, INP < 200ms y CLS < 0.1?

Entrega un informe en forma de semáforo (🟢 Aprobado / 🟡 Advertencia / 🔴 Bloqueante) con los cambios de código específicos para subsanar cada falla detectada.', 'Diseño Web IA', '["checklist","pre-lanzamiento","qa","seo","produccion","auditoria","web-vitals"]', '["Claude 3.5 Sonnet","GPT-4o","Codex","Gemini 1.5 Pro"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-26-protocolo-arranque-web', 'Protocolo de Arranque Colaborativo — Combo de Skills Web', 'El prompt maestro para iniciar cualquier proyecto web: diagnostica el modo (Persuade, Operate, Read, Experience) y propone un combo de 2 a 4 herramientas antes de codificar.', 'Actúa como mi Lead Web AI Architect y compañero de pair programming.
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
   - *Dirección*: ¿`taste-skill` minimalista o `getdesign` emulando Stripe/Linear?
   - *Componentes*: ¿`uipro-cli` con Bento Grid o 21st.dev con micro-animaciones?
   - *Filtro de Código*: ¿Activamos `ponytail` para mantener el código en menos de 200 líneas?
   - *Auditoría*: ¿`web-design-guidelines` de Vercel + checklist de 20 puntos?
3. **Pregunta de Alineación**: Hazme exactamente UNA pregunta concreta para validar el combo antes de proceder a la arquitectura.', 'Diseño Web IA', '["protocolo-arranque","planificacion","briefing","combos-skills","anti-slop"]', '["Claude 3.5 Sonnet","Codex","Gemini 1.5 Pro"]', 1, '2026-10-07T05:41:47.254Z', '2026-10-07T05:41:47.259Z');
