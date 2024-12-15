import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import BarraCopyright from "../Componentes/BarraCopyright";
import Modal from "../Componentes/Modal";

export default function RegistroEstudiante() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        codsiss: '',
        codigoDocente: '',
        telefono: '',
        contrasena: '',
        confirmarContrasena: '',
        email: ''
    });

    const [modal, setModal] = useState({
        show: false,
        title: '',
        message: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;

        // Validación para nombre y apellido (solo letras y espacios)
        if (id === "nombre" || id === "apellido") {
            const regex = /^[a-zA-Z\s]*$/; // Permite solo letras y espacios
            if (!regex.test(value)) {
                return; // Si el valor no cumple la regex, no hace nada
            }
        }

        // Validación para CodSISS y teléfono (solo números)
        if (id === "codsiss" || id === "telefono" ||id==="codigoDocente") {
            const regex = /^[0-9]*$/; // Permite solo números
            if (!regex.test(value)) {
                return; // Si el valor no cumple la regex, no hace nada
            }
        }


        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validación de longitud de CodSISS
    if (formData.codsiss.length < 9) {
        setModal({
            show: true,
            title: 'Error',
            message: 'El CodSISS debe tener al menos 9 dígitos.'
        });
        return;
    }

    // Validación de longitud de Teléfono
    if (formData.telefono.length !== 8) {
        setModal({
            show: true,
            title: 'Error',
            message: 'El teléfono debe tener exactamente 8 dígitos.'
        });
        return;
    }

    // Validación de longitud de Contraseña
    if (formData.contrasena.length < 8 || formData.contrasena.length > 20) {
        setModal({
            show: true,
            title: 'Error',
            message: 'La contraseña debe tener entre 8 y 20 caracteres.'
        });
        return;
    }

    // Validación de Confirmar Contraseña
    if (formData.contrasena !== formData.confirmarContrasena) {
        setModal({
            show: true,
            title: 'Error',
            message: 'Las contraseñas no coinciden.'
        });
        return;
    }

    // Validación de Código de Grupo
    if (formData.codigoDocente.length !== 4) {
        setModal({
            show: true,
            title: 'Error',
            message: 'El código de grupo debe tener exactamente 4 dígitos.'
        });
        return;
    }

        try {
            const response = await fetch('https://tis-e8f3f498eaee.herokuapp.com/registerStudent.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor.");
            }

            const result = await response.json();
            if (result.success) {
                setModal({
                    show: true,
                    title: 'Registro exitoso',
                    message: 'El estudiante ha sido registrado exitosamente.'
                });
            } else {
                setModal({
                    show: true,
                    title: 'Error en el registro',
                    message: result.message
                });
            }
        } catch (error) {
            setModal({
                show: true,
                title: 'Error',
                message: 'Hubo un problema al registrar el estudiante.'
            });
        }
    };

    const closeModal = () => {
        setModal({
            ...modal,
            show: false
        });

        if (modal.title === 'Registro exitoso') {
            navigate('/InicioSesionEstudiante');
        }
    };
    // Función para limpiar los campos del formulario
    const handleCancel = () => {
        setFormData({
            nombre: '',
            apellido: '',
            codsiss: '',
            codigoDocente: '',
            telefono: '',
            contrasena: '',
            confirmarContrasena: '',
            email: ''
        });
    };

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="bg-cover bg-center bg-no-repeat w-screen flex justify-center items-center flex-col" style={{ backgroundImage: "url('/src/Imagenes/UMSSENTRADA6.jpg')", marginTop: '70px', height: 'calc(-110px + 100vh)' }}>
                <div className="bg-opacity-80 bg-gray-200 rounded-lg p-8 w-full max-w-4xl shadow-lg flex flex-col items-center mt-10">
                    <h1 className="text-4xl font-bold italic text-[#1E3664] mb-6">Registro Estudiante</h1>
                    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap justify-between mb-6">
                            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                                <label htmlFor="nombre" className="text-base mb-1 text-[#1E3664] font-bold">Nombre</label>
                                <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                                <label htmlFor="apellido" className="text-base mb-1 text-[#1E3664] font-bold">Apellido</label>
                                <input type="text" id="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                                <label htmlFor="codsiss" className="text-base mb-1 text-[#1E3664] font-bold">CodSISS</label>
                                <input type="text" id="codsiss" value={formData.codsiss} onChange={handleChange} placeholder="CodSISS" className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between mb-6">
                            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                                <label htmlFor="codigoDocente" className="text-base mb-1 text-[#1E3664] font-bold">Codigo de Docente</label>
                                <input type="text" id="codigoDocente" value={formData.codigoDocente} onChange={handleChange} placeholder="codigoDocente" className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                                <label htmlFor="contrasena" className="text-base mb-1 text-[#1E3664] font-bold">Contraseña</label>
                                <input type="password" id="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña" className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                                <label htmlFor="confirmarContrasena" className="text-base mb-1 text-[#1E3664] font-bold">Confirmar Contraseña</label>
                                <input type="password" id="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} placeholder="Confirmar Contraseña" className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between mb-6">
                            <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                                <label htmlFor="telefono" className="text-base mb-1 text-[#1E3664] font-bold">Teléfono</label>
                                <input type="tel" id="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                                <label htmlFor="email" className="text-base mb-1 text-[#1E3664] font-bold">Email</label>
                                <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="example@est.umss.edu" className="w-full p-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                        <div className="flex justify-center space-x-6 mt-5">
                        <button
                            type="button"
                            className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-red-600"
                            onClick={handleCancel} 
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-[#1E3664] text-white py-3 px-8 rounded-lg hover:bg-[#1A2F56]"
                        >
                            Registrar
                        </button>
                        </div>

                    </form>
                </div>
            </div>
            <Modal show={modal.show} onClose={closeModal} title={modal.title} message={modal.message} />
            <BarraCopyright />
        </>
    );
}