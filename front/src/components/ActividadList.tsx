import type { Actividad } from "@/types/Actividad";
import { useMutation, useQuery } from "@apollo/client/react";
import { ActivityIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { DELETE_ACTIVIDAD, UPDATE_ACTIVIDAD } from "../graphql/mutations";
import { GET_ALL_ACTIVIDADES } from "../graphql/queries";
import InputField from "./InputField";
import SelectField from "./SelectField"; // 👈 Importamos tu componente
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

// Opciones predefinidas (ajusta según tu dominio real)
const TIPOS_ACTIVIDAD = [
  { value: "Proyecto", label: "Proyecto" },
  { value: "Programa", label: "Programa" },
  { value: "Tarea", label: "Tarea" },
  { value: "Evento", label: "Evento" },
];

const CLASES_ACTIVIDAD = [
  { value: "Interna", label: "Interna" },
  { value: "Externa", label: "Externa" },
  { value: "Mixta", label: "Mixta" },
];

const UNIDADES_MEDIDA = [
  { value: "Unidad", label: "Unidad" },
  { value: "Hora", label: "Hora" },
  { value: "Día", label: "Día" },
  { value: "Evento", label: "Evento" },
  { value: "Km", label: "Km" },
];

const ESTADOS = [
  { value: 1, label: "Activo" },
  { value: 0, label: "Inactivo" },
];

export default function ActividadList() {
  const { data, loading, error, refetch } = useQuery<{
    allActividades: Actividad[];
  }>(GET_ALL_ACTIVIDADES);

  const [deleteActividad] = useMutation(DELETE_ACTIVIDAD, {
    refetchQueries: [{ query: GET_ALL_ACTIVIDADES }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      refetch();
      alert("Actividad eliminada exitosamente");
    },
    onError: (err) => {
      console.error("Error al eliminar actividad:", err);
      alert("Error al eliminar actividad");
    },
  });

  const [updateActividad, { loading: updateLoading }] = useMutation(
    UPDATE_ACTIVIDAD,
    {
      refetchQueries: [{ query: GET_ALL_ACTIVIDADES }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        handleCancelEdit();
        alert("Actividad actualizada exitosamente");
      },
      onError: (err) => {
        console.error("Error al actualizar actividad:", err);
        alert("Error al actualizar actividad");
      },
    }
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Actividad | null>(null);

  const handleDelete = async (id: string | number) => {
    if (window.confirm("¿Estás seguro de eliminar esta actividad?")) {
      const variables = { idAct: Number(id) };
      try {
        await deleteActividad({ variables });
      } catch (error) {
        console.error("Error al eliminar actividad:", error);
      }
    }
  };

  const handleEdit = (actividad: Actividad) => {
    const formatDate = (date: string | null | undefined) =>
      date ? new Date(date).toISOString().split("T")[0] : "";

    setEditingId(actividad.idAct);
    setEditForm({
      ...actividad,
      fechaIni: formatDate(actividad.fechaIni),
      fechaFinal: formatDate(actividad.fechaFinal),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleUpdateChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!editForm) return;
    const { name, value } = e.target;

    let newValue: string | number | null = value;
    if (name === "estado") {
      newValue = Number(value);
    } else if (value === "") {
      newValue = null;
    }

    setEditForm({
      ...editForm,
      [name]: newValue,
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    if (!editForm.categProgramatica) {
      alert("La categoría programática es obligatoria.");
      return;
    }

    const variables = {
      idAct: editForm.idAct,
      categProgramatica: editForm.categProgramatica,
      descripcion: editForm.descripcion || null,
      tipo: editForm.tipo || null,
      clase: editForm.clase || null,
      unidadMedida: editForm.unidadMedida || null,
      fechaIni: editForm.fechaIni || null,
      fechaFinal: editForm.fechaFinal || null,
      docVerif: editForm.docVerif || null,
      causasDesv: editForm.causasDesv || null,
      estado: editForm.estado,
    };

    try {
      await updateActividad({ variables });
    } catch (error) {
      console.error("Error al actualizar actividad:", error);
    }
  };

  if (loading) {
    return <p className="text-indigo-600">Cargando actividades...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error al cargar actividades: {error.message}
      </p>
    );
  }

  const actividades: Actividad[] = data?.allActividades || [];

  return (
    <Tarjeta className="overflow-x-auto">
      <TarjetaEncabezado>
        <TarjetaTitulo>Lista de Actividades</TarjetaTitulo>
        <TarjetaDescripcion>
          Gestión de registros institucionales
        </TarjetaDescripcion>
      </TarjetaEncabezado>
      <TarjetaContenido>
        {actividades.length === 0 ? (
          <Vacio
            icono={ActivityIcon}
            titulo="No hay actividades registradas"
            descripcion="Comienza agregando un nuevo registro al sistema"
          />
        ) : (
          <Tabla>
            <TablaLeyenda>Registros Activos</TablaLeyenda>
            <TablaEncabezado>
              <TablaFila>
                <TablaCeldaEncabezado>Id</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Categoría</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Descripción</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Tipo</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Clase</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>U. Medida</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Fecha Inicio</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Fecha Final</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Estado</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Acciones</TablaCeldaEncabezado>
              </TablaFila>
            </TablaEncabezado>
            <TablaCuerpo>
              {actividades.map((actividad) => (
                <Fragment key={actividad.idAct}>
                  {editingId === actividad.idAct ? (
                    <TablaFila>
                      <TablaCelda className="text-primario font-bold">
                        {actividad.idAct}
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="text"
                          name="categProgramatica"
                          value={editForm?.categProgramatica || ""}
                          onChange={handleUpdateChange}
                          required
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="text"
                          name="descripcion"
                          value={editForm?.descripcion || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <SelectField
                          name="tipo"
                          className="w-fit"
                          options={TIPOS_ACTIVIDAD}
                          value={editForm?.tipo || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <SelectField
                          name="clase"
                          className="w-fit"
                          options={CLASES_ACTIVIDAD}
                          value={editForm?.clase || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <SelectField
                          name="unidadMedida"
                          className="w-fit"
                          options={UNIDADES_MEDIDA}
                          value={editForm?.unidadMedida || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="date"
                          name="fechaIni"
                          value={editForm?.fechaIni || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="date"
                          name="fechaFinal"
                          value={editForm?.fechaFinal || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <SelectField
                          name="estado"
                          className="w-fit"
                          options={ESTADOS}
                          value={editForm?.estado ?? 1}
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
                        {actividad.idAct}
                      </TablaCelda>
                      <TablaCelda>{actividad.categProgramatica}</TablaCelda>
                      <TablaCelda>{actividad.descripcion || "--"}</TablaCelda>
                      <TablaCelda>{actividad.tipo || "--"}</TablaCelda>
                      <TablaCelda>{actividad.clase || "--"}</TablaCelda>
                      <TablaCelda>{actividad.unidadMedida || "--"}</TablaCelda>
                      <TablaCelda>
                        {actividad.fechaIni
                          ? new Date(actividad.fechaIni).toLocaleDateString(
                              "es-ES"
                            )
                          : "--"}
                      </TablaCelda>
                      <TablaCelda>
                        {actividad.fechaFinal
                          ? new Date(actividad.fechaFinal).toLocaleDateString(
                              "es-ES"
                            )
                          : "--"}
                      </TablaCelda>
                      <TablaCelda>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            actividad.estado === 1
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {actividad.estado === 1 ? "Activo" : "Inactivo"}
                        </span>
                      </TablaCelda>
                      <TablaCelda>
                        <div className="flex space-x-2">
                          <Boton onClick={() => handleEdit(actividad)}>
                            Editar
                          </Boton>
                          <Boton
                            onClick={() => handleDelete(actividad.idAct)}
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
          {actividades.length} Registros
        </Pildora>
      </TarjetaPie>
    </Tarjeta>
  );
}
