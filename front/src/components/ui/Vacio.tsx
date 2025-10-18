import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface VacioProps extends React.ComponentProps<"div"> {
  icono?: LucideIcon;
  titulo: string;
  descripcion?: string;
}

export function Vacio({
  className,
  titulo,
  descripcion,
  icono: Icono,
}: VacioProps) {
  return (
    <div
      className={cn(
        "bg-fondo rounded-2xl shadow-lg border border-primario p-8",
        className
      )}
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center size-20 bg-primario/10 rounded-full mb-4">
          {Icono && <Icono className="size-10 text-primario" />}
        </div>
        <h3 className="text-xl font-semibold mb-2">{titulo}</h3>
        {descripcion && <p className="text-mutado">{descripcion}</p>}
      </div>
    </div>
  );
}
