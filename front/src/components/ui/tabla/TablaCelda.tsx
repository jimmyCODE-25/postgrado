import { cn } from "@/lib/utils";

export function TablaCelda({
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-6 py-4",
        className
      )}
      {...props}
    />
  );
}
