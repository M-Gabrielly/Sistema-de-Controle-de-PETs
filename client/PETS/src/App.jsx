import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("api/listar_pets")
      .then(res => res.json())
      .then(data => {setData(data); console.log(data)})
  }, [])

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
      // erro requisição
      const errorText = await res.json();
      if (!res.ok) throw new Error(`Erro ${res.status}: ${errorText.message}`);
      return res.json();
    })
    .then(newData => {
      //deu tudo certo
      console.log("Resposta do servidor:", newData);
    })
    // mostra erro
    .catch(err => console.error(err));

    e.target.reset()
  }

  return (
    <>
      <div>
        {(typeof data.pets === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          data.pets.map((pet, i) => {
            return (<p key={i}>{pet.nome}</p>)
          })
        )}
        <h3>Cadastra PET</h3>

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
    </>
  )
}

export default App
