# Prompts Célebres

Biblioteca pública de prompts con variables dinámicas, búsqueda, categorías, favoritos y un manual para crear webs con agentes de IA. Autor: @dannieldev.

## Catálogo y privacidad

El catálogo publicado procede de `src/lib/seedData.ts`, revisado como contenido público. Los prompts nuevos, ediciones, favoritos e importaciones se guardan exclusivamente en el navegador de cada visitante. No se sincronizan con una base compartida. El respaldo JSON permite mover la colección entre dispositivos; debe revisarse antes de compartirlo.

La edición pública utiliza un espacio de almacenamiento nuevo. Los datos anteriores del navegador y de la base de datos se conservan, pero no se cargan ni se exportan automáticamente. El Worker devuelve 404 en todas las rutas `/api` y `/api/*`, incluidos los endpoints antiguos de exportación, importación y edición.

## Desarrollo y verificación

```bash
npm run dev
npm run test:privacy
npm run build
```

El build compila TypeScript y Vite y revisa los archivos de `dist/` en busca de patrones de datos privados. Este control complementa la revisión humana: no garantiza detectar todo secreto o dato confidencial.

- `src/components/ManualPage.tsx`: manual general, independiente de la infraestructura del autor.
- `src/lib/seedData.ts`: catálogo que se incluye en el navegador.
- `src/lib/api.ts`: almacenamiento local de la colección.
- `worker.js`: servicio de archivos estáticos y bloqueo de la antigua API.
- `public/`: todo archivo de esta carpeta se publica. No guardar aquí respaldos, configuración ni datos privados.
- `seeds.js`, `migrations/` y scripts de D1: material heredado; no se utiliza para leer o escribir datos desde la edición pública.

Los prompts especializados en un proveedor son plantillas genéricas. No describen dónde están alojados los proyectos del autor.

## Despliegue de esta aplicación

La configuración operativa de este repositorio es independiente del contenido del manual. Consulta `CLOUDFLARE.md` para el despliegue de esta instalación. Publica únicamente los activos de `dist/` y el Worker. No publiques el repositorio completo sin revisar también su configuración y su historial.

## Atajos

- `/` o `Cmd/Ctrl + K`: buscar.
- `N`: nuevo prompt.
- `G`: alternar biblioteca y manual.
- `Esc`: cerrar un diálogo.
