import { CREATE_PERSONA } from "@/graphql/mutations";
import { GET_ALL_PERSONAS } from "@/graphql/queries";
import type { PersonaProps } from "@/types/Persona";
import { useMutation } from "@apollo/client/react";
import { UserPlusIcon } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import FormHeader from "./FormHeader";
import InputField from "./InputField";

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
    <div className="min-w-sm p-8 border border-indigo-200 rounded-2xl bg-white shadow-xl">
      <FormHeader
        title="Crear Nueva Persona"
        subtitle="Complete los datos del nuevo registro"
        icon={<UserPlusIcon className="size-8 text-white" />}
      />

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
              ? new Date(formData.fechaNacimiento).toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
        />

        <Button type="submit" isLoading={loading}>
          {loading ? " Creando..." : "Crear Persona"}
        </Button>

        {error && <ErrorMessage message={error.message} />}
      </form>
    </div>
  );
}
