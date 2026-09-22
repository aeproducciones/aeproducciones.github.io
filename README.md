# AE Producciones

Sitio oficial de AE Producciones: música en vivo, audio profesional,
coordinación técnica y soluciones integrales para eventos.

## Publicación aprobada · 2026-09-22

Adrián autorizó aplicar las mejoras a la página pública el 22 de septiembre.
La rama fuente `codex/publicacion-web-2026-09-22` parte de la candidata
`94392a47d1c2e1fc0a4c63ab135930ebcac42d03` e incorpora la simplificación posterior
del formulario aprobada en «AE Producciones | Evolución Web»: se retiran los
selectores de audio, producción y formatos y se pregunta el tipo de evento
(Ceremonia, Boda, Cumpleaños, Aniversario, Evento corporativo, Fiesta o reunión
privada y Otro evento). El mensaje de WhatsApp refleja esa selección.

Se repitieron build público, lint, tipos y 19 pruebas, todos correctos. En navegador
se comprobaron los cuatro campos obligatorios, foco, mensaje con datos ficticios,
popup bloqueado y enlace alternativo con WhatsApp interceptado. El catálogo y
los precios de la web permanecen como en la candidata aprobada.

La configuración real de Pages usa `site-production` y `/` como origen estático,
con dominio `produccionesae.com`. El despliegue utiliza un commit fast-forward
con el árbol exacto de `out/` y el `CNAME` existente conservado byte por byte.
`public/CNAME` incorpora esa misma dirección para que los builds sean reproducibles.
Son 243 archivos públicos; `review/publication-2026-09-22-manifest.json` registra
sus SHA-256. No se publican código fuente, revisiones, simuladores ni rutas del CRM.
No se cambian DNS, permisos, workflows, secretos ni `main`.

