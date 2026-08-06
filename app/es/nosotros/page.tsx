import type { Metadata } from "next";
import Image from "next/image";
import {
  FinalCta,
  PageHero,
} from "@/app/components/ui";
import { values } from "@/app/content/es";

export const metadata: Metadata = {
  title: "AE Producciones",
  description:
    "Perfil profesional, misión, visión y valores de AE Producciones.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="AE Producciones"
        title="Quiénes somos."
        text="AE Producciones representa el compromiso con la excelencia musical y técnica."
        breadcrumbs={[{ label: "Quiénes somos" }]}
        brandBackdrop
      />

      <section className="section about-definition">
        <div className="container about-definition-intro">
          <div>
            <p className="eyebrow">Quiénes somos</p>
            <h2>Música en vivo y soluciones de audio con un enfoque profesional.</h2>
          </div>
          <p className="large-copy">
            Integramos experiencia directa en escenarios, grabación, mezcla,
            operación técnica y diseño sonoro para distintos eventos y ensambles.
          </p>
        </div>
        <div className="container about-principles">
          <article>
            <p className="eyebrow">Nuestra filosofía</p>
            <p>
              La excelencia es el eje de todos nuestros proyectos y el estándar
              mínimo con el que operamos.
            </p>
          </article>
          <article>
            <p className="eyebrow">Qué nos diferencia</p>
            <p>
              La combinación de trabajo artístico y técnico permite una visión
              completa del escenario, reflejada en la calidad, el equilibrio y
              la atención al detalle.
            </p>
          </article>
          <article>
            <p className="eyebrow">Música y producción</p>
            <p>
              Soluciones que se integran armónicamente con la ambientación, el
              público y la visión del cliente.
            </p>
          </article>
        </div>
      </section>

      <section className="section profile-section">
        <div className="container profile-grid">
          <figure>
            <Image
              src="/media/adrian-studio-portrait.jpg"
              alt="Adrián Eugenio, fundador de AE Producciones."
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
              unoptimized
            />
          </figure>
          <div>
            <p className="eyebrow">Perfil profesional</p>
            <h2>Adrián Eugenio</h2>
            <p className="large-copy">
              Intérprete y productor en desarrollo dentro del ámbito de la
              música en vivo y el audio profesional.
            </p>
            <p>
              Fundador de AE Producciones, ha construido su proyecto a partir de
              la experiencia directa en escenarios, trabajando en
              presentaciones, grabación, mezcla, operación técnica y diseño
              sonoro para distintos eventos y ensambles.
            </p>
            <p>
              Su enfoque integra interpretación vocal, guitarra y un manejo
              cuidadoso del sonido.
            </p>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container mission-grid">
          <article>
            <p className="eyebrow">Misión</p>
            <h2>Crear experiencias escénicas de alto nivel.</h2>
            <p>
              Fusionar música en vivo, producción técnica, servicios de
              grabación profesional y ambientación artística para que cada
              presentación refleje excelencia, emoción y profesionalismo.
            </p>
          </article>
          <article>
            <p className="eyebrow">Visión</p>
            <h2>Calidad, elegancia y proyección.</h2>
            <p>
              Posicionar a AE Producciones como una empresa líder en
              espectáculos, producción musical en vivo y servicios de grabación
              profesional en el Bajío, con proyección nacional e internacional.
            </p>
          </article>
        </div>
        <div className="container">
        </div>
      </section>

      <section className="section values-section">
        <div className="container values-layout">
          <div>
            <p className="eyebrow">Valores</p>
            <h2>El estándar mínimo con el que operamos.</h2>
          </div>
          <ul className="value-list">
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
        <div className="container">
        </div>
      </section>

      <FinalCta />
    </>
  );
}
