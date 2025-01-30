import { useState } from "react";

const CustomDropdown = ({ items, onSelect, labelKey, valueKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  // Filtrar elementos a medida que el usuario escribe
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = items.filter((item) =>
      item[labelKey].toLowerCase().includes(term)
    );
    setFilteredItems(filtered);
  };

  // Manejar la selección de un elemento
  const handleSelect = (item) => {
    onSelect(item[valueKey]);
    setIsOpen(false); // Cerrar el dropdown al seleccionar
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          onClick={(e) => e.stopPropagation()} // Evitar cerrar el dropdown al hacer clic en el input
        />
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item[valueKey]}
                onClick={() => handleSelect(item)}
                className="dropdown-item"
              >
                {item[labelKey]}
              </li>
            ))
          ) : (
            <li className="dropdown-item">Sin resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
