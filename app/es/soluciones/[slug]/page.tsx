import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FinalCta,
  FormatBridge,
  PageHero,
  ReservationProcess,
  SectionHeading,
  SourceNote,
} from "@/app/components/ui";
import { solutionPages } from "@/app/content/es";
import { whatsappUrl } from "@/app/lib/site-config";

type SolutionSlug = keyof typeof solutionPages;

export function generateStaticParams() {
  return Object.keys(solutionPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = solutionPages[slug as SolutionSlug];
  if (!page) return {};
  return { title: page.label, description: page.intro };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = solutionPages[slug as SolutionSlug];
  if (!page) notFound();

  const message = `Hola, vi la sección ${page.label} de AE Producciones y me gustaría conocer disponibilidad.`;

  return (
    <>
      <PageHero
        label={page.label}
        title={page.title}
        text={page.intro}
        image={page.image}
        imageAlt={page.imageAlt}
        imagePosition={page.imagePosition}
        imageFit={page.imageFit}
        breadcrumbs={[
          { label: "Soluciones", href: "/es/soluciones" },
          { label: page.label },
        ]}
        actions={[
          {
            label: "Consultar disponibilidad",
            href: whatsappUrl(message),
            external: true,
            style: "light",
          },
        ]}
      />

      <section className="section">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">Posibilidades</p>
            <h2>Calidad técnica, precisión sonora y carácter artístico.</h2>
          </div>
          <div>
            <ul className="lined-list">
              {page.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <SourceNote>{page.source}</SourceNote>
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <SectionHeading
            label="Proceso"
            title="Orden desde la primera conversación."
          />
          <ReservationProcess />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FormatBridge />
        </div>
      </section>

      <FinalCta message={message} />
    </>
  );
}
