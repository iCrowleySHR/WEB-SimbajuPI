import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../../components/Logo";
import { useAuth } from "../../../hook/useAuth";
import { useUser } from "../../../contexts/UserContext";
import { useLoading } from "../../../contexts/LoadingContext";
import routeTable from "../../../utils/routeTable";
import translate from "../../../utils/translate";

export default function NavBarAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const { user } = useUser();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (!userLoaded) {
      showLoading();
      if (user) {
        setUserLoaded(true);
        hideLoading();
      }
    }
  }, [user, userLoaded, showLoading, hideLoading]);

  // fecha o menu quando muda de rota
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!userLoaded) return null;

  const configRoute = user?.role
    ? `${routeTable(user.role)}/configuracoes`
    : "/configuracoes";

  const homeRoute = user?.role
    ? `/${translate(user.role).toLowerCase()}`
    : "/";

  return (
    <header className="bg-white shadow-md border-b border-gray-200 pt-6 md:pt-0">
      <div className="max-w-9/10 mx-auto py-3 flex justify-between items-center">
        <Link to={homeRoute} className="flex items-center space-x-3">
          <Logo size={40} />
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 ml-3 ">
            Sistema de Distribuição de Fraldas
          </h1>
        </Link>

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

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-md"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <Link
            to={configRoute}
            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
          >
            Configurações
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-500 transition-colors font-medium"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}