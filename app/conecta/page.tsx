import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@/app/components/ui";
import { royalFormats } from "@/app/content/es";
import {
  siteConfig,
  whatsappMessages,
  whatsappUrl,
} from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Conecta con AE Producciones",
  description: "Música en vivo · Producción · Audio profesional",
  robots: { index: false, follow: true },
};

const quickPaths = [
  ["Royal Music", "/es/royal-music"],
  ["Producción", "/es/servicios"],
  ["Evidencia", "/es/portafolio"],
  ["Solicitar propuesta", "/es/solicitar-propuesta"],
] as const;

export default function ConnectPage() {
  return (
    <main id="contenido" className="connect-page">
      <header className="connect-header">
        <Link href="/es" aria-label="AE Producciones, inicio">
          <Image
            src="/brand/ae-producciones-lockup-light.png"
            width={904}
            height={444}
            alt=""
            priority
            unoptimized
          />
        </Link>
        <Link href="/es">Sitio completo</Link>
      </header>

      <section className="connect-hero">
        <div className="connect-copy">
          <p className="eyebrow">AE Producciones</p>
          <h1>Música en vivo. Producción. Audio profesional.</h1>
          <p>
            La excelencia es el eje de todos nuestros proyectos.
          </p>
          <ActionLink
            action={{
              label: "Consultar disponibilidad",
              href: whatsappUrl(whatsappMessages.general),
              external: true,
              style: "light",
            }}
            location="connect"
          />
        </div>
        <figure>
          <Image
            src="/media/adrian-guitar-close.jpg"
            alt="Adrián Eugenio con guitarra."
            fill
            sizes="(max-width: 720px) 100vw, 44vw"
            priority
            unoptimized
          />
        </figure>
      </section>

      <section className="connect-links">
        {quickPaths.map(([label, href]) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </section>

      <section className="connect-royal">
        <Image
          src="/brand/royal-music-dark.png"
          alt="Royal Music"
          width={3309}
          height={2250}
          unoptimized
        />
        <div>
          {royalFormats.map((format) => (
            <Link href={`/es/royal-music/${format.slug}`} key={format.slug}>
              {format.title}
            </Link>
          ))}
        </div>
      </section>

      <footer className="connect-footer">
        <a href={`tel:+52${siteConfig.whatsappNumber.slice(2)}`}>
          {siteConfig.whatsappDisplay}
        </a>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </footer>
    </main>
  );
}
