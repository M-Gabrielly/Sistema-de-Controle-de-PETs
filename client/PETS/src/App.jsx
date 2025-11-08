import { useState, useEffect } from 'react'
import StatusDropdown from './components/StatusDropdown';
import { Loader2 } from 'lucide-react';

function App() {
  
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("api/listar_pets")
      .then(res => res.json())
      .then(data => {
        setData(data); 
        console.log(data)
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos de patas no background */}
      <div className="absolute top-20 right-10 opacity-5 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="80" rx="25" ry="35" fill="#4CAF50"/>
          <ellipse cx="35" cy="35" rx="15" ry="20" fill="#4CAF50"/>
          <ellipse cx="60" cy="25" rx="15" ry="20" fill="#4CAF50"/>
          <ellipse cx="85" cy="35" rx="15" ry="20" fill="#4CAF50"/>
          <ellipse cx="45" cy="50" rx="12" ry="16" fill="#4CAF50"/>
        </svg>
      </div>
      <div className="absolute bottom-32 left-10 opacity-5 pointer-events-none rotate-12">
        <svg width="100" height="100" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="80" rx="25" ry="35" fill="#2196F3"/>
          <ellipse cx="35" cy="35" rx="15" ry="20" fill="#2196F3"/>
          <ellipse cx="60" cy="25" rx="15" ry="20" fill="#2196F3"/>
          <ellipse cx="85" cy="35" rx="15" ry="20" fill="#2196F3"/>
          <ellipse cx="45" cy="50" rx="12" ry="16" fill="#2196F3"/>
        </svg>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Lista de PETs</h1>
          <p className="text-gray-600">Gerencie o atendimento de todos os animais cadastrados</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-md">
            <Loader2 className="w-8 h-8 text-[#4CAF50] animate-spin mb-4" />
            <p className="text-gray-600">Carregando...</p>
          </div>
        ) : typeof data.pets === 'undefined' ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-md">
            <p className="text-gray-600">Nenhum PET cadastrado</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-900 font-semibold">Nome do PET</th>
                    <th className="text-left py-3 px-4 text-gray-900 font-semibold">Idade</th>
                    <th className="text-left py-3 px-4 text-gray-900 font-semibold">Espécie</th>
                    <th className="text-left py-3 px-4 text-gray-900 font-semibold">Nome do Dono</th>
                    <th className="text-left py-3 px-4 text-gray-900 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pets.map((pet, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-gray-700">{pet.nome}</td>
                      <td className="py-3 px-4 text-gray-700">
                        {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{pet.especie}</td>
                      <td className="py-3 px-4 text-gray-700">{pet.dono?.nome || ""}</td>
                      <td className="py-3 px-4">
                        <div className="w-64">
                          <StatusDropdown status={pet.status} id={pet.id}/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
