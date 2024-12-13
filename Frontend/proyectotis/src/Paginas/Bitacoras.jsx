import Navbar from "../Componentes/NavbarInicio"; 
import BarraLateral from "../Componentes/BarraLateralAdministrador"; 
import BarraCopyright from "../Componentes/BarraCopyright";

const Bitacoras = () => {

  

  return (
    <>
      <Navbar />
      <div className="bg-custom-bg flex" style={{ height: '100vh', marginTop: '70px' }}>
        <BarraLateral />
      </div>
      <BarraCopyright />
    </>
  );
}

export default Bitacoras;
