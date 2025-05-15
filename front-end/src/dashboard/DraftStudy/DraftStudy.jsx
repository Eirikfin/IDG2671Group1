import styles from './DraftStudy.module.css';
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function DraftStudy({ projects, setProjects }) {
    const draftProjects = projects.filter(project => project.status === "notPublished");

    const publishStudy = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(`${apiUrl}/api/projects/${id}/activate`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to publish study');
            }

            setProjects(prevProjects =>
                prevProjects.map(project =>
                    project._id === id ? { ...project, status: "active" } : project
                )
            );
        } catch (error) {
            console.error('Error publishing study:', error);
        }
    };

    return (
        <div className={styles.study}>
            <h2>Drafted study/studies (not published)</h2>
            {draftProjects.length > 0 ? (
                draftProjects.map(project => (
                    <div key={project._id} className={`card`}>
                        <h3 className={styles.study__title}>{project.title}</h3>
                        <p className={styles.study__description}>{project.description}</p>
                        <div className={`card__buttons`}>
                            <button><Link to={`/update/${project._id}`} className={`react_Link`}>Edit study</Link></button>
                            <button className={styles.study__publish} onClick={() => publishStudy(project._id)}>
                                Publish study
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No drafted studies available.</p>
            )}
        </div>
    );
}
