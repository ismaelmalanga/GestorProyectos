import { useState, useEffect } from "react";
import Proyecto from "./Proyecto";
import "./GestorProyectos.css";

function GestorProyectos() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tecnologia, setTecnologia] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [proyectos, setProyectos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [editarProyecto, setEditarProyecto] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Cargar proyectos desde LocalStorage
  useEffect(() => {
    const proyectosGuardados = localStorage.getItem("proyectos");
    if (proyectosGuardados) {
      setProyectos(JSON.parse(proyectosGuardados));
    }
  }, []);

  // Guardar proyectos en LocalStorage
  useEffect(() => {
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
  }, [proyectos]);

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !descripcion.trim() || !tecnologia.trim()) return;

    if (editarProyecto) {
      setProyectos(
        proyectos.map((p) =>
          p.id === editarProyecto.id
            ? { ...p, titulo, descripcion, tecnologia, estado }
            : p
        )
      );
      setEditarProyecto(null);
    } else {
      const nuevoProyecto = {
        id: Date.now(),
        titulo,
        descripcion,
        tecnologia,
        estado,
        fecha: new Date(),
      };
      setProyectos([...proyectos, nuevoProyecto]);
    }

    setTitulo("");
    setDescripcion("");
    setTecnologia("");
    setEstado("pendiente");
  };

  const eliminarProyecto = (id) => {
    setProyectos(proyectos.filter((p) => p.id !== id));
  };

  const cambiarEstado = (id) => {
    setProyectos(
      proyectos.map((p) =>
        p.id === id ? { ...p, estado: "completado" } : p
      )
    );
  };

  const cargarEdicion = (proyecto) => {
    setTitulo(proyecto.titulo);
    setDescripcion(proyecto.descripcion);
    setTecnologia(proyecto.tecnologia);
    setEstado(proyecto.estado);
    setEditarProyecto(proyecto);
  };

  const proyectosFiltrados = proyectos
    .filter((p) => filtro === "todos" || p.estado === filtro)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className={`gestor-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="header">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div className="title-section">
          <div className="title-with-icons">
            <span className="icon">⚡</span>
            <h1 className="main-title">Mis Proyectos</h1>
            <span className="icon">☕</span>
          </div>
          <p className="subtitle">
            Donde llevo el control de mis ideas y desarrollos
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="formulario-container">
        <h2 className="form-title">
          {editarProyecto ? "✏️ Editando proyecto" : "➕ Agregar nuevo proyecto"}
        </h2>

        <form onSubmit={manejarSubmit} className="formulario">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Nombre del proyecto</label>
              <input type="text" placeholder="ej: Mi nueva web" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Tecnología principal</label>
              <input type="text" placeholder="ej: React, Vue, Node..." value={tecnologia} onChange={(e) => setTecnologia(e.target.value)} required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea placeholder="Cuéntame de qué se trata..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="3" required className="form-textarea" />
          </div>

          <div className="form-footer">
            <div className="status-group">
              <label className="form-label">Estado:</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)} className="form-select">
                <option value="pendiente">En proceso</option>
                <option value="completado">Completado</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              <span className="button-icon">{editarProyecto ? "💾" : "➕"}</span>
              {editarProyecto ? "Guardar cambios" : "Agregar proyecto"}
            </button>
          </div>
        </form>
      </div>

      {/* Filtros */}
      <div className="filtros">
        {[
          { key: "todos", label: "📋 Todos" },
          { key: "pendiente", label: "⏳ En proceso" },
          { key: "completado", label: "✅ Completados" }
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setFiltro(key)} className={`filtro-btn ${filtro === key ? "activo" : ""}`}>
            {label} ({proyectos.filter(p => key === "todos" || p.estado === key).length})
          </button>
        ))}
      </div>

      {/* Lista de proyectos */}
      {proyectosFiltrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">☕</div>
          <h3 className="empty-title">
            {filtro === "todos" ? "Aún no hay proyectos" : `No tienes proyectos ${filtro === "pendiente" ? "en proceso" : "completados"}`}
          </h3>
          <p className="empty-text">
            {filtro === "todos" ? "¡Es hora de crear tu primer proyecto!" : "Cambia el filtro para ver otros proyectos"}
          </p>
        </div>
      ) : (
        <div className="grid-proyectos">
          {proyectosFiltrados.map((proyecto) => (
            <Proyecto key={proyecto.id} proyecto={proyecto} eliminarProyecto={eliminarProyecto} cambiarEstado={cambiarEstado} cargarEdicion={cargarEdicion} darkMode={darkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GestorProyectos;