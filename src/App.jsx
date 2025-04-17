import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import View from './pages/view/View'
import Home from './pages/home/Home'
import DashboardLayout from './components/layout/DashboardLayout'
import { TreeProvider } from './pages/view/components/context/TreeContext'
import { useEffect, useState } from 'react' // Added useState import

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // Added search state

  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <DashboardLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}> {/* Passed search state */}
            <Home />
          </DashboardLayout>
        } />
        <Route path="/view/:id" element={
          <TreeProvider>
            <View searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Passed search state */}
          </TreeProvider>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App