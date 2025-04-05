export default function Sessions() {
    return(
        <div className="container">
            <h2>Session data</h2>
            <div>
                <h3>Device-types</h3>
                <p>Participants predominantly used *insert device type from db session data*.</p>
            </div>
            <div>
                <h3>Time spent</h3>
                <p>Participants spent an average time of X amount of time completing the study.</p>
            </div>
        </div>
    )
}