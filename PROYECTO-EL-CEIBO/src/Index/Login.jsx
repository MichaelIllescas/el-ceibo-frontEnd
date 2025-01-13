import React, { useState } from "react";
import apiClient from "../Config/axiosConfig";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const doValidation = () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    document.getElementById("errorEmail").innerHTML = emailInput.checkValidity()
      ? ""
      : emailInput.validationMessage;

    document.getElementById("errorPassword").innerHTML = passwordInput.checkValidity()
      ? ""
      : passwordInput.validationMessage;

    return emailInput.checkValidity() && passwordInput.checkValidity();
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    // Validar campos antes de enviar la solicitud
    if (!doValidation()) return;

    try {
      const response = await apiClient.post(
        "/auth/login", // Cambia esto por la URL de tu endpoint
        { email, password },
        
      );

      // Manejar respuesta exitosa
      console.log("Login exitoso:", response.data);
      // Redirige al usuario o realiza cualquier acción posterior al login
      window.location.href = "/index"; // Redirigir a una página de dashboard
    } catch (error) {
      // Manejar errores
      console.error("Error durante el inicio de sesión:", error);
      setErrorMessage("Error de inicio de sesión. Verifique sus credenciales.");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center shadow-lg">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-3">
          <img
            src="src/assets/img/logo-el-ceibo.png"
            alt="Logo"
            width="100"
            className="rounded-circle"
          />
          <h4 className="mt-2">Iniciar Sesión</h4>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p id="errorEmail" className="text-danger"></p>
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              } position-absolute`}
              style={{
                top: "38px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}
            ></i>
            <p id="errorPassword" className="text-danger"></p>
          </div>
          {errorMessage && (
            <p className="text-danger text-center">{errorMessage}</p>
          )}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label htmlFor="rememberMe" className="form-check-label">
              Recordar en este dispositivo
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/" className="text-primary text-decoration-none">
            ¿Olvidó su contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;