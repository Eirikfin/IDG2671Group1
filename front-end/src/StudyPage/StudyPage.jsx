import { useEffect, useState } from 'react';
import ConsentPage from './ConsentPage/ConsentPage';
import ParticipantPage from './ParticipantPage/ParticipantPage';
import DemographicsPage from './DemographicsPage/DemographicsPage';
import SubmitEmailPage from './SubmitEmailPage/SubmitEmailPage';
import styles from './StudyPage.module.css';
import { useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

export default function StudyPage() {
    const [currentStep, setCurrentStep] = useState("consentform")
    const [project, setProject] = useState({});

    const { projectId } = useParams()

    const handleNextStep = (nextStep) => {
        setCurrentStep(nextStep);
    };

    useEffect( () => {
        const fetchProject = async () => {
            try{
                const response = await fetch(`${apiUrl}/api/projects/${projectId}`);

                const data = await response.json();

                if(!response.ok){
                    throw new Error("Failed to fetch Project", data.message);
                }
                
                setProject(data);
            
            }catch(err){
                console.log(err);
            }
        }
        fetchProject();

    }, [projectId])

    return (
        <div className={styles.container}>
            {currentStep === "consentform" && (
                <ConsentPage project={project} onNext={() => handleNextStep("questions")} />
            )}
            {currentStep === "questions" && (
                <ParticipantPage project={project} onNext={() => handleNextStep("demographics")} />
            )}
            {currentStep === "demographics" && (
                <DemographicsPage project={project} onNext={() => handleNextStep("submitemail")} />
            )}
            {currentStep === "submitemail" && <SubmitEmailPage />}
        </div>
    );
}