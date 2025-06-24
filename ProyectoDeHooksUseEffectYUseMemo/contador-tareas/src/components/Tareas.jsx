import { useState, useEffect, useMemo } from "react";
import "./Tareas.css";

export function Tareas() {
  // Cargar tareas iniciales desde localStorage
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  const [nuevaTarea, setNuevaTarea] = useState("");
  const [duracion, setDuracion] = useState("");
  const [filtroDuracion, setFiltroDuracion] = useState("");

  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [tareas]); // Se ejecuta cada vez que las tareas cambian
  // Efecto para guardar en localStorage cuando cambian las tareas
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea("");
      setDuracion("");
    }
  };

  // Filtrar tareas según la duración seleccionada
  const tareasFiltradas = useMemo(() => {
    if (!filtroDuracion) return tareas;
    return tareas.filter(
      (tarea) => tarea.duracion === parseInt(filtroDuracion)
    );
  }, [tareas, filtroDuracion]);

  // Limpiar todas las tareas
  const limpiarTareas = () => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar todas las tareas?")
    ) {
      setTareas([]);
    }
  };

  // Marcar tarea como completada
  const toggleCompletada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  // Eliminar una tarea específica
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <div className="tareas-container">
      <h1 className="tareas-titulo">Gestor de Tareas</h1>
      
      <div className="tareas-formulario">
        <div className="input-group">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nombre de la tarea"
            className="tarea-input"
          />
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            placeholder="Duración (min)"
            className="duracion-input"
            min="1"
          />
        </div>
        <button onClick={agregarTarea} className="btn-agregar">
          <i className="icon-plus"></i> Agregar Tarea
        </button>
      </div>

      <div className="tareas-filtros">
        <div className="filtro-group">
          <label htmlFor="filtro-duracion">Filtrar por duración:</label>
          <select
            id="filtro-duracion"
            value={filtroDuracion}
            onChange={(e) => setFiltroDuracion(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todas las tareas</option>
            {[...new Set(tareas.map(t => t.duracion))].sort((a, b) => a - b).map(duracion => (
              <option key={duracion} value={duracion}>
                {duracion} minutos
              </option>
            ))}
          </select>
        </div>
        <button onClick={limpiarTareas} className="btn-limpiar">
          <i className="icon-trash"></i> Limpiar Todo
        </button>
      </div>

      <div className="tareas-resumen">
        <div className="resumen-item">
          <span className="resumen-label">Total tareas:</span>
          <span className="resumen-valor">{tareas.length}</span>
        </div>
        <div className="resumen-item">
          <span className="resumen-label">Tiempo total:</span>
          <span className="resumen-valor">{calcularTiempoTotal} min</span>
        </div>
        <div className="resumen-item">
          <span className="resumen-label">Mostrando:</span>
          <span className="resumen-valor">{tareasFiltradas.length} tareas</span>
        </div>
      </div>

      <div className="tareas-lista-container">
        <h2 className="tareas-subtitulo">
          {filtroDuracion ? `Tareas de ${filtroDuracion} minutos` : "Todas las tareas"}
        </h2>
        
        {tareasFiltradas.length === 0 ? (
          <p className="tareas-vacio">No hay tareas para mostrar</p>
        ) : (
          <ul className="tareas-lista">
            {tareasFiltradas.map((tarea) => (
              <li key={tarea.id} className={`tarea-item ${tarea.completada ? 'completada' : ''}`}>
                <div className="tarea-contenido">
                  <span className="tarea-nombre">{tarea.nombre}</span>
                  <span className="tarea-duracion">{tarea.duracion} min</span>
                </div>
                <div className="tarea-acciones">
                  <button 
                    onClick={() => toggleCompletada(tarea.id)} 
                    className={`btn-accion ${tarea.completada ? 'btn-completada' : ''}`}
                    aria-label={tarea.completada ? "Marcar como pendiente" : "Marcar como completada"}
                  >
                    <i className={tarea.completada ? "icon-check-circle" : "icon-circle"}></i>
                  </button>
                  <button 
                    onClick={() => eliminarTarea(tarea.id)} 
                    className="btn-accion btn-eliminar"
                    aria-label="Eliminar tarea"
                  >
                    <i className="icon-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
