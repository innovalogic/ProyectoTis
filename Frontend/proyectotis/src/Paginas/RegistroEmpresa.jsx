import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import styles from './RegistroEmpresa.module.css'; // Importa el CSS módulo
import Copyright from '../Componentes/BarraCopyright';
import { useForm } from 'react-hook-form'; 

export default function RegistroEmpresa() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <NavbarInicioDeSesion />
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