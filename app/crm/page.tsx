import type { Metadata } from "next";
import Link from "next/link";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { crmRepository } from "@/app/lib/crm/google-sheets";
import type { Prospect } from "@/app/lib/crm/domain";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CRM",
  robots: { index: false, follow: false },
};

export default async function CrmPage() {
  const user = await requireChatGPTUser("/crm");
  let prospects: Prospect[] = [];
  let setupError = "";
  try {
    prospects = await crmRepository().listProspects();
  } catch (error) {
    setupError = error instanceof Error && error.message.startsWith("CRM_NOT_CONFIGURED:")
      ? "Configura las credenciales privadas de Google Sheets para activar el CRM."
      : "No fue posible cargar los prospectos.";
  }

  return (
    <main className="crm-shell">
      <div className="crm-container">
        <header className="crm-header">
          <div>
            <p className="eyebrow">AE Producciones · CRM</p>
            <h1>Prospectos</h1>
            <p className="crm-muted">Sesión activa: {user.displayName}</p>
          </div>
          <Link className="button button-outline" href="/es">Volver al sitio</Link>
        </header>

        {setupError ? <p className="crm-alert" role="alert">{setupError}</p> : null}

        <div className="crm-table-wrap">
          <table className="crm-table">
            <caption className="sr-only">Prospectos de AE Producciones</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Instagram</th>
                <th>Facebook</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Seguimiento</th>
              </tr>
            </thead>
            <tbody>
              {prospects.map((prospect) => (
                <tr key={prospect.id}>
                  <td><Link className="crm-id" href={`/crm/prospectos/${encodeURIComponent(prospect.id)}`}>{prospect.id}</Link></td>
                  <td><Link className="crm-name" href={`/crm/prospectos/${encodeURIComponent(prospect.id)}`}>{prospect.name || "Sin nombre"}</Link></td>
                  <td>{prospect.instagram || "—"}</td>
                  <td>{prospect.facebook || "—"}</td>
                  <td>{prospect.email || "—"}</td>
                  <td>{prospect.phone || "—"}</td>
                  <td><span className="crm-status">{prospect.status || "Nuevo"}</span></td>
                  <td>{prospect.followUp || "—"}</td>
                </tr>
              ))}
              {!prospects.length ? (
                <tr><td colSpan={8} className="crm-empty">Aún no hay prospectos.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
