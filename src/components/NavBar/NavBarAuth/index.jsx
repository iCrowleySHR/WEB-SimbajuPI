import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../components/Logo";
import { useAuth } from "../../../hook/useAuth";
import { useUser } from "../../../contexts/UserContext";
import routeTable from "../../../utils/routeTable";

export default function NavBarAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const configRoute = user ? `${routeTable(user.role)}/configuracoes` : "/configuracoes";

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-9/10 mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo e título */}
        <Link to="/" className="flex items-center space-x-3">
          <Logo size={40} />
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 ml-3">
            Sistema de Distribuição de Fraldas
          </h1>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-5">
          <Link
            to={configRoute}
            className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium"
          >
            Configurações
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-lg text-red-600 hover:text-red-500 hover:bg-red-50 transition-colors font-medium"
          >
            Sair
          </button>
        </nav>

        {/* Botão Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-md"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <Link
            to={configRoute}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
          >
            Configurações
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-500 transition-colors font-medium"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
