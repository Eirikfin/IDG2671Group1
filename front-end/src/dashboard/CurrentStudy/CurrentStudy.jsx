import styles from "./CurrentStudy.module.scss";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CurrentStudy({ projects, setProjects }) {
  console.log("Projects prop in CurrentStudy:", projects); // Debugging log

  const activeProjects = projects.filter(
    (project) => project.status === "active"
  );
  console.log("Filtered activeProjects:", activeProjects); // Debugging log

  const copyLinkToClipboard = (projectId) => {
    const link = `${window.location.origin}/study/${projectId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy link: ", err));
  };

  const concludeStudy = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${apiUrl}/api/projects/${id}/conclude`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update project status");
      }

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id ? { ...project, status: "concluded" } : project
        )
      );
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  return (
    <div className={styles.study}>
      <h2>Current study/studies</h2>
      {activeProjects.length > 0 ? (
        activeProjects.map((project) => (
          <div key={project._id} className={`card`}>
            <h3 className={styles.study__title}>{project.title}</h3>
            <p className={styles.study__description}>{project.description}</p>
            <div className={`card__buttons`}>
              <button onClick={() => copyLinkToClipboard(project._id)}>
                <div className={"svg_container"}>
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
                <div className={"text_container"}>
                  <span>Copy link</span>
                </div>
              </button>
              <button>
                <Link to={`/update/${project._id}`} className={`react__link`}>
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
                  <div className={"text_container"}>
                    <span>Edit Study</span>
                  </div>
                </Link>
              </button>
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
                  <div className="text_container">
                    <span>View Results</span>
                  </div>
                </Link>
              </button>
              <button
                onClick={() => concludeStudy(project._id)}
                className={styles.study__conclude}
              >
                <div className={"svg_container"}>
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
                <div className={"text_container"}>
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
