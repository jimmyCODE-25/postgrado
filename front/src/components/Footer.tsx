import {
  ClockIcon,
  GraduationCapIcon,
  MailIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 bg-secundario px-4 sm:px-6 lg:px-8 border-t border-secundario">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secundario-acentado flex items-center gap-2">
              <GraduationCapIcon className="size-7 text-secundario-acentado" />
              Sobre Nosotros
            </h3>
            <p className="text-secundario-acentado">
              La Dirección General de Postgrado es la responsable de coordinar,
              supervisar y evaluar todos los programas de formación avanzada de
              nuestra institución, asegurando estándares de calidad académica
              reconocidos internacionalmente.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secundario-acentado flex items-center gap-2">
              <MailIcon className="size-7 text-secundario-acentado" />
              Contacto
            </h3>
            <div className="space-y-3 text-secundario-acentado">
              <div className="flex items-center gap-3">
                <MapPinIcon className="size-5 text-secundario-acentado flex-shrink-0" />
                <p>Campus Principal - Edificio de Postgrado</p>
              </div>
              <a
                href="mailto:postgrado@universidad.edu.bo"
                className="flex items-center gap-3"
              >
                <MailIcon className="size-5 text-secundario-acentado flex-shrink-0" />
                <p>postgrado@universidad.edu.bo</p>
              </a>
              <div className="flex items-center gap-3">
                <UsersIcon className="size-5 text-secundario-acentado flex-shrink-0" />
                <p>+591 73651436</p>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="size-5 text-secundario-acentado flex-shrink-0" />
                <p>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                <p>Sábado: 8:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
