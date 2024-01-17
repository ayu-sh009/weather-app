import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Z from './weather';
import A from './home';
import Y from './userLogin';
import Admin from './adminLogin';
import Q from "./admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<A />} />
        <Route path="/userlogin" element={<Y />} />
        <Route path="/admin" element={<Q />} />
        <Route path="/weather" element={<Z />} />
        <Route path="/adminlogin" element={<Admin />} />
  
      </Routes>
    </Router>
  );
}

export default App;
