import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import TableGeneric from "/src/Components/TableGeneric";
import apiClient from "../Config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const CambioEstadoSocio = () => {
  const [socios, setSocios] = useState([]); // Estado para almacenar los socios
  const [loading, setLoading] = useState(true); // Estado para manejar el spinner o carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [selectedSocio, setSelectedSocio] = useState(null); // Estado para el socio seleccionado
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [action, setAction] = useState(""); // Acción actual: habilitar o anular

  // Función para obtener los socios desde el backend
  const fetchSocios = async () => {
    try {
      const response = await apiClient.get(
        "/api/socios"
      );
      setSocios(response.data);
    } catch (err) {
      console.error("Error al obtener los socios:", err);
      setError("No se pudieron cargar los socios. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocios(); // Llama a la función al montar el componente
  }, []);

  // Mostrar el modal y establecer la acción (habilitar/anular)
  const handleActionClick = (socio, actionType) => {
    setSelectedSocio(socio); // Establece el socio seleccionado
    setAction(actionType); // Define la acción
    setShowModal(true); // Muestra el modal
  };

  // Confirmar la acción (habilitar/anular)
  const handleConfirmAction = async () => {
    try {
      const endpoint =
        action === "anular"
          ? `/api/socios/${selectedSocio.id}/anular`
          : `/api/socios/${selectedSocio.id}/habilitar`;

      await apiClient.put(endpoint); // Llamada al backend
      setShowModal(false); // Cierra el modal
      fetchSocios(); // Refresca la lista de socios
    } catch (err) {
      console.error(`Error al ${action} el socio:`, err);
      setError(`No se pudo ${action} el socio. Intente nuevamente.`);
    }
  };

  // Generar datos con acciones embebidas
  const sociosConAcciones = socios.map((socio) => ({
    ...socio,
    acciones: (
      <button
        className={`btn ${
          socio.estado === "ACTIVO" ? "btn-danger" : "btn-success"
        } me-2`}
        onClick={() =>
          handleActionClick(
            socio,
            socio.estado === "ACTIVO" ? "anular" : "habilitar"
          )
        }
      >
        {socio.estado === "ACTIVO" ? "Anular" : "Habilitar"}
      </button>
    ),
  }));

  return (
    <>
      <Header />
      <div className="pt-2 mt-2 vh-50">
      <div className="d-flex justify-content-center align-content-center">
        <div className="mt-5 col-lg-12 text-center">
          {loading ? (
            <p className="text-center">Cargando socios...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <TableGeneric 
              titulo={"Estado de los Socios"}
              data={sociosConAcciones}
            />
          )}
        </div>
      </div>
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Acción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres {action} a {selectedSocio?.nombre}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant={action === "anular" ? "danger" : "success"}
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

export default CambioEstadoSocio;
