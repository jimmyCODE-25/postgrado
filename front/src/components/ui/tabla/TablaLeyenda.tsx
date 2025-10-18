import { cn } from "@/lib/utils";

interface TablaLeyendaProps extends React.ComponentProps<"caption"> {
  alineado?: "inicio" | "centrado" | "final";
}

export function TablaLeyenda({
  className,
  alineado = "inicio",
  ...props
}: TablaLeyendaProps) {
  return (
    <caption
      className={cn(
        "text-mutado text-lg font-semibold bg-primario px-6 py-4",
        className,
        {
          "text-left": alineado === "inicio",
          "text-center": alineado === "centrado",
          "text-right": alineado === "final",
        }
      )}
      {...props}
    />
  );
}
