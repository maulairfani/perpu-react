import './App.css'
import View from './pages/view/View'
import { TreeProvider } from './pages/view/components/context/TreeContext'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <TreeProvider>
      <View />
    </TreeProvider>
  )
}

export default App
