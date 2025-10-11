import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isRequired?: boolean;
}

export default function InputField({
  label,
  name,
  isRequired,
  ...props
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        className={cn(
          "w-full px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
        )}
        {...props}
      />
    </div>
  );
}
