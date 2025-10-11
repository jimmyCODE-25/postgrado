import PlanFormacionForm from "@/components/PlanFormacionForm";
import PlanFormacionList from "@/components/PlanFormacionList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan_formacion/")({
  component: PlanFormacionComponent,
});

function PlanFormacionComponent() {
  return (
    <div className="grid grid-cols-1 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4 lg:grid-cols-[1fr_3fr] gap-12">
      <PlanFormacionForm />
      <PlanFormacionList />
    </div>
  );
}
