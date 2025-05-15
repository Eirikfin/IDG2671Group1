import { ProjectProvider } from "../context/projectContext";
import { Outlet } from "react-router-dom";

export default function ParticipantLayout() {
  return (
    <ProjectProvider>
      <Outlet /> {/* this will render the nested routes */}
    </ProjectProvider>
  );
}