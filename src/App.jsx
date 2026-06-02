import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Warga from './pages/Warga'
import Transporter from './pages/Transporter'
import Admin from './pages/Admin'

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Warga />} />

        <Route path="/transporter" element={<Transporter />} />

        <Route path="/admin" element={<Admin />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App