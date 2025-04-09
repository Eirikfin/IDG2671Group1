import Dashboard_newStudy from "./CreateStudy/CreateStudy";
import CurrentStudy from "./CurrentStudy/CurrentStudy";
import PastStudy from "./PastStudy/PastStudy";
import DraftStudy from "./DraftStudy/DraftStudy";


export default function DashBoard(){
    return(
        <>
        <Dashboard_newStudy></Dashboard_newStudy>
        <DraftStudy></DraftStudy>
        <CurrentStudy></CurrentStudy>
        <PastStudy></PastStudy>
        </>
    )
}