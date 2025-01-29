import React from 'react';
import ManualPDF from '../assets/Manual De Usuario.pdf';

const DownloadButton = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = ManualPDF; // Usar la ruta importada del archivo
    link.download = 'Manual De Usuario.pdf';
    link.click();
  };

  return (
    <button onClick={handleDownload}>
      Descargar Manual de Usuario
    </button>
  );
};

export default DownloadButton;
