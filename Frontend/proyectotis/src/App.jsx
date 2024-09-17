// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaDeInicio from './Paginas/PaginaDeInicio';
import InicioSesion from './Paginas/InicioSesion';
import RegistroEstudiante from './Paginas/RegistroEstudiante';
import RegistroEmpresa from './Paginas/RegistroEmpresa';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaDeInicio />} />
        <Route path="InicioSesion" element={<InicioSesion/>}/>
        <Route path="RegistroEstudiante" element={<RegistroEstudiante/>}/>
        <Route path="RegistroEmpresa" element={<RegistroEmpresa/>}/>
      </Routes>
    </Router>
  );
}

export default App;