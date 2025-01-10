import { Route, Routes } from 'react-router-dom'
import './App.css'
import axios from 'axios';
import Trainline from './main/Trainline';
import Home from './pages/Home'
import Map from './map/pages/Map'
import FetchTouristSpots from './data/FetchTouristSpots'



function App() {


  return (
    <main>
    {/* <Trainline/> */}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/subway' element={<Trainline />} />
      <Route path='/map' element={<Map />} />
      <Route path='/api/touristspot' element={<FetchTouristSpots />} />
    </Routes>

    </main>
  )
}

export default App
