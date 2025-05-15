import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Dashboard_newStudy from "./CreateStudy/CreateStudy";
import CurrentStudy from "./CurrentStudy/CurrentStudy";
import PastStudy from "./PastStudy/PastStudy";
import DraftStudy from "./DraftStudy/DraftStudy";

export default function DashBoard() {
    const [projects, setProjects] = useState([]);

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
                if (Array.isArray(projectsData.projects)) {
                    setProjects(projectsData.projects);
                } else {
                    console.error('Unexpected API response format:', projectsData);
                    setProjects([]);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects([]);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            <Dashboard_newStudy />
            <DraftStudy projects={projects} setProjects={setProjects} />
            <CurrentStudy projects={projects} setProjects={setProjects} />
            <PastStudy projects={projects} setProjects={setProjects} />
        </>
    );
}