import Demographics from "./Demographics/Demographics";
import Participants from "./Participants/Participants";
import Sessions from "./Sessions/Sessions";
import Answers from "./Answers/Answers";

export default function Results() {
    return(
        <>
        <Demographics></Demographics>
        <Participants></Participants>
        <Sessions></Sessions>
        <Answers></Answers>
        </>
    )
}