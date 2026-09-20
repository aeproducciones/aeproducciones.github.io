import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const exportRoot = fileURLToPath(new URL("../out/", import.meta.url));
const origin = "https://produccionesae.com";
const publicRoutes = [
  "/es/", "/conecta/", "/es/soluciones/", "/es/soluciones/bodas/",
  "/es/soluciones/hoteles/", "/es/soluciones/restaurantes/",
  "/es/soluciones/eventos-corporativos/", "/es/servicios/",
  "/es/royal-music/", "/es/royal-music/solista/",
  "/es/royal-music/royal-trio/", "/es/royal-music/unplugged/",
  "/es/portafolio/", "/es/nosotros/", "/es/solicitar-propuesta/",
  "/es/aviso-de-privacidad/",
];
const tracking = /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|clarity\.ms|plausible\.io|cdn\.segment\.com|static\.hotjar\.com|\bgtag\s*\(|\bfbq\s*\(/i;

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  }))).flat();
}

function decodeEntities(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt);|&#(?:x[0-9a-f]+|\d+);/gi, (entity) => {
    const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">" };
    if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
    return String.fromCodePoint(entity.toLowerCase().startsWith("&#x") ? parseInt(entity.slice(3), 16) : parseInt(entity.slice(2), 10));
  });
}

function tagsIn(html) {
  // Flight payloads can contain markup-shaped strings; only inspect actual HTML tags.
  const markup = html.replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/gi, "$1</script>");
  return [...markup.matchAll(/<([a-z][\w:-]*)\b([^>]*)>/gi)].map((match) => {
    const attrs = Object.fromEntries([...match[2].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)]
      .map((attr) => [attr[1].toLowerCase(), decodeEntities(attr[2] ?? attr[3] ?? attr[4] ?? "")]));
    return { name: match[1].toLowerCase(), attrs };
  });
}

async function targetFile(url) {
  const pathname = decodeURIComponent(url.pathname);
  const path = resolve(exportRoot, `.${pathname}`);
  assert.ok(!relative(exportRoot, path).startsWith(".."), `Path escapes export: ${url.href}`);
  try {
    const entry = await stat(path);
    const file = entry.isDirectory() ? resolve(path, "index.html") : path;
    assert.ok((await stat(file)).isFile(), `Not a file: ${url.href}`);
    return file;
  } catch (error) {
    assert.fail(`Missing export target: ${url.href} (${error.code ?? error.message})`);
  }
}

test("exports the 16 public routes with meaningful HTML", async () => {
  for (const route of publicRoutes) {
    const file = await targetFile(new URL(route, origin));
    const html = await readFile(file, "utf8");
    const tags = tagsIn(html);
    assert.equal(tags.filter((tag) => tag.name === "h1").length, 1, `${route}: one h1`);
    assert.match(html, /<html\b[^>]*\blang="es"/i, route);
    assert.match(html, /<title>[^<]+<\/title>/i, route);
    assert.ok(tags.some(({ name, attrs }) => name === "meta" && attrs.name === "description" && attrs.content?.trim()), `${route}: description`);
    assert.doesNotMatch(html, /Your site is taking shape|Building your site/i, route);
  }
});

test("all exported HTML links, resources, and fragment targets resolve locally", async () => {
  const files = await filesBelow(exportRoot);
  const htmlFiles = files.filter((file) => extname(file) === ".html");
  let checked = 0;
  for (const file of htmlFiles) {
    const pageUrl = new URL(`/${relative(exportRoot, file).replaceAll("\\", "/").replace(/index\.html$/, "")}`, origin);
    const tags = tagsIn(await readFile(file, "utf8"));
    for (const { name, attrs } of tags) {
      const refs = [attrs.src, attrs.href, attrs.poster];
      if (name === "meta" && ["og:image", "twitter:image"].includes(attrs.property ?? attrs.name)) refs.push(attrs.content);
      if (attrs.srcset) refs.push(...attrs.srcset.split(",").map((item) => item.trim().split(/\s+/)[0]));
      for (const ref of refs.filter(Boolean)) {
        const url = new URL(ref, pageUrl);
        if (url.origin !== origin || !["http:", "https:"].includes(url.protocol)) continue;
        const target = await targetFile(url);
        if (url.hash && extname(target) === ".html") {
          const fragment = decodeURIComponent(url.hash.slice(1));
          const targetTags = tagsIn(await readFile(target, "utf8"));
          assert.ok(targetTags.some(({ attrs: targetAttrs }) => targetAttrs.id === fragment || targetAttrs.name === fragment), `${pageUrl.pathname}: missing fragment ${url.href}`);
        }
        checked++;
      }
    }
  }
  assert.ok(checked > 0, "The export must contain inspectable internal references.");
  for (const file of files.filter((path) => extname(path) === ".css")) {
    const url = new URL(`/${relative(exportRoot, file).replaceAll("\\", "/")}`, origin);
    const css = await readFile(file, "utf8");
    for (const match of css.matchAll(/url\(\s*["']?([^\s)"']+)["']?\s*\)/g)) {
      const target = new URL(match[1], url);
      if (target.origin === origin) await targetFile(target);
    }
  }
});

test("public export contains no CRM endpoints, tracking scripts, or local simulation", async () => {
  const files = await filesBelow(exportRoot);
  for (const file of files) {
    const path = relative(exportRoot, file).replaceAll("\\", "/");
    assert.doesNotMatch(path, /(?:^|\/)crm(?:\/|\.|$)/i, path);
    if (![".html", ".js", ".json", ".txt"].includes(extname(file))) continue;
    const content = await readFile(file, "utf8");
    assert.doesNotMatch(content, /(?:https?:\/\/[^\s"'<>]+)?\/api\/crm(?:\/|["'\s?]|$)|["']\/crm(?:\/|["'?])/i, path);
    assert.doesNotMatch(content, /data-local-whatsapp-simulation|whatsapp-test-output/, path);
    assert.doesNotMatch(content, tracking, path);
    if (extname(file) === ".html") {
      for (const { name, attrs } of tagsIn(content)) {
        if (name === "script" && attrs.src) assert.equal(new URL(attrs.src, origin).origin, origin, `${path}: external script`);
        if (name === "a" && attrs.href) assert.doesNotMatch(new URL(attrs.href, origin).pathname, /^\/(?:api\/)?crm(?:\/|$)/i, path);
      }
    }
  }
});
