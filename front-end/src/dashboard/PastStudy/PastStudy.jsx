import styles from "./PastStudy.module.scss";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function PastStudy({ projects, setProjects }) {
  const concludedProjects = projects.filter(
    (project) => project.status === "concluded"
  );

  const deleteStudy = async (id) => {
    // Error message to ensure no mistake deletion
    const confirmed = window.confirm("Are you sure you want to delete this study? This action cannot be undone!");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${apiUrl}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete study");
      }

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Error deleting study:", error);
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
              <button>
                <Link to={`/${project._id}/results`} className={`react__link`}>
                  <div className={"svg_container"}>
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
                  <div className={"text_container"}>
                    <span>View Results</span>
                  </div>
                </Link>
              </button>
              <button
                onClick={() => deleteStudy(project._id)}
                className={styles.study__delete}
              >
                <div className={"svg_container"}>
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
                <div className={"text_container"}>
                  <span>Delete Study</span>
                </div>
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
