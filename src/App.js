import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Fiche from './pages/Fiche';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
        <Route path='/pokemon/:id' element={<Fiche />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;