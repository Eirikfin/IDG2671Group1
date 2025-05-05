import './assets/global-styles/App.css'
import Header from './components/user-interface/header/ui_header';
import Footer from './components/user-interface/Footer/ui_footer';
import DashBoard from './dashboard/dashboard';
import CreateQuestions from './newstudy/createquestions/createquestions'
import Results from './results/results';
import Newstudy from './newstudy/newstudy'
import Login from './login/Login';
import Register from './register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
  return(
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create_study" element={<Newstudy />} />
          <Route path="/create_study/:studyId/questions/:index" element={<CreateQuestions/>}/>
          <Route path="/results" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}