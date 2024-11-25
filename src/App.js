import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/SmallComponents/Header';
import Login from './Pages/Login';
import Registration from './Pages/Registration'; // Include this if you have a Registration component
import Home from './Pages/Home'; // Example: a home component
import About from './Pages/About';
import Services from './Pages/Services';
import Products from './Pages/Products';
import Contactus from './Pages/Contactus';
import ViewProfile from './Pages/ViewProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Your homepage component */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> {/* Optional for registration */}
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/profile" element={<ViewProfile />} />
      </Routes>
    </Router>
  );
}

export default App;