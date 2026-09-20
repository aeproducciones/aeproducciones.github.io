import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const origin = "https://produccionesae.com";
const socialImage = `${origin}/brand/ae-producciones-social-preview.png`;
const indexablePaths = [
  "/es/",
  "/es/soluciones/",
  "/es/soluciones/bodas/",
  "/es/soluciones/hoteles/",
  "/es/soluciones/restaurantes/",
  "/es/soluciones/eventos-corporativos/",
  "/es/servicios/",
  "/es/royal-music/",
  "/es/royal-music/solista/",
  "/es/royal-music/royal-trio/",
  "/es/royal-music/unplugged/",
  "/es/portafolio/",
  "/es/nosotros/",
  "/es/solicitar-propuesta/",
];
const nonIndexablePaths = ["/es/aviso-de-privacidad/", "/conecta/"];

function exportedFile(path) {
  return new URL(`../out${path}`, import.meta.url);
}

function tagValues(html, tag, attribute, value, output) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "g"))]
    .map(([element]) => Object.fromEntries(
      [...element.matchAll(/([\w:-]+)="([^"]*)"/g)]
        .map(([, name, content]) => [name, content]),
    ))
    .filter((attributes) => attributes[attribute] === value)
    .map((attributes) => attributes[output]);
}

function metadata(html, name) {
  return tagValues(html, "meta", name.startsWith("og:") ? "property" : "name", name, "content");
}

test("exported public pages have their own canonical and social metadata", async () => {
  for (const path of [...indexablePaths, ...nonIndexablePaths]) {
    const html = await readFile(exportedFile(`${path}index.html`), "utf8");
    const canonical = `${origin}${path}`;
    assert.deepEqual(tagValues(html, "link", "rel", "canonical", "href"), [canonical], path);
    assert.deepEqual(metadata(html, "og:url"), [canonical], path);
    assert.deepEqual(metadata(html, "og:image"), [socialImage], path);
    assert.deepEqual(metadata(html, "twitter:image"), [socialImage], path);
    assert.deepEqual(metadata(html, "og:image:width"), ["1200"], path);
    assert.deepEqual(metadata(html, "og:image:height"), ["630"], path);
    const descriptions = metadata(html, "description");
    assert.equal(descriptions.length, 1, path);
    assert.ok(descriptions[0].length > 20, path);
    assert.deepEqual(metadata(html, "og:description"), descriptions, path);
    assert.deepEqual(metadata(html, "twitter:description"), descriptions, path);
    const robots = metadata(html, "robots").join(",");
    assert.equal(/\bnoindex\b/.test(robots), nonIndexablePaths.includes(path), path);
  }
});

test("sitemap lists exactly the public indexable pages and robots points to it", async () => {
  const sitemap = await readFile(exportedFile("/sitemap.xml"), "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  assert.deepEqual(locations.sort(), indexablePaths.map((path) => `${origin}${path}`).sort());
  const robots = await readFile(exportedFile("/robots.txt"), "utf8");
  assert.match(robots, /^User-Agent: \*$/im);
  assert.match(robots, /^Allow: \/$/im);
  assert.match(robots, /^Sitemap: https:\/\/produccionesae\.com\/sitemap\.xml$/im);
});

test("the exported social image is the restored official 1200 by 630 PNG", async () => {
  const [source, exported] = await Promise.all([
    readFile(new URL("../public/brand/ae-producciones-social-preview.png", import.meta.url)),
    readFile(exportedFile("/brand/ae-producciones-social-preview.png")),
  ]);
  assert.deepEqual(exported, source);
  assert.equal(source.subarray(1, 4).toString(), "PNG");
  assert.equal(source.readUInt32BE(16), 1200);
  assert.equal(source.readUInt32BE(20), 630);
});
