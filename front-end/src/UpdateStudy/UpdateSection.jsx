import { useState, useEffect, useContext } from "react";
import { ProjectContext } from "../context/projectContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from '../newstudy/createquestions/createquestions.module.scss'
import NewArtifactCard from "../components/createproject/artifactcard/AttachArtifactCard";
import NewQuestionCard from "../components/createproject/questioncard/questionCard";

export function UpdateSection() {
    
    
    const data = useContext(ProjectContext);
    const { projectId } = useParams();
    const { index } = useParams();
    const navigate = useNavigate();
    console.log(data)
    const section = data.questions[index];

    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [updateMsg, setUpdateMsg] = useState("");
    const [questionCards, setQuestionCards] = useState(() => {
        return section?.questions ? JSON.parse(JSON.stringify(section.questions)) : [];
      });

    console.log(section)

    if (!section) {
        return <p>Loading section data...</p>;
      }

    return (
    
    <>
    <h2>Update Section Page</h2>
    <NewArtifactCard/>

    {questionCards.map((card, id) => (
        <div className={styles.card} key={card.id}>
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