import { useState } from 'react'
import './assets/global-styles/App.css'
import CreateStudy from './components/dashboard/CreateStudy/CreateStudy';
import CurrentStudy from './components/dashboard/CurrentStudy/CurrentStudy';
import Header from './components/user-interface/header/ui_header';

export default function App() {
  return(
    <>
      <Header></Header>
      <h1>Dashboard</h1>
      <CreateStudy></CreateStudy>
      <CurrentStudy></CurrentStudy>
    </>
  );
}
