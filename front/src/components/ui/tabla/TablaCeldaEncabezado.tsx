import { cn } from "@/lib/utils";

export function TablaCeldaEncabezado({
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "text-primario tracking-wide font-bold h-10 px-6 py-4 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] uppercase",
        className
      )}
      {...props}
    />
  );
}
