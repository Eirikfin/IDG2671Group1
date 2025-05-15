import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../../context/projectContext";
import ArtifactRender from '../../components/ArtifactRender';
import styles from './ParticipantPage.module.css';

export default function ParticipantPage({project, onNext}) {
  
  const { projectId } = useParams(); // Get the project ID from the URL

   // Access project data from context
  const [questions, setQuestions] = useState(project.questions); // State for questions
  const [sections, setSections] = useState(project.questions); // State for sections
  const [currentSection, setCurrentSection] = useState(0); // State for current section
  
  
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  console.log("sections", questions);
  
  // Handle response changes
  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Save answers to localStorage
  const submitAnswers = () => {
    try {
      const payload = {
        sectionId: questions[currentSection]._id,
        sectionAnswers: responses,
      };

       // Get existing responses or initialize an empty array
    const stored = localStorage.getItem(`survey_${projectId}_responses`);
    let previousResponses = stored ? JSON.parse(stored) : [];
    
        // Remove existing response for this sectionId, if any
    previousResponses = previousResponses.filter(
      (entry) => entry.sectionId !== payload.sectionId
    );


    previousResponses.push(payload)
      // Save to localStorage
      localStorage.setItem(`survey_${projectId}_responses`, JSON.stringify(previousResponses));

      setSuccessMessage("Your answers have been saved locally!");
      setResponses({}); // Clear responses after saving
      
    } catch (err) {
      setError("Failed to save answers locally.");
      console.error("localstorage error", err);
    }
  };

  const nextSection =  () => {
    if(currentSection >= sections.length - 1 ){
      submitAnswers();
      onNext();
    }
    if (currentSection < sections.length - 1) {
      submitAnswers();
      setCurrentSection(currentSection + 1);
  
  };
}

  const previousSection = async () => {
    if (currentSection > 0) {
      submitAnswers();
      setCurrentSection((prev) => prev - 1);
    }
  }


  // Handle loading and error states
  if (!project) {
    return <p>Loading project data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <div className={styles.page}>
      <div>
        <h1>{project.title}</h1>
        {successMessage && <p>{successMessage}</p>}

        <div>
      {/* Display project artifacts */}
      {questions[currentSection].artifacts?.map((artifact, index) => (
          <div className={styles.artifactCard} key={index} >
            <ArtifactRender artifact={artifact}/>
          </div>
      ))}
      </div>

      <div className={styles.page__questions}>
        {/* Display section */}
        {questions[currentSection].questions.map((question) => {
        console.log("Rendering question:", question);
        return (
            <div className={styles.page__questions__question} key={question._id}>
            <h3>{question.questionText}</h3>
            {question.questionType === "TextInput" && (
                <>
                <input
                type="text"
                value={responses[question._id] || ""}
                onChange={(e) => handleResponseChange(question._id, e.target.value)}
                />
                <p>{responses[question._id]}</p> {/* fix this */}
                </>
            )}
            {question.questionType === "MultipleChoice" && (
            <select
                value={responses[question._id] || ""}
                onChange={(e) => handleResponseChange(question._id, e.target.value)}
            >
                <option value="">Select an option</option>
                {question.questionAlternatives?.map((alt, altIndex) => (
                <option key={`${question._id}-${altIndex}`} value={alt}>
                    {alt}
                </option>
                ))}
            </select>
            )}
            {question.questionType === "SlidingScale" && (
                <>
                <input
                type="range"
                min={question.minValue}
                max={question.maxValue}
           
                value={responses[question._id] || question.minValue}
                onChange={(e) => handleResponseChange(question._id, e.target.value)}
                />
                 <p>{responses[question._id] || question.minValue}</p>
                 </>
            )}
            </div>
        );
        })}
          </div>

          <div className={styles.page__navigation}>
            <button className={styles.page__navigation__buttons} onClick={previousSection} disabled={currentSection === 0}>
              Previous questions
            </button>

              <button className={styles.page__navigation__buttons} onClick={nextSection}>
               {/* conditionally change name when on last section */}           
                Next questions
              </button>
          </div>
        </div>
    </div>
  );
  }