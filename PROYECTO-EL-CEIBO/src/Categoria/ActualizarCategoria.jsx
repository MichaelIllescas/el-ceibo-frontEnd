import { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import Footer from "/src/Index/Footer";
import apiClient from "../Config/axiosConfig"; 

const ActualizarCategoria = () => {
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const [selectedCategoria, setSelectedCategoria] = useState(null); // Categoría seleccionada
  const [formData, setFormData] = useState({ type: "", descripcion: "" }); // Datos del formulario
  const [message, setMessage] = useState(null); // Mensaje de éxito o error
  const [loading, setLoading] = useState(true); // Estado para manejar el spinner o carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Cargar categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await apiClient.get("/api/categorias"); // Llamada con apiClient
        setCategorias(response.data); // Asignar categorías al estado
      } catch (err) {
        console.error("Error al cargar las categorías:", err);
        setError("No se pudieron cargar las categorías. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  // Manejar cambios en la categoría seleccionada
  const handleSelectChange = (e) => {
    const categoriaId = e.target.value;
    const selected = categorias.find(
      (categoria) => categoria.id === parseInt(categoriaId, 10)
    );
    setSelectedCategoria(selected);
    setFormData({ type: selected.nombre, descripcion: selected.descripcion });
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar los cambios al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategoria) {
      setMessage({
        text: "Por favor, selecciona una categoría.",
        type: "error",
      });
      return;
    }

    try {
      const updatedCategoria = {
        nombre: formData.type,
        descripcion: formData.descripcion,
      };

      await apiClient.put(
        `/api/categorias/${selectedCategoria.id}`,
        updatedCategoria
      ); // Llamada con apiClient

      setMessage({ text: "Categoría actualizada con éxito.", type: "success" });

      // Actualizar la lista de categorías en el estado
      setCategorias((prevCategorias) =>
        prevCategorias.map((cat) =>
          cat.id === selectedCategoria.id
            ? {
                ...cat,
                nombre: formData.type,
                descripcion: formData.descripcion,
              }
            : cat
        )
      );

      setSelectedCategoria(null); // Limpiar selección
      setFormData({ type: "", descripcion: "" }); // Limpiar formulario
    } catch (err) {
      console.error("Error al actualizar la categoría:", err);
      setMessage({
        text:
          err.response?.data?.error ||
          "Error al actualizar la categoría. Intente nuevamente.",
        type: "error",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="mt-5 pt-3 pb-5 mb-5">
        <div className="container mt-5 colg-sm-12 p-3 rounded col-lg-4 bg-dark text-light mb-5">
          <h3 className="text-center mb-4">Actualizar Categoría</h3>
          {loading ? (
            <p className="text-center">Cargando categorías...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 shadow">
              {/* Selección de la categoría */}
              <div className="mb-3">
                <label htmlFor="categoriaSelect" className="form-label">
                  Selecciona una categoría
                </label>
                <select
                  id="categoriaSelect"
                  className="form-select"
                  onChange={handleSelectChange}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    -- Selecciona --
                  </option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mostrar datos actuales */}
              {selectedCategoria && (
                <div className="mb-3">
                  <p>
                    <strong>Categoría actual:</strong>{" "}
                    {selectedCategoria.nombre}
                  </p>
                  <p>
                    <strong>Descripción actual:</strong>{" "}
                    {selectedCategoria.descripcion}
                  </p>
                </div>
              )}

              {/* Formulario para editar */}
              {selectedCategoria && (
                <>
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                      Nuevo Nombre:
                    </label>
                    <input
                      type="text"
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      Nueva Descripción:
                    </label>
                    <input
                      type="text"
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </>
              )}

              {/* Mensaje de confirmación o error */}
              {message && (
                <p
                  className={`fw-bold text-center ${
                    message.type === "success" ? "text-success" : "text-danger"
                  }`}
                >
                  {message.text}
                </p>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!selectedCategoria}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ActualizarCategoria;
