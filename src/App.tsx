

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/home/Home'
import MoreDetails from './Pages/MoreDetails/MoreDetails'
import { Toaster } from 'react-hot-toast'

function App() {


  return (
    <>
    <div >


<Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/Details" element={<MoreDetails/>} />
     </Routes>
<Toaster position='bottom-right'/>
    </div>
     
    </>
  )
}

export default App
