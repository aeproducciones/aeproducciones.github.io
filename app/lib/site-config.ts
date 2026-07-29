export const siteConfig = {
  name: "AE Producciones",
  founder: "Adrián Eugenio",
  whatsappNumber: "524427111671",
  whatsappDisplay: "442 711 1671",
  email: "aeproduccionesoficial@gmail.com",
  instagram: "@adrian.eugenio33",
  coverage:
    "Querétaro, San Miguel de Allende, Celaya, Guanajuato, León, San Luis Potosí y Ciudad de México.",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general:
    "Hola, vi el sitio de AE Producciones y me gustaría conocer disponibilidad para mi evento.",
  royal:
    "Hola, vi los formatos de Royal Music y me gustaría conocer disponibilidad.",
  production:
    "Hola, me gustaría conocer los servicios de producción y audio profesional de AE Producciones.",
} as const;
