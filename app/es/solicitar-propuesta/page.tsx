import type { Metadata } from "next";
import { QuoteForm } from "@/app/components/quote-form";
import {
  PageHero,
  ReservationProcess,
} from "@/app/components/ui";
import { siteConfig } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Solicitar propuesta",
  description:
    "Comparte la fecha, sede y formato para preparar una conversación con AE Producciones.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        label="Solicitar propuesta"
        title="Definir los puntos esenciales."
        text="La fecha, la sede, el formato y las condiciones técnicas permiten preparar una cotización precisa."
        breadcrumbs={[{ label: "Solicitar propuesta" }]}
      />

      <section className="section quote-section" id="formulario">
        <div className="container quote-layout">
          <div className="quote-context">
            <p className="eyebrow">Contacto</p>
            <h2>Una atención clara desde el inicio.</h2>
            <a href={`tel:+52${siteConfig.whatsappNumber.slice(2)}`}>
              {siteConfig.whatsappDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <ReservationProcess />
        </div>
      </section>
    </>
  );
}
