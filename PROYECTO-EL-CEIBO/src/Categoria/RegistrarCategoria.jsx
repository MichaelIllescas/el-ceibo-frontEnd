import React, { useState } from "react";
import "./RegistrarCategoria.css";
import NavBar from "/src/NavBar/NavBar";
import Footer from "../Index/Footer";
import axios from "axios";

const RegistrarCategoria = () => {
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState(null); // Estado para mensajes de éxito o error
    const [loading, setLoading] = useState(false); // Estado para manejar el botón de carga

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje(null); // Reinicia el mensaje al intentar registrar

        try {
            const nuevaCategoria = {
                nombre: categoria,
                descripcion: descripcion,
            };

            const response = await axios.post("http://localhost:8080/api/categorias", nuevaCategoria);

            setMensaje({ texto: "Categoría registrada con éxito.", tipo: "success" });
            console.log("Respuesta del servidor:", response.data);

            // Limpiar formulario
            setCategoria("");
            setDescripcion("");
        } catch (error) {
            console.error("Error al registrar la categoría:", error);
            setMensaje({
                texto:
                    error.response?.data?.error || "Error al registrar la categoría. Verifique los datos ingresados.",
                tipo: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="mt-5 pt-3 d-flex justify-content-center">
                <div className="bg-dark p-4 d-flex justify-content-center align-items-center rounded pt-5 mt-5 col-sm-10 col-lg-4">
                    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                        <h1 className="text-center text-white mb-4">Registrar Categoría</h1>

                        <div className="mb-3 w-100">
                            <label htmlFor="categoria" className="form-label text-white">
                                Categoría:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="categoria"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                placeholder="Ej: Sexta División"
                                required
                            />
                        </div>

                        <div className="mb-3 w-100 mt-4">
                            <label htmlFor="descripcion" className="form-label text-white">
                                Descripción:
                            </label>
                            <textarea
                                className="form-control"
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                rows="3"
                                placeholder="Ej: de 12 a 14 años"
                            />
                        </div>

                        {/* Mostrar mensaje de éxito o error */}
                        {mensaje && (
                            <p
                                className={`fw-bold text-center ${
                                    mensaje.tipo === "success" ? "text-success" : "text-danger"
                                }`}
                            >
                                {mensaje.texto}
                            </p>
                        )}

                        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                            {loading ? "Registrando..." : "Registrar"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default RegistrarCategoria;
