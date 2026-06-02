import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Warga from "./pages/warga";
import Transporter from "./pages/transporter";
import Admin from "./pages/admin";

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