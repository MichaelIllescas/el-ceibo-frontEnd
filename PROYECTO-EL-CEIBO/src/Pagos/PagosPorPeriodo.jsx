import  { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig"; 
import TableGeneric from "/src/components/TableGeneric";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";

const VerPagosPorPeriodo = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [añoSeleccionado, setAñoSeleccionado] = useState("");
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener los pagos según los filtros seleccionados
  const fetchPagos = async () => {
    setLoading(true);
    try {
      // Construimos la URL con los parámetros optativos
      let url = "/api/pagos/por-periodo?";
      if (añoSeleccionado) url += `año=${añoSeleccionado}&`;
      if (mesSeleccionado) url += `mes=${mesSeleccionado}&`;
      if (diaSeleccionado) url += `dia=${diaSeleccionado}`;

      // Eliminar el último "&" si quedara colgando
      url = url.endsWith("&") ? url.slice(0, -1) : url;

      const response = await apiClient.get(url);
      setPagos(response.data);
    } catch (error) {
      console.error("Error al obtener pagos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Actualiza la lista de pagos automáticamente cada vez que cambian los filtros
  useEffect(() => {
    fetchPagos();
    // eslint-disable-next-line
  }, [diaSeleccionado, mesSeleccionado, añoSeleccionado]);

  return (
    <>
      <Header />
      <div className="pt-3 pb-3">
        <div className="container my-5 py-5">
          <div className="bg-black text-light p-4 rounded">
            <h2>Historial de pagos por Fecha </h2>

            {/* Selector de Año */}
            <div className="mb-3">
              <label className="form-label">Seleccionar Año:</label>
              <select
                className="form-select w-100"
                value={añoSeleccionado}
                onChange={(e) => setAñoSeleccionado(e.target.value)}
              >
                <option value="">Todos los años</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={2025 + i} value={2025 + i}>
                    {2025 + i}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de Mes */}
            <div className="mb-3">
              <label className="form-label">Seleccionar Mes:</label>
              <select
                className="form-select w-100"
                value={mesSeleccionado}
                onChange={(e) => setMesSeleccionado(e.target.value)}
              >
                <option value="">Todos los meses</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("es", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de Día */}
            <div className="mb-3">
              <label className="form-label">Seleccionar Día:</label>
              <select
                className="form-select w-100"
                value={diaSeleccionado}
                onChange={(e) => setDiaSeleccionado(e.target.value)}
              >
                <option value="">Todos los días</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Tabla de Pagos */}
            {loading ? (
              <p>Cargando pagos...</p>
            ) : pagos.length > 0 ? (
              <TableGeneric
                titulo="Pagos Filtrados"
                data={pagos} 
         
                actions={[]}
              />
            ) : (
              <p>No hay pagos disponibles para el período seleccionado.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerPagosPorPeriodo;
