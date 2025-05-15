import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../../context/projectContext";
import ArtifactRender from "../../components/ArtifactRender";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ParticipantPage({project, onNext}) {
  const { projectId } = useParams(); // Get the project ID from the URL
   // Access project data from context
  const [questions, setQuestions] = useState(project.questions); // State for questions
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sectionIndex, setSectionIndex] = useState(0);

console.log("Section 1", questions[0]);
console.log("Section 2", questions[1]);


  let questionSection = questions[sectionIndex];
  
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
    {questionSection.artifacts?.map((artifact, index) => (
        <ArtifactRender artifact={artifact} key={index}/>
    ))}
    </div>

    <div>
    {/* Display questions */}
    {questionSection.questions.map((question) => {
    console.log("Rendering question:", question);
    return (
        <div key={question._id}>
        <h3>{question.questionText}</h3>
        <label>{question.questionText}</label>
        {question.questionType === "TextInput" && (
            <input
            type="text"
            value={responses[question._id] || ""}
            onChange={(e) => handleResponseChange(question._id, e.target.value)}
            />
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
            <input
            type="range"
            min={question.minValue}
            max={question.maxValue}
            value={responses[question._id] || question.minValue}
            onChange={(e) => handleResponseChange(question._id, e.target.value)}
            />
        )}
        </div>
    );
    })}
    </div>

      <button onClick={submitAnswers}>Submit answers</button>
    </div>
  );
}