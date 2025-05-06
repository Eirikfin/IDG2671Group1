import styles from "./CurrentStudy.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


const apiUrl = import.meta.env.VITE_API_URL;

export default function CurrentStudy() {
    const [projects, setProjects] = useState([]); // State to store projects (will be used to map over projects after api call)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const decodedToken = jwtDecode(token);
                const researcherId = decodedToken.id;

                const resProjects = await fetch(`http://localhost:4202/api/projects/researcher/${researcherId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!resProjects.ok) {
                    throw new Error('Failed to fetch projects');
                }

                const projectsData = await resProjects.json();
                console.log('API Response:', projectsData); // Debugging log

                if (Array.isArray(projectsData.projects)) {
                    setProjects(projectsData.projects); // Access the projects array from the response object
                } else {
                    console.error('Unexpected API response format:', projectsData);
                    setProjects([]); // Fallback to an empty array
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects([]); // Fallback to an empty array
            }
        };

        fetchProjects();
    }, []);

    const activeProjects = projects.filter(project => project.status === "active");

    const concludeStudy = async (id) => {
        try{
        const token = localStorage.getItem('token')
        const response = await fetch(`${apiUrl}/api/projects/${id}/conclude`, {
            method: "PATCH",
            headers: {
                Authorization: `bearer ${token}`
            }
        })

        await response.json();

        if(!response.ok){
            throw Error("Failed to conclude project")
        }

        window.location.reload();
        }catch(err){
            console.log(err)
        }   
    }

    return (
        <div className={styles.study}>

            <h2 className={styles.study_title}>Current study/studies</h2>

            {activeProjects.length > 0 ? (
                activeProjects.map((project) => (
                    <div key={project._id} className={styles.study_card}>

                        <h3>{project.title}</h3>
                        <p>{project.description}</p>

                        <div className={styles.study_card_buttons}>
                            <button>Copy link</button>
                            <button><Link to="/results" className={styles.react_Link}>View results</Link></button>
                            <button>Edit study</button>
                            <button onClick={() => concludeStudy(project._id)}>Conclude study</button>
                        </div>

                    </div>
                ))
            ) : (
                <p>No current studies available.</p>
            )}
            
        </div>
    );
}