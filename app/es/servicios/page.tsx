import type { Metadata } from "next";
import Image from "next/image";
import {
  FinalCta,
  PageHero,
} from "@/app/components/ui";
import { whatsappMessages } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Producción y audio profesional",
  description:
    "AE Live Sessions, Refuerzo Sonoro y producción técnica de AE Producciones.",
};

const liveSessionIncludes = [
  "Registro en 24-bit / 48 kHz",
  "Captura con microfonía profesional y fuentes directas",
  "Supervisión técnica durante la captura",
  "Control de niveles, estructura de ganancia y estabilidad de señal",
  "Mezcla con ajustes de dinámica, balance y efectos",
  "Ajuste final para nivel y consistencia",
  "Integración con video HD sin edición",
  "Respaldo de seguridad del material capturado",
  "Exportación final en WAV 24-bit, AAC y MP3",
] as const;

const reinforcementIncludes = [
  "Sistema de audio profesional: PA principal y monitores de escenario",
  "Consola digital con control remoto y mezcla en tiempo real",
  "Microfonía profesional y líneas directas",
  "Procesamiento dinámico, ecualización y control de ganancia",
  "Supervisión técnica durante montaje, prueba de sonido y show",
  "Respaldo técnico para contingencias o ajustes de último momento",
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Experiencias & Producción"
        title="Un resultado estable, claro y profesional."
        text="Servicios para complementar los formatos musicales y cubrir las necesidades técnicas del evento."
        breadcrumbs={[{ label: "Producción" }]}
      />

      <section className="technical-section" id="live-sessions">
        <div className="container technical-grid">
          <div className="technical-intro">
            <p className="eyebrow">Registro</p>
            <h2>AE Live Sessions</h2>
            <p className="large-copy">
              Un registro fiel del show en vivo que conserva la interpretación,
              el sonido del ensamble y la atmósfera del momento.
            </p>
          </div>
          <div>
            <p>
              La señal se controla desde su origen para mantener niveles
              estables y una estructura de ganancia correcta. El audio se
              sincroniza con video HD sin edición y se prepara en formatos de
              alta calidad.
            </p>
            <h3>Qué incluye</h3>
            <ul className="spec-list">
              {liveSessionIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="technical-section technical-section-dark" id="refuerzo-sonoro">
        <div className="container technical-grid">
          <div className="technical-intro">
            <p className="eyebrow">Audio profesional</p>
            <h2>Refuerzo Sonoro</h2>
            <p className="large-copy">
              Un sistema de audio estable, equilibrado y adaptado al espacio del
              evento.
            </p>
          </div>
          <div>
            <p>
              Cada montaje prioriza claridad, cobertura y fidelidad de acuerdo
              con el recinto, el aforo y sus características acústicas.
            </p>
            <h3>Qué incluye</h3>
            <ul className="spec-list">
              {reinforcementIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container pending-grid">
          <div>
            <p className="eyebrow">Evidencia técnica</p>
            <h2>Montaje, operación y captura.</h2>
            <p>
              Montaje, prueba de sonido y operación durante el evento.
            </p>
          </div>
          <div className="technical-evidence-grid">
            <figure>
              <Image
                src="/media/selection-web/ae-050-production-setup.webp"
                alt="Montaje de instrumentos, audio e iluminación antes de un evento."
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
                style={{ objectPosition: "center 62%" }}
                unoptimized
              />
              <figcaption>Montaje técnico</figcaption>
            </figure>
            <figure>
              <Image
                src="/media/selection-web/ae-029-audio-stage.webp"
                alt="Sistema de audio, instrumentos e iluminación preparados para un evento."
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
                style={{ objectPosition: "center 58%" }}
                unoptimized
              />
              <figcaption>Audio y escenario</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <FinalCta
        title="Definir las condiciones técnicas."
        text="El recinto, el aforo y las características acústicas permiten preparar una solución precisa."
        message={whatsappMessages.production}
      />
    </>
  );
}
