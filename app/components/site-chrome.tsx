import Image from "next/image";
import Link from "next/link";
import {
  siteConfig,
  whatsappMessages,
  whatsappUrl,
} from "@/app/lib/site-config";

const primaryLinks = [
  { href: "/es/soluciones", label: "Soluciones" },
  { href: "/es/servicios", label: "Producción" },
  { href: "/es/royal-music", label: "Royal Music" },
  { href: "/es/portafolio", label: "Evidencia" },
  { href: "/es/nosotros", label: "Quiénes somos" },
] as const;

export function SiteHeader() {
  const reserveUrl = whatsappUrl(whatsappMessages.general);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-symbol" href="/es" aria-label="AE Producciones, inicio">
          <Image
            src="/brand/ae-producciones-lockup-dark.png"
            alt=""
            width={904}
            height={444}
            priority
            unoptimized
          />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {primaryLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <a
            className="button button-dark button-small"
            href={reserveUrl}
            target="_blank"
            rel="noreferrer"
            data-track="whatsapp_click"
            data-location="header"
          >
            Reserva
          </a>
        </nav>

        <details className="mobile-menu">
          <summary>
            <span>Menú</span>
            <span className="menu-lines" aria-hidden="true" />
          </summary>
          <nav aria-label="Navegación móvil">
            <Link href="/es">Inicio</Link>
            {primaryLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/es/solicitar-propuesta">Solicitar propuesta</Link>
            <a href={reserveUrl} target="_blank" rel="noreferrer">
              Reserva
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const reserveUrl = whatsappUrl(whatsappMessages.general);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image
            src="/brand/ae-producciones-lockup-light.png"
            alt="AE Producciones"
            width={904}
            height={444}
            unoptimized
          />
          <p className="footer-tagline">
            Música en vivo · Producción · Audio profesional
          </p>
          <p className="footer-description">
            AE Producciones representa el compromiso con la excelencia musical
            y técnica, ofreciendo experiencias diseñadas para cada evento con
            calidad y profesionalismo.
          </p>
        </div>

        <div className="footer-contact">
          <p className="footer-label">Contacto directo</p>
          <a href={reserveUrl} target="_blank" rel="noreferrer">
            {siteConfig.whatsappDisplay}
          </a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a
            href="https://www.instagram.com/adrian.eugenio33/"
            target="_blank"
            rel="noreferrer"
          >
            {siteConfig.instagram}
          </a>
        </div>

        <div className="footer-trust">
          <p className="footer-label">Contratación</p>
          <p>
            Todos los servicios se formalizan mediante contrato y anticipo del
            30%.
          </p>
          <p className="footer-label footer-label-spaced">Cobertura</p>
          <p>{siteConfig.coverage}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AE Producciones</span>
        <nav aria-label="Información legal">
          <Link href="/es/solicitar-propuesta">Solicitar propuesta</Link>
          <Link href="/es/aviso-de-privacidad">Privacidad</Link>
          <Link href="/conecta">Conecta</Link>
        </nav>
      </div>
    </footer>
  );
}

export function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="Acciones de contacto">
      <Link href="/es/solicitar-propuesta">Propuesta</Link>
      <a
        href={whatsappUrl(whatsappMessages.general)}
        target="_blank"
        rel="noreferrer"
        data-track="whatsapp_click"
        data-location="sticky_mobile"
      >
        Reserva
      </a>
    </nav>
  );
}
