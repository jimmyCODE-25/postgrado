interface FormHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function FormHeader({ title, subtitle, icon }: FormHeaderProps) {
  return (
    <div className="mb-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-indigo-600 font-medium">{subtitle}</p>
    </div>
  );
}
