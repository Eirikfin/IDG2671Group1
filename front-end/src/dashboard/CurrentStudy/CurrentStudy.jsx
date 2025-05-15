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

  const activeProjects = projects.filter(
    (project) => project.status === "active"
  );

  const concludeStudy = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/api/projects/${id}/conclude`, {
        method: "PATCH",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      await response.json();

      if (!response.ok) {
        throw Error("Failed to conclude project");
      }

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.study}>
      <h2 className={styles.study_title}>Current study/studies</h2>

      {activeProjects.length > 0 ? (
        activeProjects.map((project) => (
            <div key={project._id} className={`card`}>
            <h3 className={styles.study__title}>{project.title}</h3>
            <p className={styles.study__description}>{project.description}</p>
            <div className={`card__buttons`}>
              <button className={styles.study__button}>
                <div className={'svg_container'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                </svg>
                </div>
                <div className={'text_container'}>
                <span>Copy link</span>
                </div>
              </button>
              <button className={styles.study__button}>
                <Link
                  to={`/${project._id}/results`}
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
                    <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
                  </svg>
                  </div>
                  <div className="text_container">
                  <span>View Results</span>
                  </div>
                </Link>
              </button>
              <button className={styles.study__button}>
                <div className="svg_container">
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
              </button>
              <button className={styles.study__button} onClick={() => concludeStudy(project._id)}>
                <div className={'svg_container'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
                </svg>
                </div>
                <div className={'text_container'}>
                <span>Conclude Study</span>
                </div>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No current studies available.</p>
      )}
    </div>
  );
}
