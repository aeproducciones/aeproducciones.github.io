import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".vcf": "text/vcard; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
};

// This script is injected into local HTTP responses only. It never writes to out/.
function whatsappSimulation(blockedPopup) {
  return `<script data-local-whatsapp-simulation>
(() => {
  const blockedPopup = ${JSON.stringify(blockedPopup)};
  const originalOpen = window.open.bind(window);
  function whatsappUrl(value) {
    try {
      const url = new URL(String(value), window.location.href);
      return url.protocol === "whatsapp:" || /^(?:wa\\.me|(?:[a-z0-9-]+\\.)?whatsapp\\.com)$/i.test(url.hostname) ? url : null;
    } catch { return null; }
  }
  function show(url, source) {
    let output = document.getElementById("whatsapp-test-output");
    if (!output) {
      output = document.createElement("pre");
      output.id = "whatsapp-test-output";
      output.setAttribute("role", "status");
      output.setAttribute("aria-live", "polite");
      output.style.cssText = "position:relative;z-index:2147483647;margin:24px;padding:20px;border:2px solid #141414;background:#ffffff;color:#141414;white-space:pre-wrap;overflow-wrap:anywhere;font:16px/1.5 monospace";
      document.body.append(output);
    }
    output.dataset.url = url.href;
    output.dataset.source = source;
    output.dataset.popupBlocked = String(blockedPopup);
    output.textContent = "SIMULACIÓN LOCAL — no se envió ningún mensaje.\\n" +
      "Acción: " + source + (blockedPopup ? " (popup bloqueado)" : "") +
      "\\nURL preparada: " + url.href + "\\n\\nMensaje preparado:\\n" + (url.searchParams.get("text") || "");
    output.scrollIntoView({ block: "center" });
  }
  window.open = function(value, ...args) {
    const url = whatsappUrl(value);
    if (!url) return originalOpen(value, ...args);
    show(url, "window.open");
    return blockedPopup ? null : { closed: false, focus() {}, close() { this.closed = true; } };
  };
  // Also intercept the manual link used when a popup is blocked.
  function interceptLink(event) {
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    const url = anchor && whatsappUrl(anchor.href);
    if (!url) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    show(url, "enlace manual");
  }
  document.addEventListener("click", interceptLink, true);
  document.addEventListener("auxclick", interceptLink, true);
})();
</script>`;
}

function staysInside(root, candidate) {
  const path = relative(root, candidate);
  return path !== ".." && !path.startsWith(`..${sep}`) && !isAbsolute(path);
}

export async function createPublicPreview({ simulateWhatsapp = false, blockedPopup = false, textScale = 1 } = {}) {
  if (blockedPopup && !simulateWhatsapp) {
    throw new Error("--blocked-popup requires --simulate-whatsapp.");
  }
  if (!Number.isFinite(textScale) || textScale < 1 || textScale > 2) {
    throw new Error("Text scale must be between 1 and 2.");
  }
  const exportRoot = await realpath(resolve(projectRoot, "out"));
  const simulation = simulateWhatsapp ? whatsappSimulation(blockedPopup) : "";
  const textScaleStyle = textScale === 1 ? "" : `<style data-local-text-scale>html{font-size:${textScale * 100}%}</style>`;
  const localInjections = simulation + textScaleStyle;

  async function existingFile(candidate) {
    if (!staysInside(exportRoot, candidate)) return null;
    try {
      let actual = await realpath(candidate);
      if (!staysInside(exportRoot, actual)) return null;
      if ((await stat(actual)).isDirectory()) actual = await realpath(resolve(actual, "index.html"));
      return staysInside(exportRoot, actual) && (await stat(actual)).isFile() ? actual : null;
    } catch (error) {
      if (["ENOENT", "ENOTDIR", "ELOOP"].includes(error.code)) return null;
      throw error;
    }
  }

  return createServer(async (request, response) => {
    response.setHeader("Cache-Control", "no-store, max-age=0");
    response.setHeader("X-Content-Type-Options", "nosniff");
    try {
      if (!/^(?:127\.0\.0\.1|localhost)(?::\d+)?$/.test(request.headers.host ?? "")) {
        response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" }).end("Local preview only.");
        return;
      }
      if (!["GET", "HEAD"].includes(request.method)) {
        response.writeHead(405, { Allow: "GET, HEAD" }).end();
        return;
      }
      let pathname;
      try {
        pathname = decodeURIComponent((request.url ?? "/").split(/[?#]/, 1)[0]);
      } catch {
        response.writeHead(400).end("Invalid URL.");
        return;
      }
      if (!pathname.startsWith("/") || /[\\\0]/.test(pathname) || pathname.split("/").includes("..")) {
        response.writeHead(400).end("Invalid path.");
        return;
      }
      const file = await existingFile(resolve(exportRoot, `.${pathname}`));
      const status = file ? 200 : 404;
      const servedFile = file ?? await existingFile(resolve(exportRoot, "404.html"));
      const type = servedFile ? contentTypes[extname(servedFile).toLowerCase()] ?? "application/octet-stream" : "text/plain; charset=utf-8";
      let body = servedFile ? await readFile(servedFile) : Buffer.from("Not found.");
      if (localInjections && type.startsWith("text/html")) {
        body = Buffer.from(body.toString("utf8").replace(/<\/head>/i, `${localInjections}</head>`));
      }
      response.writeHead(status, { "Content-Type": type, "Content-Length": body.byteLength });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch (error) {
      console.error("Preview request failed:", error.message);
      if (!response.headersSent) response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Local preview error.");
    }
  });
}

async function main() {
  let port = 4174;
  let simulateWhatsapp = false;
  let blockedPopup = false;
  let textScale = 1;
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--port") port = Number(args[++i]);
    else if (arg.startsWith("--port=")) port = Number(arg.slice(7));
    else if (arg === "--simulate-whatsapp") simulateWhatsapp = true;
    else if (arg === "--blocked-popup") blockedPopup = true;
    else if (arg === "--text-scale") textScale = Number(args[++i]);
    else if (arg.startsWith("--text-scale=")) textScale = Number(arg.slice(13));
    else if (arg === "--help") {
      console.log("node scripts/preview-public.mjs [--port 4174] [--simulate-whatsapp [--blocked-popup]] [--text-scale 1..2]");
      return;
    } else throw new Error(`Unknown option: ${arg}`);
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Port must be between 1 and 65535.");
  const server = await createPublicPreview({ simulateWhatsapp, blockedPopup, textScale });
  server.on("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`Public export preview: http://127.0.0.1:${port}/es/`);
    if (simulateWhatsapp) console.log(`Local WhatsApp simulation enabled${blockedPopup ? " (popup blocked)" : ""}; no WhatsApp navigation.`);
    if (textScale !== 1) console.log(`Local root font-size emulation: ${textScale * 100}%.`);
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.code === "ENOENT" ? "out/ is missing. Run npm run build:pages first." : error.message);
    process.exitCode = 1;
  });
}
