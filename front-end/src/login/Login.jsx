import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './Login.module.scss';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:4202/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message || 'Login failed');  
            }
            const { token, id } = await response.json();
            localStorage.setItem('token', token);
            // localStorage.setItem('userId', id); <----- store user id? needed?
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.login}>
            <h1>Research Application</h1>
            <div className={styles.login__container}>
                <h1 className={styles.__container__title}>Login</h1>
                <form className={styles.login__container__form} onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        className={styles.login__container__form__input}
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        className={styles.login__container__form__input}
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className={styles.login__container__form__button}
                        type="submit"
                        value="Login"
                    />
                </form>
                {error && <p className={styles.error}>{error}</p>}
                <p>Don't have an account? <Link to="/Register">Register here</Link></p>
                <p>Forgot your password? <a href="/forgot-password">Reset it here</a></p>
            </div>
        </div>
    );
}