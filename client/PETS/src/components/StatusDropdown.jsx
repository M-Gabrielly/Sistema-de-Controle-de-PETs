import { useState } from 'react';
import { Check, Clock, Stethoscope, ChevronDown } from 'lucide-react';
import { MensagemAPI } from '../context/MensagemAPI';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const statusConfig = {
  'Aguardando atendimento': {
    bg: 'bg-[#fff3cd]',
    text: 'text-[#856404]',
    Icon: Clock,
  },
  'Em consulta': {
    bg: 'bg-[#d0e4ff]',
    text: 'text-[#007bff]',
    Icon: Stethoscope,
  },
  'Atendido': {
    bg: 'bg-[#d4edda]',
    text: 'text-[#155724]',
    Icon: Check,
  },
};

function StatusDropdown(received) {
  const { showMessage } = MensagemAPI();

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(received.status);
  const petId = received.id;

  const config = statusConfig[status];
  const Icon = config?.Icon || Clock;

  const handleSelect = (value) => {
    setStatus(value);
    setOpen(false);
    
    const petData = {
      id: petId,
      status: value
    };

    fetch("api/atualiza_status", {
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
      
      return data;
    })
    .then(responseData  => {
      showMessage("Status editado com sucesso!", "success");
      console.log("Resposta do servidor:", responseData);
    })
    .catch(err => {
        showMessage(`Erro ao editar status: ${err.message}`, "error");
        console.error(err);
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`${config?.bg || 'bg-gray-100'} ${config?.text || 'text-gray-700'} px-3 py-2 rounded-xl flex items-center gap-2 hover:opacity-80 transition-opacity w-full justify-between shadow-sm`}
        >
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{status}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleSelect('Aguardando atendimento')}
        >
          <Clock className="w-4 h-4 mr-2 text-[#856404]" />
          <span>Aguardando atendimento</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleSelect('Em consulta')}
        >
          <Stethoscope className="w-4 h-4 mr-2 text-[#007bff]" />
          <span>Em consulta</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleSelect('Atendido')}
        >
          <Check className="w-4 h-4 mr-2 text-[#155724]" />
          <span>Atendido</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StatusDropdown;