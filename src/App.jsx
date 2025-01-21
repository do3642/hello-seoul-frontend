import { Route, Routes } from 'react-router-dom'
import './App.css'
import Trainline from './main/Trainline';
import Home from './pages/Home'
import Map from './map/pages/Map'
import Spots from './spots/Spots'
import FetchTouristSpots from './data/FetchTouristSpots'



function App() {


  return (
    <main>
    {/* <Trainline/> */}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/subway' element={<Trainline />} />
      <Route path='/map' element={<Map />} />
      <Route path='/spots' element={<Spots />} />
      <Route path='/api/touristspot' element={<FetchTouristSpots />} />
    </Routes>

    </main>
  )
}

export default App
