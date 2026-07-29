import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  if (process.env.GITHUB_PAGES !== "true") {
    redirect("/es");
  }

  return (
    <main className="not-found" id="contenido">
      <meta httpEquiv="refresh" content="0;url=/es/" />
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.location.replace("/es/");',
        }}
      />
      <Image
        src="/brand/ae-logo-light.png"
        width={1472}
        height={636}
        alt="AE Producciones"
        unoptimized
      />
      <Link className="button button-light" href="/es/">
        Continuar al sitio
      </Link>
    </main>
  );
}
