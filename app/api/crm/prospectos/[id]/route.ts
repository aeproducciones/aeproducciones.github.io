import { clean, type Prospect } from "@/app/lib/crm/domain";
import { crmRepository } from "@/app/lib/crm/google-sheets";
import { errorResponse, jsonResponse, optionsResponse, requireCrmUser } from "@/app/lib/crm/http";

export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireCrmUser();
    const { id } = await context.params;
    const dossier = await crmRepository().getProspect(id);
    return dossier ? jsonResponse(request, { dossier }) : jsonResponse(request, { error: "Prospecto no encontrado." }, 404);
  } catch (error) {
    return errorResponse(request, error);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requireCrmUser();
    const { id } = await context.params;
    const payload = (await request.json()) as Partial<Prospect>;
    const patch: Partial<Prospect> = {};
    for (const field of ["name", "instagram", "facebook", "email", "phone", "status", "followUp"] as const) {
      if (field in payload) patch[field] = clean(payload[field]);
    }
    return jsonResponse(request, { prospect: await crmRepository().updateProspect(id, patch) });
  } catch (error) {
    return errorResponse(request, error);
  }
}
