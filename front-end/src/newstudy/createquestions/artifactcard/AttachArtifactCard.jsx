import { useState, useRef } from 'react';
import styles from './AttachArtifact.module.scss'; // Assuming file path is correct

export default function NewArtifactCard() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
    }
  };

  const triggerFileInput = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <>
    <div className={styles.card}>
      <h2>Artifacts:</h2>
      <form>
      <div className={styles.buttons}>
        <button type="button">Existing Artifact</button>
        <button type="button" id="uploadArtifact__button" onClick={triggerFileInput}>
          Upload Artifact
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {file && <p>Selected file: {file.name}</p>}
      </div>
      </form>
    </div>
    </>
  );
}
