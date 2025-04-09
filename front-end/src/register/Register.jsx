import styles from './Register.module.scss';

export default function Register() {
    return(
        <div className={styles.register}>
            <h1>Research Application</h1>
            <div className={styles.register__container}>
                <h1 className={styles.register__container__title}>Register</h1>
                <form className={styles.register__container__form} action="/register" method="POST">
                    <label>Email:</label>
                    <input className={styles.register__container__form__input} type="text" name="email"></input>
                    <label>Password:</label>
                    <input className={styles.register__container__form__input} type="password" name="password"></input>
                    <label>Confirm Password:</label>
                    <input className={styles.register__container__form__input} type="password" name="confirm-password"></input>
                    <input className={styles.register__container__form__button} type="submit"></input>
                </form>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
    )
}