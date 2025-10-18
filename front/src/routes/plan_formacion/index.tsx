import PlanFormacionForm from "@/components/PlanFormacionForm";
import PlanFormacionList from "@/components/PlanFormacionList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan_formacion/")({
  component: PlanFormacionComponent,
});

function PlanFormacionComponent() {
  return (
    <>
      <PlanFormacionForm />
      <PlanFormacionList />
    </>
  );
}
