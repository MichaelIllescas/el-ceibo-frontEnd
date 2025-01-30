import Footer from "../Index/Footer";
import Header from "../Navbar/Header";
import React, { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VerRecaudacionesTrimestrales = () => {
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());
  const [datosTrimestrales, setDatosTrimestrales] = useState([]);
  const [datosAnioAnterior, setDatosAnioAnterior] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecaudaciones = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `/api/recaudaciones/mensuales?year=${anioSeleccionado}`
        );

        const datos = response.data;
        const trimestres = [
          datos.slice(0, 3).reduce((acc, val) => acc + val, 0),
          datos.slice(3, 6).reduce((acc, val) => acc + val, 0),
          datos.slice(6, 9).reduce((acc, val) => acc + val, 0),
          datos.slice(9, 12).reduce((acc, val) => acc + val, 0),
        ];
        setDatosTrimestrales(trimestres);

        // Obtener datos del año anterior para comparación
        const responseAnterior = await apiClient.get(
          `/api/recaudaciones/mensuales?year=${anioSeleccionado - 1}`
        );
        const datosAnteriores = responseAnterior.data;
        const trimestresAnteriores = [
          datosAnteriores.slice(0, 3).reduce((acc, val) => acc + val, 0),
          datosAnteriores.slice(3, 6).reduce((acc, val) => acc + val, 0),
          datosAnteriores.slice(6, 9).reduce((acc, val) => acc + val, 0),
          datosAnteriores.slice(9, 12).reduce((acc, val) => acc + val, 0),
        ];
        setDatosAnioAnterior(trimestresAnteriores);
      } catch (err) {
        console.error("Error al obtener las recaudaciones:", err);
        setError("No se pudieron cargar las recaudaciones. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecaudaciones();
  }, [anioSeleccionado]);

  const trimestresLabels = ["Q1 (Ene-Mar)", "Q2 (Abr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dic)"];

  const data = {
    labels: trimestresLabels,
    datasets: [
      {
        label: `Recaudaciones ${anioSeleccionado}`,
        data: datosTrimestrales,
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(153, 102, 255, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
      {
        label: `Recaudaciones ${anioSeleccionado - 1}`,
        data: datosAnioAnterior,
        backgroundColor: "rgba(192, 75, 75, 0.6)",
        borderColor: "rgba(192, 75, 75, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top", labels: { color: "white" } },
      tooltip: { enabled: true },
    },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "rgba(255, 255, 255, 0.2)" } },
      y: { ticks: { color: "white" }, grid: { color: "rgba(255, 255, 255, 0.2)" } },
    },
  };

  const totalRecaudaciones = datosTrimestrales.reduce((total, valor) => total + (valor || 0), 0);
  const totalRecaudacionesAnterior = datosAnioAnterior.reduce((total, valor) => total + (valor || 0), 0);
  const diferencia = totalRecaudaciones - totalRecaudacionesAnterior;
  const porcentajeCrecimiento = totalRecaudacionesAnterior !== 0 
    ? ((diferencia / totalRecaudacionesAnterior) * 100).toFixed(2) 
    : "N/A";

  return (
    <>
      <Header />
      <div className="my-5 pt-1 pb-5">
        <div className="container my-5 bg-dark py-3  rounded my-5">
          <div className="text-center mb-4">
            <h1>Recaudación Trimestral</h1>
            <label htmlFor="anio"className="text-white">Seleccione el año: </label>
            <select
              id="anio"
              value={anioSeleccionado}
              onChange={(e) => setAnioSeleccionado(parseInt(e.target.value))}
              className="form-select w-auto d-inline-block ms-4"
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
                  <Bar data={data} options={options} />
                </div>
                <div className="col-lg-4">
                  <div className="bg-dark text-light p-4 rounded">
                    <h3 className="mb-3">Resumen Trimestral</h3>
                    <p><strong>Año seleccionado:</strong> {anioSeleccionado}</p>
                    <p><strong>Total recaudado en {anioSeleccionado}:</strong> ${totalRecaudaciones.toFixed(2)}</p>
                    <p><strong>Total recaudado en {anioSeleccionado - 1}:</strong> ${totalRecaudacionesAnterior.toFixed(2)}</p>
                    <p><strong>Diferencia:</strong> {diferencia >= 0 ? `+$${diferencia.toFixed(2)}` : `-$${Math.abs(diferencia).toFixed(2)}`}</p>
                    <p><strong>Crecimiento:</strong> {porcentajeCrecimiento !== "N/A" ? `${porcentajeCrecimiento}%` : "No disponible"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th>Trimestre</th>
                      <th>Recaudación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trimestresLabels.map((trimestre, index) => (
                      <tr key={index}>
                        <td>{trimestre}</td>
                        <td>${datosTrimestrales[index]?.toFixed(2) || "0.00"}</td>
                      </tr>
                    ))}
                    <tr>
                      <td><strong>Total</strong></td>
                      <td><strong>${totalRecaudaciones.toFixed(2)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

      </div>
      
      <Footer />
    </>
  );
};

export default VerRecaudacionesTrimestrales;
