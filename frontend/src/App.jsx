import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://ocean-jornada-backend.onrender.com/herois')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Erro ao buscar dados:', error))
    };
    fetchData()
  }, [])
  console.log(data)

  return (
    <>
      {data && data.map((heroi, index) => (
        <div key={index}>
          <h1>{heroi.nome}</h1>
          <p>{heroi._id}</p>
          <img src={heroi.imagem} alt={heroi.nome} />
        </div>
      ))}
    </>
  )
}

export default App
