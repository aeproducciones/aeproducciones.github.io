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
        Al continuar, se abrirá una conversación con AE Producciones en WhatsApp.
      </p>
      <div className="form-grid">
        <div className="quote-field">
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
        <div className="quote-field">
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
        <div className="quote-field form-wide">
          <label htmlFor="quote-event-type">
            <span>¿Para qué evento necesitas música? · obligatorio</span>
          </label>
          <select
            id="quote-event-type"
            name="eventType"
            defaultValue=""
            required
            aria-invalid={Boolean(errors.eventType)}
            aria-describedby={`event-type-help${errors.eventType ? " event-type-error" : ""}`}
          >
            <option value="" disabled>
              Seleccionar
            </option>
            <option>Ceremonia</option>
            <option>Boda</option>
            <option>Cumpleaños</option>
            <option>Aniversario</option>
            <option>Evento corporativo</option>
            <option>Fiesta o reunión privada</option>
            <option>Otro evento</option>
          </select>
          <p className="form-help" id="event-type-help">
            Selecciona el tipo de evento y cuéntanos qué tienes en mente.
          </p>
          {errors.eventType ? (
            <p className="form-error" id="event-type-error">
              {errors.eventType}
            </p>
          ) : null}
        </div>
        <label className="quote-field">
          <span>Fecha · opcional</span>
          <input name="date" type="date" />
        </label>
        <label className="quote-field">
          <span>Sede o ciudad · opcional</span>
          <input name="location" placeholder="Puede quedar por definir" />
        </label>
        <label className="quote-field form-wide">
          <span>Detalles o requerimientos adicionales · opcional</span>
          <textarea
            name="details"
            rows={5}
            placeholder="Comparte únicamente lo que ya tengas definido"
          />
        </label>
      </div>

      <label className="consent">
        <input
          name="consent"
          type="checkbox"
          required
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={`privacy-link-help${errors.consent ? " consent-error" : ""}`}
        />
        <span>
          He leído la{" "}
          <Link
            href="/es/aviso-de-privacidad/"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="privacy-link-help"
          >
            información de privacidad
          </Link>.
          {" "}(Obligatorio)
        </span>
      </label>
      <p className="form-help privacy-link-help" id="privacy-link-help">
        La información de privacidad se abre en otra pestaña para que conserves
        lo que estás llenando.
      </p>
      {errors.consent ? (
        <p className="form-error" id="consent-error">
          {errors.consent}
        </p>
      ) : null}

      <p className="privacy-note">
        El sitio no almacena estos campos. Revisa el mensaje y pulsa Enviar en
        WhatsApp para que AE Producciones reciba tu solicitud.
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
