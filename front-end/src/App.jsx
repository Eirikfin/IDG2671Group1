import "./assets/global-styles/App.scss";
import Header from "./components/user-interface/header/ui_header";
import DashBoard from "./dashboard/dashboard";
import CreateQuestions from "./newstudy/createquestions/createquestions";
import Results from "./results/results";
import Newstudy from "./newstudy/newstudy";
import Login from "./login/Login";
import Logout from "./logout/Logout";
import Register from "./register/Register";
import ProfilePage from './profile/ProfilePage';
import StudyPage from './StudyPage/StudyPage';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import UpdatePage from "./UpdateStudy/UpdateStudy";
import { UpdateFront } from "./UpdateStudy/UpdateFront";
import { UpdateSection } from "./UpdateStudy/UpdateSection";
import { AuthProvider } from "./context/authContext";
import RequireAuth from "./components/protectedRoute/protectedRoute"
import { ProjectContext } from "./context/projectContext";
import { useState } from "react";
import ConsentPage from "./StudyPage/ConsentPage/ConsentPage";
import { useAuth } from "./context/authContext";

function AppContent() {
  const location = useLocation();

  // Check if the current route is "/study"
  const isStudyPage = location.pathname.startsWith("/study");

  return (
    <>
      {/* Conditionally render Header */}
      {!isStudyPage && <Header />}
      <useAuth>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
    
        <Route path="/study/:projectId" element={<StudyPage />}>
     
        
        </Route>
        
      
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashBoard />
            </RequireAuth>
          }
        />
        <Route
          path="/create_study"
          element={
            <RequireAuth>
              <Newstudy />
            </RequireAuth>
          }
        />

        <Route path="/profile" element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          } 
          />
        <Route
          path="/create_study/:studyId/questions/:index"
          element={
            <RequireAuth>
              <CreateQuestions />
            </RequireAuth>
          }
        />
        <Route
          path="/:studyId/results"
          element={
            <RequireAuth>
              <Results />
            </RequireAuth>
          }
        />

        {/* Nested protected route */}
        <Route
          path="/update/:projectId"
          element={
            <RequireAuth>
              <UpdatePage />
            </RequireAuth>
          }
        >
          <Route index element={<UpdateFront />} />
          <Route path="section/:index" element={<UpdateSection />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      </useAuth>
    </>
  );
}

export default function App() {
  const [project, setProject] = useState(null);
  
  return (
    <AuthProvider>
      <Router>
        <ProjectContext.Provider value={{ project, setProject }}>
          <AppContent />
        </ProjectContext.Provider>
      </Router>
    </AuthProvider>
  );
}