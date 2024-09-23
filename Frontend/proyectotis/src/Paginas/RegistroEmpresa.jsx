import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
<<<<<<< HEAD
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
=======
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateral';
import { useForm } from 'react-hook-form'; 

export default function RegistroEmpresa() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
        <NavbarInicioDeSesion />
        <div style={{ display: 'flex', height: '100%', marginTop: '70px', backgroundColor: '#32569A' }}>
          <BarraLateral/>

          <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 p-4 flex-1 bg-[#c2d2e9] rounded-md` }>
            <h1 className="text-2xl font-bold text-[#32569A] text-center mb-4">Registro de Empresa</h1>
            <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-col w-full md:w-1/2">
      <label htmlFor="nombre" className="font-bold text-[#32569A]">
        Nombre de Empresa <span className="text-red-500">*</span>
      </label>
      <input
        id="nombre"
        type="text"
        {...register("NombreEmpresa")}
        className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
      />
    </div>

    <div className="flex flex-col w-full md:w-1/2">
      <label htmlFor="nombreCorto" className="font-bold text-[#32569A]">
        Nombre Corto de la Empresa <span className="text-red-500">*</span>
      </label>
      <input
        id="nombreCorto"
        type="text"
        {...register("NombreCorto")}
        className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
      />
    </div>
  </div>

  <div className="flex flex-col md:flex-row md:space-x-4">
    <div className="flex flex-col w-full md:w-1/2">
      <label htmlFor="correo" className="font-bold text-[#32569A]">
        Correo electrónico de la empresa <span className="text-red-500">*</span>
      </label>
      <input
        id="correo"
        type="email"
        {...register("CorreoEmpresa")}
        className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
      />
    </div>

    <div className="flex flex-col w-full md:w-1/2">
      <label htmlFor="representante" className="font-bold text-[#32569A]">
        Nombre Representante Legal <span className="text-red-500">*</span>
      </label>
      <input
        id="representante"
        type="text"
        {...register("NombreRepresentante")}
        className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
      />
    </div>
  </div>

  <div className="flex flex-col md:flex-row md:space-x-4">
    <div className="flex flex-col w-full md:w-1/2">
      <label htmlFor="numeroRepresentante" className="font-bold text-[#32569A]">
        Número Representante Legal <span className="text-red-500">*</span>
      </label>
      <input
        id="numeroRepresentante"
        type="text"
        {...register("NumeroRepresentante")}
        className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
      />
    </div>

    <div className="flex flex-col w-full md:w-1/2">
      <label htmlFor="foto" className="font-bold text-[#32569A]">
        Logo de la Empresa <span className="text-red-500">*</span>
      </label>
      <input
        id="foto"
        type="file"
        name="foto"
        accept="image/*"
        {...register("foto")}
        className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
      />
    </div>
  </div>

  <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
    <div className="flex flex-col w-full md:w-1/2">
      <label htmlFor="estudiante" className="font-bold text-[#32569A]">
        Estudiante
      </label>
      <select
        id="estudiante"
        {...register("gender")}
        className="border-2 border-[#32569A] bg-gray-200 p-2 rounded-md w-full"
      >
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
    </div>
    <div className="flex space-x-4 mt-4 md:mt-0">
      <input
        type="submit"
        value="Añadir"
        className="bg-[#32569A] text-white p-2 rounded-md cursor-pointer"
      />
      <input
        type="submit"
        value="Nuevo"
        className="bg-[#32569A] text-white p-2 rounded-md cursor-pointer"
      />
    </div>
  </div>
  
  <div className="overflow-x-auto p-4">
  <table className="min-w-full bg-[#c2d2e9] border-collapse rounded-md shadow-md">
    <thead>
      <tr className="bg-[#c2d2e9] text-black">
        <th className="py-2 px-4 border border-[#32569A]">Número</th>
        <th className="py-2 px-4 border border-[#32569A]">Nombre</th>
        <th className="py-2 px-4 border border-[#32569A]">Telefono</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="py-2 px-4 border border-[#32569A]">1</td>
        <td className="py-2 px-4 border border-[#32569A]">Juan Pérez</td>
        <td className="py-2 px-4 border border-[#32569A]">62353522</td>
      </tr>
      {/* Puedes agregar más filas aquí */}
    </tbody>
  </table>
  <div className="mt-4 flex justify-end space-x-4">
  <input
        type="submit"
        value="Retirar"
        className="bg-[#32569A] text-white p-2 rounded-md cursor-pointer"
      />
      <input
  type="submit"
  value="Cancelar"
  className="bg-gray-300 text-black p-2 rounded-md cursor-pointer border-4 border-yellow-400"
/>
      <input
        type="submit"
        value="Registrar"
        className="bg-[#32569A] text-white p-2 rounded-md cursor-pointer"
      />
  </div>
</div>

  </form>
</div>
      <Copyright/>
    </>
  );
}
>>>>>>> 7e248db66d06f277e8b4e16b0f83f12ed9302aba
