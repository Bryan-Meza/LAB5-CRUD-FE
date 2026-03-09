import React from "react";

const TipoIniciativaItem = ({ tipoIniciativa, onDelete, onEdit }) => {
  return (
    <div
      className={`banorte-card ${
        !tipoIniciativa.activo ? "banorte-card-inactive" : ""
      }`}
    >
      <div className="banorte-card-header">
        <h3>{tipoIniciativa.nombre}</h3>
        <span
          className={`banorte-badge ${
            tipoIniciativa.activo
              ? "banorte-badge-active"
              : "banorte-badge-inactive"
          }`}
        >
          {tipoIniciativa.activo ? "Activo" : "Inactivo"}
        </span>
      </div>
      <div className="banorte-card-body">
        <p>
          <strong>Descripción:</strong>{" "}
          {tipoIniciativa.descripcion || "Sin descripción"}
        </p>
        <p className="banorte-card-date">
          <strong>Fecha de creación:</strong>{" "}
          {tipoIniciativa.fecha_creacion
            ? new Date(tipoIniciativa.fecha_creacion).toLocaleDateString(
                "es-MX",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "No disponible"}
        </p>
      </div>
      <div className="banorte-card-actions">
        <button onClick={onEdit} className="banorte-btn banorte-btn-edit">
          Editar
        </button>
        <button onClick={onDelete} className="banorte-btn banorte-btn-delete">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TipoIniciativaItem;
