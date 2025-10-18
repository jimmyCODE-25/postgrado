import { cn } from "@/lib/utils";

export function Tabla({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-x-auto rounded-2xl shadow-xl border border-primario/20">
      <table
        className={cn("w-full caption-top text-sm", className)}
        {...props}
      />
    </div>
  );
}
