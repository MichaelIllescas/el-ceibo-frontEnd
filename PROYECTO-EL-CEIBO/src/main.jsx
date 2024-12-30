import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Enrrutado from "./Navbar/Enrutmiento";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Enrrutado />
    </BrowserRouter>
  </StrictMode>
);
