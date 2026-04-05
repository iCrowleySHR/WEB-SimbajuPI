import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white min-h-[85vh] flex items-center">
      {/* ─── Decorative background ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_70%)]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-[20%] w-72 h-72 bg-blue-400/10 rounded-full blur-3xl float-slow" />
      <div className="absolute bottom-1/3 right-[25%] w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl float-med" />
      <div className="absolute top-1/2 right-[40%] w-64 h-64 bg-cyan-300/8 rounded-full blur-3xl float-fast" />

      <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      {/* ─── Content ─── */}
      {/* z-20 garante que o conteúdo fique acima da wave */}
      <div className="relative container mx-auto px-6 text-center z-20 py-12 pb-28">
        <div className="reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-medium tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Portal Oficial da Secretaria Municipal de Saúde
          </div>
        </div>

        <div className="reveal-up delay-1">
          <Logo className="mx-auto w-40 h-auto drop-shadow-lg" size={160} />
        </div>

        <div className="reveal-up delay-2">
          <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-sm max-w-4xl mx-auto">
            Sistema de Distribuição{" "}
            de Fraldas
          </h1>
        </div>

        <div className="reveal-up delay-3">
          <p className="mt-5 text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Cuidando com dignidade e eficiência — agende, acompanhe e gerencie
            a distribuição de fraldas. Exclusivo para beneficiários e profissionais de Franco da Rocha. 
          </p>
        </div>

        {/* Feature pills */}
        <div className="reveal-up delay-3">
          <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm text-blue-100/80">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
              <i className="fas fa-calendar-check mr-1" /> Agendamento Online
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
              <i className="fas fa-bell mr-1" /> Notificações por E-mail
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
              <i className="fas fa-shield-halved mr-1" /> 100% Seguro
            </span>
          </div>
        </div>

        <div className="reveal-up delay-4">
          <Link to="/login" className="mt-10 inline-block">
            <button className="group relative px-10 py-4 rounded-xl font-semibold text-lg bg-white text-blue-700 shadow-lg shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/40 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/40 cursor-pointer overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center">
                <i className="fas fa-sign-in-alt mr-2 group-hover:rotate-6 transition-transform" />
                Acessar Sistema
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* ─── Bottom wave ─── */}
      {/* z-10 (abaixo do conteúdo z-20), cola perfeitamente no fundo */}
      <svg
        className="absolute bottom-0 left-0 w-full text-white z-10"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}