import type { Metadata, Viewport } from "next";
import { pageMetadata, siteUrl } from "@/app/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata("/es", {
    title: "AE Producciones",
    description:
      "Música en vivo, producción técnica, servicios de grabación profesional y audio para eventos.",
  }),
  metadataBase: new URL(siteUrl),
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
