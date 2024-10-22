// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  // Estado inicial: intentar recuperar el usuario del Local Storage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; // Devolver el usuario guardado o null
  });

  // Efecto para almacenar el usuario en Local Storage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Almacenar el usuario
    } else {
      localStorage.removeItem('user'); // Eliminar el usuario si es null
    }
  }, [user]); // Solo se ejecuta cuando el usuario cambia

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};