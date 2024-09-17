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
      {/* Contenedor que incluye el margen superior para el cuadro */}
      <div className="flex-grow flex items-center justify-center mt-16">
        <div
          className="bg-custom-bg bg-opacity-90 p-12 flex flex-col items-center justify-center"
          style={{ width: "60%", minWidth: "500px", height: "80%", maxWidth: "600px", borderRadius: "5rem", boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Título */}
          <div className="text-center mt-0"> {/* Reduje el margen superior aquí */}
            <span className="text-5xl font-plex font-bold" style={{ color: "#1E3664" }}>
              Iniciar Sesión
            </span>
          </div>

          {/* Formulario */}
          <form className="flex flex-col space-y-6 mt-8 w-full max-w-sm">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>
                Correo <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                className="border-2 border-gray-300 rounded-lg p-3"
                value={Correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="example@est.umss.edu"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>
                Contraseña <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                className="border-2 border-gray-300 rounded-lg p-3"
                value={Contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {/* Texto adicional alineado a la izquierda */}
            <div className="text-left">
              <span className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>
                ¿Es tu primera vez?{" "}
                <a href="RegistroEstudiante" className="text-red-600 font-semibold">
                  Regístrate
                </a>
              </span>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="bg-[#32569A] text-white rounded-lg text-lg font-semibold hover:bg-[#163a6c] transition duration-300 px-4 py-2"
              style={{ width: '9rem' }}
            >
              Ingresar
            </button>

          </form>
        </div>
      </div>
      {/* Componente Copyright en la parte inferior sin necesidad de scroll */}
      <Copyright />
    </div>
  );
}
