import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralAdministrador";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio"; // Asegúrate de que la ruta sea correcta

export default function RegistroDocente() {
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
                            <form style={{ width: '100%', maxWidth: '400px' }}>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Nombres<span style={{ color: 'red' }}>*</span>
                                    <input type="text" required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Apellidos<span style={{ color: 'red' }}>*</span>
                                    <input type="text" required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Correo<span style={{ color: 'red' }}>*</span>
                                    <input type="email" required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Código de docente<span style={{ color: 'red' }}>*</span>
                                    <input type="text" required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Teléfono<span style={{ color: 'red' }}>*</span>
                                    <input type="tel" required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                                    Contraseña<span style={{ color: 'red' }}>*</span>
                                    <input type="password" required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <label style={{ color: '#1E3664', fontWeight: 'bold', marginBottom: '20px', display: 'block' }}>
                                    Confirmar contraseña<span style={{ color: 'red' }}>*</span>
                                    <input type="password" required style={{ width: '100%', padding: '5px', borderRadius: '5px', marginTop: '5px', border: '1px solid #1E3664', height: '30px' }} />
                                </label>
                                <button type="submit" style={{ backgroundColor: '#1E3664', color: '#FFFFFF', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Registrar Docente
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
            <BarraCopyright />
        </>
    );
}
