// src/contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      updateUser();
    }
  }, []);

  const updateUser = async () => {
    try {
      const response = await fetch('http://localhost:8081/pelanggan/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data)); // Simpan data pengguna yang login ke localStorage
      setUser(data); // Update state user
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return <UserContext.Provider value={{ user, setUser, updateUser }}>{children}</UserContext.Provider>;
};
