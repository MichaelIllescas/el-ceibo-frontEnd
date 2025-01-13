import React, { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig";
import { Modal, Button, Form } from "react-bootstrap";
import Footer from "../Index/Footer";
import Header from "../Navbar/Header";

const VerPerfil = () => {
 const [user, setUser] = useState({
     id: null,
     nombre: "",
     apellido: "",
     dni: "",
     telefono: "",
     direccion: "",
     email: "",
     estado: "activo",
     rol: "", // Rol inicial como string vacío
   });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/api/users/perfil");
        setUser(response.data);
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err);
        setError("No se pudieron cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await apiClient.put(`/api/users/${user.id}`, user);
      setShowModal(false);
    } catch (err) {
      console.error("Error al actualizar los datos:", err);
      setError("No se pudieron actualizar los datos. Intente nuevamente.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5 pt-5">
        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <>
            
            <div className="py-3 card bg-black text-light text-center col-lg-6 mx-auto">
            <h1>Mi Perfil</h1>
            <hr className="shadow"/>
              <div className="card-body">
                <p><strong>Nombre:</strong> {user.nombre}</p>
                <p><strong>Apellido:</strong> {user.apellido}</p>
                <p><strong>DNI:</strong> {user.dni}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Teléfono:</strong> {user.telefono}</p>
                <p><strong>Dirección:</strong> {user.direccion}</p>
                <p><strong>Rol:</strong> {user.rol}</p>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Actualizar datos
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={user.apellido}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={user.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={user.direccion}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                name="dni"
                value={user.dni}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VerPerfil;
