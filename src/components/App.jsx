import { useState } from 'react';
import Home from './Home';
import Details from './Details';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

/**
 * The App component is the main component that renders everything.
 * @returns {JSX.Element} The App component.
 */
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
