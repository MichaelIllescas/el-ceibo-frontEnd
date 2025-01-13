import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ExportToExcelButton from "./ExportToExcelButton"; 

const TableGeneric = ({ titulo = "Título de la tabla", data, actions = [] }) => {
  const [filterInput, setFilterInput] = useState(""); // Estado del filtro
  const [currentPage, setCurrentPage] = useState(1); // Estado de la página actual
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // Estado de ordenamiento
  const [visibleColumns, setVisibleColumns] = useState({}); // Columnas visibles
  const itemsPerPage = 10; // Elementos por página

  if (!data || data.length === 0) {
    return (
      <p className="text-center mt-3 text-warning">No se encontraron datos disponibles.</p>
    );
  }

  const columns = useMemo(() => Object.keys(data[0]), [data]);

  // Inicializar las columnas visibles la primera vez
  useMemo(() => {
    if (Object.keys(visibleColumns).length === 0) {
      const initialColumns = {};
      columns.forEach((col) => (initialColumns[col] = true));
      setVisibleColumns(initialColumns);
    }
  }, [columns, visibleColumns]);

  // Filtrar datos por búsqueda
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(filterInput.toLowerCase())
    );
  }, [filterInput, data]);

  // Ordenar datos
  const sortedData = useMemo(() => {
    if (sortConfig.key) {
      return [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key]
          ? a[sortConfig.key].toString().toLowerCase()
          : "";
        const bValue = b[sortConfig.key]
          ? b[sortConfig.key].toString().toLowerCase()
          : "";

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filteredData;
  }, [sortConfig, filteredData]);

  // Paginación
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [currentPage, sortedData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (column) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === column) {
        return {
          key: column,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: column, direction: "asc" };
    });
  };

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <div className="container mt-5 p-3 bg-black text-white rounded">
     
      <div className="d-flex justify-content-between align-items-center mb-3">
    <h3 className="h1">{titulo}</h3>
    <ExportToExcelButton data={filteredData} fileName="tabla_datos.xlsx" />
</div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span>Total de elementos: {filteredData.length}</span>
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Buscar en la tabla..."
          className="form-control w-100"
        />
      </div>
      {/* Configuración de columnas */}
      <div className="mb-3">
        <h5>Mostrar columnas:</h5>
        {columns.map((column, index) => (
          <div key={index} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id={`column-${column}`}
              checked={visibleColumns[column]}
              onChange={() => handleColumnToggle(column)}
            />
            <label className="form-check-label" htmlFor={`column-${column}`}>
              {column}
            </label>
          </div>
        ))}
      </div>
      <div
        className="table-responsive"
        style={{ overflowX: "auto", maxWidth: "100%" }}
      >
        <table className="table table-bordered table-striped table-dark table-sm text-center">
          <thead>
            <tr>
              {columns.map(
                (column, index) =>
                  visibleColumns[column] && (
                    <th
                      key={index}
                      style={{ whiteSpace: "nowrap", cursor: "pointer" }}
                      onClick={() => handleSort(column)}
                      title={`Ordenar por ${column}`}
                    >
                      {column}{" "}
                      {sortConfig.key === column ? (
                        sortConfig.direction === "asc" ? (
                          <span>&uarr;</span>
                        ) : (
                          <span>&darr;</span>
                        )
                      ) : (
                        <span>&#x21c5;</span>
                      )}
                    </th>
                  )
              )}
              {actions.length > 0 && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map(
                  (column, colIndex) =>
                    visibleColumns[column] && (
                      <td key={colIndex} style={{ whiteSpace: "nowrap" }}>
                        {row[column]}
                      </td>
                    )
                )}
                {actions.length > 0 && (
                  <td>
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className={`btn btn-sm ${
                          action.className || "btn-primary"
                        } me-2`}
                        onClick={() => action.onClick(row)}
                      >
                        {action.icon && React.createElement(action.icon)}{" "}
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-light"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"< Anterior"}
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-outline-light"
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
