import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Overview from './Pages/Overview';
import Roadmap from './Pages/Roadmap';
import Settings from './Pages/Settings';
import PricingPage from './Pages/PricingPage';
// Layout wrapper
import Layout from './Components/Layout';
// Add ThemeProvider import
import ThemeProvider from './Context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Login Route */}
          <Route path="/" element={<Login />} />
          {/* Protected Routes under Main Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
