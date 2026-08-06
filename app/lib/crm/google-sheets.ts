import type { IntakePayload, Prospect, ProspectDossier } from "./domain";
import {
  clean,
  createProspectId,
  prospectFromRow,
  prospectToRow,
} from "./domain";
import type { ProspectRepository } from "./repository";
import { env as cloudflareEnv } from "cloudflare:workers";

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

let cachedToken: { value: string; expiresAt: number } | null = null;

function runtimeEnv(name: string): string {
  const processValue = typeof process !== "undefined" ? process.env[name] : undefined;
  const workerValue = (cloudflareEnv as unknown as Record<string, unknown>)[name];
  const globalValue = (globalThis as Record<string, unknown>)[name];
  return clean(processValue ?? workerValue ?? globalValue);
}

function requiredEnv(name: string): string {
  const value = runtimeEnv(name);
  if (!value) throw new Error(`CRM_NOT_CONFIGURED:${name}`);
  return value;
}

function base64Url(input: Uint8Array | string): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function pemToBytes(pem: string): ArrayBuffer {
  const body = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes.buffer;
}

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const email = requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = requiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replaceAll("\\n", "\n");
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(
    JSON.stringify({
      iss: email,
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  );
  const unsigned = `${header}.${claim}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToBytes(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsigned),
  );
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${base64Url(new Uint8Array(signature))}`,
    }),
  });
  if (!response.ok) throw new Error(`Google OAuth error ${response.status}`);
  const data = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Google OAuth token missing");
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return data.access_token;
}

async function sheetsRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const spreadsheetId = requiredEnv("GOOGLE_SHEETS_ID");
  const response = await fetch(`${SHEETS_API}/${spreadsheetId}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${await accessToken()}`,
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Sheets error ${response.status}: ${detail.slice(0, 240)}`);
  }
  return (await response.json()) as T;
}

type ValuesResponse = { values?: string[][] };

async function readTab(title: string): Promise<string[][]> {
  const result = await sheetsRequest<ValuesResponse>(
    `/values/${encodeURIComponent(title)}!A1:Z1000?majorDimension=ROWS`,
  );
  return result.values ?? [];
}

async function appendRow(title: string, row: string[]): Promise<void> {
  await sheetsRequest(
    `/values/${encodeURIComponent(title)}!A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    { method: "POST", body: JSON.stringify({ values: [row] }) },
  );
}

function rowsToObjects(rows: string[][]): Array<Record<string, string>> {
  const [headers, ...data] = rows;
  if (!headers) return [];
  return data
    .filter((row) => row.some((value) => clean(value)))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
}

export class GoogleSheetsProspectRepository implements ProspectRepository {
  async listProspects(): Promise<Prospect[]> {
    const rows = await readTab("Prospectos");
    return rows.slice(1).filter((row) => clean(row[0])).map(prospectFromRow);
  }

  async getProspect(id: string): Promise<ProspectDossier | null> {
    const [prospects, expediente, interactions, requests] = await Promise.all([
      this.listProspects(),
      readTab("Expediente"),
      readTab("Interacciones"),
      readTab("Solicitudes"),
    ]);
    const prospect = prospects.find((entry) => entry.id === id);
    if (!prospect) return null;
    const match = (rows: string[][]) => rowsToObjects(rows).filter((row) => row.ID === id);
    return {
      prospect,
      expediente: match(expediente)[0] ?? null,
      interactions: match(interactions),
      requests: match(requests),
    };
  }

  async createFromIntake(payload: IntakePayload): Promise<ProspectDossier> {
    const id = createProspectId();
    const prospect: Prospect = {
      id,
      name: clean(payload.name),
      instagram: clean(payload.instagram),
      facebook: clean(payload.facebook),
      email: clean(payload.email),
      phone: clean(payload.contact),
      status: "Nuevo",
      followUp: "",
    };
    const created = new Date().toISOString();
    await appendRow("Prospectos", prospectToRow(prospect));
    await appendRow("Expediente", [
      id,
      clean(payload.eventType),
      payload.services.map(clean).filter(Boolean).join(", "),
      clean(payload.date),
      clean(payload.location),
      clean(payload.details),
      payload.consent ? "Sí" : "No",
      created,
    ]);
    await appendRow("Solicitudes", [
      id,
      created,
      payload.services.map(clean).filter(Boolean).join(", "),
      clean(payload.eventType),
      clean(payload.date),
      clean(payload.location),
      clean(payload.details),
      "Nueva",
    ]);
    return {
      prospect,
      expediente: {
        ID: id,
        "Tipo de evento": clean(payload.eventType),
        "Servicios solicitados": payload.services.join(", "),
        "Fecha del evento": clean(payload.date),
        "Sede o ciudad": clean(payload.location),
        Detalles: clean(payload.details),
        Consentimiento: payload.consent ? "Sí" : "No",
        Creado: created,
      },
      interactions: [],
      requests: [],
    };
  }

  async updateProspect(id: string, patch: Partial<Prospect>): Promise<Prospect> {
    const rows = await readTab("Prospectos");
    const rowIndex = rows.findIndex((row) => row[0] === id);
    if (rowIndex < 1) throw new Error("Prospecto no encontrado");
    const current = prospectFromRow(rows[rowIndex]);
    const updated = { ...current, ...patch, id };
    const spreadsheetId = requiredEnv("GOOGLE_SHEETS_ID");
    const sheetId = await getSheetId(spreadsheetId, "Prospectos");
    await sheetsRequest(
      `:batchUpdate`,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              updateCells: {
                range: {
                  sheetId,
                  startRowIndex: rowIndex,
                  endRowIndex: rowIndex + 1,
                  startColumnIndex: 0,
                  endColumnIndex: 8,
                },
                rows: [{ values: prospectToRow(updated).map((value) => ({ userEnteredValue: { stringValue: value } })) }],
                fields: "userEnteredValue",
              },
            },
          ],
        }),
      },
    );
    return updated;
  }
}

async function getSheetId(spreadsheetId: string, title: string): Promise<number> {
  const response = await fetch(`${SHEETS_API}/${spreadsheetId}?fields=sheets.properties`, {
    headers: { authorization: `Bearer ${await accessToken()}` },
  });
  if (!response.ok) throw new Error(`Google Sheets metadata error ${response.status}`);
  const data = (await response.json()) as { sheets?: Array<{ properties?: { title?: string; sheetId?: number } }> };
  const sheet = data.sheets?.find((entry) => entry.properties?.title === title);
  if (sheet?.properties?.sheetId === undefined) throw new Error(`Hoja no encontrada: ${title}`);
  return sheet.properties.sheetId;
}

export function crmRepository(): ProspectRepository {
  return new GoogleSheetsProspectRepository();
}
