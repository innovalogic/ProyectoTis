import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateral";

export default function InicioEstudiante() {
    

    return (
        <>
          <NavbarInicioDeSesion/>
          <div style={{ display: 'flex', height: '100%', marginTop: '70px'}}>
            <BarraLateral/>
            </div> 
          <BarraCopyright/>
        </>
    );
}
