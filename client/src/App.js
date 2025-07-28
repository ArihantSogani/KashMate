import React from 'react';
import { Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ManageTransactions from './pages/ManageTransactions';
import About from './pages/About';
import AISuggestions from './pages/AISuggestions';
import MonthlyExpenses from './pages/MonthlyExpenses';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return ( 
    <div className="h-screen bg-background text-on-surface flex flex-col overflow-hidden">
      {/* Navigation Bar */}
      <nav className="bg-surface/90 backdrop-blur-md border-b border-surface/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-background text-xl font-bold">💸</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-on-surface tracking-tight">Money Manager</h1>
                  <p className="text-xs text-on-surface-secondary -mt-1">Smart Finance Tracking</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {token ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="px-4 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium text-sm flex items-center space-x-2"
                  >
                    <span className="text-lg">📊</span>
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/manage-transactions" 
                    className="px-4 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium text-sm flex items-center space-x-2"
                  >
                    <span className="text-lg">📝</span>
                    <span>Manage</span>
                  </Link>
                  <Link 
                    to="/ai-suggestions" 
                    className="px-4 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium text-sm flex items-center space-x-2"
                  >
                    <span className="text-lg">🤖</span>
                    <span>AI-Suggestions</span>
                  </Link>
                  <Link 
                    to="/monthly-expenses" 
                    className="px-4 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium text-sm flex items-center space-x-2"
                  >
                    <span className="text-lg">📈</span>
                    <span>Monthly Exp.</span>
                  </Link>
                  <Link 
                    to="/about" 
                    className="px-4 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium text-sm flex items-center space-x-2"
                  >
                    <span className="text-lg">ℹ️</span>
                    <span>About</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium text-sm"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-gradient-to-r from-primary to-primary/90 text-background px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg text-on-surface hover:text-primary hover:bg-primary/10 transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path="/manage-transactions" element={
            <RequireAuth>
              <ManageTransactions />
            </RequireAuth>
          } />
          <Route path="/ai-suggestions" element={
            <RequireAuth>
              <AISuggestions />
            </RequireAuth>
          } />
          <Route path="/monthly-expenses" element={
            <RequireAuth>
              <MonthlyExpenses />
            </RequireAuth>
          } />
          <Route path="/about" element={
            <RequireAuth>
              <About />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="*" element={<div className="text-center text-on-surface-secondary mt-8">Page not found.</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

