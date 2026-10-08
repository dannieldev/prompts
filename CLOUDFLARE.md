# Operación de esta instalación

Este archivo documenta el alojamiento de esta aplicación. No forma parte del manual público ni se copia a `dist/`.

La edición pública sirve archivos estáticos y guarda las personalizaciones en el navegador. No necesita crear, consultar ni migrar D1. Los bindings y datos históricos se conservan; el Worker no accede a ellos.

## Verificar antes de publicar

```bash
npm run test:privacy
npm run build
```

Comprueba la cuenta y el dominio de la configuración local. Con autorización para publicar:

```bash
npm run deploy
```

No ejecutes `cloud:setup` ni migraciones como requisito de esta edición. Son herramientas heredadas para la antigua colección compartida.

Todas las rutas `/api` y `/api/*` deben responder 404 sin consultar la base, incluidas `/api/prompts` y `/api/export`. `run_worker_first` garantiza que estas rutas pasen por el bloqueo del Worker. Verifica ese comportamiento tras desplegar. Un cambio local no cierra los endpoints de una versión que ya esté publicada.

Los archivos de configuración y el historial de Git requieren una revisión adicional antes de abrir el repositorio al público. El control de compilación revisa los activos de la web, no el historial. `robots.txt` y `noindex` regulan la indexación, no son controles de acceso.
