import { useState } from 'react'
import './assets/styles/App.css'
import CreateStudy from './components/dashboard/CreateStudy';
import CurrentStudy from './components/dashboard/CurrentStudy';

export default function App() {
  return(
    <>
      <h1>Dashboard</h1>
      <CreateStudy></CreateStudy>
      <CurrentStudy></CurrentStudy>
    </>
  );
}
