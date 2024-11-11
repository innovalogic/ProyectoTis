// CardEmpresa.jsx
import { useNavigate } from 'react-router-dom';

export default function CardEmpresa({ nombreEmpresa, logoUrl ,idGrupoEmpresa,nombreCortoEmpresa }) {
    const navigate = useNavigate();
    const getInitials = (name) => {
        return name.split(" ").map(word => word[0]).join("").toUpperCase();
    };

    const handleRegistrarClick = () => {
        navigate('/RegistroEvFinalGrupo', { state: { idGrupoEmpresa,logoUrl,nombreEmpresa,nombreCortoEmpresa } }); // Cambia esta ruta según sea necesario
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center space-y-4 w-70">
            {logoUrl ? (
                <img src={logoUrl} alt="Logo Empresa" className="w-full h-24 object-contain" />
            ) : (
                <div className="w-full h-24 flex items-center justify-center bg-gradient-to-r from-[#6B8E23] to-[#4682B4] text-white text-2xl font-bold rounded-lg">
                    {getInitials(nombreEmpresa)}
                </div>
            )}
            <h2 className="text-xl font-semibold text-[#32569A]">Empresa: {nombreEmpresa}</h2>
            <button
                onClick={handleRegistrarClick}
                className="bg-[#32569A] text-white px-4 py-2 rounded-md hover:bg-[#29487D] transition duration-300"
            >
                Registrar Evaluación Final
            </button>
        </div>
    );
}
