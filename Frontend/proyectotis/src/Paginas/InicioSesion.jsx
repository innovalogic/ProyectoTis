import NavbarInicioDeSesion from "../Componentes/NavbarInicio"; //Importa El
import Copyright from "../Componentes/BarraCopyright"; // Importa el componente Copyright
import UMSSENTRADA4 from "/src/Imagenes/UMSSENTRADA4.jpg"; // Importa la imagen desde src

export default function InicioSesion() {
    return (
        <div className="bg-cover bg-center h-screen flex flex-col justify-between" style={{ backgroundImage: `url(${UMSSENTRADA4})` }}>
            <NavbarInicioDeSesion />
            {/* Contenedor que incluye el margen superior para el cuadrado */}
            <div className="flex-grow flex items-center justify-center mt-16"> {/* Ajusta el valor de mt-10 según necesites */}
                <div className="bg-custom-bg bg-opacity-90" style={{ width: '45rem', height: '40rem', borderRadius: '5rem', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}>
                    {/* Contenido dentro del rectángulo*/}
                    <div className="text-center mt-5">
                      <span className="text-5xl font-plex font-bold " style={{ color: '#1E3664' }}>
                          Iniciar Sesión
                      </span>
                    </div>
                </div>
            </div>
            {/* Componente Copyright en la parte inferior sin necesidad de scroll */}
            <Copyright />
        </div>
    );
}
