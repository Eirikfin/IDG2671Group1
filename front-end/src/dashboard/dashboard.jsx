import CreateStudy from "./CreateStudy/CreateStudy";
import CurrentStudy from "./CurrentStudy/CurrentStudy";
import PastStudy from "./PastStudy/PastStudy";


export default function DashBoard(){
    return(
        <>
        <CreateStudy></CreateStudy>
        <CurrentStudy></CurrentStudy>
        <PastStudy></PastStudy>
        </>
    )
}