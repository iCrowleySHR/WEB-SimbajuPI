import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Logo e título */}
        <div className="flex flex-col items-center mb-4 space-y-2">
          <Logo size={80} />
          <p className="text-lg font-semibold">Secretaria Municipal de Saúde</p>
        </div>

        {/* Slogan */}
        <p className="text-gray-400 text-sm sm:text-base">
          Sistema de Distribuição de Fraldas - Cuidando com dignidade
        </p>

        {/* Linha divisória e direitos */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            © 2025 - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
