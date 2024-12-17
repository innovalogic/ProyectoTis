import React, { useState, useEffect } from 'react';
import Navbar from "../Componentes/NavbarInicio";
import BarraLateral from "../Componentes/BarraLateralAdministrador";
import BarraCopyright from "../Componentes/BarraCopyright";

const Backup = () => {
    const [nombreArchivo, setNombreArchivo] = useState(""); // Estado para almacenar el nombre del archivo
    const [error, setError] = useState("");
    const [tabla, setTabla] = useState([]);
    const fetchTablaAvances = async () => {
        try {
            const response = await fetch('http://innovalogic.tis.cs.umss.edu.bo/backup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const data = await response.json();
            console.log('Respuesta del servidor:', data); // Ver la respuesta completa
    
            if (data.success) {
                setTabla(data.backup); // Usamos los datos que vienen de 'backup'
                console.log('Datos de la tabla:', data.backup); // Log para ver los datos de la tabla
            } else {
                console.error('Error al obtener los datos:', data.message);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };
    

    useEffect(() => {
        fetchTablaAvances();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        const fileInput = document.querySelector('#file-upload');
    
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const allowedExtensions = /(\.sql)$/i; // Solo aceptamos archivos .sql
    
            if (!allowedExtensions.exec(file.name)) {
                alert('Por favor selecciona un archivo válido (SQL)');
                return;
            }
    
            formData.append("archivo", file); // Solo enviamos el archivo
            formData.append("nombreArchivo", file.name); // Enviamos también el nombre del archivo
        } else {
            alert('Por favor selecciona un archivo.');
            return;
        }
    
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`); // Log para verificar el contenido
        }
    
        try {
            const response = await fetch('http://innovalogic.tis.cs.umss.edu.bo/GuardarBackup.php', {
                method: 'POST',
                body: formData
            });
    
            const data = await response.json();
            if (data.error) {
                console.error('Error desde el servidor:', data.error);
                alert('Ocurrió un error al subir el archivo: ' + data.error);
            } else {
                console.log('Archivo subido correctamente:', data.mensaje);
                // Llamamos a la función para actualizar los datos de la tabla
                fetchTablaAvances(); 
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
        }
    };
    
    

    return (
        <>
            <Navbar />
            <div className="bg-custom-bg flex" style={{ height: "calc(-110px + 100vh)", marginTop: "70px" }}>
                <BarraLateral />
                <div className="mt-8 flex-1" style={{  overflowY: 'auto'  }}>
                    <div className="w-3/4 mx-auto">
                        <h2 className="font-semibold text-3xl" style={{ color: "#1E3664" }}>
                            BACKUPS
                        </h2>
                    </div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        {/* Input para subir archivos */}
                        <div className="mb-4">
                            <label htmlFor="file-upload" className="block mb-2 text-lg font-medium" style={{ color: "#1E3664" }}>
                                Subir archivo (PDF o DOC):
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                accept=".sql"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        setNombreArchivo(file.name); // Actualiza el nombre del archivo al seleccionarlo
                                    }
                                }}
                            />
                        </div>
                        {nombreArchivo && (
                            <div className="text-gray-700">
                                <strong>Archivo seleccionado: </strong>{nombreArchivo}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-[#1E3664] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200"
                        >
                            SUBIR
                        </button>
                    </form>
                    <div
            className="mx-auto w-3/4 h-72 p-4 border border-gray-300 overflow-y-auto shadow-sm mt-4"
            style={{ height: "450px", backgroundColor: "#1E3664", borderRadius: "15px", boxSizing: "border-box" }}
          >
            <table className="w-full table-auto border-collapse">
    <thead className="bg-gray-700 text-white">
        <tr>
            <th className="p-2 border">idBackup</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Fecha de creacion</th>
            <th className="p-2 border">Descarga</th>
        </tr>
    </thead>
    <tbody>
        {tabla.length > 0 ? (
            tabla.map((backup, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                    <td className="p-2 border">{backup.idBackup}</td>
                    <td className="p-2 border">{backup.nombreArchivo}</td>
                    <td className="p-2 border">{backup.fechaCreacion}</td>
                    <td className="p-2 border"><a 
        href={`data:application/sql;charset=utf-8,${encodeURIComponent(backup.archivo)}`} 
        download={backup.nombreArchivo || 'archivo.sql'} 
        target="_blank" 
        rel="noopener noreferrer"
    >
        {backup.nombreArchivo}
    </a>
</td>
                    
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="4" className="text-center p-4">No hay datos disponibles</td>
            </tr>
        )}
    </tbody>
</table>

            </div>

                </div>
            </div>
            <BarraCopyright />
        </>
    );
};

export default Backup;
