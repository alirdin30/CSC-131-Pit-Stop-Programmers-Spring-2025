import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get('/api/auth/status', { withCredentials: true });
        setUserRole(response.data.user.role); // Set the user's role if logged in
      } catch (error) {
        setUserRole(null); // User is not logged in
      }
    };

    fetchUserStatus();
  }, []);

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};