import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralDocente";
//import './AreaEstudiante.scss';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
export default function InicioDocente() {
      return (
        <>
        <NavbarInicioDeSesion />
          <div style={{ display: 'flex', height: '100%', marginTop: '70px' }}>
            <BarraLateral/>
          </div> 
          <BarraCopyright/>
        </>
    );
}
