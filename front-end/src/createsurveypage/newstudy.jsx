import { useState } from "react";
import NewQuestionCard from "./questioncard/questionCard";

export default function CreateStudy() {
    const [questionCards, setQuestionCards] = useState([1]);

    const addQuestion = () => {
        setQuestionCards(prev => [...prev, prev.length + 1]);
    };

    return (
        <>
            {questionCards.map((num, index) => (
                <NewQuestionCard key={index} number={num} />
            ))}

            <button onClick={addQuestion}>Add Question</button>
        </>
    );
}
