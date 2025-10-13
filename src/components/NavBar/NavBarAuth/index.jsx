import { useContext, useState } from "react";
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
    <header className="bg-white shadow-lg border-b-4 border-blue-600">
      <div className="max-w-9/10 mx-auto px-4 py-4 flex justify-between items-center">

        <Link to="/" className="flex items-center space-x-3">
          <Logo size={50} />
          <h1 className="ml-5 text-xl font-bold text-gray-800 cursor-pointer">
            Sistema de Distribuição de Fraldas
          </h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to={configRoute}
            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            Configurações
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-700 hover:text-red-600 transition-colors cursor-pointer"
          >
            Sair
          </button>
        </nav>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <Link
            to={configRoute}
            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Configurações
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
