import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import TableGeneric from "/src/Components/TableGeneric";
import apiClient from "../Config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import EditarUsuario from "./EditarUsuario";

const VerUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado para los usuarios
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para los errores
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para el ID del usuario a editar
  const [showResetModal, setShowResetModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [userIdToReset, setUserIdToReset] = useState(null); // Estado para el ID del usuario cuya contraseña se resetea
  const [resetMessage, setResetMessage] = useState(""); // Estado para el mensaje del modal
  const [isSuccess, setIsSuccess] = useState(false); // Estado para indicar si fue exitoso

  // Función para obtener los usuarios desde el backend
  const fetchUsuarios = async () => {
    try {
      const response = await apiClient.get("/api/users/getAllUsers");
      setUsuarios(response.data);
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
      setError("No se pudieron cargar los usuarios. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el reseteo de la contraseña
  const handleResetClave = async (userId) => {
    try {
      await apiClient.post(`/api/users/resetearClave/${userId}`); // Llamada al backend para resetear la contraseña
      setIsSuccess(true);
      setResetMessage("Clave reseteada con éxito."); // Actualizar el mensaje
      fetchUsuarios(); // Actualizar la lista de usuarios
    } catch (err) {
      console.error("Error al resetear la clave:", err);
      setIsSuccess(false);
      setResetMessage("Error al resetear la clave. Intente nuevamente."); // Actualizar el mensaje de error
    }
  };

  useEffect(() => {
    fetchUsuarios(); // Obtener usuarios cuando el componente se monta
  }, []);

  // Función para abrir el modal de reseteo de contraseña
  const openResetModal = (userId) => {
    setUserIdToReset(userId); // Establecer el ID del usuario
    setResetMessage(""); // Limpiar el mensaje previo
    setShowResetModal(true); // Mostrar el modal
  };

  // Función para cerrar el modal de reseteo de contraseña
  const closeResetModal = () => {
    setUserIdToReset(null); // Limpiar el ID del usuario
    setShowResetModal(false); // Cerrar el modal
    setResetMessage(""); // Limpiar el mensaje
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-content-center pt-1 pb-5 mb-3">
        <div className="mt-5 col-lg-10 pb-5 ">
          {loading ? (
            <p className="text-center">Cargando usuarios...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <TableGeneric
              titulo={"Ver Usuarios"}
              data={usuarios}
              actions={[
                {
                  label: "Editar",
                  className: "btn-warning",
                  onClick: (row) => setSelectedUserId(row.id),
                },
                {
                  label: "Resetear Clave",
                  className: "btn-info",
                  onClick: (row) => openResetModal(row.id),
                },
              ]}
            />
          )}
        </div>
      </div>

      {selectedUserId && (
        <EditarUsuario
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          onUpdate={fetchUsuarios}
        />
      )}

      {/* Modal de Confirmación con Bootstrap */}
      <div
        className={`modal fade ${showResetModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showResetModal ? "block" : "none" }}
        aria-labelledby="resetModalLabel"
        aria-hidden={!showResetModal}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="resetModalLabel">
                Confirmar Reseteo de Clave
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeResetModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {resetMessage && (
                <p
                  className={`text-${
                    isSuccess ? "success" : "danger"
                  }`}
                >
                  {resetMessage}
                </p>
              )}
              {!resetMessage && (
                <p>¿Está seguro que desea resetear la clave de este usuario?</p>
              )}
            </div>
            <div className="modal-footer">
              {!resetMessage && (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeResetModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleResetClave(userIdToReset)}
                  >
                    Confirmar
                  </button>
                </>
              )}
              {resetMessage && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeResetModal}
                >
                  Cerrar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VerUsuarios;
