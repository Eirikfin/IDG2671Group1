import styles from './questionCard.module.scss';
import { useState, useRef } from 'react';



export default function NewQuestionCard({ number }) {
    
    //states
    const [type, SetType] = useState(null);
    const [alternatives, setAlternatives] = useState(['']);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            console.log('Selected file:', selectedFile);
        }
    };

    const triggerFileInput = (e) => {
        e.preventDefault(); // prevent button from submitting form
        fileInputRef.current.click();
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

                <h3>Artifacts:</h3>
                <div className={styles.buttons}>
                    <button type="button">Existing Artifact</button>
                    <button type="button" onClick={triggerFileInput}>
                        Upload Artifact
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {file && <p>Selected file: {file.name}</p>}
                </div>

                <input type="submit" value="Create" />
            </form>
        </div>
    );
}

