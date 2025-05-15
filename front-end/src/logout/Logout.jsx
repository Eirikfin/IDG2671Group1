import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user data from local storage
        sessionStorage.clear();

        // Clear Token from local storage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/login');
    }, [navigate]);
}