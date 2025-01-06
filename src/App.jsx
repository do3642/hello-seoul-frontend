import { Route, Routes } from 'react-router-dom'
import './App.css'
import axios from 'axios';
import Trainline from './Trainline';
import Home from './pages/Home'



function App() {


  return (
    <main>
    {/* <Trainline/> */}
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>

    </main>
  )
}

export default App
