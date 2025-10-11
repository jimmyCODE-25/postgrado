export interface PlanFormacionProps {
  idPf: number;
  nVersion: number;
  nombre: string;
  nivelAcad: number;
  totalCred?: number;
  totalPeriodo?: number;
  tipoCarr: number;
  fechaCreacion?: string;
  nResolAlta?: string;
  fechaBaja?: string | null;
  nResolBaja?: string | null;
  descripcion?: string | null;
  estado: number;
}
