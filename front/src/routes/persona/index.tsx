import PersonaForm from "@/components/PersonaForm";
import PersonaList from "@/components/PersonaList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/persona/")({
  component: PersonaComponent,
});

function PersonaComponent() {
  return (
    <div className="grid grid-cols-1 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4 lg:grid-cols-[1fr_3fr] gap-12">
      <PersonaForm />
      <PersonaList />
    </div>
  );
}
