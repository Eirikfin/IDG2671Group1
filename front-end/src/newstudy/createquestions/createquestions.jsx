import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewQuestionCard from "./questioncard/questionCard";
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
  const [sectionCount, setSectionCount] = useState(1);
  const [submitMsg, setSubmitMsg] = useState(false);

  //submitting a section
  const submitSection = async () => {
    try {
        const artifacts = JSON.parse(sessionStorage.getItem("artifacts") || "[]");
        //artifact info for the question section
        const artifactPayload = artifacts.map(artifact => ({
            artifactId: artifact._id,
            researcherId: artifact.researcherId,
            filename: artifact.filename,
            filepath: artifact.filepath,
            mediaType: artifact.mediaType
        }));
        //body of a question section:
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

      //send request to api:
      const response = await fetch(`${apiUrl}/api/section/${studyId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload)
      });
      //store response from api as json:
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        throw Error("Failed to submit question section");
        
      }

      console.log(data);
      //remove artifacts from session storage
      sessionStorage.removeItem("artifacts");
      setSubmitMsg(true);
    } catch (err) {
        console.log(err);
    }
  };
  //adds a question to the section with default values:
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

  //removes a question from section
  const deleteQuestion = (idToRemove) => {
    setQuestionCards(prev =>
      prev.filter(card => card.id !== idToRemove)
    );
  };
  const previewPage = () => {
    return;
  };
  //submits section to backand and reroutes to dashboard
  const publishStudy = () => {
    submitSection()
    
    navigate("/dashboard");
  };

  const addSection = async () => {
    await submitSection()

    // Reset question cards to the default one-question state
    setQuestionCards([{
      id: uuid(),
      questionText: "",
      type: "TextInput",
      alternatives: [],
      min: 0,
      max: 10
    }]);
    //updates sectionCount and routes to new section
    const nextSection = sectionCount + 1;
    setSectionCount(nextSection);
    navigate(`/create_study/${studyId}/questions/${nextSection}`)
  };

  //render components
  return (
    <div className={styles.container}>
    <>
      {submitMsg && <p>Section was submitted!</p>}
      <h1>Section {sectionCount}</h1>
      <NewArtifactCard key={sectionCount}/>
      {questionCards.map((card, id) => (
  <div className={styles.card} key={card.id}>
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
      <div className={styles.buttonscontainer}>
        <button 
        className={styles.addQuestion__btn} 
        id="addQuestion__btn" 
        onClick={addQuestion}
        >
          Add Question
        </button>

        <button 
        onClick={addSection}
        className={styles.addQuestion__btn}
        >
          Add new section
        </button>

        <button 
        onClick={previewPage}
        className={styles.addQuestion__btn}
        >
          Preview page
        </button>

        <button 
        id="publish__btn" 
        onClick={publishStudy}
        className={styles.addQuestion__btn}
        >
          Publish Study
        </button>
      </div>
      
    </>
    </div>
  );
}
