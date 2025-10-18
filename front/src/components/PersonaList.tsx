import type { PersonaProps } from "@/types/Persona";
import { useMutation, useQuery } from "@apollo/client/react";
import { UsersIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { DELETE_PERSONA, UPDATE_PERSONA } from "../graphql/mutations";
import { GET_ALL_PERSONAS } from "../graphql/queries";
import InputField from "./InputField";
import { Boton } from "./ui/Boton";
import { Pildora } from "./ui/Pildora";
import {
  Tabla,
  TablaCelda,
  TablaCeldaEncabezado,
  TablaCuerpo,
  TablaEncabezado,
  TablaFila,
  TablaLeyenda,
} from "./ui/tabla";
import {
  Tarjeta,
  TarjetaContenido,
  TarjetaDescripcion,
  TarjetaEncabezado,
  TarjetaPie,
  TarjetaTitulo,
} from "./ui/tarjeta";
import { Vacio } from "./ui/Vacio";

export default function PersonaList() {
  const { data, loading, error, refetch } = useQuery<{
    allPersonas: PersonaProps[];
  }>(GET_ALL_PERSONAS);
  const [deletePersona] = useMutation(DELETE_PERSONA, {
    refetchQueries: [{ query: GET_ALL_PERSONAS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      refetch();
      alert("Persona eliminada exitosamente");
    },
    onError: (err) => {
      console.error("Error al eliminar persona:", err);
      alert("Error al eliminar persona");
    },
  });

  const [updatePersona, { loading: updateLoading }] = useMutation(
    UPDATE_PERSONA,
    {
      refetchQueries: [{ query: GET_ALL_PERSONAS }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        handleCancelEdit();
        alert("Persona actualizada exitosamente");
      },
      onError: (err) => {
        console.error("Error al actualizar persona:", err);
        alert("Error al actualizar persona");
      },
    }
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<PersonaProps | null>(null);

  const handleDelete = async (id: string | number) => {
    if (window.confirm("¿Estás seguro de eliminar esta persona?")) {
      const variables = { idpersona: Number(id) };
      console.log(
        "DELETE variables:",
        variables,
        "(typeof idpersona=",
        typeof variables.idpersona,
        ")"
      );
      try {
        await deletePersona({ variables });
      } catch (error) {
        console.error("Error al eliminar persona:", error);
      }
    }
  };

  const handleEdit = (persona: PersonaProps) => {
    const formattedDate = persona.fechaNacimiento
      ? new Date(persona.fechaNacimiento).toISOString().split("T")[0]
      : "";
    setEditingId(persona.idpersona);
    setEditForm({
      ...persona,
      fechaNacimiento: formattedDate,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    const { name, value, type } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "date" ? value || "" : value,
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    if (!editForm.nombres || !editForm.apellidos || !editForm.email) {
      alert("Nombres, Apellidos y Email son campos obligatorios.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(editForm.email)) {
      alert("El formato del email es inválido.");
      return;
    }

    const variables = {
      idpersona: editForm.idpersona,
      nombres: editForm.nombres,
      apellidos: editForm.apellidos,
      email: editForm.email,
      telefono: editForm.telefono || null,
      direccion: editForm.direccion || null,
      // send ISO date string (YYYY-MM-DD) or null
      fechaNacimiento: editForm.fechaNacimiento
        ? String(editForm.fechaNacimiento)
        : null,
    };
    await updatePersona({ variables });
  };

  if (loading) {
    return <p>Cargando personas...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">Error al cargar personas: {error.message}</p>
    );
  }

  const personas: PersonaProps[] = data?.allPersonas || [];

  return (
    <Tarjeta className="overflow-x-auto">
      <TarjetaEncabezado>
        <TarjetaTitulo>Lista de Personas</TarjetaTitulo>
        <TarjetaDescripcion>
          Gestión de registros institucionales
        </TarjetaDescripcion>
      </TarjetaEncabezado>
      <TarjetaContenido>
        {personas.length === 0 ? (
          <Vacio
            icono={UsersIcon}
            titulo="No hay personas registradas"
            descripcion="Comienza agregando un nuevo registro al sistema"
          />
        ) : (
          <Tabla>
            <TablaLeyenda>Registros Activos</TablaLeyenda>
            <TablaEncabezado>
              <TablaFila>
                <TablaCeldaEncabezado>ID</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Nombres</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Apellidos</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Email</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Teléfono</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Dirección</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Fecha Nac.</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Acciones</TablaCeldaEncabezado>
              </TablaFila>
            </TablaEncabezado>
            <TablaCuerpo>
              {personas.map((persona) => (
                <Fragment key={persona.idpersona}>
                  {editingId === persona.idpersona ? (
                    <TablaFila>
                      <TablaCelda className="text-primario font-bold">
                        {persona.idpersona}
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="text"
                          name="nombres"
                          value={editForm?.nombres || ""}
                          onChange={handleUpdateChange}
                          required
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="text"
                          name="apellidos"
                          value={editForm?.apellidos || ""}
                          onChange={handleUpdateChange}
                          required
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="email"
                          name="email"
                          value={editForm?.email || ""}
                          onChange={handleUpdateChange}
                          required
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="text"
                          name="telefono"
                          value={editForm?.telefono || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="text"
                          name="direccion"
                          value={editForm?.direccion || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="date"
                          name="fechaNacimiento"
                          value={
                            editForm?.fechaNacimiento
                              ? new Date(editForm.fechaNacimiento)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <form
                          onSubmit={handleUpdateSubmit}
                          className="flex space-x-2"
                        >
                          <Boton type="submit" disabled={updateLoading}>
                            {updateLoading ? "Guardando..." : "Guardar"}
                          </Boton>
                          <Boton
                            onClick={handleCancelEdit}
                            variante="destructivo"
                          >
                            Cancelar
                          </Boton>
                        </form>
                      </TablaCelda>
                    </TablaFila>
                  ) : (
                    <TablaFila>
                      <TablaCelda className="text-primario font-bold">
                        {persona.idpersona}
                      </TablaCelda>
                      <TablaCelda>{persona.nombres}</TablaCelda>
                      <TablaCelda>{persona.apellidos}</TablaCelda>
                      <TablaCelda>{persona.email}</TablaCelda>
                      <TablaCelda>{persona.telefono || "--"}</TablaCelda>
                      <TablaCelda>{persona.direccion || "--"}</TablaCelda>
                      <TablaCelda>
                        {persona.fechaNacimiento
                          ? new Date(
                              persona.fechaNacimiento
                            ).toLocaleDateString("es-ES")
                          : "--"}
                      </TablaCelda>
                      <TablaCelda>
                        <div className="flex space-x-2">
                          <Boton onClick={() => handleEdit(persona)}>
                            Editar
                          </Boton>
                          <Boton
                            onClick={() => handleDelete(persona.idpersona)}
                            variante="destructivo"
                          >
                            Eliminar
                          </Boton>
                        </div>
                      </TablaCelda>
                    </TablaFila>
                  )}
                </Fragment>
              ))}
            </TablaCuerpo>
          </Tabla>
        )}
      </TarjetaContenido>
      <TarjetaPie>
        <Pildora className="ml-auto">
          <div className="size-2 bg-indigo-500 rounded-full animate-pulse" />{" "}
          {personas.length} Registros
        </Pildora>
      </TarjetaPie>
    </Tarjeta>
  );
}
