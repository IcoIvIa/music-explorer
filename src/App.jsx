import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DigPage from './pages/DigPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dig' element={<DigPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App