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
    monto: 0,
  });

  const [cuotas, setCuotas] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [jugadoresFiltrados, setJugadoresFiltrados] = useState([]);
  const [filtroJugador, setFiltroJugador] = useState(""); // Texto para filtrar jugadores
  const [menuVisible, setMenuVisible] = useState(false); // Controlar la visibilidad del menú
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null); // Jugador seleccionado
  const [cuotaSeleccionada, setCuotaSeleccionada] = useState(null); // Cuota seleccionada
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
        const response = await axios.get(
          "http://localhost:8080/api/pagos/listadoGeneral"
        );
        setJugadores(response.data);
      } catch (error) {
        console.error("Error al obtener los jugadores:", error);
      }
    };
    fetchJugadores();
  }, []);

  // Filtrar jugadores por nombre y apellido en tiempo real
  useEffect(() => {
    if (filtroJugador.trim() === "") {
      setJugadoresFiltrados([]);
      return;
    }

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

    // Si cambia la cuota seleccionada, actualiza el monto y los detalles de la cuota
    if (name === "cuotaId") {
      const cuota = cuotas.find((cuota) => cuota.id === parseInt(value));
      setPago((prevPago) => ({
        ...prevPago,
        monto: cuota ? cuota.monto : 0,
      }));
      setCuotaSeleccionada(cuota); // Actualiza los detalles de la cuota
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/pagos", {
        fechaPago: pago.fechaPago,
        monto: pago.monto,
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

  // Manejar la selección de un jugador
  const handleSeleccionarJugador = (jugador) => {
    setPago({ ...pago, jugadorId: jugador.id });
    setFiltroJugador(`${jugador.nombre} ${jugador.apellido}`);
    setJugadorSeleccionado(jugador); // Almacena el jugador seleccionado
    setMenuVisible(false); // Oculta el menú
  };

  return (
    <>
      <Header />
      <div className="py-1">
        <div className="my-5 pt-5 py-5">
          <div className="container rounded mt-3 col-lg-6 col-md-6 col-sm-11 bg-dark text-light p-4 mt-5 bg-5 ">
            <h2 className="mb-4 text-center">Registrar Pago</h2>

            <form onSubmit={handleSubmit} className="text-center">
              <div className="row">
                {/* Inputs */}
                <div className="col-lg-6 col-12 px-5">
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
                    <label className="form-label">Jugador / Socio</label>
                    <div className="dropdown">
                      <input
                        type="text"
                        className="form-control-lg form-select w-100"
                        placeholder="Buscar jugador o socio..."
                        value={filtroJugador}
                        onChange={(e) => {
                          setFiltroJugador(e.target.value);
                          setMenuVisible(true);
                        }}
                        onFocus={() => setMenuVisible(true)}
                        onBlur={() =>
                          setTimeout(() => setMenuVisible(false), 200)
                        }
                      />
                      {menuVisible && jugadoresFiltrados.length > 0 && (
                        <ul
                          className="dropdown-menu show"
                          style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                          }}
                        >
                          {jugadoresFiltrados.map((jugador) => (
                            <li
                              key={jugador.id}
                              className="dropdown-item"
                              onClick={() => handleSeleccionarJugador(jugador)}
                            >
                              {jugador.nombre} {jugador.apellido}, DNI N°{" "}
                              {jugador.dni}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Detalles */}
                <div className="col-lg-6 col-12 px-5">
                  {jugadorSeleccionado && (
                    <div className="mt-3 text-start">
                      <h5>Datos del Jugador/Socio Seleccionado:</h5>
                      <p className="ms-3">
                        <strong>Nombre:</strong> {jugadorSeleccionado.nombre}
                      </p>
                      <p className="ms-3">
                        <strong>Apellido:</strong>{" "}
                        {jugadorSeleccionado.apellido}
                      </p>
                      <p className="ms-3">
                        <strong>DNI:</strong> {jugadorSeleccionado.dni}
                      </p>
                      <p className="ms-3">
                        <strong>Teléfono:</strong>{" "}
                        {jugadorSeleccionado.telefono}
                      </p>
                      <p className="ms-3">
                        <strong>Email:</strong> {jugadorSeleccionado.email}
                      </p>
                    </div>
                  )}
                  <hr />

                  {cuotaSeleccionada && (
                    <div className="mt-3 text-start">
                      <h5>Datos de la Cuota Seleccionada:</h5>
                      <p className="ms-3">
                        <strong>Tipo:</strong> {cuotaSeleccionada.tipo}
                      </p>
                      <p className="ms-3">
                        <strong>Monto:</strong> ${cuotaSeleccionada.monto}
                      </p>
                    </div>
                  )}
                  <hr />

                  <div className="mt-3 text-start">
                    <h5>Detalles del Pago:</h5>
                    <p className="ms-3">
                      <strong>Fecha de Pago:</strong>{" "}
                      {pago.fechaPago || "No seleccionada"}
                    </p>
                    <p className="ms-3">
                      <strong>Descripción:</strong>{" "}
                      {pago.descripcion || "No ingresada"}
                    </p>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                Confirmar
              </button>
              {mensaje && (
                <div className="alert alert-info mt-3 text-center">
                  {mensaje}
                </div>
              )}
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RegistrarPago;
