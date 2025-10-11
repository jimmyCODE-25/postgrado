import type { PersonaProps } from "@/types/Persona";
import { useMutation, useQuery } from "@apollo/client/react";
import { UsersIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { DELETE_PERSONA, UPDATE_PERSONA } from "../graphql/mutations";
import { GET_ALL_PERSONAS } from "../graphql/queries";

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
      // Asegurarnos de enviar un número (GraphQL espera Int en el cliente)
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
    <div className="p-4 rounded-lg w-full overflow-hidden bg-white h-fit">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Lista de Personas</h2>
          <p className="mt-1 text-sm text-indigo-400 font-medium">
            Gestión de registros institucionales
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-indigo-900">
            {personas.length} Registros
          </span>
        </div>
      </div>

      {personas.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center size-20 bg-indigo-100 rounded-full mb-4">
              <UsersIcon className="size-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay personas registradas
            </h3>
            <p className="text-gray-500">
              Comienza agregando un nuevo registro al sistema
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-600 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">
              Registros Activos
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-100">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Nombres
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Apellidos
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Dirección
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Fecha Nac.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-indigo-50">
                {personas.map((persona) => (
                  <Fragment key={persona.idpersona}>
                    {editingId === persona.idpersona ? (
                      <tr className="bg-indigo-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-indigo-200 rounded-xl text-indigo-800 font-bold text-sm">
                            {persona.idpersona}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            name="nombres"
                            value={editForm?.nombres || ""}
                            onChange={handleUpdateChange}
                            className="w-full px-4 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white shadow-sm"
                            required
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            name="apellidos"
                            value={editForm?.apellidos || ""}
                            onChange={handleUpdateChange}
                            className="w-full px-4 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white shadow-sm"
                            required
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="email"
                            name="email"
                            value={editForm?.email || ""}
                            onChange={handleUpdateChange}
                            className="w-full px-4 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white shadow-sm"
                            required
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            name="telefono"
                            value={editForm?.telefono || ""}
                            onChange={handleUpdateChange}
                            className="w-full px-4 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white shadow-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            name="direccion"
                            value={editForm?.direccion || ""}
                            onChange={handleUpdateChange}
                            className="w-full px-4 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white shadow-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
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
                            className="w-full px-4 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white shadow-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <form
                            onSubmit={handleUpdateSubmit}
                            className="flex space-x-2"
                          >
                            <button
                              type="submit"
                              disabled={updateLoading}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:from-gray-400 disabled:to-gray-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              {updateLoading ? "Guardando..." : "Guardar"}
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              Cancelar
                            </button>
                          </form>
                        </td>
                      </tr>
                    ) : (
                      <tr className="hover:bg-indigo-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-100 rounded-xl text-indigo-700 font-bold text-sm shadow-sm">
                            {persona.idpersona}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            {persona.nombres}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            {persona.apellidos}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {persona.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700">
                            {persona.telefono || (
                              <span className="text-gray-400">-</span>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {persona.direccion || (
                              <span className="text-gray-400">-</span>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700">
                            {persona.fechaNacimiento ? (
                              new Date(
                                persona.fechaNacimiento
                              ).toLocaleDateString("es-ES")
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(persona)}
                              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(persona.idpersona)}
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
