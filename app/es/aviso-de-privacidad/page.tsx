import type { Metadata } from "next";
import { PageHero } from "@/app/components/ui";
import { siteConfig } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Información de privacidad",
  description:
    "Funcionamiento técnico del formulario de contacto de AE Producciones.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Privacidad"
        title="Información sobre el contacto."
        text="El formulario prepara una solicitud en tu navegador y abre el canal elegido."
        breadcrumbs={[{ label: "Privacidad" }]}
      />

      <section className="section legal-section">
        <article className="container legal-copy">
          <p className="pending-legal">
            Pendiente: sustituir esta información operativa por el aviso de
            privacidad formal revisado profesionalmente antes de incorporar
            almacenamiento, analítica o servicios de terceros.
          </p>

          <h2>Datos introducidos</h2>
          <p>
            El sitio no guarda una copia de los campos del formulario. La
            información se procesa en el navegador para preparar un mensaje.
          </p>

          <h2>WhatsApp y correo</h2>
          <p>
            Al continuar, el envío y la conservación de la conversación
            dependen del canal elegido y de sus propias condiciones.
          </p>

          <h2>Analítica</h2>
          <p>
            Esta versión no incorpora cookies publicitarias, perfiles de usuario
            ni analítica de terceros.
          </p>

          <h2>Contacto</h2>
          <p>
            Para solicitar información relacionada con una conversación,
            escribe a{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </article>
      </section>
    </>
  );
}
