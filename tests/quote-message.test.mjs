import assert from "node:assert/strict";
import test from "node:test";
import {
  composeQuoteMessage,
  quoteFieldOrder,
  readQuoteForm,
  validateQuote,
} from "../app/lib/quote-message.ts";

function validDetails(overrides = {}) {
  return {
    name: "María 李",
    contact: "+34 612 345 678",
    eventType: "Boda",
    date: "",
    location: "",
    details: "",
    consent: true,
    ...overrides,
  };
}

test("rejects whitespace-only names without imposing a naming convention", () => {
  assert.ok(validateQuote(validDetails({ name: " \t\n\u00a0 " })).name);
  for (const name of ["李", "María-José O’Neill", "A", "  Adrián  Eugenio  "]) {
    assert.equal(validateQuote(validDetails({ name })).name, undefined);
  }
});

test("accepts local and international phone formatting without requiring Mexico", () => {
  for (const contact of [
    "442 711 1671",
    "+1 (415) 555-0123",
    "+34 612 345 678",
    "0044 20 7946 0958",
    "+81 90 1234 5678",
    "1234567",
    "+123456789012345",
  ]) {
    assert.equal(validateQuote(validDetails({ contact })).contact, undefined, contact);
  }
});

test("rejects empty, implausibly short or long, and non-phone contacts", () => {
  for (const contact of [
    "  ",
    "123456",
    "+1234567890123456",
    "hello@example.com",
    "442 711 test",
    "++34 612345678",
    "34+612345678",
  ]) {
    assert.ok(validateQuote(validDetails({ contact })).contact, contact);
  }
});

test("reports required fields in form order", () => {
  const errors = validateQuote(validDetails({
    name: "",
    contact: "",
    eventType: "",
    consent: false,
  }));
  assert.deepEqual(quoteFieldOrder.filter((field) => errors[field]), [
    "name", "contact", "eventType", "consent",
  ]);
  assert.deepEqual(validateQuote(validDetails()), {});
});

test("normalizes form text and includes the selected event", () => {
  const data = new FormData();
  data.set("name", "  María   李  ");
  data.set("contact", "  +34 612 345 678  ");
  data.set("eventType", "Boda");
  data.set("date", "2026-12-05");
  data.set("location", "  Querétaro  ");
  data.set("details", "  Cena familiar\nCon terraza.  ");
  data.set("consent", "on");

  const details = readQuoteForm(data);
  assert.equal(details.name, "María 李");
  assert.equal(details.contact, "+34 612 345 678");
  assert.deepEqual(validateQuote(details), {});
  assert.equal(composeQuoteMessage(details), [
    "Hola, vi el sitio de AE Producciones y quiero solicitar una propuesta.",
    "",
    "Nombre: María 李",
    "Contacto: +34 612 345 678",
    "Tipo de evento: Boda",
    "Fecha: 2026-12-05",
    "Sede: Querétaro",
    "Detalles: Cena familiar\nCon terraza.",
  ].join("\n"));
});

test("uses honest optional-field defaults and preserves text through URL encoding", () => {
  const message = composeQuoteMessage(validDetails({
    name: "Ana & José",
    date: "  ",
    location: " \t ",
    details: "\n ",
  }));
  assert.match(message, /Fecha: Por definir\nSede: Por definir/);
  assert.match(message, /Detalles: Por conversar$/);
  const url = new URL(`https://wa.me/524427111671?text=${encodeURIComponent(message)}`);
  assert.equal(url.searchParams.get("text"), message);
  assert.equal(url.searchParams.size, 1);
});
