import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await logout(token);
        localStorage.removeItem('token');
      }
      navigate('/login');
    };

    performLogout();
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
}