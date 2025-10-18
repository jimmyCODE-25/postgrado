import { CREATE_PERSONA } from "@/graphql/mutations";
import { GET_ALL_PERSONAS } from "@/graphql/queries";
import type { PersonaProps } from "@/types/Persona";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import InputField from "./InputField";
import { Boton } from "./ui/Boton";
import { Dialogo, DialogoContenido, DialogoDisparador } from "./ui/dialogo";
import {
  Tarjeta,
  TarjetaContenido,
  TarjetaDescripcion,
  TarjetaEncabezado,
  TarjetaTitulo,
} from "./ui/tarjeta";

const initialFormState = {
  nombres: "",
  apellidos: "",
  email: "",
  telefono: "",
  direccion: "",
  fechaNacimiento: "",
};

export default function PersonaForm() {
  const [formData, setFormData] =
    useState<Omit<PersonaProps, "idpersona">>(initialFormState);

  const [createPersona, { loading, error }] = useMutation(CREATE_PERSONA, {
    refetchQueries: [{ query: GET_ALL_PERSONAS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setFormData(initialFormState);
      alert("Persona creada exitosamente");
    },
    onError: (err) => {
      console.error("Error al crear persona:", err);
      alert("Error al crear persona");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "fechaNacimiento" && {
        fechaNacimiento: new Date(value).toISOString().split("T")[0],
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombres || !formData.apellidos || !formData.email) {
      alert("Nombres, Apellidos y Email son campos obligatorios.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert("El formato del email es inválido.");
      return;
    }

    await createPersona({ variables: formData });
  };

  return (
    <Dialogo>
      <DialogoDisparador>Crear nueva persona</DialogoDisparador>
      <DialogoContenido mostrarBotonCerrar>
        <Tarjeta>
          <TarjetaEncabezado>
            <TarjetaTitulo>Crear Nueva Persona</TarjetaTitulo>
            <TarjetaDescripcion>
              Complete los datos del nuevo registro
            </TarjetaDescripcion>
          </TarjetaEncabezado>
          <TarjetaContenido>
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Nombres"
                name="nombres"
                placeholder="Ingrese los nombres"
                value={formData.nombres}
                onChange={handleChange}
                isRequired
              />
              <InputField
                label="Apellidos"
                name="apellidos"
                placeholder="Ingrese los apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                isRequired
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
                isRequired
              />
              <InputField
                label="Teléfono"
                name="telefono"
                placeholder="+591 70123456"
                value={formData.telefono || ""}
                onChange={handleChange}
              />
              <InputField
                label="Dirección"
                name="direccion"
                placeholder="Calle, número, ciudad"
                value={formData.direccion || ""}
                onChange={handleChange}
              />
              <InputField
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                type="date"
                value={
                  formData.fechaNacimiento
                    ? new Date(formData.fechaNacimiento)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleChange}
              />

              <Boton type="submit" isLoading={loading}>
                {loading ? " Creando..." : "Crear Persona"}
              </Boton>

              {error && <ErrorMessage message={error.message} />}
            </form>
          </TarjetaContenido>
        </Tarjeta>
      </DialogoContenido>
    </Dialogo>
  );
}
