import React, { useState, useEffect } from "react";
import axios from "axios";
import TableGeneric from "/src/components/TableGeneric";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";

const FiltrarHistorial = () => {
  const [filtro, setFiltro] = useState(""); // Texto ingresado en el input
  const [jugadores, setJugadores] = useState([]); // Lista de jugadores o socios
  const [jugadoresFiltrados, setJugadoresFiltrados] = useState([]); // Jugadores filtrados
  const [historial, setHistorial] = useState([]); // Historial del jugador seleccionado
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null); // Jugador seleccionado

  // Obtener jugadores o socios
  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/jugadores");
        setJugadores(response.data);
      } catch (error) {
        console.error("Error al obtener jugadores:", error);
      }
    };
    fetchJugadores();
  }, []);

  // Filtrar jugadores en tiempo real
  useEffect(() => {
    if (filtro.trim() === "") {
      setJugadoresFiltrados([]);
      return;
    }

    const filtrados = jugadores.filter((jugador) =>
      `${jugador.nombre} ${jugador.apellido}`
        .toLowerCase()
        .includes(filtro.toLowerCase())
    );
    setJugadoresFiltrados(filtrados);
  }, [filtro, jugadores]);

  // Obtener historial del jugador seleccionado
  const fetchHistorial = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pagos/jugador/${id}`
      );
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

  // Manejar selección de jugador
  const handleSeleccionarJugador = (jugador) => {
    setJugadorSeleccionado(jugador);
    fetchHistorial(jugador.id);
    setFiltro(`${jugador.nombre} ${jugador.apellido} DNI N° ${jugador.dni}`);
    setJugadoresFiltrados([]); // Oculta la lista filtrada
  };

  return (
    <>
      <Header />
      <div className="pt-3">
        <div className="container my-5 py-5">
          <div className="bg-black   text-light p-4 rounded">
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
              {jugadoresFiltrados.length > 0 && (
                <ul
                  className="list-group mt-2"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {jugadoresFiltrados.map((jugador) => (
                    <li
                      key={jugador.id}
                      className="list-group-item"
                      onClick={() => handleSeleccionarJugador(jugador)}
                      style={{ cursor: "pointer" }}
                    >
                      {jugador.nombre} {jugador.apellido} DNI N° {jugador.dni}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {jugadorSeleccionado && (
              <div className="mt-1">
                <h4>
                  Historial de {jugadorSeleccionado.nombre}{" "}
                  {jugadorSeleccionado.apellido}
                </h4>
                {historial.length > 0 ? (
                  <TableGeneric
                    titulo="Historial"
                    data={historial}
                    actions={[]}
                  />
                ) : (
                  <p>No hay historial disponible para este jugador/socio.</p>
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
