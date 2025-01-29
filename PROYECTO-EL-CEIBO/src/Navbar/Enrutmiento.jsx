import React from "react";
import { Routes, Route } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 
import { getCookie } from "../Auth/cookieUtils";
import Login from "../Index/Login"
import Index from "../index/Index";
import VerCuotas from "../Cuotas/VerCuotas";
import RegistrarCuota from "../Cuotas/ResgistroCuotas";
import ActualizarCuotas from "../Cuotas/ActualizarCuotas";
import RegistrarCategoria from "../Categoria/RegistrarCategoria";
import VerCategoria from "../Categoria/VerCategoria";
import ActualizarCategoria from "../Categoria/ActualizarCategoria";
import VerSocios from "../Socios/VerSocios";
import RegistrarSocio from "../Socios/RegistrarSocio";
import RegistroJugadores from "../Jugadores/RegistroJugadores";
import VerJugadores from "../Jugadores/VerJugadores";
import EditarJugador from "../Jugadores/EditarJugador";
import CambioEstadoJugador from "../Jugadores/CambiarEstadoJugador";
import RegistrarPago from "../Pagos/RegistrarPago ";
import VerListadoGeneralPagos from "../Pagos/VerPagosGeneral";
import FiltrarHistorial from "../Pagos/FiltrarHistorial";
import CambiarEstadoSocio from "../Socios/CambiarEstadoSocio"
import FiltrarPagosPorCategoria from "../Pagos/FiltrarPagosPorCategoria";
import FiltrarJugadoresPorCategoria from "../Jugadores/ListadoDeJugadores";
import VerPagosPorPeriodo from "../Pagos/PagosPorPeriodo";
import GraficoRecaudaciones from "../Recaudaciones/RecaudacionesAnuales";
import VerRecaudacionesTrimestrales from "../Recaudaciones/VerRecaudacionesTrimestrales ";
import RegistroUsuario from "../Usuarios/RegistrarUsuario";
import VerUsuarios from "../Usuarios/VerUsuarios";
import CambioEstadoUsuario from "../Usuarios/CambiarEstadoUsuario";
import VerPerfil from "../Usuarios/VerPerfil";
import UpdatePasswordForm from "../Usuarios/CambiarClave";

const Enrrutado = () => {

   // Obtener el valor de la cookie "authToken"
    const token = getCookie("authToken");

    // Decodificar el token para obtener el rol del usuario
    let role = null;
    if (token) {
      const decoded = jwtDecode(token); // Uso correcto de jwtDecode
      role = decoded.role; // Ajusta según tu JWT
    }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/index" element={<Index />} />
   
      {role === "ADMIN" && (   <Route path="/RegistarCategoria" element={<RegistrarCategoria />} /> 
      )}

      <Route path="/VerCategoria" element={<VerCategoria />} />
      <Route path="/ActualizarCategoria" element={<ActualizarCategoria />} />
      <Route path="/verCuotas" element={<VerCuotas />} />
      
      {role === "ADMIN" && ( <Route path="/registrarCuota" element={<RegistrarCuota />} /> 
      )}

      {role === "ADMIN" && ( 
      <Route path="/actualizarCuotas" element={<ActualizarCuotas />} />
      )}

      <Route path="/VerSocios" element={<VerSocios />} />
      <Route path="/RegistrarSocio" element={<RegistrarSocio />} />
      <Route path="/cambiarEstadoSocio" element={<CambiarEstadoSocio />} />

      <Route path="/registrarJugador" element={<RegistroJugadores />} />
      <Route path="/verJugadores" element={<VerJugadores />} />
      <Route path="/editarJugador" element={<EditarJugador />} />
      <Route path="/cambioEstado" element={<CambioEstadoJugador />} />
      <Route path="/listadoDeJugadoresPorCategoria" element={<FiltrarJugadoresPorCategoria/>}></Route>
      <Route path="/verPagosPorPeriodo" element={<VerPagosPorPeriodo/>}></Route>

      <Route path="/registrarPago" element={<RegistrarPago />} />
      <Route path="/ListadoPagosGeneral" element={<VerListadoGeneralPagos />} />
      <Route path="/filtrarHistorial" element={<FiltrarHistorial />} />
      <Route path="/filtrarPagoPorCategoria" element={<VerPagosPorPeriodo/>}></Route>
      <Route path="/historialDePagpPorCategoria" element  ={<FiltrarPagosPorCategoria/>}></Route>

      <Route path="/recaudacionesAnuales" element={<GraficoRecaudaciones/>}></Route>
      <Route path="/recaudacionTrimestral" element={<VerRecaudacionesTrimestrales/>}></Route>

      {role === "ADMIN" && ( <Route path="/registrarUsuario" element={<RegistroUsuario/>}></Route>
      )}

      {role === "ADMIN" && ( <Route path="/verUsuarios" element={<VerUsuarios/>}></Route>
      )}

      {role === "ADMIN" && ( <Route path="/cambiar-estado-usuario" element={<CambioEstadoUsuario/>}></Route>
      )}


      <Route path="/actualziar-perfil" element={<VerPerfil/>}></Route>

      <Route path="/actualziar-clave" element={<UpdatePasswordForm/>}></Route>




    </Routes>
  );
};

export default Enrrutado;
