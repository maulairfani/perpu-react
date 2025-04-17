
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebase'
import View from './pages/view/View'
import Home from './pages/home/Home'
import Upload from './pages/upload/Upload'
import Login from './pages/auth/Login'
import DashboardLayout from './components/layout/DashboardLayout'
import { TreeProvider } from './pages/view/components/context/TreeContext'

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <DashboardLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
              <Home searchQuery={searchQuery} />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/upload" element={
          <PrivateRoute>
            <DashboardLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
              <Upload />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/view/:id" element={
          <PrivateRoute>
            <TreeProvider>
              <View searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </TreeProvider>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
