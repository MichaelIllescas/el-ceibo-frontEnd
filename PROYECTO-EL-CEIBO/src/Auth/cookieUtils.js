// src/utils/cookieUtils.js

/**
 * Obtiene el valor de una cookie por su nombre.
 * @param {string} name - Nombre de la cookie.
 * @returns {string|null} - Valor de la cookie o null si no existe.
 */
export  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  }
  