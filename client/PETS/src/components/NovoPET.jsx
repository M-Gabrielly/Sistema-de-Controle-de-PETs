import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { MensagemAPI } from "../context/MensagemAPI";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Dog, Cat } from 'lucide-react';

function NovoPET() {
  const navigate = useNavigate();
  const { showMessage } = MensagemAPI();
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    especie: '',
    status: '',
    dono_id: '',
  });

  useEffect(() => {
    fetch("api/listar_clientes")
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(data => {
        console.log(data)
        setClientes(data.clientes);
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.nome || !formData.idade || !formData.especie || !formData.status || !formData.dono_id) {
      showMessage('Por favor, preencha todos os campos!', 'error');
      return;
    }

    const petData = {
        nome: formData.nome,
        idade: formData.idade,
        especie: formData.especie,
        status: formData.status,
        dono_id: formData.dono_id
    };

    fetch("api/criar_pet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(petData)
    })
    .then(async res => {
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`${data.message}`);
        }

        showMessage("PET cadastrado com sucesso!", "success");
        return data;
    })
    .then(newData => {
        console.log("Resposta do servidor:", newData);
        setTimeout(() => {
          navigate('/');
        }, 1000);
    })
    .catch(err => {
        showMessage(`Falha ao cadastrar PET: ${err.message}`, "error");
        console.error(err)
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos de patas no background */}
      <div className="absolute top-40 right-20 opacity-5 pointer-events-none -rotate-12">
        <svg width="100" height="100" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="80" rx="25" ry="35" fill="#4CAF50"/>
          <ellipse cx="35" cy="35" rx="15" ry="20" fill="#4CAF50"/>
          <ellipse cx="60" cy="25" rx="15" ry="20" fill="#4CAF50"/>
          <ellipse cx="85" cy="35" rx="15" ry="20" fill="#4CAF50"/>
          <ellipse cx="45" cy="50" rx="12" ry="16" fill="#4CAF50"/>
        </svg>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Cadastrar Novo PET</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Digite o nome do PET"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="idade">Idade</Label>
                    <Input
                      id="idade"
                      type="number"
                      min="0"
                      placeholder="Digite a idade em anos"
                      value={formData.idade}
                      onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="especie">Espécie</Label>
                    <Input
                      id="especie"
                      type="text"
                      placeholder="Ex: Cachorro, Gato, etc."
                      value={formData.especie}
                      onChange={(e) => setFormData({ ...formData, especie: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aguardando atendimento">Aguardando atendimento</SelectItem>
                        <SelectItem value="Em consulta">Em consulta</SelectItem>
                        <SelectItem value="Atendido">Atendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="cliente">Selecionar Dono</Label>
                    <Select
                      value={formData.dono_id}
                      onValueChange={(value) => setFormData({ ...formData, dono_id: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o dono" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.id.toString()}>
                            {cliente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
                  >
                    Cadastrar PET
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Ilustração decorativa */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#4CAF50]/10 to-[#2196F3]/10 p-8 rounded-2xl shadow-md relative overflow-hidden">
                {/* Mini pata decorativa */}
                <div className="absolute top-2 right-2 opacity-20">
                  <svg width="30" height="30" viewBox="0 0 120 120" fill="none">
                    <ellipse cx="60" cy="80" rx="25" ry="35" fill="#4CAF50"/>
                    <ellipse cx="35" cy="35" rx="15" ry="20" fill="#4CAF50"/>
                  </svg>
                </div>
                <Dog className="w-32 h-32 text-[#4CAF50] mx-auto mb-4" />
                <p className="text-center text-gray-600">Cadastre seu amigo</p>
              </div>
              <div className="bg-gradient-to-br from-[#2196F3]/10 to-[#4CAF50]/10 p-8 rounded-2xl shadow-md relative overflow-hidden">
                {/* Mini pata decorativa */}
                <div className="absolute top-2 right-2 opacity-20">
                  <svg width="30" height="30" viewBox="0 0 120 120" fill="none">
                    <ellipse cx="60" cy="80" rx="25" ry="35" fill="#2196F3"/>
                    <ellipse cx="35" cy="35" rx="15" ry="20" fill="#2196F3"/>
                  </svg>
                </div>
                <Cat className="w-32 h-32 text-[#2196F3] mx-auto mb-4" />
                <p className="text-center text-gray-600">Com muito carinho</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NovoPET