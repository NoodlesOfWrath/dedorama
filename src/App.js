import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import DotCalender from './pages/DotCalender'
import FillingCircle from './pages/FillingCircle';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/FillingCircle' element={<FillingCircle />}></Route>
          <Route path='/DotCalender' element={<DotCalender />}></Route>
          <Route path='/MainPage' element={<MainPage />} ></Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App;