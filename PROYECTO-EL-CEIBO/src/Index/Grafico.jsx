import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraficoIndex = () => {
  // Datos ficticios
  const data = {
    labels: ["Enero", "Febrero", "MArzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ganancias",
        data: [5000, 8000, 6000, 12000, 15000, 20000], // Datos ficticios
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Hace la línea más curva
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default GraficoIndex;
