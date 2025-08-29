import "./Proyecto.css";

function Proyecto({ proyecto, eliminarProyecto, cambiarEstado, cargarEdicion, darkMode }) {
  const handleEliminar = (e) => {
    e.stopPropagation();
    const confirmar = window.confirm("¿Seguro que quieres eliminar este proyecto?");
    if (confirmar) {
      eliminarProyecto(proyecto.id);
    }
  };

  return (
    <div className={`tarjeta ${proyecto.estado} ${darkMode ? 'dark-mode' : ''}`}>
      
      <div className="contenido">
        <div className="tarjeta-header">
          <h3 className={`proyecto-titulo ${proyecto.estado === "completado" ? "tachado" : ""}`}>
            {proyecto.titulo}
          </h3>
          
          <span className={`estado-badge ${proyecto.estado}`}>
            {proyecto.estado === "completado" ? "✓ Listo" : "⏳ En proceso"}
          </span>
        </div>

        <p className="proyecto-descripcion">
          {proyecto.descripcion}
        </p>

        <div className="proyecto-meta">
          <div className="tecnologia-container">
            <span className="meta-icon">💻</span>
            <span className="tecnologia">
              {proyecto.tecnologia}
            </span>
          </div>
          
          <div className="fecha-container">
            <span className="meta-icon">📅</span>
            <span className="fecha">
              {new Date(proyecto.fecha).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>
      </div>

      <div className="acciones">
        {proyecto.estado === "pendiente" && (
          <button
            onClick={() => cambiarEstado(proyecto.id)}
            className="btn-completar"
          >
            <span className="button-icon">✅</span>
            Marcar como listo
          </button>
        )}
        
        <button
          onClick={() => cargarEdicion(proyecto)}
          className="btn-editar"
        >
          <span className="button-icon">✏️</span>
          Editar
        </button>
        
        <button
          onClick={handleEliminar}
          className="btn-eliminar"
        >
          <span className="button-icon">🗑️</span>
          Borrar
        </button>
      </div>
    </div>
  );
}

export default Proyecto;