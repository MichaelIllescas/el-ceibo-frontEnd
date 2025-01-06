import React, { useState } from "react";
import Header from "../Navbar/Header";
import axios from "axios";

const RegistrarSocio = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const [message, setMessage] = useState(null); // Mensaje de éxito o error

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(), // Eliminar espacios en blanco
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica en el frontend
    const { nombre, apellido, dni, direccion, telefono, email } = formData;
    if (!nombre || !apellido || !dni || !direccion || !telefono || !email) {
      setMessage({
        text: "Por favor, completa todos los campos obligatorios.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/socios", // URL del backend
        {
          ...formData,
          estado: "ACTIVO", // Si este campo es obligatorio en el backend
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Mostrar mensaje de éxito
      setMessage({
        text: "Socio registrado con éxito.",
        type: "success",
      });

  
      // Limpiar los campos del formulario
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        direccion: "",
        telefono: "",
        email: "",
      });
    } catch (error) {
      

      // Manejar errores específicos
      if (error.response) {
        const serverMessage = error.response.data.message || "Error desconocido en el servidor.";
        setMessage({
          text: `Error del servidor: ${serverMessage}`,
          type: "error",
        });
      } else {
        setMessage({
          text: "No se pudo conectar con el servidor.",
          type: "error",
        });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="pt-1">
        <div className="mt-5 pt-3">
          <div className="col-lg-8 col-md-8 bg-black shadow-sm p-4 rounded mx-auto mt-10 text-white mt-5 py-4">
            <h3 className="text-center mb-3">Registrar Socio</h3>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellido" className="form-label">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="dni" className="form-label">
                    DNI
                  </label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="direccion" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              {message && (
                <p
                  className={`fw-bold text-center mt-4 ${
                    message.type === "success" ? "text-success" : "text-danger"
                  }`}
                >
                  {message.text}
                </p>
              )}
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary">
                  Registrar Socio
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrarSocio;
