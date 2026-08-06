import { getChatGPTUser } from "@/app/chatgpt-auth";

const allowedOrigins = new Set([
  "https://produccionesae.com",
  "https://www.produccionesae.com",
  "https://aeproducciones.github.io",
  "https://ae-producciones-queretaro.adrian-eugenio.chatgpt.site",
]);

export function corsHeaders(request: Request): Headers {
  const headers = new Headers({
    "access-control-allow-methods": "GET,POST,PATCH,OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
  });
  const origin = request.headers.get("origin");
  if (origin && allowedOrigins.has(origin)) {
    headers.set("access-control-allow-origin", origin);
    headers.set("vary", "Origin");
  }
  return headers;
}

export function jsonResponse(request: Request, body: unknown, status = 200): Response {
  const headers = corsHeaders(request);
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body), { status, headers });
}

export function optionsResponse(request: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function requireCrmUser(): Promise<NonNullable<Awaited<ReturnType<typeof getChatGPTUser>>>> {
  const user = await getChatGPTUser();
  if (!user) throw new Error("CRM_UNAUTHORIZED");
  return user;
}

export function errorResponse(request: Request, error: unknown): Response {
  const message = error instanceof Error ? error.message : "Error inesperado";
  if (message === "CRM_UNAUTHORIZED") return jsonResponse(request, { error: "No autorizado" }, 401);
  if (message.startsWith("CRM_NOT_CONFIGURED:")) {
    return jsonResponse(request, { error: "El CRM necesita configurar sus credenciales de Google Sheets." }, 503);
  }
  return jsonResponse(request, { error: "No fue posible completar la operación." }, 500);
}
