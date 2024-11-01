import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralAdministrador";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import LogoInformatica from "../Imagenes/logoInformatica.png"; // Asegúrate de que la ruta sea correcta

export default function InicioAdministrador() {
    return (
        <>
            <NavbarInicioDeSesion />
            <div className="bg-custom" style={{ display: 'flex', height: '100%', marginTop: '70px', position: 'relative' }}>
                <BarraLateral />
                {/* Contenedor para la imagen principal */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img 
                        src="/src/Imagenes/Admin.png" // Cambia esta ruta por la correcta
                        alt="Administrador"
                        style={{ width: '350px', height: 'auto', marginTop: '-50px' }} // Ajusta el margen superior
                    />
                </div>
                {/* Contenedor para el logo en la parte superior derecha */}
                <div style={{ position: 'absolute', top: '60px', right: '55px' }}> {/* Ajusta 'right' para mover el logo a la izquierda */}
                    <img 
                        src={LogoInformatica} // Usar la imagen importada
                        alt="Logo Informática"
                        style={{ width: '150px', height: 'auto' }} // Ajusta el tamaño según necesites
                    />
                </div>
            </div>
            <BarraCopyright />
        </>
    );
}
