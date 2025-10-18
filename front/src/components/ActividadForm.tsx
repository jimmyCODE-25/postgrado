import { CREATE_ACTIVIDAD } from "@/graphql/mutations";
import { GET_ALL_ACTIVIDADES } from "@/graphql/queries";
import type { Actividad } from "@/types/Actividad";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { Boton } from "./ui/Boton";
import {
  Dialogo,
  DialogoContenido,
  DialogoDisparador,
  useDialog,
} from "./ui/dialogo";
import {
  Tarjeta,
  TarjetaContenido,
  TarjetaDescripcion,
  TarjetaEncabezado,
  TarjetaTitulo,
} from "./ui/tarjeta";

const initialFormState: Omit<Actividad, "idAct"> = {
  idAcp: 0,
  idPr: 0,
  nActividad: 0,
  categProgramatica: "",
  idUe: 0,
  descripcion: "",
  tipo: "",
  clase: "",
  unidadMedida: "",
  fechaIni: "",
  fechaFinal: "",
  docVerif: "",
  causasDesv: "",
  estado: 1,
};

export default function ActividadForm() {
  const [formData, setFormData] =
    useState<Omit<Actividad, "idAct">>(initialFormState);

  const { setOpenDialog } = useDialog();

  const [createActividad, { loading, error }] = useMutation(CREATE_ACTIVIDAD, {
    refetchQueries: [{ query: GET_ALL_ACTIVIDADES }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setFormData(initialFormState);
      alert("Actividad creada exitosamente");
      setOpenDialog(false);
    },

    onError: (err) => {
      console.error("Error al crear actividad:", err);
      alert("Error al crear actividad");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Math.abs(parseInt(value, 10)) || 0 : value,
      ...(name === "fechaIni" && {
        fechaIni: value ? new Date(value).toISOString().split("T")[0] : "",
      }),
      ...(name === "fechaFinal" && {
        fechaFinal: value ? new Date(value).toISOString().split("T")[0] : "",
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categProgramatica) {
      alert("La Categoría Programática es un campo obligatorio.");
      return;
    }

    const variables = {
      categProgramatica: formData.categProgramatica,
      descripcion: formData.descripcion || null,
      idAcp: Number(formData.idAcp) || null,
      idPr: Number(formData.idPr) || null,
      nActividad: Number(formData.nActividad) || null,
      idUe: Number(formData.idUe) || null,
      tipo: formData.tipo || null,
      clase: formData.clase || null,
      unidadMedida: formData.unidadMedida || null,
      fechaIni: formData.fechaIni || null,
      fechaFinal: formData.fechaFinal || null,
      docVerif: formData.docVerif || null,
      causasDesv: formData.causasDesv || null,
      estado: Number(formData.estado),
    };

    await createActividad({ variables });
  };

  return (
    <Dialogo>
      <DialogoDisparador>Crear Nueva Actividad</DialogoDisparador>
      <DialogoContenido mostrarBotonCerrar>
        <Tarjeta>
          <TarjetaEncabezado>
            <TarjetaTitulo>Crear Nueva Actividad</TarjetaTitulo>
            <TarjetaDescripcion>
              Complete los datos del nuevo registro
            </TarjetaDescripcion>
          </TarjetaEncabezado>
          <TarjetaContenido>
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Categoría Programática"
                name="categProgramatica"
                placeholder="Ej: CAT-2024-001"
                value={formData.categProgramatica}
                onChange={handleChange}
                isRequired
              />

              <InputField
                label="Descripción"
                name="descripcion"
                placeholder="Descripción detallada de la actividad"
                value={formData.descripcion || ""}
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  min="0"
                  label="ID ACP"
                  name="idAcp"
                  type="number"
                  placeholder="Ej: 1"
                  value={formData.idAcp || ""}
                  onChange={handleChange}
                />

                <InputField
                  min="0"
                  label="ID PR"
                  name="idPr"
                  type="number"
                  placeholder="Ej: 1"
                  value={formData.idPr || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  min="0"
                  label="Número de Actividad"
                  name="nActividad"
                  type="number"
                  placeholder="Ej: 101"
                  value={formData.nActividad || ""}
                  onChange={handleChange}
                />

                <InputField
                  min="0"
                  label="ID UE"
                  name="idUe"
                  type="number"
                  placeholder="Ej: 1"
                  value={formData.idUe || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Tipo"
                  name="tipo"
                  value={formData.tipo || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tipo: e.target.value,
                    }))
                  }
                  options={[
                    { value: "", label: "Seleccione un tipo" },
                    { value: "Operativa", label: "Operativa" },
                    { value: "Administrativa", label: "Administrativa" },
                    { value: "Académica", label: "Académica" },
                  ]}
                />

                <SelectField
                  label="Clase"
                  name="clase"
                  value={formData.clase || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      clase: e.target.value,
                    }))
                  }
                  options={[
                    { value: "", label: "Seleccione una clase" },
                    { value: "Proyecto", label: "Proyecto" },
                    { value: "Programa", label: "Programa" },
                    { value: "Tarea", label: "Tarea" },
                  ]}
                />
              </div>
              <InputField
                label="Unidad de Medida"
                name="unidadMedida"
                placeholder="Ej: Horas, Días, Porcentaje"
                value={formData.unidadMedida || ""}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Fecha Inicio"
                  name="fechaIni"
                  type="date"
                  value={
                    formData.fechaIni
                      ? new Date(formData.fechaIni).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                />
                <InputField
                  label="Fecha Final"
                  name="fechaFinal"
                  type="date"
                  value={
                    formData.fechaFinal
                      ? new Date(formData.fechaFinal)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
              <InputField
                label="Documento de Verificación"
                name="docVerif"
                placeholder="Ej: DOC-VER-2024-001"
                value={formData.docVerif || ""}
                onChange={handleChange}
              />
              <InputField
                label="Causas de Desviación"
                name="causasDesv"
                placeholder="Descripción de causas si las hubiera"
                value={formData.causasDesv || ""}
                onChange={handleChange}
              />

              <SelectField
                label="Estado"
                name="estado"
                value={formData.estado || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    estado: parseInt(e.target.value, 10),
                  }))
                }
                isRequired
                options={[
                  { value: 1, label: "Activo" },
                  { value: 2, label: "Inactivo" },
                ]}
              />

              <Boton type="submit" isLoading={loading}>
                {loading ? "Creando..." : "Crear Actividad"}
              </Boton>

              {error && <ErrorMessage message={error.message} />}
            </form>
          </TarjetaContenido>
        </Tarjeta>
      </DialogoContenido>
    </Dialogo>
  );
}
