import React, { useState } from "react";
import Header from "../Navbar/Header";

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
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre || !formData.apellido || !formData.dni) {
      setMessage({
        text: "Por favor, completa todos los campos obligatorios.",
        type: "error",
      });
      return;
    }

    setMessage({ text: "Socio registrado con éxito.", type: "success" });

    // Aquí podrías agregar la lógica para enviar los datos a un backend
  };

  return (
    <>
      <Header />
      <div className="mt-3 pt-3">
        <div className="mt-5 pt-5">
          <div className="col-lg-6 col-md-8 bg-black shadow-sm p-4 rounded mx-auto mt-10 text-white">
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
