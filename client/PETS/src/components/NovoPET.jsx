import { useState } from "react"
import { MensagemAPI } from "../context/MensagemAPI";

function NovoPET() {
    const { showMessage } = MensagemAPI();

    const handleSubmit = (e) => {
    e.preventDefault()
    const nome = e.target.nome.value;
    const idade = e.target.idade.value;
    const especie = e.target.especie.value;
    const status = e.target.status.value;

    const petData = {
        nome: nome,
        idade: idade,
        especie: especie,
        status: status
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
            // throw new Error(`Erro ${res.status}: ${data.message}`);
            throw new Error(`${data.message}`);
        }

        showMessage("PET cadastrado com sucesso!", "success");
        
        return data;
    })
    .then(newData => {
        // Deu tudo certo
        console.log("Resposta do servidor:", newData);
    })
    .catch(err => {
        showMessage(`Falha ao cadastrar PET: ${err.message}`, "error");
        console.error(err)
    });

    e.target.reset()
}

  return (
    <div className="content">
        <div id="box-content">
            <h2>Cadastra PET</h2>

          <form onSubmit={handleSubmit} id='cadastroPet'>
            <label>
              Nome:
              <input id='nome' name='nome' />
            </label>
            <label>
              Idade:
              <input id='idade' name='idade' />
            </label>
            <label>
              Espécie:
              <input id='especie' name='especie' />
            </label>
            <label>
              Status:
              <select id='status' name='status'>
                <option value=""></option>
                <option value="Aguardando atendimento">Aguardando atendimento</option>
                <option value="Em consulta">Em consulta</option>
                <option value="Atendido">Atendido</option>
              </select>
            </label>
            <button type='submit'>Cadastrar PET!</button>
          </form>
        </div>
    </div>
  )
}

export default NovoPET