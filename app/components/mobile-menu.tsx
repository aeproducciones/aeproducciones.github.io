"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function MobileMenu({
  links,
  reserveUrl,
}: {
  links: ReadonlyArray<{ href: string; label: string }>;
  reserveUrl: string;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const focusContentOnNavigation = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (focusContentOnNavigation.current) {
      document.getElementById("contenido")?.focus({ preventScroll: true });
      focusContentOnNavigation.current = false;
    }
  }, [pathname]);

  useEffect(() => {
    const menu = details.current;
    if (!menu) return;
    const closeOutside = (event: PointerEvent) => {
      if (menu.open && event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false;
      }
    };
    const desktop = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => {
      if (desktop.matches && menu.open) {
        const hadFocus = menu.contains(document.activeElement);
        menu.open = false;
        if (hadFocus) document.querySelector<HTMLElement>(".brand-symbol")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  function closeForLink(href: string) {
    const menu = details.current;
    if (!menu) return;
    menu.open = false;
    menu.querySelector("summary")?.focus();
    if (!href.startsWith("/")) return;
    if (pathname.replace(/\/$/, "") === href.replace(/\/$/, "")) {
      document.getElementById("contenido")?.focus({ preventScroll: true });
    } else {
      focusContentOnNavigation.current = true;
    }
  }

  return (
    <details
      className="mobile-menu"
      ref={details}
      onKeyDown={(event) => {
        if (event.key === "Escape" && details.current?.open) {
          event.preventDefault();
          details.current.open = false;
          details.current.querySelector("summary")?.focus();
        }
      }}
      onBlur={(event) => {
        if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
          event.currentTarget.open = false;
        }
      }}
    >
      <summary aria-controls="mobile-navigation">
        <span>Menú</span>
        <span className="menu-lines" aria-hidden="true" />
      </summary>
      <nav id="mobile-navigation" aria-label="Navegación móvil">
        {[{ href: "/es", label: "Inicio" }, ...links, { href: "/es/solicitar-propuesta", label: "Solicitar propuesta" }].map((link) => (
          <Link
            href={link.href}
            key={link.href}
            aria-current={pathname.replace(/\/$/, "") === link.href ? "page" : undefined}
            onClick={() => closeForLink(link.href)}
          >
            {link.label}
          </Link>
        ))}
        <a href={reserveUrl} target="_blank" rel="noreferrer" onClick={() => closeForLink(reserveUrl)}>
          Reserva
        </a>
      </nav>
    </details>
  );
}
