export interface PersonaProps {
  idpersona: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string | null;
}
