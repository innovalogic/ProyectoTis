import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateral";
import './AreaEstudiante.scss';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
export default function InicioEstudiante() {
      return (
        <>
        <NavbarInicioDeSesion />
          <div className="FLEX">
            <BarraLateral/>
          </div> 
          <BarraCopyright/>
        </>
    );
}
