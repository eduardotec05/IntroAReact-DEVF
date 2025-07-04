import { Link } from 'react-router-dom';
import '../App.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Página no encontrada</h1>
      <p className="not-found-message">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link 
        to="/" 
        className="not-found-button"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;