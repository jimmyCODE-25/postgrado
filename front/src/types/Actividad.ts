export interface Actividad {
  idAct: number;
  idAcp?: number;
  idPr?: number;
  nActividad?: number;
  categProgramatica: string;
  idUe?: number;
  descripcion?: string;
  tipo?: string;
  clase?: string;
  unidadMedida?: string;
  fechaIni?: string;
  fechaFinal?: string;
  docVerif?: string;
  causasDesv?: string;
  estado: number;
}

export interface ActividadInput {
  idAcp?: number;
  idPr?: number;
  nActividad?: number;
  categProgramatica: string;
  idUe?: number;
  descripcion?: string;
  tipo?: string;
  clase?: string;
  unidadMedida?: string;
  fechaIni?: string;
  fechaFinal?: string;
  docVerif?: string;
  causasDesv?: string;
  estado: number;
}