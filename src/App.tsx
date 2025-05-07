import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Dashboard/Profile';
import { useSelector } from 'react-redux';
import type { RootState } from './store'; 
import ProtectedRoute from './component/ProtectedRoute';


export default function App() {
  const isAuth = useSelector((state: RootState) => state.user?.authenticated); 

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
