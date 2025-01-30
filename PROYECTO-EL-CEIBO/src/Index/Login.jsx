import  { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig";
import logo from '../assets/img/logo-el-ceibo.png';
import Footer from "./Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

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
    e.preventDefault();

    if (!doValidation()) return;

    try {
      const response = await apiClient.post("/auth/login", { email, password });
      if (rememberMe) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
      if (response.status==200){
        window.location.href = "/index";
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Usuario o contraseña incorrectos.");
        } else if (error.response.status === 500) {
          setErrorMessage("Error al conectarse al servidor. Intente más tarde.");
        } else if (error.response.status === 403) {
          setErrorMessage("Usuario Inhabilitado.");
        }  
        else {
          setErrorMessage("Ocurrió un error inesperado.");
        }
      } else {
        setErrorMessage("No se pudo conectar al servidor. Verifique su conexión a Internet.");
      }
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center shadow-lg pb-5 px-1">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-3">
          <img
            src={logo}
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
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="form-check-label">
              Recordar email en este dispositivo
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-3">
          <a
            href="#"
            className="text-primary text-decoration-none"
            data-bs-toggle="modal"
            data-bs-target="#forgotPasswordModal"
          >
            ¿Olvidó su contraseña?
          </a>
        </div>
      </div>
      <Footer/>

      {/* Modal */}
      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex="-1"
        aria-labelledby="forgotPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotPasswordModalLabel">
                Recuperar Contraseña
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Debe contactarse con el directivo administrador de la institución para resetear su contraseña.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
