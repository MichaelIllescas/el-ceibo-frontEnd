import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ruta actual
  const [isSessionExpired, setIsSessionExpired] = useState(false); // Estado para controlar el modal
  const [hasRedirected, setHasRedirected] = useState(false); // Estado para evitar múltiples redirecciones

  // Función para obtener el valor de una cookie por su nombre
  function getCookieValue(cookieName) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].split("=");
      if (name === cookieName) {
        return value; // Devuelve el valor de la cookie
      }
    }
    return null; // Retorna null si no encuentra la cookie
  }

  useEffect(() => {
    // Evitar el chequeo si estamos en la página de login
    if (location.pathname === "/") {
      return;
    }

    // Función para verificar el token periódicamente
    const checkAuthToken = () => {
      const authToken = getCookieValue("authToken"); // Cambia "authToken" por el nombre de tu cookie

      if (!authToken && !hasRedirected) {
        setIsSessionExpired(true); // Muestra el modal si el token no existe o expiró
      }
    };

    // Ejecutar la verificación inmediatamente y luego cada 5 segundos
    checkAuthToken(); // Verificar al cargar la página
    const interval = setInterval(checkAuthToken, 5000); // Verificar cada 5 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [hasRedirected, location.pathname]); // Dependemos de hasRedirected y de la ruta actual

  // Función para manejar el cierre del modal
  const handleModalClose = () => {
    setIsSessionExpired(false); // Ocultar el modal
    setHasRedirected(true); // Marcar que ya redirigimos al usuario
    navigate("/"); // Redirigir al login
  };

  return (
    <>
      {/* Modal */}
      {isSessionExpired && (
        <div
          className="modal show d-block" // Usamos "show d-block" para que el modal sea visible
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sesión Expirada</h5>
              </div>
              <div className="modal-body">
                <p>Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleModalClose}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

   </>
   
  );
}

export default App;
