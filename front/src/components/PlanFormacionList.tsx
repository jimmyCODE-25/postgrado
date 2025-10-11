import type { PlanFormacionProps } from "@/types/PlanFormacion";
import { useMutation, useQuery } from "@apollo/client/react";
import { BookXIcon } from "lucide-react";
import { Fragment, useState } from "react";
import {
  DELETE_PLAN_FORMACION,
  UPDATE_PLAN_FORMACION,
} from "../graphql/mutations";
import { GET_ALL_PLANES_FORMACION } from "../graphql/queries";

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

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    const { name, value, type } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    if (!editForm.nombre || !editForm.nivelAcad || !editForm.tipoCarr) {
      alert(
        "Nombre, Nivel Académico y Tipo de Carrera son campos obligatorios."
      );
      return;
    }

    const { idPf, ...formData } = editForm;

    const variables: PlanFormacionProps = {
      idPf: idPf,
      nombre: formData.nombre,
      nVersion: Number(formData.nVersion),
      nivelAcad: Number(formData.nivelAcad),
      totalCred: Number(formData.totalCred),
      totalPeriodo: Number(formData.totalPeriodo),
      tipoCarr: Number(formData.tipoCarr),
      fechaCreacion: formData.fechaCreacion,
      nResolAlta: formData.nResolAlta,
      fechaBaja: formData.fechaBaja || null,
      nResolBaja: formData.nResolBaja || null,
      descripcion: formData.descripcion || null,
      estado: Number(formData.estado),
    };
    await updatePlanFormacion({ variables });
  };

  if (loading) {
    return <p>Cargando planes de formación...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error al cargar planes de formación: {error.message}
      </p>
    );
  }

  const planesFormacion: PlanFormacionProps[] = data?.allPlanesFormacion || [];

  return (
    <div className="p-4 rounded-lg w-full overflow-hidden bg-white h-fit">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Lista de Planes de Formación</h2>
          <p className="mt-1 text-sm text-indigo-400 font-medium">
            Gestión de planes de estudio institucionales
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-indigo-900">
            {planesFormacion.length} Registros
          </span>
        </div>
      </div>

      {planesFormacion.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4">
              <BookXIcon className="size-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay planes de formación registrados
            </h3>
            <p className="text-gray-500">
              Comienza agregando un nuevo plan al sistema
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-600 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">
              Registros Activos
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-100">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Versión
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Nivel Acad.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Créditos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Periodos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Tipo Carrera
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-indigo-50">
                {planesFormacion.map((plan) => (
                  <Fragment key={plan.idPf}>
                    {editingId === plan.idPf ? (
                      // Edit Row
                      <tr className="bg-indigo-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {plan.idPf}
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            name="nombre"
                            value={editForm?.nombre || ""}
                            onChange={handleUpdateChange}
                            className="w-full p-1 border rounded"
                            required
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            name="nVersion"
                            value={editForm?.nVersion || ""}
                            onChange={handleUpdateChange}
                            className="w-20 p-1 border rounded"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            name="nivelAcad"
                            value={editForm?.nivelAcad || ""}
                            onChange={handleUpdateChange}
                            className="w-20 p-1 border rounded"
                            required
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            name="totalCred"
                            value={editForm?.totalCred || ""}
                            onChange={handleUpdateChange}
                            className="w-20 p-1 border rounded"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            name="totalPeriodo"
                            value={editForm?.totalPeriodo || ""}
                            onChange={handleUpdateChange}
                            className="w-20 p-1 border rounded"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            name="tipoCarr"
                            value={editForm?.tipoCarr || ""}
                            onChange={handleUpdateChange}
                            className="w-20 p-1 border rounded"
                            required
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            name="estado"
                            value={editForm?.estado ?? ""}
                            onChange={handleUpdateChange}
                            className="w-20 p-1 border rounded"
                            required
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <form
                            onSubmit={handleUpdateSubmit}
                            className="flex space-x-2"
                          >
                            <button
                              type="submit"
                              disabled={updateLoading}
                              className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                              {updateLoading ? "Guardando..." : "Guardar"}
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="bg-gray-500 text-white px-3 py-1 rounded"
                            >
                              Cancelar
                            </button>
                          </form>
                        </td>
                      </tr>
                    ) : (
                      // Display Row
                      <tr className="hover:bg-indigo-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-bold">{plan.idPf}</span>
                        </td>
                        <td className="px-6 py-4">{plan.nombre}</td>
                        <td className="px-6 py-4">{plan.nVersion}</td>
                        <td className="px-6 py-4">{plan.nivelAcad}</td>
                        <td className="px-6 py-4">{plan.totalCred}</td>
                        <td className="px-6 py-4">{plan.totalPeriodo}</td>
                        <td className="px-6 py-4">{plan.tipoCarr}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              plan.estado === 1
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {plan.estado === 1 ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(plan)}
                              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(plan.idPf)}
                              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
