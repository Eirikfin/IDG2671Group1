import { useState } from 'react';
import ConsentPage from './ConsentPage/ConsentPage';
import ParticipantPage from './ParticipantPage/ParticipantPage';
import DemographicsPage from './DemographicsPage/DemographicsPage';
import SubmitEmailPage from './SubmitEmailPage/SubmitEmailPage';

export default function StudyPage() {
    const [currentStep, setCurrentStep] = useState("consentform")

    const handleNextStep = (nextStep) => {
        setCurrentStep(nextStep);
    };

    return (
        <div>
            {currentStep === "consentform" && (
                <ConsentPage onNext={() => handleNextStep("questions")} />
            )}
            {currentStep === "questions" && (
                <ParticipantPage onNext={() => handleNextStep("demographics")} />
            )}
            {currentStep === "demographics" && (
                <DemographicsPage onNext={() => handleNextStep("submitemail")} />
            )}
            {currentStep === "submitemail" && <SubmitEmailPage />}
        </div>
    );
}