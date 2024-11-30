import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recrutamento.css';
import Headeri from '../../components/Headeri';

const Recrutamento = () => {
  const [recrutamentos, setRecrutamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecrutamentos = async () => {
      try {
        const response = await fetch('http://localhost:5000/recrutamentos');
        const data = await response.json();
        setRecrutamentos(data);
      } catch (error) {
        console.error('Erro ao buscar recrutamentos:', error);
      }
    };

    fetchRecrutamentos();
  }, []);

  return (
    <div>
      <Headeri />
      <div className="recrutamentos-container">
        <h1 className="title">Recrutamentos</h1>
        <div className="recrutamentos-list">
          {recrutamentos.length > 0 ? (
            recrutamentos.map((recrutamento) => (
              <div
                key={recrutamento._id}
                className="recrutamento-item"
                onClick={() => navigate(`/recrutamentos/${recrutamento._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <span>{recrutamento.nome}</span>
                <span className="termino">Término: {recrutamento.termino}</span>
              </div>
            ))
          ) : (
            <div className="recrutamento-item">
              Nenhum recrutamento disponível no momento.
            </div>
          )}
        </div>
        <button className="create-button" onClick={() => navigate('/recrutamentos/novo')}>
          Criar
        </button>
      </div>
    </div>
  );
};

export default Recrutamento;
