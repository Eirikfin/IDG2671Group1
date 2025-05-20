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
                            <button className={styles.editBtn}><Link to={`/update/${project._id}`} className={`react__link`}><div className={'svg_container'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                  </div>
                  <div className={'text_container'}>
                  <span>Edit Study</span>
                  </div></Link></button>
                            <button className={styles.study__publish} onClick={() => publishStudy(project._id)}>
                            <div className={'svg_container'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="34px"
                  viewBox="0 -990 960 960"
                  width="34px"
                  fill="#e3e3e3"
                >
                  <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
                </svg>
                </div>
                <div className={'text_container'}>
                <span>Publish Study</span>
                </div>
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
