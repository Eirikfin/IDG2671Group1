import styles from './questionCard.module.scss';


export default function NewQuestionCard({count}){
    
    return(
        <div className={styles.card}>
        <form method="POST">
            <h2>Question {count}</h2>
            <label>questiontext:</label>
            <input name="questiontext" type="text"></input>
            <label>question type:</label>
            <select name="questionType">
                <option value="textInput">Text input</option>  
                <option value="MultipleChoice">MultibleChoice</option>
                <option value="SlidingScale">Sliding Scale</option>
            </select>
            {// add conditional rendering for when multiple choice are selected allowing for user to add alternatives for question 
            }
                <h3>Artifacts:</h3>
                <div className={styles.buttons}>
                <button>existing artifact</button>
                <button>Upload Artifact</button>
                </div>
                <input type="submit" value="Create"></input>

        </form>
        </div>
)
}
