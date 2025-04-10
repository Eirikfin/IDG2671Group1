import React from "react";
import styles from "./Existingprofiles.module.scss";

const Existingprofiles = () => {
  const profiles = [
    { name: "John Doe", role: "Researcher", email: "johndoe@example.com" },
    { name: "Jane Smith", role: "Scientist", email: "janesmith@example.com" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.container_card}>
        <main>
          <h1>Researcher Profiles</h1>
          <h2>Existing profiles:</h2>
          <div className={styles.profilesContainer}>
            {profiles.map((profile, index) => (
              <div key={index} className={styles.profile}>
                <div className={styles.profileInfo}>
                  <p>
                    <strong>Name:</strong> {profile.name}
                  </p>
                  <p>
                    <strong>Role:</strong> {profile.role}
                  </p>
                  <p>
                    <strong>Email:</strong> {profile.email}
                  </p>
                </div>
                <button className={styles.editBtn}>Edit</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Existingprofiles;
