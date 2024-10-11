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
              <label htmlFor="sprint-select" className="block mb-2 text-lg font-medium" style={{ color: "#1E3664" }}>Sprint:</label>
              <select id="sprint-select" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar Sprint</option>
                <option value="sprint1">Sprint 1</option>
                <option value="sprint2">Sprint 2</option>
                <option value="sprint3">Sprint 3</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="tarea-select" className="block mb-2 text-lg font-medium" style={{ color: "#1E3664" }}>Historia de usuario:</label>
              <select id="tarea-select" className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar HU</option>
                <option value="tarea1">HU: 1</option>
                <option value="tarea2">HU: 2</option>
                <option value="tarea3">HU: 3</option>
              </select>
            </div>
          </div>

          {/* Muro de noticias de avances */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#1E3664" }}>Noticias de Avances:</h2>
            <div className="w-full h-72 p-4 border border-gray-300 overflow-y-auto shadow-sm" style={{ height: '350px', backgroundColor: "#1E3664", borderRadius: '45px' }}>
              {/* Aquí puedes agregar el contenido de las noticias */}
            </div>

            {/* Botón para subir avance */}
            <div className="mt-4 flex justify-end" style={{ marginRight: '15px' }}> {/* Aumentar el margen derecho */}
              <button 
                className="text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 font-bold" 
                style={{ backgroundColor: "#1E3664" }} // Color del botón
              >
                SUBIR AVANCE
              </button>
            </div>
          </div>
        </div>
      </div>
      <BarraCopyright />
    </>
  );
}
