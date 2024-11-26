import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralAdministrador";
import { useNavigate } from "react-router-dom";
import Modal from "../Componentes/Modal";
import { useState } from "react";
import { useUser } from "../Componentes/UserContext";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio"; // Asegúrate de que la ruta sea correcta

export default function RegistroDocente() {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        codigoDocente: '',
        telefono: '',
        contrasena: '',
        confirmarContrasena: '',
    });
    
    const [modal, setModal] = useState({
        show: false,
        title: '',
        message: ''
    });
    const navigate = useNavigate();
    if (!user) {
        return <Navigate to="/" replace />; // Redirige a la página de login
    }
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
        if ( id === "telefono" ||id==="codigoDocente") {
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
            const response = await fetch('http://localhost/proyectotis/backend/registroDocente.php', {
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
                    message: 'El docente ha sido registrado exitosamente.'
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
                message: 'Hubo un problema al registrar el docente.'
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
    const handleCancel = () => {
        setFormData({
            nombre: '',
            apellido: '',
            codsiss: '',
            correo: '',
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
            <div className="bg-custom-bg" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginTop: '70px' }}>
                <div style={{ display: 'flex', flex: 1 }}>
                    <BarraLateral />
                    <div style={{ flex: 1, padding: '20px' }}>
                        {/* Título centrado */}
                        <div style={{ 
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <h1 style={{ color: '#1E3664', fontSize: '2em', fontWeight: 'bold' }}>REGISTRO DOCENTE</h1>
                        </div>

                        {/* Recuadro centrado con formulario */}
                        <div style={{ 
                            backgroundColor: '#C0CDDE',
                            width: '80%',
                            height: 'auto',
                            padding: '30px',
                            margin: '0 auto',
                            borderRadius: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            {/* Formulario */}
                            <form style={{ width: '100%', maxWidth: '400px' }}onSubmit={handleSubmit}>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Nombres<span style={{ color: 'red' }}>*</span>
                                    <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Apellidos<span style={{ color: 'red' }}>*</span>
                                    <input type="text" id="apellido" value={formData.apellido} onChange={handleChange} required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Correo<span style={{ color: 'red' }}>*</span>
                                    <input type="email" id="correo" value={formData.correo} onChange={handleChange} required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Código de docente<span style={{ color: 'red' }}>*</span>
                                    <input type="text" id="codigoDocente" value={formData.codigoDocente} onChange={handleChange} required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Teléfono<span style={{ color: 'red' }}>*</span>
                                    <input type="tel" id="telefono" value={formData.telefono} onChange={handleChange} required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Contraseña<span style={{ color: 'red' }}>*</span>
                                    <input type="password" id="contrasena" value={formData.contrasena} onChange={handleChange} required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '20px', display: 'block' }}>
                                    Confirmar contraseña<span style={{ color: 'red' }}>*</span>
                                    <input type="password" id="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <button type="submit" style={{ backgroundColor: '#1E3664', color: '#FFFFFF', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginRight: '20px' }}>
                                    Registrar Docente
                                </button>
                                <button type="submit" style={{ backgroundColor: '#1E3664', color: '#FFFFFF', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </form>
                        </div>

                        {/* Otros elementos de la página */}
                        <div style={{ position: 'absolute', top: '60px', right: '55px' }}>
                            {/* Aquí puedes agregar el logo o cualquier otro elemento */}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={modal.show} onClose={closeModal} title={modal.title} message={modal.message} />
            <BarraCopyright />
        </>
    );
}
