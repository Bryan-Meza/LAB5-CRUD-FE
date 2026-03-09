import React, { useState, useEffect } from "react";
import { getTiposIniciativa, deleteTipoIniciativa } from "../services/api";
import TipoIniciativaItem from "./CountryItem";
import TipoIniciativaForm from "./CountryForm";

const TipoIniciativaList = () => {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTipos = async () => {
    setLoading(true);
    try {
      const data = await getTiposIniciativa();
      setTipos(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los tipos de iniciativa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar este tipo de iniciativa?"
      )
    ) {
      try {
        await deleteTipoIniciativa(id);
        setTipos(tipos.filter((tipo) => tipo.id !== id));
      } catch (err) {
        setError("Error al eliminar el tipo de iniciativa");
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleFormSubmit = () => {
    fetchTipos();
    setEditingId(null);
    setShowForm(false);
  };

  if (loading)
    return (
      <div className="banorte-loading">
        <div className="banorte-spinner"></div>
        <p>Cargando tipos de iniciativa...</p>
      </div>
    );

  if (error) return <div className="banorte-error">{error}</div>;

  return (
    <div className="banorte-container">
      <div className="banorte-toolbar">
        <h2>Tipos de Iniciativa</h2>
        <button
          className="banorte-btn banorte-btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
        >
          {showForm ? "✕ Cerrar" : "＋ Nuevo Tipo"}
        </button>
      </div>

      {showForm && !editingId && (
        <div className="banorte-form-card">
          <h3>Agregar Nuevo Tipo de Iniciativa</h3>
          <TipoIniciativaForm
            onSubmitSuccess={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="banorte-grid">
        {tipos.length === 0 ? (
          <p className="banorte-empty">
            No hay tipos de iniciativa registrados.
          </p>
        ) : (
          tipos.map((tipo) => (
            <div key={tipo.id}>
              {editingId === tipo.id ? (
                <div className="banorte-form-card">
                  <h3>Editar Tipo de Iniciativa</h3>
                  <TipoIniciativaForm
                    tipoIniciativa={tipo}
                    onSubmitSuccess={handleFormSubmit}
                    onCancel={handleCancelEdit}
                  />
                </div>
              ) : (
                <TipoIniciativaItem
                  tipoIniciativa={tipo}
                  onDelete={() => handleDelete(tipo.id)}
                  onEdit={() => handleEdit(tipo.id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TipoIniciativaList;
