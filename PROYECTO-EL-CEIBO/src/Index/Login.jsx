import React, { useState } from "react";

// import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const doValidation = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    document.getElementById("errorEmail").innerHTML = email.checkValidity()
      ? ""
      : email.validationMessage;

    document.getElementById("errorPassword").innerHTML =
      password.checkValidity() ? "" : password.validationMessage;
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
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Ingrese su email"
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
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={doValidation}
          >
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
