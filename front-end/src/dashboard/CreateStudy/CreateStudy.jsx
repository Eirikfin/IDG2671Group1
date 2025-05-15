import styles from './CreateStudy.module.scss';
import { Link } from 'react-router-dom';

export default function Dashboard_newStudy() {
    return(
        <div>
            <div className={styles.study}>
                <Link to="/create_study"><button className={styles.study_button} id="nav__button--newstudy">+</button></Link>
                <h2 className={styles.study_title}>Create a new study</h2>
            </div>
        </div>
    );
}