El anterior árbol de `site-production` (`d0ff5f7`) incluía Royal Ceremony y otra
oferta que no coincidían con la versión visible antes de publicar. Por eso no se
superponen archivos antiguos ni se usa un simple revert a ese árbol como rollback.
Para restaurar la versión pública previa puede reejecutarse el run histórico
[`32588988431`](https://github.com/aeproducciones/aeproducciones.github.io/actions/runs/32588988431),
cuyo workflow fija la fuente `447595a` y el PDF oficial, o publicarse una exportación
verificada de esa fuente más dicho PDF conservando el CNAME. Toda restauración
debe verificarse contra el dominio público. Los apartados del 20 de septiembre
que siguen documentan la candidata anterior a esta autorización.

## Candidata evolutiva V1 · 2026-09-20

Versión local para revisión en la rama
`codex/web-publica-candidata-2026-09-20`, basada en el código público estable
`447595af60646f757f524a76bdffa1398b9c6cd9`. La candidata conserva la identidad,
el contenido y la oferta de esa base. La publicación queda pendiente de aprobación.

### Origen de la versión

| Referencia revisada | Estado y relación con esta candidata |
| --- | --- |
| `447595a` · 2026-08-04 | Fuente de la web pública y base de trabajo. |
| `main` · `806ddeb` · 2026-08-22 | Incluye CRM y una versión posterior de `/conecta`; sus cambios funcionales no se importaron a esta candidata. |
| `site-production` · `d0ff5f7` · 2026-08-18 | Contiene artefactos estáticos y una oferta distinta. Se conserva como referencia histórica, sin importar su contenido ni reconstruir fuente desde esos artefactos. |
| Run [`32588988431`](https://github.com/aeproducciones/aeproducciones.github.io/actions/runs/32588988431) · 2026-08-22 | Último despliegue exitoso identificado en la revisión. El workflow de `653d643` hizo checkout de `447595a`, añadió el PDF oficial y generó la exportación estática. |

El PDF servido se conserva en `public/media/AE-Producciones-Presentacion.pdf`.
Su SHA-256 coincide con el exigido por ese workflow:
`c54157efe4c4be186b0834693d67c9b5b83c3c2b8f456873f9b69724f51006de`.

### Alcance público

- Sitio en español bajo `/es`.
- Soluciones para bodas, hoteles, restaurantes y eventos corporativos.
- Servicios directos e integrados.
- Royal Music: Solista, Royal Trío y Unplugged.
- Formulario que prepara un mensaje de WhatsApp en el navegador; el usuario
  revisa y confirma el envío en ese canal. Correo disponible como contacto directo.
- Página de contacto `/conecta` de la base pública, preparada para compartirse mediante QR.
- Arquitectura lista para incorporar inglés profesional, evidencia autorizada y
  casos reales en fases posteriores.

### Cambios de la candidata

- Jerarquía y espacios de lectura ajustados en escritorio y móvil; encabezados,
  etiquetas y controles más legibles, anclas con margen para la navegación fija
  y respeto a la preferencia de movimiento reducido.
- Menú móvil con cierre mediante Escape, selección, salida de foco y toque fuera;
  retorno de foco y señalización de la página actual.
- Formulario con campos obligatorios/opcionales explícitos, validación de nombre
  y teléfono internacional, errores asociados a sus controles y foco al primer
  campo inválido. El enlace manual permite continuar si el popup se bloquea.
  Al editar, se descarta el enlace preparado para evitar compartir datos anteriores.
- Metadatos propios por página, URLs canónicas, sitemap y robots. `/conecta` y
  la información operativa de privacidad permanecen fuera del índice.
- Vista previa social con el recurso oficial AE de 1200 × 630. La fotografía
  AE-039 de músicos con barriles sigue dentro de Royal Trío y deja de usarse
  como imagen social. El hero principal conserva el logotipo Royal Music.
- Logotipo del hero convertido a WebP sin pérdida: **285 774 → 54 734 bytes**,
  mismas dimensiones de 3309 × 2250 y píxeles RGB idénticos al JPEG decodificado.
  El archivo original se conserva.

## Desarrollo y verificación pública

Requiere Node.js 22.13 o posterior. Desde la raíz del proyecto:

```bash
npm ci
npm run build:pages
npm run lint
npx tsc --noEmit --incremental false -p tsconfig.pages.json
PUBLIC_EXPORT=true node --experimental-strip-types --test tests/*.test.mjs
```

`build:pages` genera `out/`. La suite pública contiene **19 pruebas** distribuidas
en exactamente cuatro archivos: `rendered-html.test.mjs` (7),
`quote-message.test.mjs` (6), `public-export.test.mjs` (3) y
`public-seo.test.mjs` (3). Revisa contenido y recursos de 16 rutas públicas,
enlaces y anclas internos, composición del mensaje, metadatos, sitemap y ausencia
de CRM, rastreadores y simulación local en la exportación.

El script heredado `npm test` construye el runtime vinext y sólo ejecuta
`rendered-html.test.mjs`; para esta candidata estática se usan los comandos
anteriores. `tsconfig.pages.json` delimita el código público y evita exigir los
tipos del runtime Cloudflare legado.

### Previsualización local

Después de `build:pages`, abre la simulación de WhatsApp con popup bloqueado:

```bash
node scripts/preview-public.mjs --port 4174 --simulate-whatsapp --blocked-popup
```

Disponible en [localhost:4174/es/](http://127.0.0.1:4174/es/). Intercepta la apertura
de WhatsApp y el enlace manual para mostrar el mensaje preparado sin navegar a
WhatsApp. La simulación se inyecta sólo en respuestas locales y no modifica `out/`.

Para inspeccionar la exportación sin simulación, en otra terminal:

```bash
node scripts/preview-public.mjs --port 4175
```

Disponible en [localhost:4175/es/](http://127.0.0.1:4175/es/). En este modo los
enlaces externos funcionan normalmente. Ambos servidores escuchan únicamente en
`127.0.0.1`; no publican el sitio.

## Pendientes y límites de aprobación

- **Catálogo y formulario:** se conservaron las opciones heredadas Dúo, Banda
  completa y Música para ceremonia, aunque el catálogo visible presenta Solista,
  Royal Trío y Unplugged. Unificar esta nomenclatura, junto con las diferencias
  comerciales de `site-production`, requiere una decisión comercial explícita.
- **Privacidad:** se conserva literalmente el pendiente del código fuente:
  “Pendiente: sustituir esta información operativa por el aviso de privacidad
  formal revisado profesionalmente antes de incorporar almacenamiento, analítica
  o servicios de terceros.” La página describe el funcionamiento actual del
  formulario; el aviso formal sigue pendiente.
- **Fuentes del contenido:** el dossier original
  `04_DOCUMENTOS/DOSSIERS_Y_BIOGRAFIA/AE Prod press.pdf`, en el archivo maestro,
  es distinto del PDF público restaurado. El original tiene 22 páginas e incluye
  formatos históricos; no debe sustituir automáticamente la oferta vigente.
- **Tipografía:** Kohinoor Telugu está respaldada por las fuentes incrustadas en
  el dossier. El CSS conserva esa familia y sus alternativas locales. No se ha
  aportado una licencia de distribución web ni un paquete web autorizado; el
  archivo de fuente de macOS no se redistribuye con la candidata.
- **Evidencia audiovisual:** vídeos, audio y casos nuevos requieren material y
  autorización de Adrián. La selección fotográfica conserva las restricciones
  de la curaduría: AE-025 usa el derivado aprobado y AE-052 continúa excluida.
- **`/conecta`:** se conserva la página de la base estable. La versión de tarjeta
  digital presente en `main` requiere una decisión independiente sobre diseño y
  oferta antes de combinarse con la web pública.
- **Publicación e infraestructura:** la candidata no incorpora CRM ni cambios de
  cuenta, dominio, permisos, secretos o infraestructura. La configuración heredada
  de vinext/OpenAI Sites y el historial de GitHub Pages permanecen como contexto;
  el destino y procedimiento de publicación deben resolverse con la aprobación
  de la candidata.

## Evidencia de la revisión

La [galería antes/después](review/index.html) contiene 12 pares de capturas:
portada, evidencia, Royal Music, solicitud y formulario en escritorio y móvil;
portada adicional en tableta e intermedio. Se comparan las mismas rutas y anclas
con viewports CSS de 1101 × 630, 390 × 630, 768 × 630 y 1024 × 630.
Las referencias iniciales anteriores a editar están en `review/before/*.png`.
El visor recortó parte de esas imágenes; se recapturó la exportación base intacta
con un encuadre menor para la galería. Las imágenes son capturas reales del
navegador integrado; no son dispositivos físicos ni renders inventados.

Resultados finales, 20 de septiembre de 2026:

- `npm run build:pages`: correcto; 21 entradas generadas, incluidas redirección,
  404, metadatos y las 16 páginas públicas.
- `npm run lint` y TypeScript con `tsconfig.pages.json`: correctos.
- Suite pública: 19/19 pruebas correctas.
- Navegador: las 16 rutas se abrieron directamente en 320, 390, 768, 1024, 1100,
  1101 y 1440 píxeles CSS; 112 comprobaciones sin desbordamiento horizontal,
  con un H1 por página y sin imágenes visibles rotas. Se comprobó también la
  recarga de Royal Music y la navegación desde el menú.
- Texto al 200 %: 48 comprobaciones (16 rutas en 320, 390 y 1101 píxeles), sin
  desbordamiento tras corregir palabras largas y mínimos de columnas. Se emuló
  `html { font-size: 200% }` en respuestas locales, no zoom de un dispositivo real:
  `node scripts/preview-public.mjs --port 4176 --simulate-whatsapp --text-scale 2`.
- Menú: apertura, Escape con foco en el disparador, cierre al seleccionar con foco
  en contenido, salida mediante Tab, toque exterior en la marca y cambio a
  escritorio con foco en la marca. El desplazamiento del documento sigue libre.
- Formulario: cinco errores de campos requeridos, foco visible en el primer
  control incorrecto, corrección progresiva, selección múltiple y campos
  opcionales vacíos. Mensaje simulado con nombre ficticio y número reservado
  `+1 202-555-0100`; se verificaron acentos, servicios y valores por definir.
  Se interceptaron apertura de WhatsApp y enlace alternativo, incluido popup
  bloqueado. Editar invalida el mensaje preparado. No hubo mensajes ni registros.
- Sin avisos ni errores de consola en el recorrido final. Los recursos y enlaces
  internos de la exportación resolvieron en pruebas locales. No se afirma que
  se hayan probado transacciones externas, envío real, CRM o dispositivos físicos.
- Revisión visual y de código: paleta monocromática, foco visible, etiquetas,
  textos alternativos y reglas de movimiento reducido conservadas o reforzadas.
  No se ejecutó una auditoría WCAG certificada, lector de pantalla ni emulación
  del ajuste del sistema para movimiento reducido.
- Rendimiento: ahorro verificable de 231 040 bytes (80,85 %) en el logo del hero,
  con los mismos píxeles decodificados. No se midieron Lighthouse ni Core Web Vitals.

Los registros de geometría están en `review/browser-checks.json` y
`review/text-scale-checks.json`. Las pruebas del runtime Cloudflare general
siguen fuera de esta candidata pública; no se ocultaron sus errores ni se
eliminó código interno para conseguir el build.

## Revisar y deshacer únicamente esta candidata

La rama de mejora es local y no se ha hecho push, merge ni despliegue. El workflow
heredado escucha `main`; no debe promoverse esta rama ni mezclarse `main` completo
para publicar la web. DNS, Pages, secretos, workflows, dependencias y CRM no se
modificaron.

Después del commit local de entrega, el diff completo se consulta con:

```bash
git diff 447595af60646f757f524a76bdffa1398b9c6cd9..codex/web-publica-candidata-2026-09-20
```

Para deshacer exclusivamente esta candidata sin borrar archivos ni sobrescribir
otros trabajos, confirma que la rama está limpia y revierte su único commit de
entrega (obtén el identificador con `git log -1 --oneline` en esta rama):

```bash
git revert <commit-local-de-la-candidata>
```

No ejecutes `reset --hard`, force push ni cambios en ramas remotas. Parar los
servidores locales con Ctrl-C basta para cerrar las vistas previas; no afecta a
lo que ven los clientes.
