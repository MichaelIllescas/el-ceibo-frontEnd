import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import TableGeneric from "/src/Components/TableGeneric";
import axios from "axios";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";

const VerCategoria = () => {
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const [loading, setLoading] = useState(true); // Estado para manejar el spinner o carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const actions = [
    
  ];

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://192.168.0.103:8080/api/categorias");
        setCategorias(response.data); // Asignar las categorías al estado
      } catch (err) {
        console.error("Error al obtener las categorías:", err);
        setError("No se pudieron cargar las categorías. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias(); // Llama a la función al montar el componente
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-content-center pt-4">
        <div className="mt-5 col-lg-6">
          {loading ? (
            <p className="text-center">Cargando categorías...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <TableGeneric titulo={"Ver Categorías"} data={categorias} actions={actions} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerCategoria;
