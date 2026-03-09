import React, { useState, useEffect } from "react";
import { createTipoIniciativa, updateTipoIniciativa } from "../services/api.js";

const TipoIniciativaForm = ({ tipoIniciativa, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    activo: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tipoIniciativa) {
      setFormData({
        nombre: tipoIniciativa.nombre || "",
        descripcion: tipoIniciativa.descripcion || "",
        activo:
          tipoIniciativa.activo !== undefined ? tipoIniciativa.activo : true,
      });
    }
  }, [tipoIniciativa]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      setError("El nombre del tipo de iniciativa es obligatorio");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      if (tipoIniciativa) {
        await updateTipoIniciativa(tipoIniciativa.id, formData);
      } else {
        await createTipoIniciativa(formData);
      }
      setFormData({ nombre: "", descripcion: "", activo: true });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      setError("Error al guardar el tipo de iniciativa");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="banorte-form">
      {error && <div className="banorte-error">{error}</div>}

      <div className="banorte-form-group">
        <label htmlFor="nombre">Nombre *</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ej. Iniciativa Estratégica"
          value={formData.nombre}
          onChange={handleChange}
          disabled={submitting}
          required
          maxLength={100}
        />
      </div>

      <div className="banorte-form-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Describe el tipo de iniciativa..."
          value={formData.descripcion}
          onChange={handleChange}
          disabled={submitting}
          rows={4}
        />
      </div>

      <div className="banorte-form-group banorte-checkbox-group">
        <label className="banorte-checkbox-label">
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
            disabled={submitting}
          />
          <span className="banorte-checkbox-custom"></span>
          Activo
        </label>
      </div>

      <div className="banorte-form-actions">
        <button
          type="submit"
          className="banorte-btn banorte-btn-primary"
          disabled={submitting}
        >
          {submitting
            ? "Guardando..."
            : tipoIniciativa
            ? "Actualizar"
            : "Crear Tipo de Iniciativa"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="banorte-btn banorte-btn-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default TipoIniciativaForm;
