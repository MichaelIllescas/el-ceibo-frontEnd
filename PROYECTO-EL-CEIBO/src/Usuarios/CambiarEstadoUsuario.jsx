import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import TableGeneric from "/src/Components/TableGeneric";
import apiClient from "../Config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const CambioEstadoUsuario = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar el spinner o carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [selectedUsuario, setSelectedUsuario] = useState(null); // Estado para el usuario seleccionado
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [action, setAction] = useState(""); // Acción actual: habilitar o anular

  // Función para obtener los usuarios desde el backend
  const fetchUsuarios = async () => {
    try {
      const response = await apiClient.get("/api/users/estados-usuarios");
      setUsuarios(response.data);
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

  // Mostrar el modal y establecer la acción (habilitar/anular)
  const handleActionClick = (usuario, actionType) => {
    setSelectedUsuario(usuario); // Establece el usuario seleccionado
    setAction(actionType); // Define la acción
    setShowModal(true); // Muestra el modal
  };

  // Confirmar la acción (habilitar/anular)
  const handleConfirmAction = async () => {
    try {
      const endpoint =
        action === "anular"
          ? `/api/users/${selectedUsuario.id}/anular`
          : `/api/users/${selectedUsuario.id}/habilitar`;

      await apiClient.put(endpoint); // Llamada al backend
      setShowModal(false); // Cierra el modal
      fetchUsuarios(); // Refresca la lista de usuarios
    } catch (err) {
      console.error(`Error al ${action} el usuario:`, err);
      setError(`No se pudo ${action} el usuario. Intente nuevamente.`);
    }
  };

  // Generar datos con acciones embebidas
  const usuariosConAcciones = usuarios.map((usuario) => ({
    ...usuario,
    acciones: (
      <button
        className={`btn ${
          usuario.estado === "ACTIVO" ? "btn-danger" : "btn-success"
        } me-2`}
        onClick={() =>
          handleActionClick(
            usuario,
            usuario.estado === "ACTIVO" ? "anular" : "habilitar"
          )
        }
      >
        {usuario.estado === "ACTIVO" ? "Anular" : "Habilitar"}
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
              <p className="text-center">Cargando usuarios...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              <TableGeneric
                titulo={"Estado de los Usuarios"}
                data={usuariosConAcciones}
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
          ¿Estás seguro de que quieres {action} a {selectedUsuario?.nombre}?
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

export default CambioEstadoUsuario;
