import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import TableGeneric from "/src/Components/TableGeneric";
import EditarJugador from "/src/Jugadores/EditarJugador";
import apiClient from "../Config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import EditarUsuario from "./EditarUsuario";

const VerUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar el spinner o carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [selectedPlayerId, setSelectedPlayerId] = useState(null); // Estado para el jugador seleccionado

  // Función para obtener los jugadores desde el backend
  const fetchUsuarios = async () => {
    try {
      const response = await apiClient.get("/api/users/getAllUsers");

      
      setUsuarios(response.data); // Asignar los usuarios al estado
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
      setError("No se pudieron cargar los usuarios. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios(); // Llama a la función al montar el componente
  }, []);

  const handleEdit = (playerId) => {
    setSelectedPlayerId(playerId); // Establece el socio seleccionado para edición
  };

  const actions = [
    {
      label: "Editar",
      className: "btn-warning",
      onClick: (row) => handleEdit(row.id), // Lógica para el botón de edición
    },
  ];

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-content-center py-5">
        <div className="mt-5 col-lg-10 ">
          {loading ? (
            <p className="text-center">Cargando usuarios...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <TableGeneric
              titulo={"Ver Usuarios"}
              data={usuarios}
              actions={actions}
            />
          )}
        </div>
      </div>

      {/* Modal de edición */}
      {selectedPlayerId && (
        <EditarUsuario
          playerId={selectedPlayerId} // ID del jugador a editar
          onClose={() => setSelectedPlayerId(null)} // Cierra el modal
          onUpdate={fetchJugadores} // Refresca la lista después de actualizar
        />
      )}

      <Footer />
    </>
  );
};

export default VerUsuarios;
