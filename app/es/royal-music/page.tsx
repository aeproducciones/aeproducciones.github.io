import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FinalCta,
  PageHero,
  SectionHeading,
} from "@/app/components/ui";
import { royalFormats } from "@/app/content/es";
import { whatsappMessages } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Royal Music",
  description:
    "La división musical de AE Producciones: formatos acústicos, presentaciones para petit comité y ensambles selectos.",
};

export default function RoyalMusicPage() {
  return (
    <>
      <PageHero
        label="Royal Music"
        logo="/brand/royal-music-light.png"
        title="Atmósferas musicales reales."
        text="Sonido definido, interpretación cuidada y una experiencia cercana que conecta con cada momento del evento."
        breadcrumbs={[{ label: "Royal Music" }]}
        image="/media/ae-live-event.jpg"
        imageAlt="Adrián Eugenio durante una presentación con el logotipo Royal Music en pantalla."
        imagePosition="center"
        imageFit="contain"
      />

      <section className="section">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">Definición</p>
            <h2>La división musical de AE Producciones.</h2>
          </div>
          <div>
            <p className="large-copy">
              Música en vivo con sonido profesional, presencia escénica y una
              ejecución cuidada en cada detalle.
            </p>
            <p>
              Propuestas para bodas, cócteles, cenas privadas y eventos
              especiales con un estilo limpio, moderno y con carácter.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <SectionHeading
            label="Formatos"
            title="Formatos acústicos y ensambles selectos."
          />
          <div className="royal-index">
            {royalFormats.map((format) => (
              <Link href={`/es/royal-music/${format.slug}`} key={format.slug}>
                <figure>
                  <Image
                    src={format.image}
                    alt={format.imageAlt}
                    fill
                    sizes="(max-width: 800px) 100vw, 33vw"
                    style={{ objectPosition: format.imagePosition }}
                    unoptimized
                  />
                </figure>
                <div>
                  <Image
                    src={format.logo}
                    alt={format.title}
                    width={1300}
                    height={720}
                    unoptimized
                  />
                  <p>{format.descriptor}</p>
                  <span>Conocer formato</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="royal-closing">
        <div className="container">
          <p>
            El objetivo es crear atmósferas musicales reales, con un sonido
            definido y una experiencia cercana que conecte con cada momento del
            evento.
          </p>
        </div>
      </section>

      <FinalCta
        title="Elegir el formato adecuado."
        text="El ambiente, el espacio y el momento del evento orientan la integración musical."
        message={whatsappMessages.royal}
      />
    </>
  );
}
