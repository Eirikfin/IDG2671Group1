import styles from './ProfilePage.module.css';
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProfilePage() {
    const [researcher, setResearcher] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const decodedToken = jwtDecode(token);
                const researcherId = decodedToken.id;

                const res = await fetch(`${apiUrl}/api/researchers/${researcherId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const researcherData = await res.json();
                setResearcher(researcherData);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!researcher) {
        return <div className={styles.profilePage}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.profilePage}>
                <h1 className={styles.profilePage__title}>Profile</h1>
                <div className={styles.profilePage__info}>
                    <p><strong>Name:</strong> {researcher.name}</p>
                    <p><strong>Email:</strong> {researcher.email}</p>
                    <p><strong>Role:</strong> {researcher.role}</p>
                </div>
            </div>
        </div>
    );
}