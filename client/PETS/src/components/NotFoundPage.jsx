import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Dog, Home } from 'lucide-react';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos de patas no background */}
      <div className="absolute top-40 right-32 opacity-5 pointer-events-none">
        <svg width="80" height="80" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="80" rx="25" ry="35" fill="#4CAF50"/>
          <ellipse cx="35" cy="35" rx="15" ry="20" fill="#4CAF50"/>
          <ellipse cx="60" cy="25" rx="15" ry="20" fill="#4CAF50"/>
          <ellipse cx="85" cy="35" rx="15" ry="20" fill="#4CAF50"/>
        </svg>
      </div>
      <div className="absolute bottom-40 left-32 opacity-5 pointer-events-none rotate-180">
        <svg width="80" height="80" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="80" rx="25" ry="35" fill="#2196F3"/>
          <ellipse cx="35" cy="35" rx="15" ry="20" fill="#2196F3"/>
          <ellipse cx="60" cy="25" rx="15" ry="20" fill="#2196F3"/>
          <ellipse cx="85" cy="35" rx="15" ry="20" fill="#2196F3"/>
        </svg>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Ilustração de pet perdido */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#2196F3]/20 w-64 h-64 rounded-full flex items-center justify-center shadow-lg">
              <Dog className="w-32 h-32 text-gray-400" />
            </div>
            <div className="absolute top-0 right-0 bg-white px-4 py-2 rounded-full shadow-md transform rotate-12">
              <span className="text-4xl font-bold text-gray-600">?</span>
            </div>
            {/* Patas decorativas ao redor */}
            <div className="absolute -bottom-4 -left-4 opacity-30">
              <svg width="40" height="40" viewBox="0 0 120 120" fill="none">
                <ellipse cx="60" cy="80" rx="25" ry="35" fill="#4CAF50"/>
                <ellipse cx="35" cy="35" rx="15" ry="20" fill="#4CAF50"/>
              </svg>
            </div>
            <div className="absolute -top-4 -right-4 opacity-30 rotate-90">
              <svg width="40" height="40" viewBox="0 0 120 120" fill="none">
                <ellipse cx="60" cy="80" rx="25" ry="35" fill="#2196F3"/>
                <ellipse cx="35" cy="35" rx="15" ry="20" fill="#2196F3"/>
              </svg>
            </div>
          </div>

          {/* Mensagem */}
          <div className="space-y-4">
            <h1 className="text-gray-900">404 - Página não encontrada</h1>
            <p className="text-gray-600 text-lg max-w-md">
              Ops! Parece que este pet se perdeu... A página que você está procurando não existe.
            </p>
          </div>

          {/* Botão */}
          <Button
            onClick={() => navigate('/')}
            className="bg-[#4CAF50] hover:bg-[#45a049] text-white gap-2"
          >
            <Home className="w-5 h-5" />
            Voltar para Home
          </Button>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage