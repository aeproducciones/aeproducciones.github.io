import Image from "next/image";
import Link from "next/link";
import { whatsappMessages, whatsappUrl } from "@/app/lib/site-config";

export type Action = {
  label: string;
  href: string;
  external?: boolean;
  style?: "dark" | "light" | "outline" | "outline-light";
};

export function ActionLink({
  action,
  location = "section",
}: {
  action: Action;
  location?: string;
}) {
  const className = `button button-${action.style ?? "dark"}`;

  if (action.external) {
    return (
      <a
        className={className}
        data-track="whatsapp_click"
        data-location={location}
        href={action.href}
        target="_blank"
        rel="noreferrer"
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link className={className} href={action.href}>
      {action.label}
    </Link>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav className="breadcrumbs" aria-label="Migas de pan">
      <Link href="/es">Inicio</Link>
      {items.map((item) => (
        <span key={`${item.label}-${item.href ?? "current"}`}>
          <span aria-hidden="true">/</span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <b>{item.label}</b>}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  label,
  title,
  text,
  actions,
  breadcrumbs,
  image,
  imageAlt = "",
  imagePosition = "center",
  imageFit = "cover",
  logo,
  brandBackdrop = false,
}: {
  label: string;
  title: string;
  text?: string;
  actions?: Action[];
  breadcrumbs?: Array<{ label: string; href?: string }>;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  logo?: string;
  brandBackdrop?: boolean;
}) {
  return (
    <section
      className={`page-hero${image ? " page-hero-media" : " page-hero-text"}${
        brandBackdrop ? " page-hero-brand" : ""
      }`}
    >
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
          {logo ? (
            <Image
              className="page-hero-logo"
              src={logo}
              alt={label}
              width={1300}
              height={720}
              priority
              unoptimized
            />
          ) : (
            <p className="eyebrow">{label}</p>
          )}
          <h1>{title}</h1>
          {text ? <p className="lede">{text}</p> : null}
          {actions?.length ? (
            <div className="action-row">
              {actions.map((action, index) => (
                <ActionLink
                  action={action}
                  key={action.label}
                  location={index === 0 ? "hero" : "hero_secondary"}
                />
              ))}
            </div>
          ) : null}
        </div>
        {image ? (
          <figure className="page-hero-image">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
              priority
              style={{ objectFit: imageFit, objectPosition: imagePosition }}
              unoptimized
            />
          </figure>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  text,
}: {
  label?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      {label ? <p className="eyebrow">{label}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function SourceNote({ children }: { children: React.ReactNode }) {
  void children;
  return null;
}

export function MediaPlaceholder({
  label = "Evidencia pendiente",
}: {
  label?: string;
}) {
  return (
    <div className="media-placeholder" role="note">
      <span>{label}</span>
      <p>Material técnico pendiente de incorporación.</p>
    </div>
  );
}

export function ReservationProcess() {
  const steps = [
    [
      "Confirmación de fecha",
      "La fecha se reserva al recibir el anticipo del 30% junto con los datos generales del cliente.",
    ],
    [
      "Contrato y condiciones",
      "Se envía el contrato con la información del servicio, estructura técnica y condiciones del evento.",
    ],
    [
      "Planeación y coordinación",
      "Se confirman horarios, logística de montaje, ubicación y requerimientos adicionales.",
    ],
  ];

  return (
    <div className="process-list">
      {steps.map(([title, text]) => (
        <article key={title}>
          <span aria-hidden="true" />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

export function FinalCta({
  title = "Conocer los detalles del evento.",
  text = "Una reunión o videollamada permite establecer los puntos esenciales y preparar una cotización precisa.",
  message = whatsappMessages.general,
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <div>
          <p className="eyebrow">Reserva</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="action-row">
          <ActionLink
            action={{
              label: "Consultar disponibilidad",
              href: whatsappUrl(message),
              external: true,
              style: "light",
            }}
            location="final_cta"
          />
          <ActionLink
            action={{
              label: "Solicitar propuesta",
              href: "/es/solicitar-propuesta",
              style: "outline-light",
            }}
            location="final_cta"
          />
        </div>
      </div>
    </section>
  );
}

export function FormatBridge() {
  return (
    <aside className="format-bridge">
      <Image
        src="/brand/royal-music-dark.png"
        alt="Royal Music"
        width={3309}
        height={2250}
        unoptimized
      />
      <div>
        <p>
          Música en vivo con sonido profesional, presencia escénica y una
          ejecución cuidada en cada detalle.
        </p>
        <ActionLink
          action={{
            label: "Conocer Royal Music",
            href: "/es/royal-music",
            style: "outline",
          }}
        />
      </div>
    </aside>
  );
}
