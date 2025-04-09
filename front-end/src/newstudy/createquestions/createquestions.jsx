import { useState } from "react";
import NewQuestionCard from "./questioncard/QuestionCard";
import NewArtifactCard from "./artifactcard/AttachArtifactCard";

export default function CreateStudy() {
    const [questionCards, setQuestionCards] = useState([1]);

    const addQuestion = () => {
        setQuestionCards(prev => [...prev, prev.length + 1]);
    };

    const deleteQuestion = (indexToRemove) => {
        setQuestionCards(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const previewPage = () => {
        return;
    };

    const publishStudy = () => {
        return;
    };

    const addSection = () => {
        return window.location.reload();
    };

    return (
        <>
            <NewArtifactCard />
            {questionCards.map((index) => (
                <div key={index}>
                    <button onClick={() => deleteQuestion(index)}>Remove</button>
                    <NewQuestionCard number={index} />
                </div>
            ))}

            <button onClick={addQuestion}>Add Question</button>
            <button onClick={addSection}>Add new section</button>
            <button onClick={previewPage}>Preview page</button>
            <button onClick={publishStudy}>Publish Study</button>
        </>
    );
}
