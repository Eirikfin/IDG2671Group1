import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewQuestionCard from "./questioncard/QuestionCard";
import NewArtifactCard from "./artifactcard/AttachArtifactCard";
import { v4 as uuid} from "uuid"
import styles from "./createquestions.module.scss";
const apiUrl = import.meta.env.VITE_API_URL;



export default function CreateStudy() {
//variables
    const navigate = useNavigate();
  const { studyId } = useParams();
//states
  const [questionCards, setQuestionCards] = useState([{
    id: uuid(), questionText: "", type: "TextInput", alternatives: [], min: 0, max: 10
  }]);
  const [error, setError] = useState("");

  //submitting a section
  const submitSection = async () => {
    try {
        const artifacts = JSON.parse(sessionStorage.getItem("artifacts") || "[]");
        const artifactPayload = artifacts.map(artifact => ({
            artifactId: artifact._id,
            researcherId: artifact.researcherId,
            filename: artifact.filename,
            filepath: artifact.filepath,
            mediaType: artifact.mediaType
        }));
        const payload = {
            projectId: studyId,
            artifacts: artifactPayload,
            questions: questionCards.map(card => ({
                questionType: card.type,
                questionText: card.questionText,
                questionAlternatives:
                    card.type === "MultipleChoice" ? card.alternatives: [],
                    minValue: card.type === "SlidingScale" ? card.min : undefined,
                    maxValue: card.type === "SlidingScale" ? card.max : undefined,
            }))
        }
        console.log(payload);


      const response = await fetch(`${apiUrl}/api/section/${studyId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        throw Error("Failed to submit question section");
        
      }

      console.log(data);
    } catch (err) {
        console.log(err);
    }
  };

  const addQuestion = () => {
    setQuestionCards(prev => [
      ...prev,
      { 
        id: uuid(),
        questionText: "",
        type: "TextInput",
        alternatives: [],
        min: 0,
        max: 10
      }
    ]);
  };
  const deleteQuestion = (idToRemove) => {
    setQuestionCards(prev =>
      prev.filter(card => card.id !== idToRemove)
    );
  };
  const previewPage = () => {
    return;
  };

  const publishStudy = () => {
    submitSection()
    
    navigate("/dashboard");
  };

  const addSection = () => {
    submitSection()

    window.location.reload();
  };

  return (
    <>
      <NewArtifactCard />
      {questionCards.map((card, idx) => (
  <div key={card.id}>
    <button
      className={styles.remove_btn}
      onClick={() => deleteQuestion(card.id)}
    >
      X
    </button>
    <NewQuestionCard
      card={card}
      onChange={(updatedCard) => {
        setQuestionCards(prev =>
          prev.map(c => (c.id === updatedCard.id ? updatedCard : c))
        );
      }}
    />
  </div>
))}
{error && <p>{error}</p>}
      <button id="addQuestion__btn" onClick={addQuestion}>
        Add Question
      </button>
      <button onClick={addSection}>Add new section</button>
      <button onClick={previewPage}>Preview page</button>
      <button id="publish__btn" onClick={submitSection}>
        Publish Study
      </button>
      
    </>
  );
}
