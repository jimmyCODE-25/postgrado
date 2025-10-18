import { Link } from "@tanstack/react-router";
import {
  GraduationCapIcon,
  HomeIcon,
  ListTodoIcon,
  UsersIcon,
} from "lucide-react";

const linkStyle =
  "group flex text-sm items-center gap-2 py-2 px-4 bg-secundario-acentado/10 hover:bg-secundario-acentado/20 text-secundario-acentado font-medium transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-secundario-acentado/20 backdrop-blur-sm";

export default function Navbar() {
  return (
    <nav className="bg-secundario shadow-xl shadow-secundario/20">
      <div className="max-w-7xl mx-auto p-4 flex flex-col items-center gap-4">
        <img
          className="w-[400px] md:w-[500px]"
          src="/logo.png"
          alt="Logo UAGRM"
        />
        <div className="flex items-center gap-4">
          <Link className={linkStyle} to="/">
            <HomeIcon className="size-5" />
            <span>Inicio</span>
          </Link>
          <Link className={linkStyle} to="/persona">
            <UsersIcon className="size-5" />
            <span>Persona</span>
          </Link>
          <Link className={linkStyle} to="/plan_formacion">
            <GraduationCapIcon className="size-5" />
            <span>Plan Formación</span>
          </Link>
          <Link className={linkStyle} to="/actividad">
            <ListTodoIcon className="size-5" />
            <span>Actividad</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
