import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function HeroSection() {
  return (
    <section className="hero-bg text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col justify-center content-center max-w-4xl mx-auto text-center">
          <Logo className="mx-auto w-32 h-auto" size={150} />
          <h1 className="text-5xl font-bold mb-6">
            Sistema de Distribuição de Fraldas
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Secretaria Municipal de Saúde - Cuidando com dignidade e eficiência
          </p>
          <Link to="/login">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg cursor-pointer">
              <i className="fas fa-sign-in-alt mr-2"></i>Acessar Sistema
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}