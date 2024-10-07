import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';
import BarraLateralDocente from '../Componentes/BarraLateralDocente';


export default function RecuperarEvaluacion() {


  return (
    <>
        <NavbarInicioDeSesion />
        <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
          <BarraLateralDocente/>
          <form className={`space-y-4 p-4 flex-1 bg-[#efe7dc] rounded-md` }>
            <h1 className="text-2xl font-bold text-[#32569A] text-center mb-4">Recuperar Evaluaciones</h1>
          
          </form>
        </div>
      <Copyright/>
    </>
    
  );
}