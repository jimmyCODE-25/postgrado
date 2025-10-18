import { gql } from "@apollo/client";

export const CREATE_PERSONA = gql`
  mutation CreatePersona(
    $nombres: String!
    $apellidos: String!
    $email: String!
    $telefono: String
    $direccion: String
    $fechaNacimiento: Date
  ) {
    createPersona(
      nombres: $nombres
      apellidos: $apellidos
      email: $email
      telefono: $telefono
      direccion: $direccion
      fechaNacimiento: $fechaNacimiento
    ) {
      persona {
        idpersona
        nombres
        apellidos
        email
        telefono
        direccion
        fechaNacimiento
      }
    }
  }
`;

export const UPDATE_PERSONA = gql`
  mutation UpdatePersona(
    $idpersona: ID!
    $nombres: String
    $apellidos: String
    $email: String
    $telefono: String
    $direccion: String
    $fechaNacimiento: Date
  ) {
    updatePersona(
      idpersona: $idpersona
      nombres: $nombres
      apellidos: $apellidos
      email: $email
      telefono: $telefono
      direccion: $direccion
      fechaNacimiento: $fechaNacimiento
    ) {
      persona {
        idpersona
        nombres
        apellidos
        email
        telefono
        direccion
        fechaNacimiento
      }
    }
  }
`;

export const DELETE_PERSONA = gql`
  mutation DeletePersona($idpersona: ID!) {
    deletePersona(idpersona: $idpersona) {
      success
    }
  }
`;

// MUTATIONS PARA PLAN FORMACION
export const CREATE_PLAN_FORMACION = gql`
  mutation CreatePlanFormacion(
    $nombre: String!
    $nVersion: Int
    $nivelAcad: Int!
    $totalCred: Int
    $totalPeriodo: Int
    $tipoCarr: Int!
    $fechaCreacion: Date
    $nResolAlta: String
    $fechaBaja: Date
    $nResolBaja: String
    $descripcion: String
    $estado: Int!
  ) {
    createPlanFormacion(
      nombre: $nombre
      nVersion: $nVersion
      nivelAcad: $nivelAcad
      totalCred: $totalCred
      totalPeriodo: $totalPeriodo
      tipoCarr: $tipoCarr
      fechaCreacion: $fechaCreacion
      nResolAlta: $nResolAlta
      fechaBaja: $fechaBaja
      nResolBaja: $nResolBaja
      descripcion: $descripcion
      estado: $estado
    ) {
      planFormacion {
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
  }
`;

export const UPDATE_PLAN_FORMACION = gql`
  mutation UpdatePlanFormacion(
    $idPf: ID!
    $nombre: String
    $nVersion: Int
    $nivelAcad: Int
    $totalCred: Int
    $totalPeriodo: Int
    $tipoCarr: Int
    $fechaCreacion: Date
    $nResolAlta: String
    $fechaBaja: Date
    $nResolBaja: String
    $descripcion: String
    $estado: Int
  ) {
    updatePlanFormacion(
      idPf: $idPf
      nombre: $nombre
      nVersion: $nVersion
      nivelAcad: $nivelAcad
      totalCred: $totalCred
      totalPeriodo: $totalPeriodo
      tipoCarr: $tipoCarr
      fechaCreacion: $fechaCreacion
      nResolAlta: $nResolAlta
      fechaBaja: $fechaBaja
      nResolBaja: $nResolBaja
      descripcion: $descripcion
      estado: $estado
    ) {
      planFormacion {
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
  }
`;

export const DELETE_PLAN_FORMACION = gql`
  mutation DeletePlanFormacion($idPf: ID!) {
    deletePlanFormacion(idPf: $idPf) {
      success
    }
  }
`;

// MUTATIONS PARA ACTIVIDAD
export const CREATE_ACTIVIDAD = gql`
  mutation CreateActividad(
    $idAcp: Int
    $idPr: Int
    $nActividad: Int
    $categProgramatica: String!
    $idUe: Int
    $descripcion: String
    $tipo: String
    $clase: String
    $unidadMedida: String
    $fechaIni: Date
    $fechaFinal: Date
    $docVerif: String
    $causasDesv: String
    $estado: Int!
  ) {
    createActividad(
      idAcp: $idAcp
      idPr: $idPr
      nActividad: $nActividad
      categProgramatica: $categProgramatica
      idUe: $idUe
      descripcion: $descripcion
      tipo: $tipo
      clase: $clase
      unidadMedida: $unidadMedida
      fechaIni: $fechaIni
      fechaFinal: $fechaFinal
      docVerif: $docVerif
      causasDesv: $causasDesv
      estado: $estado
    ) {
      actividad {
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
  }
`;

export const UPDATE_ACTIVIDAD = gql`
  mutation UpdateActividad(
    $idAct: ID!
    $idAcp: Int
    $idPr: Int
    $nActividad: Int
    $categProgramatica: String
    $idUe: Int
    $descripcion: String
    $tipo: String
    $clase: String
    $unidadMedida: String
    $fechaIni: Date
    $fechaFinal: Date
    $docVerif: String
    $causasDesv: String
    $estado: Int
  ) {
    updateActividad(
      idAct: $idAct
      idAcp: $idAcp
      idPr: $idPr
      nActividad: $nActividad
      categProgramatica: $categProgramatica
      idUe: $idUe
      descripcion: $descripcion
      tipo: $tipo
      clase: $clase
      unidadMedida: $unidadMedida
      fechaIni: $fechaIni
      fechaFinal: $fechaFinal
      docVerif: $docVerif
      causasDesv: $causasDesv
      estado: $estado
    ) {
      actividad {
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
  }
`;

export const DELETE_ACTIVIDAD = gql`
  mutation DeleteActividad($idAct: ID!) {
    deleteActividad(idAct: $idAct) {
      success
    }
  }
`;
