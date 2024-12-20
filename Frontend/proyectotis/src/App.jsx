// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaDeInicio from './Paginas/PaginaDeInicio';
import InicioSesionEstudiante from './Paginas/InicioSesionEstudiante';
import RegistroEstudiante from './Paginas/RegistroEstudiante';
import RegistroEmpresa from './Paginas/RegistroEmpresa';
import InicioEstudiante from './Paginas/InicioEstudiante';
import PlanificacionEstudiante  from './Paginas/PlanificacionEstudiante';
import { UserProvider } from './Componentes/UserContext'; 
import RecuperarEvaluacion from './Paginas/RecuperarEvaluacion';
import RecuperarEvaluacionScrum from './Paginas/RecuperarEvaluacionScrum';
import RecuperarEvaluacionMiembro from './Paginas/RecuperarEvaluacionMiembro';
import AvancesEstudiante from './Paginas/AvancesEstudiante';
import SeguimientoSprints from './Paginas/SeguimientoSprints';
import SeguimientoActividades from './Paginas/SeguimientoActividades'
import RegistroEvSemanales from './Paginas/RegistroEvSemanales';
import InicioDocente from './Paginas/InicioDocente';
import PerfilEstudiante from './Paginas/PerfilEstudiante';
import PerfilDocente from './Paginas/PerfilDocente';
import InicioSesionAdministrador from './Paginas/InicioSesionAdministrador';
import InicioAdministrador from './Paginas/InicioAdministrador';
import BusquedaEstudiantes from './Paginas/BusquedaEstudiantes';
import BusquedaDocentes from './Paginas/BusquedaDocentes';
import RegistroDocente from './Paginas/RegistroDocente';
import RegistroEvFinal from './Paginas/RegistroEvFinal';
import Autoevaluación from './Paginas/Autoevaluación';
import RegistroEvFinalGrupo from './Paginas/RegistroEvFinalGrupo';
import AdministradorEstudiante from './Paginas/AdministradorEstudiante';
import AdministradorDocente from './Paginas/AdministradorDocente';
import AñadirCriterios from './Paginas/AñadirCriterios';
import EvaluacionPares from './Paginas/EvaluacionPares';
import EvaluacionCruzada from './Paginas/EvaluacionCruzada';
import VistaPerfilDo from './Paginas/VistaPerfilDo';
import VistaPerfilEs from './Paginas/VistaPerfilEs';
import BusquedaEstudiantesDoc from './Paginas/BusquedaEstudiantesDoc';
import Bitacoras from './Paginas/Bitacoras';
import Backup from './Paginas/Backup';
import MostrarNotaFinal from './Paginas/MostrarNotaFinal';

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
        <Route path="PlanificacionEstudiante" element={<PlanificacionEstudiante/>}/>
        <Route path="RecuperarEvaluacion" element={<RecuperarEvaluacion/>}/>
        <Route path="RecuperarEvaluacionScrum" element={<RecuperarEvaluacionScrum/>}/>
        <Route path="RecuperarEvaluacionMiembro" element={<RecuperarEvaluacionMiembro/>}/>
        <Route path="AvancesEstudiante" element={<AvancesEstudiante/>}/>
        <Route path="SeguimientoSprints" element={<SeguimientoSprints/>}/>
        <Route path="SeguimientoActividades/:idSprint/:nomSprint/:fechaInicio/:fechaFin/:idJefe" element={<SeguimientoActividades/>}/>
        <Route path="RegistroEvSemanales" element={<RegistroEvSemanales/>}/>
        <Route path="InicioDocente" element={<InicioDocente/>}/>
        <Route path="PerfilEstudiante" element={<PerfilEstudiante/>}/>
        <Route path="PerfilDocente" element={<PerfilDocente/>}/>
        <Route path="InicioSesionAdministrador" element={<InicioSesionAdministrador/>}/>
        <Route path="InicioAdministrador" element={<InicioAdministrador/>}/>
        <Route path="BusquedaEstudiantes" element={<BusquedaEstudiantes/>}/>
        <Route path="BusquedaDocentes" element={<BusquedaDocentes/>}/>
        <Route path="RegistroDocente" element={<RegistroDocente/>}/>
        <Route path="Autoevaluacion" element={<Autoevaluación/>}/>
        <Route path="RegistroEvFinal" element={<RegistroEvFinal/>}/>
        <Route path="RegistroEvFinalGrupo" element={<RegistroEvFinalGrupo/>}/>
        <Route path="AdministradorEstudiante" element={<AdministradorEstudiante/>}/>
        <Route path="AdministradorDocente" element={<AdministradorDocente/>}/>
        <Route path="EvaluacionPares" element={<EvaluacionPares/>}/>
        <Route path="EvaluacionCruzada" element={<EvaluacionCruzada/>}/>
        <Route path="AñadirCriterios" element={<AñadirCriterios/>}/>
        <Route path="VistaPerfilDo" element={<VistaPerfilDo/>}/>
        <Route path="VistaPerfilEs" element={<VistaPerfilEs/>}/>
        <Route path="BusquedaEstudiantesDoc" element={<BusquedaEstudiantesDoc/>}/>
        <Route path="Bitacoras" element={<Bitacoras/>}/>
        <Route path="Backup" element={<Backup/>}/>
        <Route path="MostrarNotaFinal" element={<MostrarNotaFinal/>}/>
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;