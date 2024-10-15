// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaDeInicio from './Paginas/PaginaDeInicio';
import InicioSesionEstudiante from './Paginas/InicioSesionEstudiante';
import RegistroEstudiante from './Paginas/RegistroEstudiante';
import RegistroEmpresa from './Paginas/RegistroEmpresa';
import InicioEstudiante from './Paginas/InicioEstudiante';
import InicioSesionDocente from './Paginas/InicioSesionDocente';
import PlanificacionEstudiante  from './Paginas/PlanificacionEstudiante';
import { UserProvider } from './Componentes/UserContext'; 
import RecuperarEvaluacion from './Paginas/RecuperarEvaluacion';
import RecuperarEvaluacionScrum from './Paginas/RecuperarEvaluacionScrum';
import RecuperarEvaluacionMiembro from './Paginas/RecuperarEvaluacionMiembro';
import AvancesEstudiante from './Paginas/AvancesEstudiante';
import RegistroEvSemanales from './Paginas/RegistroEvSemanales';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<PaginaDeInicio />} />
        <Route path="InicioSesionEstudiante" element={<InicioSesionEstudiante/>}/>
        <Route path="RegistroEstudiante" element={<RegistroEstudiante/>}/>
        <Route path="RegistroEmpresa" element={<RegistroEmpresa/>}/>
        <Route path="InicioEstudiante" element={<InicioEstudiante/>}/>
        <Route path="InicioSesionDocente" element={<InicioSesionDocente/>}/>
        <Route path="PlanificacionEstudiante" element={<PlanificacionEstudiante/>}/>
        <Route path="RecuperarEvaluacion" element={<RecuperarEvaluacion/>}/>
        <Route path="RecuperarEvaluacionScrum" element={<RecuperarEvaluacionScrum/>}/>
        <Route path="RecuperarEvaluacionMiembro" element={<RecuperarEvaluacionMiembro/>}/>
        <Route path="AvancesEstudiante" element={<AvancesEstudiante/>}/>
        <Route path="RegistroEvSemanales" element={<RegistroEvSemanales/>}/>
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;