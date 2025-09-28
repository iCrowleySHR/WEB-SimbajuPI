import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBarAuth() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-600">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <i className="fas fa-heartbeat text-blue-600 text-2xl"></i>
          <h1 className="text-xl font-bold text-gray-800">
            Sistema de Distribuição de Fraldas
          </h1>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/configuracoes"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Configurações
          </Link>
          <button
            onClick={() => console.log("Logout")}
            className="text-red-700 hover:text-red-600 transition-colors"
          >
            Sair
          </button>
        </nav>

        {/* Menu hamburguer mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <Link
            to="/configuracoes"
            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Configurações
          </Link>
          <button
            onClick={() => {
              console.log("Logout");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-red-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
