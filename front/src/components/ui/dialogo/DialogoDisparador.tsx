import { cn } from "@/lib/utils";
import { Boton } from "../Boton";
import { useDialog } from "./useDialogo";

type DialogoDisparadorProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogoDisparador({
  children,
  className,
}: DialogoDisparadorProps) {
  const { setOpenDialog } = useDialog();

  return (
    <Boton className={cn(className)} onClick={() => setOpenDialog(true)}>
      {children}
    </Boton>
  );
}
