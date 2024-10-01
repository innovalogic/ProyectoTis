import { Encabezado } from "../Componentes/Encabezado";
import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateral";
import './AreaEstudiante.scss';

export default function InicioEstudiante() {
      return (
        <>
          <Encabezado />
          <div className="FLEX">
            <BarraLateral/>
          </div> 
          <BarraCopyright/>
        </>
    );
}
