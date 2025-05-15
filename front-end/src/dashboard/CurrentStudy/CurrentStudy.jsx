import styles from "./CurrentStudy.module.scss";
import { Link } from "react-router-dom";

export default function CurrentStudy({ projects, setProjects }) {
    console.log("Projects prop in CurrentStudy:", projects); // Debugging log

    const activeProjects = projects.filter(project => project.status === "active");
    console.log("Filtered activeProjects:", activeProjects); // Debugging log

    const copyLinkToClipboard = (projectId) => {
        const link = `${window.location.origin}/study/${projectId}`;
        navigator.clipboard.writeText(link)
            .then(() => alert("Link copied to clipboard!"))
            .catch(err => console.error("Failed to copy link: ", err));
    };

    const concludeStudy = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(`http://localhost:4202/api/projects/${id}/conclude`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update project status');
            }

            setProjects(prevProjects =>
                prevProjects.map(project =>
                    project._id === id ? { ...project, status: "concluded" } : project
                )
            );
        } catch (error) {
            console.error('Error updating project status:', error);
        }
    };

    return (
        <div className={styles.study}>
            <h2>Current study/studies</h2>
            {activeProjects.length > 0 ? (
                activeProjects.map(project => (
                    <div key={project._id} className={`card`}>
                        <h3 className={styles.study__title}>{project.title}</h3>
                        <p className={styles.study__description}>{project.description}</p>
                        <div className={`card__buttons`}>
                            <button onClick={() => copyLinkToClipboard(project._id)}>Copy Link</button>
                            <button><Link to={`/update/${project._id}`} className={`react__link`}>Edit Study</Link></button>
                            <button><Link to={`/${project._id}/results`} className={`react__link`}>View Results</Link></button>
                            <button onClick={() => concludeStudy(project._id)} className={styles.study__conclude}>Conclude Study</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No current studies available.</p>
            )}
        </div>
    );
}
