import { Diagnostico } from "./Diagnostico";

export interface Cita {
  id: number;
  fechaHora: Date;
  motivoCita: string;
  attribute11: number;
  diagnostico: Diagnostico;
  medicoNumColegiado: string;
  pacienteNSS: string;
}
