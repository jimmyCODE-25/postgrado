import { cn } from "@/lib/utils";

export function TarjetaTitulo({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("leading-none font-bold text-3xl", className)}
      {...props}
    />
  );
}
