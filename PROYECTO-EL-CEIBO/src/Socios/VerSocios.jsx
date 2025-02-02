import  { useEffect, useState } from "react";
import Header from "../Navbar/Header";
import TableGeneric from "/src/Components/TableGeneric";
import apiClient from "../Config/axiosConfig";
import ActualizarSocio from "./ActualizarSocio";
import Footer from "../Index/Footer";

function VerSocios() {
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socioId, setSocioId] = useState(null); // Estado para manejar el ID del socio seleccionado
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal

  useEffect(() => {
    const fetchSocios = async () => {
      try {
        const response = await apiClient.get("/api/socios");
        setSocios(response.data);
      } catch (err) {
        setError("Error al obtener los datos.");
        console.error("Error al obtener los socios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocios();
  }, []);

  const handleEditClick = (row) => {
    setSocioId(row.id); // Establece el ID del socio seleccionado
    setShowModal(true); // Muestra el modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Oculta el modal
    setSocioId(null); // Limpia el ID seleccionado
  };

  const handleUpdate = async () => {
    // Refresca la lista de socios después de la actualización
    try {
      const response = await apiClient.get("/api/socios");
      setSocios(response.data);
    } catch (err) {
      console.error("Error al actualizar la lista de socios:", err);
    }
  };

  const actions = [
    {
      label: "Editar",
      className: "btn-warning m-auto",
      onClick: handleEditClick,
      
    },
  ];

  return (
    <>
      <Header />
      <div className="container mt-4 mx-auto pt-3 pb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-start pb-5"
          style={{
            marginTop: "20px", // Baja el contenedor del nav
          }}
        >
          {/* Contenedor de la tabla */}
          <div className="w-100" >
            {loading ? (
              <p>Cargando datos...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              
                <TableGeneric
                  titulo={"Ver Socios Registrados"} // Título dinámico corregido
                  data={socios}
                  actions={actions}
                  
                />
              
            )}
          </div>
        </div>
      </div>
      <Footer/>

      {/* Modal ActualizarSocio */}
      {showModal && socioId && (
        <ActualizarSocio
          socioId={socioId} // Pasa el ID del socio seleccionado
          onClose={handleModalClose} // Cierra el modal
          onUpdate={handleUpdate} // Refresca la lista de socios
        />
      )}
    </>
  );
}

export default VerSocios;
