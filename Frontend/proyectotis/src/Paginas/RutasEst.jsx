import React from 'react';
import {Routes, Route } from "react-router-dom";
import { PlanificacionGE } from './AreaEstudiante/PlanificacionGE';
import HomeEst from './AreaEstudiante/HomeEst';
import {Encabezado} from '../Componentes/Encabezado';
import RegistroEmpresa from './RegistroEmpresa';
import Copyright from '../Componentes/BarraCopyright';
import BarraLateral from '../Componentes/BarraLateral';
import './AreaEstudiante/AreaEstudiante.scss'
const RutasEst = () => {
  
  return (
    <>
    <Encabezado/>    
    <div className="flex">
      <section>
        <BarraLateral/>
      </section>
      <section>
        <div className="content">
          <Routes>
            <Route path="HomeEstudiante" exact={true} Component={HomeEst } />
            <Route path="Empresa/Planificacion" exact={true} Component={PlanificacionGE} />
            <Route path="Empresa/RegistroEmpresa" exact={true} Component={RegistroEmpresa} />
          </Routes>
        </div> 
      </section>
      
    </div>
        <section className='copy'>
            <Copyright />
        </section>
    </>
   
  );
} 
export default RutasEst