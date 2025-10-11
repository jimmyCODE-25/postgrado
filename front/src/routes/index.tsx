import { createFileRoute } from "@tanstack/react-router";
import {
  AwardIcon,
  BookOpenIcon,
  GraduationCapIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: PersonaComponent,
});

function PersonaComponent() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenido Hero */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-500 bg-opacity-20 rounded-full border border-blue-400 border-opacity-30">
                  <span className="text-blue-300 text-sm font-semibold">
                    Excelencia Académica
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Dirección General de
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Postgrado
                  </span>
                </h1>
                <p className="text-xl text-slate-300 max-w-lg">
                  Plataforma integral para la gestión académica y administrativa
                  de programas de postgrado. Acceso a formación de calidad
                  mundial desde nuestra universidad.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <AwardIcon className="size-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Programas Acreditados
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Maestrías y doctorados reconocidos internacionalmente
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <GraduationCapIcon className="size-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Gestión Integral
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Sistema completo para estudiantes, docentes y
                      administrativos
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                    <ZapIcon className="size-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Tecnología Avanzada
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Plataforma moderna con seguridad y eficiencia garantizadas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
                <img
                  src="/cover.webp"
                  alt="Campus Universitario"
                  className="w-full h-96 object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-4 text-white font-semibold shadow-2xl">
                  <p className="text-sm">+50 Años</p>
                  <p className="text-xs opacity-90">de excelencia académica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">
                45+
              </div>
              <p className="text-slate-300">Programas de Postgrado</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">
                8,500+
              </div>
              <p className="text-slate-300">Estudiantes Activos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">
                250+
              </div>
              <p className="text-slate-300">Docentes Especializados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">
                15,000+
              </div>
              <p className="text-slate-300">Graduados Exitosos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programas Destacados */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Programas Destacados
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Conoce nuestras principales ofertas académicas en postgrado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Maestría en Administración",
                desc: "Programa integral para formar líderes empresariales",
                icon: UsersIcon,
                duration: "2 años",
              },
              {
                title: "Doctorado en Ingeniería",
                desc: "Investigación de excelencia en ingeniería aplicada",
                icon: BookOpenIcon,
                duration: "3-4 años",
              },
              {
                title: "Especialización en Derecho",
                desc: "Formación especializada en diversas ramas legales",
                icon: AwardIcon,
                duration: "1.5 años",
              },
            ].map((prog, idx) => {
              const IconComponent = prog.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                      <IconComponent className="size-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                      {prog.title}
                    </h3>
                    <p className="text-slate-400">{prog.desc}</p>
                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-sm text-blue-400 font-semibold">
                        Duración: {prog.duration}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
