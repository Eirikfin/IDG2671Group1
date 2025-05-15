import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ParticipantStudy.module.scss";
import ArtifactRender from "../components/ArtifactRender";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ParticipantStudy() {
  const { studyId } = useParams(); // Get the study ID from the URL
  const [project, setProject] = useState(null); // Store project data
  const [responses, setResponses] = useState({}); // Store participant responses
  const [error, setError] = useState(""); // Store error messages
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch project data from the backend
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/projects/${studyId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch project data.");
          throw new Error(data.message || "Failed to fetch project data.");
        }

        setProject(data); // Set the project data
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching project data.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchProjectData();
  }, [studyId]);

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

      alert("Your answers have been saved locally!");
      setResponses({}); // Clear responses after saving
    } catch (err) {
      setError("Failed to save answers locally.");
    }
  };

  if (isLoading) {
    return <p>Loading project data...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  // Calculate progress
  const totalQuestions = project.questions.length;
  const answeredQuestions = Object.keys(responses).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  
  return (
    <div className={styles.container}>
      <h1>{project.title}</h1>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{progress}% completed</p>

      {/* Artifacts */}
      <div className={styles.artifacts}>
        {project.artifacts.map((artifact) => (
          <div key={artifact.id} className={styles.artifact}>
            <ArtifactRender artifact={artifact} />
          </div>
        ))}
      </div>

      {/* Questions */}
      <div className={styles.questions}>
        {project.questions.map((question) => (
          <div key={question.id} className={styles.question}>
            <label>{question.questionText}</label>
            {question.type === "TextInput" && (
              <input
                type="text"
                value={responses[question.id] || ""}
                onChange={(e) =>
                  handleResponseChange(question.id, e.target.value)
                }
              />
            )}
            {question.type === "MultipleChoice" && (
              <select
                value={responses[question.id] || ""}
                onChange={(e) =>
                  handleResponseChange(question.id, e.target.value)
                }
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
                onChange={(e) =>
                  handleResponseChange(question.id, e.target.value)
                }
              />
            )}
          </div>
        ))}
      </div>

      <button className={styles.submitButton} onClick={submitAnswers}>
        Save Answers 
      </button>
    </div>
  );
}