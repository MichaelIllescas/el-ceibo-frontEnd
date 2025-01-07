import React, { useState, useEffect } from "react";
import apiClient from "../Config/axiosConfig";
import TableGeneric from "/src/components/TableGeneric";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";

const FiltrarHistorial = () => {
  const [filtro, setFiltro] = useState(""); // Texto ingresado en el input
  const [personas, setPersonas] = useState([]); // Lista combinada de jugadores y socios
  const [personasFiltradas, setPersonasFiltradas] = useState([]); // Personas filtradas
  const [historial, setHistorial] = useState([]); // Historial de pagos de la persona seleccionada
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null); // Persona seleccionada

  // Obtener jugadores y socios
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const jugadoresResponse = await apiClient.get(
          "/api/jugadores"
        );
        const sociosResponse = await apiClient.get(
          "/api/socios"
        );
        // Combinar jugadores y socios en una sola lista
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
      const response = await axios.get(url);
      setHistorial(
        response.data.map((item) => ({
          ...item,
          fechaPago: new Date(item.fechaPago).toLocaleDateString(), // Formato legible de fecha
          monto: `$${item.monto.toFixed(2)}`, // Formato de moneda
        }))
      );
    } catch (error) {
      console.error("Error al obtener historial:", error);
    }
  };

  // Manejar selección de persona
  const handleSeleccionarPersona = (persona) => {
    setPersonaSeleccionada(persona);
    fetchHistorial(persona.id, persona.tipo);
    setFiltro(
      `${persona.nombre} ${persona.apellido} DNI N° ${persona.dni}`
    );
    setPersonasFiltradas([]); // Oculta la lista filtrada
  };

  return (
    <>
      <Header />
      <div className="pt-3">
        <div className="container my-5 py-5">
          <div className="bg-black text-light p-4 rounded">
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
                {historial.length > 0 ? (
                  <TableGeneric
                    titulo="Historial"
                    data={historial}
                    actions={[]}
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
