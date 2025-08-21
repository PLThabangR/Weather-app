

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/home/Home'
import MoreDetails from './Pages/MoreDetails/MoreDetails'

function App() {


  return (
    <>

     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Details" element={<MoreDetails/>} />
     </Routes>

    </>
  )
}

export default App
