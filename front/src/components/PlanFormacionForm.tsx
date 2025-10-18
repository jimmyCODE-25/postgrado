import { CREATE_PLAN_FORMACION } from "@/graphql/mutations";
import { GET_ALL_PLANES_FORMACION } from "@/graphql/queries";
import type { PlanFormacionProps } from "@/types/PlanFormacion";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { Boton } from "./ui/Boton";
import { Dialogo, DialogoContenido, DialogoDisparador } from "./ui/dialogo";
import {
  Tarjeta,
  TarjetaContenido,
  TarjetaDescripcion,
  TarjetaEncabezado,
  TarjetaTitulo,
} from "./ui/tarjeta";

const initialFormState: Omit<PlanFormacionProps, "idPf"> = {
  nombre: "",
  nVersion: 0,
  nivelAcad: 0,
  totalCred: 0,
  totalPeriodo: 0,
  tipoCarr: 0,
  fechaCreacion: "",
  nResolAlta: "",
  fechaBaja: "",
  nResolBaja: "",
  descripcion: "",
  estado: 1,
};

export default function PlanFormacionForm() {
  const [formData, setFormData] =
    useState<Omit<PlanFormacionProps, "idPf">>(initialFormState);

  const [createPlanFormacion, { loading, error }] = useMutation(
    CREATE_PLAN_FORMACION,
    {
      refetchQueries: [{ query: GET_ALL_PLANES_FORMACION }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        setFormData(initialFormState);
        alert("Plan de formación creado exitosamente");
      },
      onError: (err) => {
        console.error("Error al crear plan de formación:", err);
        alert("Error al crear plan de formación");
      },
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
      ...(name === "fechaCreacion" && {
        fechaCreacion: value ? new Date(value).toISOString().split("T")[0] : "",
      }),
      ...(name === "fechaBaja" && {
        fechaBaja: value ? new Date(value).toISOString().split("T")[0] : "",
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.nivelAcad || !formData.tipoCarr) {
      alert(
        "Nombre, Nivel Académico y Tipo de Carrera son campos obligatorios."
      );
      return;
    }

    const variables = {
      nombre: formData.nombre,
      nVersion: Number(formData.nVersion) || null,
      nivelAcad: Number(formData.nivelAcad),
      totalCred: Number(formData.totalCred) || null,
      totalPeriodo: Number(formData.totalPeriodo) || null,
      tipoCarr: Number(formData.tipoCarr),
      fechaCreacion: formData.fechaCreacion || null,
      nResolAlta: formData.nResolAlta || null,
      fechaBaja: formData.fechaBaja || null,
      nResolBaja: formData.nResolBaja || null,
      descripcion: formData.descripcion || null,
      estado: Number(formData.estado),
    };

    await createPlanFormacion({ variables });
  };

  return (
    <Dialogo>
      <DialogoDisparador>Crear Nuevo Plan de Formación</DialogoDisparador>
      <DialogoContenido mostrarBotonCerrar>
        <Tarjeta>
          <TarjetaEncabezado>
            <TarjetaTitulo>Crear Nuevo Plan de Formación</TarjetaTitulo>
            <TarjetaDescripcion>
              Complete los datos del nuevo registro
            </TarjetaDescripcion>
          </TarjetaEncabezado>
          <TarjetaContenido>
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Nombre del Plan"
                name="nombre"
                placeholder="Ej: Ingeniería de Sistemas"
                value={formData.nombre}
                onChange={handleChange}
                isRequired
              />

              <InputField
                label="Versión"
                name="nVersion"
                type="number"
                placeholder="Ej: 2023"
                value={formData.nVersion || ""}
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Nivel Académico"
                  name="nivelAcad"
                  value={formData.nivelAcad || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nivelAcad: parseInt(e.target.value, 10),
                    }))
                  }
                  isRequired
                  options={[
                    { value: 1, label: "Técnico" },
                    { value: 2, label: "Licenciatura" },
                    { value: 3, label: "Maestría" },
                    { value: 4, label: "Doctorado" },
                  ]}
                />

                <SelectField
                  label="Tipo de Carrera"
                  name="tipoCarr"
                  value={formData.tipoCarr || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tipoCarr: parseInt(e.target.value, 10),
                    }))
                  }
                  isRequired
                  options={[
                    { value: 1, label: "Anual" },
                    { value: 2, label: "Semestral" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Total Créditos"
                  name="totalCred"
                  type="number"
                  placeholder="Ej: 300"
                  value={formData.totalCred || ""}
                  onChange={handleChange}
                />

                <InputField
                  label="Total Periodos"
                  name="totalPeriodo"
                  type="number"
                  placeholder="Ej: 10"
                  value={formData.totalPeriodo || ""}
                  onChange={handleChange}
                />
              </div>

              <InputField
                label="Fecha de Creación"
                name="fechaCreacion"
                type="date"
                value={
                  formData.fechaCreacion
                    ? new Date(formData.fechaCreacion)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleChange}
              />

              <InputField
                label="Resolución de Alta"
                name="nResolAlta"
                placeholder="Ej: HCU-123/2023"
                value={formData.nResolAlta || ""}
                onChange={handleChange}
              />

              <InputField
                label="Fecha de Baja"
                name="fechaBaja"
                type="date"
                value={
                  formData.fechaBaja
                    ? new Date(formData.fechaBaja).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
              />

              <InputField
                label="Resolución de Baja"
                name="nResolBaja"
                placeholder="Ej: HCU-050/2028"
                value={formData.nResolBaja || ""}
                onChange={handleChange}
              />

              <InputField
                label="Descripción"
                name="descripcion"
                placeholder="Detalles adicionales del plan de formación"
                value={formData.descripcion || ""}
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
                {loading ? "Creando..." : "Crear Plan de Formación"}
              </Boton>

              {error && <ErrorMessage message={error.message} />}
            </form>
          </TarjetaContenido>
        </Tarjeta>
      </DialogoContenido>
    </Dialogo>
  );
}
