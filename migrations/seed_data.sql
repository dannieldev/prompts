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
4. **Pruebas sugeridas**: 2 o 3 casos límite o tests unitarios esenciales para validar este código.', 'Desarrollo', '["arquitectura","clean-code","refactoring","solid"]', '["Claude 3.5 Sonnet","GPT-4o","Codex"]', 1, '2026-10-01T18:46:39.668Z', '2026-10-06T18:46:39.669Z');
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

Concluye con un veredicto claro: [APROBAR / APROBAR CON COMENTARIOS / SOLICITAR CAMBIOS] y una lista de mejoras concretas con código.', 'Desarrollo', '["code-review","seguridad","rendimiento","qa"]', '["Claude 3.5 Sonnet","Codex"]', 1, '2026-10-02T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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
5. **Llamado a la Acción (CTA)**: Directo, sin fricción y con sentido de oportunidad.', 'Marketing', '["copywriting","growth","landing-page","conversion"]', '["GPT-4o","Claude 3.5 Sonnet"]', 1, '2026-10-03T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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
2. **Explicación de las Técnicas Aplicadas**: Breve justificación de por qué esta formulación obtendrá mejores respuestas del modelo.', 'Razonamiento', '["prompt-engineering","metaprompt","optimizacion"]', '["Claude 3.5 Sonnet","GPT-4o","Gemini 1.5 Pro"]', 1, '2026-10-04T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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
5. **Prevención a Futuro**: Cómo evitar que este tipo de bug regrese (test unitario, aserción o tipado).', 'Desarrollo', '["debugging","troubleshooting","stack-trace","bugs"]', '["Claude 3.5 Sonnet","Codex","GPT-4o"]', 0, '2026-10-04T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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
3. **Estrategia de Caché y Persistencia**: Cómo optimizar lecturas/escrituras para mantenerse dentro del free tier o límites estándar.', 'Sistemas', '["cloudflare","workers","d1","edge","serverless"]', '["Claude 3.5 Sonnet","GPT-4o"]', 0, '2026-10-04T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
INSERT OR REPLACE INTO prompts (id, title, description, content, category, tags, models, is_favorite, created_at, updated_at) VALUES ('seed-7-api-contract-first', 'Diseñador de API REST & Tipado Contract-First', 'Diseña contratos de API limpios, modelos TypeScript y esquemas Zod con endpoints consistentes.', 'Actúa como un Lead API Architect especializado en diseño RESTful y Contract-First Design.

Dominio de negocio: {{dominio_negocio}}
Entidades principales: {{entidades_clave}}
Casos de uso requeridos: {{casos_de_uso}}

Diseña la especificación completa del módulo API con:
1. **Endpoints y Métodos HTTP**: Rutas coherentes, plurales, query params para filtros y códigos de estado HTTP correctos (200, 201, 400, 404, 409, 422).
2. **Esquemas Zod & Tipos TypeScript**: Interfaces completas para Request Body, Response Payload y Error Responses.
3. **Contrato de Paginación y Filtrado**: Estructura estándar para listas paginadas.
4. **Idempotencia y Manejo de Errores**: Formato estándar de error JSON con campos `code`, `message` y `details`.', 'Desarrollo', '["api","rest","typescript","zod","backend"]', '["Claude 3.5 Sonnet","GPT-4o"]', 0, '2026-10-05T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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
4. **Ayuda y validación**: Mostrar flags `--help` y validar dependencias previas requeridas.', 'Automatización', '["bash","zsh","scripts","macos","bun","cli"]', '["Codex","Claude 3.5 Sonnet"]', 0, '2026-10-05T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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

Incluye además el copy del post introductorio con emojis medidos y 4 hashtags relevantes.', 'Marketing', '["linkedin","redes","growth","marca-personal","contenido"]', '["GPT-4o","Claude 3.5 Sonnet"]', 0, '2026-10-05T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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
4. **Consejos específicos para SQLite / D1**: Particularidades de SQLite en lectura/escritura serverless.', 'Desarrollo', '["sql","sqlite","d1","indices","database"]', '["Claude 3.5 Sonnet","Codex"]', 0, '2026-10-06T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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

⚠️ REGLA ESTRICTA: NO generes publicaciones ni el calendario editorial todavía. Tu única meta es consolidar este entendimiento estratégico, guardarlo en tu memoria de contexto y esperar mi aprobación para pasar al Paso 2.', 'Marketing', '["agencia","calendario","redes-sociales","auditoria-marca","onboarding","estrategia","prompt-chaining"]', '["Claude 3.5 Sonnet","GPT-4o"]', 1, '2026-10-06T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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

⚠️ REGLA: No generes el calendario todavía. Guarda este contexto en memoria y espera mi feedback para el Paso 2.', 'Marketing', '["gamma-laboratorios","salud","calendario","agencia","el-salvador"]', '["Claude 3.5 Sonnet","GPT-4o"]', 1, '2026-10-06T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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

Si tienes herramientas para editar directamente el archivo Excel (como Python / openpyxl), crea la nueva hoja ''{{mes_y_ano_a_planificar}}'' respetando el diseño y estilos de las hojas anteriores; de lo contrario, entrega la tabla estructurada para volcarla de inmediato.', 'Marketing', '["agencia","calendario","redes-sociales","reels","carruseles","metaprompts","excel","prompt-chaining"]', '["Claude 3.5 Sonnet","GPT-4o"]', 1, '2026-10-06T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
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
`ID | Fecha | Pilar | Formato | Hook | Estructura / Slides | Caption Completo | Prompt para Arte IA | Referencias`', 'Marketing', '["gamma-laboratorios","calendario","excel","reels","salud","el-salvador","antigravity"]', '["Claude 3.5 Sonnet","GPT-4o","Gemini 1.5 Pro"]', 1, '2026-10-06T18:46:39.669Z', '2026-10-06T18:46:39.669Z');
