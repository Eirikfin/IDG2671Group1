import styles from "./PastStudy.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function PastStudy() {
  const [projects, setProjects] = useState([]); // State to store projects (will be used to map over projects after api call)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode(token);
        const researcherId = decodedToken.id;

        const resProjects = await fetch(
          `http://localhost:4202/api/projects/researcher/${researcherId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!resProjects.ok) {
          throw new Error("Failed to fetch projects");
        }

        const projectsData = await resProjects.json();
        console.log("API Response:", projectsData); // Debugging log

        if (Array.isArray(projectsData.projects)) {
          setProjects(projectsData.projects); // Access the projects array from the response object
        } else {
          console.error("Unexpected API response format:", projectsData);
          setProjects([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]); // Fallback to an empty array
      }
    };

    fetchProjects();
  }, []);

  const deleteStudy = async (title, id) => {
    try {
      if(!window.confirm(`Do you want to delete: ${title}?`)){
        return;
      }
      console.log("Deleting project with id:", id);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`http://localhost:4202/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server response:", errorData);
        throw new Error("Failed to delete project");
      }

      // Remove the deleted project from the state
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const concludedProjects = projects.filter(
    (project) => project.status === "concluded"
  );

  return (
    <div className={styles.study}>
      <h2 className={styles.study_title}>Past study/studies</h2>

      {concludedProjects.length > 0 ? (
        concludedProjects.map((project) => (
          <div key={project._id} className={styles.study_card}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className={styles.study_card_buttons}>
              <button className={`${styles.react_Link} react_link`}>
                <Link to={`/${project._id}/results`} className={`${styles.react_Link} react_link`}>
                  View results
                </Link>
              </button>

              <button onClick={() => deleteStudy(project.title ,project._id)}>
                Delete Study
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No past studies available.</p>
      )}
    </div>
  );
}
