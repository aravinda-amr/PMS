import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { UserContextProvider } from './context/UserContext';
//Pages & Components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Reorder from './pages/Reorder';
import Staffrewards from './pages/Staffrewards';
import Loyalty from './pages/Loyalty';
import Expired from './pages/Expired';
import AboutExpire from './pages/AboutExpire';
import OutOfStock from './pages/OutOfStock';
import Prescription from './pages/Prescription';

function App() {
  const { user } = useAuthContext();


  return (
    <UserContextProvider>
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home/> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route 
              path="/reorder"
              element={<Reorder/>}
            />
             <Route 
              path="/Staffrewards"
              element={<Staffrewards />}
            />
            <Route 
              path="/loyalty"
              element={<Loyalty />}
            />
            <Route
              path= "/expired"
              element = {<Expired/>}
            />
            <Route
              path= "/abtexpired"
              element = {<AboutExpire/>}
            />
            <Route
              path= "/outofstock"
              element = {<OutOfStock/>}
            />
            <Route
              path="/prescription"
              element={<Prescription/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </UserContextProvider>
  );
}

export default App;
