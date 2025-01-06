import React, { useState, useEffect } from "react";
import axios from "axios";

const ActualizarSocio = ({ socioId, onClose, onUpdate }) => {
  const [socio, setSocio] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocio = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/socios/${socioId}`);
        setSocio(response.data);
      } catch (error) {
        console.error("Error al cargar los datos del socio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocio();
  }, [socioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocio({ ...socio, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/socios/${socioId}`, socio);
      onUpdate(); // Actualiza la lista de socios
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar el socio:", error);
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Actualizar Socio</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={socio.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="apellido"
                  className="form-control"
                  value={socio.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  className="form-control"
                  value={socio.dni}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="telefono"
                  className="form-control"
                  value={socio.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={socio.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Dirección:</label>
                <input
                  type="text"
                  name="direccion"
                  className="form-control"
                  value={socio.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Actualizar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualizarSocio;
