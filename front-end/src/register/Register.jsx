import styles from './Register.module.scss';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch(`${VITE_BASE_API_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message || 'Login failed'); 
            }

            if (confirmedPassword !== password) {
                throw new Error(message || `Password doesn't match`)
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return(
        <div className={styles.register}>

            <h1>Research Application</h1>

            <div className={styles.register__container}>

                <h1 className={styles.register__container__title}>Register</h1>
                <form className={styles.register__container__form} action="/register" method="POST">

                    <label>Email:</label>
                    <input 
                    className={styles.register__container__form__input} 
                    type="text" 
                    name="email"
                    value={email}
                    ></input>

                    <label>Password:</label>
                    <input 
                    className={styles.register__container__form__input} 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>

                    <label>Confirm Password:</label>
                    <input 
                    className={styles.register__container__form__input} 
                    type="password" 
                    name="confirm-password"
                    value={confirmedPassword}
                    ></input>

                    <input 
                    className={styles.register__container__form__button} 
                    type="submit"></input>

                </form>

                <p>Already have an account? <Link to="/Login">Login here</Link></p>

            </div>
        </div>
    )
}