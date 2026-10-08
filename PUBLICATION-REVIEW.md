# Revisión de privacidad de la edición pública

Fecha: 2026-10-07. Alcance: archivos locales que generan la web, catálogo de 25 prompts, manual de 12 capítulos, activos estáticos y rutas del Worker. No se ha desplegado ni modificado la base remota.

## Hallazgos y cambios

- El manual describía el entorno del autor como requisito general. Se sustituyeron las referencias al equipo, instalación global, infraestructura y dominio personales. El capítulo final ahora explica entrega, revisión de privacidad y publicación según cada proyecto.
- Los 25 prompts no contenían correos privados, rutas personales ni identificadores de cuentas. Se conservaron las plantillas especializadas por tecnología y se reforzaron los prompts de arranque y revisión previa a publicar con instrucciones de privacidad.
- El código de la API permitía listar y exportar la base compartida sin autenticación, además de escribir en ella. La edición pública bloquea todas las rutas de la API antes de acceder a cualquier binding. Este hallazgo corresponde al código revisado; no se consultó la base de producción ni se comprobó si existen controles externos en ese despliegue.
- El navegador ya no consulta ni envía prompts a esa API. Las personalizaciones y respaldos se gestionan localmente.
- Se usa un espacio de almacenamiento separado para no incorporar una antigua colección personal al catálogo público. El almacenamiento anterior y la base histórica permanecen intactos.
- Se retiraron del cliente las referencias a colecciones de clientes que persistían en reglas antiguas de filtrado.
- La firma pública del autor permanece. La configuración operativa continúa fuera de los activos publicados.

## Verificación

- `npm run test:privacy`: 3 pruebas aprobadas; comprueban 35 combinaciones de ruta/método bloqueadas sin tocar la base, entrega de activos y operaciones locales sin red ni lectura de datos heredados.
- `npm run build`: TypeScript, Vite y auditoría de los 8 archivos compilados aprobados.
- `wrangler deploy --dry-run`: empaquetado local aprobado; no publica.
- Capítulo final y biblioteca revisados en el navegador local.

## Límites y publicación

La auditoría automática busca patrones de rutas personales, correos, subdominios del autor, identificadores, claves y archivos internos. Es un control preventivo, no una garantía de detectar cualquier dato confidencial. Los textos, imágenes y nuevos prompts requieren revisión humana antes de incorporarlos al catálogo.

Los cambios solo están en local. Tras autorizar y realizar un despliegue, verificar que `/api/prompts` y `/api/export` respondan 404 en el dominio público. No se ha auditado el historial de Git ni se ha preparado el repositorio para hacerlo público; esa revisión es distinta de publicar la web.
