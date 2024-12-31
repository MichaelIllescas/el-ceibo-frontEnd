import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (

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
            {/* Socios */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="sociosDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Socios
              </a>
              <ul className="dropdown-menu" aria-labelledby="sociosDropdown">
                <li>
                  <Link to="/VerSocios" className="dropdown-item" href="#">
                    Lista de Socios
                  </Link>
                </li>
              
                <li>
                      <Link to="/RegistrarSocio" className="dropdown-item" href="#">
                        Registrar Socio
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Actualizar Datos
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Cambiar Estado
                      </a>
                    </li>
                
              
               
            
              </ul>
            </li>

            {/* Jugadores */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="jugadoresDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Jugadores
              </a>
              <ul className="dropdown-menu" aria-labelledby="jugadoresDropdown">
                <li>
                  <Link to={"/verJugadores"} className="dropdown-item">
                    Lista de Jugadores
                  </Link>
                </li>
                <li>
                      <Link to ={"/registrarJugador"} className="dropdown-item" >
                        Registrar Jugador
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Actualizar Datos
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Cambiar Estado
                      </a>
                    </li>
                   
                <li>
                  <a className="dropdown-item" href="#">
                    Pagos de Jugadores
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Reporte de Jugadores
                  </a>
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
                Cuotas
              </a>
              <ul className="dropdown-menu" aria-labelledby="cuotasDropdown">
                <li>
                  <Link to="/registrarCuota" className="dropdown-item" href="#">
                    Registrar Tipo de Cuota
                  </Link>
                </li>
                <li>
                  <Link to="/actualizarCuotas" className="dropdown-item" href="#">
                    Actualizar Montos
                  </Link>
                </li>
                <li>
                  <Link to="/verCuotas" className="dropdown-item" href="#">
                    Consultar Tipos de Cuotas
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
                Categorías
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="categoriasDropdown"
              >
                <li>
                  <Link to={"/RegistarCategoria"} className="dropdown-item" href="#">
                    Registrar Categoría
                  </Link>
                </li>
                <li>
                  <Link to={"/VerCategoria"} className="dropdown-item" href="#">
                    Ver Categorías
                  </Link>
                </li>
                <li>
                  <Link to="/ActualizarCategoria" className="dropdown-item" href="#">
                    Actualizar Categoría
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
                Pagos
              </a>
              <ul className="dropdown-menu" aria-labelledby="pagosDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Registrar Pago
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Ver Pagos Realizados
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Consultar Deudas
                  </a>
                </li>
                <li>
                      <a className="dropdown-item" href="#">
                       Reporte de Pagos Por Jugador
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                         Reporte de Pagos Por Categoría
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Reporte de Pagos por Por Período
                      </a>
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
                Recaudaciones
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="recaudacionesDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Ver Recaudaciones
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Consultar Totales
                  </a>
                </li>
                <li>
                      <a className="dropdown-item" href="#">
                        Recaudación Por Categoría
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Recaudación Por Periodo
                      </a>
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
                Usuarios
              </a>
              <ul className="dropdown-menu" aria-labelledby="usuariosDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Registrar Usuario
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Ver Usuarios
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Actualizar Usuario
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Cambiar Estado
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Historial de Actividades
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
