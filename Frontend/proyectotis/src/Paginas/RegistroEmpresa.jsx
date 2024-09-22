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
        
        <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        collapsed={collapsed}
        className="bg-[#32569A]"
        style={{ backgroundColor: '#32569A' }} // Estilo adicional para asegurarte de que el color se aplique
      >
        <div className={`${styles.sidebarHeader} bg-[#32569A]`}>
          <h1 className={`${collapsed ? 'hidden' : 'block'} text-white font-bold text-2xl`}>
            Menú
          </h1>
          <div className="text-center">
            <img src="/src/Imagenes/User.png" alt="Logo" className="w-16 h-16 inline-block" />
          </div>
        </div>

        <Menu
          menuItemStyles={{
            button: {
              backgroundColor: '#32569A',
              color: 'white',
              fontWeight: 'bold', // Asegura que el texto esté en negrilla
              [`&.active`]: {
                backgroundColor: '#25467C', // Un color más oscuro para el estado activo
              },
            },
          }}
          className="bg-[#32569A]" // Aplicar color de fondo a Menu
        >
          <MenuItem
            className={`text-white font-bold ${styles.menuItem}`}
            icon={<img src="/src/Imagenes/Home.png" alt="Inicio" className="w-8 h-8 inline-block" />}
            component={<Link to="/documentation" />}
          >
            Inicio
          </MenuItem>
          <MenuItem
            className={`text-white font-bold ${styles.menuItem}`}
            icon={<img src="/src/Imagenes/Calendar.png" alt="Evaluaciones" className="w-8 h-8 inline-block" />}
            component={<Link to="/calendar" />}
          >
            Evaluaciones
          </MenuItem>
          <MenuItem
            className={`text-white font-bold ${styles.menuItem}`}
            icon={<img src="/src/Imagenes/Ecommerce.png" alt="Calendario" className="w-8 h-8 inline-block" />}
            component={<Link to="/e-commerce" />}
          >
            Calendario
          </MenuItem>

          <SubMenu
            title="Empresa"
            className="bg-[#32569A] text-white font-bold" // Aplicar color de fondo y texto en negrilla a SubMenu
            style={{ backgroundColor: '#32569A', color: 'white' }}
            icon={<img src="/src/Imagenes/Building.png" alt="Empresa" className="w-8 h-8 inline-block" />}
          >
            <MenuItem className="text-white font-bold" component={<Link to="/empresa/overview" />}>
              Visión General
            </MenuItem>
            <MenuItem className="text-white font-bold" component={<Link to="/empresa/departments" />}>
              Departamentos
            </MenuItem>
            <MenuItem className="text-white font-bold" component={<Link to="/empresa/contact" />}>
              Contacto
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      {/* Botón para colapsar el Sidebar */}
      <div style={{ marginLeft: '16px', paddingTop: '20px' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {collapsed ? 'Expandir' : 'Colapsar'}
        </button>
      </div>
    </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                
                <label htmlFor="nombre" className={`${styles.label} ${styles.required}`}>Nombre de Empresa</label>
                <input {...register("NombreEmpresa")} className={styles.input} />

                <label htmlFor="nombre" className={`${styles.label} ${styles.required}`}>Nombre Corto de la Empresa</label>
                <input {...register("NombreCorto")} className={styles.input} />

                <label htmlFor="nombre" className={`${styles.label} ${styles.required}`}>Correo electrónico de la empresa</label>
                <input {...register("CorreoEmpresa")} className={styles.input} />

                <label htmlFor="nombre" className={`${styles.label} ${styles.required}`}>Nombre Representante Legal</label>
                <input {...register("NombreRepresentante")} className={styles.input} />

                <label htmlFor="nombre" className={`${styles.label} ${styles.required}`}>Número Representante Legal</label>
                <input {...register("NumeroRepresentante")} className={styles.input} />

                <label htmlFor="foto" className={`${styles.label} ${styles.required}`}>Logo de la Empresa</label>
                <input type="file" id="foto" name="foto" accept="image/*"{...register("foto")} className={styles.input} />

                <label htmlFor="foto">Estudiante</label>
                <select {...register("gender")} className={styles.select}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>

                <input type="submit" className={styles.submit} />
            </form>
      <Copyright/>
    </>
  );
}
