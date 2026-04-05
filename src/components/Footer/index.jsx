import Logo from "../Logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* ─── Main footer ─── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Coluna 1 — Logo + Descrição */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 bg-white/10 rounded-xl p-2">
                <Logo size={48} />
              </div>
              <p className="text-white text-lg font-bold">
                Sistema de Distribuição de Fraldas
              </p>
            </div>
            <p className="text-gray-400 text-[15px] leading-relaxed max-w-md">
              Gerenciamento da distribuição de fraldas da Secretaria Municipal de Saúde,
              cuidando com dignidade e eficiência dos benefícios concedidos
              pela administração pública.
            </p>
          </div>

          {/* Coluna 2 — Sistema */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Sistema
            </h4>
            <ul className="space-y-3 text-[15px]">
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors duration-200">
                  Entrar no Sistema
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Contato */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Contato
            </h4>
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt mt-1 text-blue-400 w-4" />
                <span>Sede da Prefeitura Municipal</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-blue-400 w-4" />
                <span>saude@municipio.gov.br</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone text-blue-400 w-4" />
                <span>(00) 0000-0000</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-gray-800/80" />
      </div>

      {/* ─── Bottom bar ─── */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()} Secretaria Municipal de Saúde — Todos os direitos reservados
        </p>
        <p className="flex items-center gap-1.5">
          Desenvolvido com
          <span className="text-red-500 text-sm">♥</span>
          para uma gestão mais humana
        </p>
      </div>
    </footer>
  );
}
