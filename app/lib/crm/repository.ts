import type { IntakePayload, Prospect, ProspectDossier } from "./domain";

export interface ProspectRepository {
  listProspects(): Promise<Prospect[]>;
  getProspect(id: string): Promise<ProspectDossier | null>;
  createFromIntake(payload: IntakePayload): Promise<ProspectDossier>;
  updateProspect(id: string, patch: Partial<Prospect>): Promise<Prospect>;
}
