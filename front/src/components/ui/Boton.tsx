import { cn } from "@/lib/utils";
import { LoaderPinwheelIcon } from "lucide-react";
import type { ReactNode } from "react";

interface BotonProps extends React.ComponentProps<"button"> {
  isLoading?: boolean;
  variante?: "secundario" | "destructivo";
  children: ReactNode;
}

export function Boton({
  children,
  variante,
  className,
  isLoading,
  ...props
}: BotonProps) {
  return (
    <button
      type="button"
      disabled={isLoading}
      className={cn(
        "flex flex-col items-center justify-center w-full py-3.5 px-4 text-primario-acentado font-semibold rounded-xl transition-all transform shadow-lg bg-primario hover:bg-primario/90 cursor-pointer",
        {
          "bg-gray-400 cursor-not-allowed": isLoading,
          "bg-secundario hover:bg-secundario/90": variante === "secundario",
          "bg-destructivo hover:bg-destructivo/90": variante === "destructivo",
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <LoaderPinwheelIcon className="animate-spin size-5 text-primario-acentado" />
      ) : (
        children
      )}
    </button>
  );
}
