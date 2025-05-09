import { useState, useEffect } from "react";
import { useParams, Outlet } from 'react-router-dom';
import { ProjectContext } from "../context/projectContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UpdatePage() {
    //states:
    const [isLoading, setIsLoading] = useState(false);
    const [project, setProject] = useState({})
    const [error, setError] = useState("");
    //variables:
    const { projectId } = useParams()
  


    useEffect(() => {
        
        const fetchData = async () => {
            try{
                setIsLoading(true)
                const response = await fetch(`${apiUrl}/api/projects/${projectId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `bearer ${localStorage.getItem('token')}`
                        }
                    }
                )

                const data = await response.json();

                if(!response.ok){
                    setError(data.message)
                    throw Error(data.message || "failed to get project data")
                }

                setProject(data);
                console.log(data)
            }catch(err){
                console.log(err)
            }finally{
                setIsLoading(false);
            }
        }

        fetchData();

    },[projectId])

    if(isLoading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>{error}</p>
    }

    return (
        <>
        <h1>Edit project page</h1>
        <ProjectContext.Provider value={project}>
            <Outlet />
        </ProjectContext.Provider>
        </>
    )
}