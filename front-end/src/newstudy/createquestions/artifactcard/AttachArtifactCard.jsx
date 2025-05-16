import { useState, useRef } from 'react';
import styles from './AttachArtifact.module.scss'; // Assuming file path is correct
import ArtifactRender from '../../../components/ArtifactRender'
const apiUrl = import.meta.env.VITE_API_URL;

export default function NewArtifactCard() {
  //states
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [uploadedArtifact, setUploadedArtifact] = useState([]);
  
  //uploads the artifact selected to back-end
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
    }
    try{
      const formData = new FormData();
      //add file to hidden form
      formData.append('file', selectedFile);

      const response = await fetch(`${apiUrl}/api/artifacts`, {
        method: "POST",
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })
      //response from server
      const data = await response.json();

      if(!response.ok){
        setError(data.message);
        throw new Error(data.message || 'Failed to upload artifact');
      }
      console.log(data);
      //add artifact to state
      const next = [...uploadedArtifact, data.artifact];
      setUploadedArtifact(next);
      sessionStorage.setItem("artifacts", JSON.stringify(next));
      setFile(null)
      e.target.value = null;


    }catch(err){
      console.log(err)
    }
  };
  //adds file to hidden form
  const triggerFileInput = async (e) => {
    e.preventDefault();
    fileInputRef.current.click();
    
  };

  const removeArtifact = async (artifactToRemove) => {
    try{
    const newArtifacts = uploadedArtifact.filter(item => item._id !== artifactToRemove._id);
    setUploadedArtifact(newArtifacts);
    sessionStorage.setItem("artifacts", JSON.stringify(newArtifacts));
    const response = await fetch(`${apiUrl}/api/artifacts/${artifactToRemove._id}`, {
      method: "DELETE",
      headers: {
         'Authorization': `bearer ${localStorage.getItem('token')}`
      }
    });
    
    const data = await response.json()
    console.log(data.message)
    if(!response.ok){
      throw Error("Failed to delete artifact from API");
    }
    ;
  }catch(err){
    console.log(err)
  }
};
  
  return (
    <>
    <div className={styles.container}>
      <div className={styles.createSections}>
        <h2 className={styles.createSections__header}>Artifacts:</h2>
        <form>
        <div className={styles.createSections__upload}>
          <button type="button" id="uploadArtifact__button" onClick={triggerFileInput}>
            Upload Artifact
          </button>
        </div>
        <div className={styles.createSections__artifacts}>
          <input
            type="file"
            ref={fileInputRef}

            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {file && <p id="artifact_name">Selected file: {file.name}</p>}
          {error && <p>Error: {error.message}</p>}
          {uploadedArtifact.map((artifactData, index) => (
          <div className={styles.createSections__artifactDisplay} key={index}>
            <ArtifactRender apiUrl={apiUrl} artifact={artifactData}/>
            <button className={styles.remove__btn} type="button" onClick={() => removeArtifact(artifactData)}>X</button>
          </div>
          ))}
        </div>
        </form>
      </div>
    </div>
    </>
  );
}