import { Link } from "@tanstack/react-router";
import { GraduationCapIcon, HomeIcon, UsersIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-red-800 shadow-xl shadow-red-900/20">
      <div className="max-w-7xl mx-auto p-4 flex flex-col items-center gap-4">
        <img
          className="w-[400px] md:w-[500px]"
          src="/logo.png"
          alt="Logo UAGRM"
        />
        <div className="flex items-center gap-4">
          <Link
            className="group flex text-sm items-center gap-2 py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20 backdrop-blur-sm"
            to="/"
          >
            <HomeIcon className="size-5" />
            <span>Inicio</span>
          </Link>
          <Link
            className="group flex text-sm items-center gap-2 py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20 backdrop-blur-sm"
            to="/persona"
          >
            <UsersIcon className="size-5" />
            <span>Persona</span>
          </Link>
          <Link
            className="group flex text-sm items-center gap-2 py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20 backdrop-blur-sm"
            to="/plan_formacion"
          >
            <GraduationCapIcon className="size-5" />
            <span>Plan Formación</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
