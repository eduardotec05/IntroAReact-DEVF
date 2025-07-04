import { useState, useEffect } from 'react';
import CitaCard from '../components/CitaCard';
import { citasData } from '../data/citas';
import '../App.css';

function Citas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    setCitas(citasData);
  }, []);

  return (
    <div className="citas-container">
      <h1 className="citas-title">Mis Citas Médicas</h1>
      {citas.length === 0 ? (
        <p className="citas-empty">No tienes citas programadas.</p>
      ) : (
        <div className="citas-grid">
          {citas.map(cita => (
            <CitaCard key={cita.id} cita={cita} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Citas;