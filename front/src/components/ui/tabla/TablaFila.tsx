import { cn } from "@/lib/utils";

export function TablaFila({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "hover:bg-mutado/50 data-[state=selected]:bg-mutado border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}
