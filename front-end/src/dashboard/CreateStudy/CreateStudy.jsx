import styles from './CreateStudy.module.scss';
export default function CreateStudy() {
    return(
        <div>
            <div className={styles.study}>
                <a href="#"><button className={styles.study_button}>+</button></a>
                <h2 className={styles.study_title}>Create a new study</h2>
            </div>
        </div>
    );
}