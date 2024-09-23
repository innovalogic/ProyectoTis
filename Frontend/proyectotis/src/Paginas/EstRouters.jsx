import React from 'react';
import {Routes, Route } from "react-router-dom";
import {HomeEstudiante} from "./HomeEstudiante"
import {EvaluacionesEst} from "./EvaluacionesEst"
import {CalendarioEst} from "./CalendarioEst"
import {PlanificacionGE} from "./PlanificacionGE"
import { SidebarEst } from "../Componentes/SidebarEst"
import {Encabezado}from "../Componentes/Encabezado"
import '../App.scss'
const EstRouters = () => {
  
  return (
    <>
    <Encabezado/>    
    <div className="flex">
      <section>
        <SidebarEst/>
      </section>
      <section>
        <div className="content">
          <Routes>
            <Route path="HomeEstudiante" exact={true} Component={HomeEstudiante } />
            <Route path="EvaluacionesEst" exact={true} Component={EvaluacionesEst} />
            <Route path="CalendarioEst" exact={true} Component={CalendarioEst} />
            <Route path="Empresa/Planificacion" exact={true} Component={PlanificacionGE} />
          </Routes>
        </div> 
      </section>
    </div>
    </>
   
  );
} 
export default EstRouters