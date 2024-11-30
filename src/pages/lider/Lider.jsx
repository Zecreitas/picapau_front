import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headeri from '../../components/Headeri';
import './lider.css'

const Lider = () => {
  const teamMembers = [
    "Felipe Garcia",
    "Jose Luiz Pereira da Rosa",
    "Eloísa Sortica",
    "Guilherme Schu",
    "Andrielly"
  ];

  /*equipeF = {
    nome:nome,
    lider:email,
    membros:[
        {
            nome,
            email
        },
        {
            nome,
            email
        },
        {
            nome,
            email
        },
    ]
}*/

  return (
    <div>
      <Headeri />
      <div className="container mt-5">
        <h1 className="mb-4">Minha Equipe</h1>
        
        <div className="list-group">
          {teamMembers.map((member, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center list-group-item">
              <span>{member}</span>
              <a href="#" className="text-warning">Ver avaliações</a>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-warning me-2">Editar</button>
          <button className="btn btn-warning">Avaliar</button>
        </div>
      </div>
    </div>
  );
};

export default Lider;
