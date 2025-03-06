import { useState } from 'react'
import './assets/styles/App.css'
import CreateStudy from './components/dashboard/CreateStudy';
import CurrentStudy from './components/dashboard/CurrentStudy';
import Header from './components/user-interface/ui_header';

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
