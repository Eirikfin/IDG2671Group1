import { useContext, useEffect, useState } from "react"
import { ProjectContext } from "../context/projectContext"
import { useNavigate, useParams } from "react-router-dom";
import style from "../newstudy/newstudy.module.scss"
const apiUrl = import.meta.env.VITE_API_URL; 

export function UpdateFront() {
    const data = useContext(ProjectContext);
    const { projectId } = useParams();
    const navigate = useNavigate();


     const [error, setError] = useState("");
     const [title, setTitle] = useState("");
     const [collectDemographics, setCollectDemographics] = useState(false);
     const [description, setDescription] = useState("");
     const [updateMsg, setUpdateMsg] = useState("");
     
    useEffect(() => {
        setTitle(data.title);
        setDescription(data.description);
        setCollectDemographics(data.demographics);
    }, [projectId])

     const updateFront = async (e) => {
        e.preventDefault();
        
        try{
            const payload = {
                title: title,
                demographics: collectDemographics,
                description: description,
                status: "notPublished"
            }


            const response = await fetch(`${apiUrl}/api/projects/${projectId}`, 
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(payload)
                }
            )

            const data = await response.json()

            if(!response.ok){
                setError(data.message)
                throw Error(data.message || "failed to update project");
            }
            setUpdateMsg(data.message)
            console.log(data)
        }catch(err){
            console.log(err);
        }
     }

     return(
        <>
         <div className={style.card} id="newproject__container">
         <h2>Update Front Page</h2>
         <form onSubmit={updateFront}>
             <label>Study Title:</label>
             <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" value={title} />
             <label>Collect demographics?
                <input onChange={(e) => setCollectDemographics(e.target.checked)} checked={collectDemographics} type="checkbox"/>
            </label>
             <label>Description:</label>
             <textarea onChange={(e) => setDescription(e.target.value)} name="description" value={description}></textarea>
             <input className={style.submit} id="newProject__submit" type="submit"/>
             {error && <p>{error}</p>}
             {updateMsg && <p>{updateMsg}</p>}
         </form>
         </div>
         <button onClick={() => navigate('section/0')}>Update Sections</button>
  
         </>
     );

    
}