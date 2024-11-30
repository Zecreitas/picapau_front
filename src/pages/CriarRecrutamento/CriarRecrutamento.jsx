import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CriarRecrutamento.css';
import Headeri from '../../components/Headeri';

const CriarRecrutamento = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    curriculos: [],
  });
  const [availableCandidates, setAvailableCandidates] = useState([
    // Exemplo de candidatos disponíveis
    { id: '1', name: 'Candidato 1' },
    { id: '2', name: 'Candidato 2' },
  ]);
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addToTeam = (candidate) => {
    setTeamMembers([...teamMembers, candidate]);
    setAvailableCandidates(availableCandidates.filter((c) => c.id !== candidate.id));
    setFormData({
      ...formData,
      curriculos: [...formData.curriculos, candidate.id],
    });
  };

  const removeFromTeam = (member) => {
    setAvailableCandidates([...availableCandidates, member]);
    setTeamMembers(teamMembers.filter((m) => m.id !== member.id));
    setFormData({
      ...formData,
      curriculos: formData.curriculos.filter((id) => id !== member.id),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://picapauapi-production.up.railway.app/api/recrutamentos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Recrutamento criado com sucesso!');
        navigate(`/recrutamentos/${data._id}`);
      } else {
        alert('Erro ao criar recrutamento: ' + data.message);
      }
    } catch (error) {
      alert('Erro ao conectar ao servidor: ' + error.message);
    }
  };

  return (
    <>
      <Headeri />
      <div className="recruitment-page">
        <div className="container mt-4">
          <h1 className="recruitment-title">Criar Novo Recrutamento</h1>

          {/* Formulário de Criação */}
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome do Recrutamento</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome do Recrutamento"
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descrição"
                  rows="4"
                  required
                ></textarea>
              </div>
            </form>
          </div>

          {/* Gerenciamento de Candidatos */}
          <div className="row mt-5">
            <div className="col-md-6">
              <h3 className="section-title">Candidatos Disponíveis</h3>
              <div className="d-flex flex-wrap">
                {availableCandidates.length > 0 ? (
                  availableCandidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-card m-2 p-2">
                      <span>{candidate.name}</span>
                      <button
                        className="add-button"
                        onClick={() => addToTeam(candidate)}
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="candidate-card m-2 p-2">
                    Nenhum candidato disponível no momento.
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <h3 className="section-title">Equipe Selecionada</h3>
              <div className="d-flex flex-wrap">
                {teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <div key={member.id} className="candidate-card m-2 p-2">
                      <span>{member.name}</span>
                      <button
                        className="remove-button"
                        onClick={() => removeFromTeam(member)}
                      >
                        -
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="candidate-card m-2 p-2">
                    Nenhum membro na equipe ainda.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              className="finalize-button"
              onClick={handleSubmit}
            >
              Criar Recrutamento
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriarRecrutamento;
