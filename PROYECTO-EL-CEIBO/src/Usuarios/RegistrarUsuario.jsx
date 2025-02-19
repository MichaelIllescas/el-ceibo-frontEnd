import React, { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig";
import Footer from "../Index/Footer";
import Header from "../Navbar/Header";
import "../Usuarios/RegistrarUsuario.css";

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    telefono: "",
    direccion: "",
    email: "",
    password: "",
    role: "USER", // Valor predeterminado como string
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Obtener roles del backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get("auth/roles"); // Ajusta esta URL según tu API
        if (Array.isArray(response.data)) {
          setRoles(response.data);
        } else {
          console.error("El formato de roles no es un array.");
        }
      } catch (err) {
        console.error("Error al cargar los roles:", err);
      }
    };
    fetchRoles();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    console.log("Datos enviados al backend:", formData); // Verifica los datos enviados

    try {
      const response = await apiClient.post("/auth/registrarUsuario", formData);
      setSuccess("Usuario registrado exitosamente.");
      setFormData({
        firstName: "",
        lastName: "",
        dni: "",
        telefono: "",
        direccion: "",
        email: "",
        password: "",
        role: "USER", // Restablece al valor predeterminado
      });
    } catch (err) {
      setError("Hubo un error al registrar el usuario. Intenta nuevamente.");
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="pb-5">
        <div className="container my-5 py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <form
                onSubmit={handleSubmit}
                className="bg-dark text-light p-4 rounded"
              >
                <h1 className="text-center mb-4">Registrar Usuario</h1>

                <div className="d-flex flex-column gap-4">
                  {/* Nombre y Apellido */}
                  <div className="d-flex flex-wrap gap-3">
                    <div className="flex-fill">
                      <label htmlFor="firstName" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex-fill">
                      <label htmlFor="lastName" className="form-label">
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* DNI y Teléfono */}
                  <div className="d-flex flex-wrap gap-3">
                    <div className="flex-fill">
                      <label htmlFor="dni" className="form-label">
                        DNI
                      </label>
                      <input
                        type="text"
                        id="dni"
                        name="dni"
                        className="form-control"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex-fill">
                      <label htmlFor="telefono" className="form-label">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        className="form-control"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Dirección y Correo Electrónico */}
                  <div className="d-flex flex-wrap gap-3">
                    <div className="flex-fill">
                      <label htmlFor="direccion" className="form-label">
                        Dirección
                      </label>
                      <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        className="form-control"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex-fill">
                      <label htmlFor="email" className="form-label">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Contraseña y Rol */}
                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <div className="flex-fill">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex-fill role-container">
                      <label htmlFor="role" className="form-label">
                        Rol
                      </label>
                      <select
                        id="role"
                        name="role"
                        className="form-select m-auto"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        style={{ width: "290px" }}
                      >
                        <option value="" disabled>
                          Seleccionar Rol
                        </option>
                        {roles.map((role, index) => (
                          <option key={index} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {error && <p className="text-danger text-center">{error}</p>}
                {success && <p className="text-success text-center">{success}</p>}
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <Footer />
    </>
  );
};

export default RegistroUsuario;



