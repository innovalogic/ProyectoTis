import { useState } from "react";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from "../Componentes/BarraCopyright";
import UMSS from "/Imagenes/UMSS.jpg";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useUser } from "../Componentes/UserContext";
import Modal from '../Componentes/Modal'

export default function InicioSesionEstudiante() {
  const [codSis, setCodSis] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: ''
  });
  
  const { setUser } = useUser(); // Obtén la función setUser del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = {
      codSis: codSis,
      password: Contraseña,
    };
  

  
    try {
      const responseEstudiante = await fetch("http://innovalogic.tis.cs.umss.edu.bo/inicioSesion.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      const resultEstudiante = await responseEstudiante.json();
  
      if (resultEstudiante.Usuario === "Estudiante") {
        // Si es estudiante, redirige a la página correspondiente
        setUser(resultEstudiante.Datos);
        setModal({
          show: true,
          title: 'Inicio de sesión exitoso como Estudiante',
          message: 'Se inicio sesión exitosamente!!'
        });
        return;
      }
  
      // Si no es estudiante, intentar como docente
      const responseDocente = await fetch("http://innovalogic.tis.cs.umss.edu.bo/inicioSesionD.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      const resultDocente = await responseDocente.json();
  
      if (resultDocente.Usuario === "Docente") {
        // Si es docente, redirige a la página correspondiente
        setUser(resultDocente.Datos);
        setModal({
          show: true,
          title: 'Inicio de sesión exitoso como Docente',
          message: 'Se inicio sesión exitosamente!!'
        });
      } else {
        // Si no es ni estudiante ni docente
        console.log("Error en el inicio de sesión:", resultDocente.message || "Credenciales inválidas");
        setModal({
          show: true,
          title: 'Error',
          message: 'Credenciales inválidas. Por favor, verifica tu información.',
        });
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setModal({
        show: true,
        title: 'Error',
        message: 'Ocurrió un error al procesar la solicitud.',
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
  
    // Verifica el tipo de usuario y redirige
    if (modal.title === 'Inicio de sesión exitoso como Estudiante') {
      navigate('/InicioEstudiante');
    } else if (modal.title === 'Inicio de sesión exitoso como Docente') {
      navigate('/InicioDocente');
    }
  };


  return (
    <div className="bg-cover bg-center h-screen flex flex-col justify-between" style={{ backgroundImage: `url(${UMSS})` }}>
      <NavbarInicioDeSesion />
      <div className="flex-grow flex items-center justify-center mt-16">
        <div className="bg-custom-bg bg-opacity-90 p-12 flex flex-col items-center justify-center"
             style={{ width: "60%", minWidth: "500px", height: "80%", maxWidth: "600px", borderRadius: "5rem", boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}>
          <div className="text-center mt-0">
            <span className="text-5xl font-plex font-bold" style={{ color: "#1E3664" }}>Inicio Sesión </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mt-8 w-full max-w-sm">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>Usuario <span style={{ color: "red" }}>*</span></label>
              <input type="text"
                     className="border-2 border-gray-300 rounded-lg p-3"
                     value={codSis}
                     onChange={(e) => setCodSis(e.target.value)}
                     required
                     maxLength={50}
                     minLength={3} />
            </div>

            <div className="flex flex-col relative">
              <label className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>Contraseña <span style={{ color: "red" }}>*</span></label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"}
                       className="border-2 border-gray-300 rounded-lg p-3 w-full pr-10"
                       value={Contraseña}
                       onChange={(e) => setContraseña(e.target.value)}
                       required
                       maxLength={50}
                       minLength={3} />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="text-left">
              <span className="text-lg font-medium mb-2" style={{ color: "#32569A" }}>
                ¿Es tu primera vez?{" "}
                <a href="RegistroEstudiante" className="text-red-600 font-semibold">Regístrate</a>
              </span>
            </div>

            <button type="submit"
                    className="bg-[#32569A] text-white rounded-lg text-lg font-semibold hover:bg-[#163a6c] transition duration-300 px-4 py-2"
                    style={{ width: '9rem' }}>
              Ingresar
            </button>
          </form>
        </div>
      </div>
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
