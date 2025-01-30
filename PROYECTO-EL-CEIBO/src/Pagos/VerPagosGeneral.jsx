import Footer from "../Index/Footer";
import Header from "../Navbar/Header";
import TableGeneric from "/src/Components/TableGeneric";
import { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig";

const VerListadoGeneralPagos = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const actions = [];

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const response = await apiClient.get(
          "/api/pagos/listadoGeneralPagos"
        );

        // Formatear fechas para mostrar en formato dd/MM/yyyy
        const formattedPagos = response.data.map((cuota) => ({
          ...cuota,
          fechaPago: formatDate(cuota.fechaPago),
        }));

        setPagos(formattedPagos);
      } catch (err) {
        console.error("Error al obtener los pagos:", err);
        setError("No se pudieron cargar los pagos. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchPagos();
  }, []);

  // Función para formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Header />
      <div className=" container d-flex justify-content-center align-content-center py-2">
        <div className="mt-3 py-5 mb-5 pb-5">
          {loading ? (
            <p className="text-center">Cargando cuotas...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <div>
              <TableGeneric
                titulo={"Listado General de Pagos Registrados"}
                data={pagos}
                actions={actions}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerListadoGeneralPagos;
