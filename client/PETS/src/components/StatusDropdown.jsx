import { useState } from "react"
import { MensagemAPI } from '../context/MensagemAPI';

function StatusDropdown(received) {
  const { showMessage } = MensagemAPI();

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(received.status)
  const petId = received.id;

  const handleSelect = (value) => {
    setStatus(value)
    setOpen(false)
    
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
      // erro requisição
      const data = await res.json();
      
      if (!res.ok) {
        // throw new Error(`Erro ${res.status}: ${data.message}`);
        throw new Error(`${data.message}`);
      }
      
      return data;
    })
    .then(responseData  => {
      //deu tudo certo
      showMessage("Status editado com sucesso!", "success");
      console.log("Resposta do servidor:", responseData );
    })
    // mostra erro
    .catch(err => {
        showMessage(`Erro ao editar status: ${err.message}`, "error");
        console.error(err)
    });
  }

  return (
    <div className="dropdown">
      <button
        type="button"
        className="dropdown-btn"
        onClick={() => setOpen(!open)}
        style={{
            backgroundColor:
            status === 'Atendido'
                ? '#d4edda' // verde claro
                : status === 'Aguardando atendimento'
                ? '#fff3cd' // amarelo claro
                : '#d0e4ff', // azul
            color:
            status === 'Atendido'
                ? '#155724'
                : status === 'Aguardando atendimento'
                ? '#856404'
                : '#007bff'
        }}
      >
        <span>{status}</span>
        <i className={`arrow ${open ? "up" : "down"}`}></i>
      </button>

      {open && (
        <div className="dropdown-menu">
          <span className="dropdown-item status-atendido" onClick={() => handleSelect("Atendido")}>
            Atendido
          </span>
          <span className="dropdown-item status-aguardando" onClick={() => handleSelect("Aguardando atendimento")}>
            Aguardando atendimento
          </span>
          <span className="dropdown-item status-consulta" onClick={() => handleSelect("Em consulta")}>
            Em consulta
          </span>
        </div>
      )}
    </div>
  )
}

export default StatusDropdown