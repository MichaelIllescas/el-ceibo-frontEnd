import Header from "../Navbar/Header";
import TableGeneric from "/src/Components/TableGeneric";

import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";

const sampleData = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", age: 35, email: "alice@example.com" },
  { id: 3, name: "Alice Johnson", age: 35, email: "alice@example.com" },
  { id: 3, name: "Alice Johnson", age: 35, email: "alice@example.com" }
  
];

const actions = [
  {
   
    icon: FaEdit,
    className: "btn-primary",
    onClick: (row) => alert(`Editar: ${JSON.stringify(row)}`),
  },
  {
    
    icon: FaTrash,
    className: "btn-danger",
    onClick: (row) => {
      const confirmDelete = window.confirm(
        `¿Estás seguro de eliminar el registro? ${JSON.stringify(row)}`
      );
      if (confirmDelete) alert(`Eliminado: ${JSON.stringify(row)}`);
    },
  },
  {
    
    icon: FaInfoCircle,
    className: "btn-info",
    onClick: (row) => alert(`Ver detalles: ${JSON.stringify(row)}`),
  },
];




function VerSocios() {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-content-center pt-4"> 
  
  <div className="mt-5 col-lg-6">

  
      <TableGeneric titulo ={"Ver Socios Registrados"} data={sampleData} actions={actions} />;

      </div>
      </div>
      
   
   
   
   
    </>
  );
}

export default VerSocios;
