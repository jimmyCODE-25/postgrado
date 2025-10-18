import PersonaForm from "@/components/PersonaForm";
import PersonaList from "@/components/PersonaList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/persona/")({
  component: PersonaComponent,
});

function PersonaComponent() {
  return (
    <>
      <PersonaForm />
      <PersonaList />
    </>
  );
}
