import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-55">
      {/* Luz de fundo animada */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_70%)]"></div>

      {/* Partículas suaves */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative container mx-auto px-6 flex flex-col justify-center items-center text-center z-10">
        <Logo className="mx-auto w-36 h-auto drop-shadow-lg" size={160} />

        <h1 className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-sm">
          Sistema de Distribuição de Fraldas
        </h1>

        <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl">
          Secretaria Municipal de Saúde — Cuidando com dignidade e eficiência
        </p>

        <Link to="/login" className="mt-10 inline-block">
          <button
            className="
              relative px-10 py-4 rounded-xl font-semibold text-lg
              bg-white text-blue-700 shadow-lg shadow-blue-900/20
              hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50
              hover:shadow-xl hover:-translate-y-0.5
              transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-blue-300/40 cursor-pointer
            "
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Acessar Sistema
          </button>
        </Link>
      </div>

      {/* Forma decorativa */}
      <svg
        className="absolute bottom-0 left-0 w-full text-white"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity="0.05"
          d="M0,96L80,117.3C160,139,320,181,480,213.3C640,245,800,267,960,245.3C1120,224,1280,160,1360,128L1440,96V320H0Z"
        ></path>
      </svg>
    </section>
  );
}
