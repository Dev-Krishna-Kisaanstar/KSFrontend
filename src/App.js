import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/SmallComponents/Header';
import Login from './Pages/Login';
import Registration from './Pages/Registration'; // Optional
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Products from './Pages/Products';
import Contactus from './Pages/Contactus';
import ViewProfile from './Pages/ViewProfile';
import AuthWrapper from './Auth/AuthWrapper'; // Import AuthWrapper
import Orders from './Pages/CxProfileview/Orders';
import FarmingDetails from './Pages/CxProfileview/FarmingDetails';
import Wishlist from './Pages/CxProfileview/Wishlist';
import Address from './Pages/CxProfileview/Address';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contactus" element={<Contactus />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <AuthWrapper>
              <ViewProfile />
            </AuthWrapper>
          }
        />

        <Route
          path="/orders"
          element={
            <AuthWrapper>
              <Orders />
            </AuthWrapper>
          }
        />

        <Route
          path="/FarmingDetails"
          element={
            <AuthWrapper>
              <FarmingDetails />
            </AuthWrapper>
          }
        />

        <Route
          path="/Wishlist"
          element={
            <AuthWrapper>
              <Wishlist />
            </AuthWrapper>
          }
        />

        <Route
          path="/Address"
          element={
            <AuthWrapper>
              <Address />
            </AuthWrapper>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
