import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistroJugadorForm = () => {
  const [jugador, setJugador] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    categoriaId: "", // ID de la categoría seleccionada
  });

  const [categorias, setCategorias] = useState([]); // Lista de categorías
  const [mensaje, setMensaje] = useState("");

  // Llamada a la API para obtener las categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://192.168.0.103:8080/api/categorias");
        setCategorias(response.data); // Guardamos las categorías en el estado
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJugador({ ...jugador, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.0.103:8080/api/jugadores", {
        nombre: jugador.nombre,
        apellido: jugador.apellido,
        dni: jugador.dni,
        telefono: jugador.telefono,
        email: jugador.email,
        categoria: { id: jugador.categoriaId },
      });
      setMensaje("Jugador registrado con éxito");
      setJugador({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        email: "",
        categoriaId: "",
      });
    } catch (error) {
      setMensaje(
        error.response?.data?.message || "Ocurrió un error al registrar el jugador"
      );
    }
  };

  return (
    <div className="mt-1 ">
    <h2 className="text-center mb-4">Registrar Jugador</h2>

    <form onSubmit={handleSubmit} className=" p-1 rounded" >
      <div className="row g-3">
        {/* Nombre */}
        <div className="col-md-6 ">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            placeholder="Ingrese el nombre"
            value={jugador.nombre}
            onChange={handleChange}
            required
          />
        </div>
        {/* Apellido */}
        <div className="col-md-6">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            className="form-control"
            placeholder="Ingrese el apellido"
            value={jugador.apellido}
            onChange={handleChange}
            required
          />
        </div>
        {/* DNI */}
        <div className="col-md-6">
          <label htmlFor="dni" className="form-label">DNI</label>
          <input
            type="text"
            id="dni"
            name="dni"
            className="form-control"
            placeholder="Ingrese el DNI"
            value={jugador.dni}
            onChange={handleChange}
            required
          />
        </div>
        {/* Teléfono */}
        <div className="col-md-6">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            className="form-control"
            placeholder="Ingrese el teléfono"
            value={jugador.telefono}
            onChange={handleChange}
            required
          />
        </div>
        {/* Email */}
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Ingrese el correo electrónico"
            value={jugador.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Categoría */}
        <div className="col-md-6 d-flex flex-column">
          <label htmlFor="categoriaId" className="form-label">Categoría</label>
          <select
            id="categoriaId"
            name="categoriaId"
            className="form-control form-select w-75 m-auto"
            value={jugador.categoriaId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
     
      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary">Registrar</button>
      </div>
      {mensaje && <div className="alert alert-info text-center mt-3">{mensaje}</div>}
    </form>
  </div>
  
  );
};

export default RegistroJugadorForm;
