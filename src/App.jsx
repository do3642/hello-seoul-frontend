import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Map from './map/pages/Map'



function App() {


  return (
    <main>
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/map' element={<Map />} />
    </Routes>

    </main>
  )
}

export default App
