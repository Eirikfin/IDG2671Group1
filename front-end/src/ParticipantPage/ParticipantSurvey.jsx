import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ParticipantSurvey.module.scss";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ParticipantSurvey() {
  const { studyId } = useParams(); // gets the study ID from url
  const [questions, setQuestions] = useState([]);
  const [artifacts, setArtifacts] = useState([]);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/section/${studyId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch study data");
        }

        setQuestions(data.questions || []);
        setArtifacts(data.artifacts || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudyData();
  }, [studyId]);

  // Handle input changes for responses
  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Submit answers to the back-end
  const submitAnswers = async () => {
    try {
      const payload = {
        studyId,
        responses,
      };

      const response = await fetch(`${apiUrl}/api/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit answers");
      }

      setSuccessMessage("Your answers have been submitted successfully!");
      setResponses({}); // clear after submission
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Participant Survey</h1>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <div className={styles.artifacts}>
        {artifacts.map((artifact) => (
          <div key={artifact.id} className={styles.artifact}>
            {artifact.mediaType === "image" && <img src={artifact.filepath} alt={artifact.filename} />}
            {artifact.mediaType === "video" && <video controls src={artifact.filepath}></video>}
            {artifact.mediaType === "audio" && <audio controls src={artifact.filepath}></audio>}
          </div>
        ))}
      </div>

      <div className={styles.questions}>
        {questions.map((question) => (
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
        Submit Answers
      </button>
    </div>
  );
}