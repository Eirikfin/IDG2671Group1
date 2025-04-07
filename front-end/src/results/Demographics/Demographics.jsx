import styles from './Demographics.module.scss';

export default function Demographics() {
    return(
        <div className={styles.container}>
            <div className={styles.container_card}>
                <h2>Demographic data</h2>
                <div>
                    <h3>Age</h3>
                    <p>Participants' ages in this study range between X and Y.</p>
                    <p>The average age of participants is X</p>
                </div>
                <div>
                    <h3>Nationality</h3>
                    <p>The majority of participants were from the country of *insert country from db*.</p>
                </div>
                </div>
        </div>
    )
}