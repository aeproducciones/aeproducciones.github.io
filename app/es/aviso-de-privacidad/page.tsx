import Link from "next/link";
import { pageMetadata } from "@/app/lib/metadata";
import { PageHero } from "@/app/components/ui";
import { siteConfig } from "@/app/lib/site-config";

export const metadata = pageMetadata("/es/aviso-de-privacidad", {
  title: "Información de privacidad",
  description:
    "Cómo se prepara tu mensaje y cuándo se comparte con AE Producciones por WhatsApp.",
  robots: { index: false, follow: true },
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Privacidad"
        title="Información sobre el contacto."
        text="Conoce cómo se prepara tu mensaje y cuándo se comparte con AE Producciones."
        breadcrumbs={[{ label: "Privacidad" }]}
        actions={[
          {
            label: "Ir al formulario",
            href: "/es/solicitar-propuesta/#propuesta",
            style: "light",
          },
        ]}
      />

      <section className="section legal-section">
        <article className="container legal-copy">
          <h2>Datos del formulario</h2>
          <p>
            Los datos que escribes se procesan en tu navegador para preparar un
            mensaje. El sitio no guarda una copia de esos campos, no registra la
            solicitud en un sistema interno ni la envía por correo.
          </p>

          <h2>Envío por WhatsApp</h2>
          <p>
            Al pulsar «Continuar por WhatsApp», se abre una conversación con
            AE Producciones y el mensaje preparado. Revisa la información y pulsa
            «Enviar» en WhatsApp para que recibamos tu solicitud. Completar el
            formulario o abrir WhatsApp no envía el mensaje por sí solo.
          </p>
          <p>
            El uso de WhatsApp y la conservación de la conversación en ese
            servicio están sujetos a sus propias condiciones.
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
          <p>
            Si abriste esta información desde el formulario, regresa a la pestaña
            anterior para continuar con tus datos.
          </p>
          <p>
            <Link href="/es/solicitar-propuesta/#propuesta">
              Abrir el formulario
            </Link>
          </p>
        </article>
      </section>
    </>
  );
}
