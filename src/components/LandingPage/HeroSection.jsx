import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-bg bg- text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <i className="fas fa-heartbeat text-6xl mb-6 text-blue-200"></i>
          <h1 className="text-5xl font-bold mb-6">Sistema de Distribuição de Fraldas</h1>
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
