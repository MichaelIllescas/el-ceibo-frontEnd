import { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig";
import TableGeneric from "/src/components/TableGeneric";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";
import DescargarComprobante from "../Components/ComprobantePagoPDF ";

const FiltrarHistorial = () => {
  const [filtro, setFiltro] = useState("");
  const [personas, setPersonas] = useState([]);
  const [personasFiltradas, setPersonasFiltradas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const [historialConBoton, setHistorialConBoton] = useState([]); 

  // Obtener jugadores y socios
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const jugadoresResponse = await apiClient.get("/api/jugadores");
        const sociosResponse = await apiClient.get("/api/socios");

        const jugadores = jugadoresResponse.data.map((jugador) => ({
          ...jugador,
          tipo: "jugador",
        }));

        const socios = sociosResponse.data.map((socio) => ({
          ...socio,
          tipo: "socio",
        }));

        setPersonas([...jugadores, ...socios]);
      } catch (error) {
        console.error("Error al obtener jugadores y socios:", error);
      }
    };
    fetchPersonas();
  }, []);

  // Filtrar personas en tiempo real
  useEffect(() => {
    if (filtro.trim() === "") {
      setPersonasFiltradas([]);
      return;
    }

    const filtrados = personas.filter((persona) =>
      `${persona.nombre} ${persona.apellido}`
        .toLowerCase()
        .includes(filtro.toLowerCase())
    );
    setPersonasFiltradas(filtrados);
  }, [filtro, personas]);

  // Obtener historial de la persona seleccionada
  const fetchHistorial = async (id, tipo) => {
    try {
      const url =
        tipo === "jugador"
          ? `/api/pagos/jugador/${id}`
          : `/api/pagos/socio/${id}`;
      const response = await apiClient.get(url);

      setHistorial(response.data); //  PASAMOS LOS DATOS SIN FORMATEAR
    } catch (error) {
      console.error("Error al obtener historial:", error);
    }
  };

  // Agregar la columna del botón de descarga después de obtener el historial
  useEffect(() => {
    if (historial.length > 0) {
      const historialConDescarga = historial.map((pago) => ({
        ...pago,
        Comprobante: <DescargarComprobante pago={pago} />,
      }));
      setHistorialConBoton(historialConDescarga);
    }
  }, [historial]);

  // Manejar selección de persona
  const handleSeleccionarPersona = (persona) => {
    setPersonaSeleccionada(persona);
    fetchHistorial(persona.id, persona.tipo);
    setFiltro(
      `${persona.nombre} ${persona.apellido} DNI N° ${persona.dni}`
    );
    setPersonasFiltradas([]);
  };

  return (
    <>
      <Header />
      <div className="pt-3 pb-5">
        <div className="container my-5 py-5">
          <div className="bg-black text-light p-3 rounded">
            <h2>Filtrar Historial de Pagos de Jugadores o Socios</h2>
            <div className="mb-3">
              <label className="form-label">Buscar jugador o socio:</label>
              <input
                type="text"
                className="form-control w-100"
                placeholder="Ingrese nombre o apellido"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
              {personasFiltradas.length > 0 && (
                <ul
                  className="list-group mt-2"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {personasFiltradas.map((persona) => (
                    <li
                      key={persona.id}
                      className="list-group-item"
                      onClick={() => handleSeleccionarPersona(persona)}
                      style={{ cursor: "pointer" }}
                    >
                      {persona.tipo === "jugador" ? "Jugador" : "Socio"}:{" "}
                      {persona.nombre} {persona.apellido} DNI N° {persona.dni}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {personaSeleccionada && (
              <div className="mt-1">
                <h4>
                  Historial de {personaSeleccionada.nombre}{" "}
                  {personaSeleccionada.apellido} (
                  {personaSeleccionada.tipo === "jugador"
                    ? "Jugador"
                    : "Socio"}
                  )
                </h4>
                {historialConBoton.length > 0 ? (
                  <TableGeneric
                    titulo="Historial"
                    data={historialConBoton} // Ahora incluye la columna con el botón
                  />
                ) : (
                  <p>No hay historial disponible para esta persona.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FiltrarHistorial;
