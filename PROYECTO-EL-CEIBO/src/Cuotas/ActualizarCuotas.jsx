import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import axios from "axios";

const ActualizarCuotas = () => {
  const [feeTypes, setFeeTypes] = useState([]); // Tipos de cuotas desde el backend
  const [selectedFeeType, setSelectedFeeType] = useState(null); // Tipo de cuota seleccionado
  const [formData, setFormData] = useState({ type: "", amount: "" }); // Datos del formulario
  const [message, setMessage] = useState(null); // Mensaje de éxito o error
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error al cargar los datos

  // Cargar tipos de cuotas desde el backend
  useEffect(() => {
    const fetchFeeTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/cuotas");
        setFeeTypes(response.data);
      } catch (err) {
        console.error("Error al cargar los tipos de cuotas:", err);
        setError(
          "No se pudieron cargar los tipos de cuotas. Intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeeTypes();
  }, []);

  // Manejar cambios en el tipo de cuota seleccionado
  const handleSelectChange = (e) => {
    const feeTypeId = e.target.value;
    const selected = feeTypes.find(
      (feeType) => feeType.id === parseInt(feeTypeId, 10)
    );
    setSelectedFeeType(selected);
    setFormData({ type: selected.tipo, amount: selected.monto });
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar los cambios al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFeeType) {
      setMessage({
        text: "Por favor, selecciona un tipo de cuota.",
        type: "error",
      });
      return;
    }

    try {
      const updatedFee = {
        tipo: formData.type,
        monto: parseFloat(formData.amount),
      };

      await axios.put(
        `http://192.168.0.103:8080/api/cuotas/${selectedFeeType.id}`,
        updatedFee
      );

      setMessage({
        text: "Tipo de cuota actualizado con éxito.",
        type: "success",
      });

      // Actualizar la lista de cuotas en el estado
      setFeeTypes((prevFeeTypes) =>
        prevFeeTypes.map((fee) =>
          fee.id === selectedFeeType.id
            ? { ...fee, tipo: formData.type, monto: formData.amount }
            : fee
        )
      );

      setSelectedFeeType(null); // Limpiar selección
      setFormData({ type: "", amount: "" }); // Limpiar formulario
    } catch (err) {
      console.error("Error al actualizar el tipo de cuota:", err);
      setMessage({
        text: "Error al actualizar el tipo de cuota. Intente nuevamente.",
        type: "error",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="mt-5 pt-3">
        <div className="container mt-5 colg-sm-12 p-3 rounded col-lg-4 bg-dark text-light">
          <h3 className="text-center mb-4">Actualizar Monto de Cuotas</h3>
          {loading ? (
            <p className="text-center">Cargando tipos de cuotas...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 shadow">
              {/* Selección del tipo de cuota */}
              <div className="mb-3">
                <label htmlFor="feeTypeSelect" className="form-label">
                  Selecciona un tipo de cuota
                </label>
                <select
                  id="feeTypeSelect"
                  className="form-select"
                  onChange={handleSelectChange}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    -- Selecciona --
                  </option>
                  {feeTypes.map((feeType) => (
                    <option key={feeType.id} value={feeType.id}>
                      {feeType.tipo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mostrar datos actuales */}
              {selectedFeeType && (
                <div className="mb-3">
                  <p>
                    <strong>Tipo actual:</strong> {selectedFeeType.tipo}
                  </p>
                  <p>
                    <strong>Monto actual:</strong> $
                    {selectedFeeType.monto.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Formulario para editar */}
              {selectedFeeType && (
                <>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                      Nuevo Monto
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </>
              )}

              {/* Mensaje de confirmación o error */}
              {message && (
                <p
                  className={`fw-bold text-center ${
                    message.type === "success" ? "text-success" : "text-danger"
                  }`}
                >
                  {message.text}
                </p>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!selectedFeeType}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ActualizarCuotas;
