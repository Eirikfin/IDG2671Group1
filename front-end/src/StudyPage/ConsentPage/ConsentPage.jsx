import { useState } from 'react';
import styles from './ConsentPage.module.css';

export default function ConsentPage({ onNext }) {
    const [consent, setConsent] = useState(false);

    const handleConsentChange = (e) => {
        setConsent(e.target.checked);
    };

    return (
        <div className={styles.container}>
            <div className={styles.consentPage}>
                <h1 className={styles.consentPage__title}>Consent Form</h1>
                <p className={styles.consentPage__descriptions}>Please read the consent form carefully.</p>
                
                <h3 className={styles.consentPage__header}>What data we collect and why</h3>
                <ul className={styles.consentPage__list}>
                    <li className={styles.consentPage__list__item}><strong>Demographic data:</strong> Age, Gender, Education level and Nationality</li>
                    <li className={styles.consentPage__list__item}><strong>Device information:</strong> Type of device you are using</li>
                    <li className={styles.consentPage__list__item}><strong>Interaction data:</strong> Your evaluations of artifacts </li>
                </ul>
                <p className={styles.consentPage__descriptions}>
                    This data is being collected to help researchers better understand how individuals from different backgrounds and using different devices perceive and evaluate various forms of media. Your responses may be used in current and future studies.
                </p>

                <p className={styles.consentPage__descriptions}>
                    All data will be stored securely and analyzed in aggregate. No personally identifiable information will be collected or associated with your responses.
                </p>

                <h3 className={styles.consentPage__header}>Consent</h3>
                <p>
                    By continuing, you confirm that:
                </p>
                <ul className={styles.consentPage__list}>
                    <li className={styles.consentPage__list__item}>You are at least 18 years old</li>
                    <li className={styles.consentPage__list__item}>You voluntarily agree to participate in this research</li>
                    <li className={styles.consentPage__list__item}>You consent to the collection and use of your demographic data and device-type for research purposes</li>
                </ul>

                <p className={styles.consentPage__descriptions}>You may withdraw from the study at any time by closing the application, in which case your responses up to that point will <strong>not</strong> be used.</p>

                <input
                    type="checkbox"
                    checked={consent}
                    onChange={handleConsentChange}
                    className={styles.consentPage__checkbox}
                />
                <label>I agree to the terms and conditions</label>
                <br />

                {/* CREATE SESSION ON SUBMIT */}
                <button 
                    onClick={onNext} 
                    disabled={!consent}
                    
                    >
                    Begin participation
                </button>
            </div>
        </div>
    )
}