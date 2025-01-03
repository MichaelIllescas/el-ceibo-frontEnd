import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Navbar/Header";
import Footer from "../Index/Footer";

const RegistrarPago = () => {
  const [pago, setPago] = useState({
    fechaPago: "",
    descripcion: "",
    cuotaId: "",
    jugadorId: "",
    monto: 0, // Calculado automáticamente según la cuota seleccionada
  });

  const [cuotas, setCuotas] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [jugadoresFiltrados, setJugadoresFiltrados] = useState([]);
  const [filtroJugador, setFiltroJugador] = useState(""); // Texto para filtrar jugadores
  const [mensaje, setMensaje] = useState("");

  // Obtener cuotas
  useEffect(() => {
    const fetchCuotas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/cuotas");
        setCuotas(response.data);
      } catch (error) {
        console.error("Error al obtener las cuotas:", error);
      }
    };
    fetchCuotas();
  }, []);

  // Obtener jugadores
  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/jugadores");
        setJugadores(response.data);
        setJugadoresFiltrados(response.data); // Inicialmente mostrar todos
      } catch (error) {
        console.error("Error al obtener los jugadores:", error);
      }
    };
    fetchJugadores();
  }, []);

  // Filtrar jugadores por nombre y apellido
  useEffect(() => {
    const filtrados = jugadores.filter((jugador) =>
      `${jugador.nombre} ${jugador.apellido}`
        .toLowerCase()
        .includes(filtroJugador.toLowerCase())
    );
    setJugadoresFiltrados(filtrados);
  }, [filtroJugador, jugadores]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPago({ ...pago, [name]: value });

    // Si cambia la cuota seleccionada, actualiza el monto
    if (name === "cuotaId") {
      const cuotaSeleccionada = cuotas.find(
        (cuota) => cuota.id === parseInt(value)
      );
      setPago((prevPago) => ({
        ...prevPago,
        monto: cuotaSeleccionada ? cuotaSeleccionada.monto : 0,
      }));
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/pagos", {
        fechaPago: pago.fechaPago,
        monto: pago.monto, // Automáticamente asignado según la cuota
        descripcion: pago.descripcion,
        cuota: { id: parseInt(pago.cuotaId) },
        jugador: { id: parseInt(pago.jugadorId) },
      });
      setMensaje("Pago registrado exitosamente.");
      console.log(response.data);
    } catch (error) {
      setMensaje("Error al registrar el pago.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="mt-5 pt-5">
        <div className="container rounded mt-4 col-lg-4 col-md-6 col-sm-11 bg-dark text-light p-4 mt-5 ">
          <h2 className="mb-4">Registrar Pago</h2>

          <form onSubmit={handleSubmit} className="text-cemterer">
            <div className="mb-3">
              <label className="form-label">Fecha de Pago</label>
              <input
                type="date"
                name="fechaPago"
                className="form-control w-100"
                value={pago.fechaPago}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                name="descripcion"
                className="form-control w-100"
                value={pago.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo de Cuota</label>
              <select
                name="cuotaId"
                className="form-select"
                value={pago.cuotaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una cuota</option>
                {cuotas.map((cuota) => (
                  <option key={cuota.id} value={cuota.id}>
                    {cuota.tipo} - ${cuota.monto}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Jugador</label>
              <div className="dropdown">
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Buscar jugador..."
                  value={filtroJugador}
                  onChange={(e) => setFiltroJugador(e.target.value)}
                  data-bs-toggle="dropdown"
                />
                <ul
                  className="dropdown-menu show w-100"
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  {jugadoresFiltrados.map((jugador) => (
                    <li
                      key={jugador.id}
                      className="dropdown-item w-100"
                      onClick={() => {
                        setPago({ ...pago, jugadorId: jugador.id });
                        setFiltroJugador(
                          `${jugador.nombre} ${jugador.apellido}`
                        );
                      }}
                    >
                      {jugador.nombre} {jugador.apellido}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button type="submit" className="btn btn-primary m-auto">
              Registrar
            </button>
            {mensaje && (
              <div className="alert alert-info mt-3 text-center">{mensaje}</div>
            )}
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RegistrarPago;
