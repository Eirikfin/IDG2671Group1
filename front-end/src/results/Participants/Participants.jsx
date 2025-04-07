import styles from "./Participants.module.scss";

export default function Participants() {
    return(
        <div className={styles.container}>
            <div className={styles.container_card}>
                <h2>Participation data</h2>
                <div>
                    <p>Total number of participants: *insert from db here*</p>
                </div>
                <div>
                    <h3>Familiarity with *insert topic*</h3>
                    <p>X% of participants reported being familiar with *insert topic*.</p>
                </div>
            </div>
        </div>
    )
}