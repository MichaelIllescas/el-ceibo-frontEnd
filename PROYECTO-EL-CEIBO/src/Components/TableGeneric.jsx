import React, { useState, useMemo } from "react";

const TableGeneric = ({titulo="Título de la tabla", data, actions = [] }) => {
  const [filterInput, setFilterInput] = useState(""); // Estado del filtro
  const [currentPage, setCurrentPage] = useState(1); // Estado de la página actual
  const itemsPerPage = 10; // Elementos por página

  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  // Obtén las claves de los objetos dinámicamente
  const columns = useMemo(() => Object.keys(data[0]), [data]);

  // Filtra los datos en base al input
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(filterInput.toLowerCase())
    );
  }, [filterInput, data]);

  // Pagina los datos filtrados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, filteredData]);

  // Total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Maneja cambios de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-5  p-3 pt-5 bg-black  text-white rounded">
      <h3>{titulo}</h3>
      <div className="mb-3">
        <input
          type="text"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Buscar en la tabla..."
          className="form-control w-100"
        />
      </div>
      <div className="table-responsive">

      
      <table className="table table-bordered table-striped table-sm text-center">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            {actions.length > 0 && <th>Acciones</th>} {/* Condicional para mostrar columna de acciones */}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
              {actions.length > 0 && (
                <td>
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`btn btn-sm ${action.className || "btn-primary"} me-2`}
                      onClick={() => action.onClick(row)}
                    >
                      {action.icon && React.createElement(action.icon)} {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"< Anterior"}
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {"Siguiente >"}
        </button>
      </div>
    </div>
  );
};

export default TableGeneric;
