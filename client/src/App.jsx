import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
// import Edit from './Pages/Edit.jsx'


function App() {

  return (
  <Routes>
    <Route path="/" element={<Home/>}/>
    {/* <Route path="/edit/:id" element={<Edit/>}/> */}
  </Routes>
  )
}

export default App
