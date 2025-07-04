import { Link } from 'react-router-dom';
import '../App.css';

function CitaCard({ cita }) {
  return (
    <div className="cita-card">
      <h3 className="cita-paciente">{cita.paciente}</h3>
      <p className="cita-info">Doctor: {cita.doctor}</p>
      <p className="cita-info">Fecha: {cita.fecha}</p>
      <p className="cita-info">Hora: {cita.hora}</p>
      <Link 
        to={`/cita/${cita.id}`} 
        className="cita-detalle-link"
      >
        Ver detalles
      </Link>
    </div>
  );
}

export default CitaCard;