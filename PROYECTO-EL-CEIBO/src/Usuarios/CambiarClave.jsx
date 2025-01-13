import React, { useState } from "react";
import apiClient from "../Config/axiosConfig"; 
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";

const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      setSuccessMessage(""); // Limpiar mensaje de éxito
      return;
    }

    try {
      // Preparar el cuerpo de la solicitud (sin el username)
      const payload = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      // Enviar la solicitud al backend con Axios
      const response = await apiClient.put("/api/users/update-password", payload);

      // Manejo de la respuesta
      if (response.status === 200) {
        setSuccessMessage(response.data.message || "Contraseña actualizada correctamente.");
        setErrorMessage(""); // Limpiar mensaje de error
        // Reiniciar los campos
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      // Manejar errores del backend
      if (error.response) {
        // Capturar el mensaje del backend
        setErrorMessage(error.response.data.error || "Error al actualizar la contraseña.");
        setSuccessMessage(""); // Limpiar mensaje de éxito
      } else {
        setErrorMessage("Error de conexión con el servidor.");
        setSuccessMessage(""); // Limpiar mensaje de éxito
      }
    }
  };

  return (
    <>
      <Header />
      <div className="py-5 mt-2">
        <div className="container mt-5 py-5 px-4 col-lg-4 bg-dark text-light rounded">
          <h2 className="text-center">Actualizar Contraseña</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Contraseña Actual
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Ingresa tu contraseña actual"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                Nueva Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                required
                minLength="5"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Repetir Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu nueva contraseña"
                required
                minLength="5"
              />
            </div>
            {errorMessage && (
              <div className="text-danger mb-3">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-success mb-3">{successMessage}</div>
            )}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Actualizar Contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdatePasswordForm;
