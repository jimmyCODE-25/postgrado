import { cn } from "@/lib/utils";
import { LoaderPinwheelIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

export default function Button({ children, isLoading, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={isLoading}
      className={cn(
        "flex flex-col items-center justify-center w-full py-3.5 px-4 text-white font-semibold rounded-xl transition-all transform shadow-lg bg-indigo-500 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5",
        { "bg-gray-400 cursor-not-allowed": isLoading }
      )}
      {...props}
    >
      {isLoading ? (
        <LoaderPinwheelIcon className="animate-spin size-5 text-white" />
      ) : (
        children
      )}
    </button>
  );
}
