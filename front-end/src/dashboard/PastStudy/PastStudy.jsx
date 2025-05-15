import styles from "./PastStudy.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_URL;

export default function PastStudy({ projects, setProjects }) {
    const concludedProjects = projects.filter(project => project.status === "concluded");

    const deleteStudy = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(`http://localhost:4202/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete study');
            }

            setProjects(prevProjects =>
                prevProjects.filter(project => project._id !== id)
            );
        } catch (error) {
            console.error('Error deleting study:', error);
        }
    };

    return (
        <div className={styles.study}>
            <h2>Past study/studies</h2>
            {concludedProjects.length > 0 ? (
                concludedProjects.map((project) => (
                    <div key={project._id} className={`card`}>
                        <h3 className={styles.study__title}>{project.title}</h3>
                        <p className={styles.study__description}>{project.description}</p>
                        <div className={`card__buttons`}>
                            <button><Link to="/results" className={`react__link`}>View results</Link></button>
                            <button onClick={() => deleteStudy(project._id)} className={styles.study__delete}>Delete Study</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No past studies available.</p>
            )}
        </div>
    );
}
