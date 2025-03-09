import './App.css'
import View from './pages/view/View'
import { TreeProvider } from './pages/view/components/context/TreeContext'

function App() {
  return (
    <TreeProvider>
      <View />
    </TreeProvider>
  )
}

export default App
