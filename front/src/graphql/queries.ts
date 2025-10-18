import { gql } from "@apollo/client";

export const GET_ALL_PERSONAS = gql`
  query GetAllPersonas {
    allPersonas {
      idpersona
      nombres
      apellidos
      email
      telefono
      direccion
      fechaNacimiento
    }
  }
`;

// QUERIES PARA PLAN FORMACION
export const GET_ALL_PLANES_FORMACION = gql`
  query GetAllPlanesFormacion {
    allPlanesFormacion {
      idPf
      nombre
      nVersion
      nivelAcad
      totalCred
      totalPeriodo
      tipoCarr
      fechaCreacion
      nResolAlta
      fechaBaja
      nResolBaja
      descripcion
      estado
    }
  }
`;

export const GET_ALL_ACTIVIDADES = gql`
  query GetAllActividades {
    allActividades {
      idAct
      idAcp
      idPr
      nActividad
      categProgramatica
      idUe
      descripcion
      tipo
      clase
      unidadMedida
      fechaIni
      fechaFinal
      docVerif
      causasDesv
      estado
    }
  }
`;
