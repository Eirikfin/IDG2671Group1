import Demographics from "./Demographics/Demographics";
import Participants from "./Participants/Participants";
import Sessions from "./Sessions/Sessions";
import Answers from "./Answers/Answers";
import '../assets/global-styles/App.css';

export default function Results() {
    return(
        <>
        <h1>Study results - *GET name of relevant study here*</h1>
        <Demographics></Demographics>
        <Participants></Participants>
        <Sessions></Sessions>
        <Answers></Answers>
        </>
    );
}