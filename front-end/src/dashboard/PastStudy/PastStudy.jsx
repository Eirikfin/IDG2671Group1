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

  const deleteStudy = async (id) => {
    try {
      // Show confirmation dialog
      const isConfirmed = window.confirm("Are you sure you want to delete this study?");
      if (!isConfirmed) {
        return; // Exit if the user cancels
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
        <h2>Past study/studies</h2>
        {concludedProjects.length > 0 ? (
            concludedProjects.map((project) => (
                <div key={project._id} className={`card`}>
                    <h3 className={styles.study__title}>{project.title}</h3>
                    <p className={styles.study__description}>{project.description}</p>
                    <div className={`card__buttons`}>
              <button>
                <Link to="/results" className={styles.react_Link}>
                <div className={'svg_container'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
                  </svg>
                  </div>
                  <div className={'text_container'}>
                  <span>View Results</span>
                  </div>
                </Link>
              </button>
            </div>

            <button
              className={styles.deleteButton}
              onClick={() => deleteStudy(project._id)}
            >
                <div className={'svg_container'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
              </div>
              <div className={'text_container'}>
              <span>Delete Study</span>
              </div>
            </button>
          </div>
        ))
      ) : (
        <p>No past studies available.</p>
      )}
    </div>
  );
}
