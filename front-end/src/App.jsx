import './assets/global-styles/App.css'
import Header from './components/user-interface/header/ui_header';
import Footer from './components/user-interface/Footer/ui_footer';
import DashBoard from './dashboard/dashboard';
import CreateStudy from './newstudy/createquestions/createquestions'
import Results from './results/results';
import Newstudy from './createsurveypage/newstudy';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
  return(
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/create_study" element={<Newstudy />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}