import Footer from "../Index/Footer";
import Header from "../Navbar/Header";
import React, { useState } from "react";
import apiClient from "../Config/axiosConfig";

const RegisterFeeForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Limpiar mensaje previo

    try {
      const response = await apiClient.post("/api/cuotas", {
        tipo: formData.type, // Ajuste para coincidir con los nombres de los campos en el backend
        monto: parseFloat(formData.amount), // Asegurar que el monto sea numérico
        fechaRegistro: new Date().toISOString(), // Opcional: Puedes agregar esto desde el frontend si es necesario
      });

      setMessage({ text: "Cuota registrada con éxito.", type: "success" });
      setFormData({ type: "", amount: "" }); // Limpiar formulario tras el éxito
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error(
        "Error al registrar la cuota:",
        error.response || error.message
      );
      setMessage({
        text:
          error.response?.data?.error ||
          "Error al registrar la cuota. Verifique los datos ingresados.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5 pt-3 col-lg-4 col-sm-10 d-flex m-auto">
        <form
          className=" mt-5 p-3 bg-dark border rounded shadow-lg text-light"
          onSubmit={handleSubmit}
        >
          <h4 className="text-center mb-4">Registro de Cuota</h4>

          {/* Tipo */}
          <div className="mb-4">
            <label htmlFor="type" className="form-label">
              Tipo
            </label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Ej: Jugador/Socio"
              value={formData.type}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Monto */}
          <div className="mb-4">
            <label htmlFor="amount" className="form-label">
              Monto
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Ingrese el monto"
              value={formData.amount}
              onChange={handleChange}
              className="form-control"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Mensaje de confirmación o error */}
          {message && (
            <p
              className={`text-center fw-bold ${
                message.type === "success" ? "text-success" : "text-danger"
              }`}
            >
              {message.text}
            </p>
          )}

          {/* Botón de registro */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Cuota"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RegisterFeeForm;
