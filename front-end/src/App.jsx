import { useState } from 'react'
import './assets/global-styles/App.css'
import Header from './components/user-interface/header/ui_header';
import Footer from './components/user-interface/Footer/ui_footer';
import DashBoard from './dashboard/dashboard';

export default function App() {
  return(
    <>
      <Header></Header>
      <DashBoard></DashBoard>
      <Footer></Footer>
    </>
  );
}