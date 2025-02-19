import Footer from "../Index/Footer";
import Header from "../Navbar/Header";
import TableGeneric from "/src/Components/TableGeneric";
import  { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig"; 

const VerCuotas = () => {
  const [cuotas, setCuotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const actions = [];

  useEffect(() => {
    const fetchCuotas = async () => {
      try {
        const response = await apiClient.get("/api/cuotas");

        // Formatear fechas para mostrar en formato dd/MM/yyyy
        const formattedCuotas = response.data.map((cuota) => ({
          ...cuota,
          fechaRegistro: formatDate(cuota.fechaRegistro),
          fechaUltimaActualizacion: formatDate(cuota.fechaUltimaActualizacion),
        }));

        setCuotas(formattedCuotas);
      } catch (err) {
        console.error("Error al obtener las cuotas:", err);
        setError("No se pudieron cargar las cuotas. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCuotas();
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
      <div className="d-flex justify-content-center align-content-center pt-4 pb-5 mb-5">
        <div className="mt-5 col-lg-7 pb-5 mb-5 px-1">
          {loading ? (
            <p className="text-center">Cargando cuotas...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <TableGeneric
              titulo={"Ver Cuotas Registradas"}
              data={cuotas}
              actions={actions}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerCuotas;
