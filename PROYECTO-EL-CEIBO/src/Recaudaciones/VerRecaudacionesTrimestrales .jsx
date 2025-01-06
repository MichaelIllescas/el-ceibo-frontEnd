import Footer from "../Index/Footer";
import Header from "../Navbar/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [datosMensuales, setDatosMensuales] = useState([]);
  const [datosTrimestrales, setDatosTrimestrales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecaudaciones = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/recaudaciones/mensuales?year=${anioSeleccionado}`
        );

        const datos = response.data;
        setDatosMensuales(datos);

        // Calcular recaudaciones trimestrales
        const trimestres = [
          datos.slice(0, 3).reduce((acc, val) => acc + val, 0), // Trimestre 1: Enero - Marzo
          datos.slice(3, 6).reduce((acc, val) => acc + val, 0), // Trimestre 2: Abril - Junio
          datos.slice(6, 9).reduce((acc, val) => acc + val, 0), // Trimestre 3: Julio - Septiembre
          datos.slice(9, 12).reduce((acc, val) => acc + val, 0), // Trimestre 4: Octubre - Diciembre
        ];
        setDatosTrimestrales(trimestres);
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
    labels: ["Q1 (Ene-Mar)", "Q2 (Abr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dic)"],
    datasets: [
      {
        label: `Recaudaciones Trimestrales ${anioSeleccionado}`,
        data: datosTrimestrales,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
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
  

  // Calcular el total de recaudaciones trimestrales
  const totalRecaudaciones = datosTrimestrales.reduce((total, valor) => total + (valor || 0), 0);

  return (
    <>
      <Header />
      <div className="my-3 py-5">
        <div className="d-flex justify-content-center align-content-center py-1 bg-black text-light col-lg-8 m-auto rounded my-5">
          <div className="mt-3 py-5 container">
            <div className="text-center mb-4">
            <h1 className="mb-5">Recaudación Trimestral</h1>
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
                  <Bar  data={data} options={options} />
                </div>
                <div className="col-lg-6">
                  <table className="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th>Trimestre</th>
                        <th>Recaudación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["Q1 (Ene-Mar)", "Q2 (Abr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dic)"].map(
                        (trimestre, index) => (
                          <tr key={index}>
                            <td>{trimestre}</td>
                            <td>
                              {datosTrimestrales[index]
                                ? `$${datosTrimestrales[index].toFixed(2)}`
                                : "$0.00"}
                            </td>
                          </tr>
                        )
                      )}
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

export default VerRecaudacionesTrimestrales;
