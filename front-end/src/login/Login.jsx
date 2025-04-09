import { Link } from "react-router-dom";
import styles from './Login.module.scss';

export default function Login() {
    return(
        <div className={styles.login}>
            <h1>Research Application</h1>
            <div className={styles.login__container}>
                <h1 className={styles.__container__title}>Login</h1>
                <form className={styles.login__container__form}>
                    <label>Email:</label>
                    <input className={styles.login__container__form__input} type="text" name="email"></input>
                    <label>Password:</label>
                    <input className={styles.login__container__form__input} type="password" name="password"></input>
                    <input className={styles.login__container__form__button} type="submit"></input>
                </form>
                <p>Don't have an account? <a href="/register">Register here</a></p>
                <p>Forgot your password? <a href="/forgot-password">Reset it here</a></p>
            </div>
        </div>
    )
}