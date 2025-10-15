import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";

export default function NavBarLandingPage() {
  return (
    <header className="bg-white shadow-md border-b border-blue-600">
      <div className="max-w-9/10 mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo e título */}
        <Link to="/" className="flex items-center space-x-3">
          <Logo size={40} />
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 ml-4">
            Sistema de Distribuição de Fraldas
          </h1>
        </Link>    
      </div>
    </header>
  );
}
