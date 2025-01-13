import Footer from "../index/Footer";
import Header from "../Navbar/Header";
import React, { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig"
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
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "white", // Cambia el color de las etiquetas de la leyenda a blanco
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Cambia el color de las letras en el eje X
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Opcional: Cambia el color de las líneas de la cuadrícula del eje X
        },
      },
      y: {
        ticks: {
          color: "white", // Cambia el color de las letras en el eje Y
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Opcional: Cambia el color de las líneas de la cuadrícula del eje Y
        },
      },
    },
  };
  

  // Calcular el total de recaudaciones
  const totalRecaudaciones = datosAnuales.reduce((total, valor) => total + (valor || 0), 0);

  return (
    <>
      <Header />
      <div className="my-3 py-5">
        <div className="d-flex justify-content-center align-content-center py-1 bg-black text-light col-lg-8 m-auto rounded my-5">
          <div className="mt-3 py-5 container">
            <div className="text-center mb-4">
              <h1 className="mb-5">Recaudación Anual</h1>
              <label htmlFor="anio">Seleccione el año: </label>
              <select
                id="anio"
                value={anioSeleccionado}
                onChange={(e) => setAnioSeleccionado(parseInt(e.target.value))}
                className="form-select w-auto d-inline-block"
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
            {loading ? (
              <p className="text-center">Cargando datos...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              <div className="row">
                <div className="col-lg-6">
                  <Line data={data} options={options} />
                </div>
                <div className="col-lg-6">
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
                          <td>
                            {datosAnuales[index]
                              ? `$${datosAnuales[index].toFixed(2)}`
                              : "$0.00"}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>${totalRecaudaciones.toFixed(2)}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerRecaudacionesAnuales;
