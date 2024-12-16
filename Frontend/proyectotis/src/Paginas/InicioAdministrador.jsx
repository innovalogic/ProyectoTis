import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralAdministrador";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import { useUser } from '../Componentes/UserContext';
export default function InicioAdministrador() {
    const { user } = useUser();
    if (!user) {
        return <Navigate to="/" replace />; // Redirige a la página de login
    }

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="bg-custom-bg" style={{ display: 'flex', height: 'calc(-110px + 100vh)', marginTop: '70px', position: 'relative' }}>
                <BarraLateral />
                {/* Contenedor para la imagen principal */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img 
                        src="/Imagenes/Admin.png" // Cambia esta ruta por la correcta
                        alt="Administrador"
                        style={{ width: '350px', height: 'auto', marginTop: '-50px' }} // Ajusta el margen superior
                    />
                </div>
                {/* Contenedor para el logo en la parte superior derecha */}
                <div style={{ position: 'absolute', top: '60px', right: '55px' }}> {/* Ajusta 'right' para mover el logo a la izquierda */}
                <img 
                        src="/Imagenes/Admin.png"  // Ruta correcta
                        alt="Administrador"
                        style={{ width: '350px', height: 'auto', marginTop: '-50px' }} 
                    />
                </div>
            </div>
            <BarraCopyright />
        </>
    );
}
