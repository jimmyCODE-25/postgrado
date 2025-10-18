import ActividadForm from "@/components/ActividadForm";
import ActividadList from "@/components/ActividadList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/actividad/")({
  component: ActividadComponent,
});

function ActividadComponent() {
  return (
    <>
      <ActividadForm />
      <ActividadList />
    </>
  );
}
