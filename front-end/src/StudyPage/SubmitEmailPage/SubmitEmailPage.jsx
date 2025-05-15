import { useState } from 'react';
import styles from './SubmitEmailPage.module.css';
const apiUrl = import.meta.env.VITE_API_URL;

export default function SubmitEmailPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const payload = {
                email: email
            }
            const session = JSON.parse(localStorage.getItem('session'))
            const response = await fetch(`${apiUrl}/api/sessions/${session._id}/email`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            if(!response.ok) {
                throw Error("failed to submit email", data.message);
            }
            console.log(data);
        }catch(err){
            console.log(err);
        }
        // INSERT VALIDATION AND API CALL LOGIC HERE
        setSubmitted(true);
    }

    return (
        <div className={styles.container}>
            <div className={styles.submitEmailPage}>
                <h1 className={styles.submitEmailPage__title}>Thank you for your participation!</h1>
                <p className={styles.submitEmailPage__text}>Your participation in this study is much appreciated. Your data is invaluable for this research, which is subject to further study.</p>

                <p className={styles.submitEmailPage__text}>In the likely event that further research on this topic is conducted, we may wish to have you participate in a follow-up study. If you are interested in participating in a follow-up study, please leave your email address in the form below. This is entirely optional, and we will <strong>only</strong> contact you in case of a follow-up study.</p>
                
                <p className={styles.submitEmailPage__text}>Should you at any point wish to withdraw from the list of follow-up study candidates, send an email to: <strong>*GET researcher email from logged-in user here*</strong>.</p>

                <h3 className={styles.submitEmailPage__header}>Submit Your Email (Optional)</h3>
                {!submitted ? (
                    <form 
                    onSubmit={handleSubmit}
                    className={styles.submitEmailPage__form}
                    >
                    <div className={styles.submitEmailPage__form__section}>
                        <label htmlFor="email">Email:</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        />
                    </div>
                    <button 
                    type="submit"
                    className={styles.submitEmailPage__form__button}
                    >
                        Finished
                    </button>
                    </form>
                ) : (
                    <p>Thank you! Your email has been submitted. We will contact you in the event of a follow-up study.</p>
                )}
            </div>
        </div>
    )
}