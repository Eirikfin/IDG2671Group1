import { useState, useEffect, useContext } from "react";
import { ProjectContext } from "../context/projectContext";
import { useParams, useNavigate } from "react-router-dom";
import styles from '../newstudy/createquestions/createquestions.module.scss'
import NewArtifactCard from "../components/createproject/artifactcard/AttachArtifactCard";
import NewQuestionCard from "../components/createproject/questioncard/questionCard";
import { v4 as uuidv4 } from "uuid";

const apiUrl = import.meta.env.VITE_API_URL;

export function UpdateSection() {
    
    //variables
    const data = useContext(ProjectContext);
    const { projectId, index } = useParams();
    const navigate = useNavigate();
    let sectionIndex = parseInt(index, 10);
    let section = data?.questions?.[sectionIndex];
    //states
    const [error, setError] = useState("");
    const [questionCards, setQuestionCards] = useState([])
    //set questions into the questioncards
    useEffect(() => {
      setQuestionCards(() => {
           return section?.questions
      ? section.questions.map(q => ({
          id: uuidv4(),
          questionText: q.questionText || "",
          type: q.questionType || "TextInput",
          alternatives: q.questionAlternatives || [],
          min: q.minValue ?? 0,
          max: q.maxValue ?? 10
        }))
      : [];
      })

    }, [section])

    console.log(section)
    //adding a question
    const addQuestion = () => {
      setQuestionCards(prev => [
        ...prev,
        { 
          id: uuidv4(),
          questionText: "",
          type: "TextInput",
          alternatives: [],
          min: 0,
          max: 10
        }
      ]);
    };
    //removing a question
    const deleteQuestion = (idToRemove) => {
      setQuestionCards(prev =>
        prev.filter(card => card.id !== idToRemove)
      );
    };
    //update Section:
    const submitSection = async () => {
      try{
        const artifacts = JSON.parse(sessionStorage.getItem("artifacts") || "[]");

        //artifacts for this section:
        const artifactPayload = artifacts.map(artifact => ({
          artifactId: artifact._id,
          researcherId: artifact.researcherId,
          filename: artifact.filename,
          filepath: artifact.filepath,
          mediaType: artifact.mediaType
        }));
        //complete payload for this section:
        const payload = {
          projectId: projectId,
          artifacts: artifactPayload,
          questions: questionCards.map(card => ({
            questionType: card.type,
            questionText: card.questionText,
            questionAlternatives:
              card.type === "MultipleChoice" ? card.alternatives: [],
              minValue: card.type === "SlidingScale" ? card.min : undefined,
              maxValue: card.type === "SlidingScale" ? card.max : undefined,
          }))
        }
        //send request with payload to api:
        const response = await fetch(`${apiUrl}/api/section/${section._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if(!response.ok) {
          setError(data.message);
          throw Error("Failed to update section");
        }

        console.log(data);
        //remove artifacts from session storage
        sessionStorage.removeItem("artifacts");
        

      }catch(err){
        console.log(err)
      }
    }
    
    //navigate to a new section:
    const nextSection = async () => {
        if(sectionIndex >= data?.questions.length - 1){
            return
        }
    
        await submitSection()
        navigate(`/update/${projectId}/section/${sectionIndex + 1}`)
    }
    //previous section:
    const previousSection = async () => {
        if(sectionIndex <= 0){
            return
        }
        await submitSection()
        navigate(`/update/${projectId}/section/${sectionIndex - 1}`)
    }
    //update section then go to dashboard:
    const updateProject = async () => {
        await submitSection();
        navigate('/dashboard');
    }
    //add new section
    const addSection = async () => {
        await submitSection();
        navigate(`/create_study/${projectId}/questions/${sectionIndex + 1}`)
    }
    
    //if section are empty
      if (!data || !data.questions) {
        return <p>Loading project data...</p>;
      }
      if (!section) {
        return (
        <>
        <p>No sectiondata...</p>;
        <button className={styles.addQuestion__btn} id="addQuestion__btn" onClick={addQuestion}>
        Add Question
      </button>
      </>
      )
      }

    return (
    
    <>
     {questionCards.length === 0 && <p>No questions in this section yet.</p>}
    <h2>Update Section {sectionIndex + 1}</h2>
    <p>Section {sectionIndex + 1} out of {data?.questions.length}</p>
    <NewArtifactCard artifacts={section.artifacts} key={sectionIndex +1}/>

    {questionCards.length === 0 && <p>No questions in this section yet.</p>}
    {questionCards.map((card, id) => (
        <div className={styles.card} key={card.id || id}>
        
          <button className={styles.remove_btn} onClick={() => deleteQuestion(card.id)}>X</button>
        <NewQuestionCard 
        card={card}
        onChange={(updatedCard) => {
            setQuestionCards(prev => prev.map(c => (c.id === updatedCard.id ? updatedCard : c))
        );
        }}
        />
        </div>
    ))}

     <button className={styles.addQuestion__btn} id="addQuestion__btn" onClick={addQuestion}>
             Add Question
           </button>
     <button onClick={updateProject}>Update Project</button>
     <button onClick={addSection}>Add new Section</button>
     <button onClick={previousSection}>Previous Section</button>
     <button onClick={nextSection}>Next section</button>
     
    </>

)
}