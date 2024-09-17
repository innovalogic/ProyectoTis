import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import './RegistroEmpresa.css';
import React, { useState } from 'react';
export default function RegistroEmpresa() {
    const [representante, setRepresentante] = useState('');
    const [numero, setNumero] = useState('');

    // Simular una función para generar un número automáticamente
    const generarNumero = () => {
        // Genera un número aleatorio o usa cualquier lógica necesaria
        return Math.floor(Math.random() * 1000);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        const selectedOption = event.target.options[event.target.selectedIndex];
        const nombre = selectedOption.text;

        setRepresentante(nombre);
        setNumero(generarNumero());
    };
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
                            <label htmlFor="correo">Correo electronico de la empresa</label>
                            <input type="text" id="correo" placeholder="Correo electronico de la empresa" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="nombreRep">Nombre Representante Legal</label>
                            <input type="text" id="nombreRep" placeholder="Nombre Representante Legal" className="input-field" />
                        </div>
                    </div>    
                    
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="numeroRep">Numero Representante Legal</label>
                            <input type="text" id="numeroRep" placeholder="Numero Representante Legal" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="foto">Seleccionar Foto</label>
                            <input type="file" id="foto" name="foto" className="input-field" accept="image/*" />
                        </div>
                    </div> 

                    <div className="form-row">
            <div className="input-group">
                <label htmlFor="numeroRep">Estudiante</label>
                <select
                    id="numeroRep"
                    className="input-field"
                    onChange={handleChange}
                >
                    <option value="">Seleccionar Representante</option>
                    <option value="1">Representante 1</option>
                    <option value="2">Representante 2</option>
                    <option value="3">Representante 3</option>
                </select>
            </div>

            <div className="input-group">
                <label htmlFor="">Seleccionar Foto</label>
                <table className="input-field">
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Nombre</th>
                            <th>Número de Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" value={numero} readOnly /></td>
                            <td><input type="text" value={representante} readOnly /></td>
                            <td><input type="text" placeholder="Número de Teléfono" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
