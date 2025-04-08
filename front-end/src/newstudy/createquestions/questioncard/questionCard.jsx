import styles from './questionCard.module.scss';
import { useState, useRef } from 'react';



export default function NewQuestionCard({ number }) {
    
    //states
    const [type, SetType] = useState(null);
    const [alternatives, setAlternatives] = useState(['']);
    //handlers
    const handleTypeChange = (e) => {
        SetType(e.target.value);
    };

    const handleAlternativeChange = (index, value) => {
        const newAlternatives = [...alternatives];
        newAlternatives[index] = value;
        setAlternatives(newAlternatives);
    };

    const addAlternatives = () => {
        setAlternatives([...alternatives, '']);
    };

    //output
    return (
        <div className={styles.card}>
            <form method="POST">
                <h2>Question {number}</h2>

                <label>Question text:</label>
                <input name="questiontext" type="text" />

                <label>Question type:</label>
                <select name="questionType" onChange={handleTypeChange}>
                    <option value="textInput">Text input</option>
                    <option value="MultipleChoice">Multiple Choice</option>
                    <option value="SlidingScale">Sliding Scale</option>
                </select>

                {type === 'MultipleChoice' && (
                    <div className={styles.alternatives}>
                        <label>Alternatives:</label>
                        {alternatives.map((alt, index) => (
                            <input
                                key={index}
                                type="text"
                                name={`alternative-${index}`}
                                value={alt}
                                onChange={(e) =>
                                    handleAlternativeChange(index, e.target.value)
                                }
                            />
                        ))}
                        <button type="button" onClick={addAlternatives}>
                            Add Alternative
                        </button>
                    </div>
                )}

                {type === 'SlidingScale' && (
                    <div>
                        <label>Minimum Value:</label>
                        <input type="number" name="min" />
                        <label>Maximum Value:</label>
                        <input type="number" name="max" />
                    </div>
                )}

                <input type="submit" value="Create" />
            </form>
        </div>
    );
}

