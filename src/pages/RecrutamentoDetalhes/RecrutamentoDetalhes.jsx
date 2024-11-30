import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecrutamentoDetalhes.css';
import Headeri from '../../components/Headeri';

const RecrutamentoDetalhes = () => {
    const [availableCandidates, setAvailableCandidates] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
  
    const addToTeam = (candidate) => {
        setTeamMembers([...teamMembers, candidate]);
        setAvailableCandidates(availableCandidates.filter((c) => c.id !== candidate.id));
    };
  
    const removeFromTeam = (member) => {
        setAvailableCandidates([...availableCandidates, member]);
        setTeamMembers(teamMembers.filter((m) => m.id !== member.id));
    };
  
    return (
        <>
            <Headeri />
            <div className="recruitment-page">
                <div className="container mt-4">
                    <h1 className="recruitment-title">Recrutamento para empilhador de madeira</h1>
                    
                    <div className="row">
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
                        <button className="finalize-button">Formar Equipe</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecrutamentoDetalhes;
