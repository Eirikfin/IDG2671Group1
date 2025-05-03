import { useState, useRef } from 'react';
import styles from './AttachArtifact.module.scss'; // Assuming file path is correct
const apiUrl = import.meta.env.VITE_API_URL;

export default function NewArtifactCard() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [uploadedArtifact, setUploadedArtifact] = useState([]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
    }
    try{
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`${apiUrl}/api/artifacts`, {
        method: "POST",
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      const data = await response.json();

      if(!response.ok){
        setError(data.message);
        throw new Error(data.message || 'Failed to upload artifact');
      }
      console.log(data);
      setUploadedArtifact(prev => [...prev, data]);

      //reset the upload button after file upload:
      setFile(null)
      e.target.value = null;


    }catch(err){
      console.log(err)
    }
  };

  const triggerFileInput = async (e) => {
    e.preventDefault();
    fileInputRef.current.click();
    
  };

  return (
    <>
    <div className={styles.card}>
      <h2>Artifacts:</h2>
      <form>
      <div className={styles.buttons}>
        <button type="button" id="uploadArtifact__button" onClick={triggerFileInput}>
          Upload Artifact
        </button>
        <input
          type="file"
          ref={fileInputRef}

          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {file && <p id="artifact_name">Selected file: {file.name}</p>}
        {error && <p>Error: {error.message}</p>}
        {uploadedArtifact.map((artifactData, index) => (
  <div key={index}>
    <img
      src={`${apiUrl}/${artifactData.artifact?.filepath}`}
      alt={artifactData.artifact?.filename || `Artifact ${index + 1}`}
    />
  </div>
))}
         </div>
      </form>
    </div>
    </>
  );
}
