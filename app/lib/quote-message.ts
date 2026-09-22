export const quoteFieldOrder = [
  "name",
  "contact",
  "eventType",
  "consent",
] as const;

export type RequiredQuoteField = (typeof quoteFieldOrder)[number];
export type QuoteErrors = Partial<Record<RequiredQuoteField, string>>;

export type QuoteDetails = {
  name: string;
  contact: string;
  eventType: string;
  date: string;
  location: string;
  details: string;
  consent: boolean;
};

function singleLine(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function readQuoteForm(data: FormData): QuoteDetails {
  const text = (field: string) => {
    const value = data.get(field);
    return typeof value === "string" ? value.trim() : "";
  };

  return {
    name: singleLine(text("name")),
    contact: singleLine(text("contact")),
    eventType: singleLine(text("eventType")),
    date: text("date"),
    location: singleLine(text("location")),
    details: text("details"),
    consent: data.has("consent"),
  };
}

export function validateQuote(details: QuoteDetails): QuoteErrors {
  const errors: QuoteErrors = {};

  if (!details.name.trim()) {
    errors.name = "Escribe tu nombre para continuar.";
  }

  const contact = details.contact.trim();
  const digits = contact.replace(/\D/g, "");
  const phoneDigits = contact.startsWith("00") ? digits.slice(2) : digits;
  if (!contact) {
    errors.contact = "Escribe un número de WhatsApp para continuar.";
  } else if (
    !/^\+?[\d\s().-]+$/.test(contact) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  ) {
    errors.contact =
      "Revisa el número: usa de 7 a 15 dígitos. Puedes incluir +, espacios, paréntesis o guiones.";
  }

  if (!details.eventType.trim()) {
    errors.eventType = "Selecciona el tipo de evento para continuar.";
  }
  if (!details.consent) {
    errors.consent = "Confirma que leíste la información de privacidad.";
  }

  return errors;
}

export function composeQuoteMessage(details: QuoteDetails) {
  return [
    "Hola, vi el sitio de AE Producciones y quiero solicitar una propuesta.",
    "",
    `Nombre: ${singleLine(details.name)}`,
    `Contacto: ${singleLine(details.contact)}`,
    `Tipo de evento: ${singleLine(details.eventType)}`,
    `Fecha: ${details.date.trim() || "Por definir"}`,
    `Sede: ${singleLine(details.location) || "Por definir"}`,
    `Detalles: ${details.details.trim() || "Por conversar"}`,
  ].join("\n");
}
