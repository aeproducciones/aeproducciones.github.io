import { clean, type IntakePayload } from "@/app/lib/crm/domain";
import { crmRepository } from "@/app/lib/crm/google-sheets";
import { errorResponse, jsonResponse, optionsResponse, requireCrmUser } from "@/app/lib/crm/http";

export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request) {
  try {
    await requireCrmUser();
    return jsonResponse(request, { prospects: await crmRepository().listProspects() });
  } catch (error) {
    return errorResponse(request, error);
  }
}

export async function POST(request: Request) {
  try {
    await requireCrmUser();
    const payload = (await request.json()) as Partial<IntakePayload>;
    if (!clean(payload.name) || !clean(payload.contact)) {
      return jsonResponse(request, { error: "Nombre y teléfono son obligatorios." }, 400);
    }
    return jsonResponse(request, { dossier: await crmRepository().createFromIntake({
      name: clean(payload.name),
      contact: clean(payload.contact),
      email: clean(payload.email),
      instagram: clean(payload.instagram),
      facebook: clean(payload.facebook),
      services: Array.isArray(payload.services) ? payload.services.map(clean).filter(Boolean) : [],
      eventType: clean(payload.eventType),
      date: clean(payload.date),
      location: clean(payload.location),
      details: clean(payload.details),
      consent: payload.consent === true,
    }) }, 201);
  } catch (error) {
    return errorResponse(request, error);
  }
}
