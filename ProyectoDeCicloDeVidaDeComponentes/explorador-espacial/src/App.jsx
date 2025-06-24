import React, { useState, useEffect, useMemo } from "react";
import Planeta from "./components/Planeta";
import "./App.css";

function App() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);
  const [nuevoPlaneta, setNuevoPlaneta] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [descripcionPlaneta, setDescripcionPlaneta] = useState("");

  // Efecto para simulación de vuelo
  useEffect(() => {
    console.log("¡El panel de control está listo!");

    const intervalo = setInterval(() => {
      if (combustible > 0) {
        setDistancia((prev) => prev + 1);
        setCombustible((prev) => Math.max(0, prev - 0.5));
      }

      if (combustible <= 0) {
        setEstadoNave("Sin combustible");
      }
    }, 1000);

    return () => {
      clearInterval(intervalo);
      console.log("El panel de control se ha apagado.");
    };
  }, [combustible]); // Solo combustible como dependencia

  // Efecto para cambios en el combustible
  useEffect(() => {
    console.log("¡Combustible actualizado!");

    if (combustible < 20 && combustible > 0) {
      setEstadoNave("Combustible bajo");
    }
  }, [combustible]);

  // Memoización del mensaje de estado
  const mensajeEstado = useMemo(() => {
    const estados = {
      "En órbita": "🛰️ Orbitando normalmente",
      "Combustible bajo": "⚠️ Combustible bajo, busca un planeta",
      "Sin combustible": "⛔ Sin combustible, emergencia",
      Aterrizando: "🚀 Aterrizando en planeta",
    };
    return estados[estadoNave] || estadoNave;
  }, [estadoNave]);

  // Función para aterrizar
  const aterrizar = () => {
    if (!nuevoPlaneta) return;

    setEstadoNave("Aterrizando");
    setTimeout(() => {
      setPlanetasVisitados([
        ...planetasVisitados,
        {
          nombre: nuevoPlaneta,
          descripcion: descripcionPlaneta,
          fecha: new Date().toLocaleDateString(),
        },
      ]);
      setEstadoNave("En órbita");
      setNuevoPlaneta("");
      setDescripcionPlaneta("");
      setMostrarFormulario(false);
    }, 2000);
  };

  // Función para eliminar planeta
  const eliminarPlaneta = (index) => {
    const nuevosPlanetas = [...planetasVisitados];
    nuevosPlanetas.splice(index, 1);
    setPlanetasVisitados(nuevosPlanetas);
  };

  return (
    <div className="panel-control">
      <header className="panel-header">
        <h1>🚀 Panel de Control Espacial</h1>
        <div className="panel-estado">{mensajeEstado}</div>
      </header>

      <div className="panel-metricas">
        <div className="metrica">
          <span className="metrica-label">Distancia recorrida:</span>
          <span className="metrica-valor">{distancia} UA</span>
        </div>
        <div className="metrica">
          <span className="metrica-label">Combustible:</span>
          <span
            className="metrica-valor"
            style={{ color: combustible < 20 ? "#ff6b6b" : "#4ecdc4" }}
          >
            {combustible.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="panel-acciones">
        {!mostrarFormulario ? (
          <button
            className="btn-aterrizar"
            onClick={() => setMostrarFormulario(true)}
            disabled={combustible <= 0}
          >
            🌍 Aterrizar en nuevo planeta
          </button>
        ) : (
          <div className="formulario-planeta">
            <input
              type="text"
              value={nuevoPlaneta}
              onChange={(e) => setNuevoPlaneta(e.target.value)}
              placeholder="Nombre del planeta"
              className="input-planeta"
            />
            <textarea
              value={descripcionPlaneta}
              onChange={(e) => setDescripcionPlaneta(e.target.value)}
              placeholder="Descripción del planeta"
              className="textarea-descripcion"
            />
            <div className="formulario-botones">
              <button className="btn-confirmar" onClick={aterrizar}>
                🚀 Confirmar aterrizaje
              </button>
              <button
                className="btn-cancelar"
                onClick={() => setMostrarFormulario(false)}
              >
                ✖ Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="panel-bitacora">
        <h2>📜 Bitácora de Planetas Visitados</h2>
        {planetasVisitados.length === 0 ? (
          <p className="bitacora-vacia">No hay planetas registrados</p>
        ) : (
          <div className="lista-planetas">
            {planetasVisitados.map((planeta, index) => (
              <div key={index} className="planeta-card">
                <Planeta nombre={planeta.nombre} />
                <div className="planeta-info">
                  <p className="planeta-descripcion">{planeta.descripcion}</p>
                  <p className="planeta-fecha">Visitado: {planeta.fecha}</p>
                </div>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarPlaneta(index)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
