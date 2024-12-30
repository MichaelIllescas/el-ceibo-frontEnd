import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "/src/index/Login";
import Index from "/src/index/Index";
import VerCuotas from "../Cuotas/VerCuotas";
import RegistrarCuota from "../Cuotas/ResgistroCuotas";
import ActualizarCuotas from "../Cuotas/ActualizarCuotas";
import RegistrarCategoria from "../Categoria/RegistrarCategoria";
import VerCategoria from "../Categoria/VerCategoria";
import ActualizarCategoria from "../Categoria/ActualizarCategoria";
// import VerSocios from "../Socios/VerSocios";
// import RegistrarSocio from "../Socios/RegistrarSocio";


const Enrrutado = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/index" element={<Index />} />
      <Route path="/RegistarCategoria" element={<RegistrarCategoria/>}/>
      <Route path="/VerCategoria" element={<VerCategoria/>}/>
      <Route path="/ActualizarCategoria" element={<ActualizarCategoria/>}/>
      <Route path="/verCuotas" element={<VerCuotas />} />
      <Route path="/registrarCuota" element={<RegistrarCuota />} />
      <Route path="/actualizarCuotas" element={<ActualizarCuotas />} />
      {/* <Route path="/VerSocios" element={<VerSocios/>}/> */}
      {/* <Route path="/RegistrarSocio" element={<RegistrarSocio/>}/> */}

    </Routes>
  );
};

export default Enrrutado;
