import { XCircleIcon } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
      <p className="text-red-600 text-sm font-medium text-center flex items-center justify-center">
        <XCircleIcon className="size-5 mr-2" />
        Error: {message}
      </p>
    </div>
  );
}
