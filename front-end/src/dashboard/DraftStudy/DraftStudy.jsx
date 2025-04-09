import styles from './DraftStudy.module.css';
import { Link } from 'react-router-dom';

export default function DraftStudy() {
    return(
        <div className={styles.study}>
            <h2 className={styles.study_title}>Drafted study/studies</h2>
            {[1, 2].map((num) => (
                <div key={num} className={styles.study_card}>
                    <h3>Study {num}: Compare Pants</h3>
                    <p>Number of participants: {Math.floor(Math.random() * 100)} (replace with dummy data later)</p>
                    <div className={styles.study_card_buttons}>
                        <button><Link to="/create_study/questions" className={styles.react_Link}>Edit study</Link></button>
                    </div>
                </div>
            ))}
        </div>
    )
}