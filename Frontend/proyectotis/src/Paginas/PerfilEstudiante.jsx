import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralEstudiante";
//import './AreaEstudiante.scss';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
export default function PerfilEstudiante() {
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