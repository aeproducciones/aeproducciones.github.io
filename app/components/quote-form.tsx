"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { whatsappUrl } from "@/app/lib/site-config";
import {
  composeQuoteMessage,
  quoteFieldOrder,
  readQuoteForm,
  validateQuote,
  type QuoteErrors,
  type RequiredQuoteField,
} from "@/app/lib/quote-message";

const serviceGroups = [
  {
    label: "Música en vivo",
    options: [
      "Solista",
      "Dúo",
      "Trío",
      "Banda completa",
      "Música para ceremonia",
    ],
  },
  {
    label: "Audio y producción",
    options: [
      "Producción técnica",
      "Refuerzo sonoro",
      "Renta de audio",
    ],
  },
] as const;

export function QuoteForm() {
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [preparedUrl, setPreparedUrl] = useState("");

  function handleChange(event: FormEvent<HTMLFormElement>) {
    setStatus("");
    setPreparedUrl("");

    const field = (event.target as HTMLInputElement).name as RequiredQuoteField;
    if (!quoteFieldOrder.includes(field) || !errors[field]) return;

    const nextError = validateQuote(
      readQuoteForm(new FormData(event.currentTarget)),
    )[field];
    setErrors((current) => {
      const next = { ...current };
      if (nextError) next[field] = nextError;
      else delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const details = readQuoteForm(new FormData(form));
    const nextErrors = validateQuote(details);
    const firstInvalid = quoteFieldOrder.find((field) => nextErrors[field]);
    setErrors(nextErrors);
    setPreparedUrl("");

    if (firstInvalid) {
      setStatus("Revisa los campos indicados antes de continuar.");
      requestAnimationFrame(() => {
        form
          .querySelector<HTMLInputElement | HTMLSelectElement>(
            `[name="${firstInvalid}"]`,
          )
          ?.focus();
      });
      return;
    }

    const url = whatsappUrl(composeQuoteMessage(details));
    setPreparedUrl(url);
    setStatus(
      "El mensaje está preparado; aún no se ha enviado. Revísalo y confirma el envío en WhatsApp.",
    );
    try {
      // With noopener, a null return value does not reliably mean a blocked tab.
      // Keep the manual link available regardless of the browser's result.
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setStatus(
        "El mensaje está preparado, pero no se pudo abrir WhatsApp. Usa el enlace de abajo para revisarlo y enviarlo.",
      );
    }
  }

  return (
    <form
      className="quote-form"
      id="propuesta"
      tabIndex={-1}
      onSubmit={handleSubmit}
      onChange={handleChange}
      noValidate
      aria-describedby="quote-form-intro"
    >
      <p className="form-intro" id="quote-form-intro">
        Los campos marcados como obligatorios permiten preparar tu mensaje.
        Podrás revisarlo antes de enviarlo en WhatsApp.
      </p>
      <div className="form-grid">
        <div>
          <label htmlFor="quote-name">
            <span>Nombre completo · obligatorio</span>
          </label>
          <input
            id="quote-name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p className="form-error" id="name-error">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="quote-contact">
            <span>WhatsApp · obligatorio</span>
          </label>
          <input
            id="quote-contact"
            name="contact"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Tu número de WhatsApp"
            required
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={`contact-help${errors.contact ? " contact-error" : ""}`}
          />
          <p className="form-help" id="contact-help">
            Incluye el código de país si corresponde. Puedes usar espacios o guiones.
          </p>
          {errors.contact ? (
            <p className="form-error" id="contact-error">
              {errors.contact}
            </p>
          ) : null}
        </div>
      </div>

      <fieldset
        aria-invalid={Boolean(errors.services)}
        aria-describedby={`service-help${errors.services ? " service-error" : ""}`}
      >
        <legend>¿Qué necesitas? · obligatorio</legend>
        <p className="form-help" id="service-help">
          Puedes seleccionar más de una opción.
        </p>
        <div className="service-groups">
          {serviceGroups.map((group) => (
            <div className="service-group" key={group.label}>
              <p>{group.label}</p>
              <div className="choice-grid">
                {group.options.map((service) => (
                  <label className="choice" key={service}>
                    <input
                      name="services"
                      type="checkbox"
                      value={service}
                      aria-invalid={Boolean(errors.services)}
                      aria-describedby={errors.services ? "service-error" : undefined}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <label className="choice choice-assistance">
            <input
              name="services"
              type="checkbox"
              value="Aún no estoy seguro (ayúdenme a elegir)"
              aria-invalid={Boolean(errors.services)}
              aria-describedby={errors.services ? "service-error" : undefined}
            />
            <span>Aún no estoy seguro (ayúdenme a elegir)</span>
          </label>
        </div>
        {errors.services ? (
          <p className="form-error" id="service-error">
            {errors.services}
          </p>
        ) : null}
      </fieldset>

      <div className="form-grid form-event-grid">
        <div>
          <label htmlFor="quote-event-type">
            <span>¿Qué tipo de evento estás organizando? · obligatorio</span>
          </label>
          <select
            id="quote-event-type"
            name="eventType"
            defaultValue=""
            required
            aria-invalid={Boolean(errors.eventType)}
            aria-describedby={errors.eventType ? "event-type-error" : undefined}
          >
            <option value="" disabled>
              Seleccionar
            </option>
            <option>Boda o celebración privada</option>
            <option>Hotel o espacio para eventos</option>
            <option>Cóctel, cena privada o evento especial</option>
            <option>Evento empresarial o corporativo</option>
            <option>Producción audiovisual o grabación</option>
            <option>Otro</option>
          </select>
          {errors.eventType ? (
            <p className="form-error" id="event-type-error">
              {errors.eventType}
            </p>
          ) : null}
        </div>
        <label>
          <span>Fecha · opcional</span>
          <input name="date" type="date" />
        </label>
        <label className="form-wide">
          <span>Sede o ciudad · opcional</span>
          <input name="location" placeholder="Puede quedar por definir" />
        </label>
      </div>

      <label>
        <span>Detalles o requerimientos adicionales · opcional</span>
        <textarea
          name="details"
          rows={5}
          placeholder="Comparte únicamente lo que ya tengas definido"
        />
      </label>

      <label className="consent">
        <input
          name="consent"
          type="checkbox"
          required
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          He leído la{" "}
          <Link href="/es/aviso-de-privacidad">información de privacidad</Link>.
          {" "}(Obligatorio)
        </span>
      </label>
      {errors.consent ? (
        <p className="form-error" id="consent-error">
          {errors.consent}
        </p>
      ) : null}

      <p className="privacy-note">
        El sitio no almacena estos campos. Al continuar, se abrirá WhatsApp
        con el mensaje preparado para que lo revises y confirmes su envío.
      </p>
      <button className="button button-dark form-submit" type="submit">
        Continuar por WhatsApp
      </button>
      <p className="form-status" role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
      {preparedUrl ? (
        <p className="form-fallback">
          Si WhatsApp no se abrió,{" "}
          <a href={preparedUrl} target="_blank" rel="noopener noreferrer">
            abre el mensaje preparado
          </a>{" "}
          para revisarlo y enviarlo.
        </p>
      ) : null}
    </form>
  );
}
