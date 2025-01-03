import { useState } from 'react'


import './App.css'
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Map from './pages/Map';

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/map' element={<Map />} />
        </Routes>
      </div>
    </>
  )
}

export default App
