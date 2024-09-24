import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import BarraCopyright from "../Componentes/BarraCopyright";
import Modal from "../Componentes/Modal";
import './RegistroEstudiante.css';

export default function RegistroEstudiante() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        codsiss: '',
        codigoGrupo: '',
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

    const navigate = useNavigate(); // Hook para redirigir a otra página

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.contrasena !== formData.confirmarContrasena) {
            setModal({
                show: true,
                title: 'Error',
                message: 'Las contraseñas no coinciden.'
            });
            return;
        }
    
        try {
            const response = await fetch('http://localhost/proyectotis/backend/registerStudent.php', {
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

        // Si el registro fue exitoso, redirigir a otra página
        if (modal.title === 'Registro exitoso') {
            navigate('/InicioEstudiante'); // Redirigir a la página que prefieras
        }
    };

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="registro-estudiante-background">
                <div className="registro-estudiante-form-container">
                    <h1 className="text-4xl font-bold italic" style={{ color: '#1F3765', margin: '15px' }}>Registro Estudiante</h1>
                    <form className="registro-estudiante-form-grid" onSubmit={handleSubmit}>
                        <div className="registro-estudiante-form-row">
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="nombre" className="registro-estudiante-label">Nombre</label>
                                <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="apellido" className="registro-estudiante-label">Apellido</label>
                                <input type="text" id="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="codsiss" className="registro-estudiante-label">CodSISS</label>
                                <input type="text" id="codsiss" value={formData.codsiss} onChange={handleChange} placeholder="CodSISS" className="registro-estudiante-input-field" />
                            </div>
                        </div>
                        <div className="registro-estudiante-form-row">
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="codigoGrupo" className="registro-estudiante-label">Código de Grupo Docente</label>
                                <input type="text" id="codigoGrupo" value={formData.codigoGrupo} onChange={handleChange} placeholder="Código de Grupo" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="telefono" className="registro-estudiante-label">Número de Teléfono</label>
                                <input type="tel" id="telefono" value={formData.telefono} onChange={handleChange} placeholder="Número de Teléfono" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="contrasena" className="registro-estudiante-label">Contraseña</label>
                                <input type="password" id="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña" className="registro-estudiante-input-field" />
                            </div>
                        </div>
                        <div className="registro-estudiante-form-row">
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="confirmarContrasena" className="registro-estudiante-label">Confirmar Contraseña</label>
                                <input type="password" id="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} placeholder="Confirmar Contraseña" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="email" className="registro-estudiante-label">Email</label>
                                <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="example@est.umss.edu" className="registro-estudiante-input-field" />
                            </div>
                        </div>
                        <div className="registro-estudiante-form-row registro-estudiante-button-row">
                            <button type="button" className="registro-estudiante-btn-cancel">Cancelar</button>
                            <button type="submit" className="registro-estudiante-btn-register">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                show={modal.show}
                onClose={closeModal}
                title={modal.title}
                message={modal.message}
            />
            <BarraCopyright />
        </>
    );
}
