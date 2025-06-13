import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from './Context/ThemeContext';

// Import authentication components
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

// Import main application components
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import Overview from './Pages/Overview';
import Roadmap from './Pages/Roadmap';
import Settings from './Pages/Settings';
import PricingPage from './Pages/PricingPage';

// Authentication logic
const useAuth = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return { isAuthenticated };
};

// Route protection components
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Authentication Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            
            {/* Password Reset Flow */}
            <Route 
              path="/forgot-password" 
              element={<ForgotPassword />} 
            />
            <Route 
              path="/reset-password" 
              element={<ResetPassword />} 
            />
            
            {/* Protected Application Routes with Layout */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Nested routes inside Layout */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="overview" element={<Overview />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="settings" element={<Settings />} />
              <Route path="pricing" element={<PricingPage />} />
            </Route>
            
            {/* Catch-all redirect */}
            <Route 
              path="*" 
              element={<Navigate to="/dashboard" replace />} 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;