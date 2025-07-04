import { useParams } from 'react-router-dom';
import { citasData } from '../data/citas';
import '../App.css';

function CitaDetalle() {
  const { id } = useParams();
  const cita = citasData.find(c => c.id === parseInt(id));

  if (!cita) {
    return (
      <div className="cita-not-found">
        <h2 className="not-found-title">Cita no encontrada</h2>
        <p className="not-found-message">No existe una cita con el ID proporcionado.</p>
      </div>
    );
  }

  return (
    <div className="cita-detalle-container">
      <h2 className="detalle-title">Detalles de la Cita #{id}</h2>
      
      <div className="detalle-section">
        <h3 className="section-title">Paciente:</h3>
        <p className="section-content">{cita.paciente}</p>
      </div>
      
      <div className="detalle-section">
        <h3 className="section-title">Doctor:</h3>
        <p className="section-content">{cita.doctor}</p>
      </div>
      
      <div className="detalle-section">
        <h3 className="section-title">Especialidad:</h3>
        <p className="section-content">{cita.especialidad}</p>
      </div>
      
      <div className="detalle-section">
        <h3 className="section-title">Fecha y Hora:</h3>
        <p className="section-content">{cita.fecha} a las {cita.hora}</p>
      </div>
      
      <div className="detalle-section">
        <h3 className="section-title">Motivo:</h3>
        <p className="section-content">{cita.motivo}</p>
      </div>
    </div>
  );
}

export default CitaDetalle;