export default function Demographics() {
    return(
        <div className="container">
            <h2>Demographic data</h2>
            <div>
                <h3>Age</h3>
                <p>Participants' ages in this study range between X and Y.</p>
                <p>The average age of participants is X</p>
            </div>
            <div>
                <h3>Nationality</h3>
                <p>Participant country of origin was predominantly *insert country from db*.</p>
            </div>
        </div>
    )
}