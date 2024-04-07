import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { UserContextProvider } from './context/UserContext';
//Pages & Components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Reorder from './pages/Reorder';
import Loyalty from './pages/Loyalty';
import Expired from './pages/Expired';
import AboutExpire from './pages/AboutExpire';
import OutOfStock from './pages/OutOfStock';
import AboutToOutOfStock from './pages/AboutToOutOfStocks.js';
import Prescription from './pages/Prescription';
import Leave from './pages/Leave'
import Billing from './pages/Billing';
import NewSale from './pages/NewSale';
import StaffReward from './pages/StaffReward';
import Leaderboard from './pages/Leaderboard.js';
import Inventory from './pages/Inventory';
import Allprescri from './pages/Allprescriptions.js';

import './index.css';



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
              path= "/abtoutofstock"
              element = {<AboutToOutOfStock/>}
            />
             <Route
              path= "/staffReward"
              element = {<StaffReward/>}
            />

            <Route
              path= "/leaderboard"
              element = {<Leaderboard/>}
            />

             <Route
              path='/leaves'
              element={<Leave/>}
            />
            <Route
              path="/prescription"
              element={<Prescription/>}
            />
            <Route
              path="/billing"
              element={<Billing/>}
            />
            <Route
              path="/new-sale"
              element={<NewSale/>}
            />
            
            <Route
                path="/inventory"
                element={<Inventory/>}
            />
            <Route
                path="/allp"
                element={<Allprescri/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </UserContextProvider>
  );
}

export default App;
