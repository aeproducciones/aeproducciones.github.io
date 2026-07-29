import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/es") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname.replaceAll("/", "-")}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Spanish homepage with dossier-led content", async () => {
  const response = await render("/es");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Música en vivo\. Producción\. Audio profesional\./);
  assert.match(html, /La excelencia es el eje de todos nuestros proyectos\./);
  assert.match(html, /AE Live Sessions/);
  assert.match(html, /Refuerzo Sonoro/);
  assert.match(html, /Solista/);
  assert.match(html, /Royal Trío/);
  assert.match(html, /Unplugged/);
  assert.match(html, /wa\.me\/524427111671/);
  assert.match(html, /Solicitar propuesta/);
  assert.doesNotMatch(html, /paquete premium|el mejor formato|brass|dorado/i);
});

test("renders every primary public route", async () => {
  const routes = [
    "/es/soluciones",
    "/es/soluciones/bodas",
    "/es/soluciones/hoteles",
    "/es/soluciones/restaurantes",
    "/es/soluciones/eventos-corporativos",
    "/es/servicios",
    "/es/royal-music",
    "/es/royal-music/solista",
    "/es/royal-music/royal-trio",
    "/es/royal-music/unplugged",
    "/es/portafolio",
    "/es/nosotros",
    "/es/solicitar-propuesta",
    "/es/aviso-de-privacidad",
    "/conecta",
  ];

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      route,
    );
    const html = await response.text();
    assert.doesNotMatch(html, /Your site is taking shape|Building your site/, route);
    assert.doesNotMatch(html, /Dossier, p\.|Arquitectura web aprobada/, route);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: one h1`);
    assert.doesNotMatch(html, /<svg\b/i, `${route}: no generic inline icons`);
    assert.doesNotMatch(
      html,
      /<img\b(?![^>]*\balt=)[^>]*>/i,
      `${route}: every image has alt`,
    );
  }
});

test("keeps the QR experience concise and contact-ready", async () => {
  const response = await render("/conecta");
  const html = await response.text();

  assert.match(html, /Música en vivo\. Producción\. Audio profesional\./);
  assert.match(html, /La excelencia es el eje de todos nuestros proyectos/);
  assert.match(html, /Consultar disponibilidad/);
  assert.match(html, /wa\.me\/524427111671/);
  assert.match(html, /Royal Music/);
});

test("ships official brand assets and no starter preview", async () => {
  await Promise.all([
    access(new URL("public/brand/ae-logo-dark.png", projectRoot)),
    access(new URL("public/brand/ae-logo-light.png", projectRoot)),
    access(
      new URL("public/brand/ae-producciones-lockup-dark.png", projectRoot),
    ),
    access(
      new URL("public/brand/ae-producciones-lockup-light.png", projectRoot),
    ),
    access(new URL("public/brand/royal-music-dark.png", projectRoot)),
    access(new URL("public/brand/royal-music-light.png", projectRoot)),
    access(new URL("public/brand/formats/royal-solista-dark.png", projectRoot)),
    access(new URL("public/brand/formats/royal-trio-dark.png", projectRoot)),
    access(new URL("public/brand/formats/royal-unplugged-dark.png", projectRoot)),
    access(new URL("public/media/adrian-guitar-studio.jpg", projectRoot)),
  ]);

  const previewFiles = await readdir(new URL("app/_sites-preview", projectRoot));
  assert.deepEqual(previewFiles, []);

  const [layout, homepage] = await Promise.all([
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
    readFile(new URL("app/es/page.tsx", projectRoot), "utf8"),
  ]);
  assert.match(layout, /AE Producciones/);
  assert.match(layout, /lang="es"/);
  assert.match(homepage, /royalFormats/);
  assert.doesNotMatch(homepage, /ArrowIcon|WhatsAppIcon/);
});

test("presents the quote form in client-facing language", async () => {
  const response = await render("/es/solicitar-propuesta");
  const html = await response.text();

  for (const option of [
    "Solista",
    "Dúo",
    "Trío",
    "Banda completa",
    "Música para ceremonia",
    "Producción técnica",
    "Refuerzo sonoro",
    "Renta de audio",
    "Aún no estoy seguro",
  ]) {
    assert.match(html, new RegExp(option));
  }

  assert.match(html, /¿Qué necesitas\?/);
  assert.match(html, /Continuar por WhatsApp/);
  assert.doesNotMatch(html, /value="Royal Music"|value="AE Live Sessions"/);
});

test("keeps each photographic context purposeful", async () => {
  const contextualRoutes = [
    "/es",
    "/es/soluciones",
    "/es/soluciones/bodas",
    "/es/soluciones/hoteles",
    "/es/soluciones/restaurantes",
    "/es/soluciones/eventos-corporativos",
    "/es/royal-music",
    "/es/royal-music/solista",
    "/es/royal-music/royal-trio",
    "/es/royal-music/unplugged",
    "/es/servicios",
    "/es/portafolio",
  ];
  const html = (
    await Promise.all(
      contextualRoutes.map(async (route) => (await render(route)).text()),
    )
  ).join("\n");

  assert.doesNotMatch(
    html,
    /ae-live-stage-blue|adrian-guitar-studio|adrian-guitar-portrait|adrian-live-formal|adrian-guitar-close/,
  );
  assert.doesNotMatch(html, /Fotografía técnica pendiente|Material en desarrollo/);
  assert.match(html, /ae-033-formal-reception\.webp/);
  assert.match(html, /ae-050-production-setup\.webp/);

  const aboutHtml = await (await render("/es/nosotros")).text();
  const connectHtml = await (await render("/conecta")).text();
  assert.match(aboutHtml, /adrian-studio-portrait\.jpg/);
  assert.match(connectHtml, /adrian-guitar-close\.jpg/);
});

test("keeps the approved monochrome and performance budgets", async () => {
  const css = await readFile(new URL("app/globals.css", projectRoot), "utf8");
  assert.doesNotMatch(css, /box-shadow/i);
  const radii = [...css.matchAll(/border-radius:\s*([^;]+);/gi)].map(
    (match) => match[1].trim(),
  );
  assert.deepEqual(
    radii.filter((value) => value !== "0"),
    [],
  );
  const approved = new Set([
    "#000000",
    "#141414",
    "#231f20",
    "#4e4f51",
    "#636566",
    "#f2f2f2",
    "#ffffff",
  ]);
  const unexpectedColors = (css.match(/#[0-9a-f]{3,8}/gi) ?? []).filter(
    (color) => !approved.has(color.toLowerCase()),
  );
  assert.deepEqual(unexpectedColors, []);

  const mediaDirectory = new URL("public/media/", projectRoot);
  const mediaFiles = await readdir(mediaDirectory);
  const mediaStats = await Promise.all(
    mediaFiles.map((file) => stat(new URL(file, mediaDirectory))),
  );
  assert.ok(mediaStats.every((entry) => entry.size < 400 * 1024));
  assert.ok(
    mediaStats.reduce((total, entry) => total + entry.size, 0) < 3 * 1024 * 1024,
  );

  const selectionDirectory = new URL("public/media/selection-web/", projectRoot);
  const selectionFiles = await readdir(selectionDirectory);
  const selectionStats = await Promise.all(
    selectionFiles.map((file) => stat(new URL(file, selectionDirectory))),
  );
  assert.ok(selectionStats.every((entry) => entry.size < 500 * 1024));
  assert.ok(
    selectionStats.reduce((total, entry) => total + entry.size, 0) <
      3 * 1024 * 1024,
  );
});
