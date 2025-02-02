⚽ El Ceibo - Frontend
El Ceibo es una plataforma web para la gestión de socios, jugadores y control de pagos en un club de fútbol. Este repositorio contiene el frontend de la aplicación, desarrollado con React y Vite para una experiencia rápida y moderna.
## 🚀 Características
✅ Registro y gestión de socios y jugadores.
✅ Control de pagos mensuales de los socios.
✅ Interfaz moderna y responsiva con Bootstrap 5.
✅ Integración con el backend desarrollado en Spring Boot.
## 📌 Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:
- Node.js (versión 18 o superior)
- Git
- El backend en ejecución (puedes encontrarlo en el repositorio del backend) https://github.com/MichaelIllescas/el-ceibo-backEnd.git.
## 🔧 Instalación y Configuración
Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:
1️⃣ Clonar el repositorio:
```
git clone https://github.com/MichaelIllescas/ceibo-frontend.git
cd PROYECTO-EL-CEIBO
```
2️⃣ Instalar dependencias:
```
npm install
```
3️⃣ Ejecutar el proyecto:
```
npm run dev
```
4️⃣ Inicie sesión con credenciales:
```
email: admin@admin.com
Password: admin
```



```
La aplicación estará disponible en http://localhost:5173 por defecto.
## 📁 Estructura del Proyecto

PROYECTO-EL-CEIBO/
│── dist/               # Archivos compilados para producción
│── node_modules/       # Dependencias de Node.js
│── src/                # Código fuente principal
│   ├── assets/         # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── Auth/           # Autenticación de usuarios
│   ├── Categoria/      # Gestión de categorías
│   ├── Components/     # Componentes reutilizables
│   ├── Config/         # Configuraciones del proyecto
│   ├── Cuotas/         # Módulo de pagos de cuotas
│   ├── Index/          # Página de inicio
│   ├── Jugadores/      # Gestión de jugadores
│   ├── Navbar/         # Barra de navegación
│   ├── Pagos/          # Control de pagos
│   ├── Recaudaciones/  # Gestión de recaudaciones
│   ├── Socios/         # Módulo de socios
│   ├── Usuarios/       # Gestión de usuarios
│── GeneralStyles.css   # Estilos generales
│── main.jsx            # Punto de entrada de la aplicación
│── .gitignore          # Archivos y carpetas ignorados por Git
│── eslint.config.js    # Configuración de ESLint
│── favicon.ico         # Icono de la aplicación
│── index.html          # Archivo HTML principal
│── package-lock.json   # Bloqueo de versiones de dependencias

## 📡 Backend
Este frontend se comunica con el backend desarrollado en Spring Boot. Puedes encontrarlo en el repositorio correspondiente.
## 🛠 Tecnologías Utilizadas
- **Frontend:** React + Vite
- **Estilos:** Bootstrap 5
- **Estado Global:** Context API
- **Manejo de Rutas:** React Router
- **Consumo de API:** Axios
## 🚀 Despliegue
Puedes desplegar este proyecto en plataformas como:
- Vercel
- Netlify
- Render
Ejemplo de build para producción:

npm run build
```
El código compilado estará en la carpeta `dist/`.
## 📞 Contacto
Si tienes preguntas o sugerencias, puedes contactarme en:
✉️ Email: joni.illes@hotmail.com
🐙 GitHub: MichaelIllescas
🚀 ¡Gracias por visitar Ceibo! ⚽💙

Nos encontramos en proceso de desarrollo y mejoras de constantemente!
