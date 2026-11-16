# Alfredo Brocal Serrano · Portfolio

Portfolio de Data Science con estética de cartel suizo: papel, tinta negra y un rojo. Todos los gráficos salen de los CSV reales de mis proyectos.

**Stack:** HTML · CSS · JavaScript vanilla. Sin frameworks ni dependencias en tiempo de ejecución.

## Estructura

- `index.html`: la página publicada (generada, no editar a mano)
- `src/index.html`: plantilla con los textos en español y `data-en` para inglés
- `styles.css`, `main.js`: estilos, cambio de idioma (se recuerda), gráfico interactivo
- `data/raw/`: CSV copiados de los repos de cada proyecto
- `tools/build.py`: dibuja los gráficos SVG a partir de los CSV y escribe `index.html`
- `tools/og.py`: genera `assets/og.png`, la imagen para compartir en redes
- `assets/`: CV, retrato, capturas, fuente Archivo (OFL) y favicon

## Editar

1. Cambia textos en `src/index.html` (o datos en `data/raw/`).
2. Ejecuta `python tools/build.py`.
3. Para verlo: `python -m http.server` y abre http://localhost:8000.

Idioma: `?lang=en` o `?lang=es` en la URL fuerza el idioma.

## Deploy

Push a `main` → Vercel. No necesita paso de build: `index.html` ya va generado.
