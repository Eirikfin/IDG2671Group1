import { useState } from 'react';
import styles from './DemographicsPage.module.css';
import { useParams } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

export default function DemographicsPage({project, onNext }) {
  const { projectId } = useParams();  
  
  
  const [formData, setFormData] = useState({
        age: "",
        gender: "",
        education: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const answer = JSON.parse(localStorage.getItem(`survey_${projectId}_responses`));
    console.log("Submitted answers:", answer);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
          const answerPayload = JSON.parse(localStorage.getItem(`survey_${projectId}_responses`));
          const payload = {
            projectId: projectId,
            researcherId: project.researcherId,
            deviceType: navigator.userAgent,
            demographics: {
              age: formData.age,
              gender: formData.gender,
              education: formData.education
            },
            answers: answerPayload
          }
          const session = JSON.parse(localStorage.getItem('session'));
          const response = await fetch(`${apiUrl}/api/sessions/${session._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "Application/json"
            },
            body: JSON.stringify(payload)
          });

          const data = await response.json();

          if(!response.ok){
            throw Error("Failed to send sessionData", data.message);
          }

          console.log(data)
           // INSERT VALIDATION AND API CALL LOGIC HERE
          onNext();
        }catch(err){
          console.log(err);
        }
       
    }

    return (
    <div className={styles.container}>
      <div className={styles.demographicsForm}>
        <h1>Demographic data</h1>
        <form 
          onSubmit={handleSubmit}
          className={styles.demographicsForm__form}
          >
          <div className={styles.demographicsForm__form__section}>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.demographicsForm__form__section}>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Non-binary</option>
            </select>
          </div>

          <div className={styles.demographicsForm__form__section}>
            <label htmlFor="education">Education Level:</label>
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="highschool">High School</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button 
            type="submit"
            >Submit</button>
        </form>
      </div>
    </div>
    )
}