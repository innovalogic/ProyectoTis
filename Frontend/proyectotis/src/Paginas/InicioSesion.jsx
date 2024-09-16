import NavbarInicioDeSesion from "../Componentes/NavbarInicio"; // Importa El
import Copyright from "../Componentes/BarraCopyright"; // Importa el componente Copyright
import UMSSENTRADA4 from "/src/Imagenes/UMSSENTRADA4.jpg"; // Importa la imagen desde src
import { useState } from "react";

export default function InicioSesion() {
  const [Correo, setCorreo] = useState("");
  const [Contraseña, setContraseña] = useState("");

  return (
    <div className="bg-cover bg-center h-screen flex flex-col justify-between" style={{ backgroundImage: `url(${UMSSENTRADA4})` }}>
      <NavbarInicioDeSesion />
      {/* Contenedor que incluye el margen superior para el cuadrado */}
      <div className="flex-grow flex items-center justify-center mt-16">
        <div className="bg-custom-bg bg-opacity-90" style={{ width: '45rem', height: '40rem', borderRadius: '5rem', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}>
          {/* Contenido dentro del rectángulo */}
          <div className="text-center mt-5">
            <span className="text-5xl font-plex font-bold" style={{ color: '#1E3664' }}>
              Iniciar Sesión
            </span>
          </div>
          <div>
            <form className="flex flex-col space-y-6 p-8">
              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">Correo *</label>
                <input
                  type="email"
                  className="border-2 border-gray-300 rounded-lg p-3"
                  value={Correo}
                  onChange={e => setCorreo(e.target.value)}
                  placeholder="example@est.umss.edu"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">Contraseña *</label>
                <input
                  type="password"
                  className="border-2 border-gray-300 rounded-lg p-3"
                  value={Contraseña}
                  onChange={e => setContraseña(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="bg-[#1E3664] text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-[#163a6c] transition duration-300"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Componente Copyright en la parte inferior sin necesidad de scroll */}
      <Copyright />
    </div>
  );
}
