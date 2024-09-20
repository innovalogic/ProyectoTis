import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import BarraCopyright from "../Componentes/BarraCopyright";
import './RegistroEstudiante.css';

export default function RegistroEstudiante() {
    return (
        <>
            <NavbarInicioDeSesion />
            <div className="registro-estudiante-background">
                <div className="registro-estudiante-form-container">
                    <h1 className="text-4xl font-bold italic" style={{ color: '#1F3765' ,margin:'15px'}}>Registro Estudiante</h1>
                    <form className="registro-estudiante-form-grid">
                        <div className="registro-estudiante-form-row">
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="nombre" className="registro-estudiante-label">Nombre</label>
                                <input type="text" id="nombre" placeholder="Nombre" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="apellido" className="registro-estudiante-label">Apellido</label>
                                <input type="text" id="apellido" placeholder="Apellido" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="codsiss" className="registro-estudiante-label">CodSISS</label>
                                <input type="text" id="codsiss" placeholder="CodSISS" className="registro-estudiante-input-field" />
                            </div>
                        </div>
                        <div className="registro-estudiante-form-row">
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="codigoGrupo" className="registro-estudiante-label">Código de Grupo</label>
                                <input type="text" id="codigoGrupo" placeholder="Código de Grupo" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="telefono" className="registro-estudiante-label">Número de Teléfono</label>
                                <input type="tel" id="telefono" placeholder="Número de Teléfono" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="contrasena" className="registro-estudiante-label">Contraseña</label>
                                <input type="password" id="contrasena" placeholder="Contraseña" className="registro-estudiante-input-field" />
                            </div>
                        </div>
                        <div className="registro-estudiante-form-row">
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="confirmarContrasena" className="registro-estudiante-label">Confirmar Contraseña</label>
                                <input type="password" id="confirmarContrasena" placeholder="Confirmar Contraseña" className="registro-estudiante-input-field" />
                            </div>
                            <div className="registro-estudiante-input-group">
                                <label htmlFor="email" className="registro-estudiante-label">Email</label>
                                <input type="email" id="email" placeholder="example@est.umss.edu" className="registro-estudiante-input-field" />
                            </div>
                        </div>
                        <div className="registro-estudiante-form-row registro-estudiante-button-row">
                            <button type="button" className="registro-estudiante-btn-cancel">Cancelar</button>
                            <button type="submit" className="registro-estudiante-btn-register">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
            <BarraCopyright/>
        </>
    );
}

