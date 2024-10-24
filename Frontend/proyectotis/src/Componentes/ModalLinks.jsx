import React from 'react';

const ModalLinks = ({ isOpen, onClose, estudiante }) => {
    if (!isOpen) return null;

    const handleDownload = (archivo, nombreArchivo) => {
        if (!archivo) {
            console.error('No hay archivo para descargar');
            return;
        }
        // Crear un enlace de descarga con el tipo MIME correcto
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${archivo}`; // Cambiar a 'application/pdf' para PDFs
        link.download = nombreArchivo; // Usa el nombre del archivo proporcionado
        link.click();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Links y Archivos del Estudiante</h2>
                {estudiante.enlace ? (
                    <div>
                        <p>Enlace: <a href={estudiante.enlace} target="_blank" rel="noopener noreferrer">{estudiante.enlace}</a></p>
                    </div>
                ) : (
                    <p>El Estudiante no subió nada.</p>
                )}
                {estudiante.archivos ? ( // Verifica si hay archivos
                    <div>
                        <h3>Archivo:</h3>
                        <button
                            onClick={() => handleDownload(estudiante.archivos, `Archivo_Avance_${estudiante.responsable}.pdf`)} // Cambia 'archivo.pdf' si es necesario
                            className="text-blue-500 underline"
                        >
                            Descargar Archivo 
                        </button>
                    </div>
                ) : (
                    <p>No hay archivos disponibles.</p>
                )}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white rounded px-4 py-2">Cerrar</button>
            </div>
        </div>
    );
};

export default ModalLinks;
