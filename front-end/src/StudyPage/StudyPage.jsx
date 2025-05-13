import { useState } from 'react';
import ConsentPage from './ConsentPage/ConsentPage';
{/* import ParticipantPage from './ParticipantPage/ParticipantPage'; */}
import DemographicsPage from './DemographicsPage/DemographicsPage';
import SubmitEmailPage from './SubmitEmailPage/SubmitEmailPage';
import styles from './StudyPage.module.css';

export default function StudyPage() {
    const [currentStep, setCurrentStep] = useState("consentform")

    const handleNextStep = (nextStep) => {
        setCurrentStep(nextStep);
    };

    return (
        <div className={styles.container}>
            {currentStep === "consentform" && (
                <ConsentPage onNext={() => handleNextStep("demographics")} />
            )}
            {/*{currentStep === "questions" && (
                <ParticipantPage onNext={() => handleNextStep("demographics")} />
            )} */ }
            {currentStep === "demographics" && (
                <DemographicsPage onNext={() => handleNextStep("submitemail")} />
            )}
            {currentStep === "submitemail" && <SubmitEmailPage />}
        </div>
    );
}