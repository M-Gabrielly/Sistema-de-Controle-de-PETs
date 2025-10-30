import { useState, useEffect } from 'react'
import './App.css'
import StatusDropdown from './components/StatusDropdown';

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
      <div id='content'>
        <div id="box-content">
          {typeof data.pets === 'undefined' ? (
            <p className="loading">Carregando...</p>
          ) : (
            <div className="pet-container">
              <h2 className="pet-title">Lista de PETs</h2>

              <div className="pet-table-wrapper">
                <table className="pet-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Idade</th>
                      <th>Espécie</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pets.map((pet, i) => (
                      <tr key={i}>
                        <td>{pet.nome}</td>
                        <td>{pet.idade} {pet.idade === 1 ? ' ano' : ' anos'}</td>
                        <td>{pet.especie}</td>
                        <td>
                          <StatusDropdown status={pet.status} id={pet.id}/>
                        </td>
                        <td>
                          <div className="actions">
                            {/* <button className="btn btn-edit">Editar</button> */}
                            <button className="btn btn-delete">Deletar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* <h3>Cadastra PET</h3>

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
          </form> */}
        </div>
      </div>
    </>
  )
}

export default App
