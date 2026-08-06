import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { crmRepository } from "@/app/lib/crm/google-sheets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Expediente",
  robots: { index: false, follow: false },
};

export default async function ProspectDossierPage({ params }: { params: Promise<{ id: string }> }) {
  await requireChatGPTUser("/crm");
  const { id } = await params;
  let dossier;
  try {
    dossier = await crmRepository().getProspect(id);
  } catch {
    dossier = null;
  }
  if (!dossier) notFound();

  return (
    <main className="crm-shell">
      <div className="crm-container crm-dossier">
        <div className="crm-back"><Link href="/crm">← Volver a prospectos</Link></div>
        <header className="crm-header crm-header-dossier">
          <div>
            <p className="eyebrow">Expediente</p>
            <h1>{dossier.prospect.name || "Sin nombre"}</h1>
            <p className="crm-muted">{dossier.prospect.id} · {dossier.prospect.status || "Nuevo"}</p>
          </div>
          <a className="button button-dark" href={`tel:${dossier.prospect.phone}`}>Llamar</a>
        </header>

        <section className="crm-card" aria-labelledby="contacto-title">
          <h2 id="contacto-title">Contacto</h2>
          <dl className="crm-details">
            <div><dt>Instagram</dt><dd>{dossier.prospect.instagram || "—"}</dd></div>
            <div><dt>Facebook</dt><dd>{dossier.prospect.facebook || "—"}</dd></div>
            <div><dt>Correo</dt><dd>{dossier.prospect.email || "—"}</dd></div>
            <div><dt>Teléfono</dt><dd>{dossier.prospect.phone || "—"}</dd></div>
            <div><dt>Seguimiento</dt><dd>{dossier.prospect.followUp || "Pendiente"}</dd></div>
          </dl>
        </section>

        <section className="crm-card" aria-labelledby="solicitud-title">
          <h2 id="solicitud-title">Solicitud</h2>
          {dossier.expediente ? (
            <dl className="crm-details">
              {Object.entries(dossier.expediente).filter(([key]) => key !== "ID").map(([key, value]) => (
                <div key={key}><dt>{key}</dt><dd>{value || "—"}</dd></div>
              ))}
            </dl>
          ) : <p className="crm-muted">Sin información adicional.</p>}
        </section>

        <section className="crm-card" aria-labelledby="interacciones-title">
          <h2 id="interacciones-title">Interacciones</h2>
          {dossier.interactions.length ? (
            <div className="crm-stack">{dossier.interactions.map((row, index) => <pre key={`${row.ID}-${index}`}>{JSON.stringify(row, null, 2)}</pre>)}</div>
          ) : <p className="crm-muted">Aún no hay interacciones registradas.</p>}
        </section>
      </div>
    </main>
  );
}
