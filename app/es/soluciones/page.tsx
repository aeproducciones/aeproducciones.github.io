import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FinalCta,
  PageHero,
  SectionHeading,
} from "@/app/components/ui";
import { markets } from "@/app/content/es";

export const metadata: Metadata = {
  title: "Soluciones",
  description:
    "Bodas, hoteles, cócteles, cenas privadas y eventos corporativos atendidos con música en vivo, producción y audio profesional.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Soluciones"
        title="Cada presentación se adapta al entorno."
        text="Soluciones musicales y de producción que se integran con la ambientación, el público y la visión del cliente."
        breadcrumbs={[{ label: "Soluciones" }]}
      />

      <section className="section section-mist">
        <div className="container">
          <SectionHeading
            label="Tipos de evento"
            title="Precisión, sensibilidad artística y ejecución."
          />
          <div className="solution-index">
            {markets.map((market) => (
              <Link href={`/es/soluciones/${market.slug}`} key={market.slug}>
                <figure>
                  <Image
                    src={market.image}
                    alt={market.imageAlt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    style={{ objectPosition: market.imagePosition }}
                    unoptimized
                  />
                </figure>
                <div>
                  <h2>{market.title}</h2>
                  <p>{market.short}</p>
                  <span>Ver posibilidades</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
