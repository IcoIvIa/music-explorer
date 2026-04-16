import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DigPage from './pages/DigPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dig' element={<DigPage />} />
        <Route path='/history-detail' element={<HistoryPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App