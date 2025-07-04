import '../App.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a la Clínica Salud</h1>
      <p className="home-subtitle">
        Gestiona tus citas médicas de manera fácil y eficiente
      </p>
      <div className="home-cta">
        <h2 className="cta-title">¿Qué deseas hacer?</h2>
        <div className="cta-buttons">
          <a href="/citas" className="cta-button">
            Ver mis citas
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;