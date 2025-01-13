import React from "react";
import * as XLSX from "xlsx";

const ExportToExcelButton = ({ data, fileName = "data.xlsx" }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    // Crear un libro de trabajo (workbook) y una hoja de trabajo (worksheet)
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    // Exportar el archivo Excel
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button className="btn btn-success" onClick={handleExport}>
      Exportar a Excel
    </button>
  );
};

export default ExportToExcelButton;
