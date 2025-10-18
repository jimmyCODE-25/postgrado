import type { PlanFormacionProps } from "@/types/PlanFormacion";
import { useMutation, useQuery } from "@apollo/client/react";
import { BookOpenIcon } from "lucide-react";
import { Fragment, useState } from "react";
import {
  DELETE_PLAN_FORMACION,
  UPDATE_PLAN_FORMACION,
} from "../graphql/mutations";
import { GET_ALL_PLANES_FORMACION } from "../graphql/queries";
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

// 👇 Define según tu dominio real
const NIVELES_ACADEMICOS = [
  { value: 1, label: "Pregrado" },
  { value: 2, label: "Posgrado" },
  { value: 3, label: "Doctorado" },
  { value: 4, label: "Técnico" },
];

const TIPOS_CARRERA = [
  { value: 1, label: "Presencial" },
  { value: 2, label: "Virtual" },
  { value: 3, label: "Híbrida" },
];

const ESTADOS = [
  { value: 1, label: "Activo" },
  { value: 0, label: "Inactivo" },
];

export default function PlanFormacionList() {
  const { data, loading, error, refetch } = useQuery<{
    allPlanesFormacion: PlanFormacionProps[];
  }>(GET_ALL_PLANES_FORMACION);

  const [deletePlanFormacion] = useMutation(DELETE_PLAN_FORMACION, {
    refetchQueries: [{ query: GET_ALL_PLANES_FORMACION }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      refetch();
      alert("Plan de formación eliminado exitosamente");
    },
    onError: (err) => {
      console.error("Error al eliminar plan de formación:", err);
      alert("Error al eliminar plan de formación");
    },
  });

  const [updatePlanFormacion, { loading: updateLoading }] = useMutation(
    UPDATE_PLAN_FORMACION,
    {
      refetchQueries: [{ query: GET_ALL_PLANES_FORMACION }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        handleCancelEdit();
        alert("Plan de formación actualizado exitosamente");
      },
      onError: (err) => {
        console.error("Error al actualizar plan de formación:", err);
        alert("Error al actualizar plan de formación");
      },
    }
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<PlanFormacionProps | null>(null);

  const handleDelete = async (id: string | number) => {
    if (window.confirm("¿Estás seguro de eliminar este plan de formación?")) {
      const variables = { idPf: Number(id) };
      try {
        await deletePlanFormacion({ variables });
      } catch (error) {
        console.error("Error al eliminar plan de formación:", error);
      }
    }
  };

  const handleEdit = (plan: PlanFormacionProps) => {
    const formatDate = (date: string | null | undefined) =>
      date ? new Date(date).toISOString().split("T")[0] : "";

    setEditingId(plan.idPf);
    setEditForm({
      ...plan,
      fechaCreacion: formatDate(plan.fechaCreacion),
      fechaBaja: formatDate(plan.fechaBaja),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleUpdateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editForm) return;
    const { name, value, type } = e.target;

    let parsedValue: string | number | null = value;

    if (type === "number") {
      parsedValue = value === "" ? null : Number(value);
    } else if (type === "date") {
      parsedValue = value || "";
    } else if (
      name === "nivelAcad" ||
      name === "tipoCarr" ||
      name === "estado"
    ) {
      parsedValue = value === "" ? null : Number(value);
    } else if (value === "") {
      parsedValue = null;
    }

    setEditForm({
      ...editForm,
      [name]: parsedValue,
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    if (
      !editForm.nombre ||
      editForm.nivelAcad === null ||
      editForm.nivelAcad === undefined ||
      editForm.tipoCarr === null ||
      editForm.tipoCarr === undefined
    ) {
      alert(
        "Nombre, Nivel Académico y Tipo de Carrera son campos obligatorios."
      );
      return;
    }

    const variables = {
      idPf: editForm.idPf,
      nombre: editForm.nombre,
      nVersion: editForm.nVersion ?? 0,
      nivelAcad: editForm.nivelAcad,
      totalCred: editForm.totalCred ?? 0,
      totalPeriodo: editForm.totalPeriodo ?? 0,
      tipoCarr: editForm.tipoCarr,
      fechaCreacion: editForm.fechaCreacion || null,
      nResolAlta: editForm.nResolAlta || null,
      fechaBaja: editForm.fechaBaja || null,
      nResolBaja: editForm.nResolBaja || null,
      descripcion: editForm.descripcion || null,
      estado: editForm.estado ?? 1,
    };

    try {
      await updatePlanFormacion({ variables });
    } catch (error) {
      console.error("Error al actualizar plan de formación:", error);
    }
  };

  if (loading) {
    return <p className="text-indigo-600">Cargando planes de formación...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error al cargar planes de formación: {error.message}
      </p>
    );
  }

  const planesFormacion: PlanFormacionProps[] = data?.allPlanesFormacion || [];

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "--";
    return new Date(date).toLocaleDateString("es-ES");
  };

  return (
    <Tarjeta className="overflow-x-auto">
      <TarjetaEncabezado>
        <TarjetaTitulo>Lista de Planes de Formación</TarjetaTitulo>
        <TarjetaDescripcion>
          Gestión de planes de estudio institucionales
        </TarjetaDescripcion>
      </TarjetaEncabezado>
      <TarjetaContenido>
        {planesFormacion.length === 0 ? (
          <Vacio
            icono={BookOpenIcon}
            titulo="No hay planes de formación registrados"
            descripcion="Comienza agregando un nuevo plan al sistema"
          />
        ) : (
          <Tabla>
            <TablaLeyenda>Registros Activos</TablaLeyenda>
            <TablaEncabezado>
              <TablaFila>
                <TablaCeldaEncabezado>ID</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Nombre</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Versión</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Nivel</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Créditos</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Periodos</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Tipo</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Fecha Creación</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Fecha Baja</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Estado</TablaCeldaEncabezado>
                <TablaCeldaEncabezado>Acciones</TablaCeldaEncabezado>
              </TablaFila>
            </TablaEncabezado>
            <TablaCuerpo>
              {planesFormacion.map((plan) => (
                <Fragment key={plan.idPf}>
                  {editingId === plan.idPf ? (
                    <TablaFila>
                      <TablaCelda className="font-bold text-primario">
                        {plan.idPf}
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="text"
                          name="nombre"
                          value={editForm?.nombre || ""}
                          onChange={handleUpdateChange}
                          required
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="number"
                          name="nVersion"
                          className="w-24"
                          value={editForm?.nVersion ?? ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <SelectField
                          name="nivelAcad"
                          options={NIVELES_ACADEMICOS}
                          value={editForm?.nivelAcad ?? ""}
                          onChange={handleUpdateChange}
                          required
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="number"
                          name="totalCred"
                          className="w-24"
                          value={editForm?.totalCred ?? ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="number"
                          name="totalPeriodo"
                          value={editForm?.totalPeriodo ?? ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <SelectField
                          name="tipoCarr"
                          options={TIPOS_CARRERA}
                          value={editForm?.tipoCarr ?? ""}
                          onChange={handleUpdateChange}
                          required
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="date"
                          name="fechaCreacion"
                          value={editForm?.fechaCreacion || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <InputField
                          type="date"
                          name="fechaBaja"
                          value={editForm?.fechaBaja || ""}
                          onChange={handleUpdateChange}
                        />
                      </TablaCelda>
                      <TablaCelda>
                        <SelectField
                          name="estado"
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
                      <TablaCelda className="font-bold text-primario">
                        {plan.idPf}
                      </TablaCelda>
                      <TablaCelda>{plan.nombre}</TablaCelda>
                      <TablaCelda className="text-center">
                        {plan.nVersion}
                      </TablaCelda>
                      <TablaCelda className="text-center">
                        {NIVELES_ACADEMICOS.find(
                          (n) => n.value === plan.nivelAcad
                        )?.label || plan.nivelAcad}
                      </TablaCelda>
                      <TablaCelda className="text-center">
                        {plan.totalCred}
                      </TablaCelda>
                      <TablaCelda className="text-center">
                        {plan.totalPeriodo}
                      </TablaCelda>
                      <TablaCelda className="text-center">
                        {TIPOS_CARRERA.find((t) => t.value === plan.tipoCarr)
                          ?.label || plan.tipoCarr}
                      </TablaCelda>
                      <TablaCelda>{formatDate(plan.fechaCreacion)}</TablaCelda>
                      <TablaCelda>{formatDate(plan.fechaBaja)}</TablaCelda>
                      <TablaCelda>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            plan.estado === 1
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {plan.estado === 1 ? "Activo" : "Inactivo"}
                        </span>
                      </TablaCelda>
                      <TablaCelda>
                        <div className="flex space-x-2">
                          <Boton onClick={() => handleEdit(plan)}>Editar</Boton>
                          <Boton
                            onClick={() => handleDelete(plan.idPf)}
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
          {planesFormacion.length} Registros
        </Pildora>
      </TarjetaPie>
    </Tarjeta>
  );
}
