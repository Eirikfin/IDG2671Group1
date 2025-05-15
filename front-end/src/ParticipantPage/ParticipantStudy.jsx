import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../context/projectContext";
import styles from "./ParticipantStudy.module.scss";
import ArtifactRender from "../components/ArtifactRender";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ParticipantSurvey() {
  const { studyId } = useParams(); // gets the study ID from the URL
  const { project } = useContext(ProjectContext); // Access project data from context
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes for responses
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
        studyId,
        responses,
      };

      // Save to localStorage
      localStorage.setItem(`survey_${studyId}_responses`, JSON.stringify(payload));

      setSuccessMessage("Your answers have been saved locally!");
      setResponses({}); // Clear responses after saving
    } catch (err) {
      setError("Failed to save answers locally.");
    }
  };

  if (!project) {
    return <p>Loading project data...</p>;
  }

  // Calculate progress
  const totalQuestions = project.questions.length;
  const answeredQuestions = Object.keys(responses).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);


  return (
    <div className={styles.container}>
      <h1>{project.title}</h1>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      {/* Progress bar */}
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{progress}% completed</p>


      <div className={styles.artifacts}>
        {project.artifacts.map((artifact) => (
          <div key={artifact.id} className={styles.artifact}>
            
            <ArtifactRender artifact={artifact} />
          </div>
        ))}
      </div>

      <div className={styles.questions}>
        {project.questions.map((question) => (
          <div key={question.id} className={styles.question}>
            <label>{question.questionText}</label>
            {question.type === "TextInput" && (
              <input
                type="text"
                value={responses[question.id] || ""}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
              />
            )}
            {question.type === "MultipleChoice" && (
              <select
                value={responses[question.id] || ""}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
              >
                <option value="">Select an option</option>
                {question.questionAlternatives.map((alt, index) => (
                  <option key={index} value={alt}>
                    {alt}
                  </option>
                ))}
              </select>
            )}
            {question.type === "SlidingScale" && (
              <input
                type="range"
                min={question.minValue}
                max={question.maxValue}
                value={responses[question.id] || question.minValue}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <button className={styles.submitButton} onClick={submitAnswers}>
        Save Answers Locally
      </button>
    </div>
  );
}