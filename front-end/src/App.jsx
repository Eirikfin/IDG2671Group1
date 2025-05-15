import "./assets/global-styles/App.css";
import Header from "./components/user-interface/header/ui_header";
import Footer from "./components/user-interface/Footer/ui_footer";
import DashBoard from "./dashboard/dashboard";
import CreateQuestions from "./newstudy/createquestions/createquestions";
import Results from "./results/results";
import Login from "./login/Login";
import Register from "./register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdatePage from "./UpdateStudy/UpdateStudy";
import { UpdateFront } from "./UpdateStudy/UpdateFront";
import { UpdateSection } from "./UpdateStudy/UpdateSection";
import ParticipantStudy from "./ParticipantPage/ParticipantStudy";
import CreateStudy from "./newstudy/newstudy";
import ParticipantLayout from "./ParticipantPage/ParticipantLayout";

export default function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create_study" element={<CreateStudy />} />
          <Route
            path="/create_study/:studyId/questions/:index"
            element={<CreateQuestions />}
          />
          <Route path="/:studyId/results" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/survey" element={<ParticipantLayout />}>
            <Route path=":studyId" element={<ParticipantStudy />} />
          </Route>
          <Route path="update/:projectId" element={<UpdatePage />}>
            <Route index element={<UpdateFront />} />
            <Route path="section/:index" element={<UpdateSection />} />
          </Route>
          <Route path="*" element={<h1>404 - Page Not Found</h1>} /> {/* catch wrong route to show 404 errors */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}