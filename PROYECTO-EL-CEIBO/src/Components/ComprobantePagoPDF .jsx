/* eslint-disable react/prop-types */
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { FaDownload } from "react-icons/fa"; // Importamos el ícono de descarga
import "bootstrap/dist/css/bootstrap.min.css"; // Aseguramos que Bootstrap esté disponible para tooltips

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  logo: {
    width: 205,
    height: 205,
    position: "absolute",
    top: 50,
    right: 0,
  },
  legend: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  usuario: {
    textAlign: "center",
    marginTop: 45,
    fontSize: 10,
  },
  idPago: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
    marginBottom: 20,
  },
});

// Función para formatear fechas
const formatDate = (dateString) => {
  if (!dateString) return "Fecha no disponible";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Fecha inválida";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Comprobante de Pago en PDF
const ComprobantePagoPDF = ({ pago }) => {
  if (!pago) return null;

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.section}>
          <Image style={styles.logo} src="src/assets/img/logo-el-ceibo.png" />
          <Text style={styles.legend}>Centro Social y Deportivo El Ceibo</Text>
          <Text style={styles.title}>Comprobante de Pago</Text>

          {pago.nombre && (
            <>
              <Text style={styles.text}>
                Nombre: {pago.nombre || "N/A"} {pago.apellido || ""}
              </Text>
              <Text style={styles.text}>DNI: {pago.dni || "N/A"}</Text>
            </>
          )}
          <Text style={styles.text}>Fecha de Pago: {formatDate(pago.fechaPago)}</Text>
          <Text style={styles.text}>Monto: ${pago.monto ?? 0}</Text>
          <Text style={styles.text}>Descripción: {pago.descripcion || "N/A"}</Text>
          <Text style={styles.text}>Cuota: {pago.tipo || "No especificada"}</Text>

          <Text style={styles.usuario}>Registrado Por: {pago.usuario_registro || "No especificado"}</Text>
          <Text style={styles.idPago}>Id Pago: {pago.id || "No especificado"}</Text>
        </View>
      </Page>
    </Document>
  );
};

// Botón de descarga del PDF con ícono y tooltip
const DescargarComprobante = ({ pago }) => {
  if (!pago) return null;

  return (
    <PDFDownloadLink
      document={<ComprobantePagoPDF pago={pago} />}
      fileName={`comprobante_pago_${pago.fechaPago || "sin_fecha"}.pdf`}
      className="btn btn-success mt-0"
    >
      {({ loading }) => (
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          className="p-1"
          title="Descargar comprobante de pago" // Tooltip de Bootstrap
          style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "1px" , width: "50px"}}
        >
          {loading ? "Generando PDF..." : <FaDownload size={16} />} {/* Ícono de descarga */}
        </span>
      )}
    </PDFDownloadLink>
  );
};

export default DescargarComprobante;
