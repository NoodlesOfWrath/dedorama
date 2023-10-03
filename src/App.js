import React from 'react';
import './App.css'
//import Navbar from './componenets/Navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
//import Home from './pages'
import DotCalender from './pages/DotCalender'
import FillingCircle from './pages/FillingCircle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='FillingCircle' element={<FillingCircle />}></Route>
        <Route path='DotCalender' element={<DotCalender />}></Route>
      </Routes>
    </Router>
  )
}

export default App;