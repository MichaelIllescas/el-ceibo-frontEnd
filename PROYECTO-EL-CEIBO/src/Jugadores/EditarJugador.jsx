import React, { useState, useEffect } from "react";
import axios from "axios";

const EditarJugador = ({ playerId, onClose, onUpdate }) => {
  const [player, setPlayer] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    categoria: "", // Cambiado para manejar el nombre de la categoría
  });
  const [categorias, setCategorias] = useState([]); // Almacenar las categorías disponibles
  const [loading, setLoading] = useState(true);

  // Cargar datos del jugador y categorías
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playerResponse, categoriasResponse] = await Promise.all([
          axios.get(`http://192.168.0.103:8080/api/jugadores/${playerId}`),
          axios.get("http://192.168.0.103:8080/api/categorias"),
        ]);

        setPlayer({
          ...playerResponse.data,
          categoria: playerResponse.data.categoria.nombre, // Almacenar el nombre de la categoría
        });
        setCategorias(categoriasResponse.data || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playerId]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer({ ...player, [name]: value });
  };

  // Enviar los datos al backend
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://192.168.0.103:8080/api/jugadores/${playerId}`, player)
      .then(() => {
        onUpdate(); // Refrescar la lista de jugadores
        onClose(); // Cerrar el modal
      })
      .catch((error) => console.error("Error al actualizar el jugador:", error));
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div
      className="modal fade show d-block" // Clase para mostrar el modal
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Fondo oscuro detrás del modal
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Jugador</h5>
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
                  value={player.nombre}
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
                  value={player.apellido}
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
                  value={player.dni}
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
                  value={player.telefono}
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
                  value={player.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Categoría:</label>
                <select
                  name="categoria"
                  className="form-select"
                  value={player.categoria}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.nombre}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Actualizar
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
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

export default EditarJugador;
