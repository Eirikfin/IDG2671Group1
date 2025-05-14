import Demographics from "./Demographics/Demographics";
import Participants from "./Participants/Participants";
import Sessions from "./Sessions/Sessions";
import Answers from "./Answers/Answers";
import '../assets/global-styles/App.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;


export default function Results() {
    //variables
    const { studyId } = useParams();

    //states
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try{
            const response = await fetch(`${apiUrl}/api/sessions/projects/${studyId}`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${localStorage.getItem('token')}`,
                    
                }
            });

            const data = await response.json()

            if(!response.ok){
                setError(data.message)
                throw Error("Failed to fetch user sessions.")
            }
            setData(data);
            console.log(data)
        }catch(err){
            console.log(err);
        }
}

fetchData()

}, [studyId]);

const handleFileDownload = async () => {
    try{
        const response = await fetch(`${apiUrl}/api/sessions/download/projects/${studyId}`, {
            method: "GET",
            headers: {
                Authorization: `bearer ${localStorage.getItem('token')}`
            }
        });

        if(!response.ok){
            setError("failed to download answers")
            throw Error("failed to fetch .csv file")
        }
        //create the downloaded object in front end:
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

       //gives a dynamic name to csv file
        link.download = `study-${studyId}-answers.csv`;
        //clicks link to download then rmemoves it:
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }catch(err){
        console.log(err);
    }
}
const averageAge = () => {
    if (!data || data.length === 0) return 0;
  
    const ages = data
      .map((session) => session.demographics?.age)
      .filter((age) => typeof age === "number");
  
    if (ages.length === 0) return 0;
  
    const total = ages.reduce((sum, age) => sum + age, 0);
    return (total / ages.length).toFixed(1); // average with 1 decimal
  };

  const maleParticipants = () => {
    const males = data.filter((session) => session.demographics?.gender === "Male");
    return males.length;
}
const femaleParticipants = () => {
    const females = data.filter((session) => session.demographics?.gender === "Female");
    return females.length;
}
    return(
        <>
        <h1>Study results</h1>
        {error && <p>{error}</p>}
        {data && <h3>Number of participant that has answered: {data.length}</h3>}
        {data && <p>The average age of participants were: {averageAge()}</p>}
        {data && <p>Number of participants that were male: {maleParticipants()}</p>}
        {data && <p>Number of participants that were female: {femaleParticipants()}</p>}
        <h3>Download .CSV of answers:</h3>
        <button onClick={handleFileDownload}>Download</button>
        
        {/*}
        <Demographics></Demographics>
        <Participants></Participants>
        <Sessions></Sessions>
        <Answers></Answers>
        */}
        </>
    );
}