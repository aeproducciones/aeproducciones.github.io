import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://produccionesae.com"),
  title: {
    default: "AE Producciones | Música en vivo, producción y audio profesional",
    template: "%s | AE Producciones",
  },
  description:
    "Música en vivo, producción técnica, servicios de grabación profesional y audio para eventos.",
  icons: {
    icon: "/brand/ae-logo-dark.png",
    shortcut: "/brand/ae-logo-dark.png",
    apple: "/brand/ae-logo-dark.png",
  },
  openGraph: {
    title: "AE Producciones",
    description: "Música en vivo · Producción · Audio profesional",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/media/selection-web/ae-039-royal-trio.webp",
        width: 1290,
        height: 704,
        alt: "Royal Trío durante una presentación en vivo.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AE Producciones",
    description: "Música en vivo · Producción · Audio profesional",
    images: ["/media/selection-web/ae-039-royal-trio.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
