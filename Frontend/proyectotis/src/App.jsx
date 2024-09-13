// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaDeInicio from './Paginas/PaginaDeInicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaDeInicio />} />
      </Routes>
    </Router>
  );
}

export default App;