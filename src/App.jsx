import { Route, Routes } from 'react-router-dom'
import BottomNav from './components/layout/BottomNav'
import Home from './pages/Home'

function App() {
  return (
    <div className='App m-auto min-w-xs max-w-3xl max-h-lvh'>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default App
