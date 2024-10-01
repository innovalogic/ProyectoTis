// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaDeInicio from './Paginas/PaginaDeInicio';
import InicioSesionEstudiante from './Paginas/InicioSesionEstudiante';
import RegistroEstudiante from './Paginas/RegistroEstudiante';
import RegistroEmpresa from './Paginas/RegistroEmpresa';
import InicioEstudiante from './Paginas/InicioEstudiante';
import InicioSesionDocente from './Paginas/InicioSesionDocente';
import { PlanificacionGE } from './Paginas/PlanificacionGe';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaDeInicio />} />
        <Route path="InicioSesionEstudiante" element={<InicioSesionEstudiante/>}/>
        <Route path="RegistroEstudiante" element={<RegistroEstudiante/>}/>
        <Route path="RegistroEmpresa" element={<RegistroEmpresa/>}/>
        <Route path="InicioEstudiante" element={<InicioEstudiante/>}/>
        <Route path="InicioSesionDocente" element={<InicioSesionDocente/>}/>
        <Route path="Pl" element={<InicioSesionDocente/>}/>
        <Route path="Empresa/Planificacion" exact={true} Component={PlanificacionGE} />
      </Routes>
    </Router>
  );
}

export default App;