import styles from './CurrentStudy.module.scss';

export default function CurrentStudy(){
    return(
        <div className={styles.currentStudy}>
            <h2 className={styles.currentStudy_title}>Current study/studies</h2>
            <div className={styles.currentStudy_card}>
                <p>Study 1: Compare rocks</p>
                <p>Number of participants: 42</p>
                <div className={styles.currentStudy_card_buttons}>
                    <button>Copy link</button>
                    <button>View results</button>
                    <button>Edit study</button>
                </div>
            </div>
            <div className={styles.currentStudy_card}>
                <p>Study 2: Compare rocks</p>
                <p>Number of participants: 8</p>
                <div className={styles.currentStudy_card_buttons}>
                    <button>Copy link</button>
                    <button>View results</button>
                    <button>Edit study</button>
                </div>
            </div>
            <div className={styles.currentStudy_card}>
                <p>Study 3: Compare rocks</p>
                <p>Number of participants: 32</p>
                <div className={styles.currentStudy_card_buttons}>
                    <button>Copy link</button>
                    <button>View results</button>
                    <button>Edit study</button>
                </div>
            </div>
            <div className={styles.currentStudy_card}>
                <p>Study 4: Compare rocks</p>
                <p>Number of participants: 87</p>
                <div className={styles.currentStudy_card_buttons}>
                    <button>Copy link</button>
                    <button>View results</button>
                    <button>Edit study</button>
                </div>
            </div>
        </div>
    );
}