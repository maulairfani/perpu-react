
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import View from './pages/view/View'
import Home from './pages/home/Home'
import DashboardLayout from './components/layout/DashboardLayout'
import { TreeProvider } from './pages/view/components/context/TreeContext'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <DashboardLayout>
            <Home />
          </DashboardLayout>
        } />
        <Route path="/view/:id" element={
          <TreeProvider>
            <View />
          </TreeProvider>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
