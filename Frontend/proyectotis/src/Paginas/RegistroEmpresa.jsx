import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import styles from './RegistroEmpresa.module.css'; // Importa el CSS módulo
import Copyright from '../Componentes/BarraCopyright';
import { useForm } from 'react-hook-form'; 
import { Sidebar, Menu, MenuItem,SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function RegistroEmpresa() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
        <NavbarInicioDeSesion />
        <div style={{ display: 'flex', height: '100vh', marginTop: '70px' }}>
        <Sidebar
          collapsed={collapsed}
          className="bg-[#32569A] text-white shadow-lg transition-all duration-300 ease-in-out"
          style={{ width: collapsed ? '80px' : '250px' }} 
        >
          <div className={`${styles.sidebarHeader} bg-[#32569A]`}>
            <h1 className={`${collapsed ? 'hidden' : 'block'} text-white font-bold text-2xl`}>Menú</h1>
            <div style={{ marginLeft: '16px', paddingTop: '20px' }}>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="bg-blue-500 text-white p-2 rounded flex items-center justify-center"
              >
                <img
                src="/src/Imagenes/Barra.png"
                alt={collapsed ? 'Expandir' : 'Colapsar'}
                className="w-6 h-6"
                />
              </button>
            </div>
            <div className="text-center" style={{marginTop: '15px' }}>
              <img src="/src/Imagenes/Estudiante.png" alt="Logo" className="w-16 h-16 inline-block" />
            </div>
        </div>
        <h1 className={`${collapsed ? 'hidden' : 'block'} text-white font-bold text-2xl bg-[#32569A] text-center p-2`}>Estudiante</h1>

    <Menu
      menuItemStyles={{
        button: {
          backgroundColor: '#32569A',
          color: 'white',
          fontWeight: 'bold',
          [`&.active`]: {
            backgroundColor: '#25467C',
          },
        },
      }}
      className="bg-[#32569A]"
    >
      <MenuItem
        className={`text-white font-bold ${styles.menuItem}`}
        icon={<img src="/src/Imagenes/Inicio.png" alt="Inicio" className="w-8 h-8 inline-block" />}
        component={<Link to="/documentation" />}
      >
        Inicio
      </MenuItem>

      <MenuItem
        className={`text-white font-bold ${styles.menuItem}`}
        icon={<img src="/src/Imagenes/Test.png" alt="Evaluaciones" className="w-8 h-8 inline-block" />}
        component={<Link to="/calendar" />}
      >
        Evaluaciones
      </MenuItem>

      <MenuItem
        className={`text-white font-bold ${styles.menuItem}`}
        icon={<img src="/src/Imagenes/Calendar.png" alt="Calendario" className="w-8 h-8 inline-block" />}
        component={<Link to="/e-commerce" />}
      >
        Calendario
      </MenuItem>

      <SubMenu
        title="Empresa"
        className="bg-[#32569A] text-white font-bold"
        style={{ backgroundColor: '#32569A', color: 'white' }}
        icon={<img src="/src/Imagenes/Grupo.png" alt="Empresa" className="w-8 h-8 inline-block" />}
      >
        <MenuItem className="text-white font-bold" component={<Link to="/empresa/overview" />}>
          Registrar
        </MenuItem>
        <MenuItem className="text-white font-bold" component={<Link to="/empresa/departments" />}>
          Planificacion
        </MenuItem>
        <MenuItem className="text-white font-bold" component={<Link to="/empresa/contact" />}>
          Informacion
        </MenuItem>
      </SubMenu>
    </Menu>
  </Sidebar>

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

  </form>
</div>
      <Copyright/>
    </>
  );
}
