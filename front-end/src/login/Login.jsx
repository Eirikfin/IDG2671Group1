import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './Login.module.scss';
const apiUrl = import.meta.env.VITE_API_URL; 
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    console.log("api url is:", apiUrl);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${apiUrl}/api/login`, {
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
  <div className={styles.login__container}>
    <h1 className={styles.login__container__title}>Login</h1>
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
    {error && <p id="login__error" className={styles.error}>{error}</p>}
    <div className={styles.login__container__footer}>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  </div>
</div>
    );
}