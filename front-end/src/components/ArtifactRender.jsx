const apiUrl = import.meta.env.VITE_API_URL;


export default function ArtifactRender({artifact}) {

    if(artifact.mediaType === "image") {
        return <img 
        src={`${apiUrl}/api/${artifact?.filepath}`} 
        alt={artifact?.filename || `Artifact`}/>
    }

    if(artifact.mediaType === "audio") {
        return <audio controls src={`${apiUrl}/api/${artifact?.filepath}`}></audio>
    }

    if(artifact.mediaType === "video") {
        return <video controls src={`${apiUrl}/api/${artifact?.filepath}`}></video>
    }

        return <p>{`${apiUrl}/${artifact?.filepath}`}</p>
}