"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { siteConfig } from "@/app/lib/site-config";

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
  const [serviceError, setServiceError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selectedServices = data.getAll("services");

    if (!selectedServices.length) {
      setServiceError("Selecciona al menos una opción para continuar.");
      setStatus("");
      event.currentTarget
        .querySelector<HTMLInputElement>('input[name="services"]')
        ?.focus();
      return;
    }

    setServiceError("");
    const services = selectedServices.join(", ");
    const crmEndpoint =
      process.env.NEXT_PUBLIC_CRM_ENDPOINT ??
      "https://ae-producciones-queretaro.adrian-eugenio.chatgpt.site";
    const crmRequest = fetch(`${crmEndpoint}/api/crm/intake`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        contact: data.get("contact"),
        email: data.get("email"),
        instagram: data.get("instagram"),
        facebook: data.get("facebook"),
        services: selectedServices,
        eventType: data.get("eventType"),
        date: data.get("date"),
        location: data.get("location"),
        details: data.get("details"),
        consent: data.get("consent") === "on",
      }),
    });
    const message = [
      "Hola, vi el sitio de AE Producciones y quiero solicitar una propuesta.",
      "",
      `Nombre: ${data.get("name")}`,
      `Contacto: ${data.get("contact")}`,
      `Tipo de evento: ${data.get("eventType")}`,
      `Fecha: ${data.get("date") || "Por definir"}`,
      `Sede: ${data.get("location") || "Por definir"}`,
      `Necesidad: ${services}`,
      `Detalles: ${data.get("details") || "Por conversar"}`,
    ].join("\n");

    setStatus("La solicitud está registrada. Se abrirá WhatsApp para continuar.");
    window.open(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    crmRequest.then((response) => {
      if (!response.ok) setStatus("WhatsApp está listo. La solicitud requiere revisión técnica.");
    }).catch(() => {
      setStatus("WhatsApp está listo. La solicitud requiere revisión técnica.");
    });
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Nombre completo</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>WhatsApp</span>
          <input
            name="contact"
            autoComplete="tel"
            inputMode="tel"
            placeholder="442 000 0000"
            required
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          <span>Correo electrónico (opcional)</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          <span>Instagram (opcional)</span>
          <input name="instagram" autoComplete="off" placeholder="@usuario" />
        </label>
        <label>
          <span>Facebook (opcional)</span>
          <input name="facebook" autoComplete="off" />
        </label>
      </div>

      <fieldset
        aria-describedby={`service-help${serviceError ? " service-error" : ""}`}
      >
        <legend>¿Qué necesitas?</legend>
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
                    <input name="services" type="checkbox" value={service} />
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
            />
            <span>Aún no estoy seguro (ayúdenme a elegir)</span>
          </label>
        </div>
        {serviceError ? (
          <p className="form-error" id="service-error" role="alert">
            {serviceError}
          </p>
        ) : null}
      </fieldset>

      <div className="form-grid form-event-grid">
        <label>
          <span>¿Qué tipo de evento estás organizando?</span>
          <select name="eventType" defaultValue="" required>
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
        </label>
        <label>
          <span>Fecha</span>
          <input name="date" type="date" />
        </label>
        <label className="form-wide">
          <span>Sede o ciudad</span>
          <input name="location" placeholder="Puede quedar por definir" />
        </label>
      </div>

      <label>
        <span>Detalles o requerimientos adicionales</span>
        <textarea
          name="details"
          rows={5}
          placeholder="Comparte únicamente lo que ya tengas definido"
        />
      </label>

      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>
          He leído la{" "}
          <Link href="/es/aviso-de-privacidad">información de privacidad</Link>.
        </span>
      </label>

      <p className="privacy-note">
      La solicitud se registra de forma segura para dar seguimiento. WhatsApp
      se abrirá para continuar la conversación.
      </p>
      <button className="button button-dark form-submit" type="submit">
        Continuar por WhatsApp
      </button>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
