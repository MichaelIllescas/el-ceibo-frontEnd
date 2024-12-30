import React from 'react';
import "/src/Index/Footer.css"

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 text-center sticky-footer col-lg-12  col-sm-12 ">
      <div className="container ">
        <p className="mb-0">© {new Date().getFullYear()} C.S. y D. El Ceibo - Sistema de Gestión Interna</p>
      </div>
    </footer>
  );
};

export default Footer;
