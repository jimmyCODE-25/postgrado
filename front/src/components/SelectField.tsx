import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  isRequired?: boolean;
  options: { value: string | number; label: string }[];
}

export default function SelectField({
  label,
  name,
  isRequired,
  options,
  ...props
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        className={cn(
          "w-full px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
