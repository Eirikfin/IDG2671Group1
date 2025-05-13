import { useState } from 'react';

export default function SubmitEmailPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // INSERT VALIDATION AND API CALL LOGIC HERE
        setSubmitted(true);
    }

    return (
        <div>
            <h1>Thank you for your participation!</h1>
            <p>Your participation in this study is much appreciated. Your data is valuable in conducting research within this topic, which is subject to further study.</p>

            <p>In the likely event that further research on this topic is conducted, we may wish to have you participate in a follow-up study. If you are interested in participating in a follow-up study, please leave your email address in the form below. This is entirely optional. We will <strong>only</strong> contact you in case of a follow-up study. Should you at any point wish to withdraw from the list of follow-up study candidates, send an email to: <strong>*GET researcher email from logged-in user here*</strong>.</p>

            <h3>Submit Your Email (Optional)</h3>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                <div>
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
                <button type="submit">Submit</button>
                </form>
            ) : (
                <p>Thank you! Your email has been submitted. We will contact you in the event of a follow-up study.</p>
            )}
        </div>
    )
}