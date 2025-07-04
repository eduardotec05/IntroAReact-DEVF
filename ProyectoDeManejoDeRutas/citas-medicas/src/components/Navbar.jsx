import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Clínica Salud</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/citas" className="nav-link">Ver Citas</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;