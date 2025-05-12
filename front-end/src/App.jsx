import './assets/global-styles/App.css'
import Header from './components/user-interface/header/ui_header';
import Footer from './components/user-interface/Footer/ui_footer';
import DashBoard from './dashboard/dashboard';
import CreateQuestions from './newstudy/createquestions/createquestions'
import Results from './results/results';
import Newstudy from './newstudy/newstudy'
import Login from './login/Login';
import Register from './register/Register';
import ProfilePage from './profile/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdatePage from './UpdateStudy/UpdateStudy';
import { UpdateFront } from './UpdateStudy/UpdateFront';
import { UpdateSection } from './UpdateStudy/UpdateSection';


export default function App() {
  return(
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create_study" element={<Newstudy />} />
          <Route path="/create_study/:studyId/questions/:index" element={<CreateQuestions/>}/>
          <Route path="/:studyId/results" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="update/:projectId" element={<UpdatePage />}>
            <Route index element={<UpdateFront/>} />
            <Route path="section/:index" element={<UpdateSection/>}/>
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}