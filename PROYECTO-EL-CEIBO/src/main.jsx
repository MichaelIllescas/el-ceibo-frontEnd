import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Enrrutado from "./Navbar/Enrutmiento";
import App from "./Auth/getCookieValue";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <App/>
      <Enrrutado />
    </BrowserRouter>
  </StrictMode>
);
