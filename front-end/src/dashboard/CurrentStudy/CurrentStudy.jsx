import styles from "./CurrentStudy.module.scss";
import { Link } from "react-router-dom";

export default function CurrentStudy() {

    return (
        <div className={styles.study}>
            <h2 className={styles.study_title}>Current study/studies</h2>
            {[1, 2, 3, 4].map((num) => (
                <div key={num} className={styles.study_card}>
                    <h3>Study {num}: Compare rocks</h3>
                    <p>Number of participants: {Math.floor(Math.random() * 100)} (replace with dummy data later)</p>
                    <div className={styles.study_card_buttons}>
                        <button>Copy link</button>
                        <button><Link to="/results" className={styles.react_Link}>View results</Link></button>
                        <button>Edit study</button>
                    </div>
                </div>
            ))}
        </div>
    );
}