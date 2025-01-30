import Header from "/src/Navbar/Header";
import Footer from "/src/index/Footer";
import RegistroJugadorForm from "./RegistroForm";

function REgistroJugadores() {
  return (
    <>
      <Header />
      <div  className="px-1 mt-5 pt-2 mb-5 pb-5 col-lg-8 col-sm-4 m-auto">
        <div className="mt-5 p-3 pb-3 mb-5  rounded pt-3 bg-dark text-light m-auto">
          
            <RegistroJugadorForm />
         </div>
      </div>
      <Footer />
    </>
  );
}

export default REgistroJugadores;
