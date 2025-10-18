import { cn } from "@/lib/utils";

export function TarjetaContenido({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("px-6", className)} {...props} />;
}
