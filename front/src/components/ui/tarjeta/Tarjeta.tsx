import { cn } from "@/lib/utils";

export function Tarjeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-fondo text-acentado flex flex-col gap-6 rounded-xl border border-acentado/20 py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}
