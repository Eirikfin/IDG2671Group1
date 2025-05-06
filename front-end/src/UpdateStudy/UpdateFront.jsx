import { useContext, useState } from "react"
import { ProjectContext } from "../context/projectContext"
import style from "../newstudy/newstudy.module.scss"


export function UpdateFront() {
     const data = useContext(ProjectContext);


     const {error, setError} = useState("");
     const {title, setTitle} = useState("");
     const {description, setDescription} = useState("");
     
     const updateFront = () => {

     }

     return(
         <div className={style.card} id="newproject__container">
         <h2>Update Front Page</h2>
         <form onSubmit={updateFront}>
             <label>Study Title:</label>
             <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder={data?.title}></input>
             <label>Description:</label>
             <textarea onChange={(e) => setDescription(e.target.value)} name="description" placeholder={data?.description}></textarea>
             <input className={style.submit} id="newProject__submit" type="submit"/>
             {error && <p>{error}</p>}
         </form>
         </div>
     );

    
}