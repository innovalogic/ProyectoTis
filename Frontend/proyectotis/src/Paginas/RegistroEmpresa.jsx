import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import './RegistroEmpresa.css';
import React, { useState } from 'react';
export default function RegistroEmpresa() {
    const [representantes, setRepresentantes] = useState([]);

    const generarNumero = () => {
        // Retorna el siguiente número secuencial
        return representantes.length + 1;
    };

    const handleChange = (event) => {
        const value = event.target.value;
        if (value) {
            const selectedOption = event.target.options[event.target.selectedIndex];
            const nombre = selectedOption.text;

            // Añadir nuevo representante a la lista
            setRepresentantes(prevRepresentantes => [
                ...prevRepresentantes,
                { numero: generarNumero(), nombre }
            ]);
        }
    };
    return (
        <>
        <NavbarInicioDeSesion />
        <div className="background-color">
            <div className="form-container">
                <h1 className="text-4xl font-bold italic" style={{ color: '#1F3765', margin: '15px' }}>Registro Grupo Empresa</h1>
                <form className="form-grid">
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="nombre">Nombre de Empresa</label>
                            <input type="text" id="nombreEmpresa" placeholder="Nombre de Empresa" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="apellido">Nombre corto de la Empresa</label>
                            <input type="text" id="nombreCorto" placeholder="Nombre corto de la Empresa" className="input-field" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="correo">Correo electrónico de la empresa</label>
                            <input type="text" id="correo" placeholder="Correo electrónico de la empresa" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="nombreRep">Nombre Representante Legal</label>
                            <input type="text" id="nombreRep" placeholder="Nombre Representante Legal" className="input-field" />
                        </div>
                    </div>    

                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="numeroRep">Número Representante Legal</label>
                            <input type="text" id="numeroRep" placeholder="Número Representante Legal" className="input-field" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="foto">Seleccionar Foto</label>
                            <input type="file" id="foto" name="foto" className="input-field" accept="image/*" />
                        </div>
                    </div> 

                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="estudiante">Estudiante</label>
                            <select
                                id="estudiante"
                                className="input-field"
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar Representante</option>
                                <option value="1">Estudiante 1</option>
                                <option value="2">Estudiante 2</option>
                                <option value="3">Estudiante 3</option>
                            </select>
                            <div className="form-row button-row">
                                <button type="submit" className="btn-register">Añadir</button>
                                <button type="submit" className="btn-register">Nuevo</button>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="">Lista Grupo Empresa</label>
                            <table className="input-field">
                                <thead>
                                    <tr>
                                        <th>Número</th>
                                        <th>Nombre</th>
                                        <th>Número de Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {representantes.map((rep, index) => (
                                        <tr key={index}>
                                            <td><input type="text" value={rep.numero} readOnly /></td>
                                            <td><input type="text" value={rep.nombre} readOnly /></td>
                                            <td><input type="text" placeholder="Número de Teléfono" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="form-row button-row">
                                <button type="submit" className="btn-register">Retirar</button>
                                <button type="button" className="btn-cancel">Cancelar</button>
                                <button type="submit" className="btn-register">Registrar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
}
