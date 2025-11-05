import { useState, useEffect } from 'react'
import './App.css'
import StatusDropdown from './components/StatusDropdown';

function App() {
  
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("api/listar_pets")
      .then(res => res.json())
      .then(data => {
        setData(data); 
        console.log(data)
      })
  }, [])

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
                      <th>Dono</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pets.map((pet, i) => (
                      <tr key={i}>
                        <td>{pet.nome}</td>
                        <td>{pet.idade} {pet.idade === 1 ? ' ano' : ' anos'}</td>
                        <td>{pet.especie}</td>
                        <td>{pet.dono?.nome || ""}</td>
                        <td>
                          <StatusDropdown status={pet.status} id={pet.id}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
