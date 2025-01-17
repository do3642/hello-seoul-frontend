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
import SpotsSearch from './spots/SpotsSearch';
import SpotsDetail from './spots/SpotsDetail';
import { TouristSpotsProvider } from './context/TouristSpotsContext';



function App() {


  return (
    <main>
      {/* <Trainline/> */}
      <TouristSpotsProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/subway' element={<Trainline />} />
          <Route path='/map' element={<Map />} />
          <Route path='/spots' element={<Spots />} >
            <Route index element={<SpotsMain />} />
            <Route path='alltourist' element={<SpotsAllTourist />} />
            <Route path='allfestival' element={<SpotsAllFestival />} />
            <Route path='season' element={<SpotsSeason />} />
            <Route path='healing' element={<SpotsHealing />} />
            <Route path='walk' element={<SpotsWalk />} />
            <Route path='hiking' element={<SpotsHiking />} />
            <Route path='traditional' element={<SpotsTraditional />} />
            <Route path="search" element={<SpotsSearch />} />
            <Route path=":contentid" element={<SpotsDetail />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Route>
          <Route path='/api/touristspot' element={<FetchTouristSpots />} />
        </Routes>
      </TouristSpotsProvider>

    </main>
  )
}

export default App
