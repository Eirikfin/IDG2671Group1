import styles from './CreateStudy.module.scss';
export default function CreateStudy() {
    return(
        <div>
            <div className={styles.newStudy}>
                <a href="#"><button className={styles.newStudy_button}>+</button></a>
                <h2 className={styles.newStudy_title}>Create a new study</h2>
            </div>
        </div>
    );
}