import { useState, useEffect, useContext } from "react";
import { ProjectContext } from "../context/projectContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from '../newstudy/createquestions/createquestions.module.scss'
import NewArtifactCard from "../components/createproject/artifactcard/AttachArtifactCard";
import NewQuestionCard from "../components/createproject/questioncard/questionCard";
import { v4 as uuidv4 } from "uuid";
export function UpdateSection() {
    
    //variables
    const data = useContext(ProjectContext);
    const { projectId, index } = useParams();
    const navigate = useNavigate();
    const sectionIndex = parseInt(index, 10);
    const section = data.questions[sectionIndex];
    //states
    const [error, setError] = useState("");
    const [updateMsg, setUpdateMsg] = useState("");
    const [questionCards, setQuestionCards] = useState(() => {
      return section?.questions
        ? section.questions.map(q => ({
            id: uuidv4(),       // assign a unique ID
            ...q
          }))
        : [];
    });

    console.log(section)

    if (!section) {
        return <p>Loading section data...</p>;
      }

      {questionCards.length === 0 && <p>No questions in this section yet.</p>}
    
    return (
    
    <>
    <h2>Update Section Page</h2>
    <NewArtifactCard/>

    {questionCards.length === 0 && <p>No questions in this section yet.</p>}
    {questionCards.map((card, id) => (
        <div className={styles.card} key={card.id || id}>
        <NewQuestionCard 
        card={card}
        onChange={(updatedCard) => {
            setQuestionCards(prev => prev.map(c => (c.id === updatedCard.id ? updatedCard : c))
        );
        }}
        />
        </div>
    ))}

    </>

)
}