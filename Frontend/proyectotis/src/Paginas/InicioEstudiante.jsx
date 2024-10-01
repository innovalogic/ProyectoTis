import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateral";
import './AreaEstudiante.scss';

export default function InicioEstudiante() {
      return (
        <>
          <div className="FLEX">
            <BarraLateral/>
          </div> 
          <BarraCopyright/>
        </>
    );
}
