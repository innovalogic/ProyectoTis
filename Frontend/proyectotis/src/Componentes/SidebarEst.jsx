import { NavLink } from "react-router-dom" 
import React from 'react';
import estudiante from "../Imagenes/estudiante.png"
import '../App.scss'
import { useState } from "react";
import {AiOutlineLeft, AiOutlineHome, AiTwotoneCalendar} from "react-icons/ai";
import { PiListChecksBold } from "react-icons/pi";
import { IoBusiness } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
const SidebarEst = () =>{
    const [sidebarOpen,setSidebarOpen]=useState(false);
    const ModSidebarE=()=>{
    setSidebarOpen(!sidebarOpen);
    }
    return(
        <main className={sidebarOpen ? "sidebarStateActive" : "sidebarState"}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}>
            <div className="SidebarEst">
                <button className="Sidebarboton" onClick={ModSidebarE}>
                    <AiOutlineLeft/>
                </button>
                <div className="LogoContent" >
                    <div className="IconoEst">
                        <img src={estudiante}/>
                    </div>
                </div>{linksArray.map(({ icon, label, to }) => (
                    <div className="LinkContainer" key={label} >
                        <NavLink
                            to={to}
                            exact className="link"
                            activeClassName="active"
                        >
                            <div className="Linkicon">{icon}</div>
                            <span>{label}</span>
                        </NavLink>
                    </div>
                ))}
            </div>
        </main>   
    )
}
const linksArray = [
    {
      label: "Inicio",
      icon: <AiOutlineHome />,
      to: "/HomeEstudiante",
    },
    {
      label: "Evaluaciones",
      icon: <PiListChecksBold />,
      to: "/EvaluacionesEst",
    },
    {
      label: "Calendario",
      icon: <AiTwotoneCalendar />,
      to: "/CalendarioEst",
    },
    {
      label: "Empresa",
      icon: <IoBusiness />,
      to: "/Empresa/Planificacion",
    },
    {
      label: "Cerrar sesión",
      icon: <BiLogOut />,
      to: "/",
    },
  ];
export { SidebarEst }