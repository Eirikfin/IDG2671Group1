import { useState } from 'react';

export default function ConsentPage({ onNext }) {
    const [consent, setConsent] = useState(false);

    const handleConsentChange = (e) => {
        setConsent(e.target.checked);
    };

    return (
        <div>
            <h1>Consent Form</h1>
            <p>Please read the consent form carefully.</p>
            
            <h3>What data we collect and why</h3>
            <ul>
                <li><bold>Demographic data:</bold> Age, Gender, Education level and Nationality</li>
                <li><bold>Device information:</bold> Type of device you are using</li>
                <li><bold>Interaction data:</bold> Your evaluations of artifacts </li>
            </ul>
            <p>
                This data is being collected to help researchers better understand how individuals from different backgrounds and using different devices perceive and evaluate various forms of media. Your responses may be used in current and future studies aimed at advancing knowledge in fields such as psychology, media studies, and human-computer interaction.
            </p>

            <p>
                All data will be stored securely and analyzed in aggregate. No personally identifiable information will be collected or associated with your responses.
            </p>

            <h3>Consent</h3>
            <p>
                By continuing, you confirm that:
            </p>
            <ul>
                <li>You are at least 18 years old</li>
                <li>You voluntarily agree to participate in this research</li>
                <li>You consent to the collection and use of your demographic data and device-type for research purposes</li>
            </ul>

            <p>You may wirthdraw from the study at any time by closing the application, in which case your responses up to that point will <strong>not</strong> be used.</p>

            <input
                type="checkbox"
                checked={consent}
                onChange={handleConsentChange}
            />
            <label>I agree to the terms and conditions</label>
            <br />
            <button onClick={onNext} disabled={!consent}>
                Next
            </button>
        </div>
    )
}