import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import apiClient from "../Config/axiosConfig";
 
const handleLogout = async () => {
  try {
    // 1. Informar al servidor sobre el cierre de sesión
    await apiClient.post("/auth/logout");

    // 2. Eliminar el token del almacenamiento local (si es que lo usas)
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // 3. Redirigir al usuario a la página de inicio de sesión
    window.location.href = "/";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    alert("Ocurrió un error al intentar cerrar la sesión. Inténtalo nuevamente.");
  }
};

const NavBar = () => {
  return (
    <>
      {" "}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top nav">
        <div className="container">
          <Link to={"/index"} className="navbar-brand" href="#">
            <img
              src="./src/assets/img/logo-el-ceibo.png"
              width="70"
              height="65"
              className="d-inline-block align-top"
              alt="Logo El Ceibo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              {/* Gestión de Socios */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="sociosDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-id-card"></i> Socios
                </a>
                <ul className="dropdown-menu" aria-labelledby="sociosDropdown">
               
                  <li>
                    <Link to="/RegistrarSocio" className="dropdown-item">
                      <i className="fas fa-user-plus"></i> Registrar Socio
                    </Link>
                  </li>
                  <li>
                    <Link to="/VerSocios" className="dropdown-item">
                      <i className="fas fa-list"></i> Lista de Socios
                    </Link>
                  </li>
                
                  <li>
                    <Link to={"/cambiarEstadoSocio"} className="dropdown-item" >
                      <i className="fas fa-exchange-alt"></i> Cambiar Estado
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Gestión de Jugadores */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="jugadoresDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-users"></i> Jugadores
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="jugadoresDropdown"
                >
                  
                  <li>
                    <Link to={"/registrarJugador"} className="dropdown-item">
                      <i className="fas fa-user-plus"></i> Registrar Jugador
                    </Link>
                  </li>
                  <li>
                    <Link to={"/verJugadores"} className="dropdown-item">
                      <i className="fas fa-list"></i> Lista General de Jugadores
                    </Link>
                  </li>
                  <li>
                    <Link to={"/listadoDeJugadoresPorCategoria"} className="dropdown-item">
                      <i className="fas fa-list"></i> Lista de Jugadores por Categoría
                    </Link>
                  </li>
                  <li>
                    <Link to={"/cambioEstado"} className="dropdown-item">
                      <i className="fas fa-exchange-alt"></i> Cambiar Estado
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Gestión de Cuotas */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="cuotasDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-file-invoice-dollar"></i> Cuotas
                </a>
                <ul className="dropdown-menu" aria-labelledby="cuotasDropdown">
                  <li>
                    <Link
                      to="/registrarCuota"
                      className="dropdown-item"
                      href="#"
                    >
                      <i className="fas fa-plus-circle"></i> Registrar Tipo de
                      Cuota
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/actualizarCuotas"
                      className="dropdown-item"
                      href="#"
                    >
                      <i className="fas fa-edit"></i> Actualizar Montos
                    </Link>
                  </li>
                  <li>
                    <Link to="/verCuotas" className="dropdown-item" href="#">
                      <i className="fas fa-list"></i> Consultar Tipos de Cuotas
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Gestión de Categorías */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="categoriasDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-tags"></i> Categorías
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="categoriasDropdown"
                >
                  <li>
                    <Link
                      to={"/RegistarCategoria"}
                      className="dropdown-item"
                      href="#"
                    >
                      <i className="fas fa-plus-circle"></i> Registrar Categoría
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/VerCategoria"}
                      className="dropdown-item"
                      href="#"
                    >
                      <i className="fas fa-list"></i> Ver Categorías
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ActualizarCategoria"
                      className="dropdown-item"
                      href="#"
                    >
                      <i className="fas fa-edit"></i> Actualizar Categoría
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Gestión de Pagos */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="pagosDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-money-bill-wave"></i> Pagos
                </a>
                <ul className="dropdown-menu" aria-labelledby="pagosDropdown">
                  <li>
                    <Link to={"/registrarPago"} className="dropdown-item">
                      <i className="fas fa-plus-circle"></i> Registrar Pago
                    </Link>
                  </li>
                  <li>
                    <Link to={"/ListadoPagosGeneral"} className="dropdown-item">
                      <i className="fas fa-eye"></i> Ver Historial General de Pagos
                    </Link>
                  </li>

                  <li>
                    <Link to={"/filtrarHistorial"} className="dropdown-item">
                      <i className="fas fa-user"></i> Historial de Pagos Por
                      Jugador/Socio
                    </Link>
                  </li>
                  <li>
                    <Link to={"/historialDePagpPorCategoria"} className="dropdown-item">
                      <i className="fas fa-th-list"></i> Reporte de Pagos Por
                      Categoría
                    </Link>
                  </li>
                  <li>
                    <Link to={"/verPagosPorPeriodo"} className="dropdown-item" >
                      <i className="fas fa-calendar-alt"></i> Reporte de Pagos
                      por Fecha
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Gestión de Recaudaciones */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="recaudacionesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-wallet"></i> Recaudaciones
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="recaudacionesDropdown"
                >
                  <li>
                    <Link to={"/recaudacionesAnuales"} className="dropdown-item" >
                      <i className="fas fa-eye"></i> Recaudaciones Menusales
                    </Link>
                  </li>
                  <li>
                    <Link to={"/recaudacionTrimestral"} className="dropdown-item" >
                      <i className="fas fa-chart-line"></i> Recaudaciones Trimestrales
                    </Link>
                  </li>
               
                </ul>
              </li>

              {/* Gestión de Usuarios */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="usuariosDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-users-cog me-2"></i>Usuarios
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="usuariosDropdown"
                >
                  <li>
                    <Link to={"/registrarUsuario"} className="dropdown-item" >
                      <i className="fas fa-user-plus me-2"></i>Registrar Usuario
                    </Link>
                  </li>
                  <li>
                    <Link to={"/verUsuarios"} className="dropdown-item" >
                      <i className="fas fa-users me-2"></i>Ver Usuarios
                    </Link>
                  </li>
                 
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-user-times me-2"></i>Cambiar Estado
                    </a>
                  </li>
               
                </ul>
              </li>
            </ul>
            {/* Menú de usuario */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle fa-lg me-2"></i>
                  Usuario
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to="/actualizar-datos" className="dropdown-item">
                      <i className="fas fa-user-edit me-2"></i>Actualizar Datos
                    </Link>
                  </li>
                  <li>
                    <Link to="/cambiar-contraseña" className="dropdown-item">
                      <i className="fas fa-key me-2"></i>Cambiar Contraseña
                    </Link>
                  </li>
                  <li className="d-flex justify-align-content-lg-center ">
                    <button
                      type="button"
                      className="dropdown-item d-flex "
                      data-bs-toggle="modal"
                      data-bs-target="#confirmLogoutModal"
                      style={{
                        border: "none",
                        background: "none",
                        padding: 0,
                        textAlign: "center",
                      }}
                    >
                      <i className="fas fa-sign-out-alt mx-3"></i>
                      <span className="">Cerrar Sesión</span>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        {/* Modal de Confirmación de Cerrar Sesión */}
        <div
          className="modal fade"
          id="confirmLogoutModal"
          tabIndex="-1"
          aria-labelledby="confirmLogoutModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmLogoutModalLabel">
                  Confirmación de Cierre de Sesión
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro de que deseas cerrar sesión?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
  type="button"
  className="btn btn-danger"
  onClick={handleLogout}
  data-bs-dismiss="modal"
>
  Cerrar Sesión
</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
