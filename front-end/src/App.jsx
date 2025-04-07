import { useState } from 'react'
import './assets/global-styles/App.css'
import Header from './components/user-interface/header/ui_header';
import Footer from './components/user-interface/Footer/ui_footer';
import DashBoard from './dashboard/dashboard';
import CreateStudy from './newstudy/createquestions/createquestions'

export default function App() {
  return(
    <>
      <Header></Header>
      <CreateStudy/>
      <Footer></Footer>
    </>
  );
}