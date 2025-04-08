import { useState } from "react";
import NewQuestionCard from "./questioncard/QuestionCard";
import NewArtifactCard from "./artifactcard/AttachArtifactCard";

export default function CreateStudy() {
    const [questionCards, setQuestionCards] = useState([1]);

    const addQuestion = () => {
        setQuestionCards(prev => [...prev, prev.length + 1]);
    };

    const previewPage = () => {
        return 
    };
    const publishStudy = () => {
        return
    }

    return (
        <>
            <NewArtifactCard/>
            {questionCards.map((num, index) => (
                <NewQuestionCard key={index} number={num} />
            ))}

            <button onClick={addQuestion}>Add Question</button>
            <button onClick={previewPage}>Preview page </button>
            <button onClick={publishStudy}>Publish Study</button>
        </>
    );
}
