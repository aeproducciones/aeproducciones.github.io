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
        text="El formulario registra los datos mínimos de contacto para dar seguimiento a tu solicitud y abre el canal elegido."
        breadcrumbs={[{ label: "Privacidad" }]}
      />

      <section className="section legal-section">
        <article className="container legal-copy">
          <h2>Datos introducidos</h2>
          <p>
            AE Producciones registra nombre, teléfono, correo y los datos
            necesarios de la solicitud en un sistema interno de seguimiento.
            La información se utiliza únicamente para responder, preparar una
            propuesta y coordinar el evento.
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
