import { useState } from "react";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from "../Componentes/BarraCopyright";
import UMSSADMIN from "/src/Imagenes/UMSSADMIN.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Componentes/UserContext";
import Modal from "../Componentes/Modal";

export default function InicioSesionAdministrador() {
  const navigate = useNavigate();
  const [correoDocente, setCorreoDocente] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser(); // Obtén la función setUser del contexto
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define las credenciales fijas
    const CORREO_VALIDO = "samitomonti@gmail.com";
    const CONTRASENA_VALIDA = "sammymonty";

    if (correoDocente === CORREO_VALIDO && Contraseña === CONTRASENA_VALIDA) {
      const user = {
        correo: correoDocente,
        nombre: "Samuel Montaño",
      };

      setUser(user); // Almacena los datos del docente en el contexto

      // Muestra el modal de inicio de sesión exitoso
      setModal({
        show: true,
        title: "Inicio de sesión exitoso",
        message: "Bienvenido al panel del administrador.",
      });

      // Redirige después de un breve tiempo
      setTimeout(() => {
        setModal({ ...modal, show: false });
        navigate("/InicioAdministrador");
      }, 2000); // 2 segundos
    } else {
      // Muestra el modal de error
      setModal({
        show: true,
        title: "Error de inicio de sesión",
        message: "Correo o contraseña incorrectos. Por favor, intenta de nuevo.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setModal({
      ...modal,
      show: false,
    });
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col justify-between"
      style={{ backgroundImage: `url(${UMSSADMIN})` }}
    >
      <NavbarInicioDeSesion />
      <div className="flex-grow flex items-center justify-center mt-16">
        <div
          className="bg-custom-bg bg-opacity-90 p-12 flex flex-col items-center justify-center"
          style={{
            width: "60%",
            minWidth: "500px",
            height: "80%",
            maxWidth: "600px",
            borderRadius: "5rem",
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="text-center mt-0">
            <span
              className="text-5xl font-plex font-bold"
              style={{ color: "#1E3664" }}
            >
              Inicio Sesión
            </span>
            <br />
            <span
              className="text-5xl font-plex font-bold"
              style={{ color: "#1E3664" }}
            >
              Administrador
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 mt-8 w-full max-w-sm"
          >
            <div className="flex flex-col">
              <label
                className="text-lg font-medium mb-2"
                style={{ color: "#32569A" }}
              >
                Cuenta <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded-lg p-3"
                value={correoDocente}
                onChange={(e) => setCorreoDocente(e.target.value)}
                placeholder="usuario@gmail.com"
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label
                className="text-lg font-medium mb-2"
                style={{ color: "#32569A" }}
              >
                Contraseña <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="border-2 border-gray-300 rounded-lg p-3 pr-10"
                value={Contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="••••••••"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform translate-y-2 cursor-pointer text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="bg-[#32569A] text-white rounded-lg text-lg font-semibold hover:bg-[#163a6c] transition duration-300 px-4 py-2"
              style={{ width: "9rem" }}
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={modal.show}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
      />

      <Copyright />
    </div>
  );
}
