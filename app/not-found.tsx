import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="contenido">
      <Image
        src="/brand/ae-logo-light.png"
        width={1472}
        height={636}
        alt="AE Producciones"
        unoptimized
      />
      <p className="eyebrow">404</p>
      <h1>Página no disponible.</h1>
      <Link className="button button-light" href="/es">
        Volver al inicio
      </Link>
    </main>
  );
}
