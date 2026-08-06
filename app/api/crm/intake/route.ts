import { clean, type IntakePayload } from "@/app/lib/crm/domain";
import { crmRepository } from "@/app/lib/crm/google-sheets";
import { errorResponse, jsonResponse, optionsResponse } from "@/app/lib/crm/http";

export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<IntakePayload>;
    const services = Array.isArray(payload.services) ? payload.services.map(clean).filter(Boolean) : [];
    if (!clean(payload.name) || !clean(payload.contact) || !clean(payload.eventType) || !services.length || payload.consent !== true) {
      return jsonResponse(request, { error: "Faltan datos obligatorios para crear la solicitud." }, 400);
    }
    const dossier = await crmRepository().createFromIntake({
      name: clean(payload.name),
      contact: clean(payload.contact),
      email: clean(payload.email),
      instagram: clean(payload.instagram),
      facebook: clean(payload.facebook),
      services,
      eventType: clean(payload.eventType),
      date: clean(payload.date),
      location: clean(payload.location),
      details: clean(payload.details),
      consent: true,
    });
    return jsonResponse(request, { id: dossier.prospect.id }, 201);
  } catch (error) {
    return errorResponse(request, error);
  }
}
