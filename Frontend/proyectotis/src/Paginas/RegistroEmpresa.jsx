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
    className="bg-[#32569A] text-white shadow-lg transition-all duration-300 ease-in-out"
    style={{ width: collapsed ? '80px' : '250px' }} // Ajustar ancho dependiendo de si está colapsado
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
      <div className="text-center">
        <img src="/src/Imagenes/Estudiante.png" alt="Logo" className="w-16 h-16 inline-block" />
      </div>
    </div>
    <h1 className={`${collapsed ? 'hidden' : 'block'} text-white font-bold text-2xl`}>Estudiante</h1>

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
  <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} ml-4 p-4 flex-1`}>
    <label htmlFor="nombre" className={`${styles.label} ${styles.required}`}>Nombre de Empresa</label>
    <input {...register("NombreEmpresa")} className={styles.input} />

    <label htmlFor="nombreCorto" className={`${styles.label} ${styles.required}`}>Nombre Corto de la Empresa</label>
    <input {...register("NombreCorto")} className={styles.input} />

    <label htmlFor="correo" className={`${styles.label} ${styles.required}`}>Correo electrónico de la empresa</label>
    <input {...register("CorreoEmpresa")} className={styles.input} />

    <label htmlFor="representante" className={`${styles.label} ${styles.required}`}>Nombre Representante Legal</label>
    <input {...register("NombreRepresentante")} className={styles.input} />

    <label htmlFor="numeroRepresentante" className={`${styles.label} ${styles.required}`}>Número Representante Legal</label>
    <input {...register("NumeroRepresentante")} className={styles.input} />

    <label htmlFor="foto" className={`${styles.label} ${styles.required}`}>Logo de la Empresa</label>
    <input type="file" id="foto" name="foto" accept="image/*"{...register("foto")} className={styles.input} />

    <label htmlFor="estudiante">Estudiante</label>
    <select {...register("gender")} className={styles.select}>
      <option value="female">female</option>
      <option value="male">male</option>
      <option value="other">other</option>
    </select>

    <input type="submit" className={styles.submit} />
  </form>
</div>
      <Copyright/>
    </>
  );
}
