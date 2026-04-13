import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DigPage from './pages/DigPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dig' element={<DigPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App