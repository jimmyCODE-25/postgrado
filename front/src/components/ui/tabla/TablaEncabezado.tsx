import { cn } from "@/lib/utils";

export function TablaEncabezado({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}
