import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MensagemAPI } from "../context/MensagemAPI";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { User, Heart } from 'lucide-react';

function NovoUsuario() {
  const navigate = useNavigate();
  const { showMessage } = MensagemAPI();
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
  });

  const formatTelefone = (value) => {
    // Remove tudo que não é dígito
    const cleaned = value.replace(/\D/g, '');
    
    // Aplica máscara (XX) XXXXX-XXXX
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatTelefone(e.target.value);
    setFormData({ ...formData, telefone: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.nome || !formData.telefone) {
      showMessage('Por favor, preencha todos os campos!', 'error');
      return;
    }

    const usuarioData = {
        nome: formData.nome,
        telefone: formData.telefone,
    };

    fetch("api/criar_cliente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioData)
    })
    .then(async res => {
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

        showMessage("Cliente cadastrado com sucesso!", "success");
        
        return data;
    })
    .then(newData => {
        console.log("Resposta do servidor:", newData);
        setTimeout(() => {
          navigate('/');
        }, 1000);
    })
    .catch(err => {
        showMessage(`Falha ao cadastrar cliente: ${err.message}`, "error");
        console.error(err)
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos de patas no background */}
      <div className="absolute top-32 left-20 opacity-5 pointer-events-none rotate-45">
        <svg width="90" height="90" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="80" rx="25" ry="35" fill="#2196F3"/>
          <ellipse cx="35" cy="35" rx="15" ry="20" fill="#2196F3"/>
          <ellipse cx="60" cy="25" rx="15" ry="20" fill="#2196F3"/>
          <ellipse cx="85" cy="35" rx="15" ry="20" fill="#2196F3"/>
          <ellipse cx="45" cy="50" rx="12" ry="16" fill="#2196F3"/>
        </svg>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Cadastrar Novo Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Digite o nome completo"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={handleTelefoneChange}
                      maxLength={15}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
                  >
                    Cadastrar Cliente
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Ilustração decorativa */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#4CAF50]/10 to-[#2196F3]/10 p-12 rounded-2xl shadow-md relative overflow-hidden">
                {/* Mini patas decorativas */}
                <div className="absolute top-2 left-2 opacity-20">
                  <svg width="25" height="25" viewBox="0 0 120 120" fill="none">
                    <ellipse cx="60" cy="80" rx="25" ry="35" fill="#4CAF50"/>
                    <ellipse cx="35" cy="35" rx="15" ry="20" fill="#4CAF50"/>
                  </svg>
                </div>
                <div className="absolute bottom-2 right-2 opacity-20 rotate-180">
                  <svg width="25" height="25" viewBox="0 0 120 120" fill="none">
                    <ellipse cx="60" cy="80" rx="25" ry="35" fill="#2196F3"/>
                    <ellipse cx="35" cy="35" rx="15" ry="20" fill="#2196F3"/>
                  </svg>
                </div>
                <div className="relative">
                  <User className="w-24 h-24 text-[#4CAF50] mx-auto" />
                  <Heart className="w-8 h-8 text-[#2196F3] absolute -bottom-2 -right-2 fill-current" />
                </div>
              </div>
              <p className="text-center text-gray-600 px-4">
                Cadastre novos clientes e seus pets com facilidade
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NovoUsuario