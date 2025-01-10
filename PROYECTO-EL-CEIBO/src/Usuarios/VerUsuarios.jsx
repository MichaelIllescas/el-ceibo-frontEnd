import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import TableGeneric from "/src/Components/TableGeneric";
import apiClient from "../Config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import EditarUsuario from "./EditarUsuario";

const VerUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
  };

  const actions = [
    {
      label: "Editar",
      className: "btn-warning",
      onClick: (row) => handleEdit(row.id),
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
            <TableGeneric titulo={"Ver Usuarios"} data={usuarios} actions={actions} />
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

      <Footer />
    </>
  );
};

export default VerUsuarios;
