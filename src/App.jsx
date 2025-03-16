import './App.css'
import View from './pages/view/View'
import { TreeProvider } from './pages/view/components/context/TreeContext'
import { useEffect } from 'react'

function App() {
  // Light mode is now the default
  useEffect(() => {
    // Remove dark class to ensure light mode
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <TreeProvider>
      <View />
    </TreeProvider>
  )
}

export default App
