import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ActionLink,
  FinalCta,
  ReservationProcess,
  SectionHeading,
  SourceNote,
} from "@/app/components/ui";
import {
  homeEvidenceItems,
  markets,
  royalFormats,
  values,
} from "@/app/content/es";
import {
  siteConfig,
  whatsappMessages,
  whatsappUrl,
} from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Música en vivo, producción y audio profesional",
  description:
    "AE Producciones integra música en vivo, producción técnica, servicios de grabación profesional y audio para eventos.",
};

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <Image
              className="home-hero-mark"
              src="/brand/ae-producciones-lockup-light.png"
              alt="AE Producciones"
              width={904}
              height={444}
              priority
              unoptimized
            />
            <p className="eyebrow">Querétaro · México</p>
            <h1>Música en vivo. Producción. Audio profesional.</h1>
            <p className="lede">
              Experiencias diseñadas para cada evento con calidad,
              profesionalismo y carácter.
            </p>
            <div className="action-row">
              <ActionLink
                action={{
                  label: "Consultar disponibilidad",
                  href: whatsappUrl(whatsappMessages.general),
                  external: true,
                  style: "light",
                }}
                location="home_hero"
              />
              <ActionLink
                action={{
                  label: "Ver posibilidades",
                  href: "/es/soluciones",
                  style: "outline-light",
                }}
                location="home_hero"
              />
            </div>
          </div>
          <figure className="home-hero-image">
            <Image
              src="/media/royal-music-logo.jpg"
              alt="Royal Music"
              fill
              sizes="(max-width: 800px) 100vw, 46vw"
              priority
              style={{ objectFit: "contain", objectPosition: "center" }}
              unoptimized
            />
          </figure>
        </div>
      </section>

      <section className="statement section">
        <div className="container statement-grid">
          <p className="eyebrow">AE Producciones</p>
          <div>
            <h2>La excelencia es el eje de todos nuestros proyectos.</h2>
            <p className="large-copy">
              Cada presentación se diseña como una experiencia inmersiva e
              inolvidable, donde el escenario, la interpretación y la
              musicalidad se integran con rigor técnico y solidez artística.
            </p>
            <SourceNote>Dossier, p. 2</SourceNote>
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <SectionHeading
            label="Tipos de evento"
            title="Cada presentación se adapta al entorno."
            text="Soluciones musicales y de producción que se integran armónicamente con la ambientación, el público y la visión del cliente."
          />
          <div className="market-gallery">
            {markets.map((market) => (
              <Link
                className="market-tile"
                href={`/es/soluciones/${market.slug}`}
                key={market.slug}
              >
                <figure>
                  <Image
                    src={market.image}
                    alt={market.imageAlt}
                    fill
                    sizes="(max-width: 520px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    style={{ objectPosition: market.imagePosition }}
                    unoptimized
                  />
                </figure>
                <div>
                  <h3>{market.title}</h3>
                  <p>{market.short}</p>
                  <span>Explorar</span>
                </div>
              </Link>
            ))}
          </div>
          <SourceNote>Dossier, p. 19</SourceNote>
        </div>
      </section>

      <section className="royal-section">
        <div className="container royal-intro">
          <Image
            src="/brand/royal-music-light.png"
            alt="Royal Music"
            width={3309}
            height={2250}
            unoptimized
          />
          <div>
            <h2>La división musical de AE Producciones.</h2>
            <p>
              Música en vivo con sonido profesional, presencia escénica y una
              ejecución cuidada en cada detalle.
            </p>
            <SourceNote>Dossier, p. 6</SourceNote>
          </div>
        </div>
        <div className="container format-grid">
          {royalFormats.map((format) => (
            <Link
              className="format-card"
              href={`/es/royal-music/${format.slug}`}
              key={format.slug}
            >
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
                  src={format.logoLight}
                  alt={format.title}
                  width={1300}
                  height={720}
                  unoptimized
                />
                <p>{format.descriptor}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section production-home">
        <div className="container">
          <SectionHeading
            label="Experiencias & Producción"
            title="Un resultado estable, claro y profesional."
            text="Servicios para complementar los formatos musicales y cubrir las necesidades técnicas del evento."
          />
          <div className="service-pair">
            <article>
              <p className="eyebrow">Registro</p>
              <h3>AE Live Sessions</h3>
              <p>
                Un registro fiel del show en vivo, la interpretación musical y
                el ambiente que la rodea.
              </p>
              <Link href="/es/servicios#live-sessions">Ver especificaciones</Link>
            </article>
            <article className="service-pair-dark">
              <p className="eyebrow">Audio profesional</p>
              <h3>Refuerzo Sonoro</h3>
              <p>
                Un sistema de audio estable, equilibrado y adaptado al espacio
                del evento.
              </p>
              <Link href="/es/servicios#refuerzo-sonoro">Ver especificaciones</Link>
            </article>
          </div>
          <figure className="production-preview">
            <Image
              src="/media/selection-web/ae-029-audio-stage.webp"
              alt="Sistema de audio, instrumentos e iluminación preparados para un evento."
              fill
              sizes="(max-width: 800px) 100vw, 88vw"
              style={{ objectPosition: "center 54%" }}
              unoptimized
            />
          </figure>
          <SourceNote>Dossier, pp. 13-15</SourceNote>
        </div>
      </section>

      <section className="evidence-band">
        <div className="container evidence-heading">
          <SectionHeading
            label="Experiencia"
            title="Una visión completa del escenario."
            text="Trabajo artístico y técnico en presentaciones reales."
          />
          <ActionLink
            action={{
              label: "Ver evidencia",
              href: "/es/portafolio",
              style: "outline-light",
            }}
          />
        </div>
        <div className="evidence-strip">
          {homeEvidenceItems.map((item) => (
            <figure key={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 800px) 72vw, 25vw"
                style={{ objectPosition: item.objectPosition }}
                unoptimized
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <SectionHeading
            label="Proceso de reserva"
            title="Transparencia, seguridad y certeza operativa."
          />
          <ReservationProcess />
          <SourceNote>Dossier, pp. 2 y 21</SourceNote>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container values-layout">
          <div>
            <p className="eyebrow">Valores</p>
            <h2>Calidad & Profesionalismo.</h2>
          </div>
          <ul className="value-list">
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
        <div className="container coverage-line">
          <p className="eyebrow">Cobertura</p>
          <p>{siteConfig.coverage}</p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
