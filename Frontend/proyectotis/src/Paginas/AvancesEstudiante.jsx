import BarraCopyright from "../Componentes/BarraCopyright";
import BarraLateral from "../Componentes/BarraLateralEstudiante";
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";

export default function InicioEstudiante() {
  return (
    <>
      <NavbarInicioDeSesion />
      <div className="flex h-full mt-16 bg-custom-bg">
        <BarraLateral />
        <div className="flex-grow p-8">
          <h1 className="text-4xl font-bold text-center mb-8" style={{ color: "#1E3664" }}>AVANCES</h1>
          
          {/* Combobox de selección de Sprint y Tarea alineados a la izquierda */}
          <div className="flex justify-start gap-8 mb-8">
            <div>
              <label htmlFor="sprint-select" className="block mb-2 text-lg font-medium"style={{ color: "#1E3664" }}>Sprint:</label>
              <select id="sprint-select" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar Sprint</option>
                <option value="sprint1">Sprint 1</option>
                <option value="sprint2">Sprint 2</option>
                <option value="sprint3">Sprint 3</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            
            <div>
              <label htmlFor="tarea-select" className="block mb-2 text-lg font-medium"style={{ color: "#1E3664" }}>Historia de usuario:</label>
              <select id="tarea-select" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar HU</option>
                <option value="tarea1">HU: 1</option>
                <option value="tarea2">HU: 2</option>
                <option value="tarea3">HU: 3</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
          </div>
          
          {/* Aquí puedes agregar más contenido o componentes que muestren los avances */}
        </div>
      </div>
      <BarraCopyright />
    </>
  );
}
