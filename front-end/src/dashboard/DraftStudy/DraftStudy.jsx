import styles from './DraftStudy.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function DraftStudy() {
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

        const draftProjects = projects.filter(project => project.status === "notPublished");

    return(
        <div className={styles.study}>

            <h2 className={styles.study_title}>Drafted study/studies (not published)</h2>

            {draftProjects.length > 0 ? (
                draftProjects.map((project) => (
                    <div key={project._id} className={styles.study_card}>

                        <h3>{project.title}</h3>
                        <p>{project.description}</p>

                        <div className={styles.study_card_buttons}>
                            <button><Link to="/create_study/questions" className={styles.react_Link}>Edit study</Link></button>
                        </div>
                        
                    </div>
                ))
            ) : (
                <p>No drafted studies available.</p>
            )}

        </div>
    )
}