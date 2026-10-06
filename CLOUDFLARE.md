# Despliegue en Cloudflare — prompts.dannieldev.com

Este proyecto está preparado para funcionar tanto en **local** como en **Cloudflare Workers con Static Assets y Cloudflare D1**.

---

## 1. Configuración de Cloudflare D1 (Una Sola Vez)

Para crear la base de datos `prompts` en tu cuenta de Cloudflare y aplicar las migraciones:

```bash
npm run cloud:setup
```

Este script automático:
1. Comprueba si existe la base de datos `prompts` en Cloudflare D1. Si no existe, la crea.
2. Actualiza `database_id` en [wrangler.jsonc](file:///Users/ava/Documents/dannieldev/proyectos/prompts/wrangler.jsonc).
3. Aplica la migración [migrations/0001_init.sql](file:///Users/ava/Documents/dannieldev/proyectos/prompts/migrations/0001_init.sql) en el D1 remoto.

---

## 2. Publicación a Producción

Una vez configurada la base D1, para compilar y desplegar:

```bash
npm run deploy
```

El Worker responderá en el dominio configurado en `wrangler.jsonc`:
- `https://prompts.dannieldev.com`

---

## 3. Endpoints del Worker

- `GET /api/prompts` — Devuelve todos los prompts ordenados por favoritos y fecha. Auto-inicializa los 10 prompts célebres si la base está vacía.
- `POST /api/prompts` — Crea un nuevo prompt.
- `PUT /api/prompts/:id` — Actualiza un prompt existente.
- `DELETE /api/prompts/:id` — Elimina un prompt.
- `POST /api/prompts/:id/favorite` — Alterna el estado de célebre / favorito.
- `GET /api/export` — Exporta toda la colección en JSON.
- `POST /api/import` — Importa o mezcla prompts en lote.
- Todo lo demás — Servido de inmediato por los activos estáticos (`assets: ./dist`).
