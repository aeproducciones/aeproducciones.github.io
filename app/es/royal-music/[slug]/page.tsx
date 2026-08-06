import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FinalCta,
  PageHero,
} from "@/app/components/ui";
import { formatPages } from "@/app/content/es";

type FormatSlug = keyof typeof formatPages;

export function generateStaticParams() {
  return Object.keys(formatPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const format = formatPages[slug as FormatSlug];
  if (!format) return {};
  return {
    title: `${format.title} | Royal Music`,
    description: format.intro,
  };
}

export default async function FormatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const format = formatPages[slug as FormatSlug];
  if (!format) notFound();

  const message = `Hola, vi el formato ${format.title} de Royal Music y me gustaría conocer disponibilidad.`;

  return (
    <>
      <PageHero
        label={`Royal Music · ${format.title}`}
        logo={format.logo}
        title={format.intro}
        image={format.image ?? undefined}
        imageAlt={format.imageAlt}
        imagePosition={format.imagePosition}
        imageFit={format.imageFit}
        breadcrumbs={[
          { label: "Royal Music", href: "/es/royal-music" },
          { label: format.title },
        ]}
        actions={[
          {
            label: "Consultar disponibilidad",
            href: `https://wa.me/524427111671?text=${encodeURIComponent(message)}`,
            external: true,
            style: "light",
          },
        ]}
      />

      <section className="section">
        <div className="container format-detail">
          <div>
            <p className="eyebrow">Formato</p>
            <h2>{format.title}</h2>
          </div>
          <div className="format-copy">
            <p className="large-copy">{format.description}</p>
            <div className="format-facts">
              <div>
                <h3>Repertorio</h3>
                <p>{format.repertoire}</p>
              </div>
              <div>
                <h3>Contextos</h3>
                <ul className="lined-list">
                  {format.contexts.map((context) => (
                    <li key={context}>{context}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="format-production">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">Producción</p>
            <h2>Sonido profesional y ejecución cuidada.</h2>
          </div>
          <p>
            AE Producciones integra talento, tecnología y una ejecución sonora
            precisa.
          </p>
        </div>
      </section>

      <FinalCta
        title={`Consultar ${format.title}.`}
        text="La fecha, la sede y el ambiente permiten confirmar la integración adecuada."
        message={message}
      />
    </>
  );
}
