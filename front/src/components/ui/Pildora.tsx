import { cn } from "@/lib/utils";

export function Pildora({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl border-3 border-primario/40 px-4 py-2 text-sm font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-2 [&>svg]:pointer-events-none overflow-hidden",
        className
      )}
      {...props}
    />
  );
}
