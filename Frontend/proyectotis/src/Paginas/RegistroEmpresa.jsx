import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import styles from './RegistroEmpresa.module.css'; // Importa el CSS módulo
import Copyright from '../Componentes/BarraCopyright';
import { useForm } from 'react-hook-form'; 
import { Sidebar, Menu, MenuItem,SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function RegistroEmpresa() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
        <NavbarInicioDeSesion />
        <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
      <h1 className="text-white font-bold text-2xl">Menú</h1>
      <div className="text-center">
            <img src="/src/Imagenes/User.png" alt="Logo" className="w-16 h-16 inline-block" />
    </div>
      </div>
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: styles.activeMenuItem,
          },
        }}
      >
        <MenuItem className={styles.menuItem} component={<Link to="/documentation" />}>Inicio</MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/calendar" />}>Evaluaciones</MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/e-commerce" />}>Calendario</MenuItem>

        <SubMenu title="Empresa" className={styles.menuItem}>
          <MenuItem component={<Link to="/empresa/overview" />}>Visión General</MenuItem>
          <MenuItem component={<Link to="/empresa/departments" />}>Departamentos</MenuItem>
          <MenuItem component={<Link to="/empresa/contact" />}>Contacto</MenuItem>
        </SubMenu>
      </Menu>
      
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