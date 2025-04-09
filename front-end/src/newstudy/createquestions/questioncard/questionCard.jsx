import styles from "./questionCard.module.scss";
import { useState, useRef } from "react";

export default function NewQuestionCard({ number }) {
  //states
  const [type, SetType] = useState(null);
  const [alternatives, setAlternatives] = useState([""]);
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
    setAlternatives([...alternatives, ""]);
  };
  const deleteAlternative = (indexToRemove) => {
    setAlternatives(alternatives.filter((_, index) => index !== indexToRemove));
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

        {type === "MultipleChoice" && (
          <div className={styles.alternatives}>
            <label>Alternatives:</label>
            {alternatives.map((alt, index) => (
    <div key={index} className={styles.alternativeRow}>
        <input
            type="text"
            name={`alternative-${index}`}
            value={alt}
            onChange={(e) =>
                handleAlternativeChange(index, e.target.value)
            }
        />
        <button
            className={styles.remove_btn}
            type="button"
            onClick={() => deleteAlternative(index)}
        >
            X
        </button>
    </div>
))}

            <button type="button" onClick={addAlternatives}>
              Add Alternative
            </button>
          </div>
        )}

        {type === "SlidingScale" && (
          <div className={styles.slidingscale}>
            <label>Minimum Value:</label>
            <input type="number" name="min" placeholder="0"/>
            <label>Maximum Value:</label>
            <input type="number" name="max" placeholder="10"/>
          </div>
        )}
      </form>
    </div>
  );
}
