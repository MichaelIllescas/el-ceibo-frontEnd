import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import TableGeneric from "/src/Components/TableGeneric";
import apiClient from "../Config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const CambioEstadoJugador = () => {
  const [jugadores, setJugadores] = useState([]); // Estado para almacenar los jugadores
  const [loading, setLoading] = useState(true); // Estado para manejar el spinner o carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Estado para el jugador seleccionado
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [action, setAction] = useState(""); // Acción actual: habilitar o deshabilitar

  // Función para obtener los jugadores desde el backend
  const fetchJugadores = async () => {
    try {
      const response = await apiClient.get(
        "/api/jugadores/estados"
      );
      setJugadores(response.data);
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

  // Mostrar el modal y establecer la acción (habilitar/deshabilitar)
  const handleActionClick = (player, actionType) => {
    setSelectedPlayer(player); // Establece el jugador seleccionado
    setAction(actionType); // Define la acción
    setShowModal(true); // Muestra el modal
  };

  // Confirmar la acción (habilitar/deshabilitar)
  const handleConfirmAction = async () => {
    try {
      const endpoint =
        action == "deshabilitar"
          ? `/api/jugadores/deshabilitar/${selectedPlayer.id}`
          : `/api/jugadores/habilitar/${selectedPlayer.id}`;

      await apiClient.put(endpoint); // Llamada al backend
      setShowModal(false); // Cierra el modal
      fetchJugadores(); // Refresca la lista de jugadores
    } catch (err) {
      console.error(`Error al ${action} el jugador:`, err);
      setError(`No se pudo ${action} el jugador. Intente nuevamente.`);
    }
  };

  // Generar datos con acciones embebidas
  const jugadoresConAcciones = jugadores.map((jugador) => ({
    ...jugador,
    acciones: (
      <button
        className={`btn ${
          jugador.estado == "ACTIVO" ? "btn-danger" : "btn-success"
        } me-2`}
        onClick={() =>
          handleActionClick(
            jugador,
            jugador.estado == "ACTIVO" ? "deshabilitar" : "habilitar"
          )
        }
      >
        {jugador.estado == "ACTIVO" ? "Deshabilitar" : "Habilitar"}
      </button>
    ),
  }));

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-content-center py-5">
        <div className="mt-5 col-lg-10">
          {loading ? (
            <p className="text-center">Cargando jugadores...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <TableGeneric
              titulo={"Estado de los Jugadores"}
              data={jugadoresConAcciones}
            />
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Acción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres {action} a {selectedPlayer?.nombre}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant={action === "deshabilitar" ? "danger" : "success"}
            onClick={handleConfirmAction}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default CambioEstadoJugador;
