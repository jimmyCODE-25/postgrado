import { cn } from "@/lib/utils";

export function TarjetaEncabezado({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}
