import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralEstudiante";
//import './AreaEstudiante.scss';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
export default function InicioEstudiante() {
      return (
        <>
        <NavbarInicioDeSesion />
        <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
          <BarraLateral/>
            <form  className={`space-y-4 p-4 flex-1 bg-[#c2d2e9] rounded-md` }>
            <div className="bg-[#32569A] text-white p-4 rounded-md flex items-center justify-center">
        <span className="text-lg font-semibold">Nombre del Docente</span>
      </div>
          </form>
        </div>
          <BarraCopyright/>
        </>
    );
}
