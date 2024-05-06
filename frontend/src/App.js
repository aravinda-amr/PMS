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
import AboutToOutOfStock from './pages/AboutToOutOfStocks';
import Prescription from './pages/Prescription';
import Leave from './pages/Leave'
import Billing from './pages/Billing';
import NewSale from './pages/NewSale';
import StaffReward from './pages/StaffReward';
import Leaderboard from './pages/Leaderboard.js';
import Inventory from './pages/Inventory';
import Landing from './pages/Landing.js';
import StaffReg from './pages/StaffReg.js';
import CustomerHome from './pages/CustomerHome.js';

import SalesReport from './pages/SR'
import './index.css';

import Quotations from './pages/Quotations.js';



function App() {
  const { user } = useAuthContext();
  //console.log('hh', user);

  return (
    <UserContextProvider>
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          {user && <Navbar />}
          <Routes>
            <Route 
              path="/"
              element={user ? <CustomerHome/> : <Landing/>}
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
                path="/salesreport"
                element={<SalesReport/>}
            />

            <Route
                path="/quotations"
                element={<Quotations/>}
            />

            <Route
                path="/staffreg"
                element={<StaffReg/>}
            />

            <Route
                path="/dash"
                element={<Home
                  aboutToExpirePath="/abtexpired"
                  outOfStockPath="/outofstock"
                  expiredPath="/expired"
                  aboutToOutOfStockPath="/abtoutofstock"
                />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </UserContextProvider>
  );
}

export default App;
