import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Boton } from "../Boton";
import { useDialog } from "./useDialogo";

type DialogoContenidoProps = {
  children: React.ReactNode;
  className?: string;
  mostrarBotonCerrar?: boolean;
};

export function DialogoContenido({
  children,
  className,
  mostrarBotonCerrar = false,
}: DialogoContenidoProps) {
  const { openDialog, setOpenDialog } = useDialog();

  if (!openDialog) return null;

  return (
    <div className="z-50 fixed inset-0 m-auto bg-acentado/50 backdrop-blur-md overflow-x-hidden flex justify-center items-center">
      <div
        className={cn(
          "flex flex-col gap-2 border-2 max-w-lg w-full h-[calc(100%-2rem)] border-primario rounded-xl overflow-auto bg-fondo shadow-lg p-4",
          className
        )}
      >
        {mostrarBotonCerrar && (
          <Boton
            onClick={() => setOpenDialog(false)}
            className="size-10 p-2 ml-auto"
            autoFocus
          >
            <XIcon />
          </Boton>
        )}
        {children}
      </div>
    </div>
  );
}
