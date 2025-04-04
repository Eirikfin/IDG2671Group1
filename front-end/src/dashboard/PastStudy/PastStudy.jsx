import styles from './PastStudy.module.scss'

export default function PastStudy() {

    return (
        <div className={styles.study}>
            <h2 className={styles.study_title}>Past study/studies</h2>
            {[1, 2].map((num) => (
                <div key={num} className={styles.study_card}>
                    <h3>Study {num}: Compare socks</h3>
                    <p>Number of participants: {Math.floor(Math.random() * 100)} (replace with dummy data later)</p>
                    <div className={styles.study_card_buttons}>
                        <button>View results</button>
                    </div>
                </div>
            ))}
        </div>
    );
}