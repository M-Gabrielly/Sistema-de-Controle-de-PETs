import { useState, useEffect } from "react"
import { MensagemAPI } from "../context/MensagemAPI";

function NovoUsuario() {
  const { showMessage } = MensagemAPI();

  const handleSubmit = (e) => {
    e.preventDefault()
    const nome = e.target.nome.value;
    const telefone = e.target.telefone.value;

    const usuarioData = {
        nome: nome,
        telefone: telefone,
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
            // throw new Error(`Erro ${res.status}: ${data.message}`);
            throw new Error(`${data.message}`);
        }

        showMessage("Cliente cadastrado com sucesso!", "success");
        
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
            <h2>Cadastra Cliente</h2>

          <form onSubmit={handleSubmit} id='cadastroPet'>
            <label>
              Nome:
              <input id='nome' name='nome' />
            </label>
            <label>
              Telefone:
              <input id='telefone' name='telefone' />
            </label>
            <button type='submit'>Cadastrar Cliente!</button>
          </form>
        </div>
    </div>
  )
}

export default NovoUsuario