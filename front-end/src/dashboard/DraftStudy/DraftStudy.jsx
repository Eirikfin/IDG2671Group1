import styles from "./DraftStudy.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_URL;

export default function DraftStudy() {
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

  const draftProjects = projects.filter(
    (project) => project.status === "notPublished"
  );

  const activeProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/api/projects/${id}/activate`, {
        method: "PATCH",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      await response.json();

      if (!response.ok) {
        throw Error("Failed to activate project");
      }

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.study}>
      <h2 className={styles.study_title}>
        Drafted study/studies (not published)
      </h2>

      {draftProjects.length > 0 ? (
        draftProjects.map((project) => (
          <div key={project._id} className={styles.study_card}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className={`card__buttons`}>
              <button>
                <Link
                  to={`/update/${project._id}`}
                  className={styles.react_Link}
                >
                    <div className={'svg_container'}>
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
                  </div>
                </Link>
              </button>
              <button
                onClick={() => activeProject(project._id)}
                className={styles.publishButton}
              >
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
