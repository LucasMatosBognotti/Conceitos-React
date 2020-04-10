import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [ respositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: 'https://rocketseat.com.br',
      title: `Novo repositorio ${Date.now()}`,
      techs: ['Node, React, React-Native']
    });

    console.log(response.data);

    setRepositories([...respositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    // Vai retornar e setar os valores que for diferente, o que for igual o filter descarta
    setRepositories(respositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
