import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../../context/projectContext";
import ArtifactRender from '../../components/ArtifactRender';
import styles from './ParticipantPage.module.css';

const apiUrl = import.meta.env.VITE_API_URL;

export default function ParticipantPage() {
  const { projectId } = useParams(); // Get the project ID from the URL
  const { project, setProject } = useContext(ProjectContext); // Access project data from context
  const [sections, setSections] = useState([]); // State for sections
  const [currentSection, setCurrentSection] = useState(0); // State for current section
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProjectAndQuestions = async () => {
        try {
        // Fetch project data
        const projectResponse = await fetch(`${apiUrl}/api/projects/${projectId}`);
        const projectData = await projectResponse.json();

        if (!projectResponse.ok) {
            throw new Error(projectData.message || "Failed to fetch project data");
        }

        setProject(projectData); // Save project data in context

        // Fetch questionSections data
        const questionSectionsResponse = await fetch(`${apiUrl}/api/section?projectId=${projectId}`);
        const questionSectionsData = await questionSectionsResponse.json();

        if (!questionSectionsResponse.ok) {
            throw new Error(questionSectionsData.message || "Failed to fetch question sections");
        }

        setSections(questionSectionsData);
        } catch (err) {
        setError(err.message);
        }
    };

    fetchProjectAndQuestions();
    }, [projectId, setProject]);

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

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const previousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  }

  const areQuestionsAnswered = () => {
    return sections.every((section) =>
      section.questions.every((question) => responses[question._id])
    );
  };

  // Handle loading and error states
  if (!project) {
    return <p>Loading project data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const currentSectionIndex = sections[currentSection];

  return (
    <div className={styles.page}>
      <div>
        <h1>{project.title}</h1>
        {successMessage && <p>{successMessage}</p>}

        <div>
      {/* Display project artifacts */}
      {project.artifacts?.map((artifact, index) => (
          <ArtifactRender artifact={artifact} key={index} />
      ))}
      </div>

      <div className={styles.page__questions}>
        {/* Display section */}
        {currentSectionIndex?.questions.map((question) => {
        console.log("Rendering question:", question);
        return (
            <div className={styles.page__questions__question} key={question._id}>
            <label>{question.questionText}</label>
            {question.type === "TextInput" && (
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
            {question.type === "SlidingScale" && (
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

          <div className={styles.page__navigation}>
            <button onClick={previousSection} disabled={currentSectionIndex => sections.length - 1}>
              Previous questions
            </button>
            <button onClick={nextSection} disabled={currentSectionIndex === sections.length - 1}>
              Next questions
            </button>
          </div>

          {areQuestionsAnswered() && (
            <div className={styles.page__submit}>
              <button onClick={submitAnswers}>Submit answers</button>
            </div>
          )}
        </div>
    </div>
  );
}