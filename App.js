import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import SplashScreen from './SplashScreen';
import AL from './al'; // Import AL component

function App() {
  return (
    <Router>
      <SplashScreen />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/al" element={<AL />} /> 
      </Routes>
    </Router>
  );
}

export default App;
