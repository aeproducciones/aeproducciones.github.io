export const PROSPECT_HEADERS = [
  "ID",
  "Nombre",
  "Instagram",
  "Facebook",
  "Correo",
  "Teléfono",
  "Estado",
  "Seguimiento",
] as const;

export type Prospect = {
  id: string;
  name: string;
  instagram: string;
  facebook: string;
  email: string;
  phone: string;
  status: string;
  followUp: string;
};

export type ProspectDossier = {
  prospect: Prospect;
  expediente: Record<string, string> | null;
  interactions: Array<Record<string, string>>;
  requests: Array<Record<string, string>>;
};

export type IntakePayload = {
  name: string;
  contact: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  services: string[];
  eventType: string;
  date?: string;
  location?: string;
  details?: string;
  consent: boolean;
};

export function prospectFromRow(row: string[]): Prospect {
  return {
    id: row[0] ?? "",
    name: row[1] ?? "",
    instagram: row[2] ?? "",
    facebook: row[3] ?? "",
    email: row[4] ?? "",
    phone: row[5] ?? "",
    status: row[6] ?? "",
    followUp: row[7] ?? "",
  };
}

export function prospectToRow(prospect: Prospect): string[] {
  return [
    prospect.id,
    prospect.name,
    prospect.instagram,
    prospect.facebook,
    prospect.email,
    prospect.phone,
    prospect.status,
    prospect.followUp,
  ];
}

export function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function createProspectId(): string {
  return `AE-${crypto.randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
}
