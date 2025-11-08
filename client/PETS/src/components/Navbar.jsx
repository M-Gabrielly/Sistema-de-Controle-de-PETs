import { Link, useLocation } from 'react-router-dom';
import { PawPrint, Bell } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo e Nome */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-[#4CAF50] to-[#2196F3] p-2 rounded-xl shadow-md">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">VetCare System</span>
          </Link>

          {/* Navegação */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'text-[#4CAF50]' 
                  : 'text-gray-600 hover:text-[#4CAF50]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/Novo"
              className={`text-base font-medium transition-colors ${
                isActive('/Novo') 
                  ? 'text-[#4CAF50]' 
                  : 'text-gray-600 hover:text-[#4CAF50]'
              }`}
            >
              Novo PET
            </Link>
            <Link
              to="/Usuario"
              className={`text-base font-medium transition-colors ${
                isActive('/Usuario') 
                  ? 'text-[#4CAF50]' 
                  : 'text-gray-600 hover:text-[#4CAF50]'
              }`}
            >
              Novo Cliente
            </Link>
            
            {/* Ícone de Notificações */}
            <button className="p-2 text-gray-600 hover:text-[#4CAF50] hover:bg-gray-100 rounded-lg transition-all">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;