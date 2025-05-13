import "./assets/global-styles/App.scss";
import Header from "./components/user-interface/header/ui_header";
import Footer from "./components/user-interface/Footer/ui_footer";
import DashBoard from "./dashboard/dashboard";
import CreateQuestions from "./newstudy/createquestions/createquestions";
import Results from "./results/results";
import Newstudy from "./newstudy/newstudy";
import Login from "./login/Login";
import Logout from "./logout/Logout";
import Register from "./register/Register";
import ProfilePage from './profile/ProfilePage';
import StudyPage from './StudyPage/StudyPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdatePage from "./UpdateStudy/UpdateStudy";
import { UpdateFront } from "./UpdateStudy/UpdateFront";
import { UpdateSection } from "./UpdateStudy/UpdateSection";
import { AuthProvider } from "./context/authContext";
import RequireAuth from "./components/protectedRoute/protectedRoute"


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/study" element={<StudyPage />} />

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

        <Footer />
      </Router>
    </AuthProvider>
  );
}