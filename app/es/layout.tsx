import {
  MobileDock,
  SiteFooter,
  SiteHeader,
} from "@/app/components/site-chrome";

export default function SpanishSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="contenido">{children}</main>
      <SiteFooter />
      <MobileDock />
    </>
  );
}
