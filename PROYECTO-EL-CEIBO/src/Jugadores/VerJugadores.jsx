import  { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import TableGeneric from "/src/Components/TableGeneric";
import EditarJugador from "/src/Jugadores/EditarJugador";
import apiClient from "../Config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";

const VerJugadores = () => {
  const [jugadores, setJugadores] = useState([]); // Estado para almacenar los jugadores
  const [loading, setLoading] = useState(true); // Estado para manejar el spinner o carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [selectedPlayerId, setSelectedPlayerId] = useState(null); // Estado para el jugador seleccionado

  // Función para obtener los jugadores desde el backend
  const fetchJugadores = async () => {
    try {
      const response = await apiClient.get("/api/jugadores");

      
      setJugadores(response.data); // Asignar los jugadores al estado
    } catch (err) {
      console.error("Error al obtener los jugadores:", err);
      setError("No se pudieron cargar los jugadores. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJugadores(); // Llama a la función al montar el componente
  }, []);

  const handleEdit = (playerId) => {
    setSelectedPlayerId(playerId); // Establece el jugador seleccionado para edición
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
        <div className="mt-3 col-lg-10 px-1 mx-1 pb-5">
          {loading ? (
            <p className="text-center">Cargando jugadores...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <TableGeneric
              titulo={"Ver Jugadores"}
              data={jugadores}
              actions={actions}
            />
          )}
        </div>
      </div>

      {/* Modal de edición */}
      {selectedPlayerId && (
        <EditarJugador
          playerId={selectedPlayerId} // ID del jugador a editar
          onClose={() => setSelectedPlayerId(null)} // Cierra el modal
          onUpdate={fetchJugadores} // Refresca la lista después de actualizar
        />
      )}

      <Footer />
    </>
  );
};

export default VerJugadores;
