import { useState } from 'react';
import styles from './DemographicsPage.module.css';

export default function DemographicsPage({ onNext }) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // INSERT VALIDATION AND API CALL LOGIC HERE
        onNext();
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="nonbinary">Non-binary</option>
              <option value="preferNotToSay">Prefer not to say</option>
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
            onClick={onNext}
            >Submit</button>
        </form>
      </div>
    </div>
    )
}