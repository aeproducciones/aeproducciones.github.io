import type { Metadata } from "next";
import Image from "next/image";
import {
  FinalCta,
  PageHero,
} from "@/app/components/ui";
import { portfolioItems } from "@/app/content/es";

export const metadata: Metadata = {
  title: "Evidencia",
  description:
    "Selección fotográfica de interpretación, presencia escénica y música en vivo de AE Producciones.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        label="Experiencia"
        title="Una visión completa del escenario."
        text="Trabajo artístico, técnico y operativo en la producción y el desarrollo de presentaciones en vivo."
        breadcrumbs={[{ label: "Evidencia" }]}
      />

      <section className="section portfolio-section">
        <div className="container portfolio-intro">
          <p className="large-copy">
            Cada participación representa una oportunidad para perfeccionar el
            sonido, la presencia y el profesionalismo que distinguen a la marca.
          </p>
        </div>

        <div className="container portfolio-grid">
          {portfolioItems.map((item) => (
            <figure
              className={item.wide ? "portfolio-wide" : ""}
              key={item.src}
            >
              <div>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={
                    item.wide
                      ? "(max-width: 800px) 100vw, 66vw"
                      : "(max-width: 800px) 50vw, 33vw"
                  }
                  style={{ objectPosition: item.objectPosition }}
                  unoptimized
                />
              </div>
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
