import { useState } from "react";
import "./InicioSesion.css"
export default function InicioSesion() {
    const [Correo, setCorreo] = useState("")
    const [Contraseña, setContraseña] = useState("")
    return(
        <div>
        <div>
            <h1  className="text-center mb-4" >aqui esta el navbar</h1>
      </div>
       <section>
        <h1 className="text-center mb-4">Inicio de Sesion</h1>
        <form className="Forms">
          <label>CorreoElectronico Institucional</label>

            <input type="text"  style={{ 
              border: '2px solid #000000', 
              borderRadius: '5px',   
            }}
            value={Correo}
            onChange={e => setCorreo(e.target.value)} />
            <label >Contraseña</label>
            <input type="password" style={{ 
              border: '2px solid #000000', 
              borderRadius: '5px',   
            }} 
            value={Contraseña}
            onChange={e => setContraseña(e.target.value)} />
            <button>Iniciar Sesion</button>
        </form>

       </section>
       </div>

    );
}