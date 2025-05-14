import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../../context/projectContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ParticipantPage() {
  const { projectId } = useParams(); // gets the study ID from the URL
  const { project, setProject } = useContext(ProjectContext); // access project data from context
  const [questions, setQuestions] = useState([]); // State for questions
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProjectAndQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        // Fetch project data
        const projectResponse = await fetch(`${apiUrl}/api/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const projectData = await projectResponse.json();

        if (!projectResponse.ok) {
          throw new Error(projectData.message || "Failed to fetch project data");
        }

        setProject(projectData); // Save project data in context

        // Fetch questions data
        const questionsResponse = await fetch(`${apiUrl}/api/section/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const questionsData = await questionsResponse.json();

        if (!questionsResponse.ok) {
          throw new Error(questionsData.message || "Failed to fetch questions");
        }

        setQuestions(questionsData); // Save questions data in state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProjectAndQuestions();
  }, [projectId, setProject]);

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
        projectId,
        responses,
      };

      // Save to localStorage
      localStorage.setItem(`survey_${projectId}_responses`, JSON.stringify(payload));

      setSuccessMessage("Your answers have been saved locally!");
      setResponses({}); // Clear responses after saving
    } catch (err) {
      setError("Failed to save answers locally.");
    }
  };

  // Handle loading and error states
  if (!project) {
    return <p>Loading project data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
      {successMessage && <p>{successMessage}</p>}

      <div>
        {/* Display project artifacts */}
        {project.artifacts?.map((artifact) => (
          <div key={artifact.id}>
            {artifact.mediaType === "image" && <img src={artifact.filepath} alt={artifact.filename} />}
            {artifact.mediaType === "video" && <video controls src={artifact.filepath}></video>}
            {artifact.mediaType === "audio" && <audio controls src={artifact.filepath}></audio>}
          </div>
        ))}
      </div>

      <div>
        {/* Display questions */}
        {questions.map((question) => (
          <div key={question.id}>
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

      <button onClick={submitAnswers}>Submit answers</button>
    </div>
  );
}