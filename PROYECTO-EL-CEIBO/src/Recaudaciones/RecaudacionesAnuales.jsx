import Footer from "../index/Footer";
import Header from "../Navbar/Header";
import { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const VerRecaudacionesAnuales = () => {
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());
  const [datosAnuales, setDatosAnuales] = useState([]);
  const [datosAnioAnterior, setDatosAnioAnterior] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  useEffect(() => {
    const fetchRecaudaciones = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `/api/recaudaciones/mensuales?year=${anioSeleccionado}`
        );
        setDatosAnuales(response.data);

        // Obtener datos del año anterior para comparación
        const responseAnterior = await apiClient.get(
          `/api/recaudaciones/mensuales?year=${anioSeleccionado - 1}`
        );
        setDatosAnioAnterior(responseAnterior.data);
      } catch (err) {
        console.error("Error al obtener las recaudaciones:", err);
        setError("No se pudieron cargar las recaudaciones. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecaudaciones();
  }, [anioSeleccionado]);

  const data = {
    labels: meses,
    datasets: [
      {
        label: `Recaudaciones ${anioSeleccionado}`,
        data: datosAnuales,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: `Recaudaciones ${anioSeleccionado - 1}`,
        data: datosAnioAnterior,
        borderColor: "rgba(192, 75, 75, 1)",
        backgroundColor: "rgba(192, 75, 75, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { color: "white" },
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
      },
    },
  };

  const totalRecaudaciones = datosAnuales.reduce((total, valor) => total + (valor || 0), 0);
  const totalRecaudacionesAnterior = datosAnioAnterior.reduce((total, valor) => total + (valor || 0), 0);
  const diferencia = totalRecaudaciones - totalRecaudacionesAnterior;
  const porcentajeCrecimiento = totalRecaudacionesAnterior !== 0 
    ? ((diferencia / totalRecaudacionesAnterior) * 100).toFixed(2) 
    : "N/A";

  return (
    <>
      <Header />
      <div className="pt-5 pb-5">
        <div className="container my-5 pt-5 pb-5 mb-5 bg-dark rounded">
        <div className="text-center mb-4">
          <h1>Recaudación Anual</h1>
          <label htmlFor="anio" className="text-white">Seleccione el año: </label>
          <select
            id="anio"
            value={anioSeleccionado}
            onChange={(e) => setAnioSeleccionado(parseInt(e.target.value))}
            className="form-select px-4 w-auto d-inline-block ms-5"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={2025 + i}>{2025 + i}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center">Cargando datos...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <>
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <Line data={data} options={options} />
              </div>
              <div className="col-lg-4">
                <div className="bg-dark text-light p-4 rounded">
                  <h3 className="mb-3">Resumen Anual</h3>
                  <p><strong>Año seleccionado:</strong> {anioSeleccionado}</p>
                  <p><strong>Total recaudado en {anioSeleccionado}:</strong> ${totalRecaudaciones.toFixed(2)}</p>
                  <p><strong>Total recaudado en {anioSeleccionado - 1}:</strong> ${totalRecaudacionesAnterior.toFixed(2)}</p>
                  {totalRecaudacionesAnterior !== 0 && (
                    <p>
                      <strong>Diferencia respecto al año anterior:</strong> 
                      {diferencia >= 0 ? ` +$${diferencia.toFixed(2)}` : ` -$${Math.abs(diferencia).toFixed(2)}`}
                    </p>
                  )}
                  <p>
                    <strong>Porcentaje de crecimiento:</strong> {porcentajeCrecimiento !== "N/A" ? `${porcentajeCrecimiento}%` : "No disponible"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabla de recaudaciones debajo de la gráfica */}
            <div className="mt-4">
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Recaudación</th>
                  </tr>
                </thead>
                <tbody>
                  {meses.map((mes, index) => (
                    <tr key={index}>
                      <td>{mes}</td>
                      <td>{datosAnuales[index] ? `$${datosAnuales[index].toFixed(2)}` : "$0.00"}</td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>${totalRecaudaciones.toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Información al final en dispositivos pequeños */}
            <div className="d-lg-none bg-dark text-light p-4 rounded mt-4">
              <h3 className="mb-3">Resumen Anual</h3>
              <p><strong>Año seleccionado:</strong> {anioSeleccionado}</p>
              <p><strong>Total recaudado en {anioSeleccionado}:</strong> ${totalRecaudaciones.toFixed(2)}</p>
              <p><strong>Total recaudado en {anioSeleccionado - 1}:</strong> ${totalRecaudacionesAnterior.toFixed(2)}</p>
              <p><strong>Porcentaje de crecimiento:</strong> {porcentajeCrecimiento !== "N/A" ? `${porcentajeCrecimiento}%` : "No disponible"}</p>
            </div>
          </>
        )}
      </div>
      </div>
      
      <Footer />
    </>
  );
};

export default VerRecaudacionesAnuales;
