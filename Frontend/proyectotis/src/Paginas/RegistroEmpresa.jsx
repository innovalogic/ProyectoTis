import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import './RegistroEmpresa.css';

export default function RegistroEmpresa() {

    return (
        <>
            <NavbarInicioDeSesion />
            <div className="background-color">
                <div className="form-container">
                    <h1 className="text-4xl font-bold italic" style={{ color: '#1F3765' ,margin:'15px'}}>Registro Grupo Empresa</h1>
                    <form className="form-grid">
                    <div className="form-row">

                        <div className="input-group">
                            <label htmlFor="nombre">Nombre de Empresa</label>
                            <input type="text" id="nombrEmpresa" placeholder="Nombre de Empresa" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="apellido">Nombre corto de la Empresa</label>
                            <input type="text" id="nombreCorto" placeholder="Nombre corto de la Empresa" className="input-field" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="codsiss">Correo electronico de la empresa</label>
                            <input type="text" id="correo" placeholder="Correo electronico de la empresa" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="codsiss">Nombre Representante Legal</label>
                            <input type="text" id="nombreRep" placeholder="Nombre Representante Legal" className="input-field" />
                        </div>
                    </div>    
                    
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="codsiss">Numero Representante Legal</label>
                            <input type="text" id="numeroRep" placeholder="Numero Representante Legal" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="codsiss">Nombre Representante Legal</label>
                            <input type="text" id="codsiss" placeholder="CodSISS" className="input-field" />
                        </div>
                    </div> 
                            
                    </form>
                </div>
            </div>
        </>
    );
}
