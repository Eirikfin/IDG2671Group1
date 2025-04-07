import styles from "./Answers.module.scss";

export default function Answers() {
    return(
        <div className={styles.container}>
            <div className={styles.container_card}>
                <p>*GET 5 random answers from each question and display here*</p>
            </div>
        </div>
    );
}