import React from 'react';
import NavbarInicioDeSesion from "../Componentes/NavbarInicio";
import Copyright from '../Componentes/BarraCopyright';

export default function PaginaDeInicio() {
    return (
        <div className="bg-custom-bg overflow-hidden min-h-screen flex flex-col justify-between">
            <div>
                <NavbarInicioDeSesion />
                {/* Contenedor relativo para la imagen y el rectángulo */}
                <div className="relative">
                    {/* Imagen debajo del Navbar */}
                    <img 
                        src="/src/Imagenes/M1.jpg" 
                        alt="Paisaje" 
                        className="w-full h-[355px] mx-auto"
                    />
                    {/* Rectángulo transparente con color sobre la imagen */}
                    <div className="absolute inset-0 flex items-start justify-start">
                        <div className="mt-40 ml-0 bg-custom-bg bg-opacity-70 p-4 rounded-lg w-1/2">
                            <div className="font-sans italic">
                                <span className="text-5xl font-plex font-bold" style={{ color: '#1E3664' }}>
                                    EVALUACIÓN
                                </span>
                                <span className="text-5xl font-plex" style={{ color: '#1E3664' }}>
                                    &nbsp;basada en&nbsp;
                                </span>
                                <br />
                                <span className="text-5xl font-plex font-bold" style={{ color: '#1E3664' }}>
                                    PROYECTOS
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sección para "Beneficios" */}
                <div className="text-center mt-10">
                    <span className="text-4xl font-bold italic underline" style={{ color: '#1E3664' }}>
                        Beneficios
                    </span>
                </div>
                {/* Sección para los cuadros con imágenes */}
                <div className="flex justify-center space-x-16 mt-10">
                    <div className="w-48 h-48 bg-[#32569A] rounded-2xl flex flex-col justify-center items-center overflow-hidden">
                        <img 
                            src="/src/Imagenes/I1.png" 
                            alt="Planificacion" 
                            className="w-3/4 h-3/4 object-contain"
                        />
                        <span className="mt-2 text-custom-bg text-lg font-bold">PLANIFICACIÓN</span>
                    </div>
                    <div className="w-48 h-48 bg-[#32569A] rounded-2xl flex flex-col justify-center items-center overflow-hidden">
                        <img 
                            src="/src/Imagenes/I2.png" 
                            alt="Verificacion" 
                            className="w-3/4 h-3/4 object-contain"
                        />
                        <span className="mt-2 text-custom-bg text-lg font-bold">VERIFICACIÓN</span>
                    </div>
                    <div className="w-48 h-48 bg-[#32569A] rounded-2xl flex flex-col justify-center items-center overflow-hidden">
                        <img 
                            src="/src/Imagenes/I3.png" 
                            alt="Seguimiento" 
                            className="w-3/4 h-3/4 object-contain"
                        />
                        <span className="mt-2 text-custom-bg text-lg font-bold">SEGUIMIENTO</span>
                    </div>
                    <div className="w-48 h-48 bg-[#32569A] rounded-2xl flex flex-col justify-center items-center overflow-hidden">
                        <img 
                            src="/src/Imagenes/I4.png" 
                            alt="Evaluacion" 
                            className="w-3/4 h-3/4 object-contain"
                        />
                        <span className="mt-2 text-custom-bg text-lg font-bold">EVALUACIÓN</span>
                    </div>
                    <div className="w-48 h-48 bg-[#32569A] rounded-2xl flex flex-col justify-center items-center overflow-hidden">
                        <img 
                            src="/src/Imagenes/I5.png" 
                            alt="Comunicacion" 
                            className="w-3/4 h-3/4 object-contain"
                        />
                        <span className="mt-2 text-custom-bg text-lg font-bold">COMUNICACIÓN</span>
                    </div>
                </div>
            </div>
            <Copyright/>
        </div>
    );
}