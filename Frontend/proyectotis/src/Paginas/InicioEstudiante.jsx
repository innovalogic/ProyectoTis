import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateral";

export default function InicioEstudiante() {
    

    return (
        <>
          <NavbarInicioDeSesion/>
          <div>
            <BarraLateral/>
            <div></div>
          </div>
          <BarraCopyright/>
        </>
    );
}
