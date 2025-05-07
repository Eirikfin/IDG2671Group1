import styles from "./questionCard.module.scss";

export default function NewQuestionCard({ card, onChange }) {
  //states:
  const { id, questionText, type, alternatives, min, max } = card;

  //update values in cards:
  const update = (changes) => {
    onChange({ ...card, ...changes });
  };
  console.log("Rendering card with ID:", id);
  return (
    <div>
      <h2>Question</h2>

      <label>Question text:</label>
      <input
        name="questionText"
        type="text"
        value={questionText}
        onChange={e => update({ questionText: e.target.value })}
      />

      <label>Question type:</label>
      <select
        name="questionType"
        value={type}
        onChange={e => {
          const newType = e.target.value;
          if (newType === "MultipleChoice") {
            update({ type: newType, alternatives: [""] });
          } else if (newType === "SlidingScale") {
            update({ type: newType, min: 0, max: 10 });
          } else {
            update({ type: newType });
          }
        }}
      >
        <option value="TextInput">Text input</option>
        <option value="MultipleChoice">Multiple Choice</option>
        <option value="SlidingScale">Sliding Scale</option>
      </select>

      {type === "MultipleChoice" && (
        <div className={styles.alternatives}>
          <label>Alternatives:</label>
          {alternatives.map((alt, i) => (
            <div key={i} className={styles.alternativeRow}>
              <input
                type="text"
                value={alt}
                onChange={e => {
                  const newAlts = [...alternatives];
                  newAlts[i] = e.target.value;
                  update({ alternatives: newAlts });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const newAlts = alternatives.filter((_, j) => j !== i);
                  update({ alternatives: newAlts });
                }}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              update({ alternatives: [...alternatives, ""] })
            }
          >
            Add Alternative
          </button>
        </div>
      )}

      {type === "SlidingScale" && (
        <div className={styles.slidingscale}>
          <label>Minimum Value:</label>
          <input
            type="number"
            value={min}
            onChange={e => update({ min: Number(e.target.value) })}
          />
          <label>Maximum Value:</label>
          <input
            type="number"
            value={max}
            onChange={e => update({ max: Number(e.target.value) })}
          />
        </div>
      )}
    </div>
  );
}
