import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../context/projectContext";
import styles from "./ParticipantSurvey.module.scss";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ParticipantSurvey() {
  const { studyId } = useParams(); // gets the study ID from the URL
  const { project, setProject } = useContext(ProjectContext); // access project data from context
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/project/${studyId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch project data");
        }

        setProject(data); // save project data in context
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProjectData();
  }, [studyId, setProject]);

  // handle response changes
  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // save answers to localStorage
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

  return (
    <div className={styles.container}>
      <h1>{project.title}</h1>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <div className={styles.artifacts}>
        {project.artifacts.map((artifact) => (
          <div key={artifact.id} className={styles.artifact}>
            {artifact.mediaType === "image" && <img src={artifact.filepath} alt={artifact.filename} />}
            {artifact.mediaType === "video" && <video controls src={artifact.filepath}></video>}
            {artifact.mediaType === "audio" && <audio controls src={artifact.filepath}></audio>}
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