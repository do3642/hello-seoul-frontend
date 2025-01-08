import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Map from './map/pages/Map'
import FetchTouristSpots from './data/FetchTouristSpots'



function App() {


  return (
    <main>
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/map' element={<Map />} />
      <Route path='/api/touristspot' element={<FetchTouristSpots />} />
    </Routes>

    </main>
  )
}

export default App
