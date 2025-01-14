import { Route, Routes } from 'react-router-dom'
import './App.css'
import Trainline from './main/Trainline';
import Home from './pages/Home'
import Map from './map/pages/Map'
import Spots from './spots/Spots'
import FetchTouristSpots from './data/FetchTouristSpots'
import SpotsMain from './spots/SpotsMain';
import SpotsAllTourist from './spots/SpotsAllTourist';
import SpotsSeason from './spots/SpotsSeason';
import SpotsHealing from './spots/SpotsHealing';
import SpotsWalk from './spots/SpotsWalk';
import SpotsHiking from './spots/SpotsHiking';
import SpotsTraditional from './spots/SpotsTraditional';
import SpotsAllFestival from './spots/SpotsAllFestival';



function App() {


  return (
    <main>
    {/* <Trainline/> */}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/subway' element={<Trainline />} />
      <Route path='/map' element={<Map />} />
      <Route path='/spots' element={<Spots />} >
        <Route path='' element={<SpotsMain />} />
        <Route path='alltourist' element={<SpotsAllTourist />} />
        <Route path='allfestival' element={<SpotsAllFestival />} />
        <Route path='season' element={<SpotsSeason />} />
        <Route path='healing' element={<SpotsHealing />} />
        <Route path='walk' element={<SpotsWalk />} />
        <Route path='hiking' element={<SpotsHiking />} />
        <Route path='traditional' element={<SpotsTraditional />}  />
      </Route>
      <Route path='/api/touristspot' element={<FetchTouristSpots />} />
    </Routes>

    </main>
  )
}

export default App
