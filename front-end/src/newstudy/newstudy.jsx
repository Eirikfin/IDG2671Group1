import { useState } from "react";
import styles from './newstudy.module.scss';
import { Link, useNavigate} from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

export default function CreateStudy() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [collectDemographics, setCollectDemographics] = useState(false);
    const [error, setError] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const inputs = {
            title: title,
            description: description,
            demographics: collectDemographics,
            status: "notPublished"
        };
        console.log(inputs)
        try{
            const response = await fetch(`${apiUrl}/api/projects`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                body: JSON.stringify(inputs)
            })

            const data = await response.json();
            
            if(!response.ok) {
            
                throw new Error(data.message || 'Failed to create project')
            }
            console.log(data)

            localStorage.setItem("project", JSON.stringify(data));
            navigate(`${data._id}/questions/1`)
        }catch(err){
            console.log(err)
            setError(err.message)
        }
    }
return(
    <div className={styles.container}>
        <div className={styles.newStudy} id="newproject__container">
        <h1>Create a new study</h1>
        <form className={styles.newStudy__form} onSubmit={handleFormSubmit}>
            <div className={styles.newStudy__form__section}>
                <label>Study Title:</label>
                <input onChange={(e) => setTitle(e.target.value)} type="text" name="title"></input>
            </div>
            <div className={styles.newStudy__form__section}>
                <label>Collect demographics?
                <input onChange={(e) => setCollectDemographics(e.target.checked)} type="checkbox"/>
                </label>
            </div>
            <div className={styles.newStudy__form__section}>
                <label>Description:</label>
                <textarea onChange={(e) => setDescription(e.target.value)} name="description"></textarea>
            </div>
            <input className={styles.newStudy__form__submit} id="newProject__submit" type="submit"/>
            
            {error && <p>{error}</p>}
        </form>
        </div>
    </div>
);
}
