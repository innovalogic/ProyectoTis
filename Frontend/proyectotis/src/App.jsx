// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaDeInicio from './Paginas/PaginaDeInicio';
import InicioSesion from './Paginas/InicioSesion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaDeInicio />} />
        <Route path="InicioSesion" element={<InicioSesion/>}/>
      </Routes>
    </Router>
  );
}

export default App;