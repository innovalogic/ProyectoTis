import { useState } from "react";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import BarraCopyright from "../Componentes/BarraCopyright";
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
            alert("Las contraseñas no coinciden.");
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
    
            const text = await response.text(); // Leer como texto
            console.log("Respuesta del servidor:", text); // Imprimir la respuesta
    
            const result = JSON.parse(text); // Luego intenta convertir a JSON
            console.log("Resultado procesado:", result);
            
            if (result.success) {
                alert("Registro exitoso");
            } else {
                alert("Error en el registro: " + result.message);
            }
        } catch (error) {
            console.error('Error al registrar estudiante:', error);
            alert("Hubo un problema al registrar el estudiante.");
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
            <BarraCopyright />
        </>
    );
}
