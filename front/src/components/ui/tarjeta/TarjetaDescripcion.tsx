import { cn } from "@/lib/utils";

export function TarjetaDescripcion({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-primario font-semibold text-md", className)}
      {...props}
    />
  );
}